import React, { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GS_SLIDER_NAMESPACE, registerGSSliderI18n } from './i18n';
import type { GSSliderProps } from './types';
import styles from './styles.module.css';

export const GSSlider: React.FC<GSSliderProps> = ({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  showValue = true,
  disabled = false,
  color = 'primary',
  size = 'md',
  className,
  debug = false,
  name,
  ...rest
}) => {
  const { t, i18n } = useTranslation(GS_SLIDER_NAMESPACE);
  React.useEffect(() => {
    registerGSSliderI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSSlider', debug);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const displayValue = isControlled ? value : internalValue;

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const clampValue = useCallback((val: number) => {
    return Math.min(max, Math.max(min, val));
  }, [min, max]);

  const snapToStep = useCallback((val: number) => {
    const steps = Math.round((val - min) / step);
    return clampValue(min + steps * step);
  }, [min, step, clampValue]);

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return displayValue;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    const rawValue = min + percent * (max - min);
    return snapToStep(rawValue);
  }, [min, max, snapToStep, displayValue]);

  const handleChange = useCallback((newValue: number) => {
    const snappedValue = snapToStep(newValue);
    if (!isControlled) {
      setInternalValue(snappedValue);
    }
    onChange?.(snappedValue);
    debugTools.log('value changed', { newValue: snappedValue });
  }, [isControlled, snapToStep, onChange, debugTools]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    const newValue = getValueFromPosition(e.clientX);
    handleChange(newValue);
  }, [disabled, getValueFromPosition, handleChange]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging || disabled) return;
    const newValue = getValueFromPosition(e.clientX);
    handleChange(newValue);
  }, [isDragging, disabled, getValueFromPosition, handleChange]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    let newValue = displayValue;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = clampValue(displayValue - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = clampValue(displayValue + step);
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      default:
        return;
    }
    handleChange(newValue);
  }, [disabled, displayValue, step, min, max, clampValue, handleChange]);

  const fillPercent = ((displayValue - min) / (max - min)) * 100;

  const renderMarks = () => {
    if (!marks) return null;
    const markCount = Math.floor((max - min) / step) + 1;
    const markElements = [];
    for (let i = 0; i < markCount; i++) {
      const markValue = min + i * step;
      const markPercent = ((markValue - min) / (max - min)) * 100;
      markElements.push(
        <span
          key={markValue}
          className={styles.mark}
          style={{ left: `${markPercent}%` }}
        />
      );
    }
    return markElements;
  };

  React.useEffect(() => {
    debugTools.log('render', { value: displayValue, min, max, step, disabled });
  }, [debugTools, displayValue, min, max, step, disabled]);

  return (
    <div
      className={clsx(styles.slider, className)}
      data-gs="GSSlider"
      data-size={size}
      data-color={color}
      data-disabled={disabled || undefined}
      data-gs-debug={debug ? 'true' : undefined}
      {...rest}
    >
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handlePointerDown}
        data-gs-el="track"
      >
        <div
          className={styles.fill}
          style={{ width: `${fillPercent}%` }}
          data-gs-el="fill"
        />
        {renderMarks()}
        <button
          type="button"
          className={styles.thumb}
          style={{ left: `${fillPercent}%` }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          role="slider"
          aria-label={t('aria.label')}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={displayValue}
          tabIndex={disabled ? -1 : 0}
          data-gs-el="thumb"
        />
      </div>
      {showValue && (
        <span className={styles.value} data-gs-el="value">
          {displayValue}
        </span>
      )}
    </div>
  );
};

GSSlider.displayName = 'GSSlider';
export default GSSlider;

