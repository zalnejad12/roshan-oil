"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const exists = get().isInWishlist(product.id);
        set({ items: exists ? get().items.filter((i) => i.id !== product.id) : [...get().items, product] });
      },
      isInWishlist: (id) => get().items.some((i) => i.id === id),
    }),
    { name: "roshan-oil-wishlist" }
  )
);
