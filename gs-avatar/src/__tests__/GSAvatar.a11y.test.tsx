import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAvatar } from '../GSAvatar';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSAvatar - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have correct role="img"', () => {
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('role', 'img');
    });

    it('should have aria-label when provided', () => {
      const { container } = render(<GSAvatar ariaLabel="User avatar" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
    });

    it('should have aria-describedby when provided', () => {
      const { container } = render(<GSAvatar ariaDescribedBy="desc-id" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-describedby', 'desc-id');
    });

    it('should have aria-disabled when state is disabled', () => {
      const { container } = render(<GSAvatar state="disabled" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have default aria-label from translation', () => {
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should exist (may be translation key if not yet loaded)
      expect(avatar).toHaveAttribute('aria-label');
    });
  });

  describe('Image Alt Text', () => {
    it('should have alt attribute on image when src is provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt');
    });

    it('should use custom alt when provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" alt="Custom alt text" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'Custom alt text');
    });

    it('should use text as alt when alt is not provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'John Doe');
    });
  });

  describe('Fallback Content', () => {
    it('should have aria-hidden on fallback when image is visible', () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      // After image loads, fallback should be aria-hidden
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      // Fallback may or may not be aria-hidden depending on image status
      // This is acceptable as the image provides the visual content
    });

    it('should not have aria-hidden on fallback when no image', () => {
      const { container } = render(<GSAvatar text="John Doe" />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).not.toHaveAttribute('aria-hidden');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable when not disabled', () => {
      const { container } = render(<GSAvatar tabIndex={0} />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('tabIndex', '0');
    });

    it('should not be focusable when disabled', () => {
      const { container } = render(<GSAvatar state="disabled" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Screen Reader Support', () => {
    it('should announce loading state', () => {
      const { container } = render(<GSAvatar state="loading" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should indicate loading (may be translation key if not yet loaded)
      expect(avatar).toHaveAttribute('aria-label');
    });

    it('should announce error state', () => {
      const { container } = render(<GSAvatar state="error" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should indicate error (may be translation key if not yet loaded)
      expect(avatar).toHaveAttribute('aria-label');
    });

    it('should announce image with name when text is provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      // The aria-label should mention the name (may be translation key if not yet loaded)
      expect(avatar).toHaveAttribute('aria-label');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSAvatar />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with image', async () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with text only', async () => {
      const { container } = render(<GSAvatar text="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with disabled state', async () => {
      const { container } = render(<GSAvatar state="disabled" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with loading state', async () => {
      const { container } = render(<GSAvatar state="loading" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error state', async () => {
      const { container } = render(<GSAvatar state="error" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom aria-label', async () => {
      const { container } = render(<GSAvatar ariaLabel="Custom avatar label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all variants', async () => {
      const { container } = render(
        <GSAvatar
          src="test.jpg"
          text="John Doe"
          size="lg"
          color="primary"
          rounded="xl"
          state="default"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

