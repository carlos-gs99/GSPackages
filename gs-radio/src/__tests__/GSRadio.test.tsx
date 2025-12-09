import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSRadio } from '../GSRadio';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSRadio', () => {
  describe('Rendering', () => {
    it('should render radio button', () => {
      const { container } = render(<GSRadio value="1" />);
      const radio = container.querySelector('[data-gs="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSRadio value="1" label="Radio Label" />);
      expect(screen.getByText('Radio Label')).toBeInTheDocument();
    });

    it('should render input element', () => {
      const { container } = render(<GSRadio value="1" />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSRadio value="1" size={size} />);
        const radio = container.querySelector('[data-gs="radio"]');
        expect(radio).toBeInTheDocument();
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSRadio value="1" color={color} />);
        const radio = container.querySelector('[data-gs="radio"]');
        expect(radio).toHaveAttribute('data-color', color);
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
        const { container } = render(<GSRadio value="1" variant={variant} />);
        const radio = container.querySelector('[data-gs="radio"]');
        expect(radio).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Checked State', () => {
    it('should be unchecked by default', () => {
      const { container } = render(<GSRadio value="1" />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).not.toBeChecked();
    });

    it('should be checked when checked prop is true', () => {
      const { container } = render(<GSRadio value="1" checked />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeChecked();
    });

    it('should use defaultChecked for uncontrolled mode', () => {
      const { container } = render(<GSRadio value="1" defaultChecked />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeChecked();
    });
  });

  describe('Selection', () => {
    it('should call onChange when clicked', () => {
      const onChange = jest.fn();
      const { container } = render(<GSRadio value="1" onChange={onChange} />);
      const input = container.querySelector('input[type="radio"]');
      fireEvent.click(input!);
      expect(onChange).toHaveBeenCalledWith('1');
    });

    it('should not call onChange when already checked', () => {
      const onChange = jest.fn();
      const { container } = render(<GSRadio value="1" checked onChange={onChange} />);
      const input = container.querySelector('input[type="radio"]');
      fireEvent.click(input!);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(<GSRadio value="1" disabled />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const onChange = jest.fn();
      const { container } = render(<GSRadio value="1" disabled onChange={onChange} />);
      const input = container.querySelector('input[type="radio"]');
      fireEvent.click(input!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should have data-disabled attribute when disabled', () => {
      const { container } = render(<GSRadio value="1" disabled />);
      const radio = container.querySelector('[data-gs="radio"]');
      expect(radio).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('Loading', () => {
    it('should be disabled when loading', () => {
      const { container } = render(<GSRadio value="1" loading />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeDisabled();
    });

    it('should have data-loading attribute when loading', () => {
      const { container } = render(<GSRadio value="1" loading />);
      const radio = container.querySelector('[data-gs="radio"]');
      expect(radio).toHaveAttribute('data-loading', 'true');
    });
  });

  describe('ReadOnly', () => {
    it('should have data-readonly attribute when readOnly', () => {
      const { container } = render(<GSRadio value="1" readOnly />);
      const radio = container.querySelector('[data-gs="radio"]');
      expect(radio).toHaveAttribute('data-readonly', 'true');
    });

    it('should not call onChange when readOnly', () => {
      const onChange = jest.fn();
      const { container } = render(<GSRadio value="1" readOnly onChange={onChange} />);
      const input = container.querySelector('input[type="radio"]');
      fireEvent.click(input!);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Validation', () => {
    it('should show error message', () => {
      render(<GSRadio value="1" error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should show helper text when no error', () => {
      render(<GSRadio value="1" helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSRadio value="1" error="Error" />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Required', () => {
    it('should have aria-required when required', () => {
      const { container } = render(<GSRadio value="1" required />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Name Attribute', () => {
    it('should have name attribute when provided', () => {
      const { container } = render(<GSRadio value="1" name="radio-group" />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('name', 'radio-group');
    });
  });

  describe('Ripple Effect', () => {
    it('should support ripple effect when ripple is true', () => {
      const { container } = render(<GSRadio value="1" ripple />);
      const radio = container.querySelector('[data-gs="radio"]');
      expect(radio).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have aria-checked attribute', () => {
      const { container } = render(<GSRadio value="1" checked />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-checked', 'true');
    });

    it('should have aria-disabled when disabled', () => {
      const { container } = render(<GSRadio value="1" disabled />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have aria-readonly when readOnly', () => {
      const { container } = render(<GSRadio value="1" readOnly />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-readonly', 'true');
    });

    it('should have aria-busy when loading', () => {
      const { container } = render(<GSRadio value="1" loading />);
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute('aria-busy', 'true');
    });
  });
});

