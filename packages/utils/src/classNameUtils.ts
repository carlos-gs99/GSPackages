/**
 * Class Name Utilities - GS Style
 * 
 * Utility functions for building consistent CSS class names across GS components.
 * These utilities eliminate duplication and ensure consistent naming patterns.
 */

import clsx from 'clsx';
import { 
  GSVariant, 
  GSColor, 
  GSSize, 
  GSState,
  GSVariantConfig,
  GSColorConfig,
  GSSizeConfig,
  isGSVariant,
  isGSColor,
  isGSSize,
  isGSState
} from '../lib/types/design';

/**
 * Base class name for GS components
 * Used as prefix for all GS component classes
 */
export const GS_BASE_CLASS = 'gs';

/**
 * Build variant class name for a component
 * @param componentName - Name of the component (e.g., 'btn', 'chip', 'card')
 * @param variant - Variant value
 * @param customConfig - Optional custom variant configuration
 * @returns CSS class name for the variant
 */
export function buildVariantClass(
  componentName: string,
  variant: GSVariant,
  customConfig?: Partial<GSVariantConfig>
): string {
  const config: GSVariantConfig = {
    solid: `${GS_BASE_CLASS}-${componentName}--solid`,
    outlined: `${GS_BASE_CLASS}-${componentName}--outlined`,
    soft: `${GS_BASE_CLASS}-${componentName}--soft`,
    plain: `${GS_BASE_CLASS}-${componentName}--plain`,
    ...customConfig,
  };

  return config[variant];
}

/**
 * Build color class name for a component
 * @param componentName - Name of the component (e.g., 'btn', 'chip', 'card')
 * @param color - Color value
 * @param customConfig - Optional custom color configuration
 * @returns CSS class name for the color
 */
export function buildColorClass(
  componentName: string,
  color: GSColor,
  customConfig?: Partial<GSColorConfig>
): string {
  const config: GSColorConfig = {
    primary: `${GS_BASE_CLASS}-${componentName}--primary`,
    secondary: `${GS_BASE_CLASS}-${componentName}--secondary`,
    success: `${GS_BASE_CLASS}-${componentName}--success`,
    warning: `${GS_BASE_CLASS}-${componentName}--warning`,
    danger: `${GS_BASE_CLASS}-${componentName}--danger`,
    info: `${GS_BASE_CLASS}-${componentName}--info`,
    neutral: `${GS_BASE_CLASS}-${componentName}--neutral`,
    ...customConfig,
  };

  return config[color];
}

/**
 * Build size class name for a component
 * @param componentName - Name of the component (e.g., 'btn', 'chip', 'card')
 * @param size - Size value
 * @param customConfig - Optional custom size configuration
 * @returns CSS class name for the size
 */
export function buildSizeClass(
  componentName: string,
  size: GSSize,
  customConfig?: Partial<GSSizeConfig>
): string {
  const config: GSSizeConfig = {
    xs: `${GS_BASE_CLASS}-${componentName}--xs`,
    sm: `${GS_BASE_CLASS}-${componentName}--sm`,
    md: `${GS_BASE_CLASS}-${componentName}--md`,
    lg: `${GS_BASE_CLASS}-${componentName}--lg`,
    ...customConfig,
  };

  return config[size];
}

/**
 * Build state class name for a component
 * @param componentName - Name of the component (e.g., 'btn', 'chip', 'card')
 * @param state - State value
 * @returns CSS class name for the state
 */
export function buildStateClass(componentName: string, state: GSState): string {
  return `${GS_BASE_CLASS}-${componentName}--${state}`;
}

/**
 * Build complete class name for a GS component
 * Combines base class with variant, color, size, and state classes
 * @param componentName - Name of the component (e.g., 'btn', 'chip', 'card')
 * @param options - Component styling options
 * @param customConfigs - Optional custom configurations
 * @returns Complete CSS class name string
 */
export function buildGSClassName(
  componentName: string,
  options: {
    variant?: GSVariant;
    color?: GSColor;
    size?: GSSize;
    state?: GSState;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
    readOnly?: boolean;
    className?: string;
  },
  customConfigs?: {
    variant?: Partial<GSVariantConfig>;
    color?: Partial<GSColorConfig>;
    size?: Partial<GSSizeConfig>;
  }
): string {
  const {
    variant,
    color,
    size,
    state,
    fullWidth,
    loading,
    disabled,
    error,
    readOnly,
    className,
  } = options;

  const classes = [
    // Base component class
    `${GS_BASE_CLASS}-${componentName}`,
    
    // Variant class
    variant && buildVariantClass(componentName, variant, customConfigs?.variant),
    
    // Color class
    color && buildColorClass(componentName, color, customConfigs?.color),
    
    // Size class
    size && buildSizeClass(componentName, size, customConfigs?.size),
    
    // State classes
    state && buildStateClass(componentName, state),
    
    // Boolean state classes
    fullWidth && `${GS_BASE_CLASS}-w-full`,
    loading && `${GS_BASE_CLASS}-${componentName}--loading`,
    disabled && `${GS_BASE_CLASS}-${componentName}--disabled`,
    error && `${GS_BASE_CLASS}-${componentName}--error`,
    readOnly && `${GS_BASE_CLASS}-${componentName}--readonly`,
    
    // Custom className
    className,
  ].filter(Boolean);

  return clsx(...classes);
}

