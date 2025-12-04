import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('GSButton - Basic Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with children', () => {
    render(<GSButton>Click me</GSButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with data-gs attribute', () => {
    const { container } = render(<GSButton>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toBeInTheDocument();
  });

  it('renders as native button by default', () => {
    render(<GSButton>Button</GSButton>);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });
});

describe('GSButton - Variants', () => {
  it('renders with solid variant (default)', () => {
    const { container } = render(<GSButton>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-variant', 'solid');
  });

  it('renders with outlined variant', () => {
    const { container } = render(<GSButton variant="outlined">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-variant', 'outlined');
  });

  it('renders with soft variant', () => {
    const { container } = render(<GSButton variant="soft">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-variant', 'soft');
  });

  it('renders with plain variant', () => {
    const { container } = render(<GSButton variant="plain">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-variant', 'plain');
  });
});

describe('GSButton - Colors', () => {
  it('renders with primary color (default)', () => {
    const { container } = render(<GSButton>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-color', 'primary');
  });

  it('renders with secondary color', () => {
    const { container } = render(<GSButton color="secondary">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-color', 'secondary');
  });

  it('renders with success color', () => {
    const { container } = render(<GSButton color="success">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-color', 'success');
  });

  it('renders with danger color', () => {
    const { container } = render(<GSButton color="danger">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-color', 'danger');
  });
});

describe('GSButton - Sizes', () => {
  it('renders with md size (default)', () => {
    const { container } = render(<GSButton>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-size', 'md');
  });

  it('renders with sm size', () => {
    const { container } = render(<GSButton size="sm">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-size', 'sm');
  });

  it('renders with lg size', () => {
    const { container } = render(<GSButton size="lg">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-size', 'lg');
  });
});

describe('GSButton - States', () => {
  it('disables button when disabled prop is true', () => {
    render(<GSButton disabled>Button</GSButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    const { container } = render(<GSButton loading>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-loading', 'true');
  });

  it('disables interaction when loading', () => {
    render(<GSButton loading>Button</GSButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders spinner when loading', () => {
    const { container } = render(<GSButton loading>Button</GSButton>);
    const spinner = container.querySelector('[data-gs="InlineButtonSpinner"]');
    expect(spinner).toBeInTheDocument();
  });

  it('positions spinner at start by default', () => {
    const { container } = render(<GSButton loading>Button</GSButton>);
    const loadingContent = container.querySelector('[data-gs-el="loading"]');
    expect(loadingContent).toBeInTheDocument();
  });

  it('positions spinner at end when specified', () => {
    const { container } = render(
      <GSButton loading loadingPosition="end">
        Button
      </GSButton>
    );
    const loadingContent = container.querySelector('[data-gs-el="loading"]');
    expect(loadingContent).toBeInTheDocument();
  });
});

describe('GSButton - Icons', () => {
  it('renders start icon', () => {
    const { container } = render(
      <GSButton startIcon={<span data-testid="start-icon">→</span>}>Button</GSButton>
    );
    const icon = container.querySelector('[data-gs-el="start-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders end icon', () => {
    const { container } = render(
      <GSButton endIcon={<span data-testid="end-icon">←</span>}>Button</GSButton>
    );
    const icon = container.querySelector('[data-gs-el="end-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders both start and end icons', () => {
    const { container } = render(
      <GSButton
        startIcon={<span data-testid="start">→</span>}
        endIcon={<span data-testid="end">←</span>}
      >
        Button
      </GSButton>
    );
    const startIcon = container.querySelector('[data-gs-el="start-icon"]');
    const endIcon = container.querySelector('[data-gs-el="end-icon"]');
    expect(startIcon).toBeInTheDocument();
    expect(endIcon).toBeInTheDocument();
  });
});

describe('GSButton - Layout', () => {
  it('renders with fullWidth', () => {
    const { container } = render(<GSButton fullWidth>Button</GSButton>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('fullWidth');
  });

  it('renders with rounded pill', () => {
    const { container } = render(<GSButton rounded>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-rounded', 'pill');
  });

  it('renders with rounded full', () => {
    const { container } = render(<GSButton rounded="full">Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-rounded', 'full');
  });

  it('renders with gradient', () => {
    const { container } = render(<GSButton gradient>Button</GSButton>);
    const button = container.querySelector('[data-gs="GSButton"]');
    expect(button).toHaveAttribute('data-gradient', 'true');
  });
});

describe('GSButton - Interactions', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<GSButton onClick={handleClick}>Button</GSButton>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <GSButton onClick={handleClick} disabled>
        Button
      </GSButton>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = jest.fn();
    render(
      <GSButton onClick={handleClick} loading>
        Button
      </GSButton>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    render(<GSButton onKeyDown={handleKeyDown}>Button</GSButton>);
    
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalled();
  });
});

describe('GSButton - Polymorphism', () => {
  it('renders as anchor when as="a"', () => {
    const { container } = render(
      <GSButton as="a" href="/test">
        Link
      </GSButton>
    );
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('has role="button" when not a native button', () => {
    render(
      <GSButton as="a" href="/test">
        Link
      </GSButton>
    );
    const link = screen.getByRole('button');
    expect(link.tagName).toBe('A');
  });

  it('has tabIndex when not a native button', () => {
    const { container } = render(
      <GSButton as="div">Custom Button</GSButton>
    );
    const div = container.querySelector('div[role="button"]');
    expect(div).toHaveAttribute('tabIndex', '0');
  });
});

describe('GSButton - Debug Mode', () => {
  it('enables debug mode when prop is true', () => {
    render(<GSButton debug>Button</GSButton>);
    // Debug mode is internal, just verify it doesn't crash
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('GSButton - Custom Props', () => {
  it('forwards className', () => {
    const { container } = render(<GSButton className="custom">Button</GSButton>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('custom');
  });

  it('forwards data attributes', () => {
    const { container } = render(
      <GSButton data-testid="custom-button">Button</GSButton>
    );
    const button = container.querySelector('[data-testid="custom-button"]');
    expect(button).toBeInTheDocument();
  });

  it('sets button type', () => {
    render(<GSButton type="submit">Button</GSButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

