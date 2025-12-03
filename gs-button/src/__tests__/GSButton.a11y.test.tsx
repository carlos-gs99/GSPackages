import React from 'react';
import { render, screen } from '@testing-library/react';
import GSButton from '../GSButton';

// Mock all dependencies
jest.mock('@carlos-gs99/hooks', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
    language: 'en',
    registerBundle: jest.fn(),
  })),
}));

jest.mock('@carlos-gs99/utils', () => ({
  useDebug: jest.fn(() => false),
  generateAriaAttributes: jest.fn(() => ({})),
  useFocusManagement: jest.fn(() => ({ focusRef: null })),
}));

jest.mock('@carlos-gs99/primitives', () => ({
  ButtonBase: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe('GSButton - Accessibility', () => {
  it('renders with role button', () => {
    render(<GSButton>Test</GSButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies aria-label', () => {
    render(<GSButton aria-label="Custom label">Test</GSButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
  });

  it('is disabled when disabled prop is true', () => {
    render(<GSButton disabled>Test</GSButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
