import { createActor } from "@/backend";
import type { Order, Product } from "@/backend";
import { OrderStatus } from "@/backend";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { SecureBadge } from "@/components/SecureBadge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, LogIn, MapPin, Package } from "lucide-react";
import { motion } from "motion/react";

const STATUS_STEPS = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Delivered,
];

function statusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "bg-muted text-muted-foreground border border-transparent";
    case OrderStatus.Processing:
      return "bg-transparent text-foreground border border-foreground";
    case OrderStatus.Delivered:
      return "bg-foreground text-background border border-foreground";
    case OrderStatus.Cancelled:
      return "bg-transparent text-muted-foreground border border-transparent line-through";
  }
}

function stepLabel(step: OrderStatus): string {
  switch (step) {
    case OrderStatus.Pending:
      return "Pending";
    case OrderStatus.Processing:
      return "Processing";
    case OrderStatus.Delivered:
      return "Delivered";
    default:
      return step;
  }
}

function formatDate(nanoTimestamp: bigint): string {
  return new Date(Number(nanoTimestamp) / 1_000_000).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );
}

function estimatedDelivery(nanoTimestamp: bigint): string {
  const base = new Date(Number(nanoTimestamp) / 1_000_000);
  const earliest = new Date(base);
  const latest = new Date(base);
  earliest.setDate(base.getDate() + 3);
  latest.setDate(base.getDate() + 7);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(earliest)} – ${fmt(latest)}`;
}

function GuestPrompt() {
  const { login } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-20 px-6 text-center"
      data-ocid="order_detail.guest_state"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <LogIn size={24} className="text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-bold text-foreground">
          Sign in to view order details
        </h3>
        <p className="text-sm text-muted-foreground">
          Authenticate with Internet Identity to access your orders.
        </p>
      </div>
      <Button
        type="button"
        onClick={login}
        className="mt-2 rounded-lg"
        data-ocid="order_detail.login_button"
      >
        Continue with Internet Identity
      </Button>
    </div>
  );
}

export default function OrderDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const { loginStatus } = useInternetIdentity();
  const isAuthenticated = loginStatus === "success";

  const { data: order, isLoading: orderLoading } = useQuery<Order | null>({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getOrder(BigInt(id));
      return result ?? null;
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const { data: product, isLoading: productLoading } = useQuery<Product | null>(
    {
      queryKey: ["product", order ? String(order.productId) : ""],
      queryFn: async () => {
        if (!actor || !order) return null;
        const result = await actor.getProduct(order.productId);
        return result ?? null;
      },
      enabled: !!actor && !isFetching && !!order,
    },
  );

  if (!isAuthenticated) return <GuestPrompt />;
  if (orderLoading || productLoading) return <LoadingScreen />;

  if (!order)
    return (
      <div
        className="flex flex-col items-center justify-center py-20 px-6 text-center"
        data-ocid="order_detail.error_state"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <Package size={24} className="text-muted-foreground" />
        </div>
        <p className="font-display text-lg font-bold">Order not found</p>
        <p className="text-sm text-muted-foreground mt-1">
          This order may no longer exist or belong to another account.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5 rounded-lg"
          onClick={() => navigate({ to: "/orders" })}
          data-ocid="order_detail.back_button"
        >
          Back to Orders
        </Button>
      </div>
    );

  const stepIndex = STATUS_STEPS.indexOf(order.status);
  const unitPrice = product ? Number(product.price) / 100 : 0;
  const quantity = Number(order.quantity);
  const total = unitPrice * quantity;
  const orderId = `#${String(order.id).padStart(3, "0")}`;

  return (
    <div className="flex flex-col" data-ocid="order_detail.page">
      {/* Sticky header */}
      <div className="sticky top-[57px] z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate({ to: "/orders" })}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Back to orders"
          data-ocid="order_detail.back_button"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <span className="font-display text-sm font-bold text-foreground">
          Order {orderId}
        </span>
        <span
          className={cn(
            "ml-auto rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            statusBadgeClass(order.status),
          )}
        >
          {order.status}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="px-4 py-5 space-y-5"
      >
        {/* Product card */}
        <div
          className="flex gap-4 rounded-2xl border border-border bg-card p-4"
          data-ocid="order_detail.product_card"
        >
          {/* Thumbnail */}
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
            {product?.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package size={22} className="text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground leading-snug">
              {product?.title ?? "Unknown Product"}
            </p>
            <div className="mt-2 space-y-0.5">
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">
                  Unit price
                </span>
                <span className="text-xs font-semibold text-foreground">
                  ${unitPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Quantity</span>
                <span className="text-xs font-semibold text-foreground">
                  ×{quantity}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-1 mt-1">
                <span className="text-xs font-bold text-foreground">Total</span>
                <span className="text-xs font-bold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress tracker */}
        {order.status !== OrderStatus.Cancelled && (
          <div
            className="space-y-3 rounded-2xl border border-border bg-card p-4"
            data-ocid="order_detail.tracking_section"
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Tracking
            </h2>
            <div className="flex items-center">
              {STATUS_STEPS.map((step, i) => (
                <div key={step} className="flex flex-1 items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-smooth",
                      i <= stepIndex
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        i < stepIndex ? "bg-foreground" : "bg-border",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              {STATUS_STEPS.map((s) => (
                <span key={s} className="text-[10px] text-muted-foreground">
                  {stepLabel(s)}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Order details */}
        <div
          className="rounded-2xl border border-border bg-card divide-y divide-border"
          data-ocid="order_detail.details_section"
        >
          <div className="flex justify-between px-4 py-3">
            <span className="text-xs text-muted-foreground">Order ID</span>
            <span className="text-xs font-semibold text-foreground">
              {orderId}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-xs text-muted-foreground">Placed</span>
            <span className="text-xs font-semibold text-foreground">
              {formatDate(order.createdAt)}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-xs text-muted-foreground">Payment</span>
            <span className="text-xs font-semibold text-foreground">
              {order.paymentMethod}
            </span>
          </div>
          <div className="flex items-start gap-2 px-4 py-3">
            <MapPin
              size={13}
              className="mt-0.5 shrink-0 text-muted-foreground"
            />
            <span className="text-xs text-foreground break-words min-w-0 flex-1">
              {order.shippingAddress}
            </span>
          </div>
          {order.status !== OrderStatus.Cancelled && (
            <div className="flex items-center gap-2 px-4 py-3">
              <CalendarDays
                size={13}
                className="shrink-0 text-muted-foreground"
              />
              <span className="text-xs text-foreground">
                Est. delivery: {estimatedDelivery(order.createdAt)}
              </span>
            </div>
          )}
        </div>

        {/* Security badges */}
        <SecureBadge variant="both" />
      </motion.div>
    </div>
  );
}
