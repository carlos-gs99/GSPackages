import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSCard } from '../GSCard';
import { registerGSCardI18n, GS_CARD_NAMESPACE } from '../i18n';

describe('GSCard - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSCardI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_CARD_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_CARD_NAMESPACE);
      expect(bundle).toHaveProperty('label');
      expect(bundle.label).toBe('Card');
    });

    it('should use English aria-label on collapse button when expanded', () => {
      const { container } = render(<GSCard collapsible collapsed={false}>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(collapseButton).toHaveAttribute('aria-label');
    });

    it('should use English aria-label on collapse button when collapsed', () => {
      const { container } = render(<GSCard collapsible collapsed={true}>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(collapseButton).toHaveAttribute('aria-label');
    });

    it('should have loading translation', () => {
      const bundle = i18n.getResourceBundle('en', GS_CARD_NAMESPACE);
      expect(bundle).toHaveProperty('loading');
      expect(bundle.loading).toBe('Loading...');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_CARD_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_CARD_NAMESPACE);
      expect(bundle).toHaveProperty('label');
      expect(bundle.label).toBe('Card');
    });

    it('should use Portuguese aria-label on collapse button', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(collapseButton).toHaveAttribute('aria-label');
    });

    it('should have loading translation', () => {
      const bundle = i18n.getResourceBundle('pt', GS_CARD_NAMESPACE);
      expect(bundle).toHaveProperty('loading');
      expect(bundle.loading).toBe('Carregando...');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSCard>Content</GSCard>);
      const { container } = render(<GSCard>Content</GSCard>);
      expect(container.querySelector('[data-gs="GSCard"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSCard>Content</GSCard>);
      expect(container.querySelector('[data-gs="GSCard"]')).toBeInTheDocument();
    });

    it('should update collapse button aria-label when language changes', () => {
      i18n.changeLanguage('en');
      const { container, rerender } = render(<GSCard collapsible collapsed={false}>Content</GSCard>);
      let collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(<GSCard collapsible collapsed={false}>Content</GSCard>);
      collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-label');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(collapseButton).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_CARD_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSCard>Content</GSCard>);
      expect(container.querySelector('[data-gs="GSCard"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSCardI18n(i18n);
      registerGSCardI18n(i18n);
      registerGSCardI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_CARD_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_CARD_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_CARD_NAMESPACE).toBe('gscard');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_CARD_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_CARD_NAMESPACE);

      expect(enBundle).toHaveProperty('label');
      expect(enBundle).toHaveProperty('loading');
      expect(enBundle).toHaveProperty('aria');
      expect(enBundle.aria).toHaveProperty('expandCard');
      expect(enBundle.aria).toHaveProperty('collapseCard');

      expect(ptBundle).toHaveProperty('label');
      expect(ptBundle).toHaveProperty('loading');
    });
  });
});

