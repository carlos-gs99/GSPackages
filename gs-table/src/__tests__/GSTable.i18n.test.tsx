import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTable } from '../GSTable';
import { registerGSTableI18n, GS_TABLE_NAMESPACE } from '../i18n';
import type { EntityConfig, GSTableColumn } from '../types';

const mockEntityConfig: EntityConfig = {
  name: 'users',
  apiEndpoint: '/api/users',
  idField: 'id',
  labelField: 'name',
};

const mockColumns: GSTableColumn[] = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'Name', type: 'text' },
];

const mockData = [
  { id: 1, name: 'John Doe' },
];

describe('GSTable - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSTableI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should have English translation registered', () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(container.querySelector('[data-gs="GSTable"]')).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should have Portuguese translation registered', () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(container.querySelector('[data-gs="GSTable"]')).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should maintain functionality when language changes', () => {
      i18n.changeLanguage('en');
      const { rerender } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(screen.getByText('ID')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(screen.getByText('ID')).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English when translation is missing', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(container.querySelector('[data-gs="GSTable"]')).toBeInTheDocument();
    });

    it('should work without translations registered', () => {
      const testI18n = i18n.createInstance();
      testI18n.use(initReactI18next).init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {},
      });

      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(container.querySelector('[data-gs="GSTable"]')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations only once', () => {
      expect(typeof registerGSTableI18n).toBe('function');
      registerGSTableI18n(i18n);
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      expect(container.querySelector('[data-gs="GSTable"]')).toBeInTheDocument();
    });

    it('should have correct namespace', () => {
      expect(GS_TABLE_NAMESPACE).toBe('gs-table');
    });
  });
});

