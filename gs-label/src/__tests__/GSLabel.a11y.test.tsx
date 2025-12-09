import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSLabel } from '../GSLabel';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSLabel - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have correct role (implicit label)', () => {
      render(<GSLabel htmlFor="input-id">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label.tagName).toBe('LABEL');
    });

    it('should have aria-label when provided', () => {
      render(<GSLabel ariaLabel="Accessible label">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('aria-label', 'Accessible label');
    });

    it('should have aria-describedby when helperText is provided', () => {
      render(<GSLabel htmlFor="input-id" helperText="Helper text">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('aria-describedby', 'input-id-helper');
    });

    it('should have aria-hidden when reserved is true', () => {
      const { container } = render(<GSLabel reserved>Test Label</GSLabel>);
      const label = container.querySelector('[data-gs="GSLabel"]');
      expect(label).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not have aria-hidden when reserved is false', () => {
      render(<GSLabel reserved={false}>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Required Indicator', () => {
    it('should have aria-label on required indicator', () => {
      render(<GSLabel required>Test Label</GSLabel>);
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toHaveAttribute('aria-label');
    });
  });

  describe('Helper Text', () => {
    it('should have role="note" on helper text', () => {
      render(<GSLabel helperText="Helper information">Test Label</GSLabel>);
      const helper = screen.getByText('ⓘ Helper information');
      expect(helper).toHaveAttribute('role', 'note');
    });

    it('should have id that matches aria-describedby', () => {
      render(<GSLabel htmlFor="input-id" helperText="Helper">Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      const helper = screen.getByText('ⓘ Helper');
      const describedBy = label.getAttribute('aria-describedby');
      expect(helper).toHaveAttribute('id', describedBy);
    });
  });

  describe('Label Association', () => {
    it('should associate label with input via htmlFor', () => {
      render(
        <>
          <GSLabel htmlFor="test-input">Test Label</GSLabel>
          <input id="test-input" />
        </>
      );
      const label = screen.getByText('Test Label');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable when htmlFor is provided', () => {
      render(
        <>
          <GSLabel htmlFor="test-input">Test Label</GSLabel>
          <input id="test-input" />
        </>
      );
      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be hidden from screen readers when reserved', () => {
      const { container } = render(<GSLabel reserved>Test Label</GSLabel>);
      const label = container.querySelector('[data-gs="GSLabel"]');
      expect(label).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be visible to screen readers when not reserved', () => {
      render(<GSLabel>Test Label</GSLabel>);
      const label = screen.getByText('Test Label');
      expect(label).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSLabel htmlFor="input-id">Test Label</GSLabel>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with required', async () => {
      const { container } = render(<GSLabel htmlFor="input-id" required>Test Label</GSLabel>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with helperText', async () => {
      const { container } = render(
        <GSLabel htmlFor="input-id" helperText="Helper text">Test Label</GSLabel>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with disabled', async () => {
      const { container } = render(<GSLabel htmlFor="input-id" disabled>Test Label</GSLabel>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all props', async () => {
      const { container } = render(
        <GSLabel
          htmlFor="input-id"
          required
          helperText="Helper text"
          ariaLabel="Custom label"
        >
          Test Label
        </GSLabel>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

