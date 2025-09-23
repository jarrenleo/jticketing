"use client";

import { useCart } from "../../_contexts/CartContext";
import CartSheet from "./CartSheet";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const { getTotalItems, toggleCart } = useCart();

  const totalItems = getTotalItems();

  return (
    <>
      <button
        onClick={toggleCart}
        className="group relative rounded-xl p-2 transition-colors hover:bg-accent"
      >
        <ShoppingCart
          width={20}
          height={20}
          className="group-hover:stroke-accent-foreground group-hover:transition-colors"
        />
        {totalItems > 0 && (
          <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {totalItems}
          </div>
        )}
      </button>
      <CartSheet />
    </>
  );
}
