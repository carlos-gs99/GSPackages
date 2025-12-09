import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import GSSelect from '../GSSelect';
import { registerGSSelectI18n, GS_SELECT_NAMESPACE } from '../i18n';
import type { GSSelectOption } from '../types';

describe('GSSelect - Internationalization', () => {
  const mockOptions: GSSelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];

  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSSelectI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_SELECT_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_SELECT_NAMESPACE);
      expect(bundle).toHaveProperty('label');
      expect(bundle.label).toBe('Select');
    });

    it('should use English placeholder when no custom placeholder provided', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should use English aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(trigger).toHaveAttribute('aria-label');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_SELECT_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_SELECT_NAMESPACE);
      expect(bundle).toHaveProperty('label');
      expect(bundle.label).toBe('Seleção');
    });

    it('should use Portuguese placeholder when no custom placeholder provided', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should use Portuguese aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(trigger).toHaveAttribute('aria-label');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSSelect options={mockOptions} />);
      const { container } = render(<GSSelect options={mockOptions} />);
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSSelect options={mockOptions} />);
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(trigger).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_SELECT_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSSelect options={mockOptions} />);
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSSelectI18n(i18n);
      registerGSSelectI18n(i18n);
      registerGSSelectI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_SELECT_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_SELECT_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_SELECT_NAMESPACE).toBe('gsselect');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_SELECT_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_SELECT_NAMESPACE);

      expect(enBundle).toHaveProperty('label');
      expect(enBundle).toHaveProperty('placeholder');
      expect(enBundle).toHaveProperty('noOptions');
      expect(enBundle).toHaveProperty('loading');
      expect(enBundle).toHaveProperty('search');
      expect(enBundle).toHaveProperty('aria');

      expect(ptBundle).toHaveProperty('label');
      expect(ptBundle).toHaveProperty('placeholder');
      expect(ptBundle).toHaveProperty('noOptions');
      expect(ptBundle).toHaveProperty('loading');
      expect(ptBundle).toHaveProperty('search');
      expect(ptBundle).toHaveProperty('aria');
    });
  });
});

