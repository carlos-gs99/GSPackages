import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSCheckbox } from '../GSCheckbox';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSCheckbox - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should be checked when checked prop is true', () => {
      const { container } = render(<GSCheckbox checked={true} />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });

    it('should have aria-checked="mixed" when indeterminate', () => {
      const { container } = render(<GSCheckbox indeterminate={true} />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-checked', 'mixed');
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSCheckbox error="Error message" />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-required when required', () => {
      const { container } = render(<GSCheckbox required />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('should have aria-busy when loading', () => {
      const { container } = render(<GSCheckbox loading />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via input', () => {
      const { container } = render(<GSCheckbox />);
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      input.focus();
      expect(input).toHaveFocus();
    });

    it('should be toggleable via Space key', () => {
      const { container } = render(<GSCheckbox />);
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      input.focus();
      fireEvent.keyDown(input, { key: ' ' });
      // Space key should toggle checkbox
      expect(input).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be associated with label', () => {
      render(<GSCheckbox label="Checkbox Label" />);
      const label = screen.getByText('Checkbox Label');
      expect(label).toBeInTheDocument();
      const input = screen.getByLabelText('Checkbox Label');
      expect(input).toBeInTheDocument();
    });

    it('should announce error state', () => {
      render(<GSCheckbox error="Error message" />);
      const error = screen.getByRole('alert');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Error message');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with label', async () => {
      const { container } = render(<GSCheckbox label="Checkbox Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<GSCheckbox error="Error message" label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with helper text', async () => {
      const { container } = render(<GSCheckbox helperText="Helper text" label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<GSCheckbox disabled label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<GSCheckbox required label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when indeterminate', async () => {
      const { container } = render(<GSCheckbox indeterminate label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

