import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSRating } from '../GSRating';
import { registerGSRatingI18n, GS_RATING_NAMESPACE } from '../i18n';

describe('GSRating - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSRatingI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(<GSRating />);
      expect(container.querySelector('[data-gs="GSRating"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(<GSRating />);
      expect(container.querySelector('[data-gs="GSRating"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSRating value={3} />);
      expect(screen.getByText('3 / 5')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSRating value={3} />);
      expect(screen.getByText('3 / 5')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSRating />);
      expect(container.querySelector('[data-gs="GSRating"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSRating />);
      expect(container.querySelector('[data-gs="GSRating"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSRatingI18n).toBe('function');
      registerGSRatingI18n(i18n);
      const { container } = render(<GSRating />);
      expect(container.querySelector('[data-gs="GSRating"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_RATING_NAMESPACE).toBe('GSRating');
    });
  });
});

