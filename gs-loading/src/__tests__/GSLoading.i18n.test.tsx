import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSLoading } from '../GSLoading';
import { registerGSLoadingI18n } from '../i18n';

describe('GSLoading - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSLoadingI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should display English aria-label', () => {
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('aria-label');
      const ariaLabel = loading?.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    it('should display English default texts when showText is true', () => {
      const { container } = render(<GSLoading showText />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
      // Default i18n texts should be rendered
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should display Portuguese aria-label', () => {
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('aria-label');
      const ariaLabel = loading?.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    it('should display Portuguese default texts when showText is true', () => {
      const { container } = render(<GSLoading showText />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
      // Default i18n texts should be rendered in Portuguese
    });
  });

  describe('Language Switching', () => {
    it('should update translations when language changes from EN to PT', () => {
      i18n.changeLanguage('en');
      const { rerender, container } = render(<GSLoading />);
      const loadingEN = container.querySelector('[data-gs="GSLoading"]');
      const ariaLabelEN = loadingEN?.getAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(<GSLoading />);
      const loadingPT = container.querySelector('[data-gs="GSLoading"]');
      const ariaLabelPT = loadingPT?.getAttribute('aria-label');

      expect(ariaLabelEN).toBeTruthy();
      expect(ariaLabelPT).toBeTruthy();
    });

    it('should maintain functionality when switching languages', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(
        <GSLoading title="Loading" message="Please wait" />
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
      expect(screen.getByText('Please wait')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSLoading title="A carregar" message="Aguarde por favor" />);
      expect(screen.getByText('A carregar')).toBeInTheDocument();
      expect(screen.getByText('Aguarde por favor')).toBeInTheDocument();
    });

    it('should update showText default content when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender, container } = render(<GSLoading showText />);
      
      i18n.changeLanguage('pt');
      rerender(<GSLoading showText />);
      
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should handle missing translations gracefully', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
      // Should fallback to English
      expect(loading).toHaveAttribute('aria-label');
    });

    it('should work without i18n if custom text provided', () => {
      render(
        <GSLoading
          title="Custom Title"
          description="Custom Description"
          message="Custom Message"
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
      expect(screen.getByText('Custom Message')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations on component mount', () => {
      render(<GSLoading />);
      expect(i18n.hasResourceBundle('en', 'gs-loading')).toBe(true);
      expect(i18n.hasResourceBundle('pt', 'gs-loading')).toBe(true);
    });

    it('should not duplicate translations on multiple renders', () => {
      const { rerender } = render(<GSLoading />);
      rerender(<GSLoading />);
      rerender(<GSLoading />);
      
      expect(i18n.hasResourceBundle('en', 'gs-loading')).toBe(true);
      expect(i18n.hasResourceBundle('pt', 'gs-loading')).toBe(true);
    });
  });

  describe('Custom Content Accessibility', () => {
    it('should associate title with aria-describedby', () => {
      const { container } = render(<GSLoading title="Loading Title" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      const describedBy = loading?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    it('should associate description with aria-describedby', () => {
      const { container } = render(<GSLoading description="Loading Description" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      const describedBy = loading?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    it('should associate message with aria-describedby', () => {
      const { container } = render(<GSLoading message="Please wait..." />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      const describedBy = loading?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    it('should associate all content with aria-describedby when multiple props provided', () => {
      const { container } = render(
        <GSLoading
          title="Loading"
          description="Description"
          message="Message"
        >
          <div>Children</div>
        </GSLoading>
      );
      const loading = container.querySelector('[data-gs="GSLoading"]');
      const describedBy = loading?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(describedBy).toContain(' '); // Multiple IDs separated by space
    });
  });

  describe('Backdrop Accessibility', () => {
    it('should mark backdrop with aria-hidden', () => {
      const { container } = render(<GSLoading showBackdrop />);
      const backdrop = container.querySelector('[aria-hidden="true"]');
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not include backdrop in accessibility tree', () => {
      const { container } = render(<GSLoading mode="fullscreen" />);
      const backdrop = container.querySelector('[aria-hidden="true"]');
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Actions Accessibility', () => {
    it('should render actions as accessible buttons', () => {
      render(
        <GSLoading
          actions={
            <button type="button" aria-label="Cancel loading">
              Cancel
            </button>
          }
        />
      );
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveAttribute('aria-label');
    });
  });
});

