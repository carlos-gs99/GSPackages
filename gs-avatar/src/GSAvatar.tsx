import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
  forwardRef,
} from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import styles from './styles.module.css';
import {
  GSAvatarProps,
  GSAvatarRef,
  GS_AVATAR_SIZES,
  GS_AVATAR_COLORS,
  GS_AVATAR_ROUNDED,
  GS_AVATAR_STATES,
} from './types';
import { GS_AVATAR_NAMESPACE, registerGSAvatarI18n } from './i18n';

const DEFAULT_SIZE: (typeof GS_AVATAR_SIZES)[number] = 'md';
const DEFAULT_COLOR: (typeof GS_AVATAR_COLORS)[number] = 'neutral';
const DEFAULT_ROUNDED: (typeof GS_AVATAR_ROUNDED)[number] = 'circle';

const extractInitials = (value?: string): string => {
  if (!value) return '?';
  const tokens = value.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return '?';

  if (tokens.length === 1) {
    const token = tokens[0];
    if (token.length >= 2) {
      return token.slice(0, 2).toUpperCase();
    }
    return token[0]?.toUpperCase() ?? '?';
  }

  const first = tokens[0][0];
  const last = tokens[tokens.length - 1][0];
  return `${first ?? ''}${last ?? ''}`.toUpperCase() || '?';
};

const isValidToken = <T extends readonly string[]>(value: string | undefined, collection: T, fallback: T[number]) => {
  if (value && (collection as readonly string[]).includes(value)) {
    return value as T[number];
  }
  return fallback;
};

const GSAvatarInner = (
  {
    text,
    src,
    size = DEFAULT_SIZE,
    color = DEFAULT_COLOR,
    rounded = DEFAULT_ROUNDED,
    width,
    height,
    className,
    imgProps,
    textClassName,
    state = 'default',
    debug = false,
    ariaLabel,
    ariaDescribedBy,
    alt,
    tabIndex,
    children,
    ...rest
  }: GSAvatarProps,
  ref: React.Ref<GSAvatarRef>
) => {
  const { t, i18n } = useTranslation(GS_AVATAR_NAMESPACE);

  useEffect(() => {
    registerGSAvatarI18n(i18n);
  }, [i18n]);

  const avatarRef = useRef<HTMLDivElement>(null);
  const [imageStatus, setImageStatus] = useState<'idle' | 'loaded' | 'error'>(src ? 'idle' : 'error');
  const reloadTokenRef = useRef(0);

  useEffect(() => {
    setImageStatus(src ? 'idle' : 'error');
    reloadTokenRef.current += 1;
  }, [src]);

  const debugTools = useDebug('GSAvatar', debug);

  useEffect(() => {
    debugTools.log('render', { text, src, size, color, rounded, state, imageStatus });
  }, [debugTools, text, src, size, color, rounded, state, imageStatus]);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => avatarRef.current?.focus(),
      reload: () => {
        if (src) {
          setImageStatus('idle');
          reloadTokenRef.current += 1;
        }
      },
    }),
    [src]
  );

  const resolvedSize = useMemo(() => isValidToken(size, GS_AVATAR_SIZES, DEFAULT_SIZE), [size]);
  const resolvedColor = useMemo(() => isValidToken(color, GS_AVATAR_COLORS, DEFAULT_COLOR), [color]);
  const resolvedRounded = useMemo(() => isValidToken(rounded, GS_AVATAR_ROUNDED, DEFAULT_ROUNDED), [rounded]);
  const resolvedState = useMemo(() => isValidToken(state, GS_AVATAR_STATES, 'default'), [state]);

  const initials = useMemo(() => extractInitials(text), [text]);
  const fallbackContent = children ?? initials;
  const isImageVisible = Boolean(src) && imageStatus !== 'error';
  const showImage = isImageVisible;
  const showFallback = !showImage || imageStatus !== 'loaded';

  const handleImageLoad = useCallback(() => {
    setImageStatus('loaded');
  }, []);

  const handleImageError = useCallback(() => {
    setImageStatus('error');
  }, []);

  const accessibleLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    if (resolvedState === 'loading') return t('aria.loading');
    if (resolvedState === 'error') return t('aria.error');
    if (text) return t('aria.image', { name: text });
    if (children) return t('aria.default');
    if (src) return t('aria.imageWithoutText');
    if (initials !== '?') return t('aria.fallback', { initials });
    return t('aria.default');
  }, [ariaLabel, children, initials, resolvedState, src, t, text]);

  const imageAlt = alt ?? text ?? (src ? accessibleLabel : undefined);

  return (
    <div
      ref={avatarRef}
      className={clsx(styles.avatar, className)}
      data-gs="GSAvatar"
      data-size={resolvedSize}
      data-color={resolvedColor}
      data-rounded={resolvedRounded}
      data-state={resolvedState}
      data-has-image={showImage ? 'true' : undefined}
      data-debug={debug ? 'true' : undefined}
      role="img"
      aria-label={accessibleLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={resolvedState === 'disabled' ? true : undefined}
      style={{
        ...(width ? ({ '--gs-avatar-width': width } as React.CSSProperties) : undefined),
        ...(height ? ({ '--gs-avatar-height': height } as React.CSSProperties) : undefined),
      }}
      tabIndex={resolvedState === 'disabled' ? -1 : tabIndex}
      {...rest}
    >
      {showImage ? (
        <img
          key={reloadTokenRef.current}
          src={src}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={clsx(styles.image)}
          data-status={imageStatus}
          alt={imageAlt}
          {...imgProps}
        />
      ) : null}

      {showFallback && (
        <div
          className={clsx(styles.fallback, textClassName)}
          data-gs-el="fallback"
          aria-hidden={showImage ? true : undefined}
        >
          {fallbackContent}
        </div>
      )}
    </div>
  );
};

export const GSAvatar = forwardRef<GSAvatarRef, GSAvatarProps>(GSAvatarInner);
GSAvatar.displayName = 'GSAvatar';

export default GSAvatar;
