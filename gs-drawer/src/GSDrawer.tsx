import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug, useFocusTrap } from '@carlos-gs99/utils';
import { Overlay } from '@carlos-gs99/primitives';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { registerGSDrawerI18n, GS_DRAWER_NAMESPACE } from './i18n';
import type { GSDrawerProps } from './types';
import styles from './styles.module.css';

export const GSDrawer: React.FC<GSDrawerProps> = ({
  children,
  open,
  onClose,
  title,
  placement = 'end',
  size = 'md',
  backdrop = true,
  keyboard = true,
  closeOnEscape = true,
  restoreFocus = true,
  className,
  ariaLabel,
  debug = false,
}) => {
  const { t, i18n } = useTranslation(GS_DRAWER_NAMESPACE);
  registerGSDrawerI18n(i18n);

  const debugTools = useDebug('GSDrawer', debug);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const focusTrapRef = useFocusTrap(open) as React.RefObject<HTMLDivElement>;

  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      requestAnimationFrame(() => setIsAnimating(true));
    } else if (shouldRender) {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open, shouldRender]);

  useEffect(() => {
    debugTools.log('render', { open, placement, size });
  }, [debugTools, open, placement, size]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && keyboard && open) {
      event.stopPropagation();
      onClose();
    }
  }, [closeOnEscape, keyboard, open, onClose]);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        if (restoreFocus && previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [open, handleKeyDown, restoreFocus]);

  if (!shouldRender) return null;

  const drawerClasses = clsx(
    styles.drawer,
    styles[`drawer--${placement}`],
    styles[`drawer--${size}`],
    { [styles['drawer--animating']]: isAnimating },
    className
  );

  return createPortal(
    <>
      {backdrop && <Overlay onClick={onClose} data-gs="GSDrawer"><div /></Overlay>}
      <div
        ref={drawerRef}
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title}
        data-gs="GSDrawer"
        data-placement={placement}
        data-debug={debug ? 'true' : undefined}
      >
        <div ref={focusTrapRef} className={styles.content}>
          {title && (
            <div className={styles.header}>
              <h3 className={styles.title}>{title}</h3>
              <button onClick={onClose} className={styles.closeButton} aria-label={t('aria.close')}>
                <GSIcon name="close" size="sm" />
              </button>
            </div>
          )}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default GSDrawer;

