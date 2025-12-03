import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { GS_ALERT_NAMESPACE, registerGSAlertI18n } from './i18n';
import styles from './styles.module.css';
import type { GSAlertProps, GSAlertVariant } from './types';

export const GSAlert: React.FC<GSAlertProps> = ({
  children,
  variant = 'soft',
  color = 'info',
  dismissible = false,
  onClose,
  closeIcon,
  className,
  ...props
}) => {
  const { t, i18n } = useTranslation(GS_ALERT_NAMESPACE);
  registerGSAlertI18n(i18n);

  const variantClasses: Record<GSAlertVariant, string> = {
    soft: styles.alertSoft,
    solid: styles.alertSolid,
    outlined: styles.alertOutlined,
    plain: styles.alertPlain,
  };

  const alertClasses = clsx(
    styles.alert,
    variantClasses[variant],
    styles[`alert--${color}`],
    className
  );

  return (
    <div
      className={alertClasses}
      role="status"
      data-gs="GSAlert"
      data-variant={variant}
      data-color={color}
      {...props}
    >
      <div className={styles.content} data-gs-el="content">
        {children}
      </div>
      {dismissible && onClose && (
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label={t('alert.aria.closeButton')}
          data-gs-el="close"
          type="button"
        >
          {closeIcon || '✕'}
        </button>
      )}
    </div>
  );
};

export default GSAlert;

