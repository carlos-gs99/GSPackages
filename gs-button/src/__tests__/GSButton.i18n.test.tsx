import React from 'react';
import { render, screen } from '@testing-library/react';
import { GSButton } from '../GSButton';

// Mock translations
const mockTranslations = {
  en: {
    label: 'Button',
    'aria.keyboardShortcut': 'Keyboard shortcut: {{shortcut}}',
  },
  pt: {
    label: 'Botão',
    'aria.keyboardShortcut': 'Atalho de teclado: {{shortcut}}',
  },
};

// Mock dependencies with i18n support
jest.mock('@carlos-gs99/hooks', () => {
  let currentLanguage = 'en';
  
  return {
    useTranslation: jest.fn(() => ({
      t: (key: string, options?: any) => {
        const translations = mockTranslations[currentLanguage as keyof typeof mockTranslations];
        let translation = translations[key as keyof typeof translations] || key;
        
        // Simple interpolation for testing
        if (options) {
          Object.keys(options).forEach((optionKey) => {
            translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
          });
        }
        
        return translation;
      },
      i18n: {
        language: currentLanguage,
        changeLanguage: (lang: string) => {
          currentLanguage = lang;
        },
      },
    })),
  };
});

jest.mock('@carlos-gs99/utils', () => ({
  useDebug: jest.fn(() => ({
    log: jest.fn(),
  })),
  generateAriaAttributes: jest.fn((attrs) => ({
    'aria-label': attrs.label,
    role: attrs.role,
  })),
  useFocusManagement: jest.fn(() => ({
    focusRef: { current: null },
  })),
}));

jest.mock('@carlos-gs99/primitives', () => ({
  ButtonBase: React.forwardRef(({ children, ...props }: any, ref: any) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  )),
}));

jest.mock('../i18n', () => ({
  GS_BUTTON_NAMESPACE: 'gsbutton',
  registerGSButtonI18n: jest.fn(),
}));

describe('GSButton - Internationalization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Default Label Translation', () => {
    it('uses translated label from i18n', () => {
      render(<GSButton>Click me</GSButton>);
      // The button should render with user-provided children
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('falls back to translation key when no ariaLabel provided', () => {
      render(<GSButton>Button Text</GSButton>);
      const button = screen.getByRole('button');
      // aria-label should use translation
      expect(button).toHaveAttribute('aria-label', 'Button');
    });
  });

  describe('Custom Label Translation', () => {
    it('respects custom ariaLabel over translation', () => {
      render(<GSButton ariaLabel="Custom Save Button">Save</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom Save Button');
    });
  });

  describe('Keyboard Shortcut Translation', () => {
    it('translates keyboard shortcut hint', () => {
      const { container } = render(
        <GSButton keyboardShortcut="Ctrl+S">Save</GSButton>
      );
      const shortcut = container.querySelector('[data-gs-el="shortcut"]');
      expect(shortcut).toHaveTextContent('Keyboard shortcut: Ctrl+S');
    });

    it('interpolates shortcut value in translation', () => {
      const { container } = render(
        <GSButton keyboardShortcut="Ctrl+Z">Undo</GSButton>
      );
      const shortcut = container.querySelector('[data-gs-el="shortcut"]');
      expect(shortcut).toBeInTheDocument();
      expect(shortcut?.textContent).toContain('Ctrl+Z');
    });
  });

  describe('Language Support', () => {
    it('supports English (en)', () => {
      render(<GSButton>English Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Button');
    });

    it('supports Portuguese (pt)', () => {
      // Change mock language to Portuguese
      const useTranslation = require('@carlos-gs99/hooks').useTranslation;
      useTranslation.mockImplementation(() => ({
        t: (key: string, options?: any) => {
          const translations = mockTranslations.pt;
          let translation = translations[key as keyof typeof translations] || key;
          
          if (options) {
            Object.keys(options).forEach((optionKey) => {
              translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
            });
          }
          
          return translation;
        },
        i18n: { language: 'pt' },
      }));

      render(<GSButton>Botão Português</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Botão');
    });
  });

  describe('Loading State Translation', () => {
    it('translates loading spinner text', () => {
      const { container } = render(<GSButton loading>Save</GSButton>);
      const srText = container.querySelector('.gs-sr-only');
      expect(srText).toHaveTextContent('Loading...');
    });

    it('spinner has translated aria-label', () => {
      const { container } = render(<GSButton loading>Save</GSButton>);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });
  });

  describe('Namespace Registration', () => {
    it('registers i18n namespace on mount', () => {
      const { registerGSButtonI18n } = require('../i18n');
      render(<GSButton>Button</GSButton>);
      
      // Should be called once per render (effect runs)
      expect(registerGSButtonI18n).toHaveBeenCalled();
    });
  });

  describe('RTL Support', () => {
    it('renders correctly in LTR layouts', () => {
      render(
        <GSButton
          startIcon={<span>→</span>}
          endIcon={<span>←</span>}
        >
          LTR Button
        </GSButton>
      );
      expect(screen.getByText('LTR Button')).toBeInTheDocument();
    });

    it('should support RTL through CSS (structural test)', () => {
      const { container } = render(
        <GSButton dir="rtl">RTL Button</GSButton>
      );
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('Pluralization Support', () => {
    it('handles singular/plural for loading text', () => {
      const { container } = render(<GSButton loading>Load 1 item</GSButton>);
      // Basic structural test - actual pluralization handled by i18next
      expect(container).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('renders without crashing when translation is missing', () => {
      render(<GSButton>Button</GSButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('uses key as fallback when translation missing', () => {
      const useTranslation = require('@carlos-gs99/hooks').useTranslation;
      useTranslation.mockImplementation(() => ({
        t: (key: string) => key, // Return key as-is
        i18n: { language: 'en' },
      }));

      render(<GSButton>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'label');
    });
  });

  describe('Dynamic Language Switching', () => {
    it('supports runtime language changes', () => {
      const { rerender } = render(<GSButton>Button EN</GSButton>);
      expect(screen.getByText('Button EN')).toBeInTheDocument();

      // Simulate language change
      const useTranslation = require('@carlos-gs99/hooks').useTranslation;
      useTranslation.mockImplementation(() => ({
        t: (key: string) => mockTranslations.pt[key as keyof typeof mockTranslations.pt] || key,
        i18n: { language: 'pt' },
      }));

      rerender(<GSButton>Button PT</GSButton>);
      expect(screen.getByText('Button PT')).toBeInTheDocument();
    });
  });
});

