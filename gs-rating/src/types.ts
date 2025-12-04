import React from 'react';

export type GSRatingSize = 'sm' | 'md' | 'lg';
export type GSRatingColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface GSRatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value (controlled) */
  value?: number;
  /** Default rating value (uncontrolled) */
  defaultValue?: number;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Maximum number of stars */
  max?: number;
  /** Precision for half-stars (1 = full stars, 0.5 = half stars) */
  precision?: number;
  /** Size variant */
  size?: GSRatingSize;
  /** Color variant */
  color?: GSRatingColor;
  /** Disable interaction */
  disabled?: boolean;
  /** Read-only mode */
  readOnly?: boolean;
  /** Only highlight selected stars (not all up to selected) */
  highlightSelectedOnly?: boolean;
  /** Custom empty star icon */
  emptyIcon?: React.ReactNode;
  /** Custom filled star icon */
  filledIcon?: React.ReactNode;
  /** Debug mode */
  debug?: boolean;
  /** Name for form submission */
  name?: string;
}

