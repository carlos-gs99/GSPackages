import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSpinner } from '../GSSpinner';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSpinner - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have role="status"', () => {
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('should have aria-label for loading state', () => {
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label');
    });
  });

  describe('Screen Reader Support', () => {
    it('should have screen reader only text', () => {
      const { container } = render(<GSSpinner />);
      const srText = container.querySelector('.srOnly');
      expect(srText).toBeInTheDocument();
    });

    it('should announce loading message when provided', () => {
      render(<GSSpinner centered message="Loading your data..." />);
      expect(screen.getByText('Loading your data...')).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations (basic)', async () => {
      const { container } = render(<GSSpinner />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations (centered with message)', async () => {
      const { container } = render(
        <GSSpinner centered message="Please wait..." />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations (overlay)', async () => {
      const { container } = render(
        <div>
          <GSSpinner overlay />
          <div>Content behind overlay</div>
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with all size variants', async () => {
      for (const size of ['sm', 'md', 'lg'] as const) {
        const { container } = render(<GSSpinner size={size} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('should have no violations with all color variants', async () => {
      for (const color of ['primary', 'neutral', 'success', 'warning', 'danger', 'info'] as const) {
        const { container } = render(<GSSpinner color={color} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });

  describe('Visual Indicators', () => {
    it('should be visually identifiable as loading state', () => {
      render(<GSSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('data-gs', 'GSSpinner');
    });

    it('should support custom aria-label', () => {
      render(<GSSpinner aria-label="Custom loading message" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Custom loading message');
    });
  });
});

