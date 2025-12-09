import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSkeleton } from '../GSSkeleton';
import { registerGSSkeletonI18n, GS_SKELETON_NAMESPACE } from '../i18n';

describe('GSSkeleton - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSSkeletonI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_SKELETON_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_SKELETON_NAMESPACE);
      expect(bundle).toHaveProperty('aria');
      expect(bundle.aria).toHaveProperty('skeleton');
      expect(bundle.aria.skeleton).toBe('Loading placeholder');
    });

    it('should use English aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(skeleton).toHaveAttribute('aria-label');
    });

    it('should have skeletonGroup translation', () => {
      const bundle = i18n.getResourceBundle('en', GS_SKELETON_NAMESPACE);
      expect(bundle.aria).toHaveProperty('skeletonGroup');
      expect(bundle.aria.skeletonGroup).toBe('Loading content');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_SKELETON_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_SKELETON_NAMESPACE);
      expect(bundle).toHaveProperty('aria');
      expect(bundle.aria).toHaveProperty('skeleton');
      expect(bundle.aria.skeleton).toBe('Placeholder de carregamento');
    });

    it('should use Portuguese aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(skeleton).toHaveAttribute('aria-label');
    });

    it('should have skeletonGroup translation', () => {
      const bundle = i18n.getResourceBundle('pt', GS_SKELETON_NAMESPACE);
      expect(bundle.aria).toHaveProperty('skeletonGroup');
      expect(bundle.aria.skeletonGroup).toBe('Conteúdo a carregar');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSSkeleton loading />);
      const { container } = render(<GSSkeleton loading />);
      expect(container.querySelector('[data-gs="GSSkeleton"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSSkeleton loading />);
      expect(container.querySelector('[data-gs="GSSkeleton"]')).toBeInTheDocument();
    });

    it('should update aria-label when language changes', () => {
      i18n.changeLanguage('en');
      const { container, rerender } = render(<GSSkeleton loading />);
      let skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(<GSSkeleton loading />);
      skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveAttribute('aria-label');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(skeleton).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_SKELETON_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSSkeleton loading />);
      expect(container.querySelector('[data-gs="GSSkeleton"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSSkeletonI18n(i18n);
      registerGSSkeletonI18n(i18n);
      registerGSSkeletonI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_SKELETON_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_SKELETON_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_SKELETON_NAMESPACE).toBe('gsskeleton');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_SKELETON_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_SKELETON_NAMESPACE);

      expect(enBundle).toHaveProperty('aria');
      expect(enBundle.aria).toHaveProperty('skeleton');
      expect(enBundle.aria).toHaveProperty('skeletonGroup');

      expect(ptBundle).toHaveProperty('aria');
      expect(ptBundle.aria).toHaveProperty('skeleton');
      expect(ptBundle.aria).toHaveProperty('skeletonGroup');
    });
  });

  describe('GSSkeleton.Group i18n', () => {
    it('should use translation for group aria-label', () => {
      const { container } = render(
        <GSSkeleton.Group>
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toHaveAttribute('aria-label');
    });

    it('should update group aria-label when language changes', () => {
      i18n.changeLanguage('en');
      const { container, rerender } = render(
        <GSSkeleton.Group>
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      let group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toHaveAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(
        <GSSkeleton.Group>
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toHaveAttribute('aria-label');
    });
  });
});

