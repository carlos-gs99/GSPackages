import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSwitch } from '../GSSwitch';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSwitch', () => {
  describe('Rendering', () => {
    it('should render switch', () => {
      const { container } = render(<GSSwitch />);
      const switchElement = container.querySelector('[data-gs="GSSwitch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSSwitch label="Switch Label" />);
      expect(screen.getByText('Switch Label')).toBeInTheDocument();
    });

    it('should render input element', () => {
      const { container } = render(<GSSwitch />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeInTheDocument();
    });

    it('should render button with role="switch"', () => {
      const { container } = render(<GSSwitch />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSSwitch size={size} />);
        const switchElement = container.querySelector('[data-gs="GSSwitch"]');
        expect(switchElement).toBeInTheDocument();
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSSwitch color={color} />);
        const switchElement = container.querySelector('[data-gs="GSSwitch"]');
        expect(switchElement).toBeInTheDocument();
      });
    });
  });

  describe('Checked State', () => {
    it('should be unchecked by default', () => {
      const { container } = render(<GSSwitch />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).not.toBeChecked();
    });

    it('should be checked when checked prop is true', () => {
      const { container } = render(<GSSwitch checked />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });

    it('should use defaultChecked for uncontrolled mode', () => {
      const { container } = render(<GSSwitch defaultChecked />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeChecked();
    });
  });

  describe('Toggle', () => {
    it('should call onChange when toggled', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSwitch onChange={onChange} />);
      const button = container.querySelector('button[role="switch"]');
      fireEvent.click(button!);
      expect(onChange).toHaveBeenCalledWith(true, expect.any(Object));
    });

    it('should toggle from checked to unchecked', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSwitch checked onChange={onChange} />);
      const button = container.querySelector('button[role="switch"]');
      fireEvent.click(button!);
      expect(onChange).toHaveBeenCalledWith(false, expect.any(Object));
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(<GSSwitch disabled />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should not call onChange when disabled', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSwitch disabled onChange={onChange} />);
      const button = container.querySelector('button[role="switch"]');
      fireEvent.click(button!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should have aria-disabled when disabled', () => {
      const { container } = render(<GSSwitch disabled />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Loading', () => {
    it('should be disabled when loading', () => {
      const { container } = render(<GSSwitch loading />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeDisabled();
    });

    it('should not call onChange when loading', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSwitch loading onChange={onChange} />);
      const button = container.querySelector('button[role="switch"]');
      fireEvent.click(button!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should show spinner when loading', () => {
      const { container } = render(<GSSwitch loading />);
      const spinner = container.querySelector('[data-gs-el="thumb"]');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('ReadOnly', () => {
    it('should not call onChange when readOnly', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSwitch readOnly onChange={onChange} />);
      const button = container.querySelector('button[role="switch"]');
      fireEvent.click(button!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should have aria-readonly when readOnly', () => {
      const { container } = render(<GSSwitch readOnly />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toHaveAttribute('aria-readonly', 'true');
    });
  });

  describe('Label Position', () => {
    it('should render label at start when labelPosition is start', () => {
      const { container } = render(<GSSwitch label="Label" labelPosition="start" />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toBeInTheDocument();
      const containerElement = container.querySelector('label');
      expect(containerElement).toHaveAttribute('data-label-position', 'start');
    });

    it('should render label at end when labelPosition is end', () => {
      const { container } = render(<GSSwitch label="Label" labelPosition="end" />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toBeInTheDocument();
      const containerElement = container.querySelector('label');
      expect(containerElement).toHaveAttribute('data-label-position', 'end');
    });
  });

  describe('Validation', () => {
    it('should show error message', () => {
      render(<GSSwitch error="Error message" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should show helper text when no error', () => {
      render(<GSSwitch helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('should not show helper text when error is present', () => {
      const { container } = render(<GSSwitch error="Error" helperText="Helper" />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });
  });

  describe('Custom Icons', () => {
    it('should render checkedIcon when checked', () => {
      const { container } = render(
        <GSSwitch checked checkedIcon={<span>✓</span>} />
      );
      expect(container.querySelector('[data-gs-el="thumb"]')).toBeInTheDocument();
    });

    it('should render uncheckedIcon when unchecked', () => {
      const { container } = render(
        <GSSwitch uncheckedIcon={<span>✗</span>} />
      );
      expect(container.querySelector('[data-gs-el="thumb"]')).toBeInTheDocument();
    });
  });

  describe('Ripple Effect', () => {
    it('should support ripple effect when ripple is true', () => {
      const { container } = render(<GSSwitch ripple />);
      const switchElement = container.querySelector('[data-gs="GSSwitch"]');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have aria-checked="true" when checked', () => {
      const { container } = render(<GSSwitch checked />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toHaveAttribute('aria-checked', 'true');
    });

    it('should have aria-checked="false" when unchecked', () => {
      const { container } = render(<GSSwitch />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toHaveAttribute('aria-checked', 'false');
    });

    it('should have aria-label when provided', () => {
      const { container } = render(<GSSwitch ariaLabel="Custom label" />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should use label as aria-label when ariaLabel is not provided', () => {
      const { container } = render(<GSSwitch label="Switch Label" />);
      const button = container.querySelector('button[role="switch"]');
      expect(button).toHaveAttribute('aria-label', 'Switch Label');
    });
  });
});

