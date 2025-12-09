import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTabs } from '../GSTabs';
import type { GSTabItem } from '../types';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

const mockTabs: GSTabItem[] = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

describe('GSTabs', () => {
  describe('Rendering', () => {
    it('should render tabs', () => {
      const { container } = render(<GSTabs tabs={mockTabs} />);
      const tabs = container.querySelector('[data-gs="GSTabs"]');
      expect(tabs).toBeInTheDocument();
    });

    it('should render all tab buttons', () => {
      render(<GSTabs tabs={mockTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('should render tab panels', () => {
      render(<GSTabs tabs={mockTabs} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  describe('Active Tab', () => {
    it('should activate first tab by default', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('should activate tab specified by defaultValue', () => {
      render(<GSTabs tabs={mockTabs} defaultValue="tab2" />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('should activate tab specified by value (controlled)', () => {
      render(<GSTabs tabs={mockTabs} value="tab3" />);
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      expect(tab3).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Tab Switching', () => {
    it('should switch tabs on click', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.click(tab2);
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('should call onValueChange when tab is clicked', () => {
      const onValueChange = jest.fn();
      render(<GSTabs tabs={mockTabs} onValueChange={onValueChange} />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.click(tab2);
      expect(onValueChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Disabled Tabs', () => {
    it('should disable tab when disabled prop is true', () => {
      const tabsWithDisabled: GSTabItem[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
      ];
      render(<GSTabs tabs={tabsWithDisabled} />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toBeDisabled();
    });

    it('should not switch to disabled tab on click', () => {
      const tabsWithDisabled: GSTabItem[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
      ];
      render(<GSTabs tabs={tabsWithDisabled} />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.click(tab2);
      expect(tab2).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Orientation', () => {
    it('should render horizontal tabs by default', () => {
      const { container } = render(<GSTabs tabs={mockTabs} />);
      const tabs = container.querySelector('[data-gs="GSTabs"]');
      expect(tabs).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should render vertical tabs when orientation is vertical', () => {
      const { container } = render(<GSTabs tabs={mockTabs} orientation="vertical" />);
      const tabs = container.querySelector('[data-gs="GSTabs"]');
      expect(tabs).toHaveAttribute('data-orientation', 'vertical');
    });
  });

  describe('Variants', () => {
    const variants: Array<'solid' | 'soft' | 'outlined' | 'plain'> = [
      'solid',
      'soft',
      'outlined',
      'plain',
    ];

    variants.forEach((variant) => {
      it(`should render ${variant} variant`, () => {
        const { container } = render(<GSTabs tabs={mockTabs} variant={variant} />);
        const tabList = container.querySelector('[role="tablist"]');
        expect(tabList).toHaveAttribute('data-variant', variant);
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`should render ${size} size`, () => {
        const { container } = render(<GSTabs tabs={mockTabs} size={size} />);
        const tabList = container.querySelector('[role="tablist"]');
        expect(tabList).toHaveAttribute('data-size', size);
      });
    });
  });

  describe('Colors', () => {
    const colors: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
    > = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];

    colors.forEach((color) => {
      it(`should render ${color} color`, () => {
        const { container } = render(<GSTabs tabs={mockTabs} color={color} />);
        const tabList = container.querySelector('[role="tablist"]');
        expect(tabList).toHaveAttribute('data-color', color);
      });
    });
  });

  describe('Keep Mounted', () => {
    it('should keep all panels mounted when keepMounted is true', () => {
      render(<GSTabs tabs={mockTabs} keepMounted={true} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('should unmount inactive panels when keepMounted is false', () => {
      render(<GSTabs tabs={mockTabs} keepMounted={false} />);
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render tab with icon', () => {
      const tabsWithIcon: GSTabItem[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div>, icon: <span>Icon</span> },
      ];
      render(<GSTabs tabs={tabsWithIcon} />);
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });
  });
});

