import { Link } from "@tanstack/react-router";
import { MapPin, Search, ShoppingBag } from "lucide-react";
import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
  /** Set true to suppress the top header (e.g. checkout full-screen) */
  hideHeader?: boolean;
}

export function Layout({ children, hideHeader = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Centred mobile shell */}
      <div className="relative mx-auto flex w-full max-w-[430px] flex-1 flex-col">
        {/* Sticky top header */}
        {!hideHeader && (
          <header
            className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm"
            data-ocid="header"
          >
            {/* Logo */}
            <Link
              to="/"
              className="font-display text-lg font-bold tracking-tight text-foreground"
              data-ocid="header.logo_link"
            >
              SE Essentials
            </Link>

            {/* Location */}
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-smooth hover:text-foreground"
              data-ocid="header.location_button"
            >
              <MapPin size={13} strokeWidth={2} />
              <span className="font-medium">Yangon</span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-muted-foreground transition-smooth hover:text-foreground"
                aria-label="Search"
                data-ocid="header.search_button"
              >
                <Search size={20} strokeWidth={1.75} />
              </Link>
              <Link
                to="/orders"
                className="text-muted-foreground transition-smooth hover:text-foreground"
                aria-label="Orders"
                data-ocid="header.orders_button"
              >
                <ShoppingBag size={20} strokeWidth={1.75} />
              </Link>
            </div>
          </header>
        )}

        {/* Page content — padded for bottom nav */}
        <main className="flex-1 pb-24" data-ocid="main_content">
          {children}
        </main>

        {/* Footer security strip */}
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] pointer-events-none flex justify-center pb-0 z-20">
          {/* empty spacer — security text lives in page footers */}
        </div>
      </div>

      {/* Footer with branding */}
      <footer className="mx-auto w-full max-w-[430px] border-t border-border bg-muted/40 px-4 py-3 pb-28 text-center text-[10px] text-muted-foreground">
        <div className="mb-1 flex items-center justify-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
          <span>Encrypted Connection Active</span>
        </div>
        <span>© {new Date().getFullYear()}. Built with love using </span>
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-smooth"
        >
          caffeine.ai
        </a>
      </footer>

      <BottomNav />
    </div>
  );
}
