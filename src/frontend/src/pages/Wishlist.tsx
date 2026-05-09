import { MemberTier, createActor } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { LoadingScreen } from "@/components/LoadingSpinner";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion } from "motion/react";

export default function Wishlist() {
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();
  const {
    items: wishlistIds,
    has,
    toggle,
    isLoading: wishlistLoading,
  } = useWishlist();
  const { addItem } = useCart();

  // Fetch each wishlisted product by id from the actor
  const { data: wishlistedProducts, isLoading: productsLoading } = useQuery<
    Product[]
  >({
    queryKey: ["wishlist-products", wishlistIds.map(String).join(",")],
    queryFn: async () => {
      if (!actor || wishlistIds.length === 0) return [];
      const results = await Promise.all(
        wishlistIds.map((id) => actor.getProduct(id)),
      );
      return results
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .map((p) => ({
          ...p,
          tierRequired: (p as Product).tierRequired ?? MemberTier.Standard,
          distanceKm: (p as Product).distanceKm ?? 0,
        })) as Product[];
    },
    enabled: !!actor && !isFetching && !wishlistLoading,
  });

  const isLoading = wishlistLoading || productsLoading;
  // Combine backend data with local wishlist state for accurate toggle display
  const products = (wishlistedProducts ?? []).filter((p) => has(p.id));

  if (isLoading) return <LoadingScreen />;

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      data-ocid="wishlist.page"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-bold text-foreground">
            My Wishlist
          </h1>
          {products.length > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              data-ocid="wishlist.count_badge"
            >
              {products.length}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {products.length === 0
            ? "No saved items"
            : `${products.length} saved item${products.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 bg-background px-3 py-4">
        {products.length === 0 ? (
          <EmptyState
            icon={<Heart size={28} />}
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here for later."
            action={{
              label: "Browse Products",
              onClick: () => navigate({ to: "/" }),
            }}
          />
        ) : (
          <div
            className="grid grid-cols-2 gap-3"
            data-ocid="wishlist.product_grid"
          >
            {products.map((product, i) => (
              <motion.div
                key={String(product.id)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                data-ocid={`wishlist.item.${i + 1}`}
              >
                <ProductCard
                  product={product}
                  onBuyNow={(p) => {
                    addItem({
                      productId: p.id,
                      title: p.title,
                      price: p.price,
                      cryptoPrice: p.cryptoPrice,
                      imageUrl: p.imageUrl,
                      quantity: 1,
                    });
                    navigate({ to: "/checkout" });
                  }}
                  onToggleWishlist={toggle}
                  isWishlisted={has(product.id)}
                  index={i}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
