import React from 'react';

export type GSRadioSize = 'sm' | 'md' | 'lg';
export type GSRadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSRadioVariant = 'outlined' | 'soft' | 'solid' | 'plain';

export interface GSRadioProps {
  /** Value for the radio button */
  value: string | number;

  /** Whether the radio is checked (controlled mode) */
  checked?: boolean;

  /** Default checked state for uncontrolled mode */
  defaultChecked?: boolean;

  /** Callback when radio state changes */
  onChange?: (value: string | number) => void;

  /** Label text or React element */
  label?: React.ReactNode;

  /** Error message */
  error?: string;

  /** Helper text */
  helperText?: string;

  /** Whether the field is required */
  required?: boolean;

  /** Size variant */
  size?: GSRadioSize;

  /** Color theme */
  color?: GSRadioColor;

  /** Visual variant */
  variant?: GSRadioVariant;

  /** Whether the radio is disabled */
  disabled?: boolean;

  /** Whether the radio is in loading state */
  loading?: boolean;

  /** Whether the radio is read-only */
  readOnly?: boolean;

  /** Enable ripple effect on click */
  ripple?: boolean;

  /** Custom CSS class for the root element */
  className?: string;

  /** Custom CSS class for the radio element */
  radioClassName?: string;

  /** Custom ID for the radio element */
  id?: string;

  /** Name attribute for form grouping */
  name?: string;

  /** Debug mode configuration */
  debug?: boolean;
}

export interface GSRadioGroupProps {
  /** Selected value (controlled) */
  value?: string | number;
  
  /** Default value (uncontrolled) */
  defaultValue?: string | number;
  
  /** Change handler */
  onChange?: (value: string | number) => void;
  
  /** Group name */
  name?: string;
  
  /** Radio options (alternative to children) */
  options?: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
    default?: boolean;
  }>;
  
  /** Group label */
  label?: string;
  
  /** Error message */
  error?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Required field */
  required?: boolean;
  
  /** Read-only state */
  readOnly?: boolean;
  
  /** Size for all radios */
  size?: GSRadioSize;
  
  /** Variant for all radios */
  variant?: GSRadioVariant;
  
  /** Color for all radios */
  color?: GSRadioColor;
  
  /** Ripple for all radios */
  ripple?: boolean;
  
  /** Custom class */
  className?: string;
  
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  
  /** Debug mode */
  debug?: boolean;
  
  /** Children (GSRadio components) */
  children?: React.ReactNode;
}

