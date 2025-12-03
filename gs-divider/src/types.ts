import React from 'react';

export const GS_DIVIDER_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type GSDividerOrientation = (typeof GS_DIVIDER_ORIENTATIONS)[number];

export const GS_DIVIDER_VARIANTS = ['solid', 'dashed', 'dotted'] as const;
export type GSDividerVariant = (typeof GS_DIVIDER_VARIANTS)[number];

export const GS_DIVIDER_COLORS = ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
export type GSDividerColor = (typeof GS_DIVIDER_COLORS)[number];

export const GS_DIVIDER_SPACING = ['none', 'sm', 'md', 'lg', 'xl'] as const;
export type GSDividerSpacing = (typeof GS_DIVIDER_SPACING)[number];

/**
 * Props para o componente `GSDivider`.
 */
export interface GSDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientação visual do divisor. */
  orientation?: GSDividerOrientation;
  /** Conteúdo textual opcional (apenas horizontal). */
  children?: React.ReactNode;
  /** Alinhamento do texto quando presente. */
  textAlign?: 'left' | 'center' | 'right';
  /** Estilo da linha. */
  variant?: GSDividerVariant;
  /** Cor da linha (tokens Joy). */
  color?: GSDividerColor;
  /** Espaçamento externo em torno do divisor. */
  spacing?: GSDividerSpacing;
  /** Ativa logs de debug. */
  debug?: boolean;
  /** Override da etiqueta acessível padrão. */
  ariaLabel?: string;
}

export type GSDividerRef = HTMLDivElement;
