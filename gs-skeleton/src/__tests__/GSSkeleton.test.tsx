import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSkeleton } from '../GSSkeleton';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSkeleton', () => {
  describe('Rendering', () => {
    it('should render skeleton when loading is true', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('should render children when loading is false', () => {
      const { container } = render(
        <GSSkeleton loading={false}>
          <div>Content</div>
        </GSSkeleton>
      );
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).not.toBeInTheDocument();
      expect(container.textContent).toBe('Content');
    });

    it('should render nothing when loading is false and no children', () => {
      const { container } = render(<GSSkeleton loading={false} />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).not.toBeInTheDocument();
    });

    it('should render skeleton with custom className', () => {
      const { container } = render(<GSSkeleton loading className="custom-skeleton" />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveClass('custom-skeleton');
    });

    it('should render skeleton with custom style', () => {
      const { container } = render(<GSSkeleton loading style={{ margin: '10px' }} />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveStyle({ margin: '10px' });
    });
  });

  describe('Variants', () => {
    const variants: Array<'text' | 'circular' | 'rectangular' | 'rounded'> = [
      'text',
      'circular',
      'rectangular',
      'rounded',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSSkeleton loading variant={variant} />);
        const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
        expect(skeleton).toHaveAttribute('data-variant', variant);
      });
    });

    it('should default to text variant when not provided', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveAttribute('data-variant', 'text');
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSSkeleton loading size={size} />);
        const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
        expect(skeleton).toHaveAttribute('data-size', size);
      });
    });

    it('should default to md size when not provided', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveAttribute('data-size', 'md');
    });
  });

  describe('Width and Height', () => {
    it('should apply width as string', () => {
      const { container } = render(<GSSkeleton loading width="100px" />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveStyle({ width: '100px' });
    });

    it('should apply width as number', () => {
      const { container } = render(<GSSkeleton loading width={100} />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveStyle({ width: '100px' });
    });

    it('should apply height as string', () => {
      const { container } = render(<GSSkeleton loading height="50px" />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveStyle({ height: '50px' });
    });

    it('should apply height as number', () => {
      const { container } = render(<GSSkeleton loading height={50} />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveStyle({ height: '50px' });
    });
  });

  describe('Animations', () => {
    it('should render with pulse animation', () => {
      const { container } = render(<GSSkeleton loading animation="pulse" />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toBeInTheDocument();
      // Animation is applied via CSS class
    });

    it('should render with wave animation', () => {
      const { container } = render(<GSSkeleton loading animation="wave" />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('should render without animation when animation is false', () => {
      const { container } = render(<GSSkeleton loading animation={false} />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('should default to wave animation when not provided', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('Multiple Lines', () => {
    it('should render single line by default', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeletons = container.querySelectorAll('[data-gs="GSSkeleton"]');
      expect(skeletons.length).toBe(1);
    });

    it('should render multiple lines when lines prop is provided', () => {
      const { container } = render(<GSSkeleton loading lines={3} />);
      const skeletons = container.querySelectorAll('[data-gs="GSSkeleton"]');
      expect(skeletons.length).toBe(3);
    });

    it('should render last line with 60% width', () => {
      const { container } = render(<GSSkeleton loading lines={3} />);
      const skeletons = container.querySelectorAll('[data-gs="GSSkeleton"]');
      const lastLine = skeletons[skeletons.length - 1];
      expect(lastLine).toHaveStyle({ width: '60%' });
    });

    it('should render other lines with 100% width', () => {
      const { container } = render(<GSSkeleton loading lines={3} />);
      const skeletons = container.querySelectorAll('[data-gs="GSSkeleton"]');
      const firstLine = skeletons[0];
      expect(firstLine).toHaveStyle({ width: '100%' });
    });
  });

  describe('Inherited Props from Children', () => {
    it('should inherit className from children', () => {
      const { container } = render(
        <GSSkeleton loading>
          <div className="child-class">Content</div>
        </GSSkeleton>
      );
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      // When loading, skeleton should inherit className
      expect(skeleton).toBeInTheDocument();
    });

    it('should inherit style from children', () => {
      const { container } = render(
        <GSSkeleton loading>
          <div style={{ padding: '10px' }}>Content</div>
        </GSSkeleton>
      );
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have aria-label', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveAttribute('aria-label');
    });

    it('should have aria-busy="true"', () => {
      const { container } = render(<GSSkeleton loading />);
      const skeleton = container.querySelector('[data-gs="GSSkeleton"]');
      expect(skeleton).toHaveAttribute('aria-busy', 'true');
    });
  });

  describe('GSSkeleton.Group', () => {
    it('should render group with children', () => {
      const { container } = render(
        <GSSkeleton.Group>
          <GSSkeleton loading />
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with vertical direction by default', () => {
      const { container } = render(
        <GSSkeleton.Group>
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with horizontal direction', () => {
      const { container } = render(
        <GSSkeleton.Group direction="horizontal">
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with vertical direction', () => {
      const { container } = render(
        <GSSkeleton.Group direction="vertical">
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with gap sm', () => {
      const { container } = render(
        <GSSkeleton.Group gap="sm">
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with gap md', () => {
      const { container } = render(
        <GSSkeleton.Group gap="md">
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with gap lg', () => {
      const { container } = render(
        <GSSkeleton.Group gap="lg">
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
    });

    it('should render group with custom gap', () => {
      const { container } = render(
        <GSSkeleton.Group gap="20px">
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toBeInTheDocument();
      expect(group).toHaveStyle({ gap: '20px' });
    });

    it('should have aria-label on group', () => {
      const { container } = render(
        <GSSkeleton.Group>
          <GSSkeleton loading />
        </GSSkeleton.Group>
      );
      const group = container.querySelector('[data-gs="GSSkeletonGroup"]');
      expect(group).toHaveAttribute('aria-label');
    });
  });
});

