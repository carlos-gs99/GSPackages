import React, { useState, useCallback, useMemo, useId } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GS_RATING_NAMESPACE, registerGSRatingI18n } from './i18n';
import type { GSRatingProps, GSRatingSize } from './types';
import styles from './styles.module.css';

const SIZE_MAP: Record<GSRatingSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const GSRating: React.FC<GSRatingProps> = ({
  value = 0,
  defaultValue = 0,
  onChange,
  max = 5,
  precision = 1,
  size = 'md',
  color = 'warning',
  disabled = false,
  readOnly = false,
  highlightSelectedOnly = false,
  emptyIcon,
  filledIcon,
  className,
  debug = false,
  name,
  ...rest
}) => {
  const { t, i18n } = useTranslation(GS_RATING_NAMESPACE);
  React.useEffect(() => {
    registerGSRatingI18n(i18n);
  }, [i18n]);

  const debugTools = useDebug('GSRating', debug);
  const generatedId = useId();
  const ratingId = name ?? `gs-rating-${generatedId}`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = isControlled ? value : internalValue;
  const activeValue = hoverValue ?? displayValue;

  const handleClick = useCallback((newValue: number) => {
    if (disabled || readOnly) return;

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    debugTools.log('rating changed', { newValue });
  }, [disabled, readOnly, isControlled, onChange, debugTools]);

  const handleMouseEnter = useCallback((starValue: number) => {
    if (disabled || readOnly) return;
    setHoverValue(starValue);
  }, [disabled, readOnly]);

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  const stars = useMemo(() => {
    const items = [];
    for (let i = 1; i <= max; i++) {
      const isFilled = activeValue >= i;
      const isPartiallyFilled = precision < 1 && activeValue > i - 1 && activeValue < i;
      const fillPercentage = isPartiallyFilled ? ((activeValue - (i - 1)) * 100) : (isFilled ? 100 : 0);

      items.push({
        value: i,
        isFilled,
        isPartiallyFilled,
        fillPercentage,
      });
    }
    return items;
  }, [max, activeValue, precision]);

  const defaultEmptyIcon = <GSIcon name="star-outline" size={SIZE_MAP[size]} />;
  const defaultFilledIcon = <GSIcon name="star" size={SIZE_MAP[size]} />;

  const resolvedEmptyIcon = emptyIcon ?? defaultEmptyIcon;
  const resolvedFilledIcon = filledIcon ?? defaultFilledIcon;

  React.useEffect(() => {
    debugTools.log('render', { value: displayValue, max, precision, size, disabled, readOnly });
  }, [debugTools, displayValue, max, precision, size, disabled, readOnly]);

  return (
    <div
      className={clsx(styles.rating, className)}
      data-gs="GSRating"
      data-size={size}
      data-color={color}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-gs-debug={debug ? 'true' : undefined}
      onMouseLeave={handleMouseLeave}
      role="radiogroup"
      aria-label={t('aria.label')}
      {...rest}
    >
      {stars.map((star) => {
        const isActive = highlightSelectedOnly ? star.isFilled : star.value <= activeValue;

        return (
          <label
            key={star.value}
            className={clsx(styles.starLabel, {
              [styles.starLabelActive]: isActive,
              [styles.starLabelDisabled]: disabled,
            })}
            onMouseEnter={() => handleMouseEnter(star.value)}
            data-gs-el="star-label"
          >
            <input
              type="radio"
              name={ratingId}
              value={star.value}
              checked={displayValue === star.value}
              onChange={() => handleClick(star.value)}
              disabled={disabled || readOnly}
              className={styles.starInput}
              aria-label={t('aria.starLabel', { value: star.value, max })}
            />
            <span className={styles.starIcon} data-filled={star.isFilled || undefined}>
              {star.fillPercentage > 0 ? (
                <span className={styles.starIconOverlay} style={{ width: `${star.fillPercentage}%` }}>
                  {resolvedFilledIcon}
                </span>
              ) : null}
              <span className={styles.starIconBase}>
                {star.fillPercentage === 0 ? resolvedEmptyIcon : resolvedFilledIcon}
              </span>
            </span>
          </label>
        );
      })}
      {!readOnly && (
        <span className={styles.ratingValue} data-gs-el="value">
          {displayValue.toFixed(precision < 1 ? 1 : 0)} / {max}
        </span>
      )}
    </div>
  );
};

GSRating.displayName = 'GSRating';
export default GSRating;

