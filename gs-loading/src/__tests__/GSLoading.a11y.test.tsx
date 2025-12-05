import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSLoading } from '../GSLoading';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSLoading - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have aria-busy="true"', () => {
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('aria-busy', 'true');
    });

    it('should have aria-live attribute', () => {
      const { container } = render(<GSLoading ariaLive="polite" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-label', () => {
      const { container } = render(<GSLoading ariaLabel="Loading content" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('aria-label', 'Loading content');
    });

    it('should have aria-describedby when content is provided', () => {
      const { container } = render(<GSLoading title="Loading" description="Please wait" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      const describedBy = loading?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });
  });

  describe('Screen Reader Support', () => {
    it('should have screen reader only text in spinner', () => {
      const { container } = render(<GSLoading />);
      const srText = container.querySelector('.srOnly');
      expect(srText).toBeInTheDocument();
    });

    it('should announce title to screen readers', () => {
      render(<GSLoading title="Loading your data" />);
      expect(screen.getByText('Loading your data')).toBeInTheDocument();
    });

    it('should announce description to screen readers', () => {
      render(<GSLoading description="This may take a moment" />);
      expect(screen.getByText('This may take a moment')).toBeInTheDocument();
    });

    it('should announce message to screen readers', () => {
      render(<GSLoading message="Processing..." />);
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });
  });

  describe('Focus Management', () => {
    it('should support focusOnMount', () => {
      const { container } = render(<GSLoading focusOnMount />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      // Component should set tabIndex when focusOnMount is true
      expect(loading).toHaveAttribute('tabindex', '-1');
    });

    it('should respect custom tabIndex', () => {
      const { container } = render(<GSLoading tabIndex={0} />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('tabIndex');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations (basic)', async () => {
      const { container } = render(<GSLoading />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations (with title and description)', async () => {
      const { container } = render(
        <GSLoading title="Loading" description="Please wait" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations (with message)', async () => {
      const { container } = render(
        <GSLoading message="Loading your content..." />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations (fullscreen mode)', async () => {
      const { container } = render(
        <GSLoading mode="fullscreen" title="Loading Application" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with all mode variants', async () => {
      for (const mode of ['section', 'viewport', 'fullscreen'] as const) {
        const { container } = render(<GSLoading mode={mode} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('should have no violations with actions', async () => {
      const { container } = render(
        <GSLoading
          title="Loading"
          actions={
            <button type="button">Cancel</button>
          }
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Visual Indicators', () => {
    it('should be visually identifiable as loading state', () => {
      const { container } = render(<GSLoading />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-gs', 'GSLoading');
      expect(loading).toHaveAttribute('aria-busy', 'true');
    });

    it('should render spinner with correct data attributes', () => {
      const { container } = render(<GSLoading size="lg" />);
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-spinner-size', 'lg');
    });

    it('should show illustration when provided', () => {
      const { container } = render(
        <GSLoading illustration={<div data-testid="custom-illustration">Icon</div>} />
      );
      expect(screen.getByTestId('custom-illustration')).toBeInTheDocument();
      const loading = container.querySelector('[data-gs="GSLoading"]');
      expect(loading).toHaveAttribute('data-has-illustration', 'true');
    });
  });

  describe('Backdrop Accessibility', () => {
    it('should mark backdrop with aria-hidden', () => {
      const { container } = render(<GSLoading showBackdrop />);
      const backdrop = container.querySelector('[aria-hidden="true"]');
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not include backdrop in accessibility tree', () => {
      const { container } = render(<GSLoading mode="fullscreen" />);
      const backdrop = container.querySelector('[aria-hidden="true"]');
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Actions Accessibility', () => {
    it('should render actions as accessible buttons', () => {
      render(
        <GSLoading
          actions={
            <button type="button" aria-label="Cancel loading">
              Cancel
            </button>
          }
        />
      );
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveAttribute('aria-label');
    });
  });
});
