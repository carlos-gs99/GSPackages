import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSSlider } from '../GSSlider';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSlider', () => {
  describe('Rendering', () => {
    it('should render slider', () => {
      const { container } = render(<GSSlider />);
      const slider = container.querySelector('[data-gs="GSSlider"]');
      expect(slider).toBeInTheDocument();
    });

    it('should render track', () => {
      const { container } = render(<GSSlider />);
      const track = container.querySelector('[data-gs-el="track"]');
      expect(track).toBeInTheDocument();
    });

    it('should render thumb', () => {
      const { container } = render(<GSSlider />);
      const thumb = container.querySelector('[data-gs-el="thumb"]');
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSSlider size={size} />);
        const slider = container.querySelector('[data-gs="GSSlider"]');
        expect(slider).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color correctly`, () => {
        const { container } = render(<GSSlider color={color} />);
        const slider = container.querySelector('[data-gs="GSSlider"]');
        expect(slider).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Value', () => {
    it('should use value prop in controlled mode', () => {
      render(<GSSlider value={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('should use defaultValue in uncontrolled mode', () => {
      const { container } = render(<GSSlider defaultValue={25} />);
      const slider = container.querySelector('[data-gs="GSSlider"]');
      expect(slider).toBeInTheDocument();
    });

    it('should call onChange when value changes', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSlider onChange={onChange} />);
      const thumb = container.querySelector('[data-gs-el="thumb"]') as HTMLElement;
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Min/Max', () => {
    it('should respect min value', () => {
      render(<GSSlider min={10} max={100} value={10} />);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('should respect max value', () => {
      render(<GSSlider min={0} max={200} value={200} />);
      expect(screen.getByText('200')).toBeInTheDocument();
    });
  });

  describe('Step', () => {
    it('should respect step value', () => {
      const { container } = render(<GSSlider step={5} />);
      const slider = container.querySelector('[data-gs="GSSlider"]');
      expect(slider).toBeInTheDocument();
    });
  });

  describe('Marks', () => {
    it('should render marks when marks prop is true', () => {
      const { container } = render(<GSSlider marks={true} />);
      const marks = container.querySelectorAll('[class*="mark"]');
      expect(marks.length).toBeGreaterThan(0);
    });

    it('should not render marks when marks prop is false', () => {
      const { container } = render(<GSSlider marks={false} />);
      const marks = container.querySelectorAll('[class*="mark"]');
      expect(marks.length).toBe(0);
    });
  });

  describe('Value Display', () => {
    it('should show value when showValue is true', () => {
      render(<GSSlider value={50} showValue={true} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('should not show value when showValue is false', () => {
      const { container } = render(<GSSlider value={50} showValue={false} />);
      const valueDisplay = container.querySelector('[data-gs-el="value"]');
      expect(valueDisplay).not.toBeInTheDocument();
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled prop is true', () => {
      const { container } = render(<GSSlider disabled />);
      const thumb = container.querySelector('[data-gs-el="thumb"]') as HTMLButtonElement;
      expect(thumb).toBeDisabled();
    });

    it('should have data-disabled attribute when disabled', () => {
      const { container } = render(<GSSlider disabled />);
      const slider = container.querySelector('[data-gs="GSSlider"]');
      expect(slider).toHaveAttribute('data-disabled');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should decrease value on ArrowLeft', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSlider value={50} onChange={onChange} />);
      const thumb = container.querySelector('[data-gs-el="thumb"]') as HTMLElement;
      fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
      expect(onChange).toHaveBeenCalled();
    });

    it('should increase value on ArrowRight', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSlider value={50} onChange={onChange} />);
      const thumb = container.querySelector('[data-gs-el="thumb"]') as HTMLElement;
      fireEvent.keyDown(thumb, { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalled();
    });

    it('should set to min on Home key', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSlider value={50} min={0} max={100} onChange={onChange} />);
      const thumb = container.querySelector('[data-gs-el="thumb"]') as HTMLElement;
      fireEvent.keyDown(thumb, { key: 'Home' });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('should set to max on End key', () => {
      const onChange = jest.fn();
      const { container } = render(<GSSlider value={50} min={0} max={100} onChange={onChange} />);
      const thumb = container.querySelector('[data-gs-el="thumb"]') as HTMLElement;
      fireEvent.keyDown(thumb, { key: 'End' });
      expect(onChange).toHaveBeenCalledWith(100);
    });
  });
});

