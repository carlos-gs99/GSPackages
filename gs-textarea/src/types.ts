import React from 'react';

export type GSTextAreaSize = 'sm' | 'md' | 'lg';
export type GSTextAreaVariant = 'outlined' | 'filled' | 'soft' | 'solid' | 'plain';
export type GSTextAreaColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type ValidationState = 'success' | 'error' | 'warning' | null;

export interface GSTextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'color'> {
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
  size?: GSTextAreaSize;
  
  /** Visual variant */
  variant?: GSTextAreaVariant;
  
  /** Color theme */
  color?: GSTextAreaColor;
  
  /** Show character counter */
  showCharCount?: boolean;
  
  /** Show word counter */
  showWordCount?: boolean;
  
  /** Show line counter */
  showLineCount?: boolean;
  
  /** Show clear button */
  clearable?: boolean;
  
  /** Clear callback */
  onClear?: () => void;
  
  /** Show copy to clipboard button */
  copyable?: boolean;
  
  /** Validation state */
  validationState?: ValidationState;
  
  /** Show validation icon */
  showValidationIcon?: boolean;
  
  /** Textarea class name */
  textareaClassName?: string;
  
  /** Label class name */
  labelClassName?: string;
  
  /** Wrapper class name */
  wrapperClassName?: string;
  
  /** Debug mode */
  debug?: boolean;
  
  /** Auto-resize based on content */
  autoResize?: boolean;
  
  /** Minimum rows for auto-resize */
  minRows?: number;
  
  /** Maximum rows for auto-resize */
  maxRows?: number;
  
  /** Debounce delay in ms (0 = disabled) */
  debounce?: number;
  
  /** Callback for debounced value changes */
  onDebouncedChange?: (value: string) => void;
  
  /** Floating label (label inside textarea, floats up on focus/value) */
  floatingLabel?: boolean;
}

