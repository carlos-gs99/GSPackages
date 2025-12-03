import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_LOADING_NAMESPACE, registerGSLoadingI18n } from './i18n';
import styles from './styles.module.css';
import type { GSLoadingProps } from './types';

// Inline spinner component (replaces deprecated GSSpinner)
interface InlineSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  thickness?: number;
  className?: string;
}

const InlineSpinner: React.FC<InlineSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  thickness = 4,
  className,
}) => {
  const radiusStyles = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '1.5rem', height: '1.5rem' },
    lg: { width: '2rem', height: '2rem' }
  };

  const borderColors = {
    solid: { base: `var(--color-${color}-200)`, top: `var(--color-${color}-500)` },
    soft: { base: `var(--color-${color}-200)`, top: `var(--color-${color}-300)` },
    outlined: { base: `var(--color-${color}-300)`, top: `var(--color-${color}-500)` },
    plain: { base: `var(--color-${color}-300)`, top: `var(--color-${color}-400)` },
  }[variant];

  return (
    <div
      className={clsx(styles.spinner, className)}
      role="status"
      aria-label="Loading"
      style={{
        ...radiusStyles[size],
        border: `${thickness}px solid ${borderColors.base}`,
        borderTop: `${thickness}px solid ${borderColors.top}`,
      }}
      data-gs="InlineSpinner"
    >
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};

const DEFAULT_MODE: GSLoadingProps['mode'] = 'section';
const DEFAULT_VARIANT: GSLoadingProps['variant'] = 'transparent';
const DEFAULT_ALIGN: GSLoadingProps['align'] = 'center';
const DEFAULT_ARIA_LIVE: GSLoadingProps['ariaLive'] = 'polite';
const DEFAULT_SIZE: GSLoadingProps['size'] = 'md';

export const GSLoading = React.forwardRef<HTMLDivElement, GSLoadingProps>(
  (
    {
      mode = DEFAULT_MODE,
      variant = DEFAULT_VARIANT,
      align = DEFAULT_ALIGN,
      title,
      description,
      message,
      illustration,
      actions,
      showBackdrop,
      color = 'primary',
      size = DEFAULT_SIZE,
      spinnerProps,
      ariaLabel,
      ariaLive = DEFAULT_ARIA_LIVE,
      focusOnMount = false,
      debug = false,
      className,
      children,
      tabIndex,
      showText = false,
      ...rest
    },
    forwardedRef
  ) => {
    const { t, i18n } = useTranslation(GS_LOADING_NAMESPACE);

    React.useEffect(() => {
      registerGSLoadingI18n(i18n);
    }, [i18n]);

    const debugTools = useDebug('GSLoading', debug);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const combinedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef]
    );

    React.useEffect(() => {
      if (focusOnMount && containerRef.current) {
        containerRef.current.focus();
      }
    }, [focusOnMount]);

    React.useEffect(() => {
      debugTools.log('render', { mode, variant, align, showBackdrop });
    }, [debugTools, mode, variant, align, showBackdrop]);

    const { message: spinnerMessageProp, ...restSpinnerProps } = spinnerProps ?? {};

    const defaultTitle = React.useMemo(() => t('title'), [t]);
    const defaultDescription = React.useMemo(() => t('description'), [t]);
    const defaultMessage = React.useMemo(() => t('message'), [t]);
    const defaultAriaLabel = React.useMemo(() => t('ariaLabel'), [t]);

    const shouldUseDefaults = showText === true;

    const resolvedTitle =
      title !== undefined
        ? title
        : shouldUseDefaults
        ? defaultTitle
        : null;

    const resolvedDescription =
      description !== undefined
        ? description
        : shouldUseDefaults
        ? defaultDescription
        : null;

    const defaultResolvedMessage = shouldUseDefaults ? defaultMessage : null;

    const resolvedMessage =
      message !== undefined
        ? message
        : spinnerMessageProp ?? defaultResolvedMessage;

    const resolvedAriaLabel = ariaLabel ?? defaultAriaLabel;
    const shouldShowBackdrop = showBackdrop ?? mode !== 'section';

    const spinnerConfig = React.useMemo<InlineSpinnerProps>(
      () => ({
         size,
         color,
         ...restSpinnerProps,
       }),
      [size, color, restSpinnerProps]
    );

    const titleId = React.useId();
    const descriptionId = React.useId();
    const messageId = React.useId();
    const childrenId = React.useId();

    const describedBy = React.useMemo(() => {
      const ids: string[] = [];
      if (resolvedTitle) ids.push(titleId);
      if (resolvedDescription) ids.push(descriptionId);
      if (resolvedMessage) ids.push(messageId);
      if (children) ids.push(childrenId);
      return ids.length > 0 ? ids.join(' ') : undefined;
    }, [children, descriptionId, messageId, resolvedDescription, resolvedMessage, resolvedTitle, titleId, childrenId]);

    const finalMessage =
      resolvedMessage === undefined || resolvedMessage === null ? null : resolvedMessage;

    return (
      <div
        ref={combinedRef}
        className={clsx(styles.root, className)}
        data-gs="GSLoading"
        data-debug={debug ? 'true' : undefined}
        data-mode={mode}
        data-variant={variant}
        data-align={align}
        data-has-illustration={illustration ? 'true' : undefined}
        data-spinner-size={size}
        tabIndex={focusOnMount ? -1 : tabIndex}
        aria-live={ariaLive}
        aria-busy="true"
        aria-label={resolvedAriaLabel}
        aria-describedby={describedBy}
        {...rest}
      >
        {shouldShowBackdrop && <div className={styles.backdrop} aria-hidden="true" />}
        <div className={styles.content} data-align={align}>
          {illustration && <div className={styles.illustration}>{illustration}</div>}

          <div className={styles.spinnerWrapper}>
            <InlineSpinner {...spinnerConfig} />
          </div>

          {resolvedTitle ? (
            <p className={styles.title} id={titleId} data-gs-el="title">
              {resolvedTitle}
            </p>
          ) : null}

          {resolvedDescription ? (
            <p className={styles.description} id={descriptionId} data-gs-el="description">
              {resolvedDescription}
            </p>
          ) : null}

          {finalMessage ? (
            <p className={styles.message} id={messageId} data-gs-el="message">
              {finalMessage}
            </p>
          ) : null}

          {children ? (
            <div className={styles.children} id={childrenId} data-gs-el="content">
              {children}
            </div>
          ) : null}

          {actions ? (
            <div className={styles.actions} data-gs-el="actions">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

GSLoading.displayName = 'GSLoading';

export default GSLoading;

