import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as Hooks from '../../../../hooks/useTranslation';
import GSButton from '../GSButton';
import en from '../i18n/en.json';
import pt from '../i18n/pt.json';
import { createTestTranslation } from '../../../../test/utils/createTestTranslation';

type Language = 'en' | 'pt';

const flatten = (input: Record<string, unknown>, prefix = ''): Record<string, string> => {
  return Object.entries(input).reduce<Record<string, string>>((acc, [key, value]) => {
    const composite = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(acc, flatten(value as Record<string, unknown>, composite));
    } else {
      acc[composite] = String(value);
    }
    return acc;
  }, {});
};

const BASE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: flatten(en),
  pt: flatten(pt),
};

const useTranslationSpy = vi.spyOn(Hooks, 'useTranslation');
const buildTranslation = (language: Language = 'en') =>
  createTestTranslation({
    language,
    translationsByLanguage: BASE_TRANSLATIONS,
  });

describe('GSButton - i18n', () => {
  afterEach(() => {
    useTranslationSpy.mockReset();
  });

  it('regista bundles de traducoes ao montar', () => {
    const translation = buildTranslation('en');
    useTranslationSpy.mockReturnValue(translation);

    render(<GSButton>Enviar</GSButton>);

    expect(translation.i18n.addResourceBundle).toHaveBeenCalledWith('en', 'gsbutton', expect.any(Object), true, true);
    expect(translation.i18n.addResourceBundle).toHaveBeenCalledWith('pt', 'gsbutton', expect.any(Object), true, true);
  });

  it('usa traducao padrao para o label', () => {
    const translation = buildTranslation('pt');
    useTranslationSpy.mockReturnValue(translation);

    render(<GSButton />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Botão');
  });

  it('actualiza aria-label quando o idioma muda', () => {
    const translation = buildTranslation('en');
    useTranslationSpy.mockReturnValue(translation);

    const { rerender } = render(<GSButton />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Button');

    translation.changeLanguage('pt');
    rerender(<GSButton />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Botão');
  });

  it('respeita overrides fornecidos pelo consumidor', () => {
    useTranslationSpy.mockReturnValue(buildTranslation('en'));

    render(<GSButton ariaLabel="Confirmar pedido" />);
    expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeInTheDocument();
  });
});
