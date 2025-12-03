import React from 'react';

export type GSCardVariant = 'default' | 'outlined' | 'soft' | 'solid' | 'plain';
export type GSCardColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSCardSize = 'sm' | 'md' | 'lg';

export interface GSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: GSCardVariant;
  color?: GSCardColor;
  size?: GSCardSize;
  debug?: boolean;
}
