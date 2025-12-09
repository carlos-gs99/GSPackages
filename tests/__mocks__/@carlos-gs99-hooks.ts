// Mock for @carlos-gs99/hooks
import React from 'react';
export const useTranslation = (namespace?: string) => ({
  t: (key: string, params?: Record<string, any>) => {
    if (key === 'fallbackLabel' && params?.icon) {
      return `Missing icon: ${params.icon}`;
    }
    if (key === 'countLabel' && params?.count !== undefined) {
      return `${params.count} notifications`;
    }
    if (key === 'dotLabel') {
      return 'Notification indicator';
    }
    return key;
  },
  i18n: {
    language: 'en',
    addResourceBundle: jest.fn(),
    hasResourceBundle: jest.fn(() => false),
    changeLanguage: jest.fn(),
  },
  changeLanguage: jest.fn(),
});

// Mock for useDebounce
export const useDebounce = <T,>(value: T, delay: number): T => {
  // For tests, return value immediately if delay is 0, otherwise return value after delay
  // Using a simple implementation for testing
  const [debouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    if (delay === 0) {
      return;
    }
    const handler = setTimeout(() => {
      // In tests, we'll just return the value
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return delay === 0 ? value : debouncedValue;
};

// Mock for useDropdown
export const useDropdown = (options: any = {}) => {
  // For tests, default to open so menu is visible
  const [isOpen, setIsOpen] = React.useState(options.show !== undefined ? options.show : true);
  const triggerRef = React.useRef<HTMLElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuId = `dropdown-menu-${Math.random().toString(36).substr(2, 9)}`;

  const toggle = React.useCallback(() => {
    setIsOpen(prev => {
      const newValue = !prev;
      options.onToggle?.(newValue);
      return newValue;
    });
  }, [options]);

  const open = React.useCallback(() => {
    setIsOpen(true);
    options.onToggle?.(true);
  }, [options]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    options.onToggle?.(false);
  }, [options]);

  const renderMenu = React.useCallback((children: React.ReactNode) => {
    if (!isOpen) return null;
    return React.createElement('div', { ref: menuRef, id: menuId }, children);
  }, [isOpen, menuId]);

  return {
    isOpen,
    toggle,
    open,
    close,
    triggerRef,
    menuRef,
    menuId,
    triggerProps: {
      onClick: toggle,
      'aria-haspopup': 'true',
      'aria-expanded': isOpen,
      'aria-controls': menuId,
    },
    menuProps: {
      id: menuId,
      role: 'menu',
      style: {},
    },
    renderMenu,
  };
};

// Export all other hooks as-is or mocked if needed
export * from '../../hooks/src/useToggle';
export * from '../../hooks/src/useViewPort';

