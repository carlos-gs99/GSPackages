import React from 'react';
import clsx from 'clsx';
import { useDebug } from '@carlos-gs99/utils';
import { useTranslation } from '@carlos-gs99/hooks';
import { GS_PROGRESS_NAMESPACE, registerGSProgressI18n } from './i18n';
import styles from './styles.module.css';
import type { GSProgressProps } from './types';

export type { GSProgressProps } from './types';

export const GSProgress: React.FC<GSProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'solid',
  color = 'primary',
  thickness = 4,
  className,
  showLabel = false,
  label,
  determinate = true,
  debug = false,
  ...rest
}) => {
  const { i18n } = useTranslation(GS_PROGRESS_NAMESPACE);
  registerGSProgressI18n(i18n);

  const debugTools = useDebug('GSProgress', debug);
  const radiusStyles = { sm: { width: '1rem', height: '1rem' }, md: { width: '1.5rem', height: '1.5rem' }, lg: { width: '2rem', height: '2rem' } };
  const variants = {
    solid: { bg: `var(--color-${color}-500)`, border: `var(--color-${color}-500)` },
    soft: { bg: `var(--color-${color}-100)`, border: `var(--color-${color}-200)` },
    outlined: { bg: 'transparent', border: `var(--color-${color}-500)` },
    plain: { bg: 'transparent', border: `var(--color-${color}-300)` },
  }[variant];

  const percentage = determinate && value !== undefined ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  React.useEffect(() => {
    debugTools.log('props', {
      value,
      max,
      size,
      variant,
      color,
      thickness,
      showLabel,
      label,
      determinate,
      percentage: Math.round(percentage),
      hasCustomLabel: Boolean(label),
      mode: determinate ? 'determinate' : 'indeterminate',
    });
  }, [
    debugTools,
    value,
    max,
    size,
    variant,
    color,
    thickness,
    showLabel,
    label,
    determinate,
    percentage,
  ]);

  return (
    <div
      className={clsx('gs-progress', className)}
      data-gs="GSProgress"
      data-gs-debug={debug ? 'enabled' : undefined}
      data-mode={determinate ? 'determinate' : 'indeterminate'}
      data-size={size}
      data-variant={variant}
      data-color={color}
      data-has-label={showLabel ? 'true' : undefined}
      {...rest}
    >
      {showLabel && (
        <div className={clsx('gs-progress-label', styles.label)} data-gs-el="label">
          {label || (determinate ? `${Math.round(percentage)}%` : 'Loading...')}
        </div>
      )}

      {determinate ? (
        <div
          className={clsx('gs-progress-root', styles.linearRoot)}
          style={{
            '--progress-thickness': `${thickness}px`,
            '--progress-percentage': `${percentage}%`,
            '--progress-bg-color': `var(--color-${color}-100)`,
            '--progress-indicator-color': variants.bg
          } as React.CSSProperties}
        >
          <div className={clsx('gs-progress-indicator', styles.linearIndicator)} />
        </div>
      ) : (
        <div
          className={clsx('gs-progress-circular', styles.circular)}
          style={{
            '--progress-size': radiusStyles[size].width,
            '--progress-thickness': `${thickness}px`,
            '--progress-bg-color': `var(--color-${color}-100)`,
            '--progress-indicator-color': variants.border
          } as React.CSSProperties}
          role="progressbar"
          aria-label="Loading"
          data-gs-el="circular"
        >
          <span className="gs-sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default GSProgress;
