// Mock for @carlos-gs99/utils
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

// Export all other utils as-is
export * from '../../utils/src/dateUtils';
export * from '../../utils/src/stringUtils';
export * from '../../utils/src/arrayUtils';

