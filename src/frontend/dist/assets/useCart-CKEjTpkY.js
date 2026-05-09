import { r as reactExports } from "./index-DHY5Q3pY.js";
function useCart() {
  const [items, setItems] = reactExports.useState([]);
  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map(
          (i) => i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };
  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };
  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems(
      (prev) => prev.map(
        (i) => i.productId === productId ? { ...i, quantity: qty } : i
      )
    );
  };
  const clear = () => setItems([]);
  const total = () => items.reduce((sum, i) => sum + i.price * BigInt(i.quantity), 0n);
  return { items, addItem, removeItem, updateQuantity, clear, total };
}
export {
  useCart as u
};
