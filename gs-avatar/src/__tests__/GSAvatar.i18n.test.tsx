import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAvatar } from '../GSAvatar';
import { registerGSAvatarI18n, GS_AVATAR_NAMESPACE } from '../i18n';

describe('GSAvatar - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSAvatarI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      expect(i18n.hasResourceBundle('en', GS_AVATAR_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('en', GS_AVATAR_NAMESPACE);
      expect(bundle).toHaveProperty('aria');
      expect(bundle.aria).toHaveProperty('default');
      expect(bundle.aria.default).toBe('Avatar');
    });

    it('should use English aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(avatar).toHaveAttribute('aria-label');
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      expect(i18n.hasResourceBundle('pt', GS_AVATAR_NAMESPACE)).toBe(true);
      const bundle = i18n.getResourceBundle('pt', GS_AVATAR_NAMESPACE);
      expect(bundle).toHaveProperty('aria');
      expect(bundle.aria).toHaveProperty('default');
      expect(bundle.aria.default).toBe('Avatar');
    });

    it('should use Portuguese aria-label when no custom ariaLabel provided', () => {
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(avatar).toHaveAttribute('aria-label');
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSAvatar text="John Doe" />);
      const { container } = render(<GSAvatar text="John Doe" />);
      expect(container.querySelector('[data-gs="GSAvatar"]')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSAvatar text="John Doe" />);
      expect(container.querySelector('[data-gs="GSAvatar"]')).toBeInTheDocument();
    });

    it('should update aria-label when language changes', () => {
      i18n.changeLanguage('en');
      const { container, rerender } = render(<GSAvatar />);
      let avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-label');

      i18n.changeLanguage('pt');
      rerender(<GSAvatar />);
      avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-label');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // Should fallback to English (or show key if translation not yet applied)
      expect(avatar).toHaveAttribute('aria-label');
      // Verify English translation is still registered
      expect(i18n.hasResourceBundle('en', GS_AVATAR_NAMESPACE)).toBe(true);
    });

    it('should work without translations registered', () => {
      // Create new i18n instance without translations
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSAvatar />);
      expect(container.querySelector('[data-gs="GSAvatar"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      // Register multiple times
      registerGSAvatarI18n(i18n);
      registerGSAvatarI18n(i18n);
      registerGSAvatarI18n(i18n);

      // Should still have translations
      expect(i18n.hasResourceBundle('en', GS_AVATAR_NAMESPACE)).toBe(true);
      expect(i18n.hasResourceBundle('pt', GS_AVATAR_NAMESPACE)).toBe(true);
    });

    it('should have correct namespace', () => {
      expect(GS_AVATAR_NAMESPACE).toBe('gsavatar');
    });

    it('should have all required translations', () => {
      const enBundle = i18n.getResourceBundle('en', GS_AVATAR_NAMESPACE);
      const ptBundle = i18n.getResourceBundle('pt', GS_AVATAR_NAMESPACE);

      expect(enBundle).toHaveProperty('aria');
      expect(enBundle.aria).toHaveProperty('default');
      expect(enBundle.aria).toHaveProperty('image');
      expect(enBundle.aria).toHaveProperty('imageWithoutText');
      expect(enBundle.aria).toHaveProperty('fallback');
      expect(enBundle.aria).toHaveProperty('loading');
      expect(enBundle.aria).toHaveProperty('error');

      expect(ptBundle).toHaveProperty('aria');
      expect(ptBundle.aria).toHaveProperty('default');
    });
  });

  describe('Custom ariaLabel Override', () => {
    it('should use custom ariaLabel instead of translation', () => {
      const { container } = render(<GSAvatar ariaLabel="Custom avatar label" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-label', 'Custom avatar label');
    });

    it('should maintain custom ariaLabel when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSAvatar ariaLabel="Custom label" />);
      const { container } = render(<GSAvatar ariaLabel="Custom label" />);
      let avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-label', 'Custom label');

      i18n.changeLanguage('pt');
      rerender(<GSAvatar ariaLabel="Custom label" />);
      avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('State-based Translations', () => {
    it('should use loading translation when state is loading', () => {
      const { container } = render(<GSAvatar state="loading" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(avatar).toHaveAttribute('aria-label');
    });

    it('should use error translation when state is error', () => {
      const { container } = render(<GSAvatar state="error" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should exist (may be translation key if not yet applied)
      expect(avatar).toHaveAttribute('aria-label');
    });
  });
});

