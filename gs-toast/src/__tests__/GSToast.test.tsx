import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSToast } from '../GSToast';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSToast', () => {
  describe('Rendering', () => {
    it('should not render when open is false', () => {
      render(<GSToast open={false}>Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      expect(toast).not.toBeInTheDocument();
    });

    it('should render when open is true', () => {
      render(<GSToast open>Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      expect(toast).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(<GSToast open>Toast message</GSToast>);
      expect(screen.getByText('Toast message')).toBeInTheDocument();
    });

    it('should render title when provided', () => {
      render(
        <GSToast open title="Title">
          Message
        </GSToast>
      );
      const title = document.querySelector('[data-gs-el="title"]');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Title');
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
        render(<GSToast open variant={variant}>Message</GSToast>);
        const toast = document.querySelector('[data-gs="GSToast"]');
        expect(toast).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        render(<GSToast open color={color}>Message</GSToast>);
        const toast = document.querySelector('[data-gs="GSToast"]');
        expect(toast).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        render(<GSToast open size={size}>Message</GSToast>);
        const toast = document.querySelector('[data-gs="GSToast"]');
        expect(toast).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Positions', () => {
    const positions: Array<
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
    > = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];

    positions.forEach((position) => {
      it(`should render at ${position} position`, () => {
        render(<GSToast open position={position}>Message</GSToast>);
        const toast = document.querySelector('[data-gs="GSToast"]');
        expect(toast).toHaveAttribute('data-position', position);
      });
    });
  });

  describe('Icons', () => {
    it('should show icon by default', () => {
      render(<GSToast open>Message</GSToast>);
      const icon = document.querySelector('[data-gs-el="icon"]');
      expect(icon).toBeInTheDocument();
    });

    it('should not show icon when showIcon is false', () => {
      render(<GSToast open showIcon={false}>Message</GSToast>);
      const icon = document.querySelector('[data-gs-el="icon"]');
      expect(icon).not.toBeInTheDocument();
    });

    it('should show custom icon when provided', () => {
      render(<GSToast open icon={<span>Custom</span>}>Message</GSToast>);
      const icon = document.querySelector('[data-gs-el="icon"]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveTextContent('Custom');
    });
  });

  describe('Close Button', () => {
    it('should show close button by default', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose}>Message</GSToast>);
      const closeButton = document.querySelector('[data-gs-el="close"]');
      expect(closeButton).toBeInTheDocument();
    });

    it('should not show close button when showCloseButton is false', () => {
      const onClose = jest.fn();
      render(
        <GSToast open onClose={onClose} showCloseButton={false}>
          Message
        </GSToast>
      );
      const closeButton = document.querySelector('[data-gs-el="close"]');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose}>Message</GSToast>);
      const closeButton = document.querySelector('[data-gs-el="close"]');
      fireEvent.click(closeButton!);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Progress Bar', () => {
    it('should show progress bar by default', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose}>Message</GSToast>);
      const progressBar = document.querySelector('[data-gs-el="progress"]');
      expect(progressBar).toBeInTheDocument();
    });

    it('should not show progress bar when showProgressBar is false', () => {
      const onClose = jest.fn();
      render(
        <GSToast open onClose={onClose} showProgressBar={false}>
          Message
        </GSToast>
      );
      const progressBar = document.querySelector('[data-gs-el="progress"]');
      expect(progressBar).not.toBeInTheDocument();
    });

    it('should not show progress bar when autoHideDuration is 0', () => {
      const onClose = jest.fn();
      render(
        <GSToast open onClose={onClose} autoHideDuration={0}>
          Message
        </GSToast>
      );
      const progressBar = document.querySelector('[data-gs-el="progress"]');
      expect(progressBar).not.toBeInTheDocument();
    });
  });

  describe('Auto Hide', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call onClose after autoHideDuration', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose} autoHideDuration={1000}>Message</GSToast>);
      
      expect(onClose).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not auto-hide when autoHideDuration is 0', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose} autoHideDuration={0}>Message</GSToast>);
      
      jest.advanceTimersByTime(5000);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not auto-hide when onClose is not provided', () => {
      render(<GSToast open autoHideDuration={1000}>Message</GSToast>);
      
      jest.advanceTimersByTime(1000);
      const toast = document.querySelector('[data-gs="GSToast"]');
      expect(toast).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have role="status"', () => {
      render(<GSToast open>Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      expect(toast).toHaveAttribute('role', 'status');
    });

    it('should have aria-live="polite"', () => {
      render(<GSToast open>Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });

    it('should use custom aria-label when provided', () => {
      render(<GSToast open ariaLabel="Custom label">Message</GSToast>);
      const toast = document.querySelector('[data-gs="GSToast"]');
      expect(toast).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should have aria-valuenow on progress bar', () => {
      const onClose = jest.fn();
      render(<GSToast open onClose={onClose}>Message</GSToast>);
      const progressBar = document.querySelector('[data-gs-el="progress"]');
      expect(progressBar).toHaveAttribute('aria-valuenow');
    });
  });
});

