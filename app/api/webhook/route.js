import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateTicketInventory } from "@/app/_lib/dataService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  if (
    event.type !== "checkout.session.async_payment_failed" &&
    event.type !== "checkout.session.expired"
  )
    return;

  try {
    const session = event.data.object;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    const inventoryUpdates = lineItems.data.map(async (item) => {
      const metadata = item.price.product.metadata;

      const ticketId = +metadata.db_ticket_id;
      const setNum = +metadata.set_num;
      const quantityPurchased = item.quantity / setNum;

      return await updateTicketInventory(ticketId, quantityPurchased);
    });
    await Promise.all(inventoryUpdates);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process payment completion event." },
      { status: 500 },
    );
  }
}
