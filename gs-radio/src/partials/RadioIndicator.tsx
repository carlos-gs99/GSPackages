import React from 'react';
import styles from '../styles.module.css';
import type { GSRadioSize } from '../types';

export interface RadioIndicatorProps {
  checked: boolean;
  size: GSRadioSize;
}

const DOT_SCALE: Record<GSRadioSize, number> = {
  sm: 0.5,
  md: 0.55,
  lg: 0.6,
};

export const RadioIndicator: React.FC<RadioIndicatorProps> = ({ checked, size }) => {
  const scale = DOT_SCALE[size];

  return (
    <span className={styles.radioIndicator} data-checked={checked || undefined}>
      <span
        className={styles.radioDot}
        style={{
          transform: checked ? `scale(${scale})` : 'scale(0)',
          opacity: checked ? 1 : 0,
        }}
      />
    </span>
  );
};

