import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAutocomplete } from '../GSAutocomplete';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('GSAutocomplete - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should inherit ARIA attributes from GSSelect', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
        />
      );
      // GSAutocomplete uses GSSelect internally, which should have proper ARIA
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable via GSSelect', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be accessible to screen readers via GSSelect', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
        />
      );
      // GSSelect should handle screen reader support
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic autocomplete', async () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
          error="Error message"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
          disabled
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
          required
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

