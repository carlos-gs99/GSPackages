import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Hooks from '../../../../hooks/useTranslation';
import GSButton from '../GSButton';
import en from '../i18n/en.json';
import { createTestTranslation } from '../../../../test/utils/createTestTranslation';

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

const TRANSLATIONS = flatten(en);
const useTranslationSpy = vi.spyOn(Hooks, 'useTranslation');
const buildTranslation = () =>
  createTestTranslation({
    language: 'en',
    translations: TRANSLATIONS,
  });

describe('GSButton - Acessibilidade', () => {
  beforeEach(() => {
    useTranslationSpy.mockReturnValue(buildTranslation());
  });

  afterEach(() => {
    useTranslationSpy.mockReset();
  });

  it('expone atributos ARIA recebidos', () => {
    render(
      <GSButton
        ariaLabel="Enviar formulario"
        ariaPressed
        ariaExpanded
        ariaControls="menu"
        ariaHaspopup="menu"
      >
        Enviar
      </GSButton>
    );

    const button = screen.getByRole('button', { name: 'Enviar formulario' });
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', 'menu');
    expect(button).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('mantem foco via tabulacao', async () => {
    const user = userEvent.setup();
    render(<GSButton>Continuar</GSButton>);

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('permite activar com Enter e Space quando renderizado como link', async () => {
    const user = userEvent.setup();
    const handler = vi.fn();

    render(
      <GSButton as="a" href="#" onClick={handler}>
        Link
      </GSButton>
    );

    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('anuncia atalhos de teclado via elemento sr-only', () => {
    render(
      <GSButton keyboardShortcut="Ctrl+S">Gravar</GSButton>
    );

    const shortcut = screen.getByText((content) => content.startsWith('Keyboard shortcut'));
    expect(shortcut).toHaveAttribute('data-gs-el', 'shortcut');
  });
});
