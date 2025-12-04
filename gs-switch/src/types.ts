import React from 'react';

export type GSSwitchSize = 'sm' | 'md' | 'lg';
export type GSSwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface GSSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Controlled checked state */
  checked?: boolean;
  
  /** Default checked state for uncontrolled mode */
  defaultChecked?: boolean;
  
  /** Callback when checked state changes */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /** Color theme for the switch */
  color?: GSSwitchColor;
  
  /** Size of the switch */
  size?: GSSwitchSize;
  
  /** Label for the switch */
  label?: React.ReactNode;
  
  /** Position of the label */
  labelPosition?: 'start' | 'end';
  
  /** Whether the switch is disabled */
  disabled?: boolean;
  
  /** Whether the switch is read-only */
  readOnly?: boolean;
  
  /** Accessibility label */
  ariaLabel?: string;
  
  /** Helper text displayed below the switch */
  helperText?: React.ReactNode;
  
  /** Error message */
  error?: string;
  
  /** Whether to show loading state */
  loading?: boolean;
  
  /** Enable debug mode for development */
  debug?: boolean;
  
  /** Enable ripple visual effect on click */
  ripple?: boolean;
  
  /** Custom icon for checked state */
  checkedIcon?: React.ReactNode;
  
  /** Custom icon for unchecked state */
  uncheckedIcon?: React.ReactNode;
}

