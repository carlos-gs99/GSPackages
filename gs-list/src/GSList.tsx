/**
 * GSList Component
 *
 * Reusable list component for displaying items, options, and content
 * Can be used standalone or inside dropdowns
 */

import React, { useId } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import type {
  GSListProps,
  GSListHeaderProps,
  GSListItemProps,
  GSListSeparatorProps,
  GSListFooterProps
} from './types';
import { GS_LIST_NAMESPACE, registerGSListI18n } from './i18n';
import styles from './styles.module.css';

export const GSList: React.FC<GSListProps> & {
  Header: React.FC<GSListHeaderProps>;
  Item: React.FC<GSListItemProps>;
  Separator: React.FC<GSListSeparatorProps>;
  Footer: React.FC<GSListFooterProps>;
} = ({
  children,
  variant = 'default',
  size = 'md',
  debug = false,
  className,
  id,
  dataAttributes,
  ...rest
}) => {
  const reactId = useId();
  const generatedId = `gs-list-${reactId.replace(/:/g, '')}`;
  const rootId = id ?? generatedId;
  const debugLogger = useDebug('GSList', debug);
  const { t, i18n } = useTranslation(GS_LIST_NAMESPACE);

  React.useEffect(() => {
    registerGSListI18n(i18n);
  }, [i18n]);

  const rootClasses = clsx(
    'gs-list',
    styles.root,
    {
      [styles['variant-bordered']]: variant === 'bordered',
      [styles['variant-plain']]: variant === 'plain',
      [styles[`size-${size}`]]: size
    },
    className
  );

  const dataAttrs: Record<string, string> = {
    'data-gs': 'GSList',
    'data-gs-variant': variant,
    'data-gs-size': size,
    ...(dataAttributes || {})
  };

  if (debug) {
    dataAttrs['data-gs-debug'] = 'enabled';
  }

  debugLogger.log('Rendering GSList', { variant, size, hasChildren: !!children });

  return (
    <div
      id={rootId}
      className={rootClasses}
      role="list"
      aria-label={t('aria.defaultLabel', 'List')}
      {...dataAttrs}
      {...rest}
    >
      {children}
    </div>
  );
};

const GSListHeader: React.FC<GSListHeaderProps> = ({
  children,
  icon,
  action,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = useDebug('GSList.Header', debug);

  debugLogger.log('Rendering GSListHeader', { hasIcon: !!icon, hasAction: !!action });

  return (
    <div
      className={clsx('gs-list__header', styles.header, className)}
      data-gs-el="header"
      data-gs-debug={debug ? 'enabled' : undefined}
      {...rest}
    >
      <div className={styles.headerContent}>
        {icon && (
          <span className={styles.headerIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        <h3 className={styles.headerTitle}>{children}</h3>
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  );
};

const GSListItem: React.FC<GSListItemProps> = ({
  variant = 'simple',
  icon,
  title,
  description,
  metadata,
  children,
  active = false,
  disabled = false,
  onClick,
  href,
  to,
  as: Component,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = useDebug('GSList.Item', debug);
  const { t } = useTranslation(GS_LIST_NAMESPACE);
  const hasAction = Boolean(onClick || href || to || Component);

  debugLogger.log('Rendering GSListItem', {
    variant,
    hasIcon: !!icon,
    hasDescription: !!description,
    hasMetadata: !!metadata,
    hasAction,
    active,
    disabled
  });

  const itemClasses = clsx(
    styles.item,
    {
      [styles.itemSimple]: variant === 'simple',
      [styles.itemComplex]: variant === 'complex',
      [styles.itemWithMetadata]: variant === 'with-metadata',
      [styles.itemActive]: active
    },
    className
  );

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const ariaLabel = title || t('aria.itemLabel', 'List item');

  const commonProps = {
    className: itemClasses,
    title: ariaLabel,
    'data-gs-el': 'item',
    'data-gs-variant': variant,
    'data-gs-debug': debug ? 'enabled' : undefined,
    'data-has-action': hasAction ? 'true' : 'false',
    'aria-disabled': disabled,
    'aria-label': ariaLabel,
    tabIndex: disabled || !hasAction ? -1 : 0,
    role: 'listitem',
    onClick: handleClick,
    ...rest
  };

  // Simple and with-metadata: icon + title inline (EXACT like GSDropdownSimple)
  if (variant === 'simple' || variant === 'with-metadata') {
    const content = (
      <>
        {icon && icon}
        {title}
        {metadata && variant === 'with-metadata' && (
          <span className={styles.itemMetadata}>{metadata}</span>
        )}
      </>
    );

    if (Component) {
      return (
        <Component href={href} to={to} {...commonProps} disabled={disabled}>
          {content}
        </Component>
      );
    }

    if (to) {
      const LinkComponent = Link as any;
      return (
        <LinkComponent to={to} {...commonProps}>
          {content}
        </LinkComponent>
      );
    }

    if (href) {
      return (
        <a href={href} {...commonProps}>
          {content}
        </a>
      );
    }

    return (
      <button {...commonProps} disabled={disabled} type="button">
        {content}
      </button>
    );
  }

  // Complex variant: structured layout
  const content = (
    <>
      {icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <div className={styles.itemContent}>
        <span className={styles.itemTitle}>{title}</span>
        {description && (
          <span className={styles.itemDescription}>{description}</span>
        )}
        {children && (
          <div className={styles.itemChildren}>{children}</div>
        )}
      </div>
    </>
  );

  if (Component) {
    return (
      <Component href={href} to={to} {...commonProps} disabled={disabled}>
        {content}
      </Component>
    );
  }

  if (to) {
    const LinkComponent = Link as any;
    return (
      <LinkComponent to={to} {...commonProps}>
        {content}
      </LinkComponent>
    );
  }

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button {...commonProps} disabled={disabled} type="button">
      {content}
    </button>
  );
};

const GSListSeparator: React.FC<GSListSeparatorProps> = ({
  label,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = useDebug('GSList.Separator', debug);

  debugLogger.log('Rendering GSListSeparator', { hasLabel: !!label });

  return (
    <div
      className={clsx('gs-list__separator', styles.separator, className)}
      role="separator"
      data-gs-el="separator"
      data-gs-debug={debug ? 'enabled' : undefined}
      {...rest}
    >
      {label ? (
        <span className={styles.separatorLabel}>{label}</span>
      ) : (
        <div className={styles.separatorLine} />
      )}
    </div>
  );
};

const GSListFooter: React.FC<GSListFooterProps> = ({
  children,
  debug = false,
  className,
  ...rest
}) => {
  const debugLogger = useDebug('GSList.Footer', debug);

  debugLogger.log('Rendering GSListFooter');

  return (
    <div
      className={clsx('gs-list__footer', styles.footer, className)}
      data-gs-el="footer"
      data-gs-debug={debug ? 'enabled' : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

GSList.Header = GSListHeader;
GSList.Item = GSListItem;
GSList.Separator = GSListSeparator;
GSList.Footer = GSListFooter;

export default GSList;

