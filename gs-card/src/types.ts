import React from 'react';

export type GSCardVariant = 'default' | 'outlined' | 'soft' | 'solid' | 'plain';
export type GSCardColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSCardSize = 'sm' | 'md' | 'lg';
export type GSCardImagePosition = 'top' | 'left' | 'right';

export interface GSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: GSCardVariant;
  color?: GSCardColor;
  size?: GSCardSize;
  
  /** Make card collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  
  /** Show loading state */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  
  /** Make card interactive (hover effects) */
  interactive?: boolean;
  
  /** Card image */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Image position */
  imagePosition?: GSCardImagePosition;
  
  debug?: boolean;
}

export interface GSCardImageProps {
  src: string;
  alt?: string;
  position?: GSCardImagePosition;
  className?: string;
}
