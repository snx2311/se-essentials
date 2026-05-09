import { createActor } from "@/backend";
import type { Order } from "@/backend";
import { OrderStatus } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRight, LogIn, Package } from "lucide-react";
import { motion } from "motion/react";

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

function statusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "Pending";
    case OrderStatus.Processing:
      return "Processing";
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.Cancelled:
      return "Cancelled";
  }
}

function formatDate(nanoTimestamp: bigint): string {
  return new Date(Number(nanoTimestamp) / 1_000_000).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );
}

function GuestPrompt() {
  const { login } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-20 px-6 text-center"
      data-ocid="orders.guest_state"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <LogIn size={24} className="text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-bold text-foreground">
          Sign in to view orders
        </h3>
        <p className="text-sm text-muted-foreground">
          Your order history is stored securely with your identity.
        </p>
      </div>
      <Button
        type="button"
        onClick={login}
        className="mt-2 rounded-lg"
        data-ocid="orders.login_button"
      >
        Continue with Internet Identity
      </Button>
    </div>
  );
}

export default function Orders() {
  const { actor, isFetching } = useActor(createActor);
  const { loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = loginStatus === "success";

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  if (!isAuthenticated) return <GuestPrompt />;
  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex flex-col" data-ocid="orders.page">
      {/* Page header */}
      <div className="border-b border-border bg-card px-4 py-4">
        <h1 className="font-display text-xl font-bold text-foreground">
          Order History
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>

      <div className="bg-background px-4 py-4">
        {orders.length === 0 ? (
          <EmptyState
            icon={<Package size={28} />}
            title="No orders yet"
            description="Your confirmed orders will appear here."
            action={{
              label: "Start Shopping",
              onClick: () => navigate({ to: "/" }),
            }}
            className=""
          />
        ) : (
          <div className="flex flex-col gap-3" data-ocid="orders.list">
            {orders.map((order, i) => (
              <OrderRow
                key={String(order.id)}
                order={order}
                index={i}
                onNavigate={() =>
                  navigate({
                    to: "/orders/$id",
                    params: { id: String(order.id) },
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderRow({
  order,
  index,
  onNavigate,
}: {
  order: Order;
  index: number;
  onNavigate: () => void;
}) {
  const { actor, isFetching } = useActor(createActor);

  const { data: product } = useQuery({
    queryKey: ["product", String(order.productId)],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(order.productId);
    },
    enabled: !!actor && !isFetching,
  });

  const totalPrice = product
    ? (Number(product.price) / 100) * Number(order.quantity)
    : null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={onNavigate}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-smooth hover:shadow-subtle active:scale-[0.98]"
      data-ocid={`orders.item.${index + 1}`}
    >
      {/* Thumbnail */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
        {product?.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package size={20} className="text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-foreground truncate">
          {product?.title ?? `Order #${String(order.id).padStart(3, "0")}`}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          #{String(order.id).padStart(3, "0")} &middot;{" "}
          {formatDate(order.createdAt)}
        </p>
        {totalPrice !== null && (
          <p className="text-xs font-semibold text-foreground mt-1">
            ${totalPrice.toFixed(2)}
          </p>
        )}
      </div>

      {/* Status + arrow */}
      <div className="flex flex-col items-end gap-1.5">
        <span
          className={cn(
            "rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            statusBadgeClass(order.status),
          )}
        >
          {statusLabel(order.status)}
        </span>
        <ChevronRight size={15} className="text-muted-foreground" />
      </div>
    </motion.button>
  );
}
