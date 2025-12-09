import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSInput } from '../GSInput';

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

describe('GSInput', () => {
  describe('Rendering', () => {
    it('should render input', () => {
      const { container } = render(<GSInput />);
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });

    it('should render input element', () => {
      const { container } = render(<GSInput />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSInput label="Input Label" />);
      expect(screen.getByText('Input Label')).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      const { container } = render(<GSInput placeholder="Enter text..." />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('placeholder', 'Enter text...');
    });
  });

  describe('Variants', () => {
    const variants: Array<'outlined' | 'filled' | 'soft' | 'solid' | 'plain'> = [
      'outlined',
      'filled',
      'soft',
      'solid',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSInput variant={variant} />);
        const input = container.querySelector('[data-gs="GSInput"]');
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSInput size={size} />);
        const input = container.querySelector('[data-gs="GSInput"]');
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSInput color={color} />);
        const input = container.querySelector('[data-gs="GSInput"]');
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('Value', () => {
    it('should use value prop in controlled mode', () => {
      const { container } = render(<GSInput value="Controlled value" />);
      const input = container.querySelector('input');
      expect(input).toHaveValue('Controlled value');
    });

    it('should use defaultValue in uncontrolled mode', () => {
      const { container } = render(<GSInput defaultValue="Default value" />);
      const input = container.querySelector('input');
      expect(input).toHaveValue('Default value');
    });

    it('should call onChange when value changes', () => {
      const onChange = jest.fn();
      const { container } = render(<GSInput onChange={onChange} />);
      const input = container.querySelector('input');
      fireEvent.change(input!, { target: { value: 'New value' } });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Input Types', () => {
    const types: Array<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'> = [
      'text',
      'email',
      'password',
      'number',
      'tel',
      'url',
    ];

    types.forEach((type) => {
      it(`should render ${type} type correctly`, () => {
        const { container } = render(<GSInput type={type} />);
        const input = container.querySelector('input');
        expect(input).toHaveAttribute('type', type);
      });
    });
  });

  describe('Password Toggle', () => {
    it('should show password toggle when showPasswordToggle is true and type is password', () => {
      const { container } = render(<GSInput type="password" showPasswordToggle />);
      const toggleButton = container.querySelector('[data-gs-el="password-toggle"]');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should toggle password visibility when toggle button is clicked', () => {
      const { container } = render(<GSInput type="password" showPasswordToggle />);
      const input = container.querySelector('input');
      const toggleButton = container.querySelector('[data-gs-el="password-toggle"]');
      
      expect(input).toHaveAttribute('type', 'password');
      fireEvent.click(toggleButton!);
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(<GSInput disabled />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });

    it('should be disabled when loading', () => {
      const { container } = render(<GSInput loading />);
      const input = container.querySelector('input');
      expect(input).toBeDisabled();
    });
  });

  describe('ReadOnly', () => {
    it('should be read-only when readOnly prop is true', () => {
      const { container } = render(<GSInput readOnly value="Read only" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('Validation', () => {
    it('should show error message', () => {
      render(<GSInput error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should show helper text when no error', () => {
      render(<GSInput helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should not show helper text when error is present', () => {
      render(<GSInput error="Error" helperText="Helper" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSInput error="Error" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Required', () => {
    it('should show required indicator when required', () => {
      render(<GSInput label="Label" required />);
      const label = screen.getByText('Label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Character Count', () => {
    it('should show character count when showCharCount is true', () => {
      const { container } = render(
        <GSInput value="Test" showCharCount maxLength={10} />
      );
      // Character count is rendered in a div with class charCount
      const counter = container.querySelector('.charCount') || 
                      container.querySelector('[class*="charCount"]');
      expect(counter).toBeInTheDocument();
    });
  });

  describe('Clearable', () => {
    it('should show clear button when clearable and has value', () => {
      const { container } = render(<GSInput value="Text" clearable />);
      const clearButton = container.querySelector('[data-gs-el="clear"]');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not show clear button when no value', () => {
      const { container } = render(<GSInput clearable />);
      const clearButton = container.querySelector('[data-gs-el="clear"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should call onClear when clear button is clicked', () => {
      const onClear = jest.fn();
      const { container } = render(<GSInput value="Text" clearable onClear={onClear} />);
      const clearButton = container.querySelector('[data-gs-el="clear"]');
      fireEvent.click(clearButton!);
      expect(onClear).toHaveBeenCalled();
    });
  });

  describe('Copyable', () => {
    it('should show copy button when copyable and has value', () => {
      const { container } = render(<GSInput value="Text" copyable />);
      const copyButton = container.querySelector('[data-gs-el="copy"]');
      expect(copyButton).toBeInTheDocument();
    });

    it('should not show copy button when no value', () => {
      const { container } = render(<GSInput copyable />);
      const copyButton = container.querySelector('[data-gs-el="copy"]');
      expect(copyButton).not.toBeInTheDocument();
    });

    it('should copy to clipboard when copy button is clicked', async () => {
      const { container } = render(<GSInput value="Text to copy" copyable />);
      const copyButton = container.querySelector('[data-gs-el="copy"]');
      fireEvent.click(copyButton!);
      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Text to copy');
      });
    });
  });

  describe('Decorators', () => {
    it('should render startDecorator', () => {
      const { container } = render(<GSInput startDecorator={<span>Start</span>} />);
      // Decorator is rendered in a span with class decorator
      const decorator = container.querySelector('.decorator') || 
                        container.querySelector('[class*="decorator"]');
      expect(decorator).toBeInTheDocument();
      expect(decorator).toHaveTextContent('Start');
    });

    it('should render endDecorator', () => {
      const { container } = render(<GSInput endDecorator={<span>End</span>} />);
      // Decorator is rendered in a span with class decorator
      const decorator = container.querySelector('.decorator') || 
                        container.querySelector('[class*="decorator"]');
      expect(decorator).toBeInTheDocument();
      expect(decorator).toHaveTextContent('End');
    });

    it('should render prefix', () => {
      const { container } = render(<GSInput prefix="€" />);
      // Prefix is rendered in a span with class prefix
      const prefix = container.querySelector('.prefix') || 
                     container.querySelector('[class*="prefix"]');
      expect(prefix).toBeInTheDocument();
      expect(prefix).toHaveTextContent('€');
    });

    it('should render suffix', () => {
      const { container } = render(<GSInput suffix="kg" />);
      // Suffix is rendered in a span with class suffix
      const suffix = container.querySelector('.suffix') || 
                     container.querySelector('[class*="suffix"]');
      expect(suffix).toBeInTheDocument();
      expect(suffix).toHaveTextContent('kg');
    });
  });

  describe('Floating Label', () => {
    it('should render floating label when floatingLabel is true', () => {
      const { container } = render(<GSInput label="Label" floatingLabel />);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Max Length', () => {
    it('should respect maxLength attribute', () => {
      const { container } = render(<GSInput maxLength={10} />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('maxLength', '10');
    });
  });
});

