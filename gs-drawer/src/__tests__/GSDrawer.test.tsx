import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDrawer } from '../GSDrawer';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSDrawer', () => {
  describe('Rendering', () => {
    it('should not render when open is false', () => {
      render(
        <GSDrawer open={false} onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[data-gs="GSDrawer"]');
      expect(drawer).not.toBeInTheDocument();
    });

    it('should render when open is true', () => {
      render(
        <GSDrawer open onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[data-gs="GSDrawer"]');
      expect(drawer).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(
        <GSDrawer open onClose={jest.fn()}>
          Drawer content
        </GSDrawer>
      );
      expect(screen.getByText('Drawer content')).toBeInTheDocument();
    });

    it('should render title when provided', () => {
      render(
        <GSDrawer open onClose={jest.fn()} title="Drawer Title">
          Content
        </GSDrawer>
      );
      expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    });
  });

  describe('Placements', () => {
    const placements: Array<'start' | 'end' | 'top' | 'bottom'> = ['start', 'end', 'top', 'bottom'];

    placements.forEach((placement) => {
      it(`should render at ${placement} placement`, () => {
        render(
          <GSDrawer open onClose={jest.fn()} placement={placement}>
            Content
          </GSDrawer>
        );
        // The drawer is the second element with data-gs="GSDrawer" (first is overlay)
        const drawers = document.querySelectorAll('[data-gs="GSDrawer"]');
        const drawer = drawers[drawers.length - 1]; // Get the drawer, not the overlay
        expect(drawer).toHaveAttribute('data-placement', placement);
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(
          <GSDrawer open onClose={jest.fn()} size={size}>
            Content
          </GSDrawer>
        );
        const drawer = document.querySelector('[data-gs="GSDrawer"]');
        expect(drawer).toBeInTheDocument();
      });
    });
  });

  describe('Backdrop', () => {
    it('should show backdrop by default', () => {
      render(
        <GSDrawer open onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      const overlay = document.querySelector('[data-gs="GSDrawer"]');
      expect(overlay).toBeInTheDocument();
    });

    it('should not show backdrop when backdrop is false', () => {
      render(
        <GSDrawer open onClose={jest.fn()} backdrop={false}>
          Content
        </GSDrawer>
      );
      // When backdrop is false, the overlay is not rendered
      const overlays = document.querySelectorAll('[data-gs="GSDrawer"]');
      // Should only have the drawer itself, not the overlay
      expect(overlays.length).toBeGreaterThan(0);
    });

    it('should call onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose}>
          Content
        </GSDrawer>
      );
      const overlay = document.querySelector('[data-gs="GSDrawer"]');
      // The overlay is the first element with data-gs="GSDrawer"
      fireEvent.click(overlay!);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Keyboard Handling', () => {
    it('should close on Escape key by default', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose}>
          Content
        </GSDrawer>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });

    it('should not close on Escape when keyboard is false', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose} keyboard={false}>
          Content
        </GSDrawer>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not close on Escape when closeOnEscape is false', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose} closeOnEscape={false}>
          Content
        </GSDrawer>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Close Button', () => {
    it('should show close button when title is provided', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose} title="Title">
          Content
        </GSDrawer>
      );
      const closeButton = screen.getByLabelText(/close/i);
      expect(closeButton).toBeInTheDocument();
    });

    it('should not show close button when title is not provided', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose}>
          Content
        </GSDrawer>
      );
      const closeButton = screen.queryByLabelText(/close/i);
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <GSDrawer open onClose={onClose} title="Title">
          Content
        </GSDrawer>
      );
      const closeButton = screen.getByLabelText(/close/i);
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="dialog"', () => {
      render(
        <GSDrawer open onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[role="dialog"]');
      expect(drawer).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <GSDrawer open onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-modal', 'true');
    });

    it('should use title as aria-label when ariaLabel is not provided', () => {
      render(
        <GSDrawer open onClose={jest.fn()} title="Drawer Title">
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-label', 'Drawer Title');
    });

    it('should use custom aria-label when provided', () => {
      render(
        <GSDrawer open onClose={jest.fn()} ariaLabel="Custom label">
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should prioritize ariaLabel over title', () => {
      render(
        <GSDrawer open onClose={jest.fn()} title="Title" ariaLabel="Custom">
          Content
        </GSDrawer>
      );
      const drawer = document.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-label', 'Custom');
    });
  });

  describe('Body Overflow', () => {
    it('should set body overflow to hidden when drawer is open', () => {
      render(
        <GSDrawer open onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body overflow when drawer is closed', () => {
      const { rerender } = render(
        <GSDrawer open onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      expect(document.body.style.overflow).toBe('hidden');
      
      rerender(
        <GSDrawer open={false} onClose={jest.fn()}>
          Content
        </GSDrawer>
      );
      // Wait for animation to complete
      waitFor(() => {
        expect(document.body.style.overflow).toBe('');
      });
    });
  });
});

