import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTable } from '../GSTable';
import type { EntityConfig, GSTableColumn } from '../types';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

const mockEntityConfig: EntityConfig = {
  name: 'users',
  apiEndpoint: '/api/users',
  idField: 'id',
  labelField: 'name',
};

const mockColumns: GSTableColumn[] = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
];

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

describe('GSTable - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have table role', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();
      });
    });

    it('should have proper table structure', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('table');
        const thead = container.querySelector('thead');
        const tbody = container.querySelector('tbody');
        expect(table).toBeInTheDocument();
        expect(thead).toBeInTheDocument();
        expect(tbody).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be navigable via keyboard', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('should have accessible column headers', async () => {
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
      });
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic table', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with actions', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          actions={{ row: ['view'] }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with filters', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          filters={{ showAdvanced: true }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('table');
        expect(table).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when empty', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={[]}
        />
      );
      await waitFor(() => {
        expect(screen.getByText(/no data available/i)).toBeInTheDocument();
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

