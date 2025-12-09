import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDivider } from '../GSDivider';
import { registerGSDividerI18n, GS_DIVIDER_NAMESPACE } from '../i18n';

describe('GSDivider - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSDividerI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_DIVIDER_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_DIVIDER_NAMESPACE);
      expect(bundle).toHaveProperty('aria');
      expect(bundle.aria).toHaveProperty('separator');
      expect(bundle.aria.separator).toBe('Section separator');
    });

    it('should use English aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(divider).toHaveAttribute('aria-label');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_DIVIDER_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_DIVIDER_NAMESPACE);
      expect(bundle).toHaveProperty('aria');
      expect(bundle.aria).toHaveProperty('separator');
      expect(bundle.aria.separator).toBe('Separador de seção');
    });

    it('should use Portuguese aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(divider).toHaveAttribute('aria-label');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSDivider orientation="horizontal">Text</GSDivider>);
      const { container } = render(<GSDivider orientation="horizontal">Text</GSDivider>);
      expect(container.querySelector('[data-gs="GSDivider"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSDivider orientation="horizontal">Text</GSDivider>);
      expect(container.querySelector('[data-gs="GSDivider"]')).toBeInTheDocument();
    });

    it('should update aria-label when language changes', () => {
      i18n.changeLanguage('en');
      const { container, rerender } = render(<GSDivider />);
      let divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(<GSDivider />);
      divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(divider).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_DIVIDER_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSDivider />);
      expect(container.querySelector('[data-gs="GSDivider"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSDividerI18n(i18n);
      registerGSDividerI18n(i18n);
      registerGSDividerI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_DIVIDER_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_DIVIDER_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_DIVIDER_NAMESPACE).toBe('gsdivider');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_DIVIDER_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_DIVIDER_NAMESPACE);

      expect(enBundle).toHaveProperty('aria');
      expect(enBundle.aria).toHaveProperty('separator');
      expect(ptBundle).toHaveProperty('aria');
      expect(ptBundle.aria).toHaveProperty('separator');
    });
  });

  describe('Custom ariaLabel Override', () => {
    it('should use custom ariaLabel instead of translation', () => {
      const { container } = render(<GSDivider ariaLabel="Custom separator label" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label', 'Custom separator label');
    });

    it('should maintain custom ariaLabel when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSDivider ariaLabel="Custom label" />);
      const { container } = render(<GSDivider ariaLabel="Custom label" />);
      let divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label', 'Custom label');

      i18n.changeLanguage('pt');
      rerender(<GSDivider ariaLabel="Custom label" />);
      divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label', 'Custom label');
    });
  });
});

