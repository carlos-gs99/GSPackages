import React from 'react';

export type GSSliderSize = 'sm' | 'md' | 'lg';
export type GSSliderColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface GSSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current slider value (controlled) */
  value?: number;
  /** Default slider value (uncontrolled) */
  defaultValue?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Show marks for steps */
  marks?: boolean;
  /** Show current value */
  showValue?: boolean;
  /** Disable interaction */
  disabled?: boolean;
  /** Color variant */
  color?: GSSliderColor;
  /** Size variant */
  size?: GSSliderSize;
  /** Debug mode */
  debug?: boolean;
  /** Name for form submission */
  name?: string;
}

