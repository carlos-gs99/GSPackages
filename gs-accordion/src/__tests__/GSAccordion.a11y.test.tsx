import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAccordion } from '../GSAccordion';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSAccordion - Accessibility', () => {
  const mockItems = [
    { id: '1', title: 'Item 1', content: 'Content 1' },
    { id: '2', title: 'Item 2', content: 'Content 2' },
  ];

  describe('ARIA Attributes', () => {
    it('should have aria-expanded="false" when collapsed', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when expanded', () => {
      render(<GSAccordion items={mockItems} defaultExpanded={['1']} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toHaveAttribute('aria-expanded', 'true');
    });

    it('should update aria-expanded when toggled', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(header!);
      expect(header).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via button', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button') as HTMLButtonElement;
      header.focus();
      expect(header).toHaveFocus();
    });

    it('should toggle on Enter key press', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.keyDown(header!, { key: 'Enter', code: 'Enter' });
      fireEvent.click(header!);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('should toggle on Space key press', () => {
      render(<GSAccordion items={mockItems} />);
      const header = screen.getByText('Item 1').closest('button');
      fireEvent.keyDown(header!, { key: ' ', code: 'Space' });
      fireEvent.click(header!);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should announce expansion state', () => {
      render(<GSAccordion items={mockItems} defaultExpanded={['1']} />);
      const header = screen.getByText('Item 1').closest('button');
      expect(header).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSAccordion items={mockItems} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with expanded items', async () => {
      const { container } = render(<GSAccordion items={mockItems} defaultExpanded={['1']} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with multiple expansion', async () => {
      const { container } = render(<GSAccordion items={mockItems} multiple defaultExpanded={['1', '2']} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with disabled items', async () => {
      const itemsWithDisabled = [
        { id: '1', title: 'Item 1', content: 'Content 1', disabled: true },
        { id: '2', title: 'Item 2', content: 'Content 2' },
      ];
      const { container } = render(<GSAccordion items={itemsWithDisabled} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

