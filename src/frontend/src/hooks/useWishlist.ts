import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWishlist() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();

  const query = useQuery<bigint[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWishlist();
    },
    enabled: !!actor && !isFetching,
  });

  const addMutation = useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.addToWishlist(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFromWishlist(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const items = query.data ?? [];

  const has = (id: bigint) => items.some((i) => i === id);

  const toggle = (id: bigint) => {
    if (has(id)) removeMutation.mutate(id);
    else addMutation.mutate(id);
  };

  return {
    items,
    has,
    toggle,
    isLoading: query.isLoading,
  };
}
