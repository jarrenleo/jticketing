import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import Navigation from "@/app/_components/navigation/Navigation";
import Footer from "@/app/_components/footer/Footer";
import ClearCartOnSuccess from "@/app/_components/navigation/ClearCartOnSuccess";
import { Button } from "@/app/_components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { Separator } from "@/app/_components/ui/Separator";
import { formatDateTime } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function formatPaymentMethod(session) {
  const paymentMethod = session.payment_intent?.payment_method;

  if (paymentMethod?.card)
    return `${paymentMethod.card.brand.charAt(0).toUpperCase() + paymentMethod.card.brand.slice(1)} ${paymentMethod.card.funding} (•••• ${paymentMethod.card.last4})`;

  return "N/A";
}

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;
  let session;

  if (session_id)
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: [
        "customer",
        "line_items.data.price.product",
        "payment_intent.payment_method",
      ],
    });

  if (!session)
    return (
      <div className="container mx-auto flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-3xl font-bold">Order Confirmation Error</h1>
          <p className="text-center text-muted-foreground">
            We could not verify your order. If payment was completed, please
            contact our support team via WhatsApp or Email.
          </p>
          <Link href="/" className="inline-block">
            <Button variant="outline" className="font-semibold">
              Back to Home
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );

  const customerName = session.custom_fields.find(
    (f) => f.key === "customer_name",
  ).text.value;
  const orderId = session.payment_intent?.id.slice(3, -1) || "N/A";
  const orderDate = formatDateTime(new Date(session.created * 1000));
  const paymentMethod = formatPaymentMethod(session);
  const currency = session.currency.toUpperCase();
  const totalAmount = session.amount_total / 100;
  const lineItems = session.line_items.data;
  const customerEmail = session.customer_details.email;

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-3xl font-bold">Payment Successful</h1>
          <p className="text-muted-foreground">
            Thank you, {customerName}. Your order has been confirmed.
          </p>
        </div>

        <Card className="w-full max-w-[768px] border-border bg-background">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
            <CardDescription>View your order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-4 text-sm font-medium md:grid-cols-2">
              <div className="space-y-0.5">
                <p className="text-muted-foreground">Order Number</p>
                <p>{orderId}</p>
              </div>

              <div className="space-y-0.5">
                <p className="text-muted-foreground">Order Date</p>
                <p>{orderDate}</p>
              </div>

              <div className="space-y-0.5">
                <p className="text-muted-foreground">Payment Method</p>
                <p>{paymentMethod}</p>
              </div>

              <div className="space-y-0.5">
                <p className="text-muted-foreground">Total Amount</p>
                <p>
                  {currency} {totalAmount}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="mb-4 font-medium">Tickets Purchased</h2>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                {lineItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.price.product.images[0]}
                      height={48}
                      width={110.4}
                      className="rounded-md"
                      alt={item.description}
                    />

                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">
                        {item.description}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.price.product.description}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.quantity} tickets
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="font-medium">
                Your order confirmation has been sent to {customerEmail}.
              </span>
              <span className="text-sm text-muted-foreground">
                Tickets will be sent to you within 24 hours via email, provided
                that the event organiser has released them.
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Link href="/" className="w-full">
              <Button className="w-full">
                <span>Continue Browsing</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>

      <Footer />
      <ClearCartOnSuccess />
    </div>
  );
}
