import { c as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as LoadingScreen, S as ShoppingBag } from "./index-DHY5Q3pY.js";
import { u as useActor, a as useQuery, M as MemberTier, C as Category, m as motion, c as createActor } from "./proxy-B6IjP56z.js";
import { P as ProductCard } from "./ProductCard-rjmmFuVA.js";
import { S as SecureBadge } from "./SecureBadge-ZoLhCeV2.js";
import { u as useAuth } from "./useAuth-BkqJTcKj.js";
import { u as useCart } from "./useCart-CKEjTpkY.js";
import { u as useWishlist, S as Star } from "./useWishlist-DOJ8UmbQ.js";
import { C as ChevronRight } from "./chevron-right-f5uM3weF.js";
import "./useMutation-BAgZFTt7.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v4", key: "qmzblu" }],
  ["path", { d: "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z", key: "ycvu00" }],
  [
    "path",
    {
      d: "M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",
      key: "iw4wnp"
    }
  ]
];
const PaintbrushVertical = createLucideIcon("paintbrush-vertical", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const SEED_PRODUCTS = [
  {
    id: 1n,
    title: "Obsidian Series No. 7",
    description: "Rare generative digital art — 1/1 on-chain",
    imageUrl: "",
    category: Category.DigitalArt,
    rating: 5n,
    cryptoPrice: "0.042 ETH",
    price: 1200n,
    reviewCount: 38n,
    inStock: true,
    tierRequired: MemberTier.Standard,
    distanceKm: 1.2
  },
  {
    id: 2n,
    title: "Monolith Sculpture Print",
    description: "Limited edition print run of 25",
    imageUrl: "",
    category: Category.DesignerGoods,
    rating: 4n,
    price: 890n,
    reviewCount: 17n,
    inStock: true,
    tierRequired: MemberTier.Standard,
    distanceKm: 3.4
  },
  {
    id: 3n,
    title: "Void Vessel Ceramics",
    description: "Hand-thrown matte black ceramic set",
    imageUrl: "",
    category: Category.DesignerGoods,
    rating: 5n,
    price: 540n,
    reviewCount: 22n,
    inStock: true,
    tierRequired: MemberTier.Executive,
    distanceKm: 5.7
  },
  {
    id: 4n,
    title: "Cipher Bloom Collection",
    description: "10-piece algorithmic art series",
    imageUrl: "",
    category: Category.DigitalArt,
    rating: 4n,
    cryptoPrice: "0.018 ETH",
    price: 480n,
    reviewCount: 9n,
    inStock: false,
    tierRequired: MemberTier.Elite,
    distanceKm: 0.8
  },
  {
    id: 5n,
    title: "Silent Grid Poster",
    description: "Archival ink on 300gsm cotton rag",
    imageUrl: "",
    category: Category.DesignerGoods,
    rating: 5n,
    price: 240n,
    reviewCount: 44n,
    inStock: true,
    tierRequired: MemberTier.Standard,
    distanceKm: 8.1
  },
  {
    id: 6n,
    title: "Null Space NFT",
    description: "On-chain generative 1/1 provenance",
    imageUrl: "",
    category: Category.DigitalArt,
    rating: 5n,
    cryptoPrice: "0.12 ETH",
    price: 3200n,
    reviewCount: 5n,
    inStock: true,
    tierRequired: MemberTier.Elite,
    distanceKm: 2.9
  }
];
const CATEGORY_ITEMS = [
  { id: "All", label: "All", Icon: ShoppingBag },
  { id: Category.DigitalArt, label: "Digital Art", Icon: PaintbrushVertical },
  { id: Category.DesignerGoods, label: "Designer Goods", Icon: Sparkles },
  { id: "EliteServices", label: "Elite Services", Icon: Star },
  { id: "PrivateCollections", label: "Private Collections", Icon: Image }
];
const TIERS = [
  {
    tier: "Standard",
    label: "Standard",
    desc: "Access essentials",
    cls: "tier-standard",
    perks: ["Basic marketplace access", "Weekly curated drops"]
  },
  {
    tier: "Executive",
    label: "Executive",
    desc: "Priority listings",
    cls: "tier-executive",
    perks: ["Priority queue access", "Exclusive sale previews"]
  },
  {
    tier: "Elite",
    label: "Elite",
    desc: "First access always",
    cls: "tier-elite",
    perks: ["1-on-1 concierge", "Unreleased collector pieces"]
  }
];
function canViewProduct(tierRequired, memberTier) {
  if (tierRequired === MemberTier.Standard) return true;
  if (tierRequired === MemberTier.Executive)
    return memberTier === MemberTier.Executive || memberTier === MemberTier.Elite;
  if (tierRequired === MemberTier.Elite) return memberTier === MemberTier.Elite;
  return false;
}
function Home() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const { has: isWishlisted, toggle } = useWishlist();
  const { addItem } = useCart();
  const { memberTier } = useAuth();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const { data: backendProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.listProducts();
      return raw.map((p) => ({
        ...p,
        tierRequired: p.tierRequired ?? MemberTier.Standard,
        distanceKm: p.distanceKm ?? 0
      }));
    },
    enabled: !!actor && !isFetching
  });
  const rawProducts = backendProducts && backendProducts.length > 0 ? backendProducts : SEED_PRODUCTS;
  const products = rawProducts.filter(
    (p) => canViewProduct(p.tierRequired, memberTier)
  );
  const filtered = activeCategory === "All" || activeCategory === "EliteServices" || activeCategory === "PrivateCollections" ? products : products.filter((p) => p.category === activeCategory);
  const handleBuyNow = (product) => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      cryptoPrice: product.cryptoPrice,
      imageUrl: product.imageUrl,
      quantity: 1
    });
    navigate({ to: "/checkout" });
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { minHeight: "30svh" },
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-banner.dim_800x400.jpg",
              alt: "SE Essentials Premium Collection",
              className: "absolute inset-0 h-full w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/60 to-foreground/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex h-full flex-col justify-between px-5 py-5",
              style: { minHeight: "30svh" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "transaction", className: "opacity-95" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 14 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    className: "pb-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-1.5 inline-flex items-center gap-1.5 rounded-sm border border-background/25 bg-background/12 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-background/90", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-background/80" }),
                        "SE Essentials Premium Access"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[1.65rem] font-bold leading-[1.15] text-background", children: [
                        "Rare. Curated.",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                        "Exclusive."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-[11px] font-medium text-background/65 tracking-wide", children: "Digital Art & Designer Goods — Yangon" })
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "border-b border-border bg-card px-4 py-3",
        "data-ocid": "home.category_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-1 scrollbar-hide", children: CATEGORY_ITEMS.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.06 },
            onClick: () => setActiveCategory(cat.id),
            className: "flex shrink-0 flex-col items-center gap-1.5",
            "data-ocid": `home.category_tab.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex h-12 w-12 items-center justify-center rounded-full border transition-smooth ${activeCategory === cat.id ? "bg-foreground border-foreground text-background shadow-sm" : "border-border bg-muted text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(cat.Icon, { size: 18, strokeWidth: 1.75 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-center text-[9px] font-semibold uppercase tracking-wider transition-smooth ${activeCategory === cat.id ? "text-foreground" : "text-muted-foreground"}`,
                  style: { maxWidth: "3.5rem", lineHeight: 1.3 },
                  children: cat.label
                }
              )
            ]
          },
          cat.id
        )) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "bg-background px-3 py-4",
        "data-ocid": "home.products_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-bold uppercase tracking-widest text-foreground", children: activeCategory === "All" ? "All Products" : activeCategory === "EliteServices" ? "Elite Services" : activeCategory === "PrivateCollections" ? "Private Collections" : activeCategory === Category.DigitalArt ? "Digital Art" : "Designer Goods" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              filtered.length,
              " items"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "home.product_grid", children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-40px" },
              transition: {
                duration: 0.42,
                delay: i % 2 * 0.08,
                ease: [0.22, 1, 0.36, 1]
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProductCard,
                {
                  product,
                  onBuyNow: handleBuyNow,
                  onToggleWishlist: toggle,
                  isWishlisted: isWishlisted(product.id),
                  index: i
                }
              )
            },
            String(product.id)
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "border-t border-border bg-muted/40 px-4 py-5",
        "data-ocid": "home.membership_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[11px] font-bold uppercase tracking-widest text-foreground", children: "Member Highlights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: "/membership" }),
                className: "flex items-center gap-0.5 text-[10px] text-muted-foreground transition-smooth hover:text-foreground",
                "data-ocid": "home.membership_link",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 10 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2.5", children: TIERS.map(({ tier, label, desc, cls, perks }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.1, duration: 0.35 },
              className: `flex-1 rounded-lg p-3 ${cls}`,
              "data-ocid": `home.tier.${tier.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-background", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[9px] leading-snug text-background/70", children: desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-0.5", children: perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "text-[8px] leading-tight text-background/55",
                    children: [
                      "· ",
                      perk
                    ]
                  },
                  perk
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({ to: "/membership" }),
                    className: "mt-3 w-full rounded-md border border-background/30 bg-background/10 py-1 text-[9px] font-bold uppercase tracking-wider text-background transition-smooth hover:bg-background/20",
                    "data-ocid": `home.tier.explore.${tier.toLowerCase()}`,
                    children: "Explore"
                  }
                )
              ]
            },
            tier
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "border-t border-border bg-card px-4 py-4",
        "data-ocid": "home.security_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "both", className: "justify-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-medium uppercase tracking-widest text-muted-foreground", children: "Encrypted Connection Active — Meta-Scrubbed Assets" })
        ] })
      }
    )
  ] });
}
export {
  Home as default
};
