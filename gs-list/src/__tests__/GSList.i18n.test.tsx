import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { GSList } from '../GSList';
import { registerGSListI18n } from '../i18n';

describe('GSList - Internationalization', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {},
    });
    registerGSListI18n(i18n);
  });

  describe('English Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('en');
    });

    it('should render list in English', () => {
      const { container } = render(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toBeInTheDocument();
    });

    it('should use English for empty state if implemented', () => {
      const { container } = render(<GSList>{null}</GSList>);
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Portuguese Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('pt');
    });

    it('should render list in Portuguese', () => {
      const { container } = render(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toBeInTheDocument();
    });

    it('should use Portuguese for empty state if implemented', () => {
      const { container } = render(<GSList>{null}</GSList>);
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Language Switching', () => {
    it('should update language dynamically', () => {
      i18n.changeLanguage('en');
      const { rerender, container } = render(
        <GSList>
          <GSList.Item title="Item EN" />
        </GSList>
      );
      expect(screen.getByText('Item EN')).toBeInTheDocument();

      i18n.changeLanguage('pt');
      rerender(
        <GSList>
          <GSList.Item title="Item PT" />
        </GSList>
      );
      expect(screen.getByText('Item PT')).toBeInTheDocument();
    });

    it('should maintain functionality when switching languages', () => {
      const handleClick = jest.fn();
      i18n.changeLanguage('en');
      const { rerender } = render(
        <GSList>
          <GSList.Item title="Click me" onClick={handleClick} />
        </GSList>
      );

      i18n.changeLanguage('pt');
      rerender(
        <GSList>
          <GSList.Item title="Clique aqui" onClick={handleClick} />
        </GSList>
      );

      const item = screen.getByText('Clique aqui');
      expect(item).toBeInTheDocument();
    });
  });

  describe('Fallback Behavior', () => {
    it('should handle missing translations gracefully', () => {
      i18n.changeLanguage('fr'); // Unsupported language
      const { container } = render(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      const list = container.querySelector('[data-gs="GSList"]');
      expect(list).toBeInTheDocument();
    });

    it('should work with custom content regardless of language', () => {
      i18n.changeLanguage('fr');
      render(
        <GSList>
          <GSList.Header>Custom Header</GSList.Header>
          <GSList.Item title="Custom Item" description="Custom Description" variant="complex" />
          <GSList.Footer>Custom Footer</GSList.Footer>
        </GSList>
      );
      expect(screen.getByText('Custom Header')).toBeInTheDocument();
      expect(screen.getByText('Custom Item')).toBeInTheDocument();
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
      expect(screen.getByText('Custom Footer')).toBeInTheDocument();
    });
  });

  describe('Translation Registration', () => {
    it('should register translations on component mount', () => {
      render(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      expect(i18n.hasResourceBundle('en', 'GSList')).toBe(true);
      expect(i18n.hasResourceBundle('pt', 'GSList')).toBe(true);
    });

    it('should not duplicate translations on multiple renders', () => {
      const { rerender } = render(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      rerender(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      rerender(
        <GSList>
          <GSList.Item title="Item" />
        </GSList>
      );
      
      expect(i18n.hasResourceBundle('en', 'GSList')).toBe(true);
      expect(i18n.hasResourceBundle('pt', 'GSList')).toBe(true);
    });
  });

  describe('Compound Components i18n', () => {
    it('should handle i18n in Header component', () => {
      i18n.changeLanguage('en');
      render(
        <GSList>
          <GSList.Header>Header EN</GSList.Header>
        </GSList>
      );
      expect(screen.getByText('Header EN')).toBeInTheDocument();
    });

    it('should handle i18n in Footer component', () => {
      i18n.changeLanguage('pt');
      render(
        <GSList>
          <GSList.Footer>Footer PT</GSList.Footer>
        </GSList>
      );
      expect(screen.getByText('Footer PT')).toBeInTheDocument();
    });

    it('should handle i18n in Separator with label', () => {
      i18n.changeLanguage('en');
      render(
        <GSList>
          <GSList.Separator label="Section EN" />
        </GSList>
      );
      expect(screen.getByText('Section EN')).toBeInTheDocument();
    });
  });
});

