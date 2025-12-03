import type React from 'react';

export type GSButtonVariant = 'solid' | 'outlined' | 'soft' | 'alternate' | 'plain';
export type GSButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSButtonSize = 'sm' | 'md' | 'lg';
export type GSButtonLoadingPosition = 'start' | 'end';
export type GSButtonRounded = boolean | 'full';

export const GS_BUTTON_VARIANTS: readonly GSButtonVariant[] = ['solid', 'outlined', 'soft', 'alternate', 'plain'];
export const GS_BUTTON_COLORS: readonly GSButtonColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];
export const GS_BUTTON_SIZES: readonly GSButtonSize[] = ['sm', 'md', 'lg'];

export interface GSButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Button visual variant */
  variant?: GSButtonVariant;
  
  /** Color semantic palette */
  color?: GSButtonColor;
  
  /** Size scale */
  size?: GSButtonSize;
  
  /** Expand to full width */
  fullWidth?: boolean;
  
  /** Loading state (blocks interactions, shows spinner) */
  loading?: boolean;
  
  /** Spinner position during loading */
  loadingPosition?: GSButtonLoadingPosition;
  
  /** Icon before content */
  startIcon?: React.ReactNode;
  
  /** Icon after content */
  endIcon?: React.ReactNode;
  
  /** Enable debug mode */
  debug?: boolean;
  
  /** Enable ripple effect on click */
  ripple?: boolean;
  
  /** Rounded style (pill or circular) */
  rounded?: GSButtonRounded;
  
  /** Enable gradient (solid variants only) */
  gradient?: boolean;
  
  /** Alternative aria-label for screen readers */
  ariaLabel?: string;
  
  /** IDs of describing elements */
  ariaDescribedBy?: string;
  
  /** ARIA toggle state */
  ariaPressed?: boolean;
  
  /** ARIA expanded state (dropdowns, accordions) */
  ariaExpanded?: boolean;
  
  /** ID of controlled element */
  ariaControls?: string;
  
  /** Indicates associated popup */
  ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  
  /** Current state (e.g., active page) */
  ariaCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  
  /** Keyboard shortcut hint announced to screen readers */
  keyboardShortcut?: string;
}

