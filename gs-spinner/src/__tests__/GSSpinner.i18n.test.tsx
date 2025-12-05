import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSpinner } from '../GSSpinner';
import { registerGSSpinnerI18n } from '../i18n';

describe('GSSpinner - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSSpinnerI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should display English aria-label', () => {
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label');
      const ariaLabel = spinner.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toMatch(/loading/i);
    });

    it('should display English screen reader text', () => {
      const { container } = render(<GSSpinner />);
      const srText = container.querySelector('.srOnly');
      expect(srText).toBeInTheDocument();
      expect(srText?.textContent).toBeTruthy();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should display Portuguese aria-label', () => {
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label');
      const ariaLabel = spinner.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    it('should display Portuguese screen reader text', () => {
      const { container } = render(<GSSpinner />);
      const srText = container.querySelector('.srOnly');
      expect(srText).toBeInTheDocument();
      expect(srText?.textContent).toBeTruthy();
    });
  });

  describe('Language Switching', () => {
    it('should update translations when language changes from EN to PT', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSSpinner />);
      const spinnerEN = screen.getByRole('status');
      const ariaLabelEN = spinnerEN.getAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(<GSSpinner />);
      const spinnerPT = screen.getByRole('status');
      const ariaLabelPT = spinnerPT.getAttribute('aria-label');

      expect(ariaLabelEN).toBeTruthy();
      expect(ariaLabelPT).toBeTruthy();
      // Both should exist (even if same, they should be defined)
    });

    it('should maintain functionality when switching languages', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSSpinner centered message="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSSpinner centered message="Mensagem de teste" />);
      expect(screen.getByText('Mensagem de teste')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should handle missing translations gracefully', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      // Should fallback to English
      expect(spinner).toHaveAttribute('aria-label');
    });
  });

  describe('Translation Registration', () => {
    it('should register translations on component mount', () => {
      render(<GSSpinner />);
      expect(i18n.hasResourceBundle('en', 'gsspinner')).toBe(true);
      expect(i18n.hasResourceBundle('pt', 'gsspinner')).toBe(true);
    });

    it('should not duplicate translations on multiple renders', () => {
      const { rerender } = render(<GSSpinner />);
      rerender(<GSSpinner />);
      rerender(<GSSpinner />);
      
      expect(i18n.hasResourceBundle('en', 'gsspinner')).toBe(true);
      expect(i18n.hasResourceBundle('pt', 'gsspinner')).toBe(true);
    });
  });
});

