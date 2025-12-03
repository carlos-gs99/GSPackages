import React, { createContext, useContext, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useFocusTrap } from '@carlos-gs99/utils';
import { Overlay } from '@carlos-gs99/primitives';
import { useTranslation } from '@carlos-gs99/hooks';
import { GS_MODAL_NAMESPACE, registerGSModalI18n } from './i18n';
import type {
  GSModalProps,
  GSModalHeaderProps,
  GSModalTitleProps,
  GSModalBodyProps,
  GSModalFooterProps,
} from './types';
import styles from './styles.module.css';

interface GSModalContextType {
  onClose: () => void;
}

const GSModalContext = createContext<GSModalContextType | null>(null);

const useGSModalContext = () => {
  const context = useContext(GSModalContext);
  if (!context) throw new Error('GSModal components must be used within GSModal');
  return context;
};

const GSModal: React.FC<GSModalProps> = ({
  children,
  show,
  open,
  onHide,
  onClose,
  size = 'md',
  centered = true,
  backdrop = true,
  keyboard = true,
  closeOnEscape = true,
  restoreFocus = true,
  variant = 'solid',
  color = 'neutral',
  className,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  const { i18n } = useTranslation(GS_MODAL_NAMESPACE);
  registerGSModalI18n(i18n);

  const isOpen = show !== undefined ? show : open || false;
  const handleClose = useCallback(onHide || onClose || (() => {}), [onHide, onClose]);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const focusTrapRef = useFocusTrap(isOpen) as React.RefObject<HTMLDivElement>;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && keyboard && isOpen) {
      event.stopPropagation();
      handleClose();
    }
  }, [closeOnEscape, keyboard, isOpen, handleClose]);

  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget && backdrop === true) {
      handleClose();
    }
  }, [backdrop, handleClose]);

  const modalClasses = useMemo(() => clsx(
    styles.modal,
    styles[`modal--${size}`],
    {
      [styles['modal--centered']]: centered,
      [styles[`modal--${variant}`]]: variant,
      [styles[`modal--${color}`]]: color,
    },
    className
  ), [size, centered, variant, color, className]);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, handleKeyDown, restoreFocus]);

  if (!isOpen) return null;

  return createPortal(
    <GSModalContext.Provider value={{ onClose: handleClose }}>
      <Overlay onClick={handleBackdropClick} data-gs="GSModal">
        <div
          ref={modalRef}
          className={modalClasses}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          tabIndex={-1}
          data-gs-el="dialog"
        >
          <div className={styles.content} ref={focusTrapRef} data-gs-el="content">
            {children}
          </div>
        </div>
      </Overlay>
    </GSModalContext.Provider>,
    document.body
  );
};

export const GSModalHeader = React.memo<GSModalHeaderProps>(({
  children,
  closeButton = false,
  className,
  ...rest
}) => {
  const { onClose } = useGSModalContext();
  const { t } = useTranslation(GS_MODAL_NAMESPACE);

  return (
    <div className={clsx(styles.header, className)} data-gs-el="header" {...rest}>
      {children}
      {closeButton && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t('aria.close')}
          data-gs-el="close"
        >
          ✕
        </button>
      )}
    </div>
  );
});

GSModalHeader.displayName = 'GSModal.Header';

export const GSModalTitle = React.memo<GSModalTitleProps>(({
  children,
  className,
  ...rest
}) => (
  <h2 className={clsx(styles.title, className)} data-gs-el="title" {...rest}>
    {children}
  </h2>
));

GSModalTitle.displayName = 'GSModal.Title';

export const GSModalBody = React.memo<GSModalBodyProps>(({
  children,
  className,
  ...rest
}) => (
  <div className={clsx(styles.body, className)} data-gs-el="body" {...rest}>
    {children}
  </div>
));

GSModalBody.displayName = 'GSModal.Body';

export const GSModalFooter = React.memo<GSModalFooterProps>(({
  children,
  className,
  ...rest
}) => (
  <div className={clsx(styles.footer, className)} data-gs-el="footer" {...rest}>
    {children}
  </div>
));

GSModalFooter.displayName = 'GSModal.Footer';

interface GSModalComponent extends React.FC<GSModalProps> {
  Header: typeof GSModalHeader;
  Title: typeof GSModalTitle;
  Body: typeof GSModalBody;
  Footer: typeof GSModalFooter;
}

const GSModalWithSubComponents = GSModal as GSModalComponent;
GSModalWithSubComponents.Header = GSModalHeader;
GSModalWithSubComponents.Title = GSModalTitle;
GSModalWithSubComponents.Body = GSModalBody;
GSModalWithSubComponents.Footer = GSModalFooter;

export { GSModalWithSubComponents as GSModal };
export default GSModalWithSubComponents;

