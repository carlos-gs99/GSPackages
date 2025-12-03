import type React from 'react';

export type GSButtonVariant = 'solid' | 'outlined' | 'soft' | 'alternate' | 'plain';
export type GSButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type GSButtonSize = 'sm' | 'md' | 'lg';
export type GSButtonLoadingPosition = 'start' | 'end';
export type GSButtonRounded = boolean | 'full';

export const GS_BUTTON_VARIANTS: readonly GSButtonVariant[] = ['solid', 'outlined', 'soft', 'alternate', 'plain'];
export const GS_BUTTON_COLORS: readonly GSButtonColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];
export const GS_BUTTON_SIZES: readonly GSButtonSize[] = ['sm', 'md', 'lg'];

export interface GSButtonCommonProps {
  /** Variante visual do botão. */
  variant?: GSButtonVariant;
  /** Paleta de cor semântica. */
  color?: GSButtonColor;
  /** Escala de tamanho. */
  size?: GSButtonSize;
  /** Expande o botão para ocupar a largura total. */
  fullWidth?: boolean;
  /** Estado de carregamento que bloqueia interacções e exibe spinner. */
  loading?: boolean;
  /** Posição do spinner durante carregamento. */
  loadingPosition?: GSButtonLoadingPosition;
  /** Elemento visual apresentado antes do conteúdo. */
  startIcon?: React.ReactNode;
  /** Elemento visual apresentado depois do conteúdo. */
  endIcon?: React.ReactNode;
  /** Activa logs padronizados de debug. */
  debug?: boolean;
  /** Activa efeito ripple no clique. */
  ripple?: boolean;
  /** Controla o estilo arredondado (pill ou circular). */
  rounded?: GSButtonRounded;
  /** Activa gradiente (apenas variantes solid). */
  gradient?: boolean;
  /** Label alternativo para leitores de ecrã. */
  ariaLabel?: string;
  /** IDs de elementos que descrevem o botão. */
  ariaDescribedBy?: string;
  /** Estado ARIA de toggle. */
  ariaPressed?: boolean;
  /** Estado ARIA expandido (dropdowns, accordions). */
  ariaExpanded?: boolean;
  /** ID do elemento controlado. */
  ariaControls?: string;
  /** Indica presença de popup associado. */
  ariaHaspopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Estado actual (ex.: página active). */
  ariaCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  /** Dica de atalho de teclado anunciada a screen readers. */
  keyboardShortcut?: string;
}

type PropsToOmit = keyof GSButtonCommonProps | 'as' | 'color' | 'size';

export type GSButtonProps<T extends React.ElementType = 'button'> = GSButtonCommonProps & {
  /** Elemento a renderizar (ex.: 'a'). */
  as?: T;
  /** Destino externo quando renderizado como âncora. */
  href?: string;
  /** Conteúdo do botão. */
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit>;

export interface GSButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: GSButtonVariant;
  color?: GSButtonColor;
  size?: GSButtonSize;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md';
  fullWidth?: boolean;
}
