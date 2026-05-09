import { Category, MemberTier, createActor } from "@/backend";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { ProductCard } from "@/components/ProductCard";
import { SecureBadge } from "@/components/SecureBadge";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  ImageIcon,
  PaintbrushVertical,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Seed content ────────────────────────────────────────────────────────────

const SEED_PRODUCTS: Product[] = [
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
    distanceKm: 1.2,
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
    distanceKm: 3.4,
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
    distanceKm: 5.7,
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
    distanceKm: 0.8,
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
    distanceKm: 8.1,
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
    distanceKm: 2.9,
  },
];

// ─── Category row ─────────────────────────────────────────────────────────────

const CATEGORY_ITEMS = [
  { id: "All", label: "All", Icon: ShoppingBag },
  { id: Category.DigitalArt, label: "Digital Art", Icon: PaintbrushVertical },
  { id: Category.DesignerGoods, label: "Designer Goods", Icon: Sparkles },
  { id: "EliteServices", label: "Elite Services", Icon: Star },
  { id: "PrivateCollections", label: "Private Collections", Icon: ImageIcon },
];

// ─── Tier config ──────────────────────────────────────────────────────────────

const TIERS = [
  {
    tier: "Standard",
    label: "Standard",
    desc: "Access essentials",
    cls: "tier-standard",
    perks: ["Basic marketplace access", "Weekly curated drops"],
  },
  {
    tier: "Executive",
    label: "Executive",
    desc: "Priority listings",
    cls: "tier-executive",
    perks: ["Priority queue access", "Exclusive sale previews"],
  },
  {
    tier: "Elite",
    label: "Elite",
    desc: "First access always",
    cls: "tier-elite",
    perks: ["1-on-1 concierge", "Unreleased collector pieces"],
  },
] as const;

// ─── Home ─────────────────────────────────────────────────────────────────────

function canViewProduct(
  tierRequired: Product["tierRequired"],
  memberTier: MemberTier,
): boolean {
  if (tierRequired === MemberTier.Standard) return true;
  if (tierRequired === MemberTier.Executive)
    return (
      memberTier === MemberTier.Executive || memberTier === MemberTier.Elite
    );
  if (tierRequired === MemberTier.Elite) return memberTier === MemberTier.Elite;
  return false;
}

