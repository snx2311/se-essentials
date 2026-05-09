import { MemberTier } from "@/backend";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SecureBadge } from "@/components/SecureBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Crown, Edit2, LogIn, LogOut, PackageSearch } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TIER_CONFIG: Record<
  MemberTier,
  { label: string; cls: string; tagline: string }
> = {
  [MemberTier.Standard]: {
    label: "Standard",
    cls: "tier-standard",
    tagline: "Access to curated essentials",
  },
  [MemberTier.Executive]: {
    label: "Executive",
    cls: "tier-executive",
    tagline: "Priority access + exclusive drops",
  },
  [MemberTier.Elite]: {
    label: "Elite",
    cls: "tier-elite",
    tagline: "First access to all new arrivals",
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, loginStatus, principal, login, logout, memberTier } =
    useAuth();
  const isLoading = loginStatus === "logging-in";

  const [name, setName] = useState("SE Member");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const tier = TIER_CONFIG[memberTier];
  const principalText = principal?.toText() ?? "";
  const truncatedPrincipal =
    principalText.length > 24
      ? `${principalText.slice(0, 12)}…${principalText.slice(-6)}`
      : principalText;

  async function handleSave() {
    setSaving(true);
    // Optimistic save — persisted in local state for now
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setEditMode(false);
  }

  return (
    <div className="flex flex-col min-h-screen" data-ocid="profile.page">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-4 shadow-subtle">
        <h1 className="font-display text-xl font-bold text-foreground">
          Profile
        </h1>
      </div>

      <div className="flex-1 bg-background">
        {isAuthenticated ? (
          <>
            {/* Avatar + identity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-b border-border px-4 py-6 flex items-center gap-4"
              data-ocid="profile.user_card"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-foreground">
                <span className="font-display text-xl font-bold text-background">
                  {getInitials(name)}
                </span>
              </div>
              <div className="min-w-0">
                <p
                  className="font-display text-base font-bold text-foreground"
                  data-ocid="profile.user_name"
                >
                  {name}
                </p>
                <p
                  className="truncate text-[11px] font-mono text-muted-foreground mt-0.5"
                  data-ocid="profile.principal_id"
                >
                  {truncatedPrincipal}
                </p>
              </div>
            </motion.div>

            {/* Membership tier badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 }}
              className={cn(
                "mx-4 mt-5 rounded-2xl p-4 flex items-center gap-3 cursor-pointer",
                tier.cls,
              )}
              onClick={() => navigate({ to: "/membership" })}
              data-ocid="profile.tier_badge"
            >
              <Crown size={22} className="text-background shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold uppercase tracking-widest text-background">
                  {tier.label} Member
                </p>
                <p className="text-xs text-background/75 mt-0.5">
                  {tier.tagline}
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-background/60">
                Change →
              </span>
            </motion.div>

            {/* Edit profile */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mx-4 mt-5 rounded-2xl border border-border bg-card p-4 space-y-4"
              data-ocid="profile.edit_section"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                  Profile Details
                </h2>
                {!editMode && (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1"
                    aria-label="Edit profile"
                    data-ocid="profile.edit_button"
                  >
                    <Edit2 size={15} />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profile-name"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Display Name
                  </Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editMode}
                    className="rounded-xl border-input bg-background text-foreground text-sm disabled:opacity-60"
                    data-ocid="profile.name_input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profile-address"
                    className="text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Shipping Address
                  </Label>
                  <Input
                    id="profile-address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!editMode}
                    placeholder={editMode ? "Enter your shipping address" : "—"}
                    className="rounded-xl border-input bg-background text-foreground text-sm disabled:opacity-60"
                    data-ocid="profile.address_input"
                  />
                </div>
              </div>

              {editMode && (
                <div className="flex gap-2 pt-1">
                  <Button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 rounded-xl text-xs font-bold uppercase tracking-widest"
                    data-ocid="profile.save_button"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditMode(false)}
                    className="rounded-xl text-xs font-bold uppercase tracking-widest"
                    data-ocid="profile.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.17 }}
              className="mx-4 mt-4 rounded-2xl border border-border bg-card overflow-hidden"
            >
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:bg-muted/40 transition-colors duration-200"
                onClick={() => navigate({ to: "/orders" })}
                data-ocid="profile.orders_button"
              >
                <PackageSearch
                  size={16}
                  className="text-muted-foreground shrink-0"
                />
                <span className="font-medium">My Orders</span>
              </button>
              <Separator />
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:bg-muted/40 transition-colors duration-200"
                onClick={() => navigate({ to: "/membership" })}
                data-ocid="profile.upgrade_button"
              >
                <Crown size={16} className="text-muted-foreground shrink-0" />
                <span className="font-medium">Upgrade Membership</span>
              </button>
            </motion.div>

            {/* Footer logout */}
            <div className="px-4 mt-6 pb-6 space-y-3">
              <SecureBadge variant="encrypted" />
              <Button
                type="button"
                variant="ghost"
                className="w-full rounded-xl justify-center gap-2 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest border border-border"
                onClick={logout}
                data-ocid="profile.logout_button"
              >
                <LogOut size={14} /> Sign Out
              </Button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-16 px-6 gap-6"
            data-ocid="profile.guest_section"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground">
              <span className="font-display text-2xl font-bold text-background">
                SE
              </span>
            </div>
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-foreground">
                Sign In to SE Essentials
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Access your orders, wishlist, and exclusive membership perks.
              </p>
            </div>
            <Button
              type="button"
              className="rounded-2xl px-10 py-5 text-sm font-bold uppercase tracking-widest w-full"
              onClick={login}
              disabled={isLoading}
              data-ocid="profile.login_button"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <LogIn size={16} className="mr-2" /> Connect with Internet
                  Identity
                </>
              )}
            </Button>
            <SecureBadge variant="encrypted" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
