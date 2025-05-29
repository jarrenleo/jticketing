import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import Email from "@/app/_components/Email/Email.jsx";
import { updateTicketInventory } from "@/app/_lib/dataService";
import { formatDateTime, formatPaymentMethod } from "@/app/_lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  switch (event.type) {
    case "checkout.session.completed":
      try {
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
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

        const { error } = await resend.emails.send({
          from: "Jticketing <noreply@orders.jticketing.com>",
          to: [customerEmail],
          subject: "Your order confirmation from Jticketing",
          react: <Email checkoutDetails={checkoutDetails} />,
        });
        if (error) throw new Error(error.message);

        return NextResponse.json({ received: true });
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    case "checkout.session.expired":
      try {
        const sessionId = event.data.object.id;
        const lineItems = await stripe.checkout.sessions.listLineItems(
          sessionId,
          {
            expand: ["data.price.product"],
          },
        );

        const inventoryUpdates = lineItems.data.map(async (item) => {
          const metadata = item.price.product.metadata;
          const ticketId = metadata.db_ticket_id;
          const cartQuantity = metadata.cart_quantity;

          return await updateTicketInventory(ticketId, cartQuantity);
        });
        await Promise.all(inventoryUpdates);

        return NextResponse.json({ received: true });
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to process session expired event." },
          { status: 500 },
        );
      }
    default:
      return NextResponse.json(
        { error: "Not listening to this event type." },
        { status: 400 },
      );
  }
}
