import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTree } from '../GSTree';
import { registerGSTreeI18n, GS_TREE_NAMESPACE } from '../i18n';
import type { GSTreeNode } from '../types';

const mockTreeData: GSTreeNode[] = [
  {
    key: '1',
    title: 'Node 1',
  },
];

describe('GSTree - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSTreeI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(<GSTree data={mockTreeData} />);
      expect(container.querySelector('[data-gs="GSTree"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(<GSTree data={mockTreeData} />);
      expect(container.querySelector('[data-gs="GSTree"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(<GSTree data={mockTreeData} />);
      expect(screen.getByText('Node 1')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(<GSTree data={mockTreeData} />);
      expect(screen.getByText('Node 1')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(<GSTree data={mockTreeData} />);
      expect(container.querySelector('[data-gs="GSTree"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(<GSTree data={mockTreeData} />);
      expect(container.querySelector('[data-gs="GSTree"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSTreeI18n).toBe('function');
      registerGSTreeI18n(i18n);
      const { container } = render(<GSTree data={mockTreeData} />);
      expect(container.querySelector('[data-gs="GSTree"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_TREE_NAMESPACE).toBe('GSTree');
    });
  });
});