export default function Home() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const { has: isWishlisted, toggle } = useWishlist();
  const { addItem } = useCart();
  const { memberTier } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const { data: backendProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.listProducts();
      // Normalize backend products to include frontend-only fields with defaults
      return raw.map((p) => ({
        ...p,
        tierRequired: (p as Product).tierRequired ?? MemberTier.Standard,
        distanceKm: (p as Product).distanceKm ?? 0,
      })) as Product[];
    },
    enabled: !!actor && !isFetching,
  });

  const rawProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : SEED_PRODUCTS;

  // Apply tier visibility filter
  const products = rawProducts.filter((p) =>
    canViewProduct(p.tierRequired, memberTier),
  );

  const filtered =
    activeCategory === "All" ||
    activeCategory === "EliteServices" ||
    activeCategory === "PrivateCollections"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleBuyNow = (product: Product) => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      cryptoPrice: product.cryptoPrice,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    navigate({ to: "/checkout" });
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex flex-col" data-ocid="home.page">
      {/* ── Hero banner ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "30svh" }}
        data-ocid="home.hero_section"
      >
        <img
          src="/assets/generated/hero-banner.dim_800x400.jpg"
          alt="SE Essentials Premium Collection"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/60 to-foreground/30" />

        <div
          className="relative flex h-full flex-col justify-between px-5 py-5"
          style={{ minHeight: "30svh" }}
        >
          {/* Top-right secure badge */}
          <div className="flex justify-end">
            <SecureBadge variant="transaction" className="opacity-95" />
          </div>

          {/* Hero copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pb-1"
          >
            <p className="mb-1.5 inline-flex items-center gap-1.5 rounded-sm border border-background/25 bg-background/12 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-background/90">
              <span className="h-1 w-1 rounded-full bg-background/80" />
              SE Essentials Premium Access
            </p>
            <h1 className="font-display text-[1.65rem] font-bold leading-[1.15] text-background">
              Rare. Curated.
              <br />
              Exclusive.
            </h1>
            <p className="mt-1.5 text-[11px] font-medium text-background/65 tracking-wide">
              Digital Art &amp; Designer Goods — Yangon
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category scroll row ───────────────────────────────── */}
      <section
        className="border-b border-border bg-card px-4 py-3"
        data-ocid="home.category_section"
      >
        <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORY_ITEMS.map((cat, i) => (
            <motion.button
              key={cat.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActiveCategory(cat.id)}
              className="flex shrink-0 flex-col items-center gap-1.5"
              data-ocid={`home.category_tab.${i + 1}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-smooth ${
                  activeCategory === cat.id
                    ? "bg-foreground border-foreground text-background shadow-sm"
                    : "border-border bg-muted text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                <cat.Icon size={18} strokeWidth={1.75} />
              </div>
              <span
                className={`text-center text-[9px] font-semibold uppercase tracking-wider transition-smooth ${
                  activeCategory === cat.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                style={{ maxWidth: "3.5rem", lineHeight: 1.3 }}
              >
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Product grid ─────────────────────────────────────── */}
      <section
        className="bg-background px-3 py-4"
        data-ocid="home.products_section"
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-foreground">
            {activeCategory === "All"
              ? "All Products"
              : activeCategory === "EliteServices"
                ? "Elite Services"
                : activeCategory === "PrivateCollections"
                  ? "Private Collections"
                  : activeCategory === Category.DigitalArt
                    ? "Digital Art"
                    : "Designer Goods"}
          </h2>
          <span className="text-[10px] text-muted-foreground">
            {filtered.length} items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3" data-ocid="home.product_grid">
          {filtered.map((product, i) => (
            <motion.div
              key={String(product.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.42,
                delay: (i % 2) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard
                product={product}
                onBuyNow={handleBuyNow}
                onToggleWishlist={toggle}
                isWishlisted={isWishlisted(product.id)}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Member Highlights ────────────────────────────────── */}
      <section
        className="border-t border-border bg-muted/40 px-4 py-5"
        data-ocid="home.membership_section"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-foreground">
            Member Highlights
          </h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/membership" })}
            className="flex items-center gap-0.5 text-[10px] text-muted-foreground transition-smooth hover:text-foreground"
            data-ocid="home.membership_link"
          >
            View all <ChevronRight size={10} />
          </button>
        </div>

        <div className="flex gap-2.5">
          {TIERS.map(({ tier, label, desc, cls, perks }, i) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              className={`flex-1 rounded-lg p-3 ${cls}`}
              data-ocid={`home.tier.${tier.toLowerCase()}`}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-background">
                {label}
              </p>
              <p className="mt-0.5 text-[9px] leading-snug text-background/70">
                {desc}
              </p>
              <ul className="mt-2 space-y-0.5">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="text-[8px] leading-tight text-background/55"
                  >
                    · {perk}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => navigate({ to: "/membership" })}
                className="mt-3 w-full rounded-md border border-background/30 bg-background/10 py-1 text-[9px] font-bold uppercase tracking-wider text-background transition-smooth hover:bg-background/20"
                data-ocid={`home.tier.explore.${tier.toLowerCase()}`}
              >
                Explore
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Security strip ───────────────────────────────────── */}
      <section
        className="border-t border-border bg-card px-4 py-4"
        data-ocid="home.security_section"
      >
        <div className="flex flex-col items-center gap-2">
          <SecureBadge variant="both" className="justify-center" />
          <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            Encrypted Connection Active — Meta-Scrubbed Assets
          </p>
        </div>
      </section>
    </div>
  );
}
