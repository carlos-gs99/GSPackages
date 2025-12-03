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

describe('GSButton - i18n', () => {
  it('renders button', () => {
    render(<GSButton>Submit</GSButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });
});
