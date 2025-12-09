import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GSBreadcrumbs } from '../GSBreadcrumbs';

expect.extend(toHaveNoViolations);

describe('GSBreadcrumbs - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have nav role', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should have aria-label on nav', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label');
    });

    it('should have aria-current="page" on active item', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const activeItem = container.querySelector('[aria-current="page"]');
      expect(activeItem).toBeInTheDocument();
    });

    it('should have aria-hidden on separator', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const separator = container.querySelector('[aria-hidden="true"]');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    it('should use nav element', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should use ordered list (ol)', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const ol = container.querySelector('ol');
      expect(ol).toBeInTheDocument();
    });

    it('should use list items (li)', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const li = container.querySelector('li');
      expect(li).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable when items have links', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item href="/home">Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item href="/products">Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const links = container.querySelectorAll('a');
      expect(links.length).toBe(2);
    });
  });

  describe('Screen Reader Support', () => {
    it('should be announced correctly by screen readers', () => {
      render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic breadcrumbs', async () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with links', async () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item href="/home">Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item href="/products">Products</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Product Details</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom separator', async () => {
      const { container } = render(
        <GSBreadcrumbs separator=">">
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom aria-label', async () => {
      const { container } = render(
        <GSBreadcrumbs ariaLabel="Navigation path">
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

