import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSCard } from '../GSCard';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSCard', () => {
  describe('Rendering', () => {
    it('should render card with default props', () => {
      const { container } = render(<GSCard>Card content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('data-variant', 'default');
      expect(card).toHaveAttribute('data-size', 'md');
    });

    it('should render card with custom className', () => {
      const { container } = render(<GSCard className="custom-card">Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toHaveClass('custom-card');
    });

    it('should render children content', () => {
      const { container } = render(<GSCard>Card content</GSCard>);
      expect(container.textContent).toContain('Card content');
    });
  });

  describe('Variants', () => {
    const variants: Array<'default' | 'outlined' | 'soft' | 'solid' | 'plain'> = [
      'default',
      'outlined',
      'soft',
      'solid',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSCard variant={variant}>Content</GSCard>);
        const card = container.querySelector('[data-gs="GSCard"]');
        expect(card).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSCard color={color}>Content</GSCard>);
        const card = container.querySelector('[data-gs="GSCard"]');
        expect(card).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSCard size={size}>Content</GSCard>);
        const card = container.querySelector('[data-gs="GSCard"]');
        expect(card).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Interactive', () => {
    it('should have data-interactive when interactive is true', () => {
      const { container } = render(<GSCard interactive>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toHaveAttribute('data-interactive', 'true');
    });

    it('should not have data-interactive when interactive is false', () => {
      const { container } = render(<GSCard interactive={false}>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).not.toHaveAttribute('data-interactive');
    });

    it('should call onClick when clicked', () => {
      const onClick = jest.fn();
      const { container } = render(<GSCard onClick={onClick}>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      fireEvent.click(card!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Collapsible', () => {
    it('should have data-collapsible when collapsible is true', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toHaveAttribute('data-collapsible', 'true');
    });

    it('should not have data-collapsible when collapsible is false', () => {
      const { container } = render(<GSCard collapsible={false}>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).not.toHaveAttribute('data-collapsible');
    });

    it('should show collapse button when collapsible is true', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      expect(collapseButton).toBeInTheDocument();
    });

    it('should toggle collapsed state when collapse button is clicked', () => {
      const { container } = render(<GSCard collapsible>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      
      expect(card).not.toHaveAttribute('data-collapsed');
      fireEvent.click(collapseButton!);
      expect(card).toHaveAttribute('data-collapsed', 'true');
    });

    it('should use defaultCollapsed prop', () => {
      const { container } = render(<GSCard collapsible defaultCollapsed>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toHaveAttribute('data-collapsed', 'true');
    });

    it('should use controlled collapsed state', () => {
      const { container, rerender } = render(
        <GSCard collapsible collapsed={false}>Content</GSCard>
      );
      let card = container.querySelector('[data-gs="GSCard"]');
      expect(card).not.toHaveAttribute('data-collapsed');

      rerender(<GSCard collapsible collapsed={true}>Content</GSCard>);
      card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toHaveAttribute('data-collapsed', 'true');
    });

    it('should call onCollapseChange when collapse state changes', () => {
      const onCollapseChange = jest.fn();
      const { container } = render(
        <GSCard collapsible onCollapseChange={onCollapseChange}>
          Content
        </GSCard>
      );
      const collapseButton = container.querySelector('[data-gs-el="collapse-toggle"]');
      fireEvent.click(collapseButton!);
      expect(onCollapseChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Loading', () => {
    it('should have data-loading when loading is true', () => {
      const { container } = render(<GSCard loading>Content</GSCard>);
      const card = container.querySelector('[data-gs="GSCard"]');
      expect(card).toHaveAttribute('data-loading', 'true');
    });

    it('should show loading component when loading is true', () => {
      const { container } = render(<GSCard loading>Content</GSCard>);
      const loading = container.querySelector('[data-testid="gs-loading"]');
      expect(loading).toBeInTheDocument();
    });

    it('should use custom loadingText when provided', () => {
      const { container } = render(<GSCard loading loadingText="Custom loading">Content</GSCard>);
      const loading = container.querySelector('[data-testid="gs-loading"]');
      expect(loading).toHaveAttribute('data-message', 'Custom loading');
    });

    it('should not show content when loading is true', () => {
      const { container } = render(<GSCard loading>Content</GSCard>);
      expect(container.textContent).not.toContain('Content');
    });
  });

  describe('Image', () => {
    it('should render image when image prop is provided', () => {
      const { container } = render(<GSCard image="test.jpg">Content</GSCard>);
      const imageContainer = container.querySelector('[data-gs-el="image"]');
      expect(imageContainer).toBeInTheDocument();
    });

    it('should render image with alt text', () => {
      const { container } = render(
        <GSCard image="test.jpg" imageAlt="Test image">
          Content
        </GSCard>
      );
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'Test image');
    });

    it('should render image at top position by default', () => {
      const { container } = render(<GSCard image="test.jpg">Content</GSCard>);
      const imageContainer = container.querySelector('[data-gs-el="image"]');
      expect(imageContainer).toHaveAttribute('data-position', 'top');
    });

    it('should render image at left position', () => {
      const { container } = render(
        <GSCard image="test.jpg" imagePosition="left">
          Content
        </GSCard>
      );
      const imageContainer = container.querySelector('[data-gs-el="image"]');
      expect(imageContainer).toHaveAttribute('data-position', 'left');
    });

    it('should render image at right position', () => {
      const { container } = render(
        <GSCard image="test.jpg" imagePosition="right">
          Content
        </GSCard>
      );
      const imageContainer = container.querySelector('[data-gs-el="image"]');
      expect(imageContainer).toHaveAttribute('data-position', 'right');
    });
  });

  describe('Compound Components', () => {
    it('should render GSCard.Header', () => {
      const { container } = render(
        <GSCard>
          <GSCard.Header>Header</GSCard.Header>
        </GSCard>
      );
      const header = container.querySelector('[data-gs-el="header"]');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header');
    });

    it('should render GSCard.Body', () => {
      const { container } = render(
        <GSCard>
          <GSCard.Body>Body</GSCard.Body>
        </GSCard>
      );
      const body = container.querySelector('[data-gs-el="body"]');
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent('Body');
    });

    it('should render GSCard.Footer', () => {
      const { container } = render(
        <GSCard>
          <GSCard.Footer>Footer</GSCard.Footer>
        </GSCard>
      );
      const footer = container.querySelector('[data-gs-el="footer"]');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Footer');
    });

    it('should render GSCard.Image', () => {
      const { container } = render(
        <GSCard>
          <GSCard.Image src="test.jpg" alt="Test" />
        </GSCard>
      );
      const imageContainer = container.querySelector('[data-gs-el="image"]');
      expect(imageContainer).toBeInTheDocument();
    });

    it('should render all compound components together', () => {
      const { container } = render(
        <GSCard>
          <GSCard.Header>Header</GSCard.Header>
          <GSCard.Body>Body</GSCard.Body>
          <GSCard.Footer>Footer</GSCard.Footer>
        </GSCard>
      );
      expect(container.querySelector('[data-gs-el="header"]')).toBeInTheDocument();
      expect(container.querySelector('[data-gs-el="body"]')).toBeInTheDocument();
      expect(container.querySelector('[data-gs-el="footer"]')).toBeInTheDocument();
    });
  });
});

