import React from 'react';

export type GSAlertVariant = 'solid' | 'soft' | 'outlined' | 'plain';
export type GSAlertColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface GSAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert content */
  children: React.ReactNode;
  
  /** Visual variant */
  variant?: GSAlertVariant;
  
  /** Color theme */
  color?: GSAlertColor;
  
  /** Show severity icon */
  showIcon?: boolean;
  
  /** Custom icon to override default severity icon */
  icon?: React.ReactNode;
  
  /** Show close button */
  dismissible?: boolean;
  
  /** Close handler */
  onClose?: () => void;
  
  /** Custom close icon */
  closeIcon?: React.ReactNode;
}

