"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  GSList: () => GSList,
  GS_LIST_NAMESPACE: () => GS_LIST_NAMESPACE,
  default: () => GSList_default,
  registerGSListI18n: () => registerGSListI18n
});
module.exports = __toCommonJS(index_exports);

// src/GSList.tsx
var import_react = __toESM(require("react"), 1);
var import_react_router_dom = require("react-router-dom");
var import_clsx = __toESM(require("clsx"), 1);
var import_hooks = require("@carlos-gs99/hooks");
var import_utils = require("@carlos-gs99/utils");

// src/i18n/en.json
var en_default = {
  aria: {
    defaultLabel: "List",
    itemLabel: "List item"
  }
};

// src/i18n/pt.json
var pt_default = {
  aria: {
    defaultLabel: "Lista",
    itemLabel: "Item da lista"
  }
};

// src/i18n.ts
var GS_LIST_NAMESPACE = "GSList";
function registerGSListI18n(instance) {
  try {
    instance.addResourceBundle("en", GS_LIST_NAMESPACE, en_default, true, true);
    instance.addResourceBundle("pt", GS_LIST_NAMESPACE, pt_default, true, true);
  } catch (_e) {
  }
}

// src/styles.module.css
var styles_default = {};

// src/GSList.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var GSList = ({
  children,
  variant = "default",
  size = "md",
  debug = false,
  className,
  id,
  dataAttributes,
  ...rest
}) => {
  const reactId = (0, import_react.useId)();
  const generatedId = `gs-list-${reactId.replace(/:/g, "")}`;
  const rootId = id ?? generatedId;
  const debugLogger = (0, import_utils.useDebug)("GSList", debug);
  const { t, i18n } = (0, import_hooks.useTranslation)(GS_LIST_NAMESPACE);
  import_react.default.useEffect(() => {
    registerGSListI18n(i18n);
  }, [i18n]);
  const rootClasses = (0, import_clsx.default)(
    "gs-list",
    styles_default.root,
    {
      [styles_default["variant-bordered"]]: variant === "bordered",
      [styles_default["variant-plain"]]: variant === "plain",
      [styles_default[`size-${size}`]]: size
    },
    className
  );
  const dataAttrs = {
    "data-gs": "GSList",
    "data-gs-variant": variant,
    "data-gs-size": size,
    ...dataAttributes || {}
  };
  if (debug) {
    dataAttrs["data-gs-debug"] = "enabled";
  }
  debugLogger.log("Rendering GSList", { variant, size, hasChildren: !!children });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      id: rootId,
      className: rootClasses,
      role: "list",
      "aria-label": t("aria.defaultLabel", "List"),
      ...dataAttrs,
      ...rest,
      children
    }
  );
};
var GSListHeader = ({
  children,
  icon,
  action,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = (0, import_utils.useDebug)("GSList.Header", debug);
  debugLogger.log("Rendering GSListHeader", { hasIcon: !!icon, hasAction: !!action });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_clsx.default)("gs-list__header", styles_default.header, className),
      "data-gs-el": "header",
      "data-gs-debug": debug ? "enabled" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.headerContent, children: [
          icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.headerIcon, "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: styles_default.headerTitle, children })
        ] }),
        action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles_default.headerAction, children: action })
      ]
    }
  );
};
var GSListItem = ({
  variant = "simple",
  icon,
  title,
  description,
  metadata,
  children,
  active = false,
  disabled = false,
  onClick,
  href,
  to,
  as: Component,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = (0, import_utils.useDebug)("GSList.Item", debug);
  const { t } = (0, import_hooks.useTranslation)(GS_LIST_NAMESPACE);
  const hasAction = Boolean(onClick || href || to || Component);
  debugLogger.log("Rendering GSListItem", {
    variant,
    hasIcon: !!icon,
    hasDescription: !!description,
    hasMetadata: !!metadata,
    hasAction,
    active,
    disabled
  });
  const itemClasses = (0, import_clsx.default)(
    styles_default.item,
    {
      [styles_default.itemSimple]: variant === "simple",
      [styles_default.itemComplex]: variant === "complex",
      [styles_default.itemWithMetadata]: variant === "with-metadata",
      [styles_default.itemActive]: active
    },
    className
  );
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };
  const ariaLabel = title || t("aria.itemLabel", "List item");
  const commonProps = {
    className: itemClasses,
    title: ariaLabel,
    "data-gs-el": "item",
    "data-gs-variant": variant,
    "data-gs-debug": debug ? "enabled" : void 0,
    "data-has-action": hasAction ? "true" : "false",
    "aria-disabled": disabled,
    "aria-label": ariaLabel,
    tabIndex: disabled || !hasAction ? -1 : 0,
    role: "listitem",
    onClick: handleClick,
    ...rest
  };
  if (variant === "simple" || variant === "with-metadata") {
    const content2 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      icon && icon,
      title,
      metadata && variant === "with-metadata" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.itemMetadata, children: metadata })
    ] });
    if (Component) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { href, to, ...commonProps, disabled, children: content2 });
    }
    if (to) {
      const LinkComponent = import_react_router_dom.Link;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkComponent, { to, ...commonProps, children: content2 });
    }
    if (href) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href, ...commonProps, children: content2 });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { ...commonProps, disabled, type: "button", children: content2 });
  }
  const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.itemIcon, "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.itemContent, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.itemTitle, children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.itemDescription, children: description }),
      children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles_default.itemChildren, children })
    ] })
  ] });
  if (Component) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { href, to, ...commonProps, disabled, children: content });
  }
  if (to) {
    const LinkComponent = import_react_router_dom.Link;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkComponent, { to, ...commonProps, children: content });
  }
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href, ...commonProps, children: content });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { ...commonProps, disabled, type: "button", children: content });
};
var GSListSeparator = ({
  label,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = (0, import_utils.useDebug)("GSList.Separator", debug);
  debugLogger.log("Rendering GSListSeparator", { hasLabel: !!label });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_clsx.default)("gs-list__separator", styles_default.separator, className),
      role: "separator",
      "data-gs-el": "separator",
      "data-gs-debug": debug ? "enabled" : void 0,
      ...rest,
      children: label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.separatorLabel, children: label }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles_default.separatorLine })
    }
  );
};
var GSListFooter = ({
  children,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = (0, import_utils.useDebug)("GSList.Footer", debug);
  debugLogger.log("Rendering GSListFooter");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_clsx.default)("gs-list__footer", styles_default.footer, className),
      "data-gs-el": "footer",
      "data-gs-debug": debug ? "enabled" : void 0,
      ...rest,
      children
    }
  );
};
GSList.Header = GSListHeader;
GSList.Item = GSListItem;
GSList.Separator = GSListSeparator;
GSList.Footer = GSListFooter;
var GSList_default = GSList;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GSList,
  GS_LIST_NAMESPACE,
  registerGSListI18n
});
//# sourceMappingURL=index.cjs.map