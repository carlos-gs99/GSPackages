/**
 * useGSTable - Hook principal da GSTable
 * Package-ready version (sem DataTablesAdapter)
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  GSTableState,
  GSTableColumn,
  EntityConfig,
  FetchListParams,
  FetchListResult,
} from '../types';

export interface UseGSTableParams<TData = unknown> {
  entityConfig: EntityConfig;
  columns: GSTableColumn<TData>[];
  initialPageSize?: number;
  initialSortBy?: string;
  initialSortDir?: 'asc' | 'desc';
  initialFilters?: Record<string, unknown>;
  autoLoad?: boolean;
  mockData?: TData[];
  customFetchList?: (
    params: FetchListParams & Record<string, unknown>
  ) => Promise<FetchListResult<TData>>;
}

export interface UseGSTableReturn<TData = unknown> {
  state: GSTableState<TData>;
  data: TData[];
  total: number;
  totalFiltered: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  setSorting: (sortBy: string, sortDir: 'asc' | 'desc') => void;
  toggleSort: (sortBy: string) => void;
  setGlobalFilter: (value: string) => void;
  setColumnFilter: (key: string, value: unknown) => void;
  clearFilters: () => void;
  refetch: () => Promise<void>;
  loading: boolean;
  error: Error | null;
  selectedRows: Set<string | number>;
  toggleRowSelection: (id: string | number) => void;
  selectAllRows: () => void;
  clearSelection: () => void;
}

export function useGSTable<TData = any>(
  params: UseGSTableParams<TData>
): UseGSTableReturn<TData> {
  const {
    entityConfig,
    columns,
    initialPageSize = 10,
    initialSortBy,
    initialSortDir = 'asc',
    initialFilters = {},
    autoLoad = true,
    mockData,
    customFetchList,
  } = params;

  const defaultSortBy = initialSortBy || columns.find(col => col.sortable)?.key || columns[0]?.key;

  const [state, setState] = useState<GSTableState<TData>>({
    data: mockData || [],
    total: mockData?.length || 0,
    totalFiltered: mockData?.length || 0,
    pageIndex: 0,
    pageSize: initialPageSize,
    sortBy: defaultSortBy,
    sortDir: initialSortDir,
    globalFilter: '',
    columnFilters: initialFilters,
    filterMode: 'single',
    showAdvancedFilters: false,
    loading: false,
    error: null,
    selectedRows: new Set(),
  });

  const fetchData = useCallback(async () => {
    if (mockData) {
      // Use mock data
      setState(prev => ({ ...prev, data: mockData, total: mockData.length, totalFiltered: mockData.length, loading: false }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const fetchParams: FetchListParams = {
        page: state.pageIndex + 1,
        pageSize: state.pageSize,
        sortBy: state.sortBy,
        sortDir: state.sortDir,
        search: state.globalFilter,
        filters: state.columnFilters,
      };

      let result: FetchListResult<TData>;

      if (customFetchList) {
        result = await customFetchList(fetchParams as FetchListParams & Record<string, any>);
      } else {
        // Default fetch usando fetch API
        const url = new URL(entityConfig.apiEndpoint, window.location.origin);
        Object.entries(fetchParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, String(value));
          }
        });

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        result = await response.json();
      }

      setState(prev => ({
        ...prev,
        data: result.data,
        total: result.total,
        totalFiltered: result.total,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error as Error,
        loading: false,
      }));
    }
  }, [entityConfig, state.pageIndex, state.pageSize, state.sortBy, state.sortDir, state.globalFilter, state.columnFilters, mockData, customFetchList]);

  useEffect(() => {
    if (autoLoad && !mockData) {
      fetchData();
    }
  }, [autoLoad, mockData]); // Only run on mount

  const pageCount = Math.ceil(state.totalFiltered / state.pageSize);
  const canPreviousPage = state.pageIndex > 0;
  const canNextPage = state.pageIndex < pageCount - 1;

  const setPageIndex = useCallback((index: number) => {
    setState(prev => ({ ...prev, pageIndex: Math.max(0, Math.min(index, pageCount - 1)) }));
  }, [pageCount]);

  const setPageSize = useCallback((size: number) => {
    setState(prev => ({ ...prev, pageSize: size, pageIndex: 0 }));
  }, []);

  const nextPage = useCallback(() => {
    if (canNextPage) setPageIndex(state.pageIndex + 1);
  }, [canNextPage, setPageIndex, state.pageIndex]);

  const previousPage = useCallback(() => {
    if (canPreviousPage) setPageIndex(state.pageIndex - 1);
  }, [canPreviousPage, setPageIndex, state.pageIndex]);

  const goToPage = useCallback((page: number) => {
    setPageIndex(page);
  }, [setPageIndex]);

  const setSorting = useCallback((sortBy: string, sortDir: 'asc' | 'desc') => {
    setState(prev => ({ ...prev, sortBy, sortDir, pageIndex: 0 }));
  }, []);

  const toggleSort = useCallback((sortBy: string) => {
    setState(prev => {
      const newDir = prev.sortBy === sortBy && prev.sortDir === 'asc' ? 'desc' : 'asc';
      return { ...prev, sortBy, sortDir: newDir, pageIndex: 0 };
    });
  }, []);

  const setGlobalFilter = useCallback((value: string) => {
    setState(prev => ({ ...prev, globalFilter: value, pageIndex: 0 }));
  }, []);

  const setColumnFilter = useCallback((key: string, value: unknown) => {
    setState(prev => ({
      ...prev,
      columnFilters: { ...prev.columnFilters, [key]: value },
      pageIndex: 0,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      globalFilter: '',
      columnFilters: {},
      pageIndex: 0,
    }));
  }, []);

  const toggleRowSelection = useCallback((id: string | number) => {
    setState(prev => {
      const newSelected = new Set(prev.selectedRows);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return { ...prev, selectedRows: newSelected };
    });
  }, []);

  const selectAllRows = useCallback(() => {
    const allIds = state.data.map((row: any) => row[entityConfig.idField || 'id']);
    setState(prev => ({ ...prev, selectedRows: new Set(allIds) }));
  }, [state.data, entityConfig.idField]);

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedRows: new Set() }));
  }, []);

  return {
    state,
    data: state.data,
    total: state.total,
    totalFiltered: state.totalFiltered,
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    pageCount,
    canPreviousPage,
    canNextPage,
    setPageIndex,
    setPageSize,
    nextPage,
    previousPage,
    goToPage,
    setSorting,
    toggleSort,
    setGlobalFilter,
    setColumnFilter,
    clearFilters,
    refetch: fetchData,
    loading: state.loading,
    error: state.error,
    selectedRows: state.selectedRows,
    toggleRowSelection,
    selectAllRows,
    clearSelection,
  };
}

