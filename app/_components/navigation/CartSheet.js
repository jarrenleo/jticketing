"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../_contexts/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "../ui/Sheet";
import Loader from "../ui/Loader";
import { checkTicketAvailability } from "../../_lib/dataService";
import { retrieveImageUrl, formatDateTime } from "../../_lib/utils";
import { Plus, Minus, Trash2 } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function CartSheet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalItems,
    isCartOpen,
    closeCart,
  } = useCart();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function checkTicketsAvailability() {
    for (const item of items) {
      const { tickets_available } = await checkTicketAvailability(
        item.id,
        item.cartQuantity,
      );
      if (!tickets_available) return false;
    }
    return true;
  }

  async function handleCheckout() {
    setIsLoading(true);

    try {
      const isAvailable = await checkTicketsAvailability();

      if (!isAvailable)
        throw new Error(
          "Certain items in cart are unavailable. Please remove them and try again.",
        );

      const stripe = await stripePromise;
      if (!stripe)
        throw new Error(
          "Stripe payment could not be loaded. Please try again later.",
        );

      const lineItems = items.map((item) => {
        return {
          ...item,
          priceId: item.stripe_price_id,
          quantity: item.quantity * item.cartQuantity,
        };
      });

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { sessionId } = await response.json();

      if (!sessionId)
        throw new Error(
          "Failed to retrieve payment session ID. Please try again later.",
        );

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error)
        throw new Error(
          "Failed to redirect to Stripe payment. Please try again later.",
        );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred.",
      );
      setIsLoading(false);
    }
  }

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) closeCart();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-auto px-0">
        <SheetHeader className="border-b border-border px-4 pb-4">
          <SheetTitle className="flex flex-col">
            <span>My Cart</span>
            <span className="text-sm font-normal text-muted-foreground">
              {getTotalItems()} item{getTotalItems() === 1 ? "" : "s"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-0.5">
                  <div className="mb-2 flex items-center gap-4">
                    <div className="relative h-12 w-[91px] flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={retrieveImageUrl("events", item.image_file)}
                        alt={item.artist}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="line-clamp-1 text-sm font-semibold">
                        {item.artist}
                      </span>
                      <span className="line-clamp-1 text-sm text-muted-foreground">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="line-clamp-1">{item.category}</span>
                    <span>RM {item.price * item.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Section {item.section}, Row {item.row}
                    </span>
                    <span>
                      {item.quantity > 1
                        ? `Set of ${item.quantity} tickets`
                        : "Single Ticket"}
                    </span>
                  </div>

                  <div className="mb-4 text-sm text-muted-foreground">
                    {formatDateTime(item.datetime)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-md bg-muted">
                      <button
                        onClick={() => {
                          if (item.cartQuantity > 1) {
                            updateQuantity(item.id, item.cartQuantity - 1);
                            return;
                          }

                          removeItem(item.id);
                        }}
                        className="rounded-l-md p-2 text-muted-foreground transition-colors hover:bg-accent"
                      >
                        <Minus height={16} width={16} />
                      </button>
                      <span className="mx-2 text-sm font-medium">
                        {item.cartQuantity}
                      </span>
                      <button
                        onClick={() =>
                          item.cartQuantity < item.num_sets &&
                          updateQuantity(item.id, item.cartQuantity + 1)
                        }
                        className={
                          "rounded-r-md p-2 text-muted-foreground transition-colors hover:bg-accent disabled:opacity-50"
                        }
                        disabled={item.cartQuantity >= item.num_sets}
                      >
                        <Plus height={16} width={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-destructive transition-colors hover:text-destructive/90"
                    >
                      <Trash2 width={16} height={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex flex-col gap-2 px-4 pt-4">
              {error && (
                <span className="mb-2 text-center text-sm font-medium text-destructive">
                  {error}
                </span>
              )}
              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-1 rounded-md bg-primary py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                disabled={isLoading}
              >
                {!isLoading ? (
                  <span>Proceed to Payment</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Loader width={16} height={16} strokeWidth={"4px"} />
                    <span>Processing...</span>
                  </div>
                )}
              </button>
            </SheetFooter>

            <div className="px-4 text-center text-sm text-muted-foreground">
              By checking out, I agree to be bound by the{" "}
              <SheetClose asChild>
                <Link href="/terms" className="underline">
                  Terms & Conditions
                </Link>
              </SheetClose>{" "}
              and{" "}
              <SheetClose asChild>
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
              </SheetClose>
              .
            </div>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-between px-4">
            <div className="flex flex-grow items-center justify-center">
              <span className="mb-4 text-muted-foreground">
                Your cart is currently empty.
              </span>
            </div>

            <SheetClose asChild>
              <button className="w-full rounded-md bg-primary py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                <span>Browse Events</span>
              </button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
