import React from 'react';
import { GSButton } from '@carlos-gs99/gs-button';

export interface GSPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const GSPagination: React.FC<GSPaginationProps> = ({ page, pageCount, onPageChange }) => {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} data-gs="GSPagination">
      <GSButton onClick={() => onPageChange(page - 1)} disabled={page === 1} size="sm">
        {'<'}
      </GSButton>
      <span style={{ fontSize: '0.875rem' }}>
        Page {page} of {pageCount}
      </span>
      <GSButton onClick={() => onPageChange(page + 1)} disabled={page === pageCount} size="sm">
        {'>'}
      </GSButton>
    </div>
  );
};

export default GSPagination;

