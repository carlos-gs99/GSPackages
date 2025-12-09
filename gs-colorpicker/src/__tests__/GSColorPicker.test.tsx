import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GSColorPicker } from '../GSColorPicker';

describe('GSColorPicker', () => {
  describe('Rendering', () => {
    it('should render color picker', () => {
      const { container } = render(<GSColorPicker />);
      const input = container.querySelector('input[type="color"]');
      expect(input).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<GSColorPicker label="Color" />);
      expect(screen.getByText('Color')).toBeInTheDocument();
    });

    it('should render with value', () => {
      const { container } = render(<GSColorPicker value="#ff0000" />);
      const input = container.querySelector('input[type="color"]') as HTMLInputElement;
      expect(input).toHaveValue('#ff0000');
    });
  });

  describe('Props Forwarding', () => {
    it('should forward props to GSInput', () => {
      const { container } = render(<GSColorPicker placeholder="Select color" />);
      const input = container.querySelector('input[type="color"]');
      expect(input).toBeInTheDocument();
    });

    it('should support disabled prop', () => {
      const { container } = render(<GSColorPicker disabled />);
      const input = container.querySelector('input[type="color"]') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('should support required prop', () => {
      const { container } = render(<GSColorPicker required label="Color" />);
      // Component should render with required prop
      const input = container.querySelector('input[type="color"]');
      expect(input).toBeInTheDocument();
    });

    it('should support error prop', () => {
      render(<GSColorPicker error="Invalid color" />);
      expect(screen.getByText('Invalid color')).toBeInTheDocument();
    });

    it('should support helperText prop', () => {
      render(<GSColorPicker helperText="Choose a color" />);
      expect(screen.getByText('Choose a color')).toBeInTheDocument();
    });
  });

  describe('Type Attribute', () => {
    it('should always have type="color"', () => {
      const { container } = render(<GSColorPicker />);
      const input = container.querySelector('input[type="color"]');
      expect(input).toBeInTheDocument();
    });

    it('should always render with type="color"', () => {
      const { container } = render(<GSColorPicker />);
      const input = container.querySelector('input[type="color"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'color');
    });
  });

  describe('Controlled/Uncontrolled', () => {
    it('should work in controlled mode', () => {
      const { container, rerender } = render(<GSColorPicker value="#ff0000" />);
      const input = container.querySelector('input[type="color"]') as HTMLInputElement;
      expect(input).toHaveValue('#ff0000');
      
      rerender(<GSColorPicker value="#00ff00" />);
      expect(input).toHaveValue('#00ff00');
    });

    it('should work in uncontrolled mode', () => {
      const { container } = render(<GSColorPicker defaultValue="#0000ff" />);
      const input = container.querySelector('input[type="color"]') as HTMLInputElement;
      expect(input).toHaveValue('#0000ff');
    });
  });

  describe('onChange', () => {
    it('should call onChange when value changes', () => {
      const onChange = jest.fn();
      const { container } = render(<GSColorPicker onChange={onChange} />);
      const input = container.querySelector('input[type="color"]') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '#ff0000' } });
      expect(onChange).toHaveBeenCalled();
    });
  });
});

