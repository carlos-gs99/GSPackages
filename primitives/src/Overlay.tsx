import React from 'react';
import styles from './overlay.module.css';

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ children, className, ...rest }) => {
  return (
    <div className={`${styles.overlay}${className ? ' ' + className : ''}`} {...rest}>
      {children}
    </div>
  );
};

export default Overlay;
