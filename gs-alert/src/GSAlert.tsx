import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GS_ALERT_NAMESPACE, registerGSAlertI18n } from './i18n';
import styles from './styles.module.css';
import type { GSAlertProps, GSAlertVariant, GSAlertColor } from './types';

// Icon mapping for each severity/color
const SEVERITY_ICONS: Record<GSAlertColor, string> = {
  success: 'check-circle',
  warning: 'alert',
  danger: 'alert-octagon',
  info: 'information',
  primary: 'information-outline',
  secondary: 'information-outline',
  neutral: 'information-outline',
};

export const GSAlert: React.FC<GSAlertProps> = ({
  children,
  variant = 'soft',
  color = 'info',
  showIcon = false,
  icon,
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

  const renderIcon = () => {
    if (!showIcon && !icon) return null;
    
    if (icon) {
      return <div className={styles.icon} data-gs-el="icon">{icon}</div>;
    }
    
    const iconName = SEVERITY_ICONS[color];
    return (
      <div className={styles.icon} data-gs-el="icon">
        <GSIcon name={iconName} color={color} size="md" />
      </div>
    );
  };

  return (
    <div
      className={alertClasses}
      role="status"
      data-gs="GSAlert"
      data-variant={variant}
      data-color={color}
      {...props}
    >
      {renderIcon()}
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
          {closeIcon || (
            <GSIcon name="close" size="sm" decorative />
          )}
        </button>
      )}
    </div>
  );
};

export default GSAlert;

