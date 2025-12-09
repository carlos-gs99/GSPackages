// Mock for @carlos-gs99/gs-button
import React from 'react';

export const GSButton: React.FC<{
  variant?: string;
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
}> = ({ variant, color, onClick, children, ...props }) => {
  return (
    <button
      data-testid="gs-button"
      data-variant={variant}
      data-color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default GSButton;

