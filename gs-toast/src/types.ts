import React from 'react';

export type GSToastVariant = 'solid' | 'outlined' | 'soft' | 'plain';
export type GSToastColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSToastSize = 'sm' | 'md' | 'lg';
export type GSToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface GSToastProps {
  /** Toast message content */
  children: React.ReactNode;
  /** Whether the toast is visible */
  open?: boolean;
  /** Callback when toast is closed */
  onClose?: () => void;
  /** Auto-hide duration in ms (0 = no auto-hide) */
  autoHideDuration?: number;
  /** Visual variant */
  variant?: GSToastVariant;
  /** Color theme (also determines default icon) */
  color?: GSToastColor;
  /** Size variant */
  size?: GSToastSize;
  /** Position on screen */
  position?: GSToastPosition;
  /** Show close button */
  showCloseButton?: boolean;
  /** Show animated progress bar (countdown) */
  showProgressBar?: boolean;
  /** Show severity icon (auto-detected from color or custom via icon prop) */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional title above message */
  title?: string;
  /** Custom icon (overrides auto-detected severity icon) */
  icon?: React.ReactNode;
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Enable debug mode */
  debug?: boolean;
}

