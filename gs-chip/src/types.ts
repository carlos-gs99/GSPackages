import React from 'react';

export const GS_CHIP_VARIANTS = ['soft', 'outlined', 'solid', 'plain'] as const;
export type GSChipVariant = (typeof GS_CHIP_VARIANTS)[number];

export const GS_CHIP_COLORS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
export type GSChipColor = (typeof GS_CHIP_COLORS)[number];

export const GS_CHIP_SIZES = ['sm', 'md', 'lg'] as const;
export type GSChipSize = (typeof GS_CHIP_SIZES)[number];

/**
 * GSChip component props
 */
export interface GSChipProps extends React.HTMLAttributes<HTMLElement> {
  /** Element type to render as (span, button, a, etc) */
  as?: React.ElementType;
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
export interface GSChipRef {
  /** Focus the chip */
  focus: () => void;
  
  /** Trigger chip removal (calls onDelete) */
  remove: () => void;
}

