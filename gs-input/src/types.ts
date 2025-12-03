import React from 'react';

export type GSInputSize = 'sm' | 'md' | 'lg';
export type GSInputVariant = 'outlined' | 'filled' | 'soft' | 'solid' | 'plain';
export type GSInputColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type ValidationState = 'success' | 'error' | 'warning' | null;

export interface GSInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  /** Label text */
  label?: string;
  
  /** Error message */
  error?: string;
  
  /** Helper text */
  helperText?: string;
  
  /** Required field */
  required?: boolean;
  
  /** Loading state */
  loading?: boolean;
  
  /** Size variant */
  size?: GSInputSize;
  
  /** Visual variant */
  variant?: GSInputVariant;
  
  /** Color theme */
  color?: GSInputColor;
  
  /** Start decorator (icon/content) */
  startDecorator?: React.ReactNode;
  
  /** End decorator (icon/content) */
  endDecorator?: React.ReactNode;
  
  /** Show character counter */
  showCharCount?: boolean;
  
  /** Show clear button */
  clearable?: boolean;
  
  /** Clear callback */
  onClear?: () => void;
  
  /** Toggle password visibility */
  showPasswordToggle?: boolean;
  
  /** Validation state */
  validationState?: ValidationState;
  
  /** Show validation icon */
  showValidationIcon?: boolean;
  
  /** Prefix text */
  prefix?: string;
  
  /** Suffix text */
  suffix?: string;
  
  /** Input class name */
  inputClassName?: string;
  
  /** Label class name */
  labelClassName?: string;
  
  /** Wrapper class name */
  wrapperClassName?: string;
  
  /** Debug mode */
  debug?: boolean;
}

