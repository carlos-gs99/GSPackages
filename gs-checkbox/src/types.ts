import React from 'react';

export type GSCheckboxSize = 'sm' | 'md' | 'lg';
export type GSCheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSCheckboxVariant = 'outlined' | 'soft' | 'solid' | 'plain';

export interface GSCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Controlled checked state */
  checked?: boolean;
  
  /** Value for group usage */
  value?: string;
  
  /** Change handler */
  onChange?: (checked: boolean) => void;
  
  /** Default checked (uncontrolled) */
  defaultChecked?: boolean;
  
  /** Label text/element */
  label?: React.ReactNode;
  
  /** Error message */
  error?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Description */
  description?: React.ReactNode;
  
  /** Required field */
  required?: boolean;
  
  /** Size variant */
  size?: GSCheckboxSize;
  
  /** Color theme */
  color?: GSCheckboxColor;
  
  /** Visual variant */
  variant?: GSCheckboxVariant;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Read-only state */
  readOnly?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Indeterminate state */
  indeterminate?: boolean;
  
  /** Enable ripple effect */
  ripple?: boolean;
  
  /** Debug mode */
  debug?: boolean;
  
  /** Custom checked icon */
  checkedIcon?: React.ReactNode;
  
  /** Custom unchecked icon */
  uncheckedIcon?: React.ReactNode;
  
  /** Custom indeterminate icon */
  indeterminateIcon?: React.ReactNode;
  
  /** Checkbox container class */
  checkboxClassName?: string;
}

export interface GSCheckboxGroupProps {
  /** Selected values */
  value?: string[];
  
  /** Default values (uncontrolled) */
  defaultValue?: string[];
  
  /** Change handler */
  onChange?: (value: string[]) => void;
  
  /** Group name */
  name?: string;
  
  /** Disabled */
  disabled?: boolean;
  
  /** Read-only */
  readOnly?: boolean;
  
  /** Error */
  error?: string;
  
  /** Helper text */
  helperText?: React.ReactNode;
  
  /** Required */
  required?: boolean;
  
  /** Label */
  label?: React.ReactNode;
  
  /** Size for all children */
  size?: GSCheckboxSize;
  
  /** Color for all children */
  color?: GSCheckboxColor;
  
  /** Variant for all children */
  variant?: GSCheckboxVariant;
  
  /** Ripple for all children */
  ripple?: boolean;
  
  /** Loading for all children */
  loading?: boolean;
  
  /** Debug for all children */
  debug?: boolean;
  
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  
  /** Custom class */
  className?: string;
  
  /** Children */
  children: React.ReactNode;
}

