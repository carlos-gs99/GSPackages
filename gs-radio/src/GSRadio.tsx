import React, { useEffect, useId, useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_RADIO_NAMESPACE, registerGSRadioI18n } from './i18n';
import type { GSRadioProps, GSRadioSize } from './types';
import { useGSRadioGroupContext } from './GSRadioGroup';
import { useRadioState } from './hooks/useRadioState';
import { useRipple } from './hooks/useRipple';
import { RadioIndicator } from './partials/RadioIndicator';
import styles from './styles.module.css';

const composeRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) => {
  return (value: T) => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(value);
      } else if (typeof ref === 'object') {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
};

const SIZE_DIMENSIONS: Record<GSRadioSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const GSRadio: React.FC<GSRadioProps> = ({
  value,
  checked,
  defaultChecked = false,
  onChange,
  label,
  error,
  helperText,
  required = false,
  size,
  color,
  variant,
  disabled,
  loading,
  readOnly,
  ripple,
  className,
  radioClassName,
  id,
  name,
  debug = false,
}) => {
  const { t, i18n } = useTranslation(GS_RADIO_NAMESPACE);
  registerGSRadioI18n(i18n);

  const debugTools = useDebug('GSRadio', debug);
  const generatedId = useId();
  const radioId = id ?? `gs-radio-${generatedId}`;
  const errorId = error ? `${radioId}-error` : undefined;
  const helperId = helperText ? `${radioId}-helper` : undefined;

  let group: ReturnType<typeof useGSRadioGroupContext> | null = null;
  try {
    group = useGSRadioGroupContext();
  } catch {
    group = null;
  }
  const isInGroup = Boolean(group);

  const finalSize: GSRadioSize = size ?? group?.size ?? 'md';
  const finalColor = color ?? group?.color ?? 'primary';
  const finalVariant = variant ?? group?.variant ?? 'solid';
  const finalRipple = ripple ?? group?.ripple ?? false;
  const finalName = name ?? group?.name;
  const finalDisabled = Boolean(disabled ?? group?.disabled);
  const finalReadOnly = Boolean(readOnly ?? group?.readOnly);
  const finalLoading = Boolean(loading);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ripples, createRipple, resetRipples } = useRipple(finalRipple && !finalDisabled && !finalReadOnly && !finalLoading);

  const standaloneState = useRadioState({
    checked,
    defaultChecked,
    value,
    onChange: (radioValue, nextChecked) => {
      if (nextChecked) {
        onChange?.(radioValue);
      }
    },
  });

  const resolvedChecked = isInGroup
    ? group?.value === value
    : standaloneState.checked;

  useEffect(() => {
    if (!finalRipple) {
      resetRipples();
    }
  }, [finalRipple, resetRipples]);

  useEffect(() => {
    debugTools.log('render', { value, resolvedChecked, disabled: finalDisabled, loading: finalLoading });
  }, [debugTools, value, resolvedChecked, finalDisabled, finalLoading]);

  const [statusMessage, setStatusMessage] = useState('');
  useEffect(() => {
    if (!statusMessage) return;
    const timer = setTimeout(() => setStatusMessage(''), 800);
    return () => clearTimeout(timer);
  }, [statusMessage]);

  const handleSelect = useCallback(() => {
    if (finalDisabled || finalReadOnly || finalLoading) {
      return;
    }

    if (isInGroup) {
      if (!resolvedChecked) {
        group?.onSelect?.(value);
        onChange?.(value);
        setStatusMessage(t('aria.checked'));
      }
    } else {
      if (!resolvedChecked) {
        standaloneState.setChecked(true);
        setStatusMessage(t('aria.checked'));
      }
    }
  }, [finalDisabled, finalReadOnly, finalLoading, isInGroup, resolvedChecked, group, value, onChange, standaloneState, t]);

  const boxSize = SIZE_DIMENSIONS[finalSize];

  const wrapperClass = clsx(
    styles.radioWrapper,
    className,
  );

  const boxClass = clsx(
    styles.radioBox,
    radioClassName,
  );

  const containerClass = clsx(styles.radioContainer);

  return (
    <div
      className={wrapperClass}
      data-disabled={finalDisabled || undefined}
      data-readonly={finalReadOnly || undefined}
      data-loading={finalLoading || undefined}
      data-color={finalColor}
      data-variant={finalVariant}
      data-orientation={group?.orientation ?? 'vertical'}
      data-gs="radio"
      data-gs-el="root"
      data-debug={debug ? 'true' : undefined}
    >
      <label
        htmlFor={radioId}
        className={containerClass}
        data-disabled={finalDisabled || undefined}
        data-readonly={finalReadOnly || undefined}
        data-loading={finalLoading || undefined}
        data-gs="radio"
        data-gs-el="container"
      >
        <span className={styles.radioControl} data-gs="radio" data-gs-el="control">
          <input
            ref={composeRefs(inputRef)}
            id={radioId}
            className={styles.radioInput}
            type="radio"
            name={finalName}
            value={String(value)}
            checked={resolvedChecked}
            onChange={() => {
              if (!resolvedChecked) {
                handleSelect();
              }
            }}
            disabled={finalDisabled || finalLoading}
            aria-invalid={Boolean(error)}
            aria-describedby={clsx(errorId, helperId)}
            aria-required={required}
            aria-readonly={finalReadOnly || undefined}
            aria-checked={resolvedChecked}
            aria-busy={finalLoading || undefined}
            aria-disabled={finalDisabled || finalLoading || undefined}
            data-gs="radio"
            data-gs-el="input"
            data-gs-disabled={finalDisabled || finalLoading ? 'true' : undefined}
            data-gs-readonly={finalReadOnly || undefined}
          />
          <span
            className={boxClass}
            style={{ width: boxSize, height: boxSize }}
            data-state={resolvedChecked ? 'checked' : 'unchecked'}
            data-disabled={finalDisabled || undefined}
            onPointerDown={event => {
              if (!resolvedChecked) {
                createRipple(event);
              }
            }}
            onClick={() => handleSelect()}
            data-gs="radio"
            data-gs-el="box"
          >
            <RadioIndicator checked={resolvedChecked} size={finalSize} />
            {finalRipple && ripples.map(rippleEffect => (
              <span
                key={rippleEffect.key}
                className={styles.rippleEffect}
                style={{
                  left: `${rippleEffect.x}px`,
                  top: `${rippleEffect.y}px`,
                  width: `${rippleEffect.size}px`,
                  height: `${rippleEffect.size}px`,
                }}
                data-gs="radio"
                data-gs-el="ripple"
              />
            ))}
          </span>
        </span>

        {label && (
          <span className={styles.radioLabel} data-gs="radio" data-gs-el="label">
            {label}
            {required && <span className={styles.radioRequired} aria-label={t('aria.required')}>*</span>}
          </span>
        )}
      </label>

      {helperText && !error && (
        <div className={styles.radioHelper} data-gs-el="helper">
          {helperText}
        </div>
      )}

      {error && (
        <div className={styles.radioError} role="alert" data-gs-el="error">
          {error}
        </div>
      )}

      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>
    </div>
  );
};

GSRadio.displayName = 'GSRadio';

export { GSRadio };
export default GSRadio;

