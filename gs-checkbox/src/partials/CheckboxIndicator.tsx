import React from 'react';
import styles from '../styles.module.css';

export interface CheckboxIndicatorProps {
  checked: boolean;
  indeterminate: boolean;
  loading: boolean;
  size: 'sm' | 'md' | 'lg';
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
}

const ICON_SIZE: Record<'sm' | 'md' | 'lg', number> = {
  sm: 10,
  md: 14,
  lg: 18,
};

export const CheckboxIndicator: React.FC<CheckboxIndicatorProps> = ({
  checked,
  indeterminate,
  loading,
  size,
  checkedIcon,
  uncheckedIcon,
  indeterminateIcon,
}) => {
  const iconSize = ICON_SIZE[size];

  if (loading) {
    return (
      <div className={styles.checkboxSpinnerOverlay}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (indeterminate) {
    if (indeterminateIcon) return <>{indeterminateIcon}</>;
    
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 12 12" fill="none" className={styles.checkboxIcon}>
        <path d="M2 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (checked) {
    if (checkedIcon) return <>{checkedIcon}</>;
    
    return (
      <svg width={iconSize} height={iconSize} viewBox="0 0 12 12" fill="none" className={styles.checkboxIcon}>
        <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (uncheckedIcon) return <>{uncheckedIcon}</>;
  
  return null;
};

