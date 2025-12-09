import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTextArea } from '../GSTextArea';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

describe('GSTextArea - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have aria-label when label is provided', () => {
      const { container } = render(<GSTextArea label="Textarea Label" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-label', 'Textarea Label');
    });

    it('should have aria-invalid when error is present', () => {
      const { container } = render(<GSTextArea error="Error message" />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-invalid="false" when no error', () => {
      const { container } = render(<GSTextArea />);
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via textarea', () => {
      const { container } = render(<GSTextArea />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      textarea.focus();
      expect(textarea).toHaveFocus();
    });

    it('should be editable via keyboard', () => {
      const { container } = render(<GSTextArea />);
      const textarea = container.querySelector('textarea') as HTMLTextAreaElement;
      textarea.focus();
      fireEvent.change(textarea, { target: { value: 'Typed text' } });
      expect(textarea).toHaveValue('Typed text');
    });
  });

  describe('Screen Reader Support', () => {
    it('should be associated with label', () => {
      render(<GSTextArea label="Textarea Label" />);
      const label = screen.getByText('Textarea Label');
      expect(label).toBeInTheDocument();
      const textarea = screen.getByLabelText('Textarea Label');
      expect(textarea).toBeInTheDocument();
    });

    it('should announce error state', () => {
      render(<GSTextArea error="Error message" />);
      const error = screen.getByRole('alert');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent('Error message');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with label', async () => {
      const { container } = render(<GSTextArea label="Textarea Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(<GSTextArea error="Error message" label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with helper text', async () => {
      const { container } = render(<GSTextArea helperText="Helper text" label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<GSTextArea disabled label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(<GSTextArea required label="Label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with counters', async () => {
      const { container } = render(
        <GSTextArea value="Test" showCharCount maxLength={10} label="Label" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

