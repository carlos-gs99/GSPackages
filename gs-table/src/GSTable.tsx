import { useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/utils';
import { GSLoading } from '@carlos-gs99/gs-loading';
import { useGSTable } from './hooks/useGSTable';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';
import { TablePagination } from './components/TablePagination';
import { TableFilters } from './components/TableFilters';
import { registerGSTableI18n, GS_TABLE_NAMESPACE } from './i18n';
import { applyColumnDefaults, applyActionDefaults } from './utils/defaults';
import type { GSTableProps } from './types';
import styles from './styles.module.css';

export function GSTable<TData = any>(props: GSTableProps<TData>) {
  const {
    entityConfig,
    columns: rawColumns,
    actions,
    initialState,
    onRowClick,
    loading: externalLoading,
    loadingComponent,
    emptyState,
    className,
    mockData,
    customFetchList,
    debug = false,
  } = props;

  const { t, i18n } = useTranslation(GS_TABLE_NAMESPACE);
  registerGSTableI18n(i18n);

  const debugTools = useDebug('GSTable', debug);

  const columns = rawColumns.map(applyColumnDefaults);

  const processedActions = actions
    ? applyActionDefaults(actions, entityConfig, true, t)
    : { table: [], row: [], config: {}, custom: [], allActions: [] };

  const table = useGSTable<TData>({
    entityConfig,
    columns,
    initialPageSize: initialState?.pageSize,
    initialSortBy: initialState?.sortBy,
    initialSortDir: initialState?.sortDir,
    initialFilters: initialState?.filters,
    mockData,
    customFetchList,
  });

  useEffect(() => {
    debugTools.log('render', { 
      dataCount: table.data.length,
      page: table.pageIndex,
      loading: table.loading,
    });
  }, [debugTools, table.data.length, table.pageIndex, table.loading]);

  const isLoading = externalLoading || table.loading;

  const hasRowActions = processedActions.row && processedActions.row.length > 0;

  const renderRowActions = (_row: TData) => {
    if (!hasRowActions) return null;
    return (
      <div className={styles.rowActions}>
        {/* Row actions buttons would go here */}
        <span>•••</span>
      </div>
    );
  };

  if (isLoading) {
    return loadingComponent || (
      <div className={styles.loadingContainer}>
        <GSLoading mode="section" message={t('table.loading')} />
      </div>
    );
  }

  if (table.error) {
    return (
      <div className={styles.errorContainer}>
        {t('table.error')}: {table.error.message}
      </div>
    );
  }

  return (
    <div 
      className={clsx(styles.tableContainer, className)} 
      data-gs="GSTable"
      data-debug={debug ? 'true' : undefined}
    >
      <TableFilters
        globalFilter={table.state.globalFilter || ''}
        setGlobalFilter={table.setGlobalFilter}
        clearFilters={table.clearFilters}
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader
            columns={columns}
            sortBy={table.state.sortBy}
            sortDir={table.state.sortDir}
            toggleSort={table.toggleSort}
            hasActions={hasRowActions}
          />
          <TableBody
            data={table.data}
            columns={columns}
            onRowClick={onRowClick}
            renderActions={hasRowActions ? renderRowActions : undefined}
          />
        </table>
      </div>

      {table.data.length === 0 && !isLoading && (
        <div className={styles.emptyState}>
          {emptyState || t('table.empty')}
        </div>
      )}

      <TablePagination
        pageIndex={table.pageIndex}
        pageSize={table.pageSize}
        pageCount={table.pageCount}
        total={table.total}
        canPreviousPage={table.canPreviousPage}
        canNextPage={table.canNextPage}
        setPageIndex={table.setPageIndex}
        setPageSize={table.setPageSize}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
        goToPage={table.goToPage}
      />
    </div>
  );
}

GSTable.displayName = 'GSTable';

export default GSTable;

