import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSInput } from '../GSInput';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

describe('GSInput - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have aria-label when label is provided', () => {
      const { container } = render(<GSInput label="Input Label" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Input Label');
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSInput error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-invalid="false" when no error', () => {
      const { container } = render(<GSInput />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via input', () => {
      const { container } = render(<GSInput />);
      const input = container.querySelector('input') as HTMLInputElement;
      input.focus();
      expect(input).toHaveFocus();
    });

    it('should be editable via keyboard', () => {
      const { container } = render(<GSInput />);
      const input = container.querySelector('input') as HTMLInputElement;
      input.focus();
      fireEvent.change(input, { target: { value: 'Typed text' } });
      expect(input).toHaveValue('Typed text');
    });
  });

  describe('Screen Reader Support', () => {
    it('should be associated with label', () => {
      render(<GSInput label="Input Label" />);
      const label = screen.getByText('Input Label');
      expect(label).toBeInTheDocument();
      const input = screen.getByLabelText('Input Label');
      expect(input).toBeInTheDocument();
    });

    it('should announce error state', () => {
      render(<GSInput error="Error message" />);
      const error = screen.getByRole('alert');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Error message');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with label', async () => {
      const { container } = render(<GSInput label="Input Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<GSInput error="Error message" label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with helper text', async () => {
      const { container } = render(<GSInput helperText="Helper text" label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<GSInput disabled label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<GSInput required label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with password toggle', async () => {
      const { container } = render(<GSInput type="password" showPasswordToggle label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

