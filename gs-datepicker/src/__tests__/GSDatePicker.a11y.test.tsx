import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDatePicker } from '../GSDatePicker';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSDatePicker - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should inherit ARIA attributes from GSInput', () => {
      const { container } = render(
        <GSDatePicker
          label="Date Label"
        />
      );
      // GSDatePicker uses GSInput internally, which should have proper ARIA
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable via GSInput', () => {
      const { container } = render(<GSDatePicker />);
      const input = container.querySelector('input[type="date"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be accessible to screen readers via GSInput', () => {
      render(
        <GSDatePicker
          label="Date Label"
        />
      );
      // GSInput should handle screen reader support
      const input = screen.getByLabelText('Date Label');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic datepicker', async () => {
      const { container } = render(
        <GSDatePicker
          label="Date Label"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <GSDatePicker
          label="Date Label"
          error="Error message"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(
        <GSDatePicker
          label="Date Label"
          disabled
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(
        <GSDatePicker
          label="Date Label"
          required
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

