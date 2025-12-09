import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GSBreadcrumbs } from '../GSBreadcrumbs';

describe('GSBreadcrumbs', () => {
  describe('Rendering', () => {
    it('should render breadcrumbs', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('[data-gs="GSBreadcrumbs"]');
      expect(nav).toBeInTheDocument();
    });

    it('should render nav element', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should render ordered list', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const ol = container.querySelector('ol');
      expect(ol).toBeInTheDocument();
    });
  });

  describe('Items', () => {
    it('should render single item', () => {
      render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should render multiple items', () => {
      render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item>Products</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Product Details</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });
  });

  describe('Separator', () => {
    it('should render default separator', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const separators = container.querySelectorAll('.separator');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('should render custom separator', () => {
      const { container } = render(
        <GSBreadcrumbs separator=">">
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      expect(screen.getByText('>')).toBeInTheDocument();
    });

    it('should not render separator after last item', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const separators = container.querySelectorAll('.separator');
      expect(separators.length).toBe(1); // Only one separator between two items
    });
  });

  describe('Active Item', () => {
    it('should mark item as active', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item active>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const activeItem = container.querySelector('[aria-current="page"]');
      expect(activeItem).toBeInTheDocument();
    });

    it('should not mark non-active item', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
          <GSBreadcrumbs.Item>Products</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const activeItem = container.querySelector('[aria-current="page"]');
      expect(activeItem).not.toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('should render link when href is provided', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item href="/home">Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/home');
    });

    it('should not render link for active item', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item href="/home" active>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const link = container.querySelector('a');
      expect(link).not.toBeInTheDocument();
    });

    it('should render custom component when as prop is provided', () => {
      const Link = ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <span className={className}>{children}</span>
      );
      render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item as={Link}>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });

  describe('ARIA Label', () => {
    it('should use default aria-label', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    });

    it('should use custom aria-label', () => {
      const { container } = render(
        <GSBreadcrumbs ariaLabel="Navigation path">
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveAttribute('aria-label', 'Navigation path');
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className to breadcrumbs', () => {
      const { container } = render(
        <GSBreadcrumbs className="custom-breadcrumbs">
          <GSBreadcrumbs.Item>Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('custom-breadcrumbs');
    });

    it('should apply custom className to item', () => {
      const { container } = render(
        <GSBreadcrumbs>
          <GSBreadcrumbs.Item className="custom-item">Home</GSBreadcrumbs.Item>
        </GSBreadcrumbs>
      );
      const item = container.querySelector('li');
      expect(item).toHaveClass('custom-item');
    });
  });
});

