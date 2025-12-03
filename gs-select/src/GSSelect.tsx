import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  forwardRef,
} from "react";
import clsx from "clsx";
import { generateAriaAttributes } from "@carlos-gs99/utils";
import { useTranslation } from "@carlos-gs99/hooks";
import { useDebug } from "@carlos-gs99/utils";
import { GS_SELECT_NAMESPACE, registerGSSelectI18n } from "./i18n";
import { ButtonBase } from "@carlos-gs99/primitives";
import { GSLoading } from "@carlos-gs99/gs-loading";
import { GSIcon } from "@carlos-gs99/gs-icon";
import { GSTooltip } from "@carlos-gs99/gs-tooltip";
import type { GSSelectProps, GSSelectOption } from "./types";
import styles from "./styles.module.css";

export type { GSSelectProps, GSSelectOption };

/**
 * GSSelect - Advanced Select component with GS styling
 *
 * Features:
 * - Label and error handling
 * - Helper text support
 * - Size variants (sm, md, lg)
 * - Visual variants (outlined, filled, standard, soft, solid, plain)
 * - Accessible with proper ARIA attributes
 * - Keyboard navigation (Arrow keys, Home, End, Enter, Escape)
 * - Click outside to close
 * - Loading state with spinner
 * - Clearable with X button
 * - Validation states (success, warning, error)
 * - Debug mode integration
 * - i18n support
 */
