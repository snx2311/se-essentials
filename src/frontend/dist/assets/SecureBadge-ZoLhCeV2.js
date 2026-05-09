import { c as createLucideIcon, j as jsxRuntimeExports, b as cn } from "./index-DHY5Q3pY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function SecureBadge({ variant = "both", className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-wrap gap-2", className), children: [
    (variant === "transaction" || variant === "both") && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-secure", "data-ocid": "secure.transaction_badge", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 11 }),
      "Verified Secure Transaction"
    ] }),
    (variant === "encrypted" || variant === "both") && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-secure", "data-ocid": "secure.encrypted_badge", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 11 }),
      "End-to-End Encrypted"
    ] })
  ] });
}
export {
  Lock as L,
  SecureBadge as S
};
