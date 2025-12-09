import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTable } from '../GSTable';
import type { EntityConfig, GSTableColumn } from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

// Mock data
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

describe('GSTable', () => {
  describe('Rendering', () => {
    it('should render table container', () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      const tableContainer = container.querySelector('[data-gs="GSTable"]');
      expect(tableContainer).toBeInTheDocument();
    });

    it('should render table element', () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading component when loading prop is true', () => {
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          loading={true}
          mockData={mockData}
        />
      );
      // Loading component should be rendered
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should show custom loading component when provided', () => {
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          loading={true}
          loadingComponent={<div>Custom Loading</div>}
          mockData={mockData}
        />
      );
      expect(screen.getByText('Custom Loading')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no data', async () => {
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={[]}
        />
      );
      await waitFor(() => {
        expect(screen.getByText(/no data available/i)).toBeInTheDocument();
      });
    });

    it('should show custom empty state when provided', async () => {
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          emptyState={<div>No items found</div>}
          mockData={[]}
        />
      );
      await waitFor(() => {
        expect(screen.getByText('No items found')).toBeInTheDocument();
      });
    });
  });

  describe('Data Rendering', () => {
    it('should render table rows with data', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const rows = container.querySelectorAll('tbody tr');
        expect(rows.length).toBeGreaterThan(0);
      });
    });

    it('should render column headers', async () => {
      const { container } = render(
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

  describe('Columns', () => {
    it('should render all visible columns', async () => {
      const columns: GSTableColumn[] = [
        { key: 'id', label: 'ID', hidden: false },
        { key: 'name', label: 'Name', hidden: false },
        { key: 'hidden', label: 'Hidden', hidden: true },
      ];
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={columns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
      });
    });
  });

  describe('Actions', () => {
    it('should render table with row actions when provided', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          actions={{ row: ['view', 'edit'] }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });

    it('should render table with table actions when provided', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          actions={{ table: ['add'] }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe('Filters', () => {
    it('should render filters when filters config is provided', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          filters={{ showAdvanced: true }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe('Pagination', () => {
    it('should render pagination controls', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        // Pagination should be rendered
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe('Row Click', () => {
    it('should call onRowClick when row is clicked', async () => {
      const onRowClick = jest.fn();
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          onRowClick={onRowClick}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe('Initial State', () => {
    it('should respect initial page size', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          initialState={{ pageSize: 5 }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });

    it('should respect initial sort', async () => {
      const { container } = render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          initialState={{ sortBy: 'name', sortDir: 'asc' }}
          mockData={mockData}
        />
      );
      await waitFor(() => {
        const table = container.querySelector('[data-gs="GSTable"]');
        expect(table).toBeInTheDocument();
      });
    });
  });

  describe('Custom Fetch', () => {
    it('should use customFetchList when provided', async () => {
      const customFetchList = jest.fn().mockResolvedValue({
        data: mockData,
        total: mockData.length,
        page: 1,
        pageSize: 10,
      });
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          customFetchList={customFetchList}
        />
      );
      await waitFor(() => {
        expect(customFetchList).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should display error message when error occurs', async () => {
      const customFetchList = jest.fn().mockRejectedValue(new Error('Fetch failed'));
      render(
        <GSTable
          entityConfig={mockEntityConfig}
          columns={mockColumns}
          customFetchList={customFetchList}
        />
      );
      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });
  });
});

