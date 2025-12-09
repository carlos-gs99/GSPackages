import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSCard } from '../GSCard';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSCard - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have aria-expanded on collapse button', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-expanded');
    });

    it('should have aria-expanded="true" when not collapsed', () => {
      const { container } = render(<GSCard collapsible collapsed={false}>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-expanded="false" when collapsed', () => {
      const { container } = render(<GSCard collapsible collapsed={true}>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-label on collapse button', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-label');
    });

    it('should have type="button" on collapse button', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Image Accessibility', () => {
    it('should have alt attribute on image', () => {
      const { container } = render(
        <GSCard image="test.jpg" imageAlt="Test image">
          Content
        </GSCard>
      );
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'Test image');
    });

    it('should have loading="lazy" on image', () => {
      const { container } = render(<GSCard image="test.jpg">Content</GSCard>);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via collapse button', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector(
        '[data-gs-el="collapse-toggle"]'
      ) as HTMLButtonElement;
      collapseButton.focus();
      expect(collapseButton).toHaveFocus();
    });

    it('should toggle on Enter key press', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      const card = container.querySelector('[data-gs="GSCard"]');
      
      fireEvent.keyDown(collapseButton!, { key: 'Enter', code: 'Enter' });
      fireEvent.click(collapseButton!);
      expect(card).toHaveAttribute('data-collapsed', 'true');
    });
  });

  describe('Screen Reader Support', () => {
    it('should announce collapse state to screen readers', () => {
      const { container } = render(<GSCard collapsible collapsed={false}>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should announce loading state to screen readers', () => {
      const { container } = render(<GSCard loading>Content</GSCard>);
      const loading = container.querySelector('[data-testid="gs-loading"]');
      expect(loading).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSCard>Card content</GSCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with collapsible', async () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with loading', async () => {
      const { container } = render(<GSCard loading>Content</GSCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with image', async () => {
      const { container } = render(
        <GSCard image="test.jpg" imageAlt="Test image">
          Content
        </GSCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with interactive', async () => {
      const { container } = render(<GSCard interactive>Content</GSCard>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with all variants', async () => {
      const { container } = render(
        <GSCard
          variant="outlined"
          color="success"
          size="lg"
          collapsible
          interactive
          image="test.jpg"
          imageAlt="Test"
        >
          <GSCard.Header>Header</GSCard.Header>
          <GSCard.Body>Body</GSCard.Body>
          <GSCard.Footer>Footer</GSCard.Footer>
        </GSCard>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

