import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GSChip } from '../GSChip';

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
}));

jest.mock('../i18n', () => ({
  GS_CHIP_NAMESPACE: 'gschip',
  registerGSChipI18n: jest.fn(),
}));

describe('GSChip - Basic Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders chip with children', () => {
    const { container } = render(<GSChip>Test Chip</GSChip>);
    expect(container.querySelector('[data-gs-el="content"]')).toHaveTextContent('Test Chip');
  });

  it('renders with data-gs attribute', () => {
    const { container } = render(<GSChip>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toBeInTheDocument();
  });

  it('renders as span by default', () => {
    const { container } = render(<GSChip>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip?.tagName).toBe('SPAN');
  });
});

describe('GSChip - Variants', () => {
  it('renders with soft variant (default)', () => {
    const { container } = render(<GSChip>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-variant', 'soft');
  });

  it('renders with outlined variant', () => {
    const { container } = render(<GSChip variant="outlined">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-variant', 'outlined');
  });

  it('renders with solid variant', () => {
    const { container } = render(<GSChip variant="solid">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-variant', 'solid');
  });
});

describe('GSChip - Colors', () => {
  it('renders with primary color (default)', () => {
    const { container } = render(<GSChip>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-color', 'primary');
  });

  it('renders with success color', () => {
    const { container } = render(<GSChip color="success">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-color', 'success');
  });

  it('renders with danger color', () => {
    const { container } = render(<GSChip color="danger">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-color', 'danger');
  });
});

describe('GSChip - Sizes', () => {
  it('renders with md size (default)', () => {
    const { container } = render(<GSChip>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-size', 'md');
  });

  it('renders with sm size', () => {
    const { container } = render(<GSChip size="sm">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-size', 'sm');
  });

  it('renders with lg size', () => {
    const { container } = render(<GSChip size="lg">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-size', 'lg');
  });
});

describe('GSChip - Deletable', () => {
  it('renders delete button when deletable', () => {
    const onDelete = jest.fn();
    const { container } = render(
      <GSChip deletable onDelete={onDelete}>
        Chip
      </GSChip>
    );
    const deleteBtn = container.querySelector('[data-gs-el="delete-button"]');
    expect(deleteBtn).toBeInTheDocument();
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = jest.fn();
    const { container } = render(
      <GSChip deletable onDelete={onDelete}>
        Chip
      </GSChip>
    );
    const deleteBtn = container.querySelector('[data-gs-el="delete-button"]') as HTMLButtonElement;
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('does not render delete button when not deletable', () => {
    const { container } = render(<GSChip>Chip</GSChip>);
    const deleteBtn = container.querySelector('[data-gs-el="delete-button"]');
    expect(deleteBtn).not.toBeInTheDocument();
  });
});

describe('GSChip - Icons', () => {
  it('renders start icon', () => {
    const { container } = render(
      <GSChip startIcon={<span data-testid="start-icon">→</span>}>Chip</GSChip>
    );
    const icon = container.querySelector('[data-gs-el="start-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders end icon', () => {
    const { container } = render(
      <GSChip endIcon={<span data-testid="end-icon">←</span>}>Chip</GSChip>
    );
    const icon = container.querySelector('[data-gs-el="end-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders both start and end icons', () => {
    const { container } = render(
      <GSChip
        startIcon={<span>→</span>}
        endIcon={<span>←</span>}
      >
        Chip
      </GSChip>
    );
    const startIcon = container.querySelector('[data-gs-el="start-icon"]');
    const endIcon = container.querySelector('[data-gs-el="end-icon"]');
    expect(startIcon).toBeInTheDocument();
    expect(endIcon).toBeInTheDocument();
  });
});

describe('GSChip - States', () => {
  it('applies disabled state', () => {
    const { container } = render(<GSChip disabled>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-disabled', 'true');
  });

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn();
    const { container } = render(
      <GSChip disabled onClick={onClick}>
        Chip
      </GSChip>
    );
    const chip = container.querySelector('[data-gs="GSChip"]') as HTMLElement;
    fireEvent.click(chip);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('GSChip - Interactions', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<GSChip onClick={onClick}>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]') as HTMLElement;
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has interactive state when onClick provided', () => {
    const { container } = render(<GSChip onClick={() => {}}>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-interactive', 'true');
  });

  it('has role="button" when interactive', () => {
    const { container } = render(<GSChip onClick={() => {}}>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('role', 'button');
  });

  it('has tabIndex="0" when interactive', () => {
    const { container } = render(<GSChip onClick={() => {}}>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('tabIndex', '0');
  });
});

describe('GSChip - Polymorphism', () => {
  it('renders as span by default', () => {
    const { container } = render(<GSChip>Default Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip?.tagName).toBe('SPAN');
  });

  it('renders as button when as="button"', () => {
    const { container } = render(<GSChip as="button">Button Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip?.tagName).toBe('BUTTON');
  });

  it('renders as anchor when as="a"', () => {
    const { container } = render(
      <GSChip as="a" href="/profile">
        Link Chip
      </GSChip>
    );
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip?.tagName).toBe('A');
    expect(chip).toHaveAttribute('href', '/profile');
  });

  it('renders as div when as="div"', () => {
    const { container } = render(<GSChip as="div">Div Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip?.tagName).toBe('DIV');
  });

  it('anchor chip accepts href and target props', () => {
    const { container } = render(
      <GSChip as="a" href="https://example.com" target="_blank" rel="noopener">
        External Link
      </GSChip>
    );
    const chip = container.querySelector('a');
    expect(chip).toHaveAttribute('href', 'https://example.com');
    expect(chip).toHaveAttribute('target', '_blank');
    expect(chip).toHaveAttribute('rel', 'noopener');
  });

  it('button chip accepts type prop', () => {
    const { container } = render(
      <GSChip as="button" type="submit">
        Submit Chip
      </GSChip>
    );
    const chip = container.querySelector('button');
    expect(chip).toHaveAttribute('type', 'submit');
  });
});

describe('GSChip - Accessibility', () => {
  it('has aria-label', () => {
    const { container } = render(<GSChip ariaLabel="Custom label">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('aria-label', 'Custom label');
  });

  it('has aria-disabled when disabled', () => {
    const { container } = render(<GSChip disabled>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('aria-disabled', 'true');
  });

  it('delete button has aria-label', () => {
    const { container } = render(
      <GSChip deletable onDelete={() => {}}>
        Chip
      </GSChip>
    );
    const deleteBtn = container.querySelector('[data-gs-el="delete-button"]');
    expect(deleteBtn).toHaveAttribute('aria-label');
  });
});

describe('GSChip - Debug Mode', () => {
  it('adds debug attribute when enabled', () => {
    const { container } = render(<GSChip debug>Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip).toHaveAttribute('data-debug', 'true');
  });
});

describe('GSChip - Custom Props', () => {
  it('forwards className', () => {
    const { container } = render(<GSChip className="custom">Chip</GSChip>);
    const chip = container.querySelector('[data-gs="GSChip"]');
    expect(chip?.className).toContain('custom');
  });

  it('forwards data attributes', () => {
    const { container } = render(
      <GSChip data-testid="custom-chip">Chip</GSChip>
    );
    const chip = container.querySelector('[data-testid="custom-chip"]');
    expect(chip).toBeInTheDocument();
  });
});

