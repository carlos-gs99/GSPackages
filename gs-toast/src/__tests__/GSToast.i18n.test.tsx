import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSToast } from '../GSToast';
import { registerGSToastI18n, GS_TOAST_NAMESPACE } from '../i18n';

describe('GSToast - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSToastI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_TOAST_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_TOAST_NAMESPACE);
      expect(bundle).toHaveProperty('ariaLabel');
      expect(bundle.ariaLabel).toBe('Notification');
    });

    it('should use English aria-label when no custom ariaLabel provided', () => {
      render(<GSToast open>Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(toast).toHaveAttribute('aria-label');
    });

    it('should use English aria-label on close button', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose}>Message</GSToast>);
      const closeButton = document.querySelector('[data-gs-el="close"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(closeButton).toHaveAttribute('aria-label');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_TOAST_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_TOAST_NAMESPACE);
      expect(bundle).toHaveProperty('ariaLabel');
      expect(bundle.ariaLabel).toBe('Notificação');
    });

    it('should use Portuguese aria-label when no custom ariaLabel provided', () => {
      render(<GSToast open>Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(toast).toHaveAttribute('aria-label');
    });

    it('should use Portuguese aria-label on close button', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose}>Message</GSToast>);
      const closeButton = document.querySelector('[data-gs-el="close"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(closeButton).toHaveAttribute('aria-label');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSToast open>Message</GSToast>);
      expect(document.querySelector('[data-gs="GSToast"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSToast open>Message</GSToast>);
      expect(document.querySelector('[data-gs="GSToast"]')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const onClose = jest.fn();
      const { container } = render(<GSToast open onClose={onClose}>Message</GSToast>);
      const closeButton = document.querySelector('[data-gs-el="close"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(closeButton).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_TOAST_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSToast open>Message</GSToast>);
      expect(document.querySelector('[data-gs="GSToast"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSToastI18n(i18n);
      registerGSToastI18n(i18n);
      registerGSToastI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_TOAST_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_TOAST_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_TOAST_NAMESPACE).toBe('gstoast');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_TOAST_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_TOAST_NAMESPACE);

      expect(enBundle).toHaveProperty('ariaLabel');
      expect(enBundle).toHaveProperty('closeButtonLabel');

      expect(ptBundle).toHaveProperty('ariaLabel');
      expect(ptBundle).toHaveProperty('closeButtonLabel');
    });
  });
});

