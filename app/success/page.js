import Link from "next/link";
import Stripe from "stripe";
import Navigation from "@/app/_components/navigation/Navigation";
import Success from "@/app/_components/success/Success";
import Footer from "@/app/_components/footer/Footer";
import ClearCartOnSuccess from "@/app/_components/navigation/ClearCartOnSuccess";
import { Button } from "@/app/_components/ui/Button";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <Success session={session} />
      </main>
      <Footer />
      <ClearCartOnSuccess />
    </div>
  );
}
