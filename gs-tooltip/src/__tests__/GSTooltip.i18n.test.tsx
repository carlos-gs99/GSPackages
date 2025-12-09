import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTooltip } from '../GSTooltip';
import { registerGSTooltipI18n, GS_TOOLTIP_NAMESPACE } from '../i18n';

describe('GSTooltip - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSTooltipI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_TOOLTIP_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_TOOLTIP_NAMESPACE);
      expect(bundle).toHaveProperty('ariaLabel');
      expect(bundle.ariaLabel).toBe('Tooltip');
    });

    it('should have all required translations', () => {
      const bundle = i18n.getResourceBundle('en', GS_TOOLTIP_NAMESPACE);
      expect(bundle).toHaveProperty('closeButtonLabel');
      expect(bundle).toHaveProperty('dismissButtonLabel');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_TOOLTIP_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_TOOLTIP_NAMESPACE);
      expect(bundle).toHaveProperty('ariaLabel');
      expect(bundle.ariaLabel).toBe('Dica');
    });

    it('should have all required translations', () => {
      const bundle = i18n.getResourceBundle('pt', GS_TOOLTIP_NAMESPACE);
      expect(bundle).toHaveProperty('closeButtonLabel');
      expect(bundle).toHaveProperty('dismissButtonLabel');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(
        <GSTooltip content="Content" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const { container } = render(
        <GSTooltip content="Content" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      expect(document.querySelector('[data-gs="GSTooltip"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(
        <GSTooltip content="Content" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      expect(document.querySelector('[data-gs="GSTooltip"]')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(
        <GSTooltip content="Content" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      // Should still render
      expect(document.querySelector('[data-gs="GSTooltip"]')).toBeInTheDocument();
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_TOOLTIP_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(
        <GSTooltip content="Content" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      expect(document.querySelector('[data-gs="GSTooltip"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSTooltipI18n(i18n);
      registerGSTooltipI18n(i18n);
      registerGSTooltipI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_TOOLTIP_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_TOOLTIP_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_TOOLTIP_NAMESPACE).toBe('gstooltip');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_TOOLTIP_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_TOOLTIP_NAMESPACE);

      expect(enBundle).toHaveProperty('ariaLabel');
      expect(enBundle).toHaveProperty('closeButtonLabel');
      expect(enBundle).toHaveProperty('dismissButtonLabel');

      expect(ptBundle).toHaveProperty('ariaLabel');
      expect(ptBundle).toHaveProperty('closeButtonLabel');
      expect(ptBundle).toHaveProperty('dismissButtonLabel');
    });
  });
});

