"use client";

// src/GSList.tsx
import React, { useId } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useTranslation } from "@carlos-gs99/hooks";
import { useDebug } from "@carlos-gs99/utils";

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
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const reactId = useId();
  const generatedId = `gs-list-${reactId.replace(/:/g, "")}`;
  const rootId = id ?? generatedId;
  const debugLogger = useDebug("GSList", debug);
  const { t, i18n } = useTranslation(GS_LIST_NAMESPACE);
  React.useEffect(() => {
    registerGSListI18n(i18n);
  }, [i18n]);
  const rootClasses = clsx(
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
  return /* @__PURE__ */ jsx(
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
  const debugLogger = useDebug("GSList.Header", debug);
  debugLogger.log("Rendering GSListHeader", { hasIcon: !!icon, hasAction: !!action });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx("gs-list__header", styles_default.header, className),
      "data-gs-el": "header",
      "data-gs-debug": debug ? "enabled" : void 0,
      ...rest,
      children: [
        /* @__PURE__ */ jsxs("div", { className: styles_default.headerContent, children: [
          icon && /* @__PURE__ */ jsx("span", { className: styles_default.headerIcon, "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ jsx("h3", { className: styles_default.headerTitle, children })
        ] }),
        action && /* @__PURE__ */ jsx("div", { className: styles_default.headerAction, children: action })
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
  const debugLogger = useDebug("GSList.Item", debug);
  const { t } = useTranslation(GS_LIST_NAMESPACE);
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
  const itemClasses = clsx(
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
    const content2 = /* @__PURE__ */ jsxs(Fragment, { children: [
      icon && icon,
      title,
      metadata && variant === "with-metadata" && /* @__PURE__ */ jsx("span", { className: styles_default.itemMetadata, children: metadata })
    ] });
    if (Component) {
      return /* @__PURE__ */ jsx(Component, { href, to, ...commonProps, disabled, children: content2 });
    }
    if (to) {
      const LinkComponent = Link;
      return /* @__PURE__ */ jsx(LinkComponent, { to, ...commonProps, children: content2 });
    }
    if (href) {
      return /* @__PURE__ */ jsx("a", { href, ...commonProps, children: content2 });
    }
    return /* @__PURE__ */ jsx("button", { ...commonProps, disabled, type: "button", children: content2 });
  }
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    icon && /* @__PURE__ */ jsx("span", { className: styles_default.itemIcon, "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: styles_default.itemContent, children: [
      /* @__PURE__ */ jsx("span", { className: styles_default.itemTitle, children: title }),
      description && /* @__PURE__ */ jsx("span", { className: styles_default.itemDescription, children: description }),
      children && /* @__PURE__ */ jsx("div", { className: styles_default.itemChildren, children })
    ] })
  ] });
  if (Component) {
    return /* @__PURE__ */ jsx(Component, { href, to, ...commonProps, disabled, children: content });
  }
  if (to) {
    const LinkComponent = Link;
    return /* @__PURE__ */ jsx(LinkComponent, { to, ...commonProps, children: content });
  }
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, ...commonProps, children: content });
  }
  return /* @__PURE__ */ jsx("button", { ...commonProps, disabled, type: "button", children: content });
};
var GSListSeparator = ({
  label,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = useDebug("GSList.Separator", debug);
  debugLogger.log("Rendering GSListSeparator", { hasLabel: !!label });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("gs-list__separator", styles_default.separator, className),
      role: "separator",
      "data-gs-el": "separator",
      "data-gs-debug": debug ? "enabled" : void 0,
      ...rest,
      children: label ? /* @__PURE__ */ jsx("span", { className: styles_default.separatorLabel, children: label }) : /* @__PURE__ */ jsx("div", { className: styles_default.separatorLine })
    }
  );
};
var GSListFooter = ({
  children,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = useDebug("GSList.Footer", debug);
  debugLogger.log("Rendering GSListFooter");
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("gs-list__footer", styles_default.footer, className),
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
export {
  GSList,
  GS_LIST_NAMESPACE,
  GSList_default as default,
  registerGSListI18n
};
//# sourceMappingURL=index.js.map