"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [checkoutSessionId, setCheckoutSessionId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("ticketCart");
    if (savedCart) setItems(JSON.parse(savedCart));

    const savedCheckoutSessionId = localStorage.getItem("checkoutSessionId");
    if (savedCheckoutSessionId)
      setCheckoutSessionId(JSON.parse(savedCheckoutSessionId));
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketCart", JSON.stringify(items));
    localStorage.setItem(
      "checkoutSessionId",
      JSON.stringify(checkoutSessionId),
    );
  }, [items, checkoutSessionId]);

  function addItem(item) {
    const existingItemIndex = items.findIndex(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItemIndex === -1) {
      setItems((items) => [...items, item]);
      return;
    }

    const updatedItems = [...items];
    const currentItemQuantity = updatedItems[existingItemIndex].cartQuantity;
    const newItemQuantity = Math.min(currentItemQuantity + 1, item.num_sets);

    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      cartQuantity: newItemQuantity,
    };

    setItems(updatedItems);
  }

  function removeItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, cartQuantity: Math.min(quantity, item.num_sets) }
          : item,
      ),
    );
  }

  function getTotalItems() {
    return items.length;
  }

  function getTotalPrice() {
    return items.reduce(
      (total, item) => total + item.price * item.quantity * item.cartQuantity,
      0,
    );
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function toggleCart() {
    setIsCartOpen((isCartOpen) => !isCartOpen);
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        checkoutSessionId,
        setCheckoutSessionId,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("useCart must be used within a CartProvider");

  return context;
}
