import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Initialize i18next for tests
i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        gsicon: {
          fallbackLabel: 'Missing icon: {{icon}}',
          missingIcon: 'Icon not found',
        },
        gsbadge: {
          countLabel: '{{count}} notifications',
          dotLabel: 'Notification indicator',
        },
      },
      pt: {
        gsicon: {
          fallbackLabel: 'Ícone em falta: {{icon}}',
          missingIcon: 'Ícone não encontrado',
        },
        gsbadge: {
          countLabel: '{{count}} notificações',
          dotLabel: 'Indicador de notificação',
        },
      },
    },
  });

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

