import React, { HTMLAttributes } from 'react';
import { i18n } from 'i18next';

type GSListItemVariant = 'simple' | 'complex' | 'with-metadata';
interface GSListProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: 'default' | 'bordered' | 'plain';
    size?: 'sm' | 'md' | 'lg';
    debug?: boolean;
    id?: string;
    dataAttributes?: Record<string, string>;
}
interface GSListHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    debug?: boolean;
}
interface GSListItemProps extends HTMLAttributes<HTMLElement> {
    variant?: GSListItemVariant;
    icon?: React.ReactNode;
    title: string;
    description?: string;
    metadata?: React.ReactNode;
    children?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    href?: string;
    to?: string;
    as?: React.ElementType;
    closeOnClick?: boolean;
    debug?: boolean;
}
interface GSListSeparatorProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    debug?: boolean;
}
interface GSListFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    debug?: boolean;
}

declare const GSList: React.FC<GSListProps> & {
    Header: React.FC<GSListHeaderProps>;
    Item: React.FC<GSListItemProps>;
    Separator: React.FC<GSListSeparatorProps>;
    Footer: React.FC<GSListFooterProps>;
};

declare const GS_LIST_NAMESPACE = "GSList";
declare function registerGSListI18n(instance: i18n): void;

export { GSList, type GSListFooterProps, type GSListHeaderProps, type GSListItemProps, type GSListItemVariant, type GSListProps, type GSListSeparatorProps, GS_LIST_NAMESPACE, GSList as default, registerGSListI18n };
