import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSTabs } from '../GSTabs';
import type { GSTabItem } from '../types';

expect.extend(toHaveNoViolations);

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

describe('GSTabs - Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('should have tablist role', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();
    });

    it('should have tab role on buttons', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(3);
    });

    it('should have tabpanel role on panels', () => {
      render(<GSTabs tabs={mockTabs} />);
      const panels = screen.getAllByRole('tabpanel');
      expect(panels.length).toBeGreaterThan(0);
    });

    it('should have aria-selected on active tab', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('should have aria-controls linking tab to panel', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-controls', 'panel-tab1');
    });

    it('should have aria-labelledby linking panel to tab', () => {
      render(<GSTabs tabs={mockTabs} />);
      const panel1 = screen.getByRole('tabpanel');
      expect(panel1).toHaveAttribute('aria-labelledby', 'tab-tab1');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with ArrowRight in horizontal mode', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      fireEvent.keyDown(tab1, { key: 'ArrowRight' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate with ArrowLeft in horizontal mode', () => {
      render(<GSTabs tabs={mockTabs} defaultValue="tab2" />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.keyDown(tab2, { key: 'ArrowLeft' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate with ArrowDown in vertical mode', () => {
      render(<GSTabs tabs={mockTabs} orientation="vertical" />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      fireEvent.keyDown(tab1, { key: 'ArrowDown' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate with ArrowUp in vertical mode', () => {
      render(<GSTabs tabs={mockTabs} orientation="vertical" defaultValue="tab2" />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.keyDown(tab2, { key: 'ArrowUp' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate to first tab with Home key', () => {
      render(<GSTabs tabs={mockTabs} defaultValue="tab3" />);
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      fireEvent.keyDown(tab3, { key: 'Home' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
    });

    it('should navigate to last tab with End key', () => {
      render(<GSTabs tabs={mockTabs} />);
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      fireEvent.keyDown(tab1, { key: 'End' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      expect(tab3).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Screen Reader Support', () => {
    it('should be announced correctly by screen readers', () => {
      render(<GSTabs tabs={mockTabs} />);
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with basic tabs', async () => {
      const { container } = render(<GSTabs tabs={mockTabs} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with vertical orientation', async () => {
      const { container } = render(<GSTabs tabs={mockTabs} orientation="vertical" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with disabled tabs', async () => {
      const tabsWithDisabled: GSTabItem[] = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div>, disabled: true },
      ];
      const { container } = render(<GSTabs tabs={tabsWithDisabled} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with custom aria-label', async () => {
      const { container } = render(<GSTabs tabs={mockTabs} ariaLabel="Custom label" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

