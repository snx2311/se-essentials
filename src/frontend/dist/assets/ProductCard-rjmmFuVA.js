import { j as jsxRuntimeExports, H as Heart, b as cn } from "./index-DHY5Q3pY.js";
import { B as Button } from "./proxy-B6IjP56z.js";
import { a as StarRating } from "./useWishlist-DOJ8UmbQ.js";
function ProductCard({
  product,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  index = 0,
  className
}) {
  const ocidBase = `product.item.${index + 1}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-smooth hover:shadow-xs",
        className
      ),
      "data-ocid": ocidBase,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-t-2xl bg-muted", children: [
          product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.title,
              className: "h-full w-full object-cover transition-smooth group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-muted-foreground/20", children: "SE" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onToggleWishlist(product.id),
              "aria-label": isWishlisted ? "Remove from wishlist" : "Add to wishlist",
              className: cn(
                "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 shadow-xs transition-smooth hover:bg-card"
              ),
              "data-ocid": `product.wishlist_toggle.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  size: 14,
                  className: cn(
                    "transition-smooth",
                    isWishlisted ? "fill-foreground text-foreground" : "fill-transparent text-muted-foreground"
                  )
                }
              )
            }
          ),
          !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 top-2 rounded-sm bg-foreground px-2 py-0.5 text-xs font-semibold text-background", children: "Sold Out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-1 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-1 text-xs font-medium text-muted-foreground uppercase tracking-widest", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 text-sm font-bold text-foreground leading-snug", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: Number(product.rating), size: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              Number(product.reviewCount),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
            product.distanceKm.toFixed(1),
            " km away"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold text-foreground", children: (Number(product.price) / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            }) }),
            product.cryptoPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs text-muted-foreground", children: product.cryptoPrice })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            disabled: !product.inStock,
            onClick: () => onBuyNow(product),
            className: "w-full rounded-lg text-xs font-semibold uppercase tracking-widest",
            "data-ocid": `product.buy_button.${index + 1}`,
            children: product.inStock ? "Buy Now" : "Out of Stock"
          }
        ) })
      ]
    }
  );
}
export {
  ProductCard as P
};
