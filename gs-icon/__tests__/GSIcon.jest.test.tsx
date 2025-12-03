import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { GSIcon } from '../src/GSIcon';

// Mock dependencies
jest.mock('../src/iconMap', () => ({
  resolveMdiPath: jest.fn(async (name: string) => {
    if (name === 'home' || name === 'mdi-home') {
      return 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z';
    }
    if (name === 'nonexistent') {
      return null;
    }
    return 'M12 2L2 7l10 5 10-5-10-5z';
  }),
}));

jest.mock('../src/i18n', () => ({
  registerGSIconI18n: jest.fn(),
}));

describe('GSIcon with Jest', () => {
  it('renders component', async () => {
    const { container } = render(<GSIcon name="home" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toBeInTheDocument();
    });
  });

  it('renders with correct data attributes', async () => {
    const { container } = render(<GSIcon name="home" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveAttribute('data-size', 'md');
      expect(span).toHaveAttribute('data-color', 'currentColor');
    });
  });

  it('renders SVG element', async () => {
    const { container } = render(<GSIcon name="home" />);
    
    await waitFor(() => {
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  it('applies size variant', async () => {
    const { container } = render(<GSIcon name="home" size="lg" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveAttribute('data-size', 'lg');
    });
  });

  it('applies color variant', async () => {
    const { container } = render(<GSIcon name="home" color="primary" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveAttribute('data-color', 'primary');
    });
  });

  it('is aria-hidden when decorative', async () => {
    const { container } = render(<GSIcon name="home" decorative />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('has aria-label when provided', async () => {
    const { container } = render(<GSIcon name="home" ariaLabel="Home icon" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveAttribute('aria-label', 'Home icon');
    });
  });

  it('shows fallback for missing icon', async () => {
    const { container } = render(<GSIcon name="nonexistent" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-missing="true"]');
      expect(span).toBeInTheDocument();
      expect(span).toHaveTextContent('?');
    });
  });

  it('forwards className', async () => {
    const { container } = render(<GSIcon name="home" className="custom" />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveClass('custom');
    });
  });

  it('adds debug attribute when enabled', async () => {
    const { container } = render(<GSIcon name="home" debug={true} />);
    
    await waitFor(() => {
      const span = container.querySelector('[data-gs="GSIcon"]');
      expect(span).toHaveAttribute('data-debug', 'true');
    });
  });
});

