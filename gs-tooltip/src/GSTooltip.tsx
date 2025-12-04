import React, { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Popper } from '@carlos-gs99/primitives';
import { useGSTooltipTranslation } from './i18n';
import styles from './styles.module.css';
import type { GSTooltipProps } from './types';

export const GSTooltip: React.FC<GSTooltipProps> = ({
  content,
  children,
  placement = 'top',
  color = 'neutral',
  size = 'md',
  variant = 'solid',
  arrow = true,
  trigger = 'hover',
  enterDelay = 200,
  leaveDelay = 0,
  disabled = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  contentClassName,
  style,
  maxWidth,
  zIndex = 9999,
}) => {
  useGSTooltipTranslation();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimeout = useRef<number>();
  const leaveTimeout = useRef<number>();

  const setOpen = useCallback((open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  }, [isControlled, onOpenChange]);

  const handleShow = useCallback(() => {
    if (disabled) return;
    clearTimeout(leaveTimeout.current);
    enterTimeout.current = window.setTimeout(() => {
      setOpen(true);
    }, enterDelay);
  }, [disabled, enterDelay, setOpen]);

  const handleHide = useCallback(() => {
    clearTimeout(enterTimeout.current);
    leaveTimeout.current = window.setTimeout(() => {
      setOpen(false);
    }, leaveDelay);
  }, [leaveDelay, setOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimeout.current);
      clearTimeout(leaveTimeout.current);
    };
  }, []);

  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  
  const childProps: any = {};
  if (triggers.includes('hover')) {
    childProps.onMouseEnter = handleShow;
    childProps.onMouseLeave = handleHide;
  }
  if (triggers.includes('focus')) {
    childProps.onFocus = handleShow;
    childProps.onBlur = handleHide;
  }
  if (triggers.includes('click')) {
    childProps.onClick = () => setOpen(!isOpen);
  }

  const clonedChild = React.cloneElement(children, {
    ref: triggerRef,
    ...childProps,
  });

  if (!isOpen || disabled) {
    return clonedChild;
  }

  return (
    <>
      {clonedChild}
      <Popper
        anchorRef={triggerRef}
        open={isOpen && !disabled}
        placement={placement as any}
        offset={8}
        flip={true}
        collisionPadding={8}
      >
        <div
          ref={tooltipRef}
          className={clsx(styles.tooltip, className)}
          data-gs="GSTooltip"
          data-variant={variant}
          data-color={color}
          data-size={size}
          role="tooltip"
          style={{
            ...style,
            zIndex,
            maxWidth: maxWidth || '320px',
          }}
        >
          <div className={clsx(styles.content, contentClassName)}>
            {content}
          </div>
          {arrow && <div className={styles.arrow} />}
        </div>
      </Popper>
    </>
  );
};

export default GSTooltip;
