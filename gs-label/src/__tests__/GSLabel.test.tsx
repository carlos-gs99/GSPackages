import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSLabel } from '../GSLabel';
import { GS_LABEL_SIZES } from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSLabel', () => {
  describe('Rendering', () => {
    it('should render label with default props', () => {
      render(<GSLabel>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('data-gs', 'GSLabel');
    });

    it('should render label with custom className', () => {
      render(<GSLabel className="custom-label">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('custom-label');
    });

    it('should render label with htmlFor attribute', () => {
      render(<GSLabel htmlFor="input-id">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'input-id');
    });

    it('should render empty label when no children provided', () => {
      const { container } = render(<GSLabel />);
      const label = container.querySelector('[data-gs="GSLabel"]');
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe('');
    });
  });

  describe('Size Variants', () => {
    GS_LABEL_SIZES.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(<GSLabel size={size}>Test Label</GSLabel>);
        const label = screen.getByText('Test Label');
        expect(label).toHaveAttribute('data-size', size);
      });
    });

    it('should default to sm size when invalid size provided', () => {
      render(<GSLabel size={'invalid' as any}>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('data-size', 'sm');
    });
  });

  describe('Required State', () => {
    it('should show required indicator when required is true', () => {
      render(<GSLabel required>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('data-required', 'true');
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
    });

    it('should not show required indicator when required is false', () => {
      render(<GSLabel required={false}>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('data-required');
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('should not show required indicator when reserved is true', () => {
      render(<GSLabel required reserved>Test Label</GSLabel>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should render disabled label correctly', () => {
      render(<GSLabel disabled>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('data-disabled', 'true');
    });

    it('should not have disabled attribute when disabled is false', () => {
      render(<GSLabel disabled={false}>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('data-disabled');
    });
  });

  describe('Reserved State', () => {
    it('should render reserved label correctly', () => {
      const { container } = render(<GSLabel reserved>Test Label</GSLabel>);
      const label = container.querySelector('[data-gs="GSLabel"]');
      expect(label).toHaveAttribute('data-reserved', 'true');
      expect(label).toHaveAttribute('aria-hidden', 'true');
    });

    it('should show non-breaking space when reserved is true', () => {
      const { container } = render(<GSLabel reserved>Test Label</GSLabel>);
      const label = container.querySelector('[data-gs="GSLabel"]');
      expect(label?.textContent).toBe('\u00A0');
    });

    it('should not have reserved attribute when reserved is false', () => {
      render(<GSLabel reserved={false}>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('data-reserved');
      expect(label).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Helper Text', () => {
    it('should render helper text correctly', () => {
      render(<GSLabel helperText="Helper information">Test Label</GSLabel>);
      const helper = screen.getByText('ⓘ Helper information');
      expect(helper).toBeInTheDocument();
      expect(helper).toHaveAttribute('role', 'note');
    });

    it('should have data-has-helper attribute when helperText is provided', () => {
      render(<GSLabel helperText="Helper">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('data-has-helper', 'true');
    });

    it('should not show helper text when reserved is true', () => {
      render(<GSLabel helperText="Helper" reserved>Test Label</GSLabel>);
      expect(screen.queryByText('ⓘ Helper')).not.toBeInTheDocument();
    });

    it('should generate helper id when helperText is provided', () => {
      render(<GSLabel htmlFor="input-id" helperText="Helper">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      const helper = screen.getByText('ⓘ Helper');
      expect(label).toHaveAttribute('aria-describedby', 'input-id-helper');
      expect(helper).toHaveAttribute('id', 'input-id-helper');
    });

    it('should use default helper id when htmlFor is not provided', () => {
      render(<GSLabel helperText="Helper">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('aria-describedby', 'gslabel-helper');
    });
  });

  describe('Custom Color', () => {
    it('should apply custom color via CSS variable', () => {
      render(<GSLabel color="#ff0000">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveStyle({ '--gs-label-color': '#ff0000' });
    });

    it('should not set color variable when color is not provided', () => {
      render(<GSLabel>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveStyle({ '--gs-label-color': expect.anything() });
    });
  });

  describe('Debug Mode', () => {
    it('should have data-debug attribute when debug is true', () => {
      render(<GSLabel debug>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('data-debug', 'true');
    });

    it('should not have data-debug attribute when debug is false', () => {
      render(<GSLabel debug={false}>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('data-debug');
    });
  });

  describe('ARIA Attributes', () => {
    it('should apply custom aria-label when provided', () => {
      render(<GSLabel ariaLabel="Custom label">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should not have aria-label when not provided', () => {
      render(<GSLabel>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('aria-label');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to label element', () => {
      const ref = React.createRef<HTMLLabelElement>();
      render(<GSLabel ref={ref}>Test Label</GSLabel>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current).toHaveAttribute('data-gs', 'GSLabel');
    });
  });
});

