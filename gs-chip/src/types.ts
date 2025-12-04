import React from 'react';

export const GS_CHIP_VARIANTS = ['soft', 'outlined', 'solid', 'plain'] as const;
export type GSChipVariant = (typeof GS_CHIP_VARIANTS)[number];

export const GS_CHIP_COLORS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
export type GSChipColor = (typeof GS_CHIP_COLORS)[number];

export const GS_CHIP_SIZES = ['sm', 'md', 'lg'] as const;
export type GSChipSize = (typeof GS_CHIP_SIZES)[number];

/**
 * Base props for GSChip (non-polymorphic)
 */
export interface GSChipCommonProps {
  /** Chip content */
  children: React.ReactNode;
  
  /** Visual variant */
  variant?: GSChipVariant;
  
  /** Color using GS tokens */
  color?: GSChipColor;
  
  /** Chip size */
  size?: GSChipSize;
  
  /** Show delete button */
  deletable?: boolean;
  
  /** Callback when chip is deleted */
  onDelete?: () => void;
  
  /** Icon at the start */
  startIcon?: React.ReactNode;
  
  /** Icon at the end */
  endIcon?: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom aria-label */
  ariaLabel?: string;
  
  /** Custom aria-label for delete button */
  deleteButtonAriaLabel?: string;
  
  /** Enable debug mode */
  debug?: boolean;
}

type PropsToOmit = keyof GSChipCommonProps | 'as' | 'color' | 'size';

/**
 * Polymorphic GSChip props - allows rendering as any element type
 * with full TypeScript support for that element's props
 * 
 * @example
 * ```tsx
 * // As span (default)
 * <GSChip>Default</GSChip>
 * 
 * // As button
 * <GSChip as="button" onClick={handler}>Clickable</GSChip>
 * 
 * // As anchor
 * <GSChip as="a" href="/profile">Link Chip</GSChip>
 * 
 * // As custom component
 * <GSChip as={RouterLink} to="/home">Router Link</GSChip>
 * ```
 */
export type GSChipProps<T extends React.ElementType = 'span'> = GSChipCommonProps & {
  /** Element type to render as (span, button, a, etc) */
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit>;
export interface GSChipRef {
  /** Focus the chip */
  focus: () => void;
  
  /** Trigger chip removal (calls onDelete) */
  remove: () => void;
}

