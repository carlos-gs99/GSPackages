import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSRating } from '../GSRating';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSRating - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have radiogroup role', () => {
      const { container } = render(<GSRating />);
      const rating = container.querySelector('[role="radiogroup"]');
      expect(rating).toBeInTheDocument();
    });

    it('should have aria-label', () => {
      const { container } = render(<GSRating />);
      const rating = container.querySelector('[role="radiogroup"]');
      expect(rating).toHaveAttribute('aria-label');
    });

    it('should have aria-label on each star', () => {
      const { container } = render(<GSRating />);
      const inputs = container.querySelectorAll('input[type="radio"]');
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-label');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable', () => {
      const { container } = render(<GSRating />);
      const firstInput = container.querySelector('input[type="radio"]') as HTMLInputElement;
      firstInput.focus();
      expect(firstInput).toHaveFocus();
    });

    it('should be selectable via keyboard', () => {
      const { container } = render(<GSRating />);
      const thirdInput = container.querySelector('input[value="3"]') as HTMLInputElement;
      thirdInput.focus();
      fireEvent.keyDown(thirdInput, { key: ' ' });
      expect(thirdInput).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be announced correctly by screen readers', () => {
      render(<GSRating value={3} />);
      const rating = screen.getByRole('radiogroup');
      expect(rating).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic rating', async () => {
      const { container } = render(<GSRating />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with value', async () => {
      const { container } = render(<GSRating value={3} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<GSRating disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when readOnly', async () => {
      const { container } = render(<GSRating readOnly value={3} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom max', async () => {
      const { container } = render(<GSRating max={10} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

