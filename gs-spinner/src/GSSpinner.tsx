import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { GS_SPINNER_NAMESPACE, registerGSSpinnerI18n } from './i18n';
import styles from './styles.module.css';
import type { GSSpinnerProps } from './types';

const GSSpinnerComponent: React.FC<GSSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  thickness = 4,
  className,
  centered = false,
  overlay = false,
  message,
  fullHeight = false,
  ...props
}) => {
  const { t, i18n } = useTranslation(GS_SPINNER_NAMESPACE);
  
  React.useEffect(() => {
    registerGSSpinnerI18n(i18n);
  }, [i18n]);

  const radiusStyles = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '1.5rem', height: '1.5rem' },
    lg: { width: '2rem', height: '2rem' }
  };

  const borderColors = {
    solid: { base: `var(--color-${color}-200)`, top: `var(--color-${color}-500)` },
    soft: { base: `var(--color-${color}-200)`, top: `var(--color-${color}-300)` },
    outlined: { base: `var(--color-${color}-300)`, top: `var(--color-${color}-500)` },
    plain: { base: `var(--color-${color}-300)`, top: `var(--color-${color}-400)` },
  }[variant];

  const spinner = (
    <div
      className={clsx(styles.spinner, className)}
      role="status"
      aria-label={t('aria.loading')}
      style={{
        ...radiusStyles[size],
        border: `${thickness}px solid ${borderColors.base}`,
        borderTop: `${thickness}px solid ${borderColors.top}`,
      }}
      data-gs="GSSpinner"
      data-size={size}
      data-color={color}
      data-variant={variant}
      {...props}
    >
      <span className={styles.srOnly}>{t('aria.spinner')}</span>
    </div>
  );

  if (!centered && !overlay) return spinner;

  const containerClasses = clsx(styles.container, {
    [styles.overlay]: overlay,
    [styles.centered]: centered && !overlay,
    [styles.fullHeight]: fullHeight,
  });

  return (
    <div className={containerClasses} data-gs="GSSpinner-container">
      {spinner}
      {message && <div className={styles.message} data-gs-el="message">{message}</div>}
    </div>
  );
};

export const GSSpinner = React.memo(GSSpinnerComponent);
GSSpinner.displayName = 'GSSpinner';

export default GSSpinner;

