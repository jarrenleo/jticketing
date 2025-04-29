import { NextResponse } from "next/server";
import Stripe from "stripe";
import { retrieveImageUrl } from "@/app/_lib/utils";
import { formatDateTime } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const domain = process.env.NEXT_PUBLIC_BASE_URL;
const domain = "http://localhost:3000/";

export async function POST(request) {
  const { lineItems } = await request.json();

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
            set_of: item.quantity,
          },
        },
        unit_amount: item.price * 100,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      custom_fields: [
        {
          key: "customer_name",
          label: { type: "custom", custom: "Customer Name" },
          type: "text",
          optional: false,
        },
      ],
      phone_number_collection: { enabled: true },
      mode: "payment",
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: domain,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
