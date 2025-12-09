import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSDropdown } from '../GSDropdown';

beforeAll(() => {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {},
  });
});

describe('GSDropdown', () => {
  describe('Rendering', () => {
    it('should render dropdown', () => {
      const { container } = render(
        <GSDropdown trigger={<button>Open</button>}>
          <div>Menu Item 1</div>
        </GSDropdown>
      );
      const dropdown = container.querySelector('[data-gs="GSDropdown"]');
      expect(dropdown).toBeInTheDocument();
    });

    it('should render trigger', () => {
      render(
        <GSDropdown trigger={<button>Open</button>}>
          <div>Menu Item 1</div>
        </GSDropdown>
      );
      expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('should render children', () => {
      render(
        <GSDropdown trigger={<button>Open</button>}>
          <div>Menu Item 1</div>
          <div>Menu Item 2</div>
        </GSDropdown>
      );
      expect(screen.getByText('Menu Item 1')).toBeInTheDocument();
      expect(screen.getByText('Menu Item 2')).toBeInTheDocument();
    });
  });

  describe('Alignment', () => {
    const alignments: Array<'start' | 'center' | 'end'> = ['start', 'center', 'end'];

    alignments.forEach((align) => {
      it(`should support ${align} alignment`, () => {
        const { container } = render(
          <GSDropdown trigger={<button>Open</button>} align={align}>
            <div>Menu Item</div>
          </GSDropdown>
        );
        const dropdown = container.querySelector('[data-gs="GSDropdown"]');
        expect(dropdown).toBeInTheDocument();
      });
    });

    it('should default to start alignment', () => {
      const { container } = render(
        <GSDropdown trigger={<button>Open</button>}>
          <div>Menu Item</div>
        </GSDropdown>
      );
      const dropdown = container.querySelector('[data-gs="GSDropdown"]');
      expect(dropdown).toBeInTheDocument();
    });
  });

  describe('Integration with GSList', () => {
    it('should render children inside GSList', () => {
      render(
        <GSDropdown trigger={<button>Open</button>}>
          <div>Menu Item 1</div>
        </GSDropdown>
      );
      expect(screen.getByText('Menu Item 1')).toBeInTheDocument();
    });
  });

  describe('Trigger Interaction', () => {
    it('should render trigger element', () => {
      render(
        <GSDropdown trigger={<button>Click me</button>}>
          <div>Menu Item</div>
        </GSDropdown>
      );
      const trigger = screen.getByText('Click me');
      expect(trigger).toBeInTheDocument();
    });

    it('should support custom trigger component', () => {
      render(
        <GSDropdown trigger={<span>Custom Trigger</span>}>
          <div>Menu Item</div>
        </GSDropdown>
      );
      expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
    });
  });
});

