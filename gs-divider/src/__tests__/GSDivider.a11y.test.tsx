import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDivider } from '../GSDivider';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSDivider - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have correct role="separator"', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('role', 'separator');
    });

    it('should have aria-orientation attribute', () => {
      const { container } = render(<GSDivider orientation="horizontal" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have aria-orientation="vertical" for vertical divider', () => {
      const { container } = render(<GSDivider orientation="vertical" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should have aria-label when provided', () => {
      const { container } = render(<GSDivider ariaLabel="Section separator" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label', 'Section separator');
    });

    it('should have default aria-label from translation', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      // The aria-label should exist (may be translation key if not yet loaded)
      expect(divider).toHaveAttribute('aria-label');
    });
  });

  describe('Hidden Decorative Elements', () => {
    it('should have aria-hidden on horizontal divider lines', () => {
      const { container } = render(<GSDivider orientation="horizontal" />);
      const lines = container.querySelectorAll('.line');
      expect(lines.length).toBeGreaterThan(0);
      lines.forEach((line) => {
        expect(line).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have aria-hidden on vertical divider line', () => {
      const { container } = render(<GSDivider orientation="vertical" />);
      const verticalLine = container.querySelector('.verticalLine');
      expect(verticalLine).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not have aria-hidden on text content', () => {
      const { container } = render(<GSDivider orientation="horizontal">Text</GSDivider>);
      const text = container.querySelector('[data-gs-el="text"]');
      expect(text).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Screen Reader Support', () => {
    it('should be accessible to screen readers with role="separator"', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[role="separator"]');
      expect(divider).toBeInTheDocument();
    });

    it('should announce orientation to screen readers', () => {
      const { container } = render(<GSDivider orientation="vertical" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSDivider />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with horizontal orientation', async () => {
      const { container } = render(<GSDivider orientation="horizontal" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with vertical orientation', async () => {
      const { container } = render(<GSDivider orientation="vertical" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with text content', async () => {
      const { container } = render(<GSDivider orientation="horizontal">Text</GSDivider>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom aria-label', async () => {
      const { container } = render(<GSDivider ariaLabel="Custom separator" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all variants', async () => {
      const { container } = render(
        <GSDivider
          orientation="horizontal"
          variant="dashed"
          color="primary"
          spacing="lg"
          textAlign="center"
        >
          Text
        </GSDivider>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

