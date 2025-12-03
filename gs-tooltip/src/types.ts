import React from 'react';

export type GSTooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
export type GSTooltipVariant = 'solid' | 'outlined' | 'soft';
export type GSTooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type GSTooltipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSTooltipSize = 'sm' | 'md' | 'lg';

export interface GSTooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: GSTooltipPlacement;
  color?: GSTooltipColor;
  size?: GSTooltipSize;
  variant?: GSTooltipVariant;
  arrow?: boolean;
  trigger?: GSTooltipTrigger | GSTooltipTrigger[];
  enterDelay?: number;
  leaveDelay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  offset?: number;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  maxWidth?: string | number;
  zIndex?: number;
}
