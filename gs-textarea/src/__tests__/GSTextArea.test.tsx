import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTextArea } from '../GSTextArea';

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

describe('GSTextArea', () => {
  describe('Rendering', () => {
    it('should render textarea', () => {
      const { container } = render(<GSTextArea />);
      const textarea = container.querySelector('[data-gs="GSTextArea"]');
      expect(textarea).toBeInTheDocument();
    });

    it('should render textarea element', () => {
      const { container } = render(<GSTextArea />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSTextArea label="Textarea Label" />);
      expect(screen.getByText('Textarea Label')).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      const { container } = render(<GSTextArea placeholder="Enter text..." />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('placeholder', 'Enter text...');
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
        const { container } = render(<GSTextArea variant={variant} />);
        const textarea = container.querySelector('[data-gs="GSTextArea"]');
        expect(textarea).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSTextArea size={size} />);
        const textarea = container.querySelector('[data-gs="GSTextArea"]');
        expect(textarea).toBeInTheDocument();
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSTextArea color={color} />);
        const textarea = container.querySelector('[data-gs="GSTextArea"]');
        expect(textarea).toBeInTheDocument();
      });
    });
  });

  describe('Value', () => {
    it('should use value prop in controlled mode', () => {
      const { container } = render(<GSTextArea value="Controlled value" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue('Controlled value');
    });

    it('should use defaultValue in uncontrolled mode', () => {
      const { container } = render(<GSTextArea defaultValue="Default value" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveValue('Default value');
    });

    it('should call onChange when value changes', () => {
      const onChange = jest.fn();
      const { container } = render(<GSTextArea onChange={onChange} />);
      const textarea = container.querySelector('textarea');
      fireEvent.change(textarea!, { target: { value: 'New value' } });
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(<GSTextArea disabled />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
    });

    it('should be disabled when loading', () => {
      const { container } = render(<GSTextArea loading />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeDisabled();
    });
  });

  describe('ReadOnly', () => {
    it('should be read-only when readOnly prop is true', () => {
      const { container } = render(<GSTextArea readOnly value="Read only" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('readOnly');
    });
  });

  describe('Validation', () => {
    it('should show error message', () => {
      render(<GSTextArea error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should show helper text when no error', () => {
      render(<GSTextArea helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should not show helper text when error is present', () => {
      render(<GSTextArea error="Error" helperText="Helper" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSTextArea error="Error" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Required', () => {
    it('should show required indicator when required', () => {
      render(<GSTextArea label="Label" required />);
      const label = screen.getByText('Label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Counters', () => {
    it('should show character count when showCharCount is true', () => {
      const { container } = render(
        <GSTextArea value="Test" showCharCount maxLength={10} />
      );
      const counter = container.querySelector('[data-gs-el="counters"]');
      expect(counter).toBeInTheDocument();
    });

    it('should show word count when showWordCount is true', () => {
      const { container } = render(
        <GSTextArea value="Test words" showWordCount />
      );
      const counter = container.querySelector('[data-gs-el="counters"]');
      expect(counter).toBeInTheDocument();
    });

    it('should show line count when showLineCount is true', () => {
      const { container } = render(
        <GSTextArea value="Line 1\nLine 2" showLineCount />
      );
      const counter = container.querySelector('[data-gs-el="counters"]');
      expect(counter).toBeInTheDocument();
    });
  });

  describe('Clearable', () => {
    it('should show clear button when clearable and has value', () => {
      const { container } = render(<GSTextArea value="Text" clearable />);
      const clearButton = container.querySelector('[data-gs-el="clear"]');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not show clear button when no value', () => {
      const { container } = render(<GSTextArea clearable />);
      const clearButton = container.querySelector('[data-gs-el="clear"]');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should call onClear when clear button is clicked', () => {
      const onClear = jest.fn();
      const { container } = render(<GSTextArea value="Text" clearable onClear={onClear} />);
      const clearButton = container.querySelector('[data-gs-el="clear"]');
      fireEvent.click(clearButton!);
      expect(onClear).toHaveBeenCalled();
    });
  });

  describe('Copyable', () => {
    it('should show copy button when copyable and has value', () => {
      const { container } = render(<GSTextArea value="Text" copyable />);
      const copyButton = container.querySelector('[data-gs-el="copy"]');
      expect(copyButton).toBeInTheDocument();
    });

    it('should not show copy button when no value', () => {
      const { container } = render(<GSTextArea copyable />);
      const copyButton = container.querySelector('[data-gs-el="copy"]');
      expect(copyButton).not.toBeInTheDocument();
    });

    it('should copy to clipboard when copy button is clicked', async () => {
      const { container } = render(<GSTextArea value="Text to copy" copyable />);
      const copyButton = container.querySelector('[data-gs-el="copy"]');
      fireEvent.click(copyButton!);
      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Text to copy');
      });
    });
  });

  describe('Floating Label', () => {
    it('should render floating label when floatingLabel is true', () => {
      const { container } = render(<GSTextArea label="Label" floatingLabel />);
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Auto Resize', () => {
    it('should support auto resize when autoResize is true', () => {
      const { container } = render(<GSTextArea autoResize />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
    });
  });

  describe('Max Length', () => {
    it('should respect maxLength attribute', () => {
      const { container } = render(<GSTextArea maxLength={10} />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('maxLength', '10');
    });
  });

  describe('Rows', () => {
    it('should use rows prop', () => {
      const { container } = render(<GSTextArea rows={5} />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });
});

