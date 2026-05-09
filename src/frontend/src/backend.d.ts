import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    title: string;
    inStock: boolean;
    description: string;
    imageUrl: string;
    distanceKm: number;
    category: Category;
    rating: bigint;
    cryptoPrice?: string;
    price: bigint;
    reviewCount: bigint;
    tierRequired: MemberTier;
}
export type OrderId = bigint;
export type ProductId = bigint;
export interface Order {
    id: bigint;
    status: OrderStatus;
    paymentMethod: string;
    createdAt: bigint;
    productId: bigint;
    quantity: bigint;
    shippingAddress: string;
    buyer: Principal;
}
export enum Category {
    DigitalArt = "DigitalArt",
    DesignerGoods = "DesignerGoods"
}
export enum MemberTier {
    Elite = "Elite",
    Executive = "Executive",
    Standard = "Standard"
}
export enum OrderStatus {
    Delivered = "Delivered",
    Cancelled = "Cancelled",
    Processing = "Processing",
    Pending = "Pending"
}
export interface backendInterface {
    addToWishlist(productId: ProductId): Promise<void>;
    adminAddProduct(title: string, description: string, category: Category, price: bigint, cryptoPrice: string | null, imageUrl: string, inStock: boolean, tierRequired: MemberTier, distanceKm: number): Promise<Product>;
    adminUpdateStock(id: ProductId, inStock: boolean): Promise<void>;
    getMyMembership(): Promise<MemberTier>;
    getOrder(id: OrderId): Promise<Order | null>;
    getProduct(id: ProductId): Promise<Product | null>;
    getWishlist(): Promise<Array<ProductId>>;
    listMyOrders(): Promise<Array<Order>>;
    listProducts(): Promise<Array<Product>>;
    placeOrder(productId: ProductId, quantity: bigint, shippingAddress: string, paymentMethod: string): Promise<Order>;
    removeFromWishlist(productId: ProductId): Promise<void>;
    upgradeMembership(newTier: MemberTier): Promise<void>;
}
