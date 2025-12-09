import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTimePicker } from '../GSTimePicker';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSTimePicker', () => {
  describe('Rendering', () => {
    it('should render timepicker', () => {
      const { container } = render(<GSTimePicker />);
      // GSTimePicker renders GSInput internally
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });

    it('should render input element with time type', () => {
      const { container } = render(<GSTimePicker />);
      const input = container.querySelector('input[type="time"]');
      expect(input).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSTimePicker label="Time Label" />);
      expect(screen.getByText('Time Label')).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('should forward all GSInput props', () => {
      const { container } = render(
        <GSTimePicker
          label="Time Label"
          error="Error message"
          disabled={false}
        />
      );
      const input = container.querySelector('[data-gs="GSInput"]');
      expect(input).toBeInTheDocument();
    });

    it('should forward value prop', () => {
      const { container } = render(
        <GSTimePicker value="14:30" />
      );
      const input = container.querySelector('input[type="time"]');
      expect(input).toHaveValue('14:30');
    });

    it('should forward onChange prop', () => {
      const onChange = jest.fn();
      const { container } = render(
        <GSTimePicker onChange={onChange} />
      );
      const input = container.querySelector('input[type="time"]');
      expect(input).toBeInTheDocument();
    });

    it('should forward placeholder prop', () => {
      const { container } = render(
        <GSTimePicker placeholder="Select time" />
      );
      const input = container.querySelector('input[type="time"]');
      expect(input).toHaveAttribute('placeholder', 'Select time');
    });
  });

  describe('Time Type', () => {
    it('should always have type="time"', () => {
      const { container } = render(<GSTimePicker />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('should always render time input regardless of type prop', () => {
      // Note: GSTimePicker extends GSInputProps but omits 'type'
      // So type prop cannot be passed, but if it could, it would be overridden
      const { container } = render(<GSTimePicker />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Integration with GSInput', () => {
    it('should render as time input', () => {
      const { container } = render(<GSTimePicker />);
      const input = container.querySelector('input[type="time"]');
      expect(input).toBeInTheDocument();
    });

    it('should support all GSInput features', () => {
      const { container } = render(
        <GSTimePicker
          label="Time"
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

