import { createActor } from "@/backend";
import { MemberTier } from "@/backend";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SecureBadge } from "@/components/SecureBadge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Check, Crown, LogIn } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface TierDef {
  tier: MemberTier;
  label: string;
  tagline: string;
  price: string;
  period: string;
  cls: string;
  perks: string[];
}

const TIERS: TierDef[] = [
  {
    tier: MemberTier.Standard,
    label: "Standard",
    tagline: "Everything you need to get started",
    price: "$0",
    period: "/mo",
    cls: "tier-standard",
    perks: [
      "Browse all product listings",
      "Add items to wishlist",
      "Standard checkout & order tracking",
      "Community support",
    ],
  },
  {
    tier: MemberTier.Executive,
    label: "Executive",
    tagline: "Priority access for serious collectors",
    price: "$29",
    period: "/mo",
    cls: "tier-executive",
    perks: [
      "Early access to new arrivals",
      "Exclusive members-only drops",
      "Crypto & fiat checkout options",
      "Priority customer support",
    ],
  },
  {
    tier: MemberTier.Elite,
    label: "Elite",
    tagline: "The pinnacle of SE Essentials access",
    price: "$99",
    period: "/mo",
    cls: "tier-elite",
    perks: [
      "First access to every new drop",
      "White-glove concierge service",
      "Zero-fee crypto transactions",
      "Dedicated account manager",
    ],
  },
];

export default function Membership() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { isAuthenticated, memberTier, login, loginStatus } = useAuth();
  const qc = useQueryClient();
  const isLoggingIn = loginStatus === "logging-in";

  const mutation = useMutation({
    mutationFn: async (tier: MemberTier) => {
      if (!actor) throw new Error("Not connected");
      return actor.upgradeMembership(tier);
    },
    onSuccess: (_data, tier) => {
      const label = TIERS.find((t) => t.tier === tier)?.label ?? tier;
      toast.success(`Upgraded to ${label} membership!`);
      qc.invalidateQueries({ queryKey: ["membership"] });
      navigate({ to: "/profile" });
    },
    onError: () => toast.error("Could not upgrade. Please try again."),
  });

  return (
    <div className="flex flex-col min-h-screen" data-ocid="membership.page">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-4 shadow-subtle">
        <h1 className="font-display text-xl font-bold text-foreground">
          Member Classes
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose your access tier
        </p>
      </div>

      <div className="flex-1 bg-background">
        {/* Guest prompt */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mt-5 rounded-2xl border border-border bg-card p-5 flex flex-col items-center gap-3 text-center"
            data-ocid="membership.guest_prompt"
          >
            <Crown size={28} className="text-foreground" />
            <div>
              <p className="text-sm font-bold text-foreground">
                Sign in to activate your membership
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Internet Identity login required to select or upgrade a tier.
              </p>
            </div>
            <Button
              type="button"
              className="rounded-xl px-8 text-xs font-bold uppercase tracking-widest"
              onClick={login}
              disabled={isLoggingIn}
              data-ocid="membership.login_button"
            >
              {isLoggingIn ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <LogIn size={14} className="mr-2" /> Connect with Internet
                  Identity
                </>
              )}
            </Button>
            <SecureBadge variant="encrypted" />
          </motion.div>
        )}

        {/* Tier cards */}
        <div className="px-4 py-5 space-y-4">
          {TIERS.map(
            ({ tier, label, tagline, price, period, cls, perks }, i) => {
              const isCurrent = isAuthenticated && memberTier === tier;
              const isDowngrade =
                isAuthenticated &&
                TIERS.findIndex((t) => t.tier === memberTier) >
                  TIERS.findIndex((t) => t.tier === tier);

              return (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  className={cn("rounded-2xl p-5 space-y-4", cls)}
                  data-ocid={`membership.tier.${label.toLowerCase()}`}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-display text-lg font-bold uppercase tracking-widest text-background">
                          {label}
                        </p>
                        {isCurrent && (
                          <span className="rounded-sm bg-background/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-background/70 mt-0.5">
                        {tagline}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-2xl font-bold text-background">
                        {price}
                      </span>
                      <span className="text-xs text-background/70">
                        {period}
                      </span>
                    </div>
                  </div>

                  {/* Perks */}
                  <ul className="space-y-2">
                    {perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2 text-sm text-background/90"
                      >
                        <Check size={13} className="shrink-0 text-background" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {isCurrent ? (
                    <div
                      className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-background/10 text-xs font-bold uppercase tracking-widest text-background"
                      data-ocid={`membership.current_tier.${label.toLowerCase()}`}
                    >
                      <Check size={13} /> Active Plan
                    </div>
                  ) : isDowngrade ? (
                    <Button
                      type="button"
                      disabled
                      className="w-full rounded-xl bg-background/20 text-background text-xs font-bold uppercase tracking-wider opacity-50 cursor-not-allowed"
                      data-ocid={`membership.downgrade_${label.toLowerCase()}_button`}
                    >
                      Downgrade unavailable
                    </Button>
                  ) : isAuthenticated ? (
                    <Button
                      type="button"
                      onClick={() => mutation.mutate(tier)}
                      disabled={mutation.isPending}
                      className="w-full rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-bold uppercase tracking-wider"
                      data-ocid={`membership.select_${label.toLowerCase()}_button`}
                    >
                      {mutation.isPending ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        `Upgrade to ${label}`
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={login}
                      disabled={isLoggingIn}
                      className="w-full rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-bold uppercase tracking-wider"
                      data-ocid={`membership.login_to_select_${label.toLowerCase()}_button`}
                    >
                      Sign In to Select
                    </Button>
                  )}
                </motion.div>
              );
            },
          )}
        </div>

        <div className="px-4 pb-6">
          <SecureBadge variant="encrypted" />
        </div>
      </div>
    </div>
  );
}
