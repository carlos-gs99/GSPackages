import React, { createContext, useContext, useMemo, useState, useCallback, useEffect, useId } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_RADIO_NAMESPACE, registerGSRadioI18n } from './i18n';
import type { GSRadioGroupProps, GSRadioSize, GSRadioColor, GSRadioVariant } from './types';
import styles from './styles.module.css';

interface GSRadioGroupContextValue {
  name?: string;
  value?: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  size?: GSRadioSize;
  color?: GSRadioColor;
  variant?: GSRadioVariant;
  ripple?: boolean;
  orientation?: 'horizontal' | 'vertical';
  onSelect?: (value: string | number) => void;
}

const GSRadioGroupContext = createContext<GSRadioGroupContextValue | null>(null);

export const useGSRadioGroupContext = () => {
  const context = useContext(GSRadioGroupContext);
  if (!context) {
    throw new Error('GSRadio must be used within GSRadioGroup');
  }
  return context;
};

const getDefaultValue = (options: GSRadioGroupProps['options']) => {
  const safeOptions = options ?? [];
  const match = safeOptions.find(option => option.default);
  return match?.value;
};

export const GSRadioGroup: React.FC<GSRadioGroupProps> = ({
  value,
  defaultValue,
  onChange,
  name,
  options = [],
  label,
  error,
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  size = 'md',
  variant = 'outlined',
  color = 'primary',
  ripple = false,
  className,
  orientation = 'vertical',
  debug = false,
  children,
}) => {
  const { t, i18n } = useTranslation(GS_RADIO_NAMESPACE);
  registerGSRadioI18n(i18n);

  const debugTools = useDebug('GSRadioGroup', debug);
  const generatedId = useId();
  const groupId = `gs-radio-group-${generatedId}`;
  const errorId = error ? `${groupId}-error` : undefined;
  const helperId = helperText ? `${groupId}-helper` : undefined;

  const isControlled = value !== undefined;
  const initialValue = defaultValue ?? getDefaultValue(options);
  const [internalValue, setInternalValue] = useState<string | number | undefined>(initialValue);

  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [isControlled, defaultValue]);

  const resolvedValue = isControlled ? value : internalValue;

  const handleSelect = useCallback((nextValue: string | number) => {
    debugTools.log('select', { nextValue, isControlled });
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  }, [isControlled, onChange, debugTools]);

  const contextValue = useMemo<GSRadioGroupContextValue>(() => ({
    name,
    value: resolvedValue,
    disabled,
    readOnly,
    size,
    color,
    variant,
    ripple,
    orientation,
    onSelect: handleSelect,
  }), [name, resolvedValue, disabled, readOnly, size, color, variant, ripple, orientation, handleSelect]);

  // Import GSRadio dynamically to avoid circular dependency
  const GSRadio = require('./GSRadio').GSRadio;

  return (
    <GSRadioGroupContext.Provider value={contextValue}>
      <div
        className={clsx(styles.groupWrapper, className)}
        role="radiogroup"
        aria-labelledby={label ? groupId : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={clsx(errorId, helperId)}
        data-disabled={disabled || undefined}
        data-gs="radio-group"
        data-gs-el="root"
        data-debug={debug ? 'true' : undefined}
      >
        {label && (
          <span id={groupId} className={styles.groupLabel} data-gs="radio-group" data-gs-el="label">
            {label}
            {required && <span className={styles.groupRequired} aria-label={t('aria.required')}>*</span>}
          </span>
        )}

        <div
          className={clsx(styles.options, orientation === 'horizontal' && styles.optionsHorizontal)}
          data-gs="radio-group"
          data-gs-el="options"
        >
          {React.Children.count(children) > 0
            ? children
            : options.map(option => (
                <GSRadio
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  checked={resolvedValue === option.value}
                  disabled={disabled || option.disabled}
                  readOnly={readOnly}
                  size={size}
                  color={color}
                  variant={variant}
                  ripple={ripple}
                  name={name}
                />
              ))}
        </div>

        {helperText && !error && (
          <div className={styles.groupHelper} id={helperId} data-gs-el="helper">
            {helperText}
          </div>
        )}

        {error && (
          <div className={styles.groupError} role="alert" id={errorId} data-gs-el="error">
            {error}
          </div>
        )}
      </div>
    </GSRadioGroupContext.Provider>
  );
};

GSRadioGroup.displayName = 'GSRadioGroup';

export { GSRadioGroupContext };
export default GSRadioGroup;

