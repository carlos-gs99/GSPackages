import type React from 'react';

export const GS_ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type GSIconSize = (typeof GS_ICON_SIZES)[number];

export const GS_ICON_COLORS = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral', 'currentColor', 'inherit'] as const;
export type GSIconColor = (typeof GS_ICON_COLORS)[number];

export interface GSIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Nome do ícone no formato MDI (ex: "mdi-home" ou "home") */
  name: string;
  /** Tamanho do ícone segundo escala Joy ou valor personalizado */
  size?: GSIconSize | number | string;
  /** Cor do ícone seguindo tokens GS ou CSS custom */
  color?: GSIconColor | string;
  /** Indica se o ícone é meramente decorativo (força aria-hidden) */
  decorative?: boolean;
  /** Texto alternativo para leitores de ecrã */
  ariaLabel?: string;
  /** Força manualmente o valor de aria-hidden */
  ariaHidden?: boolean;
  /** Texto auxiliar exibido on hover quando o ícone falta */
  title?: string;
  /** Activa ferramentas de debug (useComponentDebug) */
  debug?: boolean;
}

export interface GSIconRef extends HTMLSpanElement {}
