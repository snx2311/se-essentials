import type { CartItem } from "@/types";
import { useState } from "react";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: bigint, qty: number) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i,
      ),
    );
  };

  const clear = () => setItems([]);

  const total = (): bigint =>
    items.reduce((sum, i) => sum + i.price * BigInt(i.quantity), 0n);

  return { items, addItem, removeItem, updateQuantity, clear, total };
}
