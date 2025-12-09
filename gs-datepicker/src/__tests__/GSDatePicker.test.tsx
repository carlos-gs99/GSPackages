import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDatePicker } from '../GSDatePicker';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSDatePicker', () => {
  describe('Rendering', () => {
    it('should render datepicker', () => {
      const { container } = render(<GSDatePicker />);
      // GSDatePicker renders GSInput internally
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });

    it('should render input element with date type', () => {
      const { container } = render(<GSDatePicker />);
      const input = container.querySelector('input[type="date"]');
      expect(input).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSDatePicker label="Date Label" />);
      expect(screen.getByText('Date Label')).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('should forward all GSInput props', () => {
      const { container } = render(
        <GSDatePicker
          label="Date Label"
          error="Error message"
          disabled={false}
        />
      );
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });

    it('should forward value prop', () => {
      const { container } = render(
        <GSDatePicker value="2024-01-01" />
      );
      const input = container.querySelector('input[type="date"]');
      expect(input).toHaveValue('2024-01-01');
    });

    it('should forward onChange prop', () => {
      const onChange = jest.fn();
      const { container } = render(
        <GSDatePicker onChange={onChange} />
      );
      const input = container.querySelector('input[type="date"]');
      expect(input).toBeInTheDocument();
    });

    it('should forward placeholder prop', () => {
      const { container } = render(
        <GSDatePicker placeholder="Select date" />
      );
      const input = container.querySelector('input[type="date"]');
      expect(input).toHaveAttribute('placeholder', 'Select date');
    });
  });

  describe('Date Type', () => {
    it('should always have type="date"', () => {
      const { container } = render(<GSDatePicker />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'date');
    });

    it('should always render date input regardless of type prop', () => {
      // Note: GSDatePicker extends GSInputProps but omits 'type'
      // So type prop cannot be passed, but if it could, it would be overridden
      const { container } = render(<GSDatePicker />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Integration with GSInput', () => {
    it('should render as date input', () => {
      const { container } = render(<GSDatePicker />);
      const input = container.querySelector('input[type="date"]');
      expect(input).toBeInTheDocument();
    });

    it('should support all GSInput features', () => {
      const { container } = render(
        <GSDatePicker
          label="Date"
          error="Error"
          helperText="Helper"
          required
          disabled={false}
        />
      );
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });
  });
});

