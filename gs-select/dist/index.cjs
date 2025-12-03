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
  GSSelect: () => GSSelect_default,
  GS_SELECT_NAMESPACE: () => GS_SELECT_NAMESPACE,
  default: () => GSSelect_default,
  registerGSSelectI18n: () => registerGSSelectI18n
});
module.exports = __toCommonJS(index_exports);

// src/GSSelect.tsx
var import_react = require("react");
var import_clsx = __toESM(require("clsx"), 1);
var import_utils = require("@carlos-gs99/utils");
var import_hooks = require("@carlos-gs99/hooks");
var import_utils2 = require("@carlos-gs99/utils");

// src/i18n/en.json
var en_default = {
  label: "Select",
  placeholder: "Select an option",
  noOptions: "No options available",
  loading: "Loading options...",
  search: "Search...",
  aria: {
    select: "Select field",
    expanded: "Expanded",
    collapsed: "Collapsed",
    required: "Required field",
    clear: "Clear selection",
    open: "Open dropdown",
    close: "Close dropdown",
    selected: "Selected",
    helperText: "Helper text"
  }
};

// src/i18n/pt.json
var pt_default = {
  label: "Sele\xE7\xE3o",
  placeholder: "Selecionar uma op\xE7\xE3o",
  noOptions: "Nenhuma op\xE7\xE3o dispon\xEDvel",
  loading: "A carregar op\xE7\xF5es...",
  search: "Procurar...",
  aria: {
    select: "Campo de sele\xE7\xE3o",
    expanded: "Expandido",
    collapsed: "Recolhido",
    required: "Campo obrigat\xF3rio",
    clear: "Limpar sele\xE7\xE3o",
    open: "Abrir lista",
    close: "Fechar lista",
    selected: "Selecionado",
    helperText: "Texto de ajuda"
  }
};

// src/i18n.ts
var GS_SELECT_NAMESPACE = "gsselect";
function registerGSSelectI18n(instance) {
  try {
    instance.addResourceBundle("en", GS_SELECT_NAMESPACE, en_default, true, true);
    instance.addResourceBundle("pt", GS_SELECT_NAMESPACE, pt_default, true, true);
  } catch (_e) {
  }
}

// src/GSSelect.tsx
var import_primitives = require("@carlos-gs99/primitives");
var import_gs_loading = require("@carlos-gs99/gs-loading");
var import_gs_icon = require("@carlos-gs99/gs-icon");

// src/styles.module.css
var styles_default = {};

