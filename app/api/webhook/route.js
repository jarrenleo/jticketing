import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateTicketInventory } from "@/app/_lib/dataService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          {
            expand: ["data.price.product"],
          },
        );

        const inventoryUpdates = lineItems.data.map(async (item) => {
          const metadata = item.price.product.metadata;
          const ticketId = metadata.db_ticket_id;
          const setNum = +metadata.set_num;
          const quantityPurchased = item.quantity / setNum;

          await updateTicketInventory(ticketId, quantityPurchased);
        });

        await Promise.all(inventoryUpdates);
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to process payment completion event." },
          { status: 500 },
        );
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
