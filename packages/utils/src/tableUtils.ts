// ==========================================
// TABLE UTILITIES
// ==========================================

import type { ColumnDef } from '@tanstack/react-table';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { MedicosLstParams, UtentesLstParams } from 'lib/types';

/**
 * Interface para parâmetros da GSTable
 */
export interface GSTableParams {
  draw: number;
  columns: Array<{
    data: string;
    name: string;
    searchable: boolean;
    orderable: boolean;
    search: { value: string; regex: boolean };
  }>;
  order: Array<{
    column: number;
    dir: 'asc' | 'desc';
  }>;
  start: number;
  length: number;
  search: {
    value: string;
    regex: boolean;
  };
  action: string;
  lstFiltroBox: string;
  [key: string]: unknown; // Para campos específicos de cada serviço
}

/**
 * Interface para configuração de colunas de tabela
 */
export interface TableColumnConfig {
  key: string;
  label: string;
  searchable?: boolean;
  orderable?: boolean;
}

/**
 * Mapeamento de chaves de colunas
 */
export type ColumnKeyMap = Record<string, string>;

/**
 * Função para converter objeto para URL-encoded string
 * @param obj - Objeto a ser convertido
 * @returns String URL-encoded
 */
export function objectToUrlEncoded(obj: Record<string, unknown>): string {
  const formData = new URLSearchParams();
  
  // Função recursiva para lidar com objetos aninhados
  function addToFormData(key: string, value: unknown) {
    if (value === null || value === undefined) {
      return;
    }
    
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach(subKey => {
            addToFormData(`${key}[${index}][${subKey}]`, item[subKey]);
          });
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      const valueObj = value as Record<string, unknown>;
      Object.keys(valueObj).forEach(subKey => {
        addToFormData(`${key}[${subKey}]`, valueObj[subKey]);
      });
    } else {
      formData.append(key, value.toString());
    }
  }
  
  Object.keys(obj).forEach(key => {
    addToFormData(key, obj[key]);
  });
  
  return formData.toString();
}

/**
 * Deriva mapeamento de chaves de colunas
 * @param columns - Definições de colunas
 * @param overrides - Mapeamentos de override
 * @returns Mapeamento de chaves
 */
export function deriveColumnKeyMap<T>(columns: ColumnDef<T, unknown>[], overrides?: ColumnKeyMap): ColumnKeyMap {
  const map: ColumnKeyMap = {};
  const walk = (cols: ColumnDef<T, unknown>[]) => {
    cols.forEach((col) => {
      // TanStack v8: id or accessorKey
      const colWithId = col as ColumnDef<T, unknown> & { id?: string; accessorKey?: string; columns?: ColumnDef<T, unknown>[] };
      const id = colWithId.id || colWithId.accessorKey;
      if (id) {
        map[id] = overrides?.[id] ?? id;
      }
      if (colWithId.columns) {
        walk(colWithId.columns);
      }
    });
  };
  walk(columns);
  return map;
}

/**
 * Constrói payload de filtros de range para servidor
 * @param columnFilters - Filtros de coluna
 * @param columnKeyMap - Mapeamento de chaves
 * @param singleMode - Se deve copiar mesmo valor para ambos
 * @returns Payload de filtros
 */
interface ColumnFilter {
  id: string;
  value?: {
    from?: unknown;
    to?: unknown;
  } | unknown;
}

export function buildRangeFilterPayload(
  columnFilters: ColumnFilter[] | undefined,
  columnKeyMap: ColumnKeyMap,
  singleMode: boolean
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const cf of columnFilters || []) {
    const serverBase = columnKeyMap[cf.id];
    if (!serverBase) continue;
    const value = cf.value as { from?: unknown; to?: unknown } | unknown;
    if (!singleMode && value && typeof value === 'object' && value !== null && ('from' in value || 'to' in value)) {
      const rangeValue = value as { from?: unknown; to?: unknown };
      const from = rangeValue.from ?? '';
      const to = rangeValue.to ?? '';
      out[`${serverBase}_de`] = String(from);
      out[`${serverBase}_ate`] = String(to);
    } else {
      const v = value ?? '';
      out[`${serverBase}_de`] = String(v);
      out[`${serverBase}_ate`] = String(v);
    }
  }
  return out;
}

/**
 * Função genérica para converter parâmetros para GSTable
 * @param pagination - Estado de paginação
 * @param sorting - Estado de ordenação
 * @param globalFilter - Filtro global
 * @param columns - Configuração de colunas
 * @param draw - Número do draw
 * @param customFields - Campos customizados
 * @returns Parâmetros da GSTable
 */
