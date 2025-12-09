// Mock for @carlos-gs99/utils
import React from 'react';
export const useDebug = (componentName: string, debug?: boolean) => ({
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  group: jest.fn(),
  groupEnd: jest.fn(),
  time: jest.fn(),
  timeEnd: jest.fn(),
});

export const useFocusTrap = (isActive: boolean) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return ref;
};

// Mock generateAriaAttributes
export const generateAriaAttributes = (config: any) => {
  const attributes: any = {};
  if (config.label) attributes['aria-label'] = config.label;
  if (config.labelledBy) attributes['aria-labelledby'] = config.labelledBy;
  if (config.describedBy) attributes['aria-describedby'] = config.describedBy;
  if (config.expanded !== undefined) attributes['aria-expanded'] = config.expanded;
  if (config.selected !== undefined) attributes['aria-selected'] = config.selected;
  if (config.required !== undefined) attributes['aria-required'] = config.required;
  if (config.role) attributes['role'] = config.role;
  return attributes;
};

// Export all other utils as-is
export * from '../../utils/src/dateUtils';
export * from '../../utils/src/stringUtils';
export * from '../../utils/src/arrayUtils';
export * from '../../utils/src/accessibilityUtils';

