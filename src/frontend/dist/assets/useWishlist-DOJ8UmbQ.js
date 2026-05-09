import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, e as useQueryClient } from "./index-DHY5Q3pY.js";
import { u as useActor, a as useQuery, c as createActor } from "./proxy-B6IjP56z.js";
import { u as useMutation } from "./useMutation-BAgZFTt7.js";
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function StarRating({
  rating,
  max = 5,
  size = 12,
  className
}) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("flex items-center gap-0.5", className),
      "aria-label": `${rating} out of ${max} stars`,
      children: stars.map((starNum) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          size,
          className: cn(
            starNum <= rating ? "fill-foreground text-foreground" : "fill-transparent text-muted-foreground/40"
          )
        },
        starNum
      ))
    }
  );
}
function useWishlist() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWishlist();
    },
    enabled: !!actor && !isFetching
  });
  const addMutation = useMutation({
    mutationFn: async (productId) => {
      if (!actor) throw new Error("No actor");
      return actor.addToWishlist(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] })
  });
  const removeMutation = useMutation({
    mutationFn: async (productId) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFromWishlist(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wishlist"] })
  });
  const items = query.data ?? [];
  const has = (id) => items.some((i) => i === id);
  const toggle = (id) => {
    if (has(id)) removeMutation.mutate(id);
    else addMutation.mutate(id);
  };
  return {
    items,
    has,
    toggle,
    isLoading: query.isLoading
  };
}
export {
  Star as S,
  StarRating as a,
  useWishlist as u
};
