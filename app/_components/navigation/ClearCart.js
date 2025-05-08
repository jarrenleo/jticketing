"use client";

import { useEffect } from "react";
import { useCart } from "@/app/_contexts/CartContext";

export default function ClearCart() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return null;
}