export function convertToGSTableParams(
  pagination: { pageIndex: number; pageSize: number },
  sorting: Array<{ key: string; direction: string }>,
  globalFilter: string,
  columns: TableColumnConfig[],
  draw: number = 1,
  customFields: { [key: string]: unknown } = {}
): GSTableParams {
  // Criar mapeamento de colunas para índices
  const columnMapping: { [key: string]: number } = {};
  columns.forEach((col, index) => {
    columnMapping[col.key] = index;
  });

  // Gerar colunas no formato DataTables
  const tableColumns = columns.map((col) => ({
    data: col.key,
    name: '',
    searchable: col.searchable !== false, // Default true
    orderable: col.orderable !== false,   // Default true
    search: { value: '', regex: false }
  }));

  // Gerar ordenação baseada nas colunas configuradas
  const order = sorting.length > 0 ? sorting.map((sort) => ({
    column: columnMapping[sort.key] || 0,
    dir: (sort.direction === 'desc' ? 'desc' : 'asc') as 'desc' | 'asc'
  })) : [{ column: 0, dir: 'asc' as 'desc' | 'asc' }];

  // Criar campos de filtro para cada coluna (formato _de e _ate)
  const filterFields: { [key: string]: string } = {};
  columns.forEach((col) => {
    filterFields[`${col.key}_de`] = '';
    filterFields[`${col.key}_ate`] = '';
  });

  return {
    draw,
    columns: tableColumns,
    order,
    start: pagination.pageIndex * pagination.pageSize,
    length: pagination.pageSize,
    search: {
      value: globalFilter,
      regex: false
    },
    action: 'filter',
    lstFiltroBox: globalFilter,
    ...filterFields,
    ...customFields // Campos específicos do serviço
  };
}

// ==========================================
// SPECIFIC TABLE CONVERTERS
// ==========================================

/**
 * Função específica para ECivis
 * @param pagination - Estado de paginação
 * @param sorting - Estado de ordenação
 * @param globalFilter - Filtro global
 * @param draw - Número do draw
 * @returns Parâmetros específicos do ECivis
 */
export function convertToECivisLstParams(
  pagination: { pageIndex: number; pageSize: number },
  sorting: Array<{ key: string; direction: string }>,
  globalFilter: string,
  draw: number = 1
): GSTableParams {
  const columns: TableColumnConfig[] = [
    { key: 'c_estado_c', label: 'Código' },
    { key: 'nome', label: 'Nome' }
  ];

  return convertToGSTableParams(
    pagination,
    sorting,
    globalFilter,
    columns,
    draw,
    {
      // Campos específicos do ECivis
      c_estado_c_de: '',
      c_estado_c_ate: '',
      nome_de: '',
      nome_ate: ''
    }
  );
}

/**
 * Função específica para Sexo
 * @param pagination - Estado de paginação
 * @param sorting - Estado de ordenação
 * @param globalFilter - Filtro global
 * @param draw - Número do draw
 * @returns Parâmetros específicos do Sexo
 */
export function convertToSexoLstParams(
  pagination: { pageIndex: number; pageSize: number },
  sorting: Array<{ key: string; direction: string }>,
  globalFilter: string,
  draw: number = 1
): GSTableParams {
  const columns: TableColumnConfig[] = [
    { key: 'IDSexo', label: 'Código' },
    { key: 'Sexo', label: 'Nome' }
  ];

  return convertToGSTableParams(
    pagination,
    sorting,
    globalFilter,
    columns,
    draw,
    {
      // Campos específicos do Sexo
      IDSexo_de: '',
      IDSexo_ate: '',
      Sexo_de: '',
      Sexo_ate: ''
    }
  );
}

// ==========================================
// MEDICOS TABLE UTILITIES
// ==========================================

/**
 * Definição das colunas da tabela de médicos
 */
export const medicosColumns = [
  'c_medico', 
  'nome',
  'cod_post',
  'especialidade',
  'globalbooking',
  'inactivo',
  'c_medico' // coluna duplicada para ações
];

/**
 * Converte parâmetros para tabela de médicos
 * @param pagination - Estado de paginação
 * @param sorting - Estado de ordenação
 * @param globalFilter - Filtro global
 * @param draw - Número do draw
 * @param customFilters - Filtros customizados
 * @returns Parâmetros da tabela de médicos
 */
