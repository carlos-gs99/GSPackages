import React from 'react';
import clsx from 'clsx';
import { GSIcon } from '@carlos-gs99/gs-icon';
import type { GSTableColumn } from '../types';
import styles from '../styles.module.css';

interface TableHeaderProps<TData> {
  columns: GSTableColumn<TData>[];
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  toggleSort: (key: string) => void;
  hasActions?: boolean;
}

export function TableHeader<TData>({
  columns,
  sortBy,
  sortDir,
  toggleSort,
  hasActions = false,
}: TableHeaderProps<TData>) {
  return (
    <thead className={styles.tableHead}>
      <tr className={styles.tableRow}>
        {columns.filter(col => !col.hidden).map((column) => (
          <th
            key={column.key}
            className={clsx(styles.tableCell, styles.tableCellHeader)}
            style={{ width: column.width, textAlign: column.align }}
            onClick={() => column.sortable && toggleSort(column.key)}
            data-sortable={column.sortable || undefined}
          >
            <div className={styles.headerContent}>
              <span>{column.label}</span>
              {column.sortable && sortBy === column.key && (
                <GSIcon 
                  name={sortDir === 'asc' ? 'arrow-up' : 'arrow-down'} 
                  size="sm" 
                />
              )}
            </div>
          </th>
        ))}
        {hasActions && (
          <th className={clsx(styles.tableCell, styles.tableCellHeader, styles.actionsColumn)}>
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
}

