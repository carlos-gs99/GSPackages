import React, { useState, useCallback, useRef, useId, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation, useDebounce } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GS_TEXTAREA_NAMESPACE, registerGSTextAreaI18n } from './i18n';
import type { GSTextAreaProps } from './types';
import styles from './styles.module.css';

const GSTextArea = React.forwardRef<HTMLTextAreaElement, GSTextAreaProps>((props, ref) => {
  const {
    label,
    error,
    helperText,
    required = false,
    loading = false,
    size = 'md',
    variant = 'outlined',
    color = 'primary',
    showCharCount = false,
    showWordCount = false,
    showLineCount = false,
    maxLength,
    clearable = false,
    onClear,
    validationState = null,
    showValidationIcon = false,
    className,
    textareaClassName,
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
    rows = 3,
    debounce = 0,
    onDebouncedChange,
    copyable = false,
    floatingLabel = false,
    autoResize = false,
    minRows = 3,
    maxRows = 10,
    ...rest
  } = props;

  const { t, i18n } = useTranslation(GS_TEXTAREA_NAMESPACE);
  registerGSTextAreaI18n(i18n);

  const debugTools = useDebug('GSTextArea', debug);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const generatedId = useId();
  const textareaId = idProp ?? `gs-textarea-${generatedId}`;

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const stringValue = String(currentValue ?? '');

  // Debounce logic
  const debouncedValue = useDebounce(stringValue, debounce);

  useEffect(() => {
    if (debounce > 0 && onDebouncedChange) {
      onDebouncedChange(debouncedValue);
      debugTools.log('debounced change', { debouncedValue });
    }
  }, [debouncedValue, debounce, onDebouncedChange, debugTools]);

  // Auto-resize logic
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = lineHeight * minRows;
      const maxHeight = lineHeight * maxRows;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [stringValue, autoResize, minRows, maxRows]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(event);
    debugTools.log('change', { newValue });
  }, [isControlled, onChange, debugTools]);

  const handleFocus = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  }, [onFocus]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  }, [onBlur]);

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isControlled, onClear]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(stringValue);
      setCopySuccess(true);
      debugTools.log('copy success', { value: stringValue });
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      debugTools.log('copy error', { error: err });
    }
  }, [stringValue, debugTools]);

  // Counters
  const charCount = stringValue.length;
  const wordCount = useMemo(() => {
    return stringValue.trim() === '' ? 0 : stringValue.trim().split(/\s+/).length;
  }, [stringValue]);
  const lineCount = useMemo(() => {
    return stringValue.split('\n').length;
  }, [stringValue]);

  const hasError = Boolean(error);
  const hasValue = stringValue.length > 0;

  const wrapperClasses = clsx(
    styles.wrapper,
    styles[`wrapper--${size}`],
    styles[`wrapper--${variant}`],
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
    [styles.labelFloating]: floatingLabel,
    [styles.labelFloatingActive]: floatingLabel && (isFocused || hasValue),
  });

  const containerClasses = clsx(
    styles.container,
    {
      [styles.containerFloatingLabel]: floatingLabel,
    },
    className
  );

  return (
    <div className={containerClasses} data-gs="GSTextArea" data-debug={debug ? 'true' : undefined}>
      {label && !floatingLabel && (
        <div className={styles.labelContainer}>
          <label htmlFor={textareaId} className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        </div>
      )}
      
      <div className={wrapperClasses} data-focused={isFocused || undefined}>
        {label && floatingLabel && (
          <label htmlFor={textareaId} className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <textarea
          ref={(node) => {
            if (textareaRef) (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          id={textareaId}
          className={clsx(styles.textarea, textareaClassName)}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled || loading}
          readOnly={readOnly}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={autoResize ? minRows : rows}
          aria-invalid={hasError}
          aria-label={label}
          {...rest}
        />
        
        <div className={styles.actions} data-gs-el="actions">
          {showValidationIcon && validationState && (
            <span className={styles.validationIcon} data-state={validationState} data-gs-el="validation">
              {validationState === 'success' && <GSIcon name="check-circle" size="sm" color="success" />}
              {validationState === 'error' && <GSIcon name="alert-circle" size="sm" color="danger" />}
              {validationState === 'warning' && <GSIcon name="alert-triangle" size="sm" color="warning" />}
            </span>
          )}
          
          {copyable && hasValue && !disabled && !readOnly && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleCopy}
              aria-label={copySuccess ? t('aria.copied') : t('aria.copy')}
              tabIndex={-1}
              data-gs-el="copy"
            >
              <GSIcon name={copySuccess ? 'check' : 'content-copy'} size="sm" />
            </button>
          )}
          
          {clearable && hasValue && !disabled && !readOnly && (
            <button
              type="button"
              className={styles.actionButton}
              onClick={handleClear}
              aria-label={t('aria.clear')}
              tabIndex={-1}
              data-gs-el="clear"
            >
              <GSIcon name="close" size="sm" />
            </button>
          )}
        </div>
      </div>
      
      {(showCharCount || showWordCount || showLineCount) && (
        <div className={styles.counters} data-gs-el="counters">
          {showCharCount && maxLength && (
            <span className={styles.counter}>{charCount} / {maxLength}</span>
          )}
          {showWordCount && (
            <span className={styles.counter}>{wordCount} {t('counters.words', { count: wordCount })}</span>
          )}
          {showLineCount && (
            <span className={styles.counter}>{lineCount} {t('counters.lines', { count: lineCount })}</span>
          )}
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

GSTextArea.displayName = 'GSTextArea';

export default GSTextArea;
export { GSTextArea };

