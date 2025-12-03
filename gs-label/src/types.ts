import React from 'react';

export const GS_LABEL_SIZES = ['sm', 'md', 'lg'] as const;
export type GSLabelSize = (typeof GS_LABEL_SIZES)[number];

export interface GSLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Label content */
  children?: React.ReactNode;
  
  /** Show required indicator (*) */
  required?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Reserved mode (invisible but takes space) */
  reserved?: boolean;
  
  /** Helper text with info icon */
  helperText?: string;
  
  /** Label size */
  size?: GSLabelSize;
  
  /** Custom color override */
  color?: string;
  
  /** Enable debug mode */
  debug?: boolean;
  
  /** Custom aria-label */
  ariaLabel?: string;
}

export type GSLabelRef = HTMLLabelElement;

