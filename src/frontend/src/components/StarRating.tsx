import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = 12,
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating} out of ${max} stars`}
    >
      {stars.map((starNum) => (
        <Star
          key={starNum}
          size={size}
          className={cn(
            starNum <= rating
              ? "fill-foreground text-foreground"
              : "fill-transparent text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}
