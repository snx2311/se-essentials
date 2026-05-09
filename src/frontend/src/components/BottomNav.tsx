import { cn } from "@/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Heart, Home, Package, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", to: "/", icon: Home, ocid: "nav.home_tab" },
  { label: "Wishlist", to: "/wishlist", icon: Heart, ocid: "nav.wishlist_tab" },
  { label: "Orders", to: "/orders", icon: Package, ocid: "nav.orders_tab" },
  { label: "Profile", to: "/profile", icon: User, ocid: "nav.profile_tab" },
] as const;

export function BottomNav() {
  const matchRoute = useMatchRoute();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-around border-t border-border bg-card/95 backdrop-blur-sm px-2 pb-safe"
      aria-label="Bottom navigation"
      data-ocid="nav.bottom_bar"
      style={{
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))",
      }}
    >
      {NAV_ITEMS.map(({ label, to, icon: Icon, ocid }) => {
        const active = !!matchRoute({ to, fuzzy: to !== "/" });
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 pt-3 pb-2 text-xs transition-smooth",
              active
                ? "text-foreground font-bold"
                : "text-muted-foreground font-medium hover:text-foreground",
            )}
            data-ocid={ocid}
            aria-label={label}
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.75}
              className={cn(
                active ? "text-foreground" : "text-muted-foreground",
              )}
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
