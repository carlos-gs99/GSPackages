import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAlert } from '../GSAlert';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSAlert', () => {
  describe('Rendering', () => {
    it('should render alert with default props', () => {
      const { container } = render(<GSAlert>Alert content</GSAlert>);
      const alert = container.querySelector('[data-gs="GSAlert"]');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('data-variant', 'soft');
      expect(alert).toHaveAttribute('data-color', 'info');
      expect(alert).toHaveAttribute('role', 'status');
    });

    it('should render alert with custom className', () => {
      const { container } = render(<GSAlert className="custom-alert">Content</GSAlert>);
      const alert = container.querySelector('[data-gs="GSAlert"]');
      expect(alert).toHaveClass('custom-alert');
    });

    it('should render children content', () => {
      const { container } = render(<GSAlert>Alert content</GSAlert>);
      const content = container.querySelector('[data-gs-el="content"]');
      expect(content).toHaveTextContent('Alert content');
    });
  });

  describe('Variants', () => {
    const variants: Array<'solid' | 'soft' | 'outlined' | 'plain'> = [
      'solid',
      'soft',
      'outlined',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSAlert variant={variant}>Content</GSAlert>);
        const alert = container.querySelector('[data-gs="GSAlert"]');
        expect(alert).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSAlert color={color}>Content</GSAlert>);
        const alert = container.querySelector('[data-gs="GSAlert"]');
        expect(alert).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Icons', () => {
    it('should not show icon by default', () => {
      const { container } = render(<GSAlert>Content</GSAlert>);
      const icon = container.querySelector('[data-gs-el="icon"]');
      expect(icon).not.toBeInTheDocument();
    });

    it('should show icon when showIcon is true', () => {
      const { container } = render(<GSAlert showIcon>Content</GSAlert>);
      const icon = container.querySelector('[data-gs-el="icon"]');
      expect(icon).toBeInTheDocument();
    });

    it('should show custom icon when provided', () => {
      const { container } = render(
        <GSAlert icon={<span>Custom Icon</span>}>Content</GSAlert>
      );
      const icon = container.querySelector('[data-gs-el="icon"]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('Custom Icon');
    });

    it('should prioritize custom icon over showIcon', () => {
      const { container } = render(
        <GSAlert showIcon icon={<span>Custom</span>}>
          Content
        </GSAlert>
      );
      const icon = container.querySelector('[data-gs-el="icon"]');
      expect(icon).toHaveTextContent('Custom');
    });

    it('should show default severity icon when showIcon is true', () => {
      const { container } = render(<GSAlert showIcon color="success">Content</GSAlert>);
      const icon = container.querySelector('[data-gs-el="icon"]');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Dismissible', () => {
    it('should not show close button by default', () => {
      const { container } = render(<GSAlert>Content</GSAlert>);
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should show close button when dismissible is true and onClose is provided', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toBeInTheDocument();
    });

    it('should not show close button when dismissible is true but onClose is not provided', () => {
      const { container } = render(<GSAlert dismissible>Content</GSAlert>);
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      fireEvent.click(closeButton!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should render custom close icon when provided', () => {
      const onClose = jest.fn();
      const { container } = render(
        <GSAlert dismissible onClose={onClose} closeIcon={<span>X</span>}>
          Content
        </GSAlert>
      );
      const closeButton = container.querySelector('[data-gs-el="close"]');
      expect(closeButton).toHaveTextContent('X');
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="status"', () => {
      const { container } = render(<GSAlert>Content</GSAlert>);
      const alert = container.querySelector('[data-gs="GSAlert"]');
      expect(alert).toHaveAttribute('role', 'status');
    });
  });
});

