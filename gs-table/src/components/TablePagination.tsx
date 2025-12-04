import React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { GSButton } from '@carlos-gs99/gs-button';
import { GSSelect } from '@carlos-gs99/gs-select';
import { GS_TABLE_NAMESPACE } from '../i18n';
import styles from '../styles.module.css';

interface TablePaginationProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  total: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  pageIndex,
  pageSize,
  pageCount,
  total,
  canPreviousPage,
  canNextPage,
  setPageIndex,
  setPageSize,
  nextPage,
  previousPage,
  goToPage,
}) => {
  const { t } = useTranslation(GS_TABLE_NAMESPACE);

  const pageSizeOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];

  const from = pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div className={styles.pagination} data-gs-el="pagination">
      <div className={styles.paginationInfo}>
        <span>{from}-{to} {t('table.of')} {total}</span>
      </div>

      <div className={styles.paginationControls}>
        <span className={styles.paginationLabel}>{t('table.rowsPerPage')}</span>
        <GSSelect
          value={pageSize}
          onChange={(val) => setPageSize(Number(val))}
          options={pageSizeOptions}
          size="sm"
          className={styles.paginationSelect}
        />
        
        <div className={styles.paginationButtons}>
          <GSButton
            onClick={() => goToPage(0)}
            disabled={!canPreviousPage}
            variant="outlined"
            size="sm"
            ariaLabel={t('table.first')}
          >
            {'<<'}
          </GSButton>
          <GSButton
            onClick={previousPage}
            disabled={!canPreviousPage}
            variant="outlined"
            size="sm"
            ariaLabel={t('table.previous')}
          >
            {'<'}
          </GSButton>
          <span className={styles.paginationPage}>
            {t('table.page')} {pageIndex + 1} {t('table.of')} {pageCount}
          </span>
          <GSButton
            onClick={nextPage}
            disabled={!canNextPage}
            variant="outlined"
            size="sm"
            ariaLabel={t('table.next')}
          >
            {'>'}
          </GSButton>
          <GSButton
            onClick={() => goToPage(pageCount - 1)}
            disabled={!canNextPage}
            variant="outlined"
            size="sm"
            ariaLabel={t('table.last')}
          >
            {'>>'}
          </GSButton>
        </div>
      </div>
    </div>
  );
};

