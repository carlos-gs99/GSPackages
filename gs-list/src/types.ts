import type React from 'react';
import type { HTMLAttributes } from 'react';

export type GSListItemVariant = 'simple' | 'complex' | 'with-metadata';

export interface GSListProps extends HTMLAttributes<HTMLDivElement> {
  /** Children (GSList.Item, GSList.Header, etc.) */
  children: React.ReactNode;
  /** Variante visual */
  variant?: 'default' | 'bordered' | 'plain';
  /** Tamanho */
  size?: 'sm' | 'md' | 'lg';
  /** Debug mode */
  debug?: boolean;
  /** ID customizado */
  id?: string;
  /** Atributos data-* customizados */
  dataAttributes?: Record<string, string>;
}

export interface GSListHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Conteúdo do header */
  children: React.ReactNode;
  /** Ícone opcional */
  icon?: React.ReactNode;
  /** Ação opcional (ex: botão de fechar) */
  action?: React.ReactNode;
  /** Debug mode */
  debug?: boolean;
}

export interface GSListItemProps extends HTMLAttributes<HTMLElement> {
  /** Variante do item */
  variant?: GSListItemVariant;
  /** Ícone do item */
  icon?: React.ReactNode;
  /** Título do item */
  title: string;
  /** Descrição (para variant complex) */
  description?: string;
  /** Metadados (para variant with-metadata) */
  metadata?: React.ReactNode;
  /** Children customizados (para conteúdo adicional, especialmente em variant complex) */
  children?: React.ReactNode;
  /** Item ativo/selecionado */
  active?: boolean;
  /** Item desabilitado */
  disabled?: boolean;
  /** Callback ao clicar */
  onClick?: () => void;
  /** Link href */
  href?: string;
  /** React Router to */
  to?: string;
  /** Component customizado */
  as?: React.ElementType;
  /** Fechar dropdown ao clicar (se dentro de dropdown) */
  closeOnClick?: boolean;
  /** Debug mode */
  debug?: boolean;
}

export interface GSListSeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Label opcional */
  label?: string;
  /** Debug mode */
  debug?: boolean;
}

export interface GSListFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Conteúdo do footer */
  children: React.ReactNode;
  /** Debug mode */
  debug?: boolean;
}

