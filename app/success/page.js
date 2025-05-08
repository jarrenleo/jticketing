import Link from "next/link";
import Stripe from "stripe";
import Navigation from "@/app/_components/navigation/Navigation";
import SuccessCard from "@/app/_components/success/SuccessCard";
import Footer from "@/app/_components/footer/Footer";
import ClearCart from "@/app/_components/navigation/ClearCart";
import { Button } from "@/app/_components/ui/Button";
import { formatDateTime } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const metadata = {
  title: "JTicketing | Order Confirmation",
};

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

  const checkoutDetails = {
    customerName,
    orderId,
    orderDate,
    paymentMethod,
    currency,
    totalAmount,
    lineItems,
    customerEmail,
  };

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <SuccessCard checkoutDetails={checkoutDetails} />
      </main>
      <Footer />
      <ClearCart />
    </div>
  );
}
