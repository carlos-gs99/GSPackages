import type React from 'react';

export const GS_SPINNER_SIZES = ['sm', 'md', 'lg'] as const;
export type GSSpinnerSize = (typeof GS_SPINNER_SIZES)[number];

export const GS_SPINNER_COLORS = ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const;
export type GSSpinnerColor = (typeof GS_SPINNER_COLORS)[number];

export const GS_SPINNER_VARIANTS = ['solid', 'soft', 'outlined', 'plain'] as const;
export type GSSpinnerVariant = (typeof GS_SPINNER_VARIANTS)[number];

/**
 * GSSpinner component props
 * 
 * @example
 * ```tsx
 * <GSSpinner size="lg" color="primary" />
 * ```
 */
export interface GSSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tamanho do spinner */
  size?: GSSpinnerSize;
  
  /** Cor do spinner usando tokens GS */
  color?: GSSpinnerColor;
  
  /** Variante visual do spinner */
  variant?: GSSpinnerVariant;
  
  /** Espessura da borda em pixels */
  thickness?: number;
  
  /** Classes CSS adicionais */
  className?: string;
  
  /** Centraliza o spinner no container */
  centered?: boolean;
  
  /** Mostra como overlay sobre o conteúdo */
  overlay?: boolean;
  
  /** Mensagem opcional abaixo do spinner */
  message?: string;
  
  /** Container ocupa altura total */
  fullHeight?: boolean;
}

