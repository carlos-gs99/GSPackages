import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSModal } from '../GSModal';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSModal', () => {
  describe('Rendering', () => {
    it('should not render when open is false', () => {
      const { container } = render(
        <GSModal open={false}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const modal = document.querySelector('[data-gs="GSModal"]');
      expect(modal).not.toBeInTheDocument();
    });

    it('should render when open is true', () => {
      render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const modal = document.querySelector('[data-gs="GSModal"]');
      expect(modal).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(
        <GSModal open>
          <GSModal.Body>Modal content</GSModal.Body>
        </GSModal>
      );
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('should support show prop as alternative to open', () => {
      render(
        <GSModal show>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const modal = document.querySelector('[data-gs="GSModal"]');
      expect(modal).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(
          <GSModal open size={size}>
            <GSModal.Body>Content</GSModal.Body>
          </GSModal>
        );
        const dialog = document.querySelector('[data-gs-el="dialog"]');
        expect(dialog).toBeInTheDocument();
      });
    });
  });

  describe('Variants', () => {
    const variants: Array<'solid' | 'outlined' | 'soft' | 'plain'> = [
      'solid',
      'outlined',
      'soft',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        render(
          <GSModal open variant={variant}>
            <GSModal.Body>Content</GSModal.Body>
          </GSModal>
        );
        const dialog = document.querySelector('[data-gs-el="dialog"]');
        expect(dialog).toBeInTheDocument();
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
          <GSModal open color={color}>
            <GSModal.Body>Content</GSModal.Body>
          </GSModal>
        );
        const dialog = document.querySelector('[data-gs-el="dialog"]');
        expect(dialog).toBeInTheDocument();
      });
    });
  });

  describe('Centered', () => {
    it('should be centered by default', () => {
      render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[data-gs-el="dialog"]');
      expect(dialog).toBeInTheDocument();
    });

    it('should not be centered when centered is false', () => {
      render(
        <GSModal open centered={false}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[data-gs-el="dialog"]');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Backdrop', () => {
    it('should show backdrop by default', () => {
      render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const overlay = document.querySelector('[data-gs="GSModal"]');
      expect(overlay).toBeInTheDocument();
    });

    it('should not show backdrop when backdrop is false', () => {
      render(
        <GSModal open backdrop={false}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const overlay = document.querySelector('[data-gs="GSModal"]');
      expect(overlay).toBeInTheDocument();
    });

    it('should call onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      render(
        <GSModal open onClose={onClose}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const overlay = document.querySelector('[data-gs="GSModal"]');
      fireEvent.click(overlay!);
      expect(onClose).toHaveBeenCalled();
    });

    it('should not call onClose when backdrop is static', () => {
      const onClose = jest.fn();
      render(
        <GSModal open backdrop="static" onClose={onClose}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const overlay = document.querySelector('[data-gs="GSModal"]');
      fireEvent.click(overlay!);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Handling', () => {
    it('should close on Escape key by default', () => {
      const onClose = jest.fn();
      render(
        <GSModal open onClose={onClose}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });

    it('should not close on Escape when keyboard is false', () => {
      const onClose = jest.fn();
      render(
        <GSModal open keyboard={false} onClose={onClose}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not close on Escape when closeOnEscape is false', () => {
      const onClose = jest.fn();
      render(
        <GSModal open closeOnEscape={false} onClose={onClose}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Close Handlers', () => {
    it('should call onClose when provided', () => {
      const onClose = jest.fn();
      render(
        <GSModal open onClose={onClose}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });

    it('should call onHide when provided', () => {
      const onHide = jest.fn();
      render(
        <GSModal open onHide={onHide}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onHide).toHaveBeenCalled();
    });

    it('should prioritize onHide over onClose', () => {
      const onClose = jest.fn();
      const onHide = jest.fn();
      render(
        <GSModal open onClose={onClose} onHide={onHide}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(onHide).toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Animations', () => {
    const animations: Array<'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none'> = [
      'fade',
      'scale',
      'slide-up',
      'slide-down',
      'none',
    ];

    animations.forEach((animation) => {
      it(`should support ${animation} animation`, () => {
        render(
          <GSModal open animation={animation}>
            <GSModal.Body>Content</GSModal.Body>
          </GSModal>
        );
        const dialog = document.querySelector('[data-gs-el="dialog"]');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('should apply custom animation duration', () => {
      render(
        <GSModal open animationDuration={500}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[data-gs-el="dialog"]');
      expect(dialog).toHaveStyle({ animationDuration: '500ms' });
    });
  });

  describe('Confirm Mode', () => {
    it('should render confirm footer when mode is confirm', () => {
      render(
        <GSModal open mode="confirm">
          <GSModal.Body>Are you sure?</GSModal.Body>
        </GSModal>
      );
      const confirmButton = document.querySelector('[data-gs-el="confirm-button"]');
      const cancelButton = document.querySelector('[data-gs-el="cancel-button"]');
      expect(confirmButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    it('should call onConfirm when confirm button is clicked', () => {
      const onConfirm = jest.fn();
      render(
        <GSModal open mode="confirm" onConfirm={onConfirm}>
          <GSModal.Body>Are you sure?</GSModal.Body>
        </GSModal>
      );
      const confirmButton = document.querySelector('[data-gs-el="confirm-button"]');
      fireEvent.click(confirmButton!);
      expect(onConfirm).toHaveBeenCalled();
    });

    it('should call onCancel when cancel button is clicked', () => {
      const onCancel = jest.fn();
      render(
        <GSModal open mode="confirm" onCancel={onCancel}>
          <GSModal.Body>Are you sure?</GSModal.Body>
        </GSModal>
      );
      const cancelButton = document.querySelector('[data-gs-el="cancel-button"]');
      fireEvent.click(cancelButton!);
      expect(onCancel).toHaveBeenCalled();
    });

    it('should use custom confirm text', () => {
      render(
        <GSModal open mode="confirm" confirmText="Yes">
          <GSModal.Body>Are you sure?</GSModal.Body>
        </GSModal>
      );
      const confirmButton = document.querySelector('[data-gs-el="confirm-button"]');
      expect(confirmButton).toHaveTextContent('Yes');
    });

    it('should use custom cancel text', () => {
      render(
        <GSModal open mode="confirm" cancelText="No">
          <GSModal.Body>Are you sure?</GSModal.Body>
        </GSModal>
      );
      const cancelButton = document.querySelector('[data-gs-el="cancel-button"]');
      expect(cancelButton).toHaveTextContent('No');
    });
  });

  describe('Compound Components', () => {
    it('should render GSModal.Header', () => {
      render(
        <GSModal open>
          <GSModal.Header>Header</GSModal.Header>
          <GSModal.Body>Body</GSModal.Body>
        </GSModal>
      );
      const header = document.querySelector('[data-gs-el="header"]');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Header');
    });

    it('should render GSModal.Title', () => {
      render(
        <GSModal open>
          <GSModal.Header>
            <GSModal.Title>Title</GSModal.Title>
          </GSModal.Header>
          <GSModal.Body>Body</GSModal.Body>
        </GSModal>
      );
      const title = document.querySelector('[data-gs-el="title"]');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Title');
    });

    it('should render GSModal.Body', () => {
      render(
        <GSModal open>
          <GSModal.Body>Body content</GSModal.Body>
        </GSModal>
      );
      const body = document.querySelector('[data-gs-el="body"]');
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent('Body content');
    });

    it('should render GSModal.Footer', () => {
      render(
        <GSModal open>
          <GSModal.Body>Body</GSModal.Body>
          <GSModal.Footer>Footer</GSModal.Footer>
        </GSModal>
      );
      const footer = document.querySelector('[data-gs-el="footer"]');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveTextContent('Footer');
    });

    it('should render close button in header when closeButton is true', () => {
      const onClose = jest.fn();
      render(
        <GSModal open onClose={onClose}>
          <GSModal.Header closeButton>Header</GSModal.Header>
          <GSModal.Body>Body</GSModal.Body>
        </GSModal>
      );
      const closeButton = document.querySelector('[data-gs-el="close"]');
      expect(closeButton).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <GSModal open onClose={onClose}>
          <GSModal.Header closeButton>Header</GSModal.Header>
          <GSModal.Body>Body</GSModal.Body>
        </GSModal>
      );
      const closeButton = document.querySelector('[data-gs-el="close"]');
      fireEvent.click(closeButton!);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="dialog"', () => {
      render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should use custom aria-label', () => {
      render(
        <GSModal open ariaLabel="Custom label">
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should use aria-labelledby', () => {
      render(
        <GSModal open ariaLabelledBy="title-id">
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-labelledby', 'title-id');
    });

    it('should use aria-describedby', () => {
      render(
        <GSModal open ariaDescribedBy="description-id">
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-describedby', 'description-id');
    });
  });

  describe('Body Overflow', () => {
    it('should set body overflow to hidden when modal is open', () => {
      render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body overflow when modal is closed', () => {
      const { rerender } = render(
        <GSModal open>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      expect(document.body.style.overflow).toBe('hidden');
      
      rerender(
        <GSModal open={false}>
          <GSModal.Body>Content</GSModal.Body>
        </GSModal>
      );
      // Wait for animation to complete
      waitFor(() => {
        expect(document.body.style.overflow).toBe('');
      });
    });
  });
});

