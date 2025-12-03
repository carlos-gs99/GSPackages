import type React from 'react';

export type GSLoadingMode = 'fullscreen' | 'viewport' | 'section';
export type GSLoadingVariant = 'surface' | 'transparent' | 'inset';
export type GSLoadingAlignment = 'center' | 'start';

export interface GSLoadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Display mode (fullscreen, viewport, section) */
  mode?: GSLoadingMode;
  
  /** Visual variant for background */
  variant?: GSLoadingVariant;
  
  /** Title content */
  title?: React.ReactNode;
  
  /** Description text */
  description?: React.ReactNode;
  
  /** Short message */
  message?: React.ReactNode;
  
  /** Custom illustration slot */
  illustration?: React.ReactNode;
  
  /** Actions slot (buttons, etc) */
  actions?: React.ReactNode;
  
  /** Content alignment */
  align?: GSLoadingAlignment;
  
  /** Show semi-transparent backdrop */
  showBackdrop?: boolean;
  
  /** Spinner color */
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg';
  
  /** Additional spinner props */
  spinnerProps?: Partial<{
    size: 'sm' | 'md' | 'lg';
    color: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
    variant: 'solid' | 'soft' | 'outlined' | 'plain';
    thickness: number;
    className: string;
    message: string;
  }>;
  
  /** Use default i18n texts */
  showText?: boolean;
  
  /** Custom aria-label */
  ariaLabel?: string;
  
  /** Aria-live behavior */
  ariaLive?: 'off' | 'polite' | 'assertive';
  
  /** Auto-focus on mount */
  focusOnMount?: boolean;
  
  /** Enable debug mode */
  debug?: boolean;
}

