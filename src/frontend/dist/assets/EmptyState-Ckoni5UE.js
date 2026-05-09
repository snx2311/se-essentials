import { j as jsxRuntimeExports, b as cn } from "./index-DHY5Q3pY.js";
import { B as Button } from "./proxy-B6IjP56z.js";
function EmptyState({
  icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center px-6",
        className
      ),
      "data-ocid": "empty_state",
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: action.onClick,
            variant: "default",
            className: "mt-2 rounded-lg",
            "data-ocid": "empty_state.primary_button",
            children: action.label
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
