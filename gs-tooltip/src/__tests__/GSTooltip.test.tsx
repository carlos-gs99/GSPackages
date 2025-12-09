import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTooltip } from '../GSTooltip';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSTooltip', () => {
  describe('Rendering', () => {
    it('should render trigger element', () => {
      const { container } = render(
        <GSTooltip content="Tooltip content">
          <button>Hover me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Hover me');
      expect(button).toBeInTheDocument();
    });

    it('should not render tooltip by default', () => {
      render(
        <GSTooltip content="Tooltip content">
          <button>Hover me</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).not.toBeInTheDocument();
    });

    it('should render tooltip when open is true', () => {
      render(
        <GSTooltip content="Tooltip content" open>
          <button>Hover me</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toBeInTheDocument();
    });

    it('should render tooltip content', () => {
      const { container } = render(
        <GSTooltip content="Tooltip content" open>
          <button>Hover me</button>
        </GSTooltip>
      );
      expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    });
  });

  describe('Placements', () => {
    const placements: Array<
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'left-start'
      | 'left-end'
      | 'right-start'
      | 'right-end'
    > = [
      'top',
      'bottom',
      'left',
      'right',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-start',
      'left-end',
      'right-start',
      'right-end',
    ];

    placements.forEach((placement) => {
      it(`should render with ${placement} placement`, () => {
        render(
          <GSTooltip content="Content" placement={placement} open>
            <button>Trigger</button>
          </GSTooltip>
        );
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    const variants: Array<'solid' | 'outlined' | 'soft'> = ['solid', 'outlined', 'soft'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        render(
          <GSTooltip content="Content" variant={variant} open>
            <button>Trigger</button>
          </GSTooltip>
        );
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        render(
          <GSTooltip content="Content" color={color} open>
            <button>Trigger</button>
          </GSTooltip>
        );
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(
          <GSTooltip content="Content" size={size} open>
            <button>Trigger</button>
          </GSTooltip>
        );
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Arrow', () => {
    it('should render arrow when arrow is true', () => {
      render(
        <GSTooltip content="Content" arrow open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const arrow = document.querySelector('[data-gs="GSTooltip"] .arrow');
      expect(arrow).toBeInTheDocument();
    });

    it('should not render arrow when arrow is false', () => {
      render(
        <GSTooltip content="Content" arrow={false} open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const arrow = document.querySelector('[data-gs="GSTooltip"] .arrow');
      expect(arrow).not.toBeInTheDocument();
    });
  });

  describe('Triggers', () => {
    it('should show tooltip on hover when trigger is hover', async () => {
      render(
        <GSTooltip content="Content" trigger="hover" enterDelay={0}>
          <button>Hover me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Hover me');
      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should show tooltip on focus when trigger is focus', async () => {
      render(
        <GSTooltip content="Content" trigger="focus" enterDelay={0}>
          <button>Focus me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Focus me');
      fireEvent.focus(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toBeInTheDocument();
      });
    });

    it('should toggle tooltip on click when trigger is click', () => {
      render(
        <GSTooltip content="Content" trigger="click">
          <button>Click me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Click me');
      fireEvent.click(button);
      
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toBeInTheDocument();
    });

    it('should support multiple triggers', async () => {
      render(
        <GSTooltip content="Content" trigger={['hover', 'focus']} enterDelay={0}>
          <button>Trigger</button>
        </GSTooltip>
      );
      const button = screen.getByText('Trigger');
      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toBeInTheDocument();
      });
    });
  });

  describe('Delays', () => {
    it('should respect enterDelay', async () => {
      jest.useFakeTimers();
      render(
        <GSTooltip content="Content" trigger="hover" enterDelay={500}>
          <button>Hover me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Hover me');
      fireEvent.mouseEnter(button);
      
      // Tooltip should not appear immediately
      let tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).not.toBeInTheDocument();
      
      // Fast-forward time
      jest.advanceTimersByTime(500);
      
      await waitFor(() => {
        tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toBeInTheDocument();
      });
      
      jest.useRealTimers();
    });

    it('should respect leaveDelay', async () => {
      jest.useFakeTimers();
      render(
        <GSTooltip content="Content" trigger="hover" enterDelay={0} leaveDelay={500}>
          <button>Hover me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Hover me');
      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).toBeInTheDocument();
      });
      
      fireEvent.mouseLeave(button);
      
      // Tooltip should still be visible
      let tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toBeInTheDocument();
      
      // Fast-forward time
      jest.advanceTimersByTime(500);
      
      await waitFor(() => {
        tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).not.toBeInTheDocument();
      });
      
      jest.useRealTimers();
    });
  });

  describe('Controlled State', () => {
    it('should use controlled open state', () => {
      const { rerender } = render(
        <GSTooltip content="Content" open={false}>
          <button>Trigger</button>
        </GSTooltip>
      );
      let tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).not.toBeInTheDocument();

      rerender(
        <GSTooltip content="Content" open={true}>
          <button>Trigger</button>
        </GSTooltip>
      );
      tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toBeInTheDocument();
    });

    it('should call onOpenChange when state changes', () => {
      const onOpenChange = jest.fn();
      render(
        <GSTooltip content="Content" trigger="click" onOpenChange={onOpenChange}>
          <button>Trigger</button>
        </GSTooltip>
      );
      const button = screen.getByText('Trigger');
      fireEvent.click(button);
      expect(onOpenChange).toHaveBeenCalled();
    });
  });

  describe('Uncontrolled State', () => {
    it('should use defaultOpen prop', () => {
      render(
        <GSTooltip content="Content" defaultOpen>
          <button>Trigger</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toBeInTheDocument();
    });
  });

  describe('Disabled', () => {
    it('should not show tooltip when disabled', async () => {
      render(
        <GSTooltip content="Content" disabled trigger="hover" enterDelay={0}>
          <button>Hover me</button>
        </GSTooltip>
      );
      const button = screen.getByText('Hover me');
      fireEvent.mouseEnter(button);
      
      await waitFor(() => {
        const tooltip = document.querySelector('[data-gs="GSTooltip"]');
        expect(tooltip).not.toBeInTheDocument();
      });
    });

    it('should not show tooltip when disabled and open is true', () => {
      render(
        <GSTooltip content="Content" disabled open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply custom className', () => {
      render(
        <GSTooltip content="Content" className="custom-tooltip" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toHaveClass('custom-tooltip');
    });

    it('should apply custom contentClassName', () => {
      render(
        <GSTooltip content="Content" contentClassName="custom-content" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const content = document.querySelector('[data-gs="GSTooltip"] .content');
      expect(content).toHaveClass('custom-content');
    });

    it('should apply custom style', () => {
      render(
        <GSTooltip content="Content" style={{ margin: '10px' }} open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toHaveStyle({ margin: '10px' });
    });

    it('should apply custom maxWidth', () => {
      render(
        <GSTooltip content="Content" maxWidth="500px" open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toHaveStyle({ maxWidth: '500px' });
    });

    it('should apply custom zIndex', () => {
      render(
        <GSTooltip content="Content" zIndex={10000} open>
          <button>Trigger</button>
        </GSTooltip>
      );
      const tooltip = document.querySelector('[data-gs="GSTooltip"]');
      expect(tooltip).toHaveStyle({ zIndex: 10000 });
    });
  });
});

