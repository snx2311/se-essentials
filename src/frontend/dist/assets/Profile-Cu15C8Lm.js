import { c as createLucideIcon, j as jsxRuntimeExports, b as cn, r as reactExports, u as useNavigate, d as LoadingSpinner } from "./index-DHY5Q3pY.js";
import { m as motion, B as Button, M as MemberTier } from "./proxy-B6IjP56z.js";
import { S as SecureBadge } from "./SecureBadge-ZoLhCeV2.js";
import { P as Primitive, L as Label } from "./label-Df0WAzhC.js";
import { u as useAuth } from "./useAuth-BkqJTcKj.js";
import { C as Crown } from "./crown-CWE7r6Zo.js";
import { L as LogIn } from "./log-in-BltMg0Dq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode$1);
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const TIER_CONFIG = {
  [MemberTier.Standard]: {
    label: "Standard",
    cls: "tier-standard",
    tagline: "Access to curated essentials"
  },
  [MemberTier.Executive]: {
    label: "Executive",
    cls: "tier-executive",
    tagline: "Priority access + exclusive drops"
  },
  [MemberTier.Elite]: {
    label: "Elite",
    cls: "tier-elite",
    tagline: "First access to all new arrivals"
  }
};
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, loginStatus, principal, login, logout, memberTier } = useAuth();
  const isLoading = loginStatus === "logging-in";
  const [name, setName] = reactExports.useState("SE Member");
  const [address, setAddress] = reactExports.useState("");
  const [editMode, setEditMode] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const tier = TIER_CONFIG[memberTier];
  const principalText = (principal == null ? void 0 : principal.toText()) ?? "";
  const truncatedPrincipal = principalText.length > 24 ? `${principalText.slice(0, 12)}…${principalText.slice(-6)}` : principalText;
  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setEditMode(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-4 py-4 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: "Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-background", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          className: "bg-card border-b border-border px-4 py-6 flex items-center gap-4",
          "data-ocid": "profile.user_card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-background", children: getInitials(name) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-display text-base font-bold text-foreground",
                  "data-ocid": "profile.user_name",
                  children: name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "truncate text-[11px] font-mono text-muted-foreground mt-0.5",
                  "data-ocid": "profile.principal_id",
                  children: truncatedPrincipal
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.07 },
          className: cn(
            "mx-4 mt-5 rounded-2xl p-4 flex items-center gap-3 cursor-pointer",
            tier.cls
          ),
          onClick: () => navigate({ to: "/membership" }),
          "data-ocid": "profile.tier_badge",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 22, className: "text-background shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold uppercase tracking-widest text-background", children: [
                tier.label,
                " Member"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-background/75 mt-0.5", children: tier.tagline })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-background/60", children: "Change →" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.12 },
          className: "mx-4 mt-5 rounded-2xl border border-border bg-card p-4 space-y-4",
          "data-ocid": "profile.edit_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-widest text-foreground", children: "Profile Details" }),
              !editMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setEditMode(true),
                  className: "text-muted-foreground hover:text-foreground transition-colors duration-200 p-1",
                  "aria-label": "Edit profile",
                  "data-ocid": "profile.edit_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 15 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "profile-name",
                    className: "text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Display Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "profile-name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    disabled: !editMode,
                    className: "rounded-xl border-input bg-background text-foreground text-sm disabled:opacity-60",
                    "data-ocid": "profile.name_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "profile-address",
                    className: "text-xs uppercase tracking-widest text-muted-foreground",
                    children: "Shipping Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "profile-address",
                    value: address,
                    onChange: (e) => setAddress(e.target.value),
                    disabled: !editMode,
                    placeholder: editMode ? "Enter your shipping address" : "—",
                    className: "rounded-xl border-input bg-background text-foreground text-sm disabled:opacity-60",
                    "data-ocid": "profile.address_input"
                  }
                )
              ] })
            ] }),
            editMode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  onClick: handleSave,
                  disabled: saving,
                  className: "flex-1 rounded-xl text-xs font-bold uppercase tracking-widest",
                  "data-ocid": "profile.save_button",
                  children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Save Changes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => setEditMode(false),
                  className: "rounded-xl text-xs font-bold uppercase tracking-widest",
                  "data-ocid": "profile.cancel_button",
                  children: "Cancel"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.17 },
          className: "mx-4 mt-4 rounded-2xl border border-border bg-card overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:bg-muted/40 transition-colors duration-200",
                onClick: () => navigate({ to: "/orders" }),
                "data-ocid": "profile.orders_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    PackageSearch,
                    {
                      size: 16,
                      className: "text-muted-foreground shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "My Orders" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex items-center gap-3 px-4 py-3.5 text-sm text-foreground hover:bg-muted/40 transition-colors duration-200",
                onClick: () => navigate({ to: "/membership" }),
                "data-ocid": "profile.upgrade_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { size: 16, className: "text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Upgrade Membership" })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-6 pb-6 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "encrypted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "ghost",
            className: "w-full rounded-xl justify-center gap-2 text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest border border-border",
            onClick: logout,
            "data-ocid": "profile.logout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
              " Sign Out"
            ]
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col items-center py-16 px-6 gap-6",
        "data-ocid": "profile.guest_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-background", children: "SE" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Sign In to SE Essentials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: "Access your orders, wishlist, and exclusive membership perks." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "rounded-2xl px-10 py-5 text-sm font-bold uppercase tracking-widest w-full",
              onClick: login,
              disabled: isLoading,
              "data-ocid": "profile.login_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 16, className: "mr-2" }),
                " Connect with Internet Identity"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecureBadge, { variant: "encrypted" })
        ]
      }
    ) })
  ] });
}
export {
  Profile as default
};
