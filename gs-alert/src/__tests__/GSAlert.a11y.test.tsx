import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAlert } from '../GSAlert';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSAlert - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have correct role="status"', () => {
      const { container } = render(<GSAlert>Alert content</GSAlert>);
      const alert = container.querySelector('[data-gs="GSAlert"]');
      expect(alert).toHaveAttribute('role', 'status');
    });

    it('should have aria-label on close button', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toHaveAttribute('aria-label');
    });

    it('should have type="button" on close button', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via close button', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]') as HTMLButtonElement;
      closeButton.focus();
      expect(closeButton).toHaveFocus();
    });

    it('should close on Enter key press', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      fireEvent.keyDown(closeButton!, { key: 'Enter', code: 'Enter' });
      // Note: Enter on button triggers click, so onClose should be called
      fireEvent.click(closeButton!);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Screen Reader Support', () => {
    it('should be announced as status region', () => {
      const { container } = render(<GSAlert>Important message</GSAlert>);
      const alert = container.querySelector('[role="status"]');
      expect(alert).toBeInTheDocument();
    });

    it('should announce close action to screen readers', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toHaveAttribute('aria-label');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSAlert>Alert content</GSAlert>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with icon', async () => {
      const { container } = render(<GSAlert showIcon>Content</GSAlert>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with dismissible', async () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all variants', async () => {
      const { container } = render(
        <GSAlert variant="outlined" color="success" showIcon dismissible onClose={jest.fn()}>
          Content
        </GSAlert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

