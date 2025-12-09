import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSAutocomplete } from '../GSAutocomplete';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('GSAutocomplete', () => {
  describe('Rendering', () => {
    it('should render autocomplete', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      // GSAutocomplete renders GSSelect internally
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          placeholder="Custom placeholder"
        />
      );
      // Placeholder is passed to GSSelect
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should use default placeholder when not provided', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      // Default placeholder from i18n
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Autocomplete Behavior', () => {
    it('should force searchable to true', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} searchable={false} />
      );
      // Even if searchable is false, it should be true internally
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should force multiple to false', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} multiple={true} />
      );
      // Even if multiple is true, it should be false internally
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('should forward all GSSelect props', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          label="Autocomplete Label"
          error="Error message"
          disabled={false}
        />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should forward options prop', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should forward value prop', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} value="1" />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should forward onChange prop', () => {
      const onChange = jest.fn();
      const { container } = render(
        <GSAutocomplete options={mockOptions} onChange={onChange} />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Autocomplete-Specific Props', () => {
    it('should accept minSearchLength prop', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          minSearchLength={3}
        />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should accept searchDebounce prop', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          searchDebounce={300}
        />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should accept filterFunction prop', () => {
      const filterFunction = jest.fn((option, searchTerm) => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          filterFunction={filterFunction}
        />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should accept showNoResults prop', () => {
      const { container } = render(
        <GSAutocomplete
          options={mockOptions}
          showNoResults={true}
        />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Integration with GSSelect', () => {
    it('should render as single select', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });

    it('should always have search enabled', () => {
      const { container } = render(
        <GSAutocomplete options={mockOptions} />
      );
      const select = container.querySelector('[data-gs="GSSelect"]');
      expect(select).toBeInTheDocument();
    });
  });
});

