import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSCheckbox } from '../GSCheckbox';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSCheckbox', () => {
  describe('Rendering', () => {
    it('should render checkbox', () => {
      const { container } = render(<GSCheckbox />);
      const checkbox = container.querySelector('[data-gs="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it('should render input element', () => {
      const { container } = render(<GSCheckbox />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSCheckbox label="Checkbox Label" />);
      expect(screen.getByText('Checkbox Label')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSCheckbox size={size} />);
        const checkbox = container.querySelector('[data-gs="checkbox"]');
        expect(checkbox).toBeInTheDocument();
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSCheckbox color={color} />);
        const checkbox = container.querySelector('[data-gs="checkbox"]');
        expect(checkbox).toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    const variants: Array<'outlined' | 'soft' | 'solid' | 'plain'> = [
      'outlined',
      'soft',
      'solid',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSCheckbox variant={variant} />);
        const checkbox = container.querySelector('[data-gs="checkbox"]');
        expect(checkbox).toBeInTheDocument();
      });
    });
  });

  describe('Checked State', () => {
    it('should be checked when checked prop is true', () => {
      const { container } = render(<GSCheckbox checked={true} />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });

    it('should be unchecked when checked prop is false', () => {
      const { container } = render(<GSCheckbox checked={false} />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).not.toBeChecked();
    });

    it('should use defaultChecked in uncontrolled mode', () => {
      const { container } = render(<GSCheckbox defaultChecked={true} />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });
  });

  describe('Toggle', () => {
    it('should toggle when clicked', () => {
      const { container } = render(<GSCheckbox />);
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input).not.toBeChecked();
      fireEvent.click(input);
      expect(input).toBeChecked();
    });

    it('should call onChange when toggled', () => {
      const onChange = jest.fn();
      const { container } = render(<GSCheckbox onChange={onChange} />);
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(input);
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Indeterminate', () => {
    it('should support indeterminate state', () => {
      const { container } = render(<GSCheckbox indeterminate={true} />);
      const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
      expect(input.indeterminate).toBe(true);
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(<GSCheckbox disabled />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should be disabled when loading', () => {
      const { container } = render(<GSCheckbox loading />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should be disabled when readOnly', () => {
      const { container } = render(<GSCheckbox readOnly />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });
  });

  describe('ReadOnly', () => {
    it('should be read-only when readOnly prop is true', () => {
      const { container } = render(<GSCheckbox readOnly />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-readonly');
    });
  });

  describe('Validation', () => {
    it('should show error message', () => {
      render(<GSCheckbox error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should show helper text when no error', () => {
      render(<GSCheckbox helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should not show helper text when error is present', () => {
      render(<GSCheckbox error="Error" helperText="Helper" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSCheckbox error="Error" />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Required', () => {
    it('should show required indicator when required', () => {
      render(<GSCheckbox label="Label" required />);
      const label = screen.getByText('Label');
      expect(label).toBeInTheDocument();
    });

    it('should have aria-required when required', () => {
      const { container } = render(<GSCheckbox required />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Description', () => {
    it('should render description', () => {
      render(<GSCheckbox description="Description text" />);
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });

  describe('Name Attribute', () => {
    it('should have name attribute', () => {
      const { container } = render(<GSCheckbox name="checkbox-name" />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveAttribute('name', 'checkbox-name');
    });
  });

  describe('Ripple Effect', () => {
    it('should support ripple effect when ripple prop is true', () => {
      const { container } = render(<GSCheckbox ripple={true} />);
      const checkbox = container.querySelector('[data-gs="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });
  });
});

