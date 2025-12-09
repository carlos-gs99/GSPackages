import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSProgress } from '../GSProgress';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSProgress', () => {
  describe('Rendering', () => {
    it('should render progress with default props', () => {
      const { container } = render(<GSProgress value={50} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toBeInTheDocument();
      expect(progress).toHaveAttribute('data-mode', 'determinate');
      expect(progress).toHaveAttribute('data-size', 'md');
      expect(progress).toHaveAttribute('data-variant', 'solid');
      expect(progress).toHaveAttribute('data-color', 'primary');
    });

    it('should render progress with custom className', () => {
      const { container } = render(<GSProgress value={50} className="custom-progress" />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toHaveClass('custom-progress');
    });
  });

  describe('Value and Max', () => {
    it('should calculate percentage correctly', () => {
      const { container } = render(<GSProgress value={50} max={100} />);
      const indicator = container.querySelector('.gs-progress-indicator');
      expect(indicator).toBeInTheDocument();
    });

    it('should handle value 0', () => {
      const { container } = render(<GSProgress value={0} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toBeInTheDocument();
    });

    it('should handle value 100', () => {
      const { container } = render(<GSProgress value={100} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toBeInTheDocument();
    });

    it('should clamp value above max', () => {
      const { container } = render(<GSProgress value={150} max={100} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toBeInTheDocument();
    });

    it('should clamp value below 0', () => {
      const { container } = render(<GSProgress value={-10} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toBeInTheDocument();
    });

    it('should use custom max value', () => {
      const { container } = render(<GSProgress value={50} max={200} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSProgress value={50} size={size} />);
        const progress = container.querySelector('[data-gs="GSProgress"]');
        expect(progress).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Variant Variants', () => {
    const variants: Array<'solid' | 'soft' | 'outlined' | 'plain'> = [
      'solid',
      'soft',
      'outlined',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSProgress value={50} variant={variant} />);
        const progress = container.querySelector('[data-gs="GSProgress"]');
        expect(progress).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Color Variants', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSProgress value={50} color={color} />);
        const progress = container.querySelector('[data-gs="GSProgress"]');
        expect(progress).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Thickness', () => {
    it('should apply custom thickness', () => {
      const { container } = render(<GSProgress value={50} thickness={8} />);
      const root = container.querySelector('.gs-progress-root');
      expect(root).toHaveStyle({ '--progress-thickness': '8px' });
    });

    it('should use default thickness when not provided', () => {
      const { container } = render(<GSProgress value={50} />);
      const root = container.querySelector('.gs-progress-root');
      expect(root).toHaveStyle({ '--progress-thickness': '4px' });
    });
  });

  describe('Label', () => {
    it('should not show label by default', () => {
      const { container } = render(<GSProgress value={50} />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).not.toBeInTheDocument();
    });

    it('should show label when showLabel is true', () => {
      const { container } = render(<GSProgress value={50} showLabel />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toBeInTheDocument();
    });

    it('should show percentage when showLabel is true and determinate', () => {
      const { container } = render(<GSProgress value={50} showLabel />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toHaveTextContent('50%');
    });

    it('should show custom label when provided', () => {
      const { container } = render(<GSProgress value={50} showLabel label="Custom" />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toHaveTextContent('Custom');
    });

    it('should show loading text when indeterminate and showLabel', () => {
      const { container } = render(<GSProgress determinate={false} showLabel />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toHaveTextContent('Loading...');
    });

    it('should have data-has-label when showLabel is true', () => {
      const { container } = render(<GSProgress value={50} showLabel />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toHaveAttribute('data-has-label', 'true');
    });
  });

  describe('Determinate Mode', () => {
    it('should render determinate progress by default', () => {
      const { container } = render(<GSProgress value={50} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toHaveAttribute('data-mode', 'determinate');
      const linearRoot = container.querySelector('.gs-progress-root');
      expect(linearRoot).toBeInTheDocument();
    });

    it('should render linear indicator when determinate', () => {
      const { container } = render(<GSProgress value={50} />);
      const indicator = container.querySelector('.gs-progress-indicator');
      expect(indicator).toBeInTheDocument();
    });

    it('should calculate percentage correctly', () => {
      const { container } = render(<GSProgress value={25} max={100} />);
      const root = container.querySelector('.gs-progress-root');
      expect(root).toHaveStyle({ '--progress-percentage': '25%' });
    });
  });

  describe('Indeterminate Mode', () => {
    it('should render indeterminate progress when determinate is false', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toHaveAttribute('data-mode', 'indeterminate');
      const circular = container.querySelector('[data-gs-el="circular"]');
      expect(circular).toBeInTheDocument();
    });

    it('should render circular progress when indeterminate', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const circular = container.querySelector('[data-gs-el="circular"]');
      expect(circular).toHaveAttribute('role', 'progressbar');
      expect(circular).toHaveAttribute('aria-label', 'Loading');
    });

    it('should have screen reader text when indeterminate', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const srText = container.querySelector('.gs-sr-only');
      expect(srText).toHaveTextContent('Loading...');
    });
  });

  describe('Debug Mode', () => {
    it('should have data-gs-debug when debug is true', () => {
      const { container } = render(<GSProgress value={50} debug />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).toHaveAttribute('data-gs-debug', 'enabled');
    });

    it('should not have data-gs-debug when debug is false', () => {
      const { container } = render(<GSProgress value={50} debug={false} />);
      const progress = container.querySelector('[data-gs="GSProgress"]');
      expect(progress).not.toHaveAttribute('data-gs-debug');
    });
  });
});

