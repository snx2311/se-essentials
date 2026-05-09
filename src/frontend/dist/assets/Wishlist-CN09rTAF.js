import { j as jsxRuntimeExports, b as cn, u as useNavigate, L as LoadingScreen, H as Heart } from "./index-DHY5Q3pY.js";
import { S as Slot, b as cva, u as useActor, a as useQuery, m as motion, c as createActor, M as MemberTier } from "./proxy-B6IjP56z.js";
import { E as EmptyState } from "./EmptyState-Ckoni5UE.js";
import { P as ProductCard } from "./ProductCard-rjmmFuVA.js";
import { u as useCart } from "./useCart-CKEjTpkY.js";
import { u as useWishlist } from "./useWishlist-DOJ8UmbQ.js";
import "./useMutation-BAgZFTt7.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Wishlist() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const {
    items: wishlistIds,
    has,
    toggle,
    isLoading: wishlistLoading
  } = useWishlist();
  const { addItem } = useCart();
  const { data: wishlistedProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["wishlist-products", wishlistIds.map(String).join(",")],
    queryFn: async () => {
      if (!actor || wishlistIds.length === 0) return [];
      const results = await Promise.all(
        wishlistIds.map((id) => actor.getProduct(id))
      );
      return results.filter((p) => p !== null).map((p) => ({
        ...p,
        tierRequired: p.tierRequired ?? MemberTier.Standard,
        distanceKm: p.distanceKm ?? 0
      }));
    },
    enabled: !!actor && !isFetching && !wishlistLoading
  });
  const isLoading = wishlistLoading || productsLoading;
  const products = (wishlistedProducts ?? []).filter((p) => has(p.id));
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      "data-ocid": "wishlist.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 border-b border-border bg-card px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "My Wishlist" }),
            products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "rounded-full px-2 py-0.5 text-xs font-semibold",
                "data-ocid": "wishlist.count_badge",
                children: products.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: products.length === 0 ? "No saved items" : `${products.length} saved item${products.length !== 1 ? "s" : ""}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-background px-3 py-4", children: products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 28 }),
            title: "Your wishlist is empty",
            description: "Tap the heart on any product to save it here for later.",
            action: {
              label: "Browse Products",
              onClick: () => navigate({ to: "/" })
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 gap-3",
            "data-ocid": "wishlist.product_grid",
            children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.06, duration: 0.25 },
                "data-ocid": `wishlist.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProductCard,
                  {
                    product,
                    onBuyNow: (p) => {
                      addItem({
                        productId: p.id,
                        title: p.title,
                        price: p.price,
                        cryptoPrice: p.cryptoPrice,
                        imageUrl: p.imageUrl,
                        quantity: 1
                      });
                      navigate({ to: "/checkout" });
                    },
                    onToggleWishlist: toggle,
                    isWishlisted: has(product.id),
                    index: i
                  }
                )
              },
              String(product.id)
            ))
          }
        ) })
      ]
    }
  );
}
export {
  Wishlist as default
};
