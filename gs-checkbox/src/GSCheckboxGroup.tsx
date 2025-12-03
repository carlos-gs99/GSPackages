import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { registerGSCheckboxI18n, GS_CHECKBOX_NAMESPACE } from './i18n';
import type { GSCheckboxGroupProps, GSCheckboxSize, GSCheckboxColor, GSCheckboxVariant } from './types';
import styles from './styles.module.css';

interface GSCheckboxGroupContextValue {
  value: string[];
  onChange: (value: string[], checked: boolean, checkboxValue: string) => void;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: GSCheckboxSize;
  color?: GSCheckboxColor;
  variant?: GSCheckboxVariant;
  ripple?: boolean;
  loading?: boolean;
  debug?: boolean;
}

const GSCheckboxGroupContext = createContext<GSCheckboxGroupContextValue | null>(null);

export const useGSCheckboxGroup = () => {
  const context = useContext(GSCheckboxGroupContext);
  if (!context) {
    throw new Error('GSCheckbox must be used within a GSCheckbox.Group');
  }
  return context;
};

export const GSCheckboxGroup: React.FC<GSCheckboxGroupProps> = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  name,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  required = false,
  label,
  size = 'md',
  color = 'primary',
  variant = 'outlined',
  orientation = 'vertical',
  ripple = false,
  loading = false,
  debug = false,
  className,
  children,
}) => {
  const { t, i18n } = useTranslation(GS_CHECKBOX_NAMESPACE);
  useEffect(() => {
    registerGSCheckboxI18n(i18n);
  }, [i18n]);

  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const debugTools = useDebug('GSCheckboxGroup', debug);

  const handleChange = useCallback((newValue: string[], checked: boolean, checkboxValue: string) => {
    debugTools.log('change', { newValue, checked, checkboxValue });

    let updatedValue: string[];

    if (checked) {
      updatedValue = Array.from(new Set([...newValue, checkboxValue]));
    } else {
      updatedValue = newValue.filter(v => v !== checkboxValue);
    }

    if (!isControlled) {
      setInternalValue(updatedValue);
    }

    onChange?.(updatedValue);
  }, [isControlled, onChange, debugTools]);

  const contextValue = useMemo<GSCheckboxGroupContextValue>(() => ({
    value,
    onChange: handleChange,
    name,
    disabled,
    readOnly,
    size,
    color,
    variant,
    ripple,
    loading,
    debug,
  }), [value, handleChange, name, disabled, readOnly, size, color, variant, ripple, loading, debug]);

  return (
    <GSCheckboxGroupContext.Provider value={contextValue}>
      <div
        className={clsx(styles.checkboxGroup, className)}
        role="group"
        aria-disabled={disabled || undefined}
        aria-readonly={readOnly || undefined}
        aria-required={required || undefined}
        data-gs="checkbox-group"
        data-orientation={orientation}
      >
        {label && (
          <div className={styles.checkboxGroupLabel}>
            <span>{label}</span>
            {required && (
              <span className={styles.checkboxGroupRequired} aria-label={t('aria.required')}>
                *
              </span>
            )}
          </div>
        )}
        <div
          className={clsx(
            styles.checkboxGroupOptions,
            orientation === 'horizontal' && styles.checkboxGroupOptionsHorizontal
          )}
        >
          {children}
        </div>
        {error && (
          <div className={styles.checkboxGroupError} role="alert">{error}</div>
        )}
        {helperText && !error && (
          <div className={styles.checkboxGroupHelper}>{helperText}</div>
        )}
      </div>
    </GSCheckboxGroupContext.Provider>
  );
};

export { GSCheckboxGroupContext };

