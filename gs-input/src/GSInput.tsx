import React, { useState, useCallback, useRef, useId } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_INPUT_NAMESPACE, registerGSInputI18n } from './i18n';
import type { GSInputProps } from './types';
import styles from './styles.module.css';

const GSInput = React.forwardRef<HTMLInputElement, GSInputProps>((props, ref) => {
  const {
    label,
    error,
    helperText,
    required = false,
    loading = false,
    size = 'md',
    variant = 'outlined',
    color = 'primary',
    startDecorator,
    endDecorator,
    showCharCount = false,
    maxLength,
    clearable = false,
    onClear,
    showPasswordToggle = false,
    validationState = null,
    showValidationIcon = false,
    prefix,
    suffix,
    className,
    inputClassName,
    labelClassName,
    wrapperClassName,
    debug = false,
    onChange,
    onFocus,
    onBlur,
    value,
    defaultValue,
    placeholder,
    disabled = false,
    readOnly = false,
    id: idProp,
    type = 'text',
    ...rest
  } = props;

  const { t, i18n } = useTranslation(GS_INPUT_NAMESPACE);
  registerGSInputI18n(i18n);

  const debugTools = useDebug('GSInput', debug);
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = idProp ?? `gs-input-${generatedId}`;

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const stringValue = String(currentValue ?? '');

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(event);
    debugTools.log('change', { newValue });
  }, [isControlled, onChange, debugTools]);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  }, [onBlur]);

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isControlled, onClear]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const charCount = stringValue.length;
  const hasError = Boolean(error);
  const hasValue = stringValue.length > 0;

  const wrapperClasses = clsx(
    styles.wrapper,
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
    {
      [styles.focused]: isFocused,
      [styles.disabled]: disabled,
      [styles.readonly]: readOnly,
      [styles.error]: hasError,
      [styles.loading]: loading,
    },
    wrapperClassName
  );

  const labelClasses = clsx(styles.label, labelClassName, {
    [styles.labelRequired]: required,
  });

  return (
    <div className={clsx(styles.container, className)} data-gs="GSInput">
      {label && (
        <div className={styles.labelContainer}>
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        </div>
      )}
      
      <div className={wrapperClasses} data-focused={isFocused || undefined}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        {startDecorator && <span className={styles.decorator}>{startDecorator}</span>}
        
        <input
          ref={(node) => {
            if (inputRef) (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          id={inputId}
          type={inputType}
          className={clsx(styles.input, inputClassName)}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || loading}
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-label={label}
          {...rest}
        />
        
        {suffix && <span className={styles.suffix}>{suffix}</span>}
        
        {showValidationIcon && validationState && (
          <span className={styles.validationIcon} data-state={validationState}>
            {validationState === 'success' && '✓'}
            {validationState === 'error' && '✕'}
            {validationState === 'warning' && '⚠'}
          </span>
        )}
        
        {clearable && hasValue && !disabled && !readOnly && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label={t('aria.clear')}
            tabIndex={-1}
          >
            ✕
          </button>
        )}
        
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? t('aria.hidePassword') : t('aria.showPassword')}
            tabIndex={-1}
          >
            {showPassword ? '👁' : '👁‍🗨'}
          </button>
        )}
        
        {endDecorator && <span className={styles.decorator}>{endDecorator}</span>}
        
        {loading && (
          <span className={styles.loadingSpinner}>
            <span className={styles.spinner} />
          </span>
        )}
      </div>
      
      {showCharCount && maxLength && (
        <div className={styles.charCount}>
          {charCount} / {maxLength}
        </div>
      )}
      
      {error && (
        <div className={styles.errorText} role="alert">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  );
});

GSInput.displayName = 'GSInput';

export default GSInput;
export { GSInput };

