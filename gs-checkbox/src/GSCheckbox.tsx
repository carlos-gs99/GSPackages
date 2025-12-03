import React, { useEffect, useId, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import styles from './styles.module.css';
import type { GSCheckboxProps } from './types';
import { registerGSCheckboxI18n, GS_CHECKBOX_NAMESPACE } from './i18n';
import { CheckboxIndicator } from './partials/CheckboxIndicator';
import { useCheckboxState } from './hooks/useCheckboxState';
import { useRipple } from './hooks/useRipple';
import { useGSCheckboxGroup } from './GSCheckboxGroup';

const GSCheckbox = React.memo<GSCheckboxProps>((props) => {
  const {
    checked,
    onChange,
    defaultChecked = false,
    value,
    label,
    error,
    helperText,
    description,
    required = false,
    size: sizeProp,
    color: colorProp,
    variant: variantProp,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    loading: loadingProp,
    indeterminate = false,
    debug: debugProp,
    ripple: rippleProp,
    className,
    checkboxClassName,
    checkedIcon,
    uncheckedIcon,
    indeterminateIcon,
    id: idProp,
    name: nameProp,
    ...rest
  } = props;

  const { t, i18n } = useTranslation(GS_CHECKBOX_NAMESPACE);
  registerGSCheckboxI18n(i18n);
  const generatedId = useId();
  const checkboxId = idProp ?? `gs-checkbox-${generatedId}`;

  let groupContext: ReturnType<typeof useGSCheckboxGroup> | null = null;
  try {
    groupContext = useGSCheckboxGroup();
  } catch {
    groupContext = null;
  }

  const size = sizeProp ?? groupContext?.size ?? 'md';
  const color = colorProp ?? groupContext?.color ?? 'primary';
  const variant = variantProp ?? groupContext?.variant ?? 'outlined';
  const disabled = disabledProp ?? groupContext?.disabled ?? false;
  const readOnly = readOnlyProp ?? groupContext?.readOnly ?? false;
  const loading = loadingProp ?? groupContext?.loading ?? false;
  const debug = debugProp ?? groupContext?.debug ?? false;
  const ripple = rippleProp ?? groupContext?.ripple ?? false;

  const { checked: standaloneChecked, setChecked } = useCheckboxState({
    checked,
    defaultChecked,
    onChange,
  });

  const debugTools = useDebug('GSCheckbox', debug);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ripples, createRipple } = useRipple(ripple && !disabled && !readOnly && !loading);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const groupValue = groupContext?.value ?? [];
  const groupOnChange = groupContext?.onChange;
  const participatesInGroup = Boolean(groupContext && value);

  const isChecked = participatesInGroup
    ? groupValue.includes(value as string)
    : standaloneChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || loading) {
      event.preventDefault();
      return;
    }

    const nextChecked = event.target.checked;

    if (participatesInGroup && groupOnChange && value) {
      groupOnChange(groupValue, nextChecked, value);
    } else {
      setChecked(nextChecked);
    }
  };

  useEffect(() => {
    debugTools.log('render', { isChecked, indeterminate, disabled, readOnly, loading });
  }, [debugTools, isChecked, indeterminate, disabled, readOnly, loading]);

  const variantClass = variant === 'solid' ? 'filled' : variant;
  const checkboxBoxClass = clsx(
    styles.checkbox,
    styles[`checkbox--${size}`],
    styles[`checkbox--${variantClass}`],
    {
      [styles['checkbox--disabled']]: disabled,
      [styles['checkbox--readonly']]: readOnly,
      [styles['checkbox--loading']]: loading,
      [styles['checkbox--error']]: Boolean(error),
    },
    checkboxClassName,
  );

  const wrapperClass = clsx(styles.checkboxWrapper, className, {
    [styles['checkboxWrapper--disabled']]: disabled,
  });

  return (
    <div className={wrapperClass} data-gs="checkbox">
      <label
        htmlFor={checkboxId}
        className={styles.checkboxContainer}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
      >
        <span className={styles.checkboxControl}>
          <input
            id={checkboxId}
            ref={inputRef}
            className={styles.checkboxInput}
            type="checkbox"
            name={participatesInGroup ? groupContext?.name : nameProp}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled || loading || readOnly}
            aria-invalid={Boolean(error)}
            aria-required={required}
            aria-checked={indeterminate ? 'mixed' : undefined}
            aria-busy={loading}
            aria-readonly={readOnly || undefined}
            {...rest}
          />
          <span
            role="presentation"
            className={checkboxBoxClass}
            data-state={indeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'}
            data-checked={isChecked && !indeterminate ? '' : undefined}
            data-indeterminate={indeterminate ? '' : undefined}
            data-size={size}
            data-color={color}
            data-variant={variant}
            onPointerDown={createRipple}
          >
            <span className={styles.checkboxIndicator}>
              <CheckboxIndicator
                checked={isChecked}
                indeterminate={indeterminate}
                loading={loading}
                size={size}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                indeterminateIcon={indeterminateIcon}
              />
            </span>
            {ripple && ripples.map(rippleEffect => (
              <span
                key={rippleEffect.key}
                className={styles.rippleEffect}
                style={{
                  '--ripple-x': `${rippleEffect.x}px`,
                  '--ripple-y': `${rippleEffect.y}px`,
                  '--ripple-size': `${rippleEffect.size}px`,
                } as React.CSSProperties}
              />
            ))}
          </span>
        </span>
        {label && (
          <span className={styles.checkboxContent}>
            <span className={styles.checkboxLabel}>{label}</span>
            {required && (
              <span className={styles.checkboxRequired} aria-label={t('aria.required')}>
                *
              </span>
            )}
          </span>
        )}
      </label>
      {description && (
        <div className={styles.checkboxDescription}>{description}</div>
      )}
      {error && (
        <div className={styles.checkboxError} role="alert">{error}</div>
      )}
      {helperText && !error && (
        <div className={styles.checkboxHelper}>{helperText}</div>
      )}
    </div>
  );
});

GSCheckbox.displayName = 'GSCheckbox';

export default GSCheckbox;
export { GSCheckbox };

