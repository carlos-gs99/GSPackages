import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSpinner } from '../GSSpinner';
import { GS_SPINNER_SIZES, GS_SPINNER_COLORS, GS_SPINNER_VARIANTS } from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSpinner', () => {
  describe('Rendering', () => {
    it('should render spinner with default props', () => {
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('data-gs', 'GSSpinner');
    });

    it('should render spinner with custom className', () => {
      render(<GSSpinner className="custom-spinner" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-spinner');
    });
  });

  describe('Size Variants', () => {
    GS_SPINNER_SIZES.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(<GSSpinner size={size} />);
        const spinner = screen.getByRole('status');
        expect(spinner).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Color Variants', () => {
    GS_SPINNER_COLORS.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        render(<GSSpinner color={color} />);
        const spinner = screen.getByRole('status');
        expect(spinner).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Visual Variants', () => {
    GS_SPINNER_VARIANTS.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        render(<GSSpinner variant={variant} />);
        const spinner = screen.getByRole('status');
        expect(spinner).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Layout Options', () => {
    it('should render centered spinner', () => {
      const { container } = render(<GSSpinner centered />);
      const spinnerContainer = container.querySelector('[data-gs="GSSpinner-container"]');
      expect(spinnerContainer).toBeInTheDocument();
    });

    it('should render overlay spinner', () => {
      const { container } = render(<GSSpinner overlay />);
      const spinnerContainer = container.querySelector('[data-gs="GSSpinner-container"]');
      expect(spinnerContainer).toBeInTheDocument();
    });

    it('should render with message', () => {
      render(<GSSpinner centered message="Loading data..." />);
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });

    it('should render fullHeight container', () => {
      render(<GSSpinner centered fullHeight />);
      const container = screen.getByRole('status').closest('[data-gs="GSSpinner-container"]');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Custom Thickness', () => {
    it('should apply custom thickness', () => {
      render(<GSSpinner thickness={8} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ border: expect.stringContaining('8px') });
    });
  });
});

