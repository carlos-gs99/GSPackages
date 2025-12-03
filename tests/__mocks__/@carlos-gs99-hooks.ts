// Mock for @carlos-gs99/hooks
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

// Export all other hooks as-is or mocked if needed
export * from '../../hooks/src/useToggle';
export * from '../../hooks/src/useViewPort';

