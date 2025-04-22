"use client";

import { useCart } from "../../_contexts/CartContext";
import CartSheet from "./CartSheet";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const { getTotalItems, toggleCart } = useCart();

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative rounded-md p-1.5 transition-colors hover:bg-accent"
      >
        <ShoppingCart width={20} height={20} />
        {getTotalItems() > 0 && (
          <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {getTotalItems()}
          </div>
        )}
      </button>
      <CartSheet />
    </>
  );
}
