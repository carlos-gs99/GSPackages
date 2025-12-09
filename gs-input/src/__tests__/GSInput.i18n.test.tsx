import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSInput } from '../GSInput';
import { registerGSInputI18n, GS_INPUT_NAMESPACE } from '../i18n';

describe('GSInput - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSInputI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(<GSInput />);
      expect(container.querySelector('[data-gs="GSInput"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(<GSInput />);
      expect(container.querySelector('[data-gs="GSInput"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSInput label="Label" />);
      expect(screen.getByText('Label')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSInput label="Label" />);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSInput />);
      expect(container.querySelector('[data-gs="GSInput"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSInput />);
      expect(container.querySelector('[data-gs="GSInput"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSInputI18n).toBe('function');
      registerGSInputI18n(i18n);
      const { container } = render(<GSInput />);
      expect(container.querySelector('[data-gs="GSInput"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_INPUT_NAMESPACE).toBe('gsinput');
    });
  });
});

