"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("ticketCart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ticketCart", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    // Check if item already exists in cart
    const existingItemIndex = items.findIndex(
      (cartItem) =>
        cartItem.event === item.event &&
        cartItem.section === item.section &&
        cartItem.row === item.row &&
        cartItem.date === item.date
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...items];
      const currentQuantity = updatedItems[existingItemIndex].quantity;
      const newQuantity = Math.min(
        currentQuantity + item.quantity,
        item.maxQuantity
      );

      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: newQuantity,
      };

      setItems(updatedItems);
    } else {
      // Add new item
      setItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.price * item.quantity * item.ticketsPerItem,
      0
    );
  };

  const getTotalItems = () => {
    return items.reduce(
      (total, item) => total + item.quantity * item.ticketsPerItem,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
