import { f as useInternetIdentity, u as useNavigate, j as jsxRuntimeExports, L as LoadingScreen, P as Package, b as cn } from "./index-DHY5Q3pY.js";
import { u as useActor, a as useQuery, B as Button, m as motion, O as OrderStatus, c as createActor } from "./proxy-B6IjP56z.js";
import { E as EmptyState } from "./EmptyState-Ckoni5UE.js";
import { u as useAuth } from "./useAuth-BkqJTcKj.js";
import { L as LogIn } from "./log-in-BltMg0Dq.js";
import { C as ChevronRight } from "./chevron-right-f5uM3weF.js";
function statusBadgeClass(status) {
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
function statusLabel(status) {
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
function formatDate(nanoTimestamp) {
  return new Date(Number(nanoTimestamp) / 1e6).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );
}
function GuestPrompt() {
  const { login } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-5 py-20 px-6 text-center",
      "data-ocid": "orders.guest_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 24, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Sign in to view orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your order history is stored securely with your identity." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: login,
            className: "mt-2 rounded-lg",
            "data-ocid": "orders.login_button",
            children: "Continue with Internet Identity"
          }
        )
      ]
    }
  );
}
function Orders() {
  const { actor, isFetching } = useActor(createActor);
  const { loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = loginStatus === "success";
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(GuestPrompt, {});
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Order History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
        orders.length,
        " ",
        orders.length === 1 ? "order" : "orders"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background px-4 py-4", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 28 }),
        title: "No orders yet",
        description: "Your confirmed orders will appear here.",
        action: {
          label: "Start Shopping",
          onClick: () => navigate({ to: "/" })
        },
        className: ""
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "orders.list", children: orders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderRow,
      {
        order,
        index: i,
        onNavigate: () => navigate({
          to: "/orders/$id",
          params: { id: String(order.id) }
        })
      },
      String(order.id)
    )) }) })
  ] });
}
function OrderRow({
  order,
  index,
  onNavigate
}) {
  const { actor, isFetching } = useActor(createActor);
  const { data: product } = useQuery({
    queryKey: ["product", String(order.productId)],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(order.productId);
    },
    enabled: !!actor && !isFetching
  });
  const totalPrice = product ? Number(product.price) / 100 * Number(order.quantity) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06 },
      onClick: onNavigate,
      className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-smooth hover:shadow-subtle active:scale-[0.98]",
      "data-ocid": `orders.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted", children: (product == null ? void 0 : product.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.imageUrl,
            alt: product.title,
            className: "h-full w-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 20, className: "text-muted-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground truncate", children: (product == null ? void 0 : product.title) ?? `Order #${String(order.id).padStart(3, "0")}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "#",
            String(order.id).padStart(3, "0"),
            " ·",
            " ",
            formatDate(order.createdAt)
          ] }),
          totalPrice !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mt-1", children: [
            "$",
            totalPrice.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                statusBadgeClass(order.status)
              ),
              children: statusLabel(order.status)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 15, className: "text-muted-foreground" })
        ] })
      ]
    }
  );
}
export {
  Orders as default
};
