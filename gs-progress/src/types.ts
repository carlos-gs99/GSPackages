import React from 'react';

export type GSProgressSize = 'sm' | 'md' | 'lg';
export type GSProgressVariant = 'solid' | 'soft' | 'outlined' | 'plain';
export type GSProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface GSProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value */
  value?: number;
  
  /** Maximum value */
  max?: number;
  
  /** Size variant */
  size?: GSProgressSize;
  
  /** Visual variant */
  variant?: GSProgressVariant;
  
  /** Color theme */
  color?: GSProgressColor;
  
  /** Bar thickness */
  thickness?: number;
  
  /** Show label */
  showLabel?: boolean;
  
  /** Custom label */
  label?: string;
  
  /** Determinate mode */
  determinate?: boolean;
  
  /** Debug mode */
  debug?: boolean;
}
