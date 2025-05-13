import { NextResponse } from "next/server";
import Stripe from "stripe";
import { retrieveImageUrl } from "@/app/_lib/utils";
import { formatDateTime } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const domain = process.env.NEXT_PUBLIC_BASE_URL;
// const domain = "http://localhost:3000";

export async function POST(request) {
  const { items: lineItems } = await request.json();

  try {
    const stripeLineItems = lineItems.map((item) => ({
      quantity: item.quantity * item.cartQuantity,
      price_data: {
        currency: "myr",
        product_data: {
          name: `${item.artist} - ${item.title}`,
          description: `${item.category}. Section ${item.section}, Row ${item.row}. ${formatDateTime(item.date)}.`,
          images: [retrieveImageUrl("events", item.image_file)],
          metadata: {
            db_ticket_id: item.id,
            cart_quantity: item.cartQuantity,
          },
        },
        unit_amount: item.price * 100,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      allow_promotion_codes: true,
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "customer_name",
          label: { type: "custom", custom: "Customer name" },
          type: "text",
          optional: false,
        },
      ],
      mode: "payment",
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${domain}/order?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: domain,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
