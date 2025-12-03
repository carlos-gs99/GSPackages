import React from 'react';

export type GSTabsVariant = 'solid' | 'soft' | 'outlined' | 'plain';
export type GSTabsColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSTabsSize = 'sm' | 'md' | 'lg';
export type GSTabsOrientation = 'horizontal' | 'vertical';

export interface GSTabItem {
  /** Unique identifier */
  id: string;
  
  /** Tab label */
  label: React.ReactNode;
  
  /** Tab content/panel */
  content: React.ReactNode;
  
  /** Optional icon */
  icon?: React.ReactNode;
  
  /** Disabled state */
  disabled?: boolean;
}

export interface GSTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of tabs */
  tabs: GSTabItem[];
  
  /** Default active tab (uncontrolled) */
  defaultValue?: string;
  
  /** Active tab (controlled) */
  value?: string;
  
  /** Change handler */
  onValueChange?: (value: string) => void;
  
  /** Orientation */
  orientation?: GSTabsOrientation;
  
  /** Visual variant */
  variant?: GSTabsVariant;
  
  /** Size */
  size?: GSTabsSize;
  
  /** Color theme */
  color?: GSTabsColor;
  
  /** Full width tabs */
  fullWidth?: boolean;
  
  /** Keep unmounted panels in DOM */
  keepMounted?: boolean;
  
  /** Debug mode */
  debug?: boolean;
  
  /** ARIA label */
  ariaLabel?: string;
  
  /** Tab list class */
  tabListClassName?: string;
  
  /** Tab panel class */
  tabPanelClassName?: string;
}

export type GSTabsRef = HTMLDivElement;