const GSSelectComponent = (
  props: GSSelectProps,
  ref: React.Ref<HTMLDivElement>
) => {
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
    loadingPosition = 'inside',
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
    widthMode = 'min',
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
    ariaRequired,
  } = props;

  const { t, i18n } = useTranslation(GS_SELECT_NAMESPACE);

  useEffect(() => {
    registerGSSelectI18n(i18n);
  }, [i18n]);

  // Debug mode
  const debugUtils = useDebug("GSSelect", debug);
  
  // State management
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number | null>(
    defaultValue
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [openUpward, setOpenUpward] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [alignmentOffset, setAlignmentOffset] = useState<number>(0);
  const [typeaheadQuery, setTypeaheadQuery] = useState("");
  const [asyncOptions, setAsyncOptions] = useState<GSSelectOption[]>([]);
  const [isLoadingAsync, setIsLoadingAsync] = useState(false);
  const [asyncError, setAsyncError] = useState<string | null>(null);
  const typeaheadTimerRef = useRef<number | null>(null);
  const asyncDebounceTimerRef = useRef<number | null>(null);

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const reactId = useId();
  const baseId = id ?? `gs-select-${reactId.replace(/:/g, "")}`;
  const labelId = label ? `${baseId}-label` : undefined;
  const errorId = error ? `${baseId}-error` : undefined;
  const helperId = helperText ? `${baseId}-helper` : undefined;

  // Computed values
  const isControlled = value !== undefined;
  const resolvedValue = isControlled ? value : internalValue;
  const isOpenControlled = controlledOpen !== undefined;
  const isOpen = isOpenControlled ? controlledOpen : internalOpen;

  // Multi-select helpers
  const isMultipleMode = props.multiple || Array.isArray(resolvedValue);
  const selectedValues = isMultipleMode
    ? Array.isArray(resolvedValue)
      ? resolvedValue
      : resolvedValue
      ? [resolvedValue]
      : []
    : [];
  const singleValue = !isMultipleMode ? resolvedValue : null;

  // Use async options if in async mode, otherwise use provided options
  const effectiveOptions = asyncMode ? asyncOptions : options;

  // Filter options based on search query
  const filterOptions = useCallback((opts: GSSelectOption[], query: string) => {
    if (!query.trim()) return opts;
    const lowerQuery = query.toLowerCase();
    return opts.filter(
      (opt) =>
        opt.label.toLowerCase().includes(lowerQuery) ||
        String(opt.value).toLowerCase().includes(lowerQuery)
    );
  }, []);

  // Filtered options and groups
  const filteredOptions =
    searchable && searchQuery && !asyncMode
      ? filterOptions(effectiveOptions, searchQuery)
      : effectiveOptions;

  const filteredOptionGroups =
    searchable && searchQuery && optionGroups
      ? optionGroups
          .map((group) => ({
            ...group,
            options: filterOptions(group.options, searchQuery),
          }))
          .filter((group) => group.options.length > 0)
      : optionGroups;

  // Flatten options from groups if using optionGroups
  const flatOptions = filteredOptionGroups
    ? filteredOptionGroups.flatMap((group) => group.options)
    : filteredOptions;

  // Selected options (single or multiple)
  const selectedOptions = isMultipleMode
    ? flatOptions.filter((opt) => selectedValues.includes(opt.value))
    : singleValue !== null
    ? ([flatOptions.find((opt) => opt.value === singleValue)].filter(
        Boolean
      ) as GSSelectOption[])
    : [];

  const selectedOption = selectedOptions[0] || null;
  const effectivePlaceholder = placeholder || t("placeholder");
  const effectiveLoadingMessage = loadingMessage || t("loading");
  const effectiveEmptyMessage = emptyMessage || t("noOptions");
  const effectiveSearchPlaceholder = searchPlaceholder || t("search");

  const hasAnyValue = isMultipleMode
    ? selectedValues.length > 0
    : resolvedValue !== null &&
      resolvedValue !== "" &&
      resolvedValue !== undefined;

  // Display value for trigger
  const displayValue = isMultipleMode
    ? null // Will render chips instead
    : renderValue
    ? renderValue(selectedOption)
    : selectedOption?.label || effectivePlaceholder;

  const hasError = !!error || validationState === "error";
  const hasSuccess = validationState === "success" && !error;
  const hasWarning = validationState === "warning";

  // Get enabled options for keyboard navigation (from flat list)
  const enabledOptions = flatOptions.filter((opt) => !opt.disabled);

  debugUtils.log("Render", {
    isOpen,
    resolvedValue,
    selectedOption,
    optionsCount: options.length,
    enabledOptionsCount: enabledOptions.length,
      disabled,
    loading,
  });

  const componentState = disabled
    ? "disabled"
    : loading
    ? "loading"
    : isOpen
    ? "open"
    : "idle";

  // Build class names (CSS Modules - like GSInput)
  const containerClasses = clsx(
    styles.selectContainer,
    // Size classes
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`], // sizeSm, sizeMd, sizeLg
    // Variant classes
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`], // variantOutlined, variantFilled, etc.
    // Color classes
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`], // colorPrimary, colorSecondary, etc.
    // Width mode
    styles[`width${widthMode.charAt(0).toUpperCase() + widthMode.slice(1)}`], // widthMin, widthAuto, widthFull
    // State classes
    {
      [styles.open]: isOpen,
      [styles.disabled]: disabled,
      [styles.loading]: loading,
      [styles.error]: hasError,
      [styles.success]: hasSuccess,
      [styles.warning]: hasWarning,
      [styles.clearable]: clearable && hasAnyValue,
      [styles.fullWidth]: fullWidth || widthMode === 'full',
    },
    className
  );

  const dropdownClasses = clsx(
    styles.selectDropdown,
    {
      [styles["selectDropdown--upward"]]: openUpward,
    },
    dropdownClassName
  );

  // ARIA attributes
  const describedByIds =
    [ariaDescribedBy, errorId, helperId].filter(Boolean).join(" ") ||
    undefined;

  const effectiveAriaLabel =
    ariaLabel ?? (label ? undefined : t("aria.select"));

  const ariaAttributes = generateAriaAttributes({
    label: effectiveAriaLabel,
    labelledBy: ariaLabelledBy || labelId,
    describedBy: describedByIds,
    expanded: isOpen,
    disabled: disabled || loading,
    hasPopup: "listbox",
    invalid: hasError,
    required: required || ariaRequired,
  });

  // Helper to update open state
  const updateOpenState = useCallback(
    (newOpen: boolean) => {
      debugUtils.log("updateOpenState", { from: isOpen, to: newOpen });
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isOpen, isOpenControlled, onOpenChange, debugUtils]
  );

  // Event handlers
  const handleTriggerClick = useCallback(() => {
    if (!disabled && !loading) {
      debugUtils.log("handleTriggerClick", { isOpen });
      updateOpenState(!isOpen);
    }
  }, [disabled, loading, isOpen, updateOpenState, debugUtils]);

  const handleOptionClick = useCallback(
    (optionValue: string | number) => {
      if (!disabled && !loading) {
        const option = flatOptions.find((opt) => opt.value === optionValue);
      if (option && !option.disabled) {
          debugUtils.log("handleOptionClick", {
            optionValue,
            option,
            isMultipleMode,
          });

          if (isMultipleMode) {
            // Multi-select mode: toggle value in array
            const isSelected = selectedValues.includes(optionValue);
            let newValues: (string | number)[];

            if (isSelected) {
              // Remove from selection
              newValues = selectedValues.filter((v) => v !== optionValue);
            } else {
              // Add to selection (check maxSelections)
              if (
                props.maxSelections &&
                selectedValues.length >= props.maxSelections
              ) {
                debugUtils.warn("Max selections reached", {
                  max: props.maxSelections,
                  current: selectedValues.length,
                });
                return;
              }
              newValues = [...selectedValues, optionValue];
            }

            if (!isControlled) {
              setInternalValue(newValues as any);
            }
            onChange?.(newValues as any);

            // Don't close dropdown in multi-select mode
            debugUtils.log("Multi-select updated", { newValues });
          } else {
            // Single-select mode: set value and close
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
      debugUtils,
    ]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      debugUtils.log("handleClear");
      if (!disabled && !loading) {
        const clearValue = isMultipleMode ? [] : ("" as any);
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
      debugUtils,
    ]
  );

  const handleRemoveChip = useCallback(
    (chipValue: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      debugUtils.log("handleRemoveChip", { chipValue });
      if (!disabled && !loading && isMultipleMode) {
        const newValues = selectedValues.filter((v) => v !== chipValue);
        if (!isControlled) {
          setInternalValue(newValues as any);
        }
        onChange?.(newValues as any);
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
      debugUtils,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled || loading) return;

      debugUtils.log("handleKeyDown", { key: event.key, isOpen, focusedIndex });

    switch (event.key) {
        case "Enter":
        case " ":
        event.preventDefault();
          if (!isOpen) {
            updateOpenState(true);
            setFocusedIndex(0); // Focus first option when opening with Space/Enter
          } else if (
            focusedIndex >= 0 &&
            focusedIndex < enabledOptions.length
          ) {
            // Select focused option
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
            // Move to next option
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
            // Move to previous option
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
          // Typeahead navigation - single character search
          if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            !searchable
          ) {
            event.preventDefault();

            // Clear existing timer
            if (typeaheadTimerRef.current) {
              clearTimeout(typeaheadTimerRef.current);
            }

            // Append character to typeahead query
            const newQuery = typeaheadQuery + event.key.toLowerCase();
            setTypeaheadQuery(newQuery);

            debugUtils.log("Typeahead", { char: event.key, query: newQuery });

            // Find first option that starts with query (case-insensitive)
            const matchIndex = enabledOptions.findIndex((opt, idx) => {
              const label = opt.label.toLowerCase();
              const matches = label.startsWith(newQuery);
              // If we're already on a match, find the next one
              return matches && (idx > focusedIndex || focusedIndex === -1);
            });

            // If no match after current, wrap around
            const finalIndex =
              matchIndex !== -1
                ? matchIndex
                : enabledOptions.findIndex((opt) =>
                    opt.label.toLowerCase().startsWith(newQuery)
                  );

            if (finalIndex !== -1) {
              setFocusedIndex(finalIndex);
              optionRefs.current[finalIndex]?.scrollIntoView?.({
                block: "nearest",
              });

              // If not open, open dropdown and select
              if (!isOpen) {
                updateOpenState(true);
              }

              debugUtils.log("Typeahead match found", {
                query: newQuery,
                index: finalIndex,
                option: enabledOptions[finalIndex],
              });
            }

            // Reset typeahead after 1 second of no typing
            typeaheadTimerRef.current = window.setTimeout(() => {
              setTypeaheadQuery("");
              debugUtils.log("Typeahead query reset");
            }, 1000);
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
      debugUtils,
    ]
  );

  // Click outside to close + Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        dropdownRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        debugUtils.log("Click outside detected");
        updateOpenState(false);
        setFocusedIndex(-1);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
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

  // Reset focused index when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      setOpenUpward(false);
      setSearchQuery(""); // Clear search on close
      setAlignmentOffset(0); // Reset alignment
    }
  }, [isOpen]);

  // Focus search input when dropdown opens (if searchable)
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
        debugUtils.log("Search input focused");
      });
    }
  }, [isOpen, searchable, debugUtils]);

  // Cleanup typeahead timer
  useEffect(() => {
    return () => {
      if (typeaheadTimerRef.current) {
        clearTimeout(typeaheadTimerRef.current);
      }
      if (asyncDebounceTimerRef.current) {
        clearTimeout(asyncDebounceTimerRef.current);
      }
    };
  }, []);

  // Async loading of options
  useEffect(() => {
    if (!asyncMode || !loadOptions) return;

    // Clear existing timer
    if (asyncDebounceTimerRef.current) {
      clearTimeout(asyncDebounceTimerRef.current);
    }

    // Debounce the async call
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
          query: searchQuery,
        });
      } catch (error) {
        setIsLoadingAsync(false);
        setAsyncError(
          error instanceof Error ? error.message : "Failed to load options"
        );
        debugUtils.error("Async loading failed", error);
      }
    }, debounceTime);

    return () => {
      if (asyncDebounceTimerRef.current) {
        clearTimeout(asyncDebounceTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncMode, loadOptions, searchQuery, debounceTime]); // debugUtils removed to prevent infinite loop

  // Auto-positioning: Detect if should open upward
  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      if (!triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = typeof maxHeight === "number" ? maxHeight : 300;
      const viewportPadding = 16; // 16px padding from viewport edges

      const spaceBelow =
        window.innerHeight - triggerRect.bottom - viewportPadding;
      const spaceAbove = triggerRect.top - viewportPadding;

      // Open upward if:
      // 1. Not enough space below for dropdown
      // 2. More space above than below
      const shouldOpenUpward =
        spaceBelow < Math.min(dropdownHeight, 150) && spaceAbove > spaceBelow;

      debugUtils.log("Auto-positioning", {
        spaceBelow,
        spaceAbove,
        dropdownHeight,
        shouldOpenUpward,
        triggerTop: triggerRect.top,
        triggerBottom: triggerRect.bottom,
        viewportHeight: window.innerHeight,
      });

      setOpenUpward(shouldOpenUpward);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, maxHeight]); // Removed debugUtils to prevent loop

  // Calculate alignment offset (BaseUI style - using CSS transform)
  useEffect(() => {
    if (
      !isOpen ||
      !alignSelectedToTrigger ||
      !triggerRef.current ||
      !dropdownRef.current
    ) {
      setAlignmentOffset(0);
      return;
    }

    // Wait for dropdown and options to render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!triggerRef.current || !dropdownRef.current) return;

        // Find selected option index in enabled options
        const selectedIndex = enabledOptions.findIndex((opt) =>
          isMultipleMode
            ? selectedValues.includes(opt.value)
            : opt.value === singleValue
        );

        if (
          selectedIndex === -1 ||
          selectedIndex >= optionRefs.current.length
        ) {
          setAlignmentOffset(0);
          return;
        }

        const selectedOptionEl = optionRefs.current[selectedIndex];
        if (!selectedOptionEl) {
          setAlignmentOffset(0);
          return;
        }

        // Get trigger position in viewport
        const triggerRect = triggerRef.current.getBoundingClientRect();
        // const dropdownRect = dropdownRef.current.getBoundingClientRect(); // unused

        // CRITICAL FIX: Use offsetTop for scroll-independent positioning
        // offsetTop gives position within parent, regardless of scroll state
        let optionOffsetInDropdown = selectedOptionEl.offsetTop;

        // Walk up the tree to accumulate offsets from parent containers
        let offsetParent = selectedOptionEl.offsetParent;

        while (offsetParent && offsetParent !== dropdownRef.current) {
          if (offsetParent instanceof HTMLElement) {
            optionOffsetInDropdown += offsetParent.offsetTop;
            offsetParent = offsetParent.offsetParent;
          } else {
            break;
          }
        }

        // Calculate max scroll (can't scroll beyond content)
        const maxScroll = Math.max(
          0,
          dropdownRef.current.scrollHeight - dropdownRef.current.clientHeight
        );
        
        // CENTER SELECTED OPTION: Calculate scroll to position option in the middle
        // Formula: optionTop - (visibleHeight / 2) + (optionHeight / 2)
        const dropdownVisibleHeight = dropdownRef.current.clientHeight;
        const optionHeight = selectedOptionEl.offsetHeight;
        const centerOffset = dropdownVisibleHeight / 2 - optionHeight / 2;
        
        // Target scroll to center the option (with bounds)
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
          strategy: 'Center option in visible area',
        });

        // Scroll the dropdown so selected option is centered (when possible)
        // This creates context with options visible before and after
        dropdownRef.current.scrollTop = targetScroll;

        // Measure positions AFTER scrolling to selected option
        const optionRect = selectedOptionEl.getBoundingClientRect();
        const dropdownRectAfterScroll = dropdownRef.current.getBoundingClientRect();

        // Now option should be centered (or as close as possible) in the visible area
        // Calculate how much more we need to move dropdown to align option with trigger
        const optionVisibleOffset = optionRect.top - dropdownRectAfterScroll.top;

        // Calculate offset to align option with trigger
        // Formula: offset = triggerTop - dropdownTop - optionVisibleOffset
        const triggerToDropdownGap = dropdownRectAfterScroll.top - triggerRect.bottom;
        let offset = triggerRect.top - dropdownRectAfterScroll.top - optionVisibleOffset;

        // Viewport bounds protection
        const viewportPadding = 8;
        const dropdownHeight = dropdownRef.current.scrollHeight; // Total height (not just visible)
        const visibleHeight = Math.min(
          dropdownHeight,
          (maxHeight as number) || 300
        );

        // Calculate where dropdown would end up after transform
        const finalDropdownTop = dropdownRectAfterScroll.top + offset;
        const finalDropdownBottom = finalDropdownTop + visibleHeight;

        // If would go above viewport, clamp to top
        if (finalDropdownTop < viewportPadding) {
          offset = -(dropdownRectAfterScroll.top - viewportPadding);
        }

        // If would go below viewport, clamp to bottom
        if (finalDropdownBottom > window.innerHeight - viewportPadding) {
          const excessBottom =
            finalDropdownBottom - (window.innerHeight - viewportPadding);
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
          calculatedOffset: `${(
            triggerRect.top -
            dropdownRectAfterScroll.top -
            optionVisibleOffset
          ).toFixed(2)}px`,
          finalOffset: `${offset.toFixed(2)}px`,
          viewportClamped:
            offset !== triggerRect.top - dropdownRectAfterScroll.top - optionVisibleOffset,
          // Final positions
          finalDropdownTop: `${finalDropdownTop.toFixed(2)}px`,
          finalDropdownBottom: `${finalDropdownBottom.toFixed(2)}px`,
          viewportHeight: `${window.innerHeight}px`,
          viewportPadding: `${viewportPadding}px`,
        });

        setAlignmentOffset(offset);

        // IMPORTANT: Scroll stays at targetScroll position!
        // This centers the selected option with context (options above and below)
        // Combined with transform, this creates perfect alignment while maintaining context
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, alignSelectedToTrigger]); // Only run when dropdown opens/closes

  // Render clear button (helper)
  const renderClearButton = () => {
    if (!clearable) {
      return null;
    }
    
    if (disabled) {
      return null;
    }

    // Check if there's a value to clear
    if (!hasAnyValue) {
      debugUtils.log('Clear button hidden - no value', { 
        resolvedValue, 
        isMultipleMode, 
        selectedValues 
      });
      return null;
    }

    debugUtils.log('Clear button rendered', { 
      resolvedValue, 
      hasValue: hasAnyValue,
      clearButtonOutside 
    });

    return (
      <ButtonBase
        type="button"
        className={styles.selectClearButton}
        onClick={handleClear}
        aria-label={t("aria.clear")}
        tabIndex={-1}
        data-gs-el="clear"
      >
        <GSIcon name="close" size={1} />
      </ButtonBase>
    );
  };

  // Render validation icon (helper)
  const renderValidationIcon = () => {
    // Always show error icon when there's an error (with tooltip)
    if (error) {
      return (
        <GSTooltip
          content={error}
          placement="top"
          trigger="hover"
          enterDelay={200}
          color="danger"
        >
          <span
            className={clsx(styles.selectValidationIcon, styles["selectValidationIcon--error"])}
            data-gs-el="validationIcon"
            role="alert"
            aria-label={error}
            tabIndex={0}
          >
            <GSIcon name="alert-circle" size="sm" />
          </span>
        </GSTooltip>
      );
    }

    // Show success/warning icons only if showValidationIcon is enabled
    if (!showValidationIcon || !(hasSuccess || hasWarning)) {
      return null;
    }

    return (
      <span
        className={clsx(styles.selectValidationIcon, {
          [styles["selectValidationIcon--success"]]: hasSuccess,
          [styles["selectValidationIcon--warning"]]: hasWarning,
        })}
        data-gs-el="validationIcon"
      >
        <GSIcon
          name={
            hasSuccess
              ? "check-circle"
              : "alert-outline"
          }
          size="sm"
        />
      </span>
    );
  };

  // Render loading spinner (helper)
  const renderLoadingSpinner = () => {
    if (!loading) return null;

    const showText = loadingPosition !== "inside";

    return (
      <span className={styles.selectLoadingSpinner} data-gs-el="loading">
        <GSLoading
          mode="section"
          variant="transparent"
          title={null}
          description={null}
          message={showText ? effectiveLoadingMessage : null}
          ariaLabel={effectiveLoadingMessage}
          ariaLive="polite"
          showBackdrop={false}
          spinnerProps={{ size: 'sm', color: color === 'secondary' ? 'primary' : color }}
          className={clsx(styles.inlineLoading, {
            [styles.inlineLoadingNoText]: !showText,
          })}
          style={{ padding: 0, minHeight: 0, width: 'auto' }}
        />
        {!showText && (
          <span className="gs-sr-only">{effectiveLoadingMessage}</span>
        )}
      </span>
    );
  };

  // Render trigger
  const renderTrigger = () => {
    const hasValidationIconInside =
      showValidationIcon &&
      !validationIconOutside &&
      (hasError || hasSuccess || hasWarning);
    const hasClearButtonInside =
      clearable && !clearButtonOutside && hasAnyValue && !disabled;

    return (
    <div
      ref={triggerRef}
      id={baseId}
      className={clsx(
        styles.selectField, 
        {
          [styles.disabled]: disabled,
          [styles.loading]: loading && !disabled,
          [styles['selectField--withValidationIcon']]: hasValidationIconInside,
          [styles['selectField--withClearButton']]: hasClearButtonInside,
        },
        selectClassName
      )}
      onClick={handleTriggerClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled || loading ? -1 : 0}
      role="combobox"
      aria-controls={isOpen ? `${baseId}-listbox` : undefined}
      aria-activedescendant={
        isOpen && focusedIndex >= 0
          ? `${baseId}-option-${focusedIndex}`
          : undefined
      }
      data-gs="GSSelect"
      data-gs-el="trigger"
      data-gs-size={size}
      data-gs-variant={variant}
      data-gs-color={color}
      data-gs-state={componentState}
      data-gs-has-value={hasAnyValue ? "true" : undefined}
      data-gs-disabled={disabled ? "true" : undefined}
      data-gs-loading={loading ? "true" : undefined}
      data-gs-debug={debug ? "true" : undefined}
      {...ariaAttributes}
    >
      {/* Start Decorator */}
      {startDecorator && (
        <span
          className={styles.selectStartDecorator}
          data-gs-el="startDecorator"
        >
          {startDecorator}
        </span>
      )}

      {/* Display Value */}
      <div
        className={clsx(styles.selectInput, {
          [styles.selectPlaceholder]: selectedOptions.length === 0,
          [styles["selectInput--multiple"]]: isMultipleMode,
        })}
        data-gs-el="value"
      >
        {/* Multi-select: Render chips */}
        {isMultipleMode ? (
          selectedOptions.length > 0 ? (
            <div className={styles.selectChips} data-gs-el="chips">
              {selectedOptions.map((opt) => (
                <span
                  key={String(opt.value)}
                  className={styles.selectChip}
                  data-gs-el="chip"
                >
                  <span className={styles.selectChipLabel}>{opt.label}</span>
                  <ButtonBase
                    type="button"
                    className={styles.selectChipRemove}
                    onClick={(e) => handleRemoveChip(opt.value, e)}
                    aria-label={`Remove ${opt.label}`}
                    tabIndex={-1}
                    data-gs-el="chip-remove"
                  >
                    <GSIcon name="close" size={1} />
                  </ButtonBase>
                </span>
              ))}
      </div>
          ) : (
            effectivePlaceholder
          )
        ) : (
          /* Single-select: Display text */
          displayValue
        )}
      </div>

      {/* End Decorator */}
      {endDecorator && (
        <span className={styles.selectEndDecorator} data-gs-el="endDecorator">
          {endDecorator}
        </span>
      )}

      {/* Clear Button (INSIDE - before validation icon) */}
      {!clearButtonOutside && renderClearButton()}

      {/* Validation Icon (INSIDE - after clear, before loading/chevron) */}
      {!validationIconOutside && renderValidationIcon()}

      {/* Loading Spinner (INSIDE - replaces chevron) OR Chevron Icon */}
      {loading && loadingPosition === 'inside' ? (
        renderLoadingSpinner()
      ) : (
        <span className={styles.selectIcon} data-gs-el="icon">
        <ChevronUpDownIcon />
      </span>
      )}
    </div>
  );
  };

  // Render single option
  const renderSingleOption = (
    option: GSSelectOption,
    index: number,
    groupIndex?: number
  ) => {
    const isSelected = isMultipleMode
      ? selectedValues.includes(option.value)
      : option.value === singleValue;
    const isFocused =
      focusedIndex ===
      enabledOptions.findIndex((o) => o.value === option.value);
    const optionId =
      groupIndex !== undefined
        ? `${baseId}-group-${groupIndex}-option-${index}`
        : `${baseId}-option-${index}`;

    return (
          <div
            key={String(option.value)}
        ref={(el) => {
          if (!option.disabled) {
            const enabledIndex = enabledOptions.findIndex(
              (o) => o.value === option.value
            );
            optionRefs.current[enabledIndex] = el;
          }
        }}
            className={clsx(styles.selectOption, {
          [styles["selectOption--selected"]]: isSelected,
          [styles["selectOption--disabled"]]: option.disabled,
          [styles["selectOption--focused"]]: isFocused,
            })}
            role="option"
        id={optionId}
        aria-selected={isSelected}
            aria-disabled={option.disabled}
            onClick={() => handleOptionClick(option.value)}
        onMouseEnter={() => {
          if (!option.disabled) {
            const enabledIndex = enabledOptions.findIndex(
              (o) => o.value === option.value
            );
            setFocusedIndex(enabledIndex);
          }
        }}
        tabIndex={-1}
        data-gs-el="option"
        data-value={option.value}
      >
        {renderOption ? (
          renderOption(option, isSelected)
        ) : (
          <>
            {/* Multi-select mode: show checkbox */}
            {isMultipleMode && (
              <span
                className={clsx(styles.selectOptionCheckbox, {
                  [styles["selectOptionCheckbox--checked"]]: isSelected,
                })}
                data-gs-el="checkbox"
              >
                <GSIcon
                  name={
                    isSelected
                      ? "checkbox-marked"
                      : "checkbox-blank-outline"
                  }
                  size="sm"
                />
              </span>
            )}

            {option.label}

            {/* Single-select mode: show checkmark */}
            {!isMultipleMode && isSelected && (
              <span className={styles.selectOptionCheck} data-gs-el="check">
                <CheckIcon />
              </span>
            )}
          </>
            )}
          </div>
    );
  };

  // Render dropdown
  const renderDropdown = () => {
    if (!isOpen) return null;

    // Dropdown style with alignment offset (BaseUI style)
    const dropdownStyle: React.CSSProperties = {
      maxHeight: maxHeight || 300,
      // Apply transform to align selected option with trigger
      // Only apply transform after alignment is calculated (not 0)
      ...(alignSelectedToTrigger && {
        transform:
          alignmentOffset !== 0 ? `translateY(${alignmentOffset}px)` : "none",
        // No transition on initial render to avoid jumping
        // Transition only applies on subsequent changes
        transition: alignmentOffset !== 0 ? "none" : undefined,
      }),
    };

    // Loading state (async)
    if (isLoadingAsync) {
      return (
        <div
          ref={dropdownRef}
          className={dropdownClasses}
          role="listbox"
          id={`${baseId}-listbox`}
          data-gs-el="dropdown"
          style={dropdownStyle}
        >
          <div className={styles.selectLoadingState} data-gs-el="loading">
            <GSLoading
              mode="section"
              variant="transparent"
              title={null}
              description={null}
              message={effectiveLoadingMessage}
              ariaLabel={effectiveLoadingMessage}
              ariaLive="polite"
              showBackdrop={false}
              spinnerProps={{ size: 'sm', color: color === 'secondary' ? 'primary' : color }}
              className={styles.dropdownLoading}
              style={{ padding: 0, minHeight: 0, width: 'auto' }}
            />
          </div>
        </div>
      );
    }

    // Error state (async)
    if (asyncError) {
      return (
        <div
          ref={dropdownRef}
          className={dropdownClasses}
          role="listbox"
          id={`${baseId}-listbox`}
          data-gs-el="dropdown"
          style={dropdownStyle}
        >
          <div className={styles.selectErrorState} data-gs-el="async-error">
            <GSIcon name="alert-circle" size={1} />
            <span>{asyncError}</span>
          </div>
        </div>
      );
    }

    // Empty state
    if (flatOptions.length === 0) {
      return (
        <div
          ref={dropdownRef}
          className={dropdownClasses}
          role="listbox"
          id={`${baseId}-listbox`}
          data-gs-el="dropdown"
          style={dropdownStyle}
        >
          <div className={styles.selectEmptyState} data-gs-el="empty">
            {effectiveEmptyMessage}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={dropdownRef}
        className={dropdownClasses}
        role="listbox"
        id={`${baseId}-listbox`}
        aria-labelledby={label ? labelId : undefined}
        data-gs-el="dropdown"
        style={dropdownStyle}
      >
        {/* Search Input */}
        {searchable && (
          <div
            className={styles.selectSearchWrapper}
            data-gs-el="search-wrapper"
          >
            <GSIcon
              name="magnify"
              size="sm"
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-neutral-500)",
                pointerEvents: "none",
              }}
            />
            <input
              ref={searchInputRef}
              type="text"
              className={styles.selectSearchInput}
              placeholder={effectiveSearchPlaceholder}
              aria-label={effectiveSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                onSearch?.(query);
                setFocusedIndex(0); // Reset to first option
                debugUtils.log("Search query changed", { query });
              }}
              onKeyDown={(e) => {
                // Prevent dropdown closing on space in search
                if (e.key === " ") {
                  e.stopPropagation();
                }
                // Arrow down moves to options
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setFocusedIndex(0);
                  optionRefs.current[0]?.scrollIntoView?.({ block: "nearest" });
                }
                // Escape clears search or closes dropdown
                if (e.key === "Escape") {
                  e.stopPropagation();
                  if (searchQuery) {
                    setSearchQuery("");
                    debugUtils.log("Search cleared via Escape");
                  } else {
                    updateOpenState(false);
                  }
                }
              }}
              onClick={(e) => e.stopPropagation()}
              data-gs-el="search-input"
            />
            {searchQuery && (
              <ButtonBase
                type="button"
                className={styles.selectSearchClear}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                  debugUtils.log("Search cleared via button");
                }}
                aria-label="Clear search"
                tabIndex={-1}
                data-gs-el="search-clear"
              >
                <GSIcon name="close" size={1} />
              </ButtonBase>
            )}
          </div>
        )}

        {/* Render with groups */}
        {filteredOptionGroups
          ? filteredOptionGroups.map((group, groupIndex) => (
              <div
                key={`group-${groupIndex}`}
                className={styles.selectGroup}
                data-gs-el="group"
              >
                <div
                  className={styles.selectGroupLabel}
                  data-gs-el="groupLabel"
                  role="presentation"
                >
                  {group.label}
                </div>
                {group.options.map((option, optionIndex) =>
                  renderSingleOption(option, optionIndex, groupIndex)
                )}
              </div>
            ))
          : /* Render without groups */
            filteredOptions.map((option, index) =>
              renderSingleOption(option, index)
            )}
      </div>
    );
  };

  // Render with label/error/helper
  if (label || error || helperText) {
    return (
      <div
        ref={ref}
        className={containerClasses}
        data-gs="GSSelect"
        data-gs-el="root"
        data-gs-size={size}
        data-gs-variant={variant}
        data-gs-color={color}
        data-gs-width={widthMode}
        data-gs-state={componentState}
        data-gs-has-value={hasAnyValue ? "true" : undefined}
        data-gs-disabled={disabled ? "true" : undefined}
        data-gs-loading={loading ? "true" : undefined}
        data-gs-debug={debug ? "true" : undefined}
      >
        {label && (
          <div className={styles.selectLabelContainer} data-gs-el="labelContainer">
            <label
              htmlFor={baseId}
              id={labelId}
              className={clsx(styles.selectLabel, labelClassName, {
                [styles.selectLabelRequired]: required,
              })}
              data-gs-el="label"
            >
              {label}
            </label>
            {helperText && (
              <GSTooltip
                content={helperText}
                placement="top"
                trigger="hover"
                enterDelay={200}
              >
                <span
                  className={styles.selectHelperIcon}
                  aria-label={t('aria.helperText')}
                  role="button"
                  tabIndex={0}
                >
                  <GSIcon name="help-circle" size="sm" />
                </span>
              </GSTooltip>
            )}
          </div>
        )}

        <div className={styles.selectWrapper} data-gs-el="wrapper">
          <div className={styles.selectTriggerWrapper} data-gs-el="triggerWrapper">
          {renderTrigger()}
            {/* Clear Button (OUTSIDE - before validation) */}
            {clearButtonOutside && renderClearButton()}
            {/* Validation Icon (OUTSIDE - after clear, before loading) */}
            {validationIconOutside && renderValidationIcon()}
            {/* Loading Spinner (OUTSIDE - after trigger) */}
            {loading && loadingPosition === 'outside' && renderLoadingSpinner()}
          </div>
          {renderDropdown()}
        </div>

      </div>
    );
  }

  // Render without label
  return (
    <div
      ref={ref}
      className={containerClasses}
      data-gs="GSSelect"
      data-gs-el="root"
      data-gs-size={size}
      data-gs-variant={variant}
      data-gs-color={color}
      data-gs-width={widthMode}
      data-gs-state={componentState}
      data-gs-has-value={hasAnyValue ? "true" : undefined}
      data-gs-disabled={disabled ? "true" : undefined}
      data-gs-loading={loading ? "true" : undefined}
      data-gs-debug={debug ? "true" : undefined}
    >
      <div className={styles.selectWrapper} data-gs-el="wrapper">
        <div className={styles.selectTriggerWrapper} data-gs-el="triggerWrapper">
      {renderTrigger()}
          {/* Clear Button (OUTSIDE - before validation) */}
          {clearButtonOutside && renderClearButton()}
          {/* Validation Icon (OUTSIDE - after clear, before loading) */}
          {validationIconOutside && renderValidationIcon()}
          {/* Loading Spinner (OUTSIDE - after trigger) */}
          {loading && loadingPosition === 'outside' && renderLoadingSpinner()}
        </div>
      {renderDropdown()}
      </div>
    </div>
  );
};

const GSSelect = forwardRef(GSSelectComponent);
GSSelect.displayName = "GSSelect";

// Icons for the Select component
const ChevronUpDownIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 4.5L6 12L2.5 8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default GSSelect;
