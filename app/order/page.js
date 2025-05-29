import Stripe from "stripe";
import Navigation from "@/app/_components/navigation/Navigation";
import SuccessCard from "@/app/_components/success/SuccessCard";
import Footer from "@/app/_components/footer/Footer";
import ClearCart from "@/app/_components/navigation/ClearCart";
import { formatDateTime, formatPaymentMethod } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const metadata = {
  title: "JTicketing | Order Information",
  description:
    "Jticketing is a platform for securing the hottest tickets with ease and confidence.",
  openGraph: {
    images: ["/logo.png"],
  },
};

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: [
      "customer",
      "line_items.data.price.product",
      "payment_intent.payment_method",
    ],
  });

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
