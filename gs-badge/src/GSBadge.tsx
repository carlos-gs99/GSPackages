import React, { forwardRef, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import styles from './styles.module.css';
import type { GSBadgeProps, GSBadgeRef, GSBadgeAnchorOrigin } from './types';
import { GS_BADGE_NAMESPACE, registerGSBadgeI18n } from './i18n';
import { GS_BADGE_VARIANTS, GS_BADGE_COLORS, GS_BADGE_SIZES } from './types';

const DEFAULT_ANCHOR: GSBadgeAnchorOrigin = { vertical: 'top', horizontal: 'right' };

const GSBadgeInner = ({
  children,
  badgeContent,
  variant = 'solid',
  color = 'danger',
  size = 'md',
  anchorOrigin = DEFAULT_ANCHOR,
  badgeInset,
  invisible = false,
  showZero = false,
  max = 99,
  ariaLabel,
  debug = false,
  className,
  style,
  ...rest
}: GSBadgeProps, ref: React.Ref<GSBadgeRef>) => {
  const { t, i18n } = useTranslation(GS_BADGE_NAMESPACE);

  useEffect(() => {
    registerGSBadgeI18n(i18n);
  }, [i18n]);

  const debugLog = useDebug('GSBadge', debug);
  
  useEffect(() => {
    debugLog.log('render', { variant, color, size, anchorOrigin, badgeInset, invisible, showZero, max, ariaLabel });
  }, [debugLog, variant, color, size, anchorOrigin, badgeInset, invisible, showZero, max, ariaLabel]);

  const validVariant = useMemo(() => (GS_BADGE_VARIANTS.includes(variant) ? variant : 'solid'), [variant]);
  const validColor = useMemo(() => (GS_BADGE_COLORS.includes(color) ? color : 'danger'), [color]);
  const validSize = useMemo(() => (GS_BADGE_SIZES.includes(size) ? size : 'md'), [size]);

  const isEmpty = badgeContent === null || badgeContent === undefined;
  const isZero = badgeContent === 0;
  const shouldHide =
    invisible ||
    (isZero && !showZero && validVariant !== 'dot') ||
    (isEmpty && validVariant !== 'dot');

  const formattedContent = useMemo(() => {
    if (typeof badgeContent === 'number') {
      return badgeContent > max ? `${max}+` : badgeContent;
    }
    return badgeContent;
  }, [badgeContent, max]);

  const numericBadgeValue = useMemo(() => {
    if (typeof badgeContent === 'number') {
      return badgeContent;
    }
    if (typeof badgeContent === 'string') {
      const parsed = Number(badgeContent);
      return Number.isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  }, [badgeContent]);

  const anchor = { ...DEFAULT_ANCHOR, ...anchorOrigin } as GSBadgeAnchorOrigin;

  const indicatorStyle = useMemo(() => {
    if (!badgeInset) return undefined;
    if (typeof badgeInset === 'string') {
      const tokens = badgeInset.trim().split(/\s+/);
      if (tokens.length === 1) {
        const [all] = tokens;
        return { top: all, right: all, bottom: all, left: all };
      }
      if (tokens.length === 2) {
        const [vertical, horizontal] = tokens;
        return { top: vertical, bottom: vertical, left: horizontal, right: horizontal };
      }
      if (tokens.length === 4) {
        const [top, right, bottom, left] = tokens;
        return { top, right, bottom, left };
      }
      return { inset: badgeInset };
    }
    const { top, right, bottom, left } = badgeInset;
    return { top, right, bottom, left };
  }, [badgeInset]);

  const computedAriaLabel = useMemo(() => {
    if (shouldHide) return undefined;
    if (ariaLabel) return ariaLabel;
    if (validVariant === 'dot') {
      return t('dotLabel');
    }
    if (typeof formattedContent === 'number') {
      return t('countLabel', { count: formattedContent });
    }
    if (typeof formattedContent === 'string') {
      if (typeof numericBadgeValue === 'number') {
        return t('countLabel', { count: numericBadgeValue });
      }
      return formattedContent;
    }
    return undefined;
  }, [ariaLabel, formattedContent, i18n.language, numericBadgeValue, shouldHide, t, validVariant]);

  return (
    <span
      ref={ref}
      className={clsx(styles.badge, className)}
      style={style}
      data-gs="GSBadge"
      data-variant={validVariant}
      data-color={validColor}
      data-size={validSize}
      data-debug={debug ? 'true' : undefined}
      {...rest}
    >
      {children}
      {!shouldHide && (
        <span
          className={styles.indicator}
          style={indicatorStyle}
          data-gs-el="indicator"
          data-variant={validVariant}
          data-color={validColor}
          data-size={validSize}
          data-anchor-vertical={anchor.vertical}
          data-anchor-horizontal={anchor.horizontal}
          data-inset={badgeInset ? 'true' : undefined}
          data-debug={debug ? 'true' : undefined}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          aria-label={computedAriaLabel}
        >
          {validVariant !== 'dot' ? formattedContent : null}
        </span>
      )}
    </span>
  );
};

export const GSBadge = forwardRef(GSBadgeInner);
GSBadge.displayName = 'GSBadge';

export default GSBadge;
