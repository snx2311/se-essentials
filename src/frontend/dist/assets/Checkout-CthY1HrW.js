import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, P as Package, d as LoadingSpinner } from "./index-DHY5Q3pY.js";
import { u as useActor, m as motion, B as Button, c as createActor } from "./proxy-B6IjP56z.js";
import { L as Lock, S as SecureBadge } from "./SecureBadge-ZoLhCeV2.js";
import { L as Label } from "./label-Df0WAzhC.js";
import { u as useCart } from "./useCart-CKEjTpkY.js";
import { u as useMutation } from "./useMutation-BAgZFTt7.js";
import { u as ue } from "./index-CqmhkrsK.js";
import { A as ArrowLeft } from "./arrow-left-CRWAbBYt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const SHIPPING_CENTS = 1500n;
function centsToUSD(cents) {
  return (Number(cents) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
}
const PAYMENT_METHODS = [
  { id: "Credit Card", label: "Credit Card", icon: CreditCard },
  { id: "Crypto", label: "Crypto", icon: Lock }
];
function Checkout() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const [address, setAddress] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState(
    "Credit Card"
  );
  const subtotal = total();
  const grandTotal = subtotal + SHIPPING_CENTS;
  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor || items.length === 0) throw new Error("No items in cart");
      if (!address.trim()) throw new Error("Shipping address required");
      const item = items[0];
      return actor.placeOrder(
        item.productId,
        BigInt(item.quantity),
        address.trim(),
        paymentMethod
      );
    },
    onSuccess: () => {
      ue.success("Order placed successfully! Your items are on their way.");
      clear();
      navigate({ to: "/orders" });
    },
    onError: (err) => ue.error(
      err.message === "Shipping address required" ? err.message : "Failed to place order. Please try again."
    )
  });
  const isDisabled = items.length === 0 || !address.trim() || mutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-24", "data-ocid": "checkout.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-[57px] z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/" }),
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          "aria-label": "Go back",
          "data-ocid": "checkout.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20, strokeWidth: 1.75 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-foreground", children: "Secure Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13, className: "ml-auto text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "space-y-3",
          "data-ocid": "checkout.order_summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 13, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest text-foreground", children: "Order Summary" })
            ] }),
            items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center py-10 text-center rounded-[16px] border border-dashed border-border",
                "data-ocid": "checkout.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 28, className: "text-muted-foreground/40 mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Your cart is empty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add items to continue checkout" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "mt-4 rounded-lg text-xs",
                      onClick: () => navigate({ to: "/" }),
                      children: "Browse Products"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[16px] border border-border overflow-hidden", children: [
              items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-3 p-3 ${i < items.length - 1 ? "border-b border-border" : ""}`,
                  "data-ocid": `checkout.order_item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-muted border border-border", children: item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.imageUrl,
                        alt: item.title,
                        className: "h-full w-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground/30", children: "SE" }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: item.title }),
                      item.cryptoPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: item.cryptoPrice }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Decrease",
                            onClick: () => updateQuantity(item.productId, item.quantity - 1),
                            className: "flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-smooth text-xs",
                            "data-ocid": `checkout.qty_decrease.${i + 1}`,
                            children: "−"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs font-semibold text-foreground w-4 text-center",
                            "data-ocid": `checkout.qty.${i + 1}`,
                            children: item.quantity
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "aria-label": "Increase",
                            onClick: () => updateQuantity(
                              item.productId,
                              Math.min(5, item.quantity + 1)
                            ),
                            className: "flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-smooth text-xs",
                            "data-ocid": `checkout.qty_increase.${i + 1}`,
                            children: "+"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => removeItem(item.productId),
                            className: "ml-1 text-[10px] text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2",
                            "data-ocid": `checkout.remove_item.${i + 1}`,
                            children: "Remove"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-foreground", children: centsToUSD(item.price * BigInt(item.quantity)) }),
                      item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                        centsToUSD(item.price),
                        " each"
                      ] })
                    ] })
                  ]
                },
                String(item.productId)
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border bg-muted/40 px-4 py-3 space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: centsToUSD(subtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 10 }),
                    "Shipping (flat)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: centsToUSD(SHIPPING_CENTS) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1.5 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-foreground", children: centsToUSD(grandTotal) })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "space-y-3",
          "data-ocid": "checkout.shipping_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 13, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest text-foreground", children: "Shipping Address" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", className: "text-xs text-muted-foreground", children: "Delivery Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "address",
                  placeholder: "Full address, city & postal code\ne.g. 42 Merchant St, Yangon, Myanmar 11181",
                  value: address,
                  onChange: (e) => setAddress(e.target.value),
                  rows: 3,
                  className: "w-full resize-none rounded-[12px] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-smooth",
                  "data-ocid": "checkout.address_input"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "space-y-3",
          "data-ocid": "checkout.payment_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 13, className: "text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-widest text-foreground", children: "Payment Method" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: PAYMENT_METHODS.map(({ id, label, icon: Icon }) => {
              const selected = paymentMethod === id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setPaymentMethod(id),
                  className: `flex flex-col items-center gap-1.5 rounded-[16px] border py-4 text-xs font-semibold uppercase tracking-wider transition-smooth ${selected ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:bg-muted/50"}`,
                  "data-ocid": `checkout.payment_method.${id.toLowerCase().replace(" ", "_")}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, strokeWidth: 1.75 }),
                    label
                  ]
                },
                id
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "both" }),
      mutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive text-center",
          "data-ocid": "checkout.error_state",
          children: "Order failed. Please check your details and try again."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          disabled: isDisabled,
          onClick: () => mutation.mutate(),
          className: "w-full rounded-[16px] py-6 text-sm font-bold uppercase tracking-widest",
          "data-ocid": "checkout.submit_button",
          children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            "Placing Order…"
          ] }) : `Confirm Order — ${centsToUSD(grandTotal)}`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] text-muted-foreground", children: "Encrypted Connection Active · Meta-Scrubbed" })
    ] })
  ] });
}
export {
  Checkout as default
};
