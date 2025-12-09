import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAccordion } from '../GSAccordion';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSAccordion', () => {
  const mockItems = [
    { id: '1', title: 'Item 1', content: 'Content 1' },
    { id: '2', title: 'Item 2', content: 'Content 2' },
    { id: '3', title: 'Item 3', content: 'Content 3' },
  ];

  describe('Rendering', () => {
    it('should render accordion with items', () => {
      const { container } = render(<GSAccordion items={mockItems} />);
      const accordion = container.querySelector('[data-gs="GSAccordion"]');
      expect(accordion).toBeInTheDocument();
    });

    it('should render all items', () => {
      render(<GSAccordion items={mockItems} />);
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should not render content by default', () => {
      render(<GSAccordion items={mockItems} />);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('should render content when item is expanded', () => {
      render(<GSAccordion items={mockItems} defaultExpanded={['1']} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    const variants: Array<'outlined' | 'soft' | 'plain'> = ['outlined', 'soft', 'plain'];

    variants.forEach((variant) => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(<GSAccordion items={mockItems} variant={variant} />);
        const accordion = container.querySelector('[data-gs="GSAccordion"]');
        expect(accordion).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(<GSAccordion items={mockItems} size={size} />);
        const accordion = container.querySelector('[data-gs="GSAccordion"]');
        expect(accordion).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Expansion', () => {
    it('should expand item when header is clicked', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.click(header!);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should collapse item when header is clicked again', () => {
      render(<GSAccordion items={mockItems} defaultExpanded={['1']} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.click(header!);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('should use defaultExpanded prop', () => {
      render(<GSAccordion items={mockItems} defaultExpanded={['1', '2']} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Multiple Expansion', () => {
    it('should allow multiple items expanded when multiple is true', () => {
      render(<GSAccordion items={mockItems} multiple />);
      const header1 = screen.getByText('Item 1').closest('button');
      const header2 = screen.getByText('Item 2').closest('button');
      
      fireEvent.click(header1!);
      fireEvent.click(header2!);
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should only allow one item expanded when multiple is false', () => {
      render(<GSAccordion items={mockItems} multiple={false} />);
      const header1 = screen.getByText('Item 1').closest('button');
      const header2 = screen.getByText('Item 2').closest('button');
      
      fireEvent.click(header1!);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      fireEvent.click(header2!);
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  describe('Disabled Items', () => {
    it('should not expand disabled item when clicked', () => {
      const itemsWithDisabled = [
        { id: '1', title: 'Item 1', content: 'Content 1', disabled: true },
        { id: '2', title: 'Item 2', content: 'Content 2' },
      ];
      render(<GSAccordion items={itemsWithDisabled} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.click(header!);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('should have disabled attribute on disabled item button', () => {
      const itemsWithDisabled = [
        { id: '1', title: 'Item 1', content: 'Content 1', disabled: true },
      ];
      render(<GSAccordion items={itemsWithDisabled} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toBeDisabled();
    });
  });

  describe('onChange Callback', () => {
    it('should call onChange when item is expanded', () => {
      const onChange = jest.fn();
      render(<GSAccordion items={mockItems} onChange={onChange} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.click(header!);
      expect(onChange).toHaveBeenCalledWith(['1']);
    });

    it('should call onChange when item is collapsed', () => {
      const onChange = jest.fn();
      render(<GSAccordion items={mockItems} onChange={onChange} defaultExpanded={['1']} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.click(header!);
      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('should call onChange with multiple items when multiple is true', () => {
      const onChange = jest.fn();
      render(<GSAccordion items={mockItems} multiple onChange={onChange} />);
      const header1 = screen.getByText('Item 1').closest('button');
      const header2 = screen.getByText('Item 2').closest('button');
      
      fireEvent.click(header1!);
      expect(onChange).toHaveBeenCalledWith(['1']);
      
      fireEvent.click(header2!);
      expect(onChange).toHaveBeenCalledWith(['1', '2']);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have aria-expanded="false" when item is collapsed', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when item is expanded', () => {
      render(<GSAccordion items={mockItems} defaultExpanded={['1']} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toHaveAttribute('aria-expanded', 'true');
    });
  });
});

