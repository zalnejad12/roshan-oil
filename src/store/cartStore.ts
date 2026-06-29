"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set({ items: get().items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i) });
        } else {
          set({ items: [...get().items, { product, quantity }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.product.id !== id) }),
      updateQuantity: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set({ items: get().items.map((i) => i.product.id === id ? { ...i, quantity: qty } : i) });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      getTotalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      getTotalPrice: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    }),
    { name: "roshan-oil-cart" }
  )
);