/**
 * Build class name for component modifiers
 * @param componentName - Name of the component
 * @param modifier - Modifier name (e.g., 'icon', 'content', 'delete')
 * @param variant - Optional variant for the modifier
 * @returns CSS class name for the modifier
 */
export function buildModifierClass(
  componentName: string,
  modifier: string,
  variant?: string
): string {
  const baseClass = `${GS_BASE_CLASS}-${componentName}__${modifier}`;
  return variant ? `${baseClass}--${variant}` : baseClass;
}

/**
 * Build class name for component elements
 * @param componentName - Name of the component
 * @param element - Element name (e.g., 'header', 'body', 'footer')
 * @param variant - Optional variant for the element
 * @returns CSS class name for the element
 */
export function buildElementClass(
  componentName: string,
  element: string,
  variant?: string
): string {
  const baseClass = `${GS_BASE_CLASS}-${componentName}__${element}`;
  return variant ? `${baseClass}--${variant}` : baseClass;
}

/**
 * Validate and normalize component props
 * Ensures props are valid GS values and provides defaults
 * @param props - Component props to validate
 * @param defaults - Default values to use
 * @returns Normalized props with valid values
 */
export function normalizeGSProps<T extends Record<string, unknown>>(
  props: T,
  defaults: Partial<T> = {}
): T {
  const normalized = { ...defaults, ...props };
  const normalizedRecord = normalized as Record<string, unknown>;
  
  if ('variant' in normalizedRecord) {
    const value = normalizedRecord.variant;
    if (value && typeof value === 'string' && !isGSVariant(value)) {
      console.warn(`Invalid variant: ${value}. Using default.`);
      normalizedRecord.variant = (defaults.variant as GSVariant) ?? 'soft';
    }
  }
  
  if ('color' in normalizedRecord) {
    const value = normalizedRecord.color;
    if (value && typeof value === 'string' && !isGSColor(value)) {
      console.warn(`Invalid color: ${value}. Using default.`);
      normalizedRecord.color = defaults.color ?? 'primary';
    }
  }
  
  if ('size' in normalizedRecord) {
    const value = normalizedRecord.size;
    if (value && typeof value === 'string' && !isGSSize(value)) {
      console.warn(`Invalid size: ${value}. Using default.`);
      normalizedRecord.size = defaults.size ?? 'md';
    }
  }
  
  if ('state' in normalizedRecord) {
    const value = normalizedRecord.state;
    if (value && typeof value === 'string' && !isGSState(value)) {
      console.warn(`Invalid state: ${value}. Using default.`);
      normalizedRecord.state = defaults.state ?? 'default';
    }
  }
  
  return normalized;
}

/**
 * Common class name patterns for GS components
 * Pre-defined patterns for common component structures
 */
export const GS_CLASS_PATTERNS = {
  // Button patterns
  button: {
    base: '[data-gs="GSButton"]',
    icon: '[data-gs-el="start-icon"], [data-gs-el="end-icon"]',
    content: '[data-gs-el="content"], [data-gs-el="label"]',
    loading: '[data-gs="GSButton"][data-loading="true"]',
  },
  
  // Chip patterns
  chip: {
    base: '[data-gs="GSChip"]',
    icon: '[data-gs-el="start-icon"], [data-gs-el="end-icon"]',
    content: '[data-gs-el="content"]',
    delete: '[data-gs-el="delete-button"]',
    deleteIcon: '[data-gs-el="delete-button"] svg',
  },
  
  // Card patterns
  card: {
    base: 'gs-card',
    header: 'gs-card__header',
    body: 'gs-card__body',
    footer: 'gs-card__footer',
  },
  
  // Input patterns
  input: {
    base: 'gs-input',
    label: 'gs-input__label',
    field: 'gs-input__field',
    helper: 'gs-input__helper',
    error: 'gs-input__error',
  },
  
  // Table patterns
  table: {
    base: 'gs-table',
    header: 'gs-table__header',
    body: 'gs-table__body',
    cell: 'gs-table__cell',
    row: 'gs-table__row',
  },
} as const;
