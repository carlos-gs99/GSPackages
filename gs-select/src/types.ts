// Local type definitions (no external lib/types)
export type GSColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSSize = 'sm' | 'md' | 'lg';

/**
 * Option structure for GSSelect
 * @public
 */
export interface GSSelectOption {
  /** Value of the option */
  value: string | number;
  /** Display label */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional icon or custom content */
  icon?: React.ReactNode;
  /** Optional description */
  description?: string;
}

/**
 * Option group structure for GSSelect (future feature)
 * @public
 */
export interface GSSelectOptionGroup {
  /** Group label */
  label: string;
  /** Options in this group */
  options: GSSelectOption[];
}

/**
 * Visual variant types for GSSelect
 * @public
 */
export type GSSelectVariant = 'outlined' | 'filled' | 'standard' | 'soft' | 'solid' | 'plain';

/**
 * Validation state types for GSSelect
 * @public
 */
export type GSSelectValidationState = 'success' | 'error' | 'warning' | null;

/**
 * Props for GSSelect component
 * @public
 */
export interface GSSelectProps {
  /** Array of options to display in the dropdown */
  options?: GSSelectOption[];
  
  /** Array of option groups (alternative to options) - with sticky headers */
  optionGroups?: GSSelectOptionGroup[];
  
  /** Controlled value (single or multiple) */
  value?: string | number | (string | number)[];
  
  /** Change handler - receives the selected value(s) */
  onChange?: (value: string | number | (string | number)[]) => void;
  
  /** Default value for uncontrolled mode */
  defaultValue?: string | number | null;
  
  /** Label text displayed above the select */
  label?: string;
  
  /** Error message displayed below the select */
  error?: string;
  
  /** Helper text displayed below the select when no error */
  helperText?: string;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Size variant */
  size?: GSSize;
  
  /** Visual variant */
  variant?: GSSelectVariant;
  
  /** Color theme for focus state */
  color?: GSColor;
  
  /** Placeholder text when no option is selected */
  placeholder?: string;
  
  /** Whether the select is disabled */
  disabled?: boolean;
  
  /** Whether the select is in loading state */
  loading?: boolean;
  
  /** Whether to show a clear button when value is selected */
  clearable?: boolean;
  
  /** Whether to show clear button outside the select (default: false - shows inside) */
  clearButtonOutside?: boolean;
  
  /** Callback when clear button is clicked */
  onClear?: () => void;
  
  /** Validation state (success, warning, error) */
  validationState?: GSSelectValidationState;
  
  /** Whether to show validation icon */
  showValidationIcon?: boolean;
  
  /** Whether to show validation icon outside the select (default: false - shows inside before chevron) */
  validationIconOutside?: boolean;
  
  /** Where to show loading spinner: 'inside' (replaces chevron) or 'outside' (after select) */
  loadingPosition?: 'inside' | 'outside';
  
  /** Enable search/filter functionality */
  searchable?: boolean;
  
  /** Placeholder for search input */
  searchPlaceholder?: string;
  
  /** Custom search function */
  onSearch?: (query: string) => void;
  
  /** Enable async loading of options */
  async?: boolean;
  
  /** Function to load options asynchronously */
  loadOptions?: (query: string) => Promise<GSSelectOption[]>;
  
  /** Debounce time for async loading (ms) */
  debounceTime?: number;
  
  /** Custom loading message */
  loadingMessage?: string;
  
  /** Enable multi-select mode */
  multiple?: boolean;
  
  /** Maximum number of selections (for multiple mode) */
  maxSelections?: number;
  
  /** Additional CSS classes for container */
  className?: string;
  
  /** Additional CSS classes for select trigger */
  selectClassName?: string;
  
  /** Additional CSS classes for label */
  labelClassName?: string;
  
  /** Additional CSS classes for dropdown */
  dropdownClassName?: string;
  
  /** HTML id attribute */
  id?: string;
  
  /** HTML name attribute */
  name?: string;
  
  /** Whether to take full width of container */
  fullWidth?: boolean;
  
  /** Width behavior: 'min' = minimum width (default), 'auto' = fit content (150px min), 'compact' = fit content (no min), 'full' = 100% width */
  widthMode?: 'min' | 'auto' | 'compact' | 'full';
  
  /** Maximum height for dropdown */
  maxHeight?: number | string;
  
  /** Whether dropdown is open (controlled) */
  open?: boolean;
  
  /** Callback when dropdown opens/closes */
  onOpenChange?: (open: boolean) => void;
  
  /** Align dropdown so selected option is aligned with trigger (BaseUI style) */
  alignSelectedToTrigger?: boolean;
  
  /** Start decorator (icon/content) inside trigger */
  startDecorator?: React.ReactNode;
  
  /** End decorator (icon/content) inside trigger */
  endDecorator?: React.ReactNode;
  
  /** Custom render function for options */
  renderOption?: (option: GSSelectOption, selected: boolean) => React.ReactNode;
  
  /** Custom render function for selected value */
  renderValue?: (option: GSSelectOption | null) => React.ReactNode;
  
  /** Empty state message when no options */
  emptyMessage?: string;
  
  /** Debug mode configuration */
  debug?: boolean;
  
  // Accessibility props
  /** ARIA label override */
  ariaLabel?: string;
  
  /** ARIA labelledBy id reference */
  ariaLabelledBy?: string;
  
  /** ARIA describedBy id reference */
  ariaDescribedBy?: string;
  
  /** ARIA required attribute */
  ariaRequired?: boolean;
}

/**
 * Internal state for GSSelect
 * @internal
 */
export interface GSSelectState {
  isOpen: boolean;
  searchQuery: string;
  selectedValues: (string | number)[];
  focusedIndex: number;
}

