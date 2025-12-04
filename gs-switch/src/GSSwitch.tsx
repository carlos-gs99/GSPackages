import React, { useState, useCallback, useRef, useId, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSSpinner } from '@carlos-gs99/gs-spinner';
import { GS_SWITCH_NAMESPACE, registerGSSwitchI18n } from './i18n';
import type { GSSwitchProps } from './types';
import styles from './styles.module.css';

interface RippleEffect {
  key: number;
  x: number;
  y: number;
  size: number;
}

const GSSwitch = React.forwardRef<HTMLInputElement, GSSwitchProps>(({
  checked,
  defaultChecked,
  onChange,
  color = 'primary',
  size = 'md',
  label,
  labelPosition = 'end',
  disabled = false,
  readOnly = false,
  ariaLabel,
  helperText,
  error,
  loading = false,
  debug = false,
  ripple = false,
  checkedIcon,
  uncheckedIcon,
  id,
  className,
  ...props
}, ref) => {
  const { i18n } = useTranslation(GS_SWITCH_NAMESPACE);
  registerGSSwitchI18n(i18n);

  const debugTools = useDebug('GSSwitch', debug);
  const elementId = useId();
  const switchId = id ?? `gs-switch-${elementId}`;
  
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Determine if controlled or uncontrolled
  const isControlled = checked !== undefined;
  const checkedValue = isControlled ? checked : internalChecked;

  // Ripple effect management
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const rippleCounter = useRef(0);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || disabled || loading) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleEffect = {
      key: rippleCounter.current++,
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.key !== newRipple.key));
    }, 600);
  }, [ripple, disabled, loading]);

  useEffect(() => {
    debugTools.log('render', { 
      checked: checkedValue, 
      disabled, 
      loading, 
      error, 
      ripple,
    });
  }, [debugTools, checkedValue, disabled, loading, error, ripple]);

  // Combine refs
  const combinedRef = useCallback((node: HTMLInputElement | null) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
  }, [ref]);

  // Handle change
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (disabled || readOnly || loading) {
      event.preventDefault();
      debugTools.log('change prevented', { disabled, readOnly, loading });
      return;
    }

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked, event);
    debugTools.log('change', { newChecked });
  }, [disabled, readOnly, loading, isControlled, onChange, debugTools]);

  const wrapperClass = clsx(
    styles.switchWrapper,
    {
      [styles['switchWrapper--disabled']]: disabled,
      [styles['switchWrapper--readonly']]: readOnly,
      [styles['switchWrapper--error']]: Boolean(error),
    },
    className
  );

  const trackClass = clsx(
    styles.switchTrack,
    styles[`switchTrack--${size}`],
    styles[`switchTrack--${color}`],
    {
      [styles['switchTrack--checked']]: checkedValue,
      [styles['switchTrack--disabled']]: disabled || loading,
    }
  );

  const thumbClass = clsx(
    styles.switchThumb,
    styles[`switchThumb--${size}`],
    {
      [styles['switchThumb--checked']]: checkedValue,
      [styles['switchThumb--loading']]: loading,
    }
  );

  return (
    <div className={wrapperClass} data-gs="GSSwitch" data-debug={debug ? 'true' : undefined}>
      <label
        htmlFor={switchId}
        className={styles.switchContainer}
        data-label-position={labelPosition}
      >
        {label && labelPosition === 'start' && (
          <span className={styles.switchLabel} data-gs-el="label">
            {label}
          </span>
        )}
        
        <button
          type="button"
          role="switch"
          aria-checked={checkedValue}
          aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
          aria-disabled={disabled || loading}
          aria-readonly={readOnly || undefined}
          className={trackClass}
          onClick={(e) => {
            if (inputRef.current && !disabled && !readOnly && !loading) {
              inputRef.current.click();
            }
            createRipple(e);
          }}
          disabled={disabled || loading}
          data-gs-el="track"
        >
          <input
            ref={combinedRef}
            id={switchId}
            type="checkbox"
            className={styles.switchInput}
            checked={checkedValue}
            onChange={handleChange}
            disabled={disabled || loading}
            readOnly={readOnly}
            aria-label={ariaLabel}
            data-gs-el="input"
            {...props}
          />
          
          <span className={thumbClass} data-gs-el="thumb">
            {loading ? (
              <GSSpinner size="sm" color={color as any} className={styles.switchSpinner} />
            ) : (
              <>
                {checkedValue && checkedIcon && (
                  <span className={styles.switchIcon}>{checkedIcon}</span>
                )}
                {!checkedValue && uncheckedIcon && (
                  <span className={styles.switchIcon}>{uncheckedIcon}</span>
                )}
              </>
            )}
          </span>

          {ripple && ripples.map(r => (
            <span
              key={r.key}
              className={styles.ripple}
              style={{
                left: `${r.x}px`,
                top: `${r.y}px`,
                width: `${r.size}px`,
                height: `${r.size}px`,
              }}
            />
          ))}
        </button>

        {label && labelPosition === 'end' && (
          <span className={styles.switchLabel} data-gs-el="label">
            {label}
          </span>
        )}
      </label>

      {helperText && !error && (
        <div className={styles.switchHelper} data-gs-el="helper">
          {helperText}
        </div>
      )}

      {error && (
        <div className={styles.switchError} role="alert" data-gs-el="error">
          {error}
        </div>
      )}
    </div>
  );
});

GSSwitch.displayName = 'GSSwitch';

export { GSSwitch };
export default GSSwitch;

