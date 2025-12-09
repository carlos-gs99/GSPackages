import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSProgress } from '../GSProgress';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSProgress - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have role="progressbar" when indeterminate', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const circular = container.querySelector('[data-gs-el="circular"]');
      expect(circular).toHaveAttribute('role', 'progressbar');
    });

    it('should have aria-label when indeterminate', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const circular = container.querySelector('[data-gs-el="circular"]');
      expect(circular).toHaveAttribute('aria-label', 'Loading');
    });

    it('should have screen reader text when indeterminate', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const srText = container.querySelector('.gs-sr-only');
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent('Loading...');
    });
  });

  describe('Screen Reader Support', () => {
    it('should be accessible to screen readers in determinate mode', () => {
      const { container } = render(<GSProgress value={50} showLabel />);
      const label = container.querySelector('[data-gs-el="label"]');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('50%');
    });

    it('should be accessible to screen readers in indeterminate mode', () => {
      const { container } = render(<GSProgress determinate={false} />);
      const circular = container.querySelector('[data-gs-el="circular"]');
      expect(circular).toHaveAttribute('role', 'progressbar');
      expect(circular).toHaveAttribute('aria-label');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with determinate progress', async () => {
      const { container } = render(<GSProgress value={50} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with indeterminate progress', async () => {
      const { container } = render(<GSProgress determinate={false} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with label', async () => {
      const { container } = render(<GSProgress value={50} showLabel />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom label', async () => {
      const { container } = render(<GSProgress value={50} showLabel label="Custom" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all variants', async () => {
      const { container } = render(
        <GSProgress value={75} size="lg" variant="outlined" color="success" showLabel />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

