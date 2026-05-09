import { c as createLucideIcon, a as useParams, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as LoadingScreen, H as Heart, b as cn } from "./index-DHY5Q3pY.js";
import { u as useActor, a as useQuery, B as Button, m as motion, c as createActor, M as MemberTier } from "./proxy-B6IjP56z.js";
import { S as SecureBadge } from "./SecureBadge-ZoLhCeV2.js";
import { u as useWishlist, a as StarRating, S as Star } from "./useWishlist-DOJ8UmbQ.js";
import { u as useCart } from "./useCart-CKEjTpkY.js";
import { A as ArrowLeft } from "./arrow-left-CRWAbBYt.js";
import "./useMutation-BAgZFTt7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function centsToUSD(cents) {
  const dollars = Number(cents) / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
}
const RATING_BREAKDOWN = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 2 }
];
function ProductDetail() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const [quantity, setQuantity] = reactExports.useState(1);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      const raw = await actor.getProduct(BigInt(id));
      if (!raw) return null;
      return {
        ...raw,
        tierRequired: raw.tierRequired ?? MemberTier.Standard,
        distanceKm: raw.distanceKm ?? 0
      };
    },
    enabled: !!actor && !isFetching
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  if (!product)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 px-6 text-center",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-bold text-foreground/10 mb-3", children: "SE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold text-foreground", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "This item may have been removed or is no longer available." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "mt-5 rounded-lg",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "product_detail.back_button",
              children: "Back to Shop"
            }
          )
        ]
      }
    );
  const wishlisted = has(product.id);
  const rating = Number(product.rating);
  const reviews = Number(product.reviewCount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pb-24", "data-ocid": "product_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-[57px] z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/" }),
          className: "text-muted-foreground hover:text-foreground transition-smooth",
          "aria-label": "Go back",
          "data-ocid": "product_detail.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20, strokeWidth: 1.75 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-bold text-foreground line-clamp-1 flex-1 min-w-0", children: product.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => toggle(product.id),
          "aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
          className: "flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-smooth",
          "data-ocid": "product_detail.wishlist_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              size: 16,
              className: cn(
                wishlisted ? "fill-foreground text-foreground" : "fill-transparent text-muted-foreground"
              )
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-4 mt-4 overflow-hidden rounded-[16px] aspect-square bg-muted", children: [
      product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.imageUrl,
          alt: product.title,
          className: "h-full w-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-6xl font-bold text-muted-foreground/10", children: "SE" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-[16px]" }),
      !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/60 rounded-[16px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-foreground", children: "Out of Stock" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.32 },
        className: "px-4 pt-5 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: product.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-2xl font-bold text-foreground leading-tight", children: product.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-bold text-foreground", children: centsToUSD(product.price) }),
            product.cryptoPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground border border-border rounded-full px-2 py-0.5", children: product.cryptoPrice })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating, size: 15 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: rating.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              reviews.toLocaleString(),
              " reviews)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground/70", children: [
              product.distanceKm.toFixed(1),
              " km away"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-[16px] border border-border bg-muted/40 px-4 py-4 space-y-2",
              "data-ocid": "product_detail.rating_breakdown",
              children: RATING_BREAKDOWN.map(({ stars, pct }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 text-xs text-muted-foreground text-right", children: stars }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 10,
                    className: "fill-foreground text-foreground shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full bg-foreground transition-smooth",
                    style: { width: `${pct}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-7 text-xs text-muted-foreground text-right", children: [
                  pct,
                  "%"
                ] })
              ] }, stars))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: product.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "both" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between",
              "data-ocid": "product_detail.quantity_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-foreground", children: "Quantity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-[16px] border border-border bg-card px-3 py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Decrease quantity",
                      onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                      disabled: quantity <= 1,
                      className: "flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background disabled:opacity-30 hover:bg-muted transition-smooth",
                      "data-ocid": "product_detail.qty_decrease",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12, strokeWidth: 2.5 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-5 text-center text-sm font-bold text-foreground",
                      "data-ocid": "product_detail.qty_value",
                      children: quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Increase quantity",
                      onClick: () => setQuantity((q) => Math.min(5, q + 1)),
                      disabled: quantity >= 5,
                      className: "flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background disabled:opacity-30 hover:bg-muted transition-smooth",
                      "data-ocid": "product_detail.qty_increase",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12, strokeWidth: 2.5 })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              disabled: !product.inStock,
              className: "w-full rounded-[16px] py-6 text-sm font-bold uppercase tracking-widest",
              onClick: () => {
                addItem({
                  productId: product.id,
                  title: product.title,
                  price: product.price,
                  cryptoPrice: product.cryptoPrice,
                  imageUrl: product.imageUrl,
                  quantity
                });
                navigate({ to: "/checkout" });
              },
              "data-ocid": "product_detail.add_to_cart_button",
              children: product.inStock ? `Add to Cart — ${centsToUSD(product.price * BigInt(quantity))}` : "Out of Stock"
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  ProductDetail as default
};
