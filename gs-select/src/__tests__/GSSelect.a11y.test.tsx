import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import GSSelect from '../GSSelect';
import type { GSSelectOption } from '../types';

expect.extend(toHaveNoViolations);

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSSelect - Accessibility', () => {
  const mockOptions: GSSelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  describe('ARIA Attributes', () => {
    it('should have aria-label when provided', () => {
      const { container } = render(
        <GSSelect options={mockOptions} ariaLabel="Custom label" />
      );
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      expect(trigger).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should have aria-labelledby when provided', () => {
      const { container } = render(
        <GSSelect options={mockOptions} ariaLabelledBy="label-id" />
      );
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      expect(trigger).toHaveAttribute('aria-labelledby', 'label-id');
    });

    it('should have aria-describedby when provided', () => {
      const { container } = render(
        <GSSelect options={mockOptions} ariaDescribedBy="desc-id" />
      );
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      expect(trigger).toHaveAttribute('aria-describedby', 'desc-id');
    });

    it('should have aria-expanded="false" when closed', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have aria-expanded="true" when open', async () => {
      const { container } = render(<GSSelect options={mockOptions} open />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should have role="combobox" on trigger', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      expect(trigger).toHaveAttribute('role', 'combobox');
    });

    it('should have role="listbox" on dropdown', async () => {
      const { container } = render(<GSSelect options={mockOptions} open />);
      await waitFor(() => {
        const dropdown = container.querySelector('[role="listbox"]');
        expect(dropdown).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable via trigger', () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]') as HTMLElement;
      trigger.focus();
      expect(trigger).toHaveFocus();
    });

    it('should open dropdown on Enter key', async () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      fireEvent.keyDown(trigger!, { key: 'Enter', code: 'Enter' });
      
      await waitFor(() => {
        const dropdown = container.querySelector('[role="listbox"]');
        expect(dropdown).toBeInTheDocument();
      });
    });

    it('should open dropdown on Space key', async () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      fireEvent.keyDown(trigger!, { key: ' ', code: 'Space' });
      
      await waitFor(() => {
        const dropdown = container.querySelector('[role="listbox"]');
        expect(dropdown).toBeInTheDocument();
      });
    });

    it('should close dropdown on Escape key', async () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      
      // First open the dropdown
      fireEvent.click(trigger!);
      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Then press Escape to close
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      
      await waitFor(() => {
        // Check if aria-expanded is false (dropdown closed)
        const updatedTrigger = container.querySelector('[data-gs-el="trigger"]');
        expect(updatedTrigger).toHaveAttribute('aria-expanded', 'false');
      }, { timeout: 2000 });
    });
  });

  describe('Screen Reader Support', () => {
    it('should announce selection state', () => {
      const { container } = render(<GSSelect options={mockOptions} value="1" />);
      const trigger = container.querySelector('[data-gs-el="trigger"]');
      expect(trigger).toHaveAttribute('aria-expanded');
    });

    it('should announce error state', () => {
      const { container } = render(
        <GSSelect options={mockOptions} error="Error message" />
      );
      const errorIcon = container.querySelector('[role="alert"]');
      expect(errorIcon).toBeInTheDocument();
    });
  });

  describe('Axe Accessibility Tests', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<GSSelect options={mockOptions} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with label', async () => {
      const { container } = render(
        <GSSelect options={mockOptions} label="Select Label" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with error', async () => {
      const { container } = render(
        <GSSelect options={mockOptions} error="Error message" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with helper text', async () => {
      const { container } = render(
        <GSSelect options={mockOptions} label="Label" helperText="Helper text" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when disabled', async () => {
      const { container } = render(<GSSelect options={mockOptions} disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations when required', async () => {
      const { container } = render(
        <GSSelect options={mockOptions} label="Label" required />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

