import type { Product as BackendProduct } from "@/backend";
import type { Principal } from "@icp-sdk/core/principal";

export type { Order } from "@/backend";
export { Category, MemberTier, OrderStatus } from "@/backend";

/** Product — inherits all fields from BackendProduct (tierRequired: MemberTier, distanceKm: number) */
export interface Product extends BackendProduct {}

export interface CartItem {
  productId: bigint;
  title: string;
  price: bigint;
  cryptoPrice?: string;
  imageUrl: string;
  quantity: number;
}

export interface WishlistState {
  items: bigint[];
  toggle: (id: bigint) => void;
  has: (id: bigint) => boolean;
  setItems: (ids: bigint[]) => void;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, qty: number) => void;
  clear: () => void;
  total: () => bigint;
}

export interface AuthUser {
  principal: Principal;
  tier: import("@/backend").MemberTier;
}
