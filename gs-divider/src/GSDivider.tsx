import React, { forwardRef, useMemo, useEffect, useRef, useCallback, MutableRefObject } from 'react';
import clsx from 'clsx';
import { useDebug } from '@carlos-gs99/utils';
import { useTranslation } from '@carlos-gs99/hooks';
import { GS_DIVIDER_NAMESPACE, registerGSDividerI18n } from './i18n';
import styles from './styles.module.css';
import type {
  GSDividerProps,
  GSDividerRef,
  GSDividerOrientation,
  GSDividerVariant,
  GSDividerColor,
  GSDividerSpacing,
} from './types';

const DEFAULT_ORIENTATION: GSDividerOrientation = 'horizontal';
const DEFAULT_VARIANT: GSDividerVariant = 'solid';
const DEFAULT_COLOR: GSDividerColor = 'neutral';
const DEFAULT_SPACING: GSDividerSpacing = 'md';

const GSDividerInner = (
  {
    orientation = DEFAULT_ORIENTATION,
    children,
    textAlign = 'center',
    variant = DEFAULT_VARIANT,
    color = DEFAULT_COLOR,
    spacing = DEFAULT_SPACING,
    debug = false,
    className,
    style,
    ariaLabel,
    role,
    ...rest
  }: GSDividerProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { t, i18n } = useTranslation(GS_DIVIDER_NAMESPACE);

  useEffect(() => {
    registerGSDividerI18n(i18n);
  }, [i18n]);

  const dividerRef = useRef<HTMLDivElement | null>(null);
  const debuggerTools = useDebug('GSDivider', debug);

  useEffect(() => {
    debuggerTools.log('render', {
      orientation,
      hasText: !!children,
      textAlign,
      variant,
      color,
      spacing,
    });
  }, [debuggerTools, orientation, children, textAlign, variant, color, spacing]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && orientation === 'vertical' && children) {
      console.warn('[GSDivider] Conteúdo textual é ignorado quando orientation="vertical".');
    }
  }, [orientation, children]);

  const hasText = Boolean(children) && orientation === 'horizontal';

  const resolvedAriaLabel = useMemo(
    () => ariaLabel ?? t('aria.separator'),
    [ariaLabel, t]
  );

  const justifyContent = useMemo(() => {
    if (!hasText) return undefined;
    if (textAlign === 'left') return 'flex-start';
    if (textAlign === 'right') return 'flex-end';
    return 'center';
  }, [hasText, textAlign]);

  const orientationAttr = orientation === 'vertical' ? 'vertical' : 'horizontal';

  const handleRef = useCallback(
    (node: HTMLDivElement | null) => {
      dividerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref]
  );

  return (
    <div
      ref={handleRef}
      className={clsx(styles.divider, className)}
      data-gs="GSDivider"
      data-orientation={orientationAttr}
      data-variant={variant}
      data-color={color}
      data-spacing={spacing}
      data-has-text={hasText ? 'true' : undefined}
      data-debug={debug ? 'true' : undefined}
      role={role ?? 'separator'}
      aria-orientation={orientationAttr}
      aria-label={resolvedAriaLabel}
      style={style}
      {...rest}
    >
      {orientation === 'horizontal' ? (
        <div className={styles.horizontal} style={{ justifyContent }}>
          <span className={styles.line} aria-hidden="true" />
          {hasText ? (
            <span className={styles.text} data-gs-el="text">
              {children}
            </span>
          ) : null}
          <span className={styles.line} aria-hidden="true" />
        </div>
      ) : (
        <span className={styles.verticalLine} aria-hidden="true" />
      )}
    </div>
  );
};

export const GSDivider = forwardRef<GSDividerRef, GSDividerProps>(GSDividerInner);
GSDivider.displayName = 'GSDivider';

export default GSDivider;
