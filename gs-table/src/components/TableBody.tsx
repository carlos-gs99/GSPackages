import React from 'react';
import clsx from 'clsx';
import type { GSTableColumn } from '../types';
import styles from '../styles.module.css';

interface TableBodyProps<TData> {
  data: TData[];
  columns: GSTableColumn<TData>[];
  onRowClick?: (row: TData) => void;
  renderActions?: (row: TData) => React.ReactNode;
}

export function TableBody<TData>({
  data,
  columns,
  onRowClick,
  renderActions,
}: TableBodyProps<TData>) {
  if (data.length === 0) {
    return (
      <tbody className={styles.tableBody}>
        <tr>
          <td colSpan={columns.length + (renderActions ? 1 : 0)} className={styles.emptyState}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={styles.tableBody}>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={clsx(styles.tableRow, {
            [styles.clickableRow]: Boolean(onRowClick),
          })}
          onClick={() => onRowClick?.(row)}
        >
          {columns.filter(col => !col.hidden).map((column) => {
            const value = (row as any)[column.key];
            const content = column.render ? column.render(value, row) : String(value ?? '');

            return (
              <td
                key={column.key}
                className={styles.tableCell}
                style={{ textAlign: column.align }}
              >
                {content}
              </td>
            );
          })}
          {renderActions && (
            <td className={clsx(styles.tableCell, styles.actionsCell)}>
              {renderActions(row)}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

