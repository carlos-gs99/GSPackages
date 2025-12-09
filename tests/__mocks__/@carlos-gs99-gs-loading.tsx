// Mock for @carlos-gs99/gs-loading
import React from 'react';

export const GSLoading: React.FC<{
  mode?: string;
  message?: string;
  [key: string]: any;
}> = ({ mode, message, ...props }) => {
  return (
    <div
      data-testid="gs-loading"
      data-mode={mode}
      data-message={message}
      {...props}
    >
      {message || 'Loading...'}
    </div>
  );
};

export default GSLoading;

