import { MemberTier, createActor } from "@/backend";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { SecureBadge } from "@/components/SecureBadge";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Heart, Minus, Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function centsToUSD(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

const RATING_BREAKDOWN = [
  { stars: 5, pct: 68 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 2 },
];

export default function ProductDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { actor, isFetching } = useActor(createActor);
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor) return null;
      const raw = await actor.getProduct(BigInt(id));
      if (!raw) return null;
      return {
        ...raw,
        tierRequired: (raw as Product).tierRequired ?? MemberTier.Standard,
        distanceKm: (raw as Product).distanceKm ?? 0,
      } as Product;
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading) return <LoadingScreen />;
  if (!product)
    return (
      <div
        className="flex flex-col items-center justify-center py-20 px-6 text-center"
        data-ocid="product_detail.error_state"
      >
        <p className="font-display text-4xl font-bold text-foreground/10 mb-3">
          SE
        </p>
        <p className="font-display text-lg font-bold text-foreground">
          Product not found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          This item may have been removed or is no longer available.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-5 rounded-lg"
          onClick={() => navigate({ to: "/" })}
          data-ocid="product_detail.back_button"
        >
          Back to Shop
        </Button>
      </div>
    );

  const wishlisted = has(product.id);
  const rating = Number(product.rating);
  const reviews = Number(product.reviewCount);

  return (
    <div className="flex flex-col pb-24" data-ocid="product_detail.page">
      {/* Sticky header */}
      <div className="sticky top-[57px] z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Go back"
          data-ocid="product_detail.back_button"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <span className="font-display text-sm font-bold text-foreground line-clamp-1 flex-1 min-w-0">
          {product.title}
        </span>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-smooth"
          data-ocid="product_detail.wishlist_button"
        >
          <Heart
            size={16}
            className={cn(
              wishlisted
                ? "fill-foreground text-foreground"
                : "fill-transparent text-muted-foreground",
            )}
          />
        </button>
      </div>

      {/* Hero image */}
      <div className="relative mx-4 mt-4 overflow-hidden rounded-[16px] aspect-square bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl font-bold text-muted-foreground/10">
              SE
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-[16px]" />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-[16px]">
            <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
        className="px-4 pt-5 space-y-5"
      >
        {/* Title + category */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-foreground leading-tight">
            {product.title}
          </h1>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-foreground">
            {centsToUSD(product.price)}
          </span>
          {product.cryptoPrice && (
            <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-2 py-0.5">
              {product.cryptoPrice}
            </span>
          )}
        </div>

        {/* Star rating + distance */}
        <div className="flex items-center gap-2">
          <StarRating rating={rating} size={15} />
          <span className="text-sm font-semibold text-foreground">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({reviews.toLocaleString()} reviews)
          </span>
          <span className="ml-auto text-xs text-muted-foreground/70">
            {product.distanceKm.toFixed(1)} km away
          </span>
        </div>

        {/* Rating breakdown */}
        <div
          className="rounded-[16px] border border-border bg-muted/40 px-4 py-4 space-y-2"
          data-ocid="product_detail.rating_breakdown"
        >
          {RATING_BREAKDOWN.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-3 text-xs text-muted-foreground text-right">
                {stars}
              </span>
              <Star
                size={10}
                className="fill-foreground text-foreground shrink-0"
              />
              <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-foreground transition-smooth"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-7 text-xs text-muted-foreground text-right">
                {pct}%
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            About
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Security */}
        <SecureBadge variant="both" />

        {/* Quantity selector */}
        <div
          className="flex items-center justify-between"
          data-ocid="product_detail.quantity_section"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            Quantity
          </span>
          <div className="flex items-center gap-3 rounded-[16px] border border-border bg-card px-3 py-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background disabled:opacity-30 hover:bg-muted transition-smooth"
              data-ocid="product_detail.qty_decrease"
            >
              <Minus size={12} strokeWidth={2.5} />
            </button>
            <span
              className="w-5 text-center text-sm font-bold text-foreground"
              data-ocid="product_detail.qty_value"
            >
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => Math.min(5, q + 1))}
              disabled={quantity >= 5}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background disabled:opacity-30 hover:bg-muted transition-smooth"
              data-ocid="product_detail.qty_increase"
            >
              <Plus size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="pt-1 pb-2">
          <Button
            type="button"
            disabled={!product.inStock}
            className="w-full rounded-[16px] py-6 text-sm font-bold uppercase tracking-widest"
            onClick={() => {
              addItem({
                productId: product.id,
                title: product.title,
                price: product.price,
                cryptoPrice: product.cryptoPrice,
                imageUrl: product.imageUrl,
                quantity,
              });
              navigate({ to: "/checkout" });
            }}
            data-ocid="product_detail.add_to_cart_button"
          >
            {product.inStock
              ? `Add to Cart — ${centsToUSD(product.price * BigInt(quantity))}`
              : "Out of Stock"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
