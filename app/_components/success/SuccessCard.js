"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/Card";
import { Separator } from "@/app/_components/ui/Separator";
import { Button } from "@/app/_components/ui/Button";

export default function SuccessCard({ checkoutDetails }) {
  const {
    customerName,
    orderId,
    orderDate,
    paymentMethod,
    currency,
    totalAmount,
    lineItems,
    customerEmail,
  } = checkoutDetails;

  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-3xl font-bold">Order Confirmed</h1>
        <p className="text-muted-foreground">
          Thank you, {customerName}. Your order has been confirmed.
        </p>
      </div>

      <Card className="w-full max-w-[768px] border-border bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
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
            <h2 className="mb-4 text-2xl font-bold">Tickets Purchased</h2>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              {lineItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.price.product.images[0]}
                    height={48}
                    width={110.4}
                    alt={`${item.artist} - ${item.title} event poster`}
                    className="rounded-md"
                  />

                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">
                      {item.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.price.product.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.quantity} ticket{item.quantity > 1 ? "s" : ""}
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
    </>
  );
}
