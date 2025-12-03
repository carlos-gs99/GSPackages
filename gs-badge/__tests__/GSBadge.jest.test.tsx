import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '../../../tests/test-utils.js';
import { GSBadge } from '../src/GSBadge';

// Simple mocks
vi.mock('../src/i18n', () => ({
  GS_BADGE_NAMESPACE: 'gsbadge',
  registerGSBadgeI18n: vi.fn(),
}));

describe('GSBadge - Simple Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders badge with children', () => {
      render(
        <GSBadge badgeContent={5}>
          <div data-testid="child">Content</div>
        </GSBadge>
      );
      
      const child = document.querySelector('[data-testid="child"]');
      expect(child).toBeInTheDocument();
    });

    it('renders with data-gs attribute', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toBeInTheDocument();
    });

    it('renders badge indicator', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveTextContent('5');
    });
  });

  describe('Badge Content', () => {
    it('displays numeric content', () => {
      const { container } = render(
        <GSBadge badgeContent={10}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveTextContent('10');
    });

    it('displays string content', () => {
      const { container } = render(
        <GSBadge badgeContent="NEW">
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveTextContent('NEW');
    });

    it('formats numbers exceeding max', () => {
      const { container } = render(
        <GSBadge badgeContent={150} max={99}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveTextContent('99+');
    });
  });

  describe('Visibility', () => {
    it('hides when invisible', () => {
      const { container } = render(
        <GSBadge badgeContent={5} invisible={true}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveClass('hidden');
    });

    it('shows zero when showZero is true', () => {
      const { container } = render(
        <GSBadge badgeContent={0} showZero={true}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).not.toHaveClass('hidden');
      expect(indicator).toHaveTextContent('0');
    });
  });

  describe('Variants', () => {
    it('renders with solid variant', () => {
      const { container } = render(
        <GSBadge badgeContent={5} variant="solid">
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-variant', 'solid');
    });

    it('renders with dot variant', () => {
      const { container } = render(
        <GSBadge variant="dot">
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-variant', 'dot');
    });
  });

  describe('Colors', () => {
    it('renders with default danger color', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-color', 'danger');
    });

    it('renders with primary color', () => {
      const { container } = render(
        <GSBadge badgeContent={5} color="primary">
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-color', 'primary');
    });
  });

  describe('Sizes', () => {
    it('renders with default md size', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-size', 'md');
    });

    it('renders with lg size', () => {
      const { container } = render(
        <GSBadge badgeContent={5} size="lg">
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Anchor Position', () => {
    it('uses default top-right position', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveAttribute('data-anchor-vertical', 'top');
      expect(indicator).toHaveAttribute('data-anchor-horizontal', 'right');
    });

    it('applies custom bottom-left position', () => {
      const { container } = render(
        <GSBadge
          badgeContent={5}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveAttribute('data-anchor-vertical', 'bottom');
      expect(indicator).toHaveAttribute('data-anchor-horizontal', 'left');
    });
  });

  describe('Accessibility', () => {
    it('has role status', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveAttribute('role', 'status');
    });

    it('has aria-live polite', () => {
      const { container } = render(
        <GSBadge badgeContent={5}>
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveAttribute('aria-live', 'polite');
    });

    it('uses custom aria-label', () => {
      const { container } = render(
        <GSBadge badgeContent={5} ariaLabel="5 messages">
          <div>Content</div>
        </GSBadge>
      );
      
      const indicator = container.querySelector('[data-gs-el="indicator"]');
      expect(indicator).toHaveAttribute('aria-label', '5 messages');
    });
  });

  describe('Debug Mode', () => {
    it('adds debug attribute when enabled', () => {
      const { container } = render(
        <GSBadge badgeContent={5} debug={true}>
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveAttribute('data-debug', 'true');
    });
  });

  describe('Custom Props', () => {
    it('forwards className', () => {
      const { container } = render(
        <GSBadge badgeContent={5} className="custom">
          <div>Content</div>
        </GSBadge>
      );
      
      const badge = container.querySelector('[data-gs="GSBadge"]');
      expect(badge).toHaveClass('custom');
    });
  });
});

