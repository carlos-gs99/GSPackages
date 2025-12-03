import React from 'react';

export type GSSkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';
export type GSSkeletonSize = 'sm' | 'md' | 'lg';
export type GSSkeletonAnimation = 'pulse' | 'wave' | false;
export type GSSkeletonGroupDirection = 'horizontal' | 'vertical';

export interface GSSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls whether to show skeleton or children */
  loading: boolean;
  
  /** Real content (shown when loading=false) */
  children?: React.ReactNode;
  
  /** Visual variant */
  variant?: GSSkeletonVariant;
  
  /** Size preset */
  size?: GSSkeletonSize;
  
  /** Custom width */
  width?: string | number;
  
  /** Custom height */
  height?: string | number;
  
  /** Animation type */
  animation?: GSSkeletonAnimation;
  
  /** Number of lines (for multiline text) */
  lines?: number;
  
  /** Additional CSS class */
  className?: string;
  
  /** Inline styles */
  style?: React.CSSProperties;
}

export interface GSSkeletonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Children (multiple GSSkeleton) */
  children: React.ReactNode;
  
  /** Layout direction */
  direction?: GSSkeletonGroupDirection;
  
  /** Gap between skeletons */
  gap?: 'sm' | 'md' | 'lg' | string;
  
  /** Additional CSS class */
  className?: string;
}

