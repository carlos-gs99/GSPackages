import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseMenuHoverProps {
  delay?: number;
  closeDelay?: number;
  disabled?: boolean;
}

export const useMenuHover = ({
  delay = 150,
  closeDelay = 200,
  disabled = false,
}: UseMenuHoverProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const openMenu = useCallback(() => {
    if (disabled) return;
    
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  }, [delay, disabled]);

  const closeMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  }, [closeDelay]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    openMenu();
  }, [openMenu]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    closeMenu();
  }, [closeMenu]);

  const handleMouseEnterPopup = useCallback(() => {
    setIsHovering(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
  }, []);

  const handleMouseLeavePopup = useCallback(() => {
    setIsHovering(false);
    closeMenu();
  }, [closeMenu]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close menu when disabled
  useEffect(() => {
    if (disabled && isOpen) {
      // Use timeout to avoid setState during render
      const timer = setTimeout(() => setIsOpen(false), 0);
      return () => clearTimeout(timer);
    }
  }, [disabled, isOpen]);

  return {
    isOpen,
    isHovering,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseEnterPopup: handleMouseEnterPopup,
      onMouseLeavePopup: handleMouseLeavePopup,
    },
    openMenu,
    closeMenu,
  };
};
