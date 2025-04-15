"use client";

import { useState } from "react";
import { useCart } from "../../_contexts/CartContext";
import CartSheet from "./CartSheet";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = () => {
    // Here we would integrate with Stripe
    // In a real implementation, we would redirect to Stripe checkout
    // window.location.href = '/api/checkout/stripe'
  };

  return (
    <>
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="rounded-md p-1.5 transition-colors hover:bg-accent"
      >
        <ShoppingCart width={20} height={20} />
      </button>
      <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
