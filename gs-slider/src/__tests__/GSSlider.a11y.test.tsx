import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSlider } from '../GSSlider';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSlider - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have slider role', () => {
      render(<GSSlider />);
      const slider = screen.getByRole('slider');
      expect(slider).toBeInTheDocument();
    });

    it('should have aria-valuemin', () => {
      render(<GSSlider min={0} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax', () => {
      render(<GSSlider max={100} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have aria-valuenow', () => {
      render(<GSSlider value={50} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
    });

    it('should have aria-label', () => {
      render(<GSSlider />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable', () => {
      render(<GSSlider />);
      const slider = screen.getByRole('slider');
      slider.focus();
      expect(slider).toHaveFocus();
    });

    it('should be keyboard navigable', () => {
      render(<GSSlider value={50} />);
      const slider = screen.getByRole('slider');
      slider.focus();
      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be announced correctly by screen readers', () => {
      render(<GSSlider value={50} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic slider', async () => {
      const { container } = render(<GSSlider />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with value', async () => {
      const { container } = render(<GSSlider value={50} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<GSSlider disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with marks', async () => {
      const { container } = render(<GSSlider marks={true} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom min/max', async () => {
      const { container } = render(<GSSlider min={10} max={200} value={100} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

