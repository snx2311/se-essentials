import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizeMap = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-border border-t-foreground",
        sizeMap[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function LoadingScreen() {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center"
      data-ocid="loading_state"
    >
      <LoadingSpinner size="lg" />
    </div>
  );
}
