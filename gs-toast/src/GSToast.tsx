import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { registerGSToastI18n, GS_TOAST_NAMESPACE } from './i18n';
import type { GSToastProps } from './types';
import styles from './styles.module.css';

export const GSToast: React.FC<GSToastProps> = ({
  children,
  open = false,
  onClose,
  autoHideDuration = 5000,
  variant = 'plain',
  color = 'primary',
  size = 'sm',
  position = 'top-right',
  showCloseButton = true,
  className,
  title,
  icon,
  ariaLabel,
}) => {
  const { t, i18n } = useTranslation(GS_TOAST_NAMESPACE);
  registerGSToastI18n(i18n);

  useEffect(() => {
    if (open && autoHideDuration > 0 && onClose) {
      const timer = setTimeout(onClose, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={clsx(styles.toast, className)}
      data-gs="GSToast"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-position={position}
      role="status"
      aria-label={ariaLabel || t('ariaLabel')}
      aria-live="polite"
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{children}</div>
      </div>
      {showCloseButton && onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t('closeButtonLabel')}
          type="button"
        >
          ✕
        </button>
      )}
    </div>,
    document.body
  );
};

export default GSToast;

