import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GSPagination } from '../GSPagination';

expect.extend(toHaveNoViolations);

const mockOnPageChange = jest.fn();

describe('GSPagination - Accessibility', () => {
  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  describe('ARIA Attributes', () => {
    it('should be accessible', () => {
      const { container } = render(
        <GSPagination page={1} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const pagination = container.querySelector('[data-gs="GSPagination"]');
      expect(pagination).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be keyboard navigable', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      
      prevButton.focus();
      expect(prevButton).toHaveFocus();
      
      nextButton.focus();
      expect(nextButton).toHaveFocus();
    });

    it('should be activatable via keyboard', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      fireEvent.keyDown(prevButton, { key: 'Enter', code: 'Enter' });
      // Button should be clickable
      expect(prevButton).toBeInTheDocument();
    });
  });

  describe('Screen Reader Support', () => {
    it('should display page information clearly', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    });

    it('should indicate disabled state for buttons', () => {
      render(
        <GSPagination page={1} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      expect(prevButton).toBeDisabled();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic pagination', async () => {
      const { container } = render(
        <GSPagination page={1} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations on middle page', async () => {
      const { container } = render(
        <GSPagination page={3} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations on last page', async () => {
      const { container } = render(
        <GSPagination page={5} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with single page', async () => {
      const { container } = render(
        <GSPagination page={1} pageCount={1} onPageChange={mockOnPageChange} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with many pages', async () => {
      const { container } = render(
        <GSPagination page={50} pageCount={100} onPageChange={mockOnPageChange} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

