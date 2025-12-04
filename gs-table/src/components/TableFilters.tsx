import React from 'react';
import { useTranslation } from '@carlos-gs99/hooks';
import { GSInput } from '@carlos-gs99/gs-input';
import { GSButton } from '@carlos-gs99/gs-button';
import { GS_TABLE_NAMESPACE } from '../i18n';
import styles from '../styles.module.css';

interface TableFiltersProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  clearFilters: () => void;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  globalFilter,
  setGlobalFilter,
  clearFilters,
}) => {
  const { t } = useTranslation(GS_TABLE_NAMESPACE);

  return (
    <div className={styles.filters} data-gs-el="filters">
      <GSInput
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={t('table.search')}
        clearable
        onClear={clearFilters}
        size="sm"
        className={styles.searchInput}
      />
      <GSButton
        onClick={clearFilters}
        variant="outlined"
        size="sm"
        disabled={!globalFilter}
      >
        {t('table.clearFilters')}
      </GSButton>
    </div>
  );
};

