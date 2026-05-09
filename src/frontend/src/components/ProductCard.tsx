import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Heart } from "lucide-react";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (id: bigint) => void;
  isWishlisted: boolean;
  index?: number;
  className?: string;
}

export function ProductCard({
  product,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  index = 0,
  className,
}: ProductCardProps) {
  const ocidBase = `product.item.${index + 1}`;

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-smooth hover:shadow-xs",
        className,
      )}
      data-ocid={ocidBase}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-2xl font-bold text-muted-foreground/20">
              SE
            </span>
          </div>
        )}

        {/* Heart button */}
        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 shadow-xs transition-smooth hover:bg-card",
          )}
          data-ocid={`product.wishlist_toggle.${index + 1}`}
        >
          <Heart
            size={14}
            className={cn(
              "transition-smooth",
              isWishlisted
                ? "fill-foreground text-foreground"
                : "fill-transparent text-muted-foreground",
            )}
          />
        </button>

        {/* Stock badge */}
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded-sm bg-foreground px-2 py-0.5 text-xs font-semibold text-background">
            Sold Out
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-1 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {product.category}
        </p>
        <h3 className="line-clamp-2 text-sm font-bold text-foreground leading-snug">
          {product.title}
        </h3>

        <div className="mt-1 flex items-center gap-1.5">
          <StarRating rating={Number(product.rating)} size={11} />
          <span className="text-xs text-muted-foreground">
            ({Number(product.reviewCount)})
          </span>
        </div>
        <p className="text-xs text-muted-foreground/70">
          {product.distanceKm.toFixed(1)} km away
        </p>

        <div className="mt-1">
          <span className="font-display text-base font-bold text-foreground">
            {(Number(product.price) / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          {product.cryptoPrice && (
            <span className="ml-1.5 text-xs text-muted-foreground">
              {product.cryptoPrice}
            </span>
          )}
        </div>
      </div>

      {/* Buy Now */}
      <div className="px-3 pb-3">
        <Button
          type="button"
          disabled={!product.inStock}
          onClick={() => onBuyNow(product)}
          className="w-full rounded-lg text-xs font-semibold uppercase tracking-widest"
          data-ocid={`product.buy_button.${index + 1}`}
        >
          {product.inStock ? "Buy Now" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
