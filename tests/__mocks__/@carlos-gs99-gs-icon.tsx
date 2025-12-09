// Mock for @carlos-gs99/gs-icon
import React from 'react';

export const GSIcon: React.FC<{
  name?: string;
  color?: string;
  size?: string;
  decorative?: boolean;
}> = ({ name, color, size, decorative, ...props }) => {
  return (
    <span
      data-testid="gs-icon"
      data-icon-name={name}
      data-icon-color={color}
      data-icon-size={size}
      data-decorative={decorative ? 'true' : undefined}
      {...props}
    >
      {name || 'icon'}
    </span>
  );
};

export default GSIcon;

