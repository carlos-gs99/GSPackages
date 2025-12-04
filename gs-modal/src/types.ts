import React from 'react';

export type GSModalSize = 'sm' | 'md' | 'lg' | 'xl';
export type GSModalVariant = 'solid' | 'outlined' | 'soft' | 'plain';
export type GSModalColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSModalAnimation = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none';
export type GSModalMode = 'default' | 'confirm';

export interface GSModalProps {
  /** Modal content */
  children?: React.ReactNode;
  
  /** Show modal (controlled) */
  open?: boolean;
  
  /** Alternative to open */
  show?: boolean;
  
  /** Close handler */
  onClose?: () => void;
  
  /** Alternative to onClose */
  onHide?: () => void;
  
  /** Modal size */
  size?: GSModalSize;
  
  /** Center modal vertically */
  centered?: boolean;
  
  /** Show backdrop */
  backdrop?: boolean | 'static';
  
  /** Close on ESC key */
  keyboard?: boolean;
  
  /** Close on ESC (alternative) */
  closeOnEscape?: boolean;
  
  /** Restore focus on close */
  restoreFocus?: boolean;
  
  /** Visual variant */
  variant?: GSModalVariant;
  
  /** Color theme */
  color?: GSModalColor;
  
  /** Custom class */
  className?: string;
  
  /** ARIA label */
  ariaLabel?: string;
  
  /** ARIA labelledby */
  ariaLabelledBy?: string;
  
  /** ARIA describedby */
  ariaDescribedBy?: string;
  
  /** Debug mode */
  debug?: boolean;
  
  /** Animation type */
  animation?: GSModalAnimation;
  
  /** Animation duration in ms */
  animationDuration?: number;
  
  /** Modal mode (default or confirm) */
  mode?: GSModalMode;
  
  /** Confirm button text (for confirm mode) */
  confirmText?: string;
  
  /** Cancel button text (for confirm mode) */
  cancelText?: string;
  
  /** Confirm button callback */
  onConfirm?: () => void;
  
  /** Cancel button callback */
  onCancel?: () => void;
  
  /** Confirm button variant */
  confirmVariant?: GSModalVariant;
  
  /** Confirm button color */
  confirmColor?: GSModalColor;
  
  /** Cancel button variant */
  cancelVariant?: GSModalVariant;
  
  /** Cancel button color */
  cancelColor?: GSModalColor;
}

export interface GSModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  closeButton?: boolean;
}

export interface GSModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export interface GSModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface GSModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

