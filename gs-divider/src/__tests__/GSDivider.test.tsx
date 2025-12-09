import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDivider } from '../GSDivider';
import {
  GS_DIVIDER_ORIENTATIONS,
  GS_DIVIDER_VARIANTS,
  GS_DIVIDER_COLORS,
  GS_DIVIDER_SPACING,
} from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSDivider', () => {
  describe('Rendering', () => {
    it('should render divider with default props', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveAttribute('data-orientation', 'horizontal');
      expect(divider).toHaveAttribute('data-variant', 'solid');
      expect(divider).toHaveAttribute('data-color', 'neutral');
      expect(divider).toHaveAttribute('data-spacing', 'md');
    });

    it('should render divider with custom className', () => {
      const { container } = render(<GSDivider className="custom-divider" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveClass('custom-divider');
    });

    it('should render divider with custom style', () => {
      const { container } = render(<GSDivider style={{ margin: '10px' }} />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveStyle({ margin: '10px' });
    });
  });

  describe('Orientation', () => {
    GS_DIVIDER_ORIENTATIONS.forEach((orientation) => {
      it(`should render ${orientation} orientation correctly`, () => {
        const { container } = render(<GSDivider orientation={orientation} />);
        const divider = container.querySelector('[data-gs="GSDivider"]');
        expect(divider).toHaveAttribute('data-orientation', orientation);
        expect(divider).toHaveAttribute('aria-orientation', orientation);
      });
    });

    it('should render horizontal divider with lines and text when children provided', () => {
      const { container } = render(<GSDivider orientation="horizontal">Text</GSDivider>);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('data-has-text', 'true');
      const text = container.querySelector('[data-gs-el="text"]');
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent('Text');
    });

    it('should not render text when orientation is vertical', () => {
      const { container } = render(<GSDivider orientation="vertical">Text</GSDivider>);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).not.toHaveAttribute('data-has-text');
      const text = container.querySelector('[data-gs-el="text"]');
      expect(text).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    GS_DIVIDER_VARIANTS.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSDivider variant={variant} />);
        const divider = container.querySelector('[data-gs="GSDivider"]');
        expect(divider).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Colors', () => {
    GS_DIVIDER_COLORS.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSDivider color={color} />);
        const divider = container.querySelector('[data-gs="GSDivider"]');
        expect(divider).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Spacing', () => {
    GS_DIVIDER_SPACING.forEach((spacing) => {
      it(`should render ${spacing} spacing correctly`, () => {
        const { container } = render(<GSDivider spacing={spacing} />);
        const divider = container.querySelector('[data-gs="GSDivider"]');
        expect(divider).toHaveAttribute('data-spacing', spacing);
      });
    });
  });

  describe('Text Alignment', () => {
    it('should align text to left when textAlign is left', () => {
      const { container } = render(
        <GSDivider orientation="horizontal" textAlign="left">
          Text
        </GSDivider>
      );
      const horizontal = container.querySelector('.horizontal');
      expect(horizontal).toHaveStyle({ justifyContent: 'flex-start' });
    });

    it('should align text to center when textAlign is center', () => {
      const { container } = render(
        <GSDivider orientation="horizontal" textAlign="center">
          Text
        </GSDivider>
      );
      const horizontal = container.querySelector('.horizontal');
      expect(horizontal).toHaveStyle({ justifyContent: 'center' });
    });

    it('should align text to right when textAlign is right', () => {
      const { container } = render(
        <GSDivider orientation="horizontal" textAlign="right">
          Text
        </GSDivider>
      );
      const horizontal = container.querySelector('.horizontal');
      expect(horizontal).toHaveStyle({ justifyContent: 'flex-end' });
    });

    it('should not apply justifyContent when no text', () => {
      const { container } = render(<GSDivider orientation="horizontal" textAlign="left" />);
      const horizontal = container.querySelector('.horizontal');
      // When no text, justifyContent should not be set
      const style = window.getComputedStyle(horizontal!);
      expect(style.justifyContent).toBe(''); // Empty string means not set
    });
  });

  describe('Debug Mode', () => {
    it('should have data-debug attribute when debug is true', () => {
      const { container } = render(<GSDivider debug />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('data-debug', 'true');
    });

    it('should not have data-debug attribute when debug is false', () => {
      const { container } = render(<GSDivider debug={false} />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).not.toHaveAttribute('data-debug');
    });
  });

  describe('ARIA Attributes', () => {
    it('should have default role="separator"', () => {
      const { container } = render(<GSDivider />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('role', 'separator');
    });

    it('should allow custom role override', () => {
      const { container } = render(<GSDivider role="presentation" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('role', 'presentation');
    });

    it('should have aria-orientation attribute', () => {
      const { container } = render(<GSDivider orientation="vertical" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('should have aria-label when provided', () => {
      const { container } = render(<GSDivider ariaLabel="Custom label" />);
      const divider = container.querySelector('[data-gs="GSDivider"]');
      expect(divider).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Hidden Elements', () => {
    it('should have aria-hidden on horizontal lines', () => {
      const { container } = render(<GSDivider orientation="horizontal" />);
      const lines = container.querySelectorAll('.line');
      lines.forEach((line) => {
        expect(line).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have aria-hidden on vertical line', () => {
      const { container } = render(<GSDivider orientation="vertical" />);
      const verticalLine = container.querySelector('.verticalLine');
      expect(verticalLine).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to divider element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<GSDivider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute('data-gs', 'GSDivider');
    });
  });
});

