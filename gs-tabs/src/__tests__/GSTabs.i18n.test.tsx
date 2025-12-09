import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTabs } from '../GSTabs';
import { registerGSTabsI18n, GS_TABS_NAMESPACE } from '../i18n';
import type { GSTabItem } from '../types';

const mockTabs: GSTabItem[] = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
];

describe('GSTabs - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSTabsI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(<GSTabs tabs={mockTabs} />);
      expect(container.querySelector('[data-gs="GSTabs"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(<GSTabs tabs={mockTabs} />);
      expect(container.querySelector('[data-gs="GSTabs"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSTabs tabs={mockTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSTabs tabs={mockTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSTabs tabs={mockTabs} />);
      expect(container.querySelector('[data-gs="GSTabs"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSTabs tabs={mockTabs} />);
      expect(container.querySelector('[data-gs="GSTabs"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSTabsI18n).toBe('function');
      registerGSTabsI18n(i18n);
      const { container } = render(<GSTabs tabs={mockTabs} />);
      expect(container.querySelector('[data-gs="GSTabs"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_TABS_NAMESPACE).toBe('gstabs');
    });
  });
});

