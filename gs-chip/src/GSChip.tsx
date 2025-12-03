import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_CHIP_NAMESPACE, registerGSChipI18n } from './i18n';
import type { GSChipProps, GSChipRef } from './types';
import styles from './styles.module.css';

export type { GSChipProps, GSChipRef } from './types';

const GSChipInner = ({
  as = 'span',
  children,
  variant = 'soft',
  color = 'primary',
  size = 'md',
  deletable = false,
  onDelete,
  startIcon,
  endIcon,
  disabled = false,
  className,
  onClick,
  ariaLabel,
  deleteButtonAriaLabel,
  debug = false,
  role,
  tabIndex,
  onKeyDown: onKeyDownProp,
  ...rest
}: GSChipProps, ref: React.Ref<GSChipRef>) => {
  const Component = (as || 'span') as React.ElementType;
  const internalRef = useRef<HTMLElement | null>(null);
  const { t, i18n } = useTranslation(GS_CHIP_NAMESPACE);

  useEffect(() => {
    registerGSChipI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSChip', debug);

  useEffect(() => {
    debugTools.log('render', { variant, color, size, deletable, disabled });
  }, [debugTools, variant, color, size, deletable, disabled]);

  useImperativeHandle(ref, () => ({
    focus() {
      internalRef.current?.focus();
    },
    remove() {
      if (!disabled) {
        onDelete?.();
      }
    }
  }), [disabled, onDelete]);

  const isInteractive = Boolean(onClick) && !disabled;
  const deletableEnabled = deletable && typeof onDelete === 'function';

  const computedLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    const contentText = typeof children === 'string' ? children : undefined;
    if (contentText) return contentText;
    return t('aria.chip', { defaultValue: t('label') });
  }, [ariaLabel, children, t]);

  const deleteLabel = deleteButtonAriaLabel ?? t('aria.deleteButton');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onClick?.(event as React.MouseEvent<any, MouseEvent>);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDownProp?.(event);

    if (event.defaultPrevented) return;

    if (isInteractive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(event as unknown as React.MouseEvent<any, MouseEvent>);
      return;
    }

    if (deletableEnabled && (event.key === 'Delete' || event.key === 'Backspace')) {
      event.preventDefault();
      onDelete?.();
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!disabled && deletableEnabled) {
      onDelete?.();
    }
  };

  const resolvedRole = (() => {
    const isSemanticInteractive = typeof Component === 'string' && (Component === 'button' || Component === 'a');
    if (role) return role;
    if (!isSemanticInteractive && isInteractive) return 'button';
    return undefined;
  })();

  const resolvedTabIndex = (() => {
    const isSemanticInteractive = typeof Component === 'string' && (Component === 'button' || Component === 'a');
    if (typeof tabIndex === 'number') return tabIndex;
    if (!isSemanticInteractive && isInteractive) return 0;
    return tabIndex;
  })();

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        internalRef.current = node;
      }}
      className={clsx(styles.chip, className)}
      data-gs="GSChip"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-deletable={deletableEnabled ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      data-interactive={isInteractive ? 'true' : undefined}
      data-debug={debug ? 'true' : undefined}
      aria-label={computedLabel}
      aria-disabled={disabled || undefined}
      role={resolvedRole}
      tabIndex={resolvedTabIndex}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {startIcon && (
        <span className={styles.icon} data-gs-el="start-icon" data-position="start">
          {startIcon}
        </span>
      )}
      <span className={styles.chipContent} data-gs-el="content">
        {children}
      </span>
      {endIcon && (
        <span className={styles.icon} data-gs-el="end-icon" data-position="end">
          {endIcon}
        </span>
      )}
      {deletableEnabled && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={disabled}
          aria-label={deleteLabel}
          data-gs-el="delete-button"
        >
          <svg
            className={styles.deleteIcon}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </Component>
  );
};

const ForwardedGSChip = forwardRef<GSChipRef, GSChipProps>(GSChipInner);
ForwardedGSChip.displayName = 'GSChip';

export const GSChip = React.memo(ForwardedGSChip);

export default GSChip;

