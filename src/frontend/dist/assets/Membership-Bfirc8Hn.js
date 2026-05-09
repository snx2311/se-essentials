import { c as createLucideIcon, u as useNavigate, e as useQueryClient, j as jsxRuntimeExports, d as LoadingSpinner, b as cn } from "./index-DHY5Q3pY.js";
import { u as useActor, m as motion, B as Button, M as MemberTier, c as createActor } from "./proxy-B6IjP56z.js";
import { S as SecureBadge } from "./SecureBadge-ZoLhCeV2.js";
import { u as useAuth } from "./useAuth-BkqJTcKj.js";
import { u as useMutation } from "./useMutation-BAgZFTt7.js";
import { u as ue } from "./index-CqmhkrsK.js";
import { C as Crown } from "./crown-CWE7r6Zo.js";
import { L as LogIn } from "./log-in-BltMg0Dq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
const TIERS = [
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
      "Community support"
    ]
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
      "Priority customer support"
    ]
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
      "Dedicated account manager"
    ]
  }
];
function Membership() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { isAuthenticated, memberTier, login, loginStatus } = useAuth();
  const qc = useQueryClient();
  const isLoggingIn = loginStatus === "logging-in";
  const mutation = useMutation({
    mutationFn: async (tier) => {
      if (!actor) throw new Error("Not connected");
      return actor.upgradeMembership(tier);
    },
    onSuccess: (_data, tier) => {
      var _a;
      const label = ((_a = TIERS.find((t) => t.tier === tier)) == null ? void 0 : _a.label) ?? tier;
      ue.success(`Upgraded to ${label} membership!`);
      qc.invalidateQueries({ queryKey: ["membership"] });
      navigate({ to: "/profile" });
    },
    onError: () => ue.error("Could not upgrade. Please try again.")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", "data-ocid": "membership.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card px-4 py-4 shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Member Classes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Choose your access tier" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-background", children: [
      !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "mx-4 mt-5 rounded-2xl border border-border bg-card p-5 flex flex-col items-center gap-3 text-center",
          "data-ocid": "membership.guest_prompt",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 28, className: "text-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Sign in to activate your membership" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Internet Identity login required to select or upgrade a tier." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "rounded-xl px-8 text-xs font-bold uppercase tracking-widest",
                onClick: login,
                disabled: isLoggingIn,
                "data-ocid": "membership.login_button",
                children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 14, className: "mr-2" }),
                  " Connect with Internet Identity"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "encrypted" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 space-y-4", children: TIERS.map(
        ({ tier, label, tagline, price, period, cls, perks }, i) => {
          const isCurrent = isAuthenticated && memberTier === tier;
          const isDowngrade = isAuthenticated && TIERS.findIndex((t) => t.tier === memberTier) > TIERS.findIndex((t) => t.tier === tier);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.09 },
              className: cn("rounded-2xl p-5 space-y-4", cls),
              "data-ocid": `membership.tier.${label.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold uppercase tracking-widest text-background", children: label }),
                      isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm bg-background/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background", children: "Current" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-background/70 mt-0.5", children: tagline })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-background", children: price }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-background/70", children: period })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: perks.map((perk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2 text-sm text-background/90",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13, className: "shrink-0 text-background" }),
                      perk
                    ]
                  },
                  perk
                )) }),
                isCurrent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-center gap-1.5 py-2 rounded-xl bg-background/10 text-xs font-bold uppercase tracking-widest text-background",
                    "data-ocid": `membership.current_tier.${label.toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 13 }),
                      " Active Plan"
                    ]
                  }
                ) : isDowngrade ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    disabled: true,
                    className: "w-full rounded-xl bg-background/20 text-background text-xs font-bold uppercase tracking-wider opacity-50 cursor-not-allowed",
                    "data-ocid": `membership.downgrade_${label.toLowerCase()}_button`,
                    children: "Downgrade unavailable"
                  }
                ) : isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: () => mutation.mutate(tier),
                    disabled: mutation.isPending,
                    className: "w-full rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-bold uppercase tracking-wider",
                    "data-ocid": `membership.select_${label.toLowerCase()}_button`,
                    children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : `Upgrade to ${label}`
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    onClick: login,
                    disabled: isLoggingIn,
                    className: "w-full rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-bold uppercase tracking-wider",
                    "data-ocid": `membership.login_to_select_${label.toLowerCase()}_button`,
                    children: "Sign In to Select"
                  }
                )
              ]
            },
            tier
          );
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "encrypted" }) })
    ] })
  ] });
}
export {
  Membership as default
};
