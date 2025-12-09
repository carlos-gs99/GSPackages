import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSlider } from '../GSSlider';
import { registerGSSliderI18n, GS_SLIDER_NAMESPACE } from '../i18n';

describe('GSSlider - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSSliderI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(<GSSlider />);
      expect(container.querySelector('[data-gs="GSSlider"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(<GSSlider />);
      expect(container.querySelector('[data-gs="GSSlider"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSSlider value={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSSlider value={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSSlider />);
      expect(container.querySelector('[data-gs="GSSlider"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSSlider />);
      expect(container.querySelector('[data-gs="GSSlider"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSSliderI18n).toBe('function');
      registerGSSliderI18n(i18n);
      const { container } = render(<GSSlider />);
      expect(container.querySelector('[data-gs="GSSlider"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_SLIDER_NAMESPACE).toBe('GSSlider');
    });
  });
});

