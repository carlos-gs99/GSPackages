import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAvatar } from '../GSAvatar';
import {
  GS_AVATAR_SIZES,
  GS_AVATAR_COLORS,
  GS_AVATAR_ROUNDED,
  GS_AVATAR_STATES,
} from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSAvatar', () => {
  describe('Rendering', () => {
    it('should render avatar with default props', () => {
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-size', 'md');
      expect(avatar).toHaveAttribute('data-color', 'neutral');
      expect(avatar).toHaveAttribute('data-rounded', 'circle');
      expect(avatar).toHaveAttribute('data-state', 'default');
    });

    it('should render avatar with custom className', () => {
      const { container } = render(<GSAvatar className="custom-avatar" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveClass('custom-avatar');
    });

    it('should render avatar with custom width and height', () => {
      const { container } = render(<GSAvatar width="100px" height="100px" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveStyle({ '--gs-avatar-width': '100px' });
      expect(avatar).toHaveStyle({ '--gs-avatar-height': '100px' });
    });
  });

  describe('Size Variants', () => {
    GS_AVATAR_SIZES.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSAvatar size={size} />);
        const avatar = container.querySelector('[data-gs="GSAvatar"]');
        expect(avatar).toHaveAttribute('data-size', size);
      });
    });

    it('should default to md size when invalid size provided', () => {
      const { container } = render(<GSAvatar size={'invalid' as any} />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('data-size', 'md');
    });
  });

  describe('Color Variants', () => {
    GS_AVATAR_COLORS.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSAvatar color={color} />);
        const avatar = container.querySelector('[data-gs="GSAvatar"]');
        expect(avatar).toHaveAttribute('data-color', color);
      });
    });

    it('should default to neutral color when invalid color provided', () => {
      const { container } = render(<GSAvatar color={'invalid' as any} />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('data-color', 'neutral');
    });
  });

  describe('Rounded Variants', () => {
    GS_AVATAR_ROUNDED.forEach((rounded) => {
      it(`should render ${rounded} rounded correctly`, () => {
        const { container } = render(<GSAvatar rounded={rounded} />);
        const avatar = container.querySelector('[data-gs="GSAvatar"]');
        expect(avatar).toHaveAttribute('data-rounded', rounded);
      });
    });

    it('should default to circle rounded when invalid rounded provided', () => {
      const { container } = render(<GSAvatar rounded={'invalid' as any} />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('data-rounded', 'circle');
    });
  });

  describe('State Variants', () => {
    GS_AVATAR_STATES.forEach((state) => {
      it(`should render ${state} state correctly`, () => {
        const { container } = render(<GSAvatar state={state} />);
        const avatar = container.querySelector('[data-gs="GSAvatar"]');
        expect(avatar).toHaveAttribute('data-state', state);
      });
    });

    it('should default to default state when invalid state provided', () => {
      const { container } = render(<GSAvatar state={'invalid' as any} />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('data-state', 'default');
    });

    it('should have aria-disabled when state is disabled', () => {
      const { container } = render(<GSAvatar state="disabled" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('aria-disabled', 'true');
    });

    it('should have tabIndex -1 when state is disabled', () => {
      const { container } = render(<GSAvatar state="disabled" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Text and Initials', () => {
    it('should extract initials from single word', () => {
      const { container } = render(<GSAvatar text="John" />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('JO');
    });

    it('should extract initials from two words', () => {
      const { container } = render(<GSAvatar text="John Doe" />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('JD');
    });

    it('should extract initials from multiple words', () => {
      const { container } = render(<GSAvatar text="John Michael Doe" />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('JD');
    });

    it('should show single character for single character word', () => {
      const { container } = render(<GSAvatar text="J" />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('J');
    });

    it('should show ? when text is empty', () => {
      const { container } = render(<GSAvatar text="" />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('?');
    });

    it('should show ? when text is not provided', () => {
      const { container } = render(<GSAvatar />);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('?');
    });

    it('should use children instead of initials when provided', () => {
      const { container } = render(<GSAvatar text="John Doe">Custom</GSAvatar>);
      const fallback = container.querySelector('[data-gs-el="fallback"]');
      expect(fallback).toHaveTextContent('Custom');
    });
  });

  describe('Image Handling', () => {
    it('should render image when src is provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" />);
      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test.jpg');
    });

    it('should have data-has-image when src is provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('data-has-image', 'true');
    });

    it('should not have data-has-image when src is not provided', () => {
      const { container } = render(<GSAvatar />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).not.toHaveAttribute('data-has-image');
    });

    it('should show fallback when image fails to load', async () => {
      const { container } = render(<GSAvatar src="invalid.jpg" text="John Doe" />);
      const image = container.querySelector('img');
      if (image) {
        // Simulate image error
        fireEvent.error(image);
      }
      await waitFor(() => {
        const fallback = container.querySelector('[data-gs-el="fallback"]');
        expect(fallback).toBeInTheDocument();
      });
    });

    it('should hide fallback when image is loaded', async () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      const image = container.querySelector('img');
      if (image) {
        // Simulate image load
        fireEvent.load(image);
      }
      await waitFor(() => {
        // After image loads, verify image is loaded
        const loadedImage = container.querySelector('img[data-status="loaded"]');
        expect(loadedImage).toBeInTheDocument();
        // Fallback may be hidden or removed
        const fallback = container.querySelector('[data-gs-el="fallback"]');
        // If fallback exists, it should be aria-hidden
        if (fallback) {
          expect(fallback).toHaveAttribute('aria-hidden', 'true');
        }
      });
    });

    it('should use alt text when provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" alt="Custom alt" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'Custom alt');
    });

    it('should use text as alt when alt is not provided', () => {
      const { container } = render(<GSAvatar src="test.jpg" text="John Doe" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', 'John Doe');
    });
  });

  describe('Debug Mode', () => {
    it('should have data-debug attribute when debug is true', () => {
      const { container } = render(<GSAvatar debug />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toHaveAttribute('data-debug', 'true');
    });

    it('should not have data-debug attribute when debug is false', () => {
      const { container } = render(<GSAvatar debug={false} />);
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).not.toHaveAttribute('data-debug');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to avatar element', () => {
      const ref = React.createRef<any>();
      const { container } = render(<GSAvatar ref={ref} />);
      // The ref exposes methods, but we can check the underlying element
      expect(ref.current).toHaveProperty('focus');
      expect(ref.current).toHaveProperty('reload');
      // Verify the actual DOM element exists
      const avatar = container.querySelector('[data-gs="GSAvatar"]');
      expect(avatar).toBeInTheDocument();
    });

    it('should expose focus method via ref', () => {
      const ref = React.createRef<any>();
      render(<GSAvatar ref={ref} />);
      expect(ref.current).toHaveProperty('focus');
      expect(typeof ref.current.focus).toBe('function');
    });

    it('should expose reload method via ref', () => {
      const ref = React.createRef<any>();
      render(<GSAvatar ref={ref} src="test.jpg" />);
      expect(ref.current).toHaveProperty('reload');
      expect(typeof ref.current.reload).toBe('function');
    });
  });
});

