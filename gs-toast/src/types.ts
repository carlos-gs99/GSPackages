import React from 'react';

export type GSToastVariant = 'solid' | 'outlined' | 'soft' | 'plain';
export type GSToastColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSToastSize = 'sm' | 'md' | 'lg';
export type GSToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface GSToastProps {
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
  variant?: GSToastVariant;
  color?: GSToastColor;
  size?: GSToastSize;
  position?: GSToastPosition;
  showCloseButton?: boolean;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
  debug?: boolean;
}

