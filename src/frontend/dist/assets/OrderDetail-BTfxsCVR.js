import { c as createLucideIcon, a as useParams, u as useNavigate, f as useInternetIdentity, j as jsxRuntimeExports, L as LoadingScreen, P as Package, b as cn, M as MapPin } from "./index-DHY5Q3pY.js";
import { u as useActor, a as useQuery, B as Button, O as OrderStatus, m as motion, c as createActor } from "./proxy-B6IjP56z.js";
import { S as SecureBadge } from "./SecureBadge-ZoLhCeV2.js";
import { u as useAuth } from "./useAuth-BkqJTcKj.js";
import { A as ArrowLeft } from "./arrow-left-CRWAbBYt.js";
import { L as LogIn } from "./log-in-BltMg0Dq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
const STATUS_STEPS = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Delivered
];
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
function stepLabel(step) {
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
function formatDate(nanoTimestamp) {
  return new Date(Number(nanoTimestamp) / 1e6).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );
}
function estimatedDelivery(nanoTimestamp) {
  const base = new Date(Number(nanoTimestamp) / 1e6);
  const earliest = new Date(base);
  const latest = new Date(base);
  earliest.setDate(base.getDate() + 3);
  latest.setDate(base.getDate() + 7);
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(earliest)} – ${fmt(latest)}`;
}
function GuestPrompt() {
  const { login } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-5 py-20 px-6 text-center",
      "data-ocid": "order_detail.guest_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 24, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: "Sign in to view order details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Authenticate with Internet Identity to access your orders." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: login,
            className: "mt-2 rounded-lg",
            "data-ocid": "order_detail.login_button",
            children: "Continue with Internet Identity"
          }
        )
      ]
    }
  );
}
function OrderDetail() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const { loginStatus } = useInternetIdentity();
  const isAuthenticated = loginStatus === "success";
  const { data: order, isLoading: orderLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getOrder(BigInt(id));
      return result ?? null;
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
  const { data: product, isLoading: productLoading } = useQuery(
    {
      queryKey: ["product", order ? String(order.productId) : ""],
      queryFn: async () => {
        if (!actor || !order) return null;
        const result = await actor.getProduct(order.productId);
        return result ?? null;
      },
      enabled: !!actor && !isFetching && !!order
    }
  );
  if (!isAuthenticated) return /* @__PURE__ */ jsxRuntimeExports.jsx(GuestPrompt, {});
  if (orderLoading || productLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  if (!order)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 px-6 text-center",
        "data-ocid": "order_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 24, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold", children: "Order not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "This order may no longer exist or belong to another account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "mt-5 rounded-lg",
              onClick: () => navigate({ to: "/orders" }),
              "data-ocid": "order_detail.back_button",
              children: "Back to Orders"
            }
          )
        ]
      }
    );
  const stepIndex = STATUS_STEPS.indexOf(order.status);
  const unitPrice = product ? Number(product.price) / 100 : 0;
  const quantity = Number(order.quantity);
  const total = unitPrice * quantity;
  const orderId = `#${String(order.id).padStart(3, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "order_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-[57px] z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/orders" }),
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          "aria-label": "Back to orders",
          "data-ocid": "order_detail.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20, strokeWidth: 1.75 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm font-bold text-foreground", children: [
        "Order ",
        orderId
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "ml-auto rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            statusBadgeClass(order.status)
          ),
          children: order.status
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.25 },
        className: "px-4 py-5 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-4 rounded-2xl border border-border bg-card p-4",
              "data-ocid": "order_detail.product_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted", children: (product == null ? void 0 : product.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.title,
                    className: "h-full w-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 22, className: "text-muted-foreground" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground leading-snug", children: (product == null ? void 0 : product.title) ?? "Unknown Product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Unit price" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
                        "$",
                        unitPrice.toFixed(2)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Quantity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground", children: [
                        "×",
                        quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-t border-border pt-1 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground", children: "Total" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
                        "$",
                        total.toFixed(2)
                      ] })
                    ] })
                  ] })
                ] })
              ]
            }
          ),
          order.status !== OrderStatus.Cancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-3 rounded-2xl border border-border bg-card p-4",
              "data-ocid": "order_detail.tracking_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest text-foreground", children: "Tracking" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: STATUS_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-smooth",
                        i <= stepIndex ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground"
                      ),
                      children: i + 1
                    }
                  ),
                  i < STATUS_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "h-0.5 flex-1",
                        i < stepIndex ? "bg-foreground" : "bg-border"
                      )
                    }
                  )
                ] }, step)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between", children: STATUS_STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: stepLabel(s) }, s)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-card divide-y divide-border",
              "data-ocid": "order_detail.details_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Order ID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: orderId })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Placed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: formatDate(order.createdAt) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Payment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: order.paymentMethod })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MapPin,
                    {
                      size: 13,
                      className: "mt-0.5 shrink-0 text-muted-foreground"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground break-words min-w-0 flex-1", children: order.shippingAddress })
                ] }),
                order.status !== OrderStatus.Cancelled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CalendarDays,
                    {
                      size: 13,
                      className: "shrink-0 text-muted-foreground"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground", children: [
                    "Est. delivery: ",
                    estimatedDelivery(order.createdAt)
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "both" })
        ]
      }
    )
  ] });
}
export {
  OrderDetail as default
};