// src/GSSelect.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var GSSelectComponent = (props, ref) => {
  const {
    options = [],
    optionGroups,
    value,
    defaultValue = null,
    onChange,
    label,
    error,
    helperText,
    required = false,
    size = "md",
    variant = "outlined",
    color = "primary",
    placeholder,
    disabled = false,
    loading = false,
    clearable = false,
    clearButtonOutside = false,
    onClear,
    validationState = null,
    showValidationIcon = false,
    validationIconOutside = false,
    loadingPosition = "inside",
    searchable = false,
    searchPlaceholder,
    onSearch,
    async: asyncMode = false,
    loadOptions,
    debounceTime = 300,
    loadingMessage,
    className,
    selectClassName,
    labelClassName,
    dropdownClassName,
    id,
    // name, // unused for now
    fullWidth = false,
    widthMode = "min",
    maxHeight,
    open: controlledOpen,
    onOpenChange,
    alignSelectedToTrigger = false,
    startDecorator,
    endDecorator,
    renderOption,
    renderValue,
    emptyMessage,
    debug = false,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaRequired
  } = props;
  const { t, i18n } = (0, import_hooks.useTranslation)(GS_SELECT_NAMESPACE);
  (0, import_react.useEffect)(() => {
    registerGSSelectI18n(i18n);
  }, [i18n]);
  const debugUtils = (0, import_utils2.useDebug)("GSSelect", debug);
  const [internalOpen, setInternalOpen] = (0, import_react.useState)(false);
  const [internalValue, setInternalValue] = (0, import_react.useState)(
    defaultValue
  );
  const [focusedIndex, setFocusedIndex] = (0, import_react.useState)(-1);
  const [openUpward, setOpenUpward] = (0, import_react.useState)(false);
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [alignmentOffset, setAlignmentOffset] = (0, import_react.useState)(0);
  const [typeaheadQuery, setTypeaheadQuery] = (0, import_react.useState)("");
  const [asyncOptions, setAsyncOptions] = (0, import_react.useState)([]);
  const [isLoadingAsync, setIsLoadingAsync] = (0, import_react.useState)(false);
  const [asyncError, setAsyncError] = (0, import_react.useState)(null);
  const typeaheadTimerRef = (0, import_react.useRef)(null);
  const asyncDebounceTimerRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const dropdownRef = (0, import_react.useRef)(null);
  const optionRefs = (0, import_react.useRef)([]);
  const searchInputRef = (0, import_react.useRef)(null);
  const reactId = (0, import_react.useId)();
  const baseId = id ?? `gs-select-${reactId.replace(/:/g, "")}`;
  const labelId = label ? `${baseId}-label` : void 0;
  const errorId = error ? `${baseId}-error` : void 0;
  const helperId = helperText ? `${baseId}-helper` : void 0;
  const isControlled = value !== void 0;
  const resolvedValue = isControlled ? value : internalValue;
  const isOpenControlled = controlledOpen !== void 0;
  const isOpen = isOpenControlled ? controlledOpen : internalOpen;
  const isMultipleMode = props.multiple || Array.isArray(resolvedValue);
  const selectedValues = isMultipleMode ? Array.isArray(resolvedValue) ? resolvedValue : resolvedValue ? [resolvedValue] : [] : [];
  const singleValue = !isMultipleMode ? resolvedValue : null;
  const effectiveOptions = asyncMode ? asyncOptions : options;
  const filterOptions = (0, import_react.useCallback)((opts, query) => {
    if (!query.trim()) return opts;
    const lowerQuery = query.toLowerCase();
    return opts.filter(
      (opt) => opt.label.toLowerCase().includes(lowerQuery) || String(opt.value).toLowerCase().includes(lowerQuery)
    );
  }, []);
  const filteredOptions = searchable && searchQuery && !asyncMode ? filterOptions(effectiveOptions, searchQuery) : effectiveOptions;
  const filteredOptionGroups = searchable && searchQuery && optionGroups ? optionGroups.map((group) => ({
    ...group,
    options: filterOptions(group.options, searchQuery)
  })).filter((group) => group.options.length > 0) : optionGroups;
  const flatOptions = filteredOptionGroups ? filteredOptionGroups.flatMap((group) => group.options) : filteredOptions;
  const selectedOptions = isMultipleMode ? flatOptions.filter((opt) => selectedValues.includes(opt.value)) : singleValue !== null ? [flatOptions.find((opt) => opt.value === singleValue)].filter(
    Boolean
  ) : [];
  const selectedOption = selectedOptions[0] || null;
  const effectivePlaceholder = placeholder || t("placeholder");
  const effectiveLoadingMessage = loadingMessage || t("loading");
  const effectiveEmptyMessage = emptyMessage || t("noOptions");
  const effectiveSearchPlaceholder = searchPlaceholder || t("search");
  const hasAnyValue = isMultipleMode ? selectedValues.length > 0 : resolvedValue !== null && resolvedValue !== "" && resolvedValue !== void 0;
  const displayValue = isMultipleMode ? null : renderValue ? renderValue(selectedOption) : selectedOption?.label || effectivePlaceholder;
  const hasError = !!error || validationState === "error";
  const hasSuccess = validationState === "success" && !error;
  const hasWarning = validationState === "warning";
  const enabledOptions = flatOptions.filter((opt) => !opt.disabled);
  debugUtils.log("Render", {
    isOpen,
    resolvedValue,
    selectedOption,
    optionsCount: options.length,
    enabledOptionsCount: enabledOptions.length,
    disabled,
    loading
  });
  const componentState = disabled ? "disabled" : loading ? "loading" : isOpen ? "open" : "idle";
  const containerClasses = (0, import_clsx.default)(
    styles_default.selectContainer,
    // Size classes
    styles_default[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    // sizeSm, sizeMd, sizeLg
    // Variant classes
    styles_default[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    // variantOutlined, variantFilled, etc.
    // Color classes
    styles_default[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
    // colorPrimary, colorSecondary, etc.
    // Width mode
    styles_default[`width${widthMode.charAt(0).toUpperCase() + widthMode.slice(1)}`],
    // widthMin, widthAuto, widthFull
    // State classes
    {
      [styles_default.open]: isOpen,
      [styles_default.disabled]: disabled,
      [styles_default.loading]: loading,
      [styles_default.error]: hasError,
      [styles_default.success]: hasSuccess,
      [styles_default.warning]: hasWarning,
      [styles_default.clearable]: clearable && hasAnyValue,
      [styles_default.fullWidth]: fullWidth || widthMode === "full"
    },
    className
  );
  const dropdownClasses = (0, import_clsx.default)(
    styles_default.selectDropdown,
    {
      [styles_default["selectDropdown--upward"]]: openUpward
    },
    dropdownClassName
  );
  const describedByIds = [ariaDescribedBy, errorId, helperId].filter(Boolean).join(" ") || void 0;
  const effectiveAriaLabel = ariaLabel ?? (label ? void 0 : t("aria.select"));
  const ariaAttributes = (0, import_utils.generateAriaAttributes)({
    label: effectiveAriaLabel,
    labelledBy: ariaLabelledBy || labelId,
    describedBy: describedByIds,
    expanded: isOpen,
    disabled: disabled || loading,
    hasPopup: "listbox",
    invalid: hasError,
    required: required || ariaRequired
  });
  const updateOpenState = (0, import_react.useCallback)(
    (newOpen) => {
      debugUtils.log("updateOpenState", { from: isOpen, to: newOpen });
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isOpen, isOpenControlled, onOpenChange, debugUtils]
  );
  const handleTriggerClick = (0, import_react.useCallback)(() => {
    if (!disabled && !loading) {
      debugUtils.log("handleTriggerClick", { isOpen });
      updateOpenState(!isOpen);
    }
  }, [disabled, loading, isOpen, updateOpenState, debugUtils]);
  const handleOptionClick = (0, import_react.useCallback)(
    (optionValue) => {
      if (!disabled && !loading) {
        const option = flatOptions.find((opt) => opt.value === optionValue);
        if (option && !option.disabled) {
          debugUtils.log("handleOptionClick", {
            optionValue,
            option,
            isMultipleMode
          });
          if (isMultipleMode) {
            const isSelected = selectedValues.includes(optionValue);
            let newValues;
            if (isSelected) {
              newValues = selectedValues.filter((v) => v !== optionValue);
            } else {
              if (props.maxSelections && selectedValues.length >= props.maxSelections) {
                debugUtils.warn("Max selections reached", {
                  max: props.maxSelections,
                  current: selectedValues.length
                });
                return;
              }
              newValues = [...selectedValues, optionValue];
            }
            if (!isControlled) {
              setInternalValue(newValues);
            }
            onChange?.(newValues);
            debugUtils.log("Multi-select updated", { newValues });
          } else {
            if (!isControlled) {
              setInternalValue(optionValue);
            }
            onChange?.(optionValue);
            updateOpenState(false);
            triggerRef.current?.focus();
          }
        }
      }
    },
    [
      disabled,
      loading,
      isControlled,
      onChange,
      flatOptions,
      updateOpenState,
      isMultipleMode,
      selectedValues,
      props.maxSelections,
      debugUtils
    ]
  );
  const handleClear = (0, import_react.useCallback)(
    (e) => {
      e.stopPropagation();
      debugUtils.log("handleClear");
      if (!disabled && !loading) {
        const clearValue = isMultipleMode ? [] : "";
        if (!isControlled) {
          setInternalValue(clearValue);
        }
        onChange?.(clearValue);
        onClear?.();
        triggerRef.current?.focus();
      }
    },
    [
      disabled,
      loading,
      isControlled,
      onChange,
      onClear,
      isMultipleMode,
      debugUtils
    ]
  );
  const handleRemoveChip = (0, import_react.useCallback)(
    (chipValue, e) => {
      e.stopPropagation();
      debugUtils.log("handleRemoveChip", { chipValue });
      if (!disabled && !loading && isMultipleMode) {
        const newValues = selectedValues.filter((v) => v !== chipValue);
        if (!isControlled) {
          setInternalValue(newValues);
        }
        onChange?.(newValues);
        debugUtils.log("Chip removed", { chipValue, newValues });
      }
    },
    [
      disabled,
      loading,
      isControlled,
      onChange,
      isMultipleMode,
      selectedValues,
      debugUtils
    ]
  );
  const handleKeyDown = (0, import_react.useCallback)(
    (event) => {
      if (disabled || loading) return;
      debugUtils.log("handleKeyDown", { key: event.key, isOpen, focusedIndex });
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          if (!isOpen) {
            updateOpenState(true);
            setFocusedIndex(0);
          } else if (focusedIndex >= 0 && focusedIndex < enabledOptions.length) {
            const option = enabledOptions[focusedIndex];
            handleOptionClick(option.value);
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            updateOpenState(true);
            setFocusedIndex(0);
          } else {
            const nextIndex = Math.min(
              focusedIndex + 1,
              enabledOptions.length - 1
            );
            setFocusedIndex(nextIndex);
            optionRefs.current[nextIndex]?.scrollIntoView?.({ block: "nearest" });
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (isOpen) {
            const prevIndex = Math.max(focusedIndex - 1, 0);
            setFocusedIndex(prevIndex);
            optionRefs.current[prevIndex]?.scrollIntoView?.({ block: "nearest" });
          }
          break;
        case "Home":
          if (isOpen) {
            event.preventDefault();
            setFocusedIndex(0);
            optionRefs.current[0]?.scrollIntoView?.({ block: "nearest" });
          }
          break;
        case "End":
          if (isOpen) {
            event.preventDefault();
            const lastIndex = enabledOptions.length - 1;
            setFocusedIndex(lastIndex);
            optionRefs.current[lastIndex]?.scrollIntoView?.({ block: "nearest" });
          }
          break;
        case "Escape":
          event.preventDefault();
          if (isOpen) {
            updateOpenState(false);
            setFocusedIndex(-1);
            triggerRef.current?.focus();
          }
          break;
        case "Tab":
          if (isOpen) {
            updateOpenState(false);
            setFocusedIndex(-1);
          }
          break;
        default:
          if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && !searchable) {
            event.preventDefault();
            if (typeaheadTimerRef.current) {
              clearTimeout(typeaheadTimerRef.current);
            }
            const newQuery = typeaheadQuery + event.key.toLowerCase();
            setTypeaheadQuery(newQuery);
            debugUtils.log("Typeahead", { char: event.key, query: newQuery });
            const matchIndex = enabledOptions.findIndex((opt, idx) => {
              const label2 = opt.label.toLowerCase();
              const matches = label2.startsWith(newQuery);
              return matches && (idx > focusedIndex || focusedIndex === -1);
            });
            const finalIndex = matchIndex !== -1 ? matchIndex : enabledOptions.findIndex(
              (opt) => opt.label.toLowerCase().startsWith(newQuery)
            );
            if (finalIndex !== -1) {
              setFocusedIndex(finalIndex);
              optionRefs.current[finalIndex]?.scrollIntoView?.({
                block: "nearest"
              });
              if (!isOpen) {
                updateOpenState(true);
              }
              debugUtils.log("Typeahead match found", {
                query: newQuery,
                index: finalIndex,
                option: enabledOptions[finalIndex]
              });
            }
            typeaheadTimerRef.current = window.setTimeout(() => {
              setTypeaheadQuery("");
              debugUtils.log("Typeahead query reset");
            }, 1e3);
          }
          break;
      }
    },
    [
      disabled,
      loading,
      isOpen,
      focusedIndex,
      enabledOptions,
      updateOpenState,
      handleOptionClick,
      searchable,
      typeaheadQuery,
      debugUtils
    ]
  );
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (triggerRef.current && dropdownRef.current && !triggerRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)) {
        debugUtils.log("Click outside detected");
        updateOpenState(false);
        setFocusedIndex(-1);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        debugUtils.log("Escape key pressed");
        updateOpenState(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, updateOpenState, debugUtils]);
  (0, import_react.useEffect)(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      setOpenUpward(false);
      setSearchQuery("");
      setAlignmentOffset(0);
    }
  }, [isOpen]);
  (0, import_react.useEffect)(() => {
    if (isOpen && searchable && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
        debugUtils.log("Search input focused");
      });
    }
  }, [isOpen, searchable, debugUtils]);
  (0, import_react.useEffect)(() => {
    return () => {
      if (typeaheadTimerRef.current) {
        clearTimeout(typeaheadTimerRef.current);
      }
      if (asyncDebounceTimerRef.current) {
        clearTimeout(asyncDebounceTimerRef.current);
      }
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!asyncMode || !loadOptions) return;
    if (asyncDebounceTimerRef.current) {
      clearTimeout(asyncDebounceTimerRef.current);
    }
    asyncDebounceTimerRef.current = window.setTimeout(async () => {
      setIsLoadingAsync(true);
      setAsyncError(null);
      debugUtils.log("Async loading started", { query: searchQuery });
      try {
        const loadedOptions = await loadOptions(searchQuery);
        setAsyncOptions(loadedOptions);
        setIsLoadingAsync(false);
        debugUtils.log("Async loading success", {
          count: loadedOptions.length,
          query: searchQuery
        });
      } catch (error2) {
        setIsLoadingAsync(false);
        setAsyncError(
          error2 instanceof Error ? error2.message : "Failed to load options"
        );
        debugUtils.error("Async loading failed", error2);
      }
    }, debounceTime);
    return () => {
      if (asyncDebounceTimerRef.current) {
        clearTimeout(asyncDebounceTimerRef.current);
      }
    };
  }, [asyncMode, loadOptions, searchQuery, debounceTime]);
  (0, import_react.useEffect)(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }
    requestAnimationFrame(() => {
      if (!triggerRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = typeof maxHeight === "number" ? maxHeight : 300;
      const viewportPadding = 16;
      const spaceBelow = window.innerHeight - triggerRect.bottom - viewportPadding;
      const spaceAbove = triggerRect.top - viewportPadding;
      const shouldOpenUpward = spaceBelow < Math.min(dropdownHeight, 150) && spaceAbove > spaceBelow;
      debugUtils.log("Auto-positioning", {
        spaceBelow,
        spaceAbove,
        dropdownHeight,
        shouldOpenUpward,
        triggerTop: triggerRect.top,
        triggerBottom: triggerRect.bottom,
        viewportHeight: window.innerHeight
      });
      setOpenUpward(shouldOpenUpward);
    });
  }, [isOpen, maxHeight]);
  (0, import_react.useEffect)(() => {
    if (!isOpen || !alignSelectedToTrigger || !triggerRef.current || !dropdownRef.current) {
      setAlignmentOffset(0);
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!triggerRef.current || !dropdownRef.current) return;
        const selectedIndex = enabledOptions.findIndex(
          (opt) => isMultipleMode ? selectedValues.includes(opt.value) : opt.value === singleValue
        );
        if (selectedIndex === -1 || selectedIndex >= optionRefs.current.length) {
          setAlignmentOffset(0);
          return;
        }
        const selectedOptionEl = optionRefs.current[selectedIndex];
        if (!selectedOptionEl) {
          setAlignmentOffset(0);
          return;
        }
        const triggerRect = triggerRef.current.getBoundingClientRect();
        let optionOffsetInDropdown = selectedOptionEl.offsetTop;
        let offsetParent = selectedOptionEl.offsetParent;
        while (offsetParent && offsetParent !== dropdownRef.current) {
          if (offsetParent instanceof HTMLElement) {
            optionOffsetInDropdown += offsetParent.offsetTop;
            offsetParent = offsetParent.offsetParent;
          } else {
            break;
          }
        }
        const maxScroll = Math.max(
          0,
          dropdownRef.current.scrollHeight - dropdownRef.current.clientHeight
        );
        const dropdownVisibleHeight = dropdownRef.current.clientHeight;
        const optionHeight = selectedOptionEl.offsetHeight;
        const centerOffset = dropdownVisibleHeight / 2 - optionHeight / 2;
        const idealCenterScroll = optionOffsetInDropdown - centerOffset;
        const targetScroll = Math.max(0, Math.min(idealCenterScroll, maxScroll));
        debugUtils.log("offsetTop calculation (CENTERED)", {
          selectedOptionOffsetTop: selectedOptionEl.offsetTop,
          accumulatedOffset: optionOffsetInDropdown,
          optionHeight: `${optionHeight}px`,
          dropdownVisibleHeight: `${dropdownVisibleHeight}px`,
          centerOffset: `${centerOffset.toFixed(2)}px`,
          idealCenterScroll: `${idealCenterScroll.toFixed(2)}px`,
          maxScroll: `${maxScroll}px`,
          targetScroll: `${targetScroll.toFixed(2)}px`,
          strategy: "Center option in visible area"
        });
        dropdownRef.current.scrollTop = targetScroll;
        const optionRect = selectedOptionEl.getBoundingClientRect();
        const dropdownRectAfterScroll = dropdownRef.current.getBoundingClientRect();
        const optionVisibleOffset = optionRect.top - dropdownRectAfterScroll.top;
        const triggerToDropdownGap = dropdownRectAfterScroll.top - triggerRect.bottom;
        let offset = triggerRect.top - dropdownRectAfterScroll.top - optionVisibleOffset;
        const viewportPadding = 8;
        const dropdownHeight = dropdownRef.current.scrollHeight;
        const visibleHeight = Math.min(
          dropdownHeight,
          maxHeight || 300
        );
        const finalDropdownTop = dropdownRectAfterScroll.top + offset;
        const finalDropdownBottom = finalDropdownTop + visibleHeight;
        if (finalDropdownTop < viewportPadding) {
          offset = -(dropdownRectAfterScroll.top - viewportPadding);
        }
        if (finalDropdownBottom > window.innerHeight - viewportPadding) {
          const excessBottom = finalDropdownBottom - (window.innerHeight - viewportPadding);
          offset -= excessBottom;
        }
        debugUtils.log("Alignment calculated (BaseUI style - CENTERED)", {
          selectedIndex,
          selectedOption: enabledOptions[selectedIndex].label,
          // Measurements
          triggerTop: `${triggerRect.top.toFixed(2)}px`,
          triggerBottom: `${triggerRect.bottom.toFixed(2)}px`,
          dropdownTop: `${dropdownRectAfterScroll.top.toFixed(2)}px`,
          triggerToDropdownGap: `${triggerToDropdownGap.toFixed(2)}px`,
          optionOffsetInDropdown: `${optionOffsetInDropdown.toFixed(2)}px`,
          // Scroll strategy
          scrollStrategy: "Center option in visible area, then align to trigger",
          appliedScrollTop: `${targetScroll.toFixed(2)}px`,
          maxScroll: `${maxScroll}px`,
          dropdownScrollHeight: `${dropdownRef.current.scrollHeight}px`,
          dropdownClientHeight: `${dropdownRef.current.clientHeight}px`,
          visibleHeight: `${visibleHeight}px`,
          // After scroll - where is option now?
          optionVisibleOffset: `${optionVisibleOffset.toFixed(2)}px`,
          // Offset calculation
          calculationFormula: `triggerTop - dropdownTop - optionVisibleOffset`,
          calculationValues: `${triggerRect.top.toFixed(
            2
          )} - ${dropdownRectAfterScroll.top.toFixed(2)} - ${optionVisibleOffset.toFixed(
            2
          )}`,
          calculatedOffset: `${(triggerRect.top - dropdownRectAfterScroll.top - optionVisibleOffset).toFixed(2)}px`,
          finalOffset: `${offset.toFixed(2)}px`,
          viewportClamped: offset !== triggerRect.top - dropdownRectAfterScroll.top - optionVisibleOffset,
          // Final positions
          finalDropdownTop: `${finalDropdownTop.toFixed(2)}px`,
          finalDropdownBottom: `${finalDropdownBottom.toFixed(2)}px`,
          viewportHeight: `${window.innerHeight}px`,
          viewportPadding: `${viewportPadding}px`
        });
        setAlignmentOffset(offset);
      });
    });
  }, [isOpen, alignSelectedToTrigger]);
  const renderClearButton = () => {
    if (!clearable) {
      return null;
    }
    if (disabled) {
      return null;
    }
    if (!hasAnyValue) {
      debugUtils.log("Clear button hidden - no value", {
        resolvedValue,
        isMultipleMode,
        selectedValues
      });
      return null;
    }
    debugUtils.log("Clear button rendered", {
      resolvedValue,
      hasValue: hasAnyValue,
      clearButtonOutside
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_primitives.ButtonBase,
      {
        type: "button",
        className: styles_default.selectClearButton,
        onClick: handleClear,
        "aria-label": t("aria.clear"),
        tabIndex: -1,
        "data-gs-el": "clear",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gs_icon.GSIcon, { name: "close", size: 1 })
      }
    );
  };
  const renderValidationIcon = () => {
    if (error) {
      return (
        /* TODO: GSTooltip not migrated yet */
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_clsx.default)(styles_default.selectValidationIcon, styles_default["selectValidationIcon--error"]),
            "data-gs-el": "validationIcon",
            role: "alert",
            "aria-label": error,
            tabIndex: 0,
            title: error,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gs_icon.GSIcon, { name: "alert-circle", size: "sm" })
          }
        )
      );
    }
    if (!showValidationIcon || !(hasSuccess || hasWarning)) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        className: (0, import_clsx.default)(styles_default.selectValidationIcon, {
          [styles_default["selectValidationIcon--success"]]: hasSuccess,
          [styles_default["selectValidationIcon--warning"]]: hasWarning
        }),
        "data-gs-el": "validationIcon",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_gs_icon.GSIcon,
          {
            name: hasSuccess ? "check-circle" : "alert-outline",
            size: "sm"
          }
        )
      }
    );
  };
  const renderLoadingSpinner = () => {
    if (!loading) return null;
    const showText = loadingPosition !== "inside";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: styles_default.selectLoadingSpinner, "data-gs-el": "loading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_gs_loading.GSLoading,
        {
          mode: "section",
          variant: "transparent",
          title: null,
          description: null,
          message: showText ? effectiveLoadingMessage : null,
          ariaLabel: effectiveLoadingMessage,
          ariaLive: "polite",
          showBackdrop: false,
          spinnerProps: { size: "sm", color: color === "secondary" ? "primary" : color },
          className: (0, import_clsx.default)(styles_default.inlineLoading, {
            [styles_default.inlineLoadingNoText]: !showText
          }),
          style: { padding: 0, minHeight: 0, width: "auto" }
        }
      ),
      !showText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "gs-sr-only", children: effectiveLoadingMessage })
    ] });
  };
  const renderTrigger = () => {
    const hasValidationIconInside = showValidationIcon && !validationIconOutside && (hasError || hasSuccess || hasWarning);
    const hasClearButtonInside = clearable && !clearButtonOutside && hasAnyValue && !disabled;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: triggerRef,
        id: baseId,
        className: (0, import_clsx.default)(
          styles_default.selectField,
          {
            [styles_default.disabled]: disabled,
            [styles_default.loading]: loading && !disabled,
            [styles_default["selectField--withValidationIcon"]]: hasValidationIconInside,
            [styles_default["selectField--withClearButton"]]: hasClearButtonInside
          },
          selectClassName
        ),
        onClick: handleTriggerClick,
        onKeyDown: handleKeyDown,
        tabIndex: disabled || loading ? -1 : 0,
        role: "combobox",
        "aria-controls": isOpen ? `${baseId}-listbox` : void 0,
        "aria-activedescendant": isOpen && focusedIndex >= 0 ? `${baseId}-option-${focusedIndex}` : void 0,
        "data-gs": "GSSelect",
        "data-gs-el": "trigger",
        "data-gs-size": size,
        "data-gs-variant": variant,
        "data-gs-color": color,
        "data-gs-state": componentState,
        "data-gs-has-value": hasAnyValue ? "true" : void 0,
        "data-gs-disabled": disabled ? "true" : void 0,
        "data-gs-loading": loading ? "true" : void 0,
        "data-gs-debug": debug ? "true" : void 0,
        ...ariaAttributes,
        children: [
          startDecorator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: styles_default.selectStartDecorator,
              "data-gs-el": "startDecorator",
              children: startDecorator
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_clsx.default)(styles_default.selectInput, {
                [styles_default.selectPlaceholder]: selectedOptions.length === 0,
                [styles_default["selectInput--multiple"]]: isMultipleMode
              }),
              "data-gs-el": "value",
              children: isMultipleMode ? selectedOptions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles_default.selectChips, "data-gs-el": "chips", children: selectedOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "span",
                {
                  className: styles_default.selectChip,
                  "data-gs-el": "chip",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.selectChipLabel, children: opt.label }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_primitives.ButtonBase,
                      {
                        type: "button",
                        className: styles_default.selectChipRemove,
                        onClick: (e) => handleRemoveChip(opt.value, e),
                        "aria-label": `Remove ${opt.label}`,
                        tabIndex: -1,
                        "data-gs-el": "chip-remove",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gs_icon.GSIcon, { name: "close", size: 1 })
                      }
                    )
                  ]
                },
                String(opt.value)
              )) }) : effectivePlaceholder : (
                /* Single-select: Display text */
                displayValue
              )
            }
          ),
          endDecorator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.selectEndDecorator, "data-gs-el": "endDecorator", children: endDecorator }),
          !clearButtonOutside && renderClearButton(),
          !validationIconOutside && renderValidationIcon(),
          loading && loadingPosition === "inside" ? renderLoadingSpinner() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.selectIcon, "data-gs-el": "icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpDownIcon, {}) })
        ]
      }
    );
  };
  const renderSingleOption = (option, index, groupIndex) => {
    const isSelected = isMultipleMode ? selectedValues.includes(option.value) : option.value === singleValue;
    const isFocused = focusedIndex === enabledOptions.findIndex((o) => o.value === option.value);
    const optionId = groupIndex !== void 0 ? `${baseId}-group-${groupIndex}-option-${index}` : `${baseId}-option-${index}`;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: (el) => {
          if (!option.disabled) {
            const enabledIndex = enabledOptions.findIndex(
              (o) => o.value === option.value
            );
            optionRefs.current[enabledIndex] = el;
          }
        },
        className: (0, import_clsx.default)(styles_default.selectOption, {
          [styles_default["selectOption--selected"]]: isSelected,
          [styles_default["selectOption--disabled"]]: option.disabled,
          [styles_default["selectOption--focused"]]: isFocused
        }),
        role: "option",
        id: optionId,
        "aria-selected": isSelected,
        "aria-disabled": option.disabled,
        onClick: () => handleOptionClick(option.value),
        onMouseEnter: () => {
          if (!option.disabled) {
            const enabledIndex = enabledOptions.findIndex(
              (o) => o.value === option.value
            );
            setFocusedIndex(enabledIndex);
          }
        },
        tabIndex: -1,
        "data-gs-el": "option",
        "data-value": option.value,
        children: renderOption ? renderOption(option, isSelected) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          isMultipleMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: (0, import_clsx.default)(styles_default.selectOptionCheckbox, {
                [styles_default["selectOptionCheckbox--checked"]]: isSelected
              }),
              "data-gs-el": "checkbox",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_gs_icon.GSIcon,
                {
                  name: isSelected ? "checkbox-marked" : "checkbox-blank-outline",
                  size: "sm"
                }
              )
            }
          ),
          option.label,
          !isMultipleMode && isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: styles_default.selectOptionCheck, "data-gs-el": "check", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, {}) })
        ] })
      },
      String(option.value)
    );
  };
  const renderDropdown = () => {
    if (!isOpen) return null;
    const dropdownStyle = {
      maxHeight: maxHeight || 300,
      // Apply transform to align selected option with trigger
      // Only apply transform after alignment is calculated (not 0)
      ...alignSelectedToTrigger && {
        transform: alignmentOffset !== 0 ? `translateY(${alignmentOffset}px)` : "none",
        // No transition on initial render to avoid jumping
        // Transition only applies on subsequent changes
        transition: alignmentOffset !== 0 ? "none" : void 0
      }
    };
    if (isLoadingAsync) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref: dropdownRef,
          className: dropdownClasses,
          role: "listbox",
          id: `${baseId}-listbox`,
          "data-gs-el": "dropdown",
          style: dropdownStyle,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles_default.selectLoadingState, "data-gs-el": "loading", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_gs_loading.GSLoading,
            {
              mode: "section",
              variant: "transparent",
              title: null,
              description: null,
              message: effectiveLoadingMessage,
              ariaLabel: effectiveLoadingMessage,
              ariaLive: "polite",
              showBackdrop: false,
              spinnerProps: { size: "sm", color: color === "secondary" ? "primary" : color },
              className: styles_default.dropdownLoading,
              style: { padding: 0, minHeight: 0, width: "auto" }
            }
          ) })
        }
      );
    }
    if (asyncError) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref: dropdownRef,
          className: dropdownClasses,
          role: "listbox",
          id: `${baseId}-listbox`,
          "data-gs-el": "dropdown",
          style: dropdownStyle,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.selectErrorState, "data-gs-el": "async-error", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gs_icon.GSIcon, { name: "alert-circle", size: 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: asyncError })
          ] })
        }
      );
    }
    if (flatOptions.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref: dropdownRef,
          className: dropdownClasses,
          role: "listbox",
          id: `${baseId}-listbox`,
          "data-gs-el": "dropdown",
          style: dropdownStyle,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: styles_default.selectEmptyState, "data-gs-el": "empty", children: effectiveEmptyMessage })
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: dropdownRef,
        className: dropdownClasses,
        role: "listbox",
        id: `${baseId}-listbox`,
        "aria-labelledby": label ? labelId : void 0,
        "data-gs-el": "dropdown",
        style: dropdownStyle,
        children: [
          searchable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: styles_default.selectSearchWrapper,
              "data-gs-el": "search-wrapper",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_gs_icon.GSIcon,
                  {
                    name: "magnify",
                    size: "sm",
                    style: {
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--color-neutral-500)",
                      pointerEvents: "none"
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    ref: searchInputRef,
                    type: "text",
                    className: styles_default.selectSearchInput,
                    placeholder: effectiveSearchPlaceholder,
                    "aria-label": effectiveSearchPlaceholder,
                    value: searchQuery,
                    onChange: (e) => {
                      const query = e.target.value;
                      setSearchQuery(query);
                      onSearch?.(query);
                      setFocusedIndex(0);
                      debugUtils.log("Search query changed", { query });
                    },
                    onKeyDown: (e) => {
                      if (e.key === " ") {
                        e.stopPropagation();
                      }
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setFocusedIndex(0);
                        optionRefs.current[0]?.scrollIntoView?.({ block: "nearest" });
                      }
                      if (e.key === "Escape") {
                        e.stopPropagation();
                        if (searchQuery) {
                          setSearchQuery("");
                          debugUtils.log("Search cleared via Escape");
                        } else {
                          updateOpenState(false);
                        }
                      }
                    },
                    onClick: (e) => e.stopPropagation(),
                    "data-gs-el": "search-input"
                  }
                ),
                searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_primitives.ButtonBase,
                  {
                    type: "button",
                    className: styles_default.selectSearchClear,
                    onClick: (e) => {
                      e.stopPropagation();
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                      debugUtils.log("Search cleared via button");
                    },
                    "aria-label": "Clear search",
                    tabIndex: -1,
                    "data-gs-el": "search-clear",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gs_icon.GSIcon, { name: "close", size: 1 })
                  }
                )
              ]
            }
          ),
          filteredOptionGroups ? filteredOptionGroups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: styles_default.selectGroup,
              "data-gs-el": "group",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: styles_default.selectGroupLabel,
                    "data-gs-el": "groupLabel",
                    role: "presentation",
                    children: group.label
                  }
                ),
                group.options.map(
                  (option, optionIndex) => renderSingleOption(option, optionIndex, groupIndex)
                )
              ]
            },
            `group-${groupIndex}`
          )) : (
            /* Render without groups */
            filteredOptions.map(
              (option, index) => renderSingleOption(option, index)
            )
          )
        ]
      }
    );
  };
  if (label || error || helperText) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref,
        className: containerClasses,
        "data-gs": "GSSelect",
        "data-gs-el": "root",
        "data-gs-size": size,
        "data-gs-variant": variant,
        "data-gs-color": color,
        "data-gs-width": widthMode,
        "data-gs-state": componentState,
        "data-gs-has-value": hasAnyValue ? "true" : void 0,
        "data-gs-disabled": disabled ? "true" : void 0,
        "data-gs-loading": loading ? "true" : void 0,
        "data-gs-debug": debug ? "true" : void 0,
        children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.selectLabelContainer, "data-gs-el": "labelContainer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "label",
              {
                htmlFor: baseId,
                id: labelId,
                className: (0, import_clsx.default)(styles_default.selectLabel, labelClassName, {
                  [styles_default.selectLabelRequired]: required
                }),
                "data-gs-el": "label",
                children: label
              }
            ),
            helperText && /* TODO: GSTooltip not migrated yet */
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: styles_default.selectHelperIcon,
                "aria-label": t("aria.helperText"),
                role: "button",
                tabIndex: 0,
                title: helperText,
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gs_icon.GSIcon, { name: "help-circle", size: "sm" })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.selectWrapper, "data-gs-el": "wrapper", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.selectTriggerWrapper, "data-gs-el": "triggerWrapper", children: [
              renderTrigger(),
              clearButtonOutside && renderClearButton(),
              validationIconOutside && renderValidationIcon(),
              loading && loadingPosition === "outside" && renderLoadingSpinner()
            ] }),
            renderDropdown()
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: containerClasses,
      "data-gs": "GSSelect",
      "data-gs-el": "root",
      "data-gs-size": size,
      "data-gs-variant": variant,
      "data-gs-color": color,
      "data-gs-width": widthMode,
      "data-gs-state": componentState,
      "data-gs-has-value": hasAnyValue ? "true" : void 0,
      "data-gs-disabled": disabled ? "true" : void 0,
      "data-gs-loading": loading ? "true" : void 0,
      "data-gs-debug": debug ? "true" : void 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.selectWrapper, "data-gs-el": "wrapper", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: styles_default.selectTriggerWrapper, "data-gs-el": "triggerWrapper", children: [
          renderTrigger(),
          clearButtonOutside && renderClearButton(),
          validationIconOutside && renderValidationIcon(),
          loading && loadingPosition === "outside" && renderLoadingSpinner()
        ] }),
        renderDropdown()
      ] })
    }
  );
};
var GSSelect = (0, import_react.forwardRef)(GSSelectComponent);
GSSelect.displayName = "GSSelect";
var ChevronUpDownIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M4 6L8 10L12 6",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var CheckIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "path",
      {
        d: "M13.5 4.5L6 12L2.5 8.5",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var GSSelect_default = GSSelect;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GSSelect,
  GS_SELECT_NAMESPACE,
  registerGSSelectI18n
});
//# sourceMappingURL=index.cjs.map