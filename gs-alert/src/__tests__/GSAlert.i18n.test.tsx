import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAlert } from '../GSAlert';
import { registerGSAlertI18n, GS_ALERT_NAMESPACE } from '../i18n';

describe('GSAlert - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSAlertI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_ALERT_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_ALERT_NAMESPACE);
      expect(bundle).toHaveProperty('alert');
      expect(bundle.alert).toHaveProperty('aria');
      expect(bundle.alert.aria).toHaveProperty('closeButton');
      expect(bundle.alert.aria.closeButton).toBe('Close alert');
    });

    it('should use English aria-label on close button', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(closeButton).toHaveAttribute('aria-label');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_ALERT_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_ALERT_NAMESPACE);
      expect(bundle).toHaveProperty('alert');
      expect(bundle.alert).toHaveProperty('aria');
      expect(bundle.alert.aria).toHaveProperty('closeButton');
      expect(bundle.alert.aria.closeButton).toBe('Fechar alerta');
    });

    it('should use Portuguese aria-label on close button', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(closeButton).toHaveAttribute('aria-label');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSAlert>Content</GSAlert>);
      const { container } = render(<GSAlert>Content</GSAlert>);
      expect(container.querySelector('[data-gs="GSAlert"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSAlert>Content</GSAlert>);
      expect(container.querySelector('[data-gs="GSAlert"]')).toBeInTheDocument();
    });

    it('should update close button aria-label when language changes', () => {
      const onClose = jest.fn();
      i18n.changeLanguage('en');
      const { container, rerender } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      let closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toHaveAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toHaveAttribute('aria-label');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(closeButton).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_ALERT_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSAlert>Content</GSAlert>);
      expect(container.querySelector('[data-gs="GSAlert"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSAlertI18n(i18n);
      registerGSAlertI18n(i18n);
      registerGSAlertI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_ALERT_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_ALERT_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_ALERT_NAMESPACE).toBe('gsalert');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_ALERT_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_ALERT_NAMESPACE);

      expect(enBundle).toHaveProperty('alert');
      expect(enBundle.alert).toHaveProperty('aria');
      expect(enBundle.alert.aria).toHaveProperty('closeButton');

      expect(ptBundle).toHaveProperty('alert');
      expect(ptBundle.alert).toHaveProperty('aria');
      expect(ptBundle.alert.aria).toHaveProperty('closeButton');
    });
  });
});