export function convertToMedicosLstParams(
  pagination: PaginationState,
  sorting: SortingState,
  globalFilter?: string,
  draw: number = 1,
  customFilters?: Record<string, unknown>
): MedicosLstParams {
  // Criar configuração das colunas
  const columns = medicosColumns.map((column, index) => ({
    data: column,
    name: '',
    searchable: true,
    orderable: column !== 'foto' && column !== 'inactivo', // foto e inactivo não são ordenáveis
    search: {
      value: '',
      regex: false
    }
  }));

  // Configurar ordenação
  const order = sorting.length > 0 ? [{
    column: sorting[0].id === 'c_medico' ? 1 : medicosColumns.indexOf(sorting[0].id),
    dir: sorting[0].desc ? 'desc' as const : 'asc' as const
  }] : [{
    column: 1, // ordenar por c_medico por padrão
    dir: 'asc' as const
  }];

  // Criar objeto com todos os parâmetros (baseado no payload real)
  const params: Partial<GSTableParams> & Record<string, unknown> = {
    draw,
    columns,
    order,
    start: pagination.pageIndex * pagination.pageSize,
    length: pagination.pageSize,
    search: {
      value: globalFilter || '',
      regex: false
    },
    lstFiltroBox: globalFilter || '', // String simples com o valor da pesquisa
    // Campos de filtro individuais com valores padrão (baseado no payload real)
    c_medico_de: '',
    c_medico_ate: '',
    nome_de: '',
    nome_ate: '',
    morada_de: '',
    morada_ate: '',
    c_cod_post_de: '',
    c_cod_post_ate: '',
    c_especial_de: '',
    c_especial_ate: '',
    margem_de: 0,
    margem_ate: 0,
    NaoMostrarInativos: ''
  };

  // Aplicar filtros customizados se fornecidos
  if (customFilters) {
    Object.keys(customFilters).forEach(key => {
      if (customFilters[key] !== undefined && customFilters[key] !== '') {
        params[key] = customFilters[key];
      }
    });
  }

  return params as MedicosLstParams;
}

// ==========================================
// UTENTES TABLE UTILITIES
// ==========================================

/**
 * Definição das colunas da tabela de utentes
 */
export const utentesColumns = [
  'foto',
  'c_utente', 
  'nome',
  'instit',
  'morada',
  'localidade',
  'contactelf',
  'debito',
  'c_utente' // coluna duplicada para ações
];

/**
 * Converte parâmetros para tabela de utentes
 * @param pagination - Estado de paginação
 * @param sorting - Estado de ordenação
 * @param globalFilter - Filtro global
 * @param draw - Número do draw
 * @param customFilters - Filtros customizados
 * @param overrideColumns - Colunas de override
 * @returns Parâmetros da tabela de utentes
 */
export function convertToUtentesLstParams(
  pagination: PaginationState,
  sorting: SortingState,
  globalFilter?: string,
  draw: number = 1,
  customFilters?: Record<string, unknown>,
  overrideColumns?: string[]
): UtentesLstParams {
  // Criar configuração das colunas
  const baseCols = overrideColumns && overrideColumns.length > 0 ? overrideColumns : utentesColumns;
  const columns = baseCols.map((column, index) => ({
    data: column,
    name: '',
    searchable: true,
    orderable: column !== 'foto' && column !== 'debito', // foto e debito não são ordenáveis
    search: {
      value: '',
      regex: false
    }
  }));

  // Configurar ordenação
  const order = sorting.length > 0 ? [{
    column: sorting[0].id === 'c_utente' ? 1 : baseCols.indexOf(sorting[0].id),
    dir: sorting[0].desc ? 'desc' as const : 'asc' as const
  }] : [{
    column: 1, // ordenar por c_utente por padrão
    dir: 'asc' as const
  }];

  // Criar objeto com todos os parâmetros
  const params: Partial<UtentesLstParams> & Record<string, unknown> = {
    draw,
    columns,
    order,
    start: pagination.pageIndex * pagination.pageSize,
    length: pagination.pageSize,
    search: {
      value: globalFilter || '',
      regex: false
    },
    action: 'filter',
    lstFiltroBox: globalFilter || '', // String simples com o valor da pesquisa
    // Campos de filtro individuais com valores padrão
    c_utente_de: '',
    c_utente_ate: '',
    nome_de: '',
    nome_ate: '',
    data_nasc_de: '',
    data_nasc_ate: '',
    nr_contrib_de: '',
    nr_contrib_ate: '',
    nr_utente_de: '',
    nr_utente_ate: '',
    organismo_de: '',
    organismo_ate: '',
    morada_de: '',
    morada_ate: '',
    c_cod_post_de: '',
    c_cod_post_ate: '',
    centro_de: '',
    centro_ate: '',
    nr_cartao_de: '',
    nr_cartao_ate: '',
    telemovel_de: '',
    telemovel_ate: ''
  };

  // Aplicar filtros customizados se fornecidos
  if (customFilters) {
    Object.keys(customFilters).forEach(key => {
      if (customFilters[key] !== undefined && customFilters[key] !== '') {
        params[key] = customFilters[key];
      }
    });
  }

  return params as UtentesLstParams;
}
