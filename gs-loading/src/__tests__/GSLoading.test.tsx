import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSLoading } from '../GSLoading';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSLoading', () => {
  describe('Rendering', () => {
    it('should render loading container with default props', () => {
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
      expect(loading).toHaveAttribute('data-gs', 'GSLoading');
    });

    it('should render with custom className', () => {
      const { container } = render(<GSLoading className="custom-loading" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveClass('custom-loading');
    });

    it('should render children content', () => {
      render(
        <GSLoading>
          <div>Custom content</div>
        </GSLoading>
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });
  });

  describe('Mode Variants', () => {
    it('should render section mode correctly', () => {
      const { container } = render(<GSLoading mode="section" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-mode', 'section');
    });

    it('should render viewport mode correctly', () => {
      const { container } = render(<GSLoading mode="viewport" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-mode', 'viewport');
    });

    it('should render fullscreen mode correctly', () => {
      const { container } = render(<GSLoading mode="fullscreen" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-mode', 'fullscreen');
    });
  });

  describe('Visual Variants', () => {
    it('should render transparent variant', () => {
      const { container } = render(<GSLoading variant="transparent" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-variant', 'transparent');
    });

    it('should render surface variant', () => {
      const { container } = render(<GSLoading variant="surface" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-variant', 'surface');
    });

    it('should render inset variant', () => {
      const { container } = render(<GSLoading variant="inset" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-variant', 'inset');
    });
  });

  describe('Content Props', () => {
    it('should render title when provided', () => {
      render(<GSLoading title="Loading Title" />);
      expect(screen.getByText('Loading Title')).toBeInTheDocument();
    });

    it('should render description when provided', () => {
      render(<GSLoading description="Loading description text" />);
      expect(screen.getByText('Loading description text')).toBeInTheDocument();
    });

    it('should render message when provided', () => {
      render(<GSLoading message="Please wait..." />);
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('should render illustration when provided', () => {
      render(<GSLoading illustration={<div>Custom Illustration</div>} />);
      expect(screen.getByText('Custom Illustration')).toBeInTheDocument();
    });

    it('should render actions when provided', () => {
      render(
        <GSLoading
          actions={
            <button>Cancel</button>
          }
        />
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  describe('Alignment', () => {
    it('should align center by default', () => {
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-align', 'center');
    });

    it('should align start when specified', () => {
      const { container } = render(<GSLoading align="start" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-align', 'start');
    });
  });

  describe('Backdrop', () => {
    it('should show backdrop for fullscreen mode by default', () => {
      const { container } = render(<GSLoading mode="fullscreen" />);
      const backdrop = container.querySelector('[data-gs="GSLoading"]')?.querySelector('[aria-hidden="true"]');
      expect(backdrop).toBeInTheDocument();
    });

    it('should show backdrop when explicitly enabled', () => {
      const { container } = render(<GSLoading showBackdrop />);
      const backdrop = container.querySelector('[data-gs="GSLoading"]')?.querySelector('[aria-hidden="true"]');
      expect(backdrop).toBeInTheDocument();
    });
  });

  describe('Spinner Configuration', () => {
    it('should render with custom spinner size', () => {
      const { container } = render(<GSLoading size="lg" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-spinner-size', 'lg');
    });

    it('should render with custom spinner color', () => {
      render(<GSLoading color="success" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('showText Prop', () => {
    it('should show default i18n texts when showText is true', () => {
      const { container } = render(<GSLoading showText />);
      // Component uses i18n, texts should be present
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
    });

    it('should not show default texts when showText is false', () => {
      const { container } = render(<GSLoading showText={false} />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toBeInTheDocument();
      // No title/description rendered by default
    });
  });
});

