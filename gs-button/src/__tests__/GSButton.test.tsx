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

describe('GSButton', () => {
  it('renders button with text', () => {
    render(<GSButton>Click me</GSButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('renders with data-gs attribute', () => {
    render(<GSButton>Test</GSButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-gs', 'GSButton');
  });

  it('applies variant attribute', () => {
    render(<GSButton variant="outlined">Test</GSButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outlined');
  });

  it('applies color attribute', () => {
    render(<GSButton color="primary">Test</GSButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-color', 'primary');
  });

  it('applies size attribute', () => {
    render(<GSButton size="lg">Test</GSButton>);
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg');
  });
});
