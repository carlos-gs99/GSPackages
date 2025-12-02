import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import styles from './styles.module.css';
import { GSIconProps, GSIconRef, GS_ICON_SIZES, GS_ICON_COLORS } from './types';
import { resolveMdiPath } from './iconMap';

export type { GSIconProps, GSIconRef } from './types';

const GSIconInner = ({
  name,
  size = 'md',
  color = 'currentColor',
  className,
  decorative,
  ariaLabel,
  ariaHidden,
  debug = false,
  ...rest
}: GSIconProps, ref: React.Ref<GSIconRef>) => {
  const { t, i18n } = useTranslation('gsicon');

  useEffect(() => {
    import('./i18n').then(({ registerGSIconI18n }) => {
      registerGSIconI18n(i18n);
    });
  }, [i18n]);

  // Debug mode
  const debugLog = useDebug('GSIcon', debug);
  
  useEffect(() => {
    debugLog.log('render', { name, size, color, decorative });
  }, [debugLog, name, size, color, decorative]);

  const [iconPath, setIconPath] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    resolveMdiPath(name, debug).then((path) => {
      if (mounted) setIconPath(path);
    });
    return () => {
      mounted = false;
    };
  }, [name, debug]);

  const resolvedSizeToken = useMemo(() => {
    if (typeof size === 'string' && GS_ICON_SIZES.includes(size as any)) {
      return size as (typeof GS_ICON_SIZES)[number];
    }
    return undefined;
  }, [size]);

  const customSizeValue = useMemo(() => {
    if (resolvedSizeToken) return undefined;
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string') return size;
    return undefined;
  }, [resolvedSizeToken, size]);

  const resolvedColor = useMemo(() => {
    if (typeof color === 'string' && GS_ICON_COLORS.includes(color as any)) {
      switch (color) {
        case 'primary':
          return 'var(--color-primary-500)';
        case 'secondary':
          return 'var(--color-secondary-500)';
        case 'success':
          return 'var(--color-success-500)';
        case 'warning':
          return 'var(--color-warning-500)';
        case 'danger':
          return 'var(--color-danger-500)';
        case 'info':
          return 'var(--color-info-500)';
        case 'neutral':
          return 'var(--color-neutral-500)';
        case 'currentColor':
          return 'currentColor';
        case 'inherit':
          return 'inherit';
      }
    }
    return color;
  }, [color]);

  const isMissing = !iconPath;

  const resolvedAriaHidden = decorative ?? (ariaHidden ?? !ariaLabel);
  const resolvedAriaLabel = !resolvedAriaHidden ? (ariaLabel || t('fallbackLabel', { icon: name })) : undefined;

  if (isMissing) {
    return (
      <span
        ref={ref}
        className={clsx(styles.icon, styles.iconMissing, className)}
        data-gs="GSIcon"
        data-size={resolvedSizeToken}
        data-custom-size={customSizeValue ? 'true' : undefined}
        data-color={color}
        data-missing="true"
        data-debug={debug ? 'true' : undefined}
        style={{
          '--gs-icon-color': resolvedColor,
          ...(customSizeValue ? { '--gs-icon-custom-size': customSizeValue } : {}),
        } as React.CSSProperties}
        aria-hidden={resolvedAriaHidden}
        aria-label={resolvedAriaLabel}
        title={resolvedAriaLabel}
        {...rest}
      >
        ?
      </span>
    );
  }

  return (
    <span
      className={clsx(styles.icon, className)}
      data-gs="GSIcon"
      data-size={resolvedSizeToken}
      data-custom-size={customSizeValue ? 'true' : undefined}
      data-color={color}
      data-debug={debug ? 'true' : undefined}
      style={{
        '--gs-icon-color': resolvedColor,
        ...(customSizeValue ? { '--gs-icon-custom-size': customSizeValue } : {}),
      } as React.CSSProperties}
      aria-hidden={resolvedAriaHidden}
      aria-label={resolvedAriaLabel}
      ref={ref}
      {...rest}
    >
      <svg
        role={!resolvedAriaHidden ? 'img' : undefined}
        aria-hidden={resolvedAriaHidden}
        viewBox="0 0 24 24"
      >
        <path d={iconPath!} fill="currentColor" />
      </svg>
    </span>
  );
};

export const GSIcon = forwardRef<GSIconRef, GSIconProps>(GSIconInner);
GSIcon.displayName = 'GSIcon';

export default GSIcon;
