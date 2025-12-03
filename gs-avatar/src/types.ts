import React from 'react';

export const GS_AVATAR_SIZES = ['sm', 'md', 'lg', 'xl'] as const;
export type GSAvatarSize = (typeof GS_AVATAR_SIZES)[number];

export const GS_AVATAR_COLORS = ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
export type GSAvatarColor = (typeof GS_AVATAR_COLORS)[number];

export const GS_AVATAR_ROUNDED = ['none', 'sm', 'md', 'lg', 'xl', 'circle'] as const;
export type GSAvatarRounded = (typeof GS_AVATAR_ROUNDED)[number];

export const GS_AVATAR_STATES = ['default', 'disabled', 'loading', 'error'] as const;
export type GSAvatarState = (typeof GS_AVATAR_STATES)[number];

export interface GSAvatarRef {
  focus: () => void;
  reload: () => void;
}

export interface GSAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texto utilizado para apresentar iniciais quando a imagem falha */
  text?: string;
  /** Fonte da imagem do avatar */
  src?: string;
  /** Tamanho predefinido baseado na escala Joy */
  size?: GSAvatarSize;
  /** Paleta de cor aplicada ao fallback de texto */
  color?: GSAvatarColor;
  /** Arredondamento das bordas */
  rounded?: GSAvatarRounded;
  /** Largura customizada (p.ex. `48px`) */
  width?: string;
  /** Altura customizada (p.ex. `48px`) */
  height?: string;
  /** Atributos adicionais para a tag `img` */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /** Classe extra aplicada ao container do texto de fallback */
  textClassName?: string;
  /** Estado visual do avatar */
  state?: GSAvatarState;
  /** Ativa modo de debug */
  debug?: boolean;
  /** Etiqueta acessível personalizada */
  ariaLabel?: string;
  /** Referência de descrição acessível */
  ariaDescribedBy?: string;
  /** Texto alternativo específico da imagem */
  alt?: string;
}
