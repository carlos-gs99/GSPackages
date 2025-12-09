import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GSPagination } from '../GSPagination';

describe('GSPagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  describe('Rendering', () => {
    it('should render pagination', () => {
      const { container } = render(
        <GSPagination page={1} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const pagination = container.querySelector('[data-gs="GSPagination"]');
      expect(pagination).toBeInTheDocument();
    });

    it('should display current page and total pages', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    });
  });

  describe('Navigation Buttons', () => {
    it('should render previous button', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      expect(prevButton).toBeInTheDocument();
    });

    it('should render next button', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const nextButton = screen.getByText('>');
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('Previous Button', () => {
    it('should be disabled on first page', () => {
      render(
        <GSPagination page={1} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      expect(prevButton).toBeDisabled();
    });

    it('should be enabled when not on first page', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      expect(prevButton).not.toBeDisabled();
    });

    it('should call onPageChange with previous page when clicked', () => {
      render(
        <GSPagination page={3} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const prevButton = screen.getByText('<');
      fireEvent.click(prevButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });
  });

  describe('Next Button', () => {
    it('should be disabled on last page', () => {
      render(
        <GSPagination page={5} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const nextButton = screen.getByText('>');
      expect(nextButton).toBeDisabled();
    });

    it('should be enabled when not on last page', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const nextButton = screen.getByText('>');
      expect(nextButton).not.toBeDisabled();
    });

    it('should call onPageChange with next page when clicked', () => {
      render(
        <GSPagination page={2} pageCount={5} onPageChange={mockOnPageChange} />
      );
      const nextButton = screen.getByText('>');
      fireEvent.click(nextButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle single page', () => {
      render(
        <GSPagination page={1} pageCount={1} onPageChange={mockOnPageChange} />
      );
      expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });

    it('should handle page 1 correctly', () => {
      render(
        <GSPagination page={1} pageCount={10} onPageChange={mockOnPageChange} />
      );
      expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
      const prevButton = screen.getByText('<');
      expect(prevButton).toBeDisabled();
    });

    it('should handle last page correctly', () => {
      render(
        <GSPagination page={10} pageCount={10} onPageChange={mockOnPageChange} />
      );
      expect(screen.getByText('Page 10 of 10')).toBeInTheDocument();
      const nextButton = screen.getByText('>');
      expect(nextButton).toBeDisabled();
    });
  });
});

