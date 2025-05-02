"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { Separator } from "@/app/_components/ui/Separator";
import { Button } from "@/app/_components/ui/Button";
import { motion } from "framer-motion";
import { formatDateTime } from "@/app/_lib/utils";

function formatPaymentMethod(session) {
  const paymentMethod = session.payment_intent?.payment_method;

  if (paymentMethod?.card)
    return `${paymentMethod.card.brand.charAt(0).toUpperCase() + paymentMethod.card.brand.slice(1)} ${paymentMethod.card.funding} (•••• ${paymentMethod.card.last4})`;

  return "N/A";
}

export default function Success({ session }) {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, filter: "blur-sm" },
        visible: { opacity: 1 },
      }}
    >
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
    </motion.div>
  );
}
