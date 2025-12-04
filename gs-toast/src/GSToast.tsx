import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { registerGSToastI18n, GS_TOAST_NAMESPACE } from './i18n';
import type { GSToastProps } from './types';
import styles from './styles.module.css';

// Severity icon map (similar to GSAlert)
const severityIconMap: Record<string, string> = {
  primary: 'info',
  secondary: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'alert-octagon',
  info: 'info',
  neutral: 'info',
};

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
  showProgressBar = true,
  showIcon = true,
  className,
  title,
  icon,
  ariaLabel,
  debug = false,
}) => {
  const { t, i18n } = useTranslation(GS_TOAST_NAMESPACE);
  registerGSToastI18n(i18n);
  
  const debugTools = useDebug('GSToast', debug);
  const [progress, setProgress] = useState(100);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    debugTools.log('render', { open, color, variant, size, position, autoHideDuration });
  }, [debugTools, open, color, variant, size, position, autoHideDuration]);

  useEffect(() => {
    if (open && autoHideDuration > 0 && onClose) {
      // Auto-hide timer
      const timer = setTimeout(onClose, autoHideDuration);
      
      // Progress bar animation
      if (showProgressBar) {
        setProgress(100);
        const interval = 50; // Update every 50ms
        const steps = autoHideDuration / interval;
        const decrement = 100 / steps;
        
        progressIntervalRef.current = setInterval(() => {
          setProgress((prev) => Math.max(0, prev - decrement));
        }, interval);
      }
      
      return () => {
        clearTimeout(timer);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [open, autoHideDuration, onClose, showProgressBar]);

  if (!open) return null;

  // Resolve icon (custom or from severity map)
  const resolvedIcon = showIcon ? (
    icon || (severityIconMap[color] && <GSIcon name={severityIconMap[color]} size={size} />)
  ) : null;

  return createPortal(
    <div
      className={clsx(styles.toast, className)}
      data-gs="GSToast"
      data-variant={variant}
      data-color={color}
      data-size={size}
      data-position={position}
      data-debug={debug ? 'true' : undefined}
      role="status"
      aria-label={ariaLabel || t('ariaLabel')}
      aria-live="polite"
    >
      {resolvedIcon && (
        <span className={styles.icon} data-gs-el="icon">
          {resolvedIcon}
        </span>
      )}
      <div className={styles.content} data-gs-el="content">
        {title && <div className={styles.title} data-gs-el="title">{title}</div>}
        <div className={styles.message} data-gs-el="message">{children}</div>
      </div>
      {showCloseButton && onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t('closeButtonLabel')}
          type="button"
          data-gs-el="close"
        >
          <GSIcon name="close" size="sm" />
        </button>
      )}
      {showProgressBar && autoHideDuration > 0 && (
        <div className={styles.progressBar} data-gs-el="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>,
    document.body
  );
};

export default GSToast;

