import React from 'react';
import clsx from 'clsx';
import { ButtonBase } from '@carlos-gs99/primitives';
import { useDebug, generateAriaAttributes, useFocusManagement } from '@carlos-gs99/utils';
import { useTranslation } from '@carlos-gs99/hooks';
import styles from './styles.module.css';
import { GS_BUTTON_NAMESPACE, registerGSButtonI18n } from './i18n';
import type { GSButtonProps, GSButtonColor } from './types';

interface RippleInstance {
  id: number;
  x: number;
  y: number;
  size: number;
}

type HTMLElementOrNull = HTMLElement | null;

type PointerEventLike = React.PointerEvent<HTMLElement>;

const isPointerDeviceClick = (event: PointerEventLike) => {
  return event.pointerType === 'mouse' || event.pointerType === 'pen' || event.pointerType === 'touch';
};

const spinnerColorMap: Record<GSButtonColor, 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info'> = {
  primary: 'primary',
  secondary: 'neutral',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  neutral: 'neutral',
};

const GSButtonInner = <T extends React.ElementType = 'button'>(
  props: GSButtonProps<T>,
  forwardedRef: React.Ref<React.ElementRef<T>>,
) => {
  const {
    children,
    variant = 'solid',
    color = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    loadingPosition = 'start',
    startIcon,
    endIcon,
    debug = false,
    ripple = false,
    rounded = false,
    gradient = false,
    ariaLabel,
    ariaDescribedBy,
    ariaPressed,
    ariaExpanded,
    ariaControls,
    ariaHaspopup,
    ariaCurrent,
    keyboardShortcut,
    as: asProp,
    className,
    disabled,
    role: roleProp,
    tabIndex: tabIndexProp,
    type: typeProp,
    onClick,
    onKeyDown,
    onPointerDown,
    href,
    ...rest
  } = props;

  const { t, i18n } = useTranslation(GS_BUTTON_NAMESPACE);
  React.useEffect(() => {
    registerGSButtonI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSButton', Boolean(debug));
  React.useEffect(() => {
    debugTools.log('render');
  }, [debugTools]);

  React.useEffect(() => {
    debugTools.log('props', {
      variant,
      color,
      size,
      fullWidth,
      loading,
      disabled,
      ripple,
      rounded,
      gradient,
      as: asProp ?? 'button',
    });
  }, [variant, color, size, fullWidth, loading, disabled, ripple, rounded, gradient, asProp, debugTools]);

  const componentAs = (asProp ?? 'button') as React.ElementType;
  const isNativeButton = componentAs === 'button';
  const isDisabled = Boolean(disabled || loading);

  const resolvedRole = isNativeButton ? roleProp : roleProp ?? 'button';
  const resolvedTabIndex = isNativeButton ? tabIndexProp : tabIndexProp ?? 0;
  const resolvedType = isNativeButton ? (typeProp ?? 'button') : undefined;

  const rippleCounter = React.useRef(0);
  const rippleTimeouts = React.useRef<number[]>([]);
  const [ripples, setRipples] = React.useState<RippleInstance[]>([]);

  const { focusRef } = useFocusManagement();
  const assignRefs = React.useCallback(
    (node: HTMLElementOrNull) => {
      (focusRef as React.MutableRefObject<HTMLElementOrNull>).current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node as React.ElementRef<T>);
      } else if (forwardedRef && 'current' in forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLElementOrNull>).current = node;
      }
    },
    [focusRef, forwardedRef],
  );

  React.useEffect(() => () => {
    rippleTimeouts.current.forEach(window.clearTimeout);
    rippleTimeouts.current = [];
  }, []);

  const createRipple = React.useCallback(
    (event: PointerEventLike) => {
      if (!ripple || isDisabled) return;
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const id = rippleCounter.current++;
      const rippleInstance: RippleInstance = { id, x, y, size };
      setRipples((previous) => [...previous, rippleInstance]);

      const timeoutId = window.setTimeout(() => {
        setRipples((previous) => previous.filter((item) => item.id !== id));
      }, 600);

      rippleTimeouts.current.push(timeoutId);
    },
    [ripple, isDisabled]
  );

  const handlePointerDown = React.useCallback(
    (event: PointerEventLike) => {
      if (isPointerDeviceClick(event)) {
        createRipple(event);
      }
      onPointerDown?.(event);
    },
    [createRipple, onPointerDown]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [isDisabled, onClick]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isDisabled) return;

      if (!isNativeButton && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        event.currentTarget.click();
      }
    },
    [onKeyDown, isDisabled, isNativeButton]
  );

  const ariaAttributes = React.useMemo(
    () =>
      generateAriaAttributes({
        label: ariaLabel ?? t('label'),
        describedBy: ariaDescribedBy,
        pressed: ariaPressed,
        expanded: ariaExpanded,
        controls: ariaControls,
        hasPopup: ariaHaspopup,
        current: ariaCurrent,
        disabled: isDisabled,
        busy: loading,
        role: resolvedRole,
      }),
    [ariaLabel, ariaDescribedBy, ariaPressed, ariaExpanded, ariaControls, ariaHaspopup, ariaCurrent, isDisabled, loading, resolvedRole, t, i18n.language]
  );

  const buttonClassName = clsx(styles.button, fullWidth && styles.fullWidth, className);

  const datasetAttributes = {
    'data-gs': 'GSButton',
    'data-variant': variant,
    'data-color': color,
    'data-size': size,
    'data-gradient': gradient ? 'true' : undefined,
    'data-rounded': rounded === 'full' ? 'full' : rounded ? 'pill' : undefined,
    'data-loading': loading ? 'true' : undefined,
  } as Record<string, string | undefined>;

  // Inline spinner component (replaces deprecated GSSpinner)
  const InlineButtonSpinner: React.FC<{
    size: 'sm' | 'md';
    color: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
    className?: string;
  }> = ({ size, color, className }) => {
    const radiusStyles = { sm: '1rem', md: '1rem' };
    const borderColors = {
      primary: { base: 'var(--color-primary-200)', top: 'var(--color-primary-500)' },
      neutral: { base: 'var(--color-neutral-200)', top: 'var(--color-neutral-500)' },
      success: { base: 'var(--color-success-200)', top: 'var(--color-success-500)' },
      warning: { base: 'var(--color-warning-200)', top: 'var(--color-warning-500)' },
      danger: { base: 'var(--color-danger-200)', top: 'var(--color-danger-500)' },
      info: { base: 'var(--color-info-200)', top: 'var(--color-info-500)' },
    }[color];

    return (
      <div
        className={clsx('gs-inline-button-spinner', className)}
        role="status"
        aria-label="Loading"
        style={{
          width: radiusStyles[size],
          height: radiusStyles[size],
          border: '2px solid ' + borderColors.base,
          borderTop: '2px solid ' + borderColors.top,
        }}
        data-gs="InlineButtonSpinner"
      >
        <span className="gs-sr-only">Loading...</span>
      </div>
    );
  };

  const renderSpinner = () => (
    <InlineButtonSpinner
      size={size === 'sm' ? 'sm' : 'md'}
      color={spinnerColorMap[color]}
      className={styles.spinner}
    />
  );

  const content = loading ? (
    <span className={styles.loadingContent} data-gs-el="loading">
      {loadingPosition === 'start' && renderSpinner()}
      {children && <span className={styles.label}>{children}</span>}
      {loadingPosition === 'end' && renderSpinner()}
    </span>
  ) : (
    <span className={styles.content} data-gs-el="content">
      {startIcon && <span className={styles.icon} data-gs-el="start-icon">{startIcon}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {endIcon && <span className={styles.icon} data-gs-el="end-icon">{endIcon}</span>}
    </span>
  );

  return (
    <ButtonBase
      ref={assignRefs as React.Ref<React.ElementRef<T>>}
      as={componentAs}
      className={buttonClassName}
      disabled={isNativeButton ? isDisabled : undefined}
      aria-disabled={!isNativeButton && isDisabled ? true : undefined}
      role={resolvedRole}
      tabIndex={resolvedTabIndex}
      type={resolvedType}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...ariaAttributes}
      {...datasetAttributes}
      {...(!isNativeButton && href ? { href } : {})}
      {...rest}
    >
      {content}
      {keyboardShortcut && (
        <span className={styles.srOnly} data-gs-el="shortcut">
          {t('aria.keyboardShortcut', { shortcut: keyboardShortcut })}
        </span>
      )}
      {ripple && (
        <span className={styles.rippleContainer} data-gs-el="ripple-container" aria-hidden="true">
          {ripples.map((instance) => (
            <span
              key={instance.id}
              className={styles.ripple}
              data-gs-el="ripple"
              style={{
                width: instance.size,
                height: instance.size,
                left: instance.x,
                top: instance.y,
              }}
            />
          ))}
        </span>
      )}
    </ButtonBase>
  );
};

type GSButtonComponent = (<T extends React.ElementType = 'button'>(
  props: GSButtonProps<T> & { ref?: React.Ref<React.ElementRef<T>> },
) => React.ReactElement | null) & { displayName?: string };

// Type assertion to resolve generic forwardRef issues with DTS build
export const GSButton = React.forwardRef(GSButtonInner as any) as GSButtonComponent;

GSButton.displayName = 'GSButton';

export default GSButton;