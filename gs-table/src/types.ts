/**
 * GSTable - Types & Interfaces (Package-ready)
 */

import type React from 'react';

// ===== ENTITY CONFIG (simplified for package) =====

export interface EntityConfig {
  name: string;
  apiEndpoint: string;
  idField?: string;
  labelField?: string;
}

export interface FetchListParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface FetchListResult<TData = any> {
  data: TData[];
  total: number;
  page: number;
  pageSize: number;
}

// ===== COLUMN CONFIGURATION =====

export type ColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'boolean'
  | 'image'
  | 'email'
  | 'url'
  | 'select'
  | 'custom';

export type ColumnAlign = 'left' | 'center' | 'right';

export type FilterType =
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'custom';

export interface GSTableColumn<TData = unknown> {
  key: string;
  label: string;
  type?: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
  width?: string | number;
  align?: ColumnAlign;
  render?: (value: unknown, row: TData) => React.ReactNode;
  filterType?: FilterType;
  filterOptions?: Array<{ value: unknown; label: string }>;
  filterComponent?: React.ComponentType<Record<string, unknown>>;
  priority?: number;
  description?: string;
  className?: string;
}

// ===== ACTION CONFIGURATION =====

export type ActionType = 'table' | 'row';
export type StandardActionKey = 'view' | 'edit' | 'add' | 'delete';

export interface GSTableAction<TData = unknown> {
  key: string;
  type: ActionType;
  enabled?: boolean;
  icon?: string;
  label?: string;
  modal?: boolean;
  confirmMessage?: string | ((row: TData) => string);
  onClick?: (row: TData) => void | Promise<void>;
  permission?: string | ((row: TData) => boolean);
  hidden?: (row: TData) => boolean;
  disabled?: (row: TData) => boolean;
  formComponent?: React.ComponentType<FormComponentProps<TData>>;
  formFields?: FormField[];
  autoGenerateForm?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
}

export interface FormComponentProps<TData = unknown> {
  row?: TData;
  onSave: (data: Partial<TData>) => Promise<void>;
  onCancel: () => void;
  mode: 'add' | 'edit' | 'view';
}

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea' | 'email' | 'url';
  required?: boolean;
  validation?: unknown;
  options?: Array<{ value: unknown; label: string }>;
  mask?: string;
  placeholder?: string;
  defaultValue?: unknown;
}

// ===== ACTIONS CONFIG =====

export interface GSTableActionsConfig<TData = unknown> {
  table?: Array<StandardActionKey | string>;
  row?: Array<StandardActionKey | string>;
  config?: Record<string, Partial<GSTableAction<TData>>>;
  custom?: Array<GSTableAction<TData>>;
}

// ===== FILTERS CONFIGURATION =====

export type FilterMode = 'single' | 'range';

export interface GSTableFiltersConfig {
  mode?: FilterMode;
  showAdvanced?: boolean;
  collapsible?: boolean;
  custom?: CustomFilter[];
  persist?: boolean;
  persistKey?: string;
}

export interface CustomFilter {
  key: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select' | 'date';
  defaultValue?: unknown;
  options?: Array<{ value: unknown; label: string }>;
  component?: React.ComponentType<Record<string, unknown>>;
}

// ===== PERMISSIONS =====

export interface GSTablePermissions<TData = unknown> {
  view?: boolean | ((row: TData) => boolean);
  edit?: boolean | ((row: TData) => boolean);
  add?: boolean | (() => boolean);
  delete?: boolean | ((row: TData) => boolean);
}

// ===== INITIAL STATE =====

export interface GSTableInitialState {
  pageSize?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// ===== MAIN PROPS =====

export interface GSTableProps<TData = any> {
  entityConfig: EntityConfig;
  columns: GSTableColumn<TData>[];
  actions?: GSTableActionsConfig<TData>;
  filters?: GSTableFiltersConfig;
  initialState?: GSTableInitialState;
  onRowClick?: (row: TData) => void;
  onTableAction?: (action: GSTableAction<TData>) => void;
  onRowAction?: (action: GSTableAction<TData>, row: TData) => void;
  onError?: (error: Error) => void;
  onSuccess?: (action: string, data: TData) => void;
  permissions?: GSTablePermissions<TData>;
  autoPermissions?: boolean;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  debug?: boolean;
  mockData?: TData[];
  customFetchList?: (
    params: FetchListParams & Record<string, any>
  ) => Promise<FetchListResult<TData>>;
}

// ===== INTERNAL STATE =====

export interface GSTableState<TData = any> {
  data: TData[];
  total: number;
  totalFiltered: number;
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  globalFilter?: string;
  columnFilters: Record<string, any>;
  filterMode: FilterMode;
  showAdvancedFilters: boolean;
  loading: boolean;
  error: Error | null;
  selectedRows: Set<string | number>;
}

// ===== ACTION DEFAULTS =====

export const ACTION_DEFAULTS: Record<
  StandardActionKey,
  Partial<GSTableAction>
> = {
  view: {
    type: 'row',
    icon: 'eye',
    label: 'View',
    color: 'primary',
    modal: true,
    autoGenerateForm: false,
  },
  edit: {
    type: 'row',
    icon: 'pencil',
    label: 'Edit',
    color: 'primary',
    modal: true,
    autoGenerateForm: true,
  },
  add: {
    type: 'table',
    icon: 'plus',
    color: 'success',
    modal: true,
    autoGenerateForm: true,
  },
  delete: {
    type: 'row',
    icon: 'delete',
    label: 'Delete',
    color: 'danger',
    modal: false,
    confirmMessage: 'Are you sure you want to delete this item?',
  },
};

// ===== COLUMN DEFAULTS =====

export const COLUMN_DEFAULTS: Partial<GSTableColumn> = {
  type: 'text',
  sortable: true,
  filterable: true,
  hidden: false,
  width: 'auto',
  align: 'left',
  priority: 999,
};

