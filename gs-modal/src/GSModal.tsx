import React, { createContext, useContext, useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useFocusTrap, useDebug } from '@carlos-gs99/utils';
import { Overlay } from '@carlos-gs99/primitives';
import { useTranslation } from '@carlos-gs99/hooks';
import { GSIcon } from '@carlos-gs99/gs-icon';
import { GSButton } from '@carlos-gs99/gs-button';
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
  animation = 'fade',
  animationDuration = 200,
  mode,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmVariant = 'solid',
  confirmColor,
  cancelVariant = 'outlined',
  cancelColor = 'neutral',
  debug = false,
}) => {
  const { t, i18n } = useTranslation(GS_MODAL_NAMESPACE);
  registerGSModalI18n(i18n);

  const debugTools = useDebug('GSModal', debug);

  const isOpen = show !== undefined ? show : open || false;
  const handleClose = useCallback(onHide || onClose || (() => {}), [onHide, onClose]);

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

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

  // Handle confirm mode
  const handleConfirmClick = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  }, [onConfirm, handleClose]);

  const handleCancelClick = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    handleClose();
  }, [onCancel, handleClose]);

  // Determine final confirm color (defaults to 'danger' for danger-type confirms, 'primary' otherwise)
  const resolvedConfirmColor = useMemo(() => {
    if (confirmColor) return confirmColor;
    if (mode === 'confirm' && color === 'danger') return 'danger';
    return 'primary';
  }, [confirmColor, mode, color]);

  const modalClasses = useMemo(() => clsx(
    styles.modal,
    styles[`modal--${size}`],
    {
      [styles['modal--centered']]: centered,
      [styles[`modal--${variant}`]]: variant,
      [styles[`modal--${color}`]]: color,
      [styles[`modal--${animation}`]]: animation,
      [styles['modal--animating']]: isAnimating,
    },
    className
  ), [size, centered, variant, color, animation, isAnimating, className]);

  // Animation lifecycle
  useEffect(() => {
    debugTools.log('isOpen changed', { isOpen, shouldRender, isAnimating });
    
    if (isOpen) {
      setShouldRender(true);
      // Trigger enter animation after render
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else if (shouldRender) {
      // Trigger exit animation
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender, animationDuration, debugTools]);

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

  if (!shouldRender) return null;

  // Render confirm mode footer if applicable
  const renderConfirmFooter = mode === 'confirm' && (
    <GSModalFooter>
      <GSButton
        variant={cancelVariant}
        color={cancelColor}
        onClick={handleCancelClick}
        data-gs-el="cancel-button"
      >
        {cancelText || t('actions.cancel')}
      </GSButton>
      <GSButton
        variant={confirmVariant}
        color={resolvedConfirmColor}
        onClick={handleConfirmClick}
        data-gs-el="confirm-button"
      >
        {confirmText || t('actions.confirm')}
      </GSButton>
    </GSModalFooter>
  );

  return createPortal(
    <GSModalContext.Provider value={{ onClose: handleClose }}>
      <Overlay onClick={handleBackdropClick} data-gs="GSModal" data-debug={debug ? 'true' : undefined}>
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
          data-debug={debug ? 'true' : undefined}
          style={{
            animationDuration: `${animationDuration}ms`,
          }}
        >
          <div className={styles.content} ref={focusTrapRef} data-gs-el="content">
            {children}
            {renderConfirmFooter}
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
          <GSIcon name="close" size="sm" />
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

