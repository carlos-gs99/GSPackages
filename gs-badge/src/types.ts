import React from 'react';

export const GS_BADGE_VARIANTS = ['solid', 'soft', 'outlined', 'plain', 'dot'] as const;
export type GSBadgeVariant = (typeof GS_BADGE_VARIANTS)[number];

export const GS_BADGE_COLORS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
export type GSBadgeColor = (typeof GS_BADGE_COLORS)[number];

export const GS_BADGE_SIZES = ['sm', 'md', 'lg'] as const;
export type GSBadgeSize = (typeof GS_BADGE_SIZES)[number];

export interface GSBadgeAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface GSBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  variant?: GSBadgeVariant;
  color?: GSBadgeColor;
  size?: GSBadgeSize;
  anchorOrigin?: GSBadgeAnchorOrigin;
  badgeInset?: string | { top?: string; right?: string; bottom?: string; left?: string };
  invisible?: boolean;
  showZero?: boolean;
  max?: number;
  ariaLabel?: string;
  debug?: boolean;
}

export type GSBadgeRef = HTMLSpanElement;
