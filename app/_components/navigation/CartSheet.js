"use client";

import { useCart } from "../../_contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "../ui/Sheet";
import { ChevronRight, Plus, Minus } from "lucide-react";

export default function CartSheet({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCart();

  const handleCheckout = () => {
    // Here we would integrate with Stripe
    // In a real implementation, we would redirect to Stripe checkout
    // window.location.href = '/api/checkout/stripe'
    onClose();
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="flex flex-col overflow-y-auto">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle>My Cart ({getTotalItems()})</SheetTitle>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={item.id} className="border-b py-4">
                  <div className="mb-1 flex justify-between">
                    <div className="font-medium">{item.event}</div>
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="mb-1 text-sm text-gray-500">
                    Section {item.section}, Row {item.row}
                  </div>
                  <div className="mb-3 text-sm text-gray-500">{item.date}</div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className={`rounded-full border p-1 ${
                          item.quantity > 1
                            ? "text-gray-600 hover:bg-gray-100"
                            : "cursor-not-allowed text-gray-300"
                        }`}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="mx-2 text-sm font-medium">
                        {item.quantity}{" "}
                        {item.quantity === 1 ? "Ticket" : "Tickets"}
                      </span>
                      <button
                        onClick={() =>
                          item.quantity < item.maxQuantity &&
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className={`rounded-full border p-1 ${
                          item.quantity < item.maxQuantity
                            ? "text-gray-600 hover:bg-gray-100"
                            : "cursor-not-allowed text-gray-300"
                        }`}
                        disabled={item.quantity >= item.maxQuantity}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t pt-4">
              <div className="w-full">
                <div className="mb-4 flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center"
                >
                  Checkout with Stripe
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-between">
            <div className="flex flex-grow items-center justify-center">
              <p className="mb-4 text-muted-foreground">
                Your cart is currently empty.
              </p>
            </div>

            <SheetClose asChild>
              <button className="w-full rounded-md bg-primary py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Browse Events
              </button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
