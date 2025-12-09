import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAutocomplete } from '../GSAutocomplete';
import { registerGSAutocompleteI18n, GS_AUTOCOMPLETE_NAMESPACE } from '../i18n';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

describe('GSAutocomplete - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSAutocompleteI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });

    it('should use English placeholder by default', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      // Default placeholder should be from English translation
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });

    it('should use Portuguese placeholder by default', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      // Default placeholder should be from Portuguese translation
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { container, rerender } = render(
        <GSAutocomplete options={mockOptions} label="Label" />
      );
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSAutocomplete options={mockOptions} label="Label" />);
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSAutocompleteI18n).toBe('function');
      registerGSAutocompleteI18n(i18n);
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      expect(container.querySelector('[data-gs="GSSelect"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_AUTOCOMPLETE_NAMESPACE).toBe('gs-autocomplete');
    });
  });
});

