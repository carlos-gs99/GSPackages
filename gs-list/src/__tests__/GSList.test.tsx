import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSList } from '../GSList';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSList', () => {
  describe('Rendering', () => {
    it('should render list with default props', () => {
      const { container } = render(
        <GSList>
          <GSList.Item title="Item 1" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(
        <GSList className="custom-list">
          <GSList.Item title="Item 1" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveClass('custom-list');
    });
  });

  describe('Variant System', () => {
    it('should render default variant', () => {
      const { container } = render(
        <GSList variant="default">
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveAttribute('data-gs-variant', 'default');
    });

    it('should render bordered variant', () => {
      const { container } = render(
        <GSList variant="bordered">
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveAttribute('data-gs-variant', 'bordered');
    });

    it('should render plain variant', () => {
      const { container } = render(
        <GSList variant="plain">
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveAttribute('data-gs-variant', 'plain');
    });
  });

  describe('Size System', () => {
    it('should render small size', () => {
      const { container } = render(
        <GSList size="sm">
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveAttribute('data-gs-size', 'sm');
    });

    it('should render medium size', () => {
      const { container } = render(
        <GSList size="md">
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveAttribute('data-gs-size', 'md');
    });

    it('should render large size', () => {
      const { container } = render(
        <GSList size="lg">
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toHaveAttribute('data-gs-size', 'lg');
    });
  });

  describe('Compound Components', () => {
    it('should render GSList.Header', () => {
      render(
        <GSList>
          <GSList.Header>List Header</GSList.Header>
        </GSList>
      );
      expect(screen.getByText('List Header')).toBeInTheDocument();
    });

    it('should render multiple GSList.Item', () => {
      render(
        <GSList>
          <GSList.Item title="Item 1" />
          <GSList.Item title="Item 2" />
          <GSList.Item title="Item 3" />
        </GSList>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should render GSList.Separator', () => {
      const { container } = render(
        <GSList>
          <GSList.Item title="Item 1" />
          <GSList.Separator />
          <GSList.Item title="Item 2" />
        </GSList>
      );
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
    });

    it('should render GSList.Footer', () => {
      render(
        <GSList>
          <GSList.Item title="Item" />
          <GSList.Footer>List Footer</GSList.Footer>
        </GSList>
      );
      expect(screen.getByText('List Footer')).toBeInTheDocument();
    });
  });

  describe('GSList.Item Props', () => {
    it('should render item with title', () => {
      render(
        <GSList>
          <GSList.Item title="Test Item" />
        </GSList>
      );
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('should render item with description', () => {
      render(
        <GSList>
          <GSList.Item title="Title" description="Description text" variant="complex" />
        </GSList>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('should render active item', () => {
      render(
        <GSList>
          <GSList.Item title="Active Item" active />
        </GSList>
      );
      const item = screen.getByText('Active Item').closest('[role="listitem"]');
      expect(item).toBeInTheDocument();
      // Active state is handled via CSS classes
    });

    it('should render disabled item', () => {
      render(
        <GSList>
          <GSList.Item title="Disabled Item" disabled />
        </GSList>
      );
      const item = screen.getByText('Disabled Item').closest('[role="listitem"]');
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });

    it('should call onClick when item is clicked', async () => {
      const handleClick = jest.fn();
      render(
        <GSList>
          <GSList.Item title="Clickable Item" onClick={handleClick} />
        </GSList>
      );
      
      const item = screen.getByText('Clickable Item');
      await userEvent.click(item);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when item is disabled', async () => {
      const handleClick = jest.fn();
      render(
        <GSList>
          <GSList.Item title="Disabled Item" disabled onClick={handleClick} />
        </GSList>
      );
      
      const item = screen.getByText('Disabled Item');
      await userEvent.click(item);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('GSList.Separator', () => {
    it('should render separator without label', () => {
      const { container } = render(
        <GSList>
          <GSList.Item title="Item 1" />
          <GSList.Separator />
          <GSList.Item title="Item 2" />
        </GSList>
      );
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute('role', 'separator');
    });

    it('should render separator with label', () => {
      render(
        <GSList>
          <GSList.Item title="Item 1" />
          <GSList.Separator label="Section" />
          <GSList.Item title="Item 2" />
        </GSList>
      );
      expect(screen.getByText('Section')).toBeInTheDocument();
    });
  });
});

