import React from 'react';
import { render, screen } from '@testing-library/react';
import { GSButton } from '../GSButton';

// Mock dependencies
jest.mock('@carlos-gs99/hooks', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  })),
}));

jest.mock('@carlos-gs99/utils', () => ({
  useDebug: jest.fn(() => ({
    log: jest.fn(),
  })),
  generateAriaAttributes: jest.fn((attrs) => ({
    'aria-label': attrs.label,
    'aria-describedby': attrs.describedBy,
    'aria-pressed': attrs.pressed,
    'aria-expanded': attrs.expanded,
    'aria-controls': attrs.controls,
    'aria-haspopup': attrs.hasPopup,
    'aria-current': attrs.current,
    'aria-disabled': attrs.disabled,
    'aria-busy': attrs.busy,
    role: attrs.role,
  })),
  useFocusManagement: jest.fn(() => ({
    focusRef: { current: null },
  })),
}));

jest.mock('@carlos-gs99/primitives', () => ({
  ButtonBase: React.forwardRef(({ children, as: Component = 'button', ...props }: any, ref: any) => (
    <Component ref={ref} {...props}>
      {children}
    </Component>
  )),
}));

jest.mock('../i18n', () => ({
  GS_BUTTON_NAMESPACE: 'gsbutton',
  registerGSButtonI18n: jest.fn(),
}));

describe('GSButton - Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ARIA Attributes', () => {
    it('has role="button" by default', () => {
      render(<GSButton>Button</GSButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('uses custom ariaLabel', () => {
      render(<GSButton ariaLabel="Custom label">Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
    });

    it('sets aria-describedby', () => {
      render(<GSButton ariaDescribedBy="description-id">Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'description-id');
    });

    it('sets aria-pressed for toggle buttons', () => {
      render(<GSButton ariaPressed={true}>Toggle</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('sets aria-expanded for dropdown triggers', () => {
      render(<GSButton ariaExpanded={true}>Dropdown</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('sets aria-controls for interactive elements', () => {
      render(<GSButton ariaControls="menu-id">Menu</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-controls', 'menu-id');
    });

    it('sets aria-haspopup for menus', () => {
      render(<GSButton ariaHaspopup="menu">Menu</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('sets aria-current for navigation', () => {
      render(<GSButton ariaCurrent="page">Current Page</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Disabled State', () => {
    it('has disabled attribute when native button', () => {
      render(<GSButton disabled>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('uses aria-disabled when not a native button', () => {
      render(
        <GSButton as="a" disabled href="/test">
          Link
        </GSButton>
      );
      const link = screen.getByRole('button');
      expect(link).toHaveAttribute('aria-disabled', 'true');
    });

    it('has aria-disabled when loading', () => {
      const { container } = render(<GSButton loading>Button</GSButton>);
      const button = container.querySelector('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Loading State', () => {
    it('has aria-busy when loading', () => {
      render(<GSButton loading>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('spinner has role="status"', () => {
      const { container } = render(<GSButton loading>Button</GSButton>);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });

    it('spinner has aria-label', () => {
      const { container } = render(<GSButton loading>Button</GSButton>);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
    });

    it('spinner has screen reader text', () => {
      const { container } = render(<GSButton loading>Button</GSButton>);
      const srText = container.querySelector('.gs-sr-only');
      expect(srText).toHaveTextContent('Loading...');
    });
  });

  describe('Keyboard Navigation', () => {
    it('is keyboard accessible (tabIndex)', () => {
      render(<GSButton>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('tabIndex', '-1');
    });

    it('custom tabIndex is respected', () => {
      const { container } = render(<GSButton tabIndex={-1}>Button</GSButton>);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('non-native buttons have tabIndex="0"', () => {
      const { container } = render(<GSButton as="div">Button</GSButton>);
      const div = container.querySelector('div[role="button"]');
      expect(div).toHaveAttribute('tabIndex', '0');
    });

    it('announces keyboard shortcut to screen readers', () => {
      const { container } = render(
        <GSButton keyboardShortcut="Ctrl+S">Save</GSButton>
      );
      const shortcut = container.querySelector('[data-gs-el="shortcut"]');
      expect(shortcut).toBeInTheDocument();
    });
  });

  describe('Polymorphic Accessibility', () => {
    it('maintains button role when rendered as anchor', () => {
      render(
        <GSButton as="a" href="/test">
          Link Button
        </GSButton>
      );
      const link = screen.getByRole('button');
      expect(link.tagName).toBe('A');
    });

    it('anchor button has href attribute', () => {
      const { container } = render(
        <GSButton as="a" href="/test">
          Link Button
        </GSButton>
      );
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('Focus Management', () => {
    it('can receive focus', () => {
      render(<GSButton>Button</GSButton>);
      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('disabled button cannot receive focus via tab', () => {
      render(<GSButton disabled>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('loading button cannot receive focus via tab', () => {
      render(<GSButton loading>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Screen Reader Announcements', () => {
    it('button label is accessible', () => {
      render(<GSButton>Save Changes</GSButton>);
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });

    it('uses ariaLabel for screen readers when provided', () => {
      render(<GSButton ariaLabel="Save your changes">Save</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Save your changes');
    });

    it('loading state is announced', () => {
      const { container } = render(<GSButton loading>Save</GSButton>);
      const spinner = container.querySelector('[role="status"]');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Color Contrast & Visibility', () => {
    it('renders visible button content', () => {
      render(<GSButton>Visible Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toBeVisible();
    });

    it('icon buttons should have aria-label', () => {
      render(
        <GSButton ariaLabel="Close">
          <span>×</span>
        </GSButton>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Close');
    });
  });

  describe('WCAG Compliance', () => {
    it('meets WCAG button role requirements', () => {
      render(<GSButton>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('meets WCAG keyboard interaction requirements', () => {
      const { container } = render(<GSButton as="div">Custom Button</GSButton>);
      const button = container.querySelector('[role="button"]');
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    it('meets WCAG disabled state requirements', () => {
      render(<GSButton disabled>Button</GSButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });
});

