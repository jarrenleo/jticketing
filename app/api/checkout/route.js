import { NextResponse } from "next/server";
import Stripe from "stripe";
import { retrieveImageUrl } from "@/app/_lib/utils";
import { formatDateTime } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { lineItems } = await request.json();

  const YOUR_DOMAIN =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const stripeLineItems = lineItems.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "myr",
        product_data: {
          name: `${item.artist} ${item.title}`,
          description: `${item.category}. Section ${item.section}, Row ${item.row}. ${formatDateTime(item.datetime)}`,
          images: [retrieveImageUrl("events", item.image_file)],
        },
        unit_amount: item.price * 100,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      payment_method_types: ["card", "grabpay", "paynow"],
      success_url: `${YOUR_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: `Stripe Error: ${errorMessage}` },
      { status: 500 },
    );
  }
}
