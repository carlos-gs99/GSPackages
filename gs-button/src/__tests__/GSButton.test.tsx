import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Hooks from '../../../../hooks/useTranslation';
import GSButton from '../GSButton';
import { GSButtonGroup } from '../GSButtonGroup';
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

describe('GSButton', () => {
  beforeEach(() => {
    useTranslationSpy.mockReturnValue(buildTranslation());
  });

  afterEach(() => {
    useTranslationSpy.mockReset();
  });

  it('renderiza com datasets e data-gs', () => {
    render(
      <GSButton variant="outlined" color="danger" size="lg">
        Acao
      </GSButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-gs', 'GSButton');
    expect(button).toHaveAttribute('data-variant', 'outlined');
    expect(button).toHaveAttribute('data-color', 'danger');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('dispara onClick quando activo', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    render(<GSButton onClick={handler}>Guardar</GSButton>);

    await user.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('bloqueia onClick durante loading', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();
    render(
      <GSButton loading onClick={handler}>
        Guardar
      </GSButton>
    );

    const button = screen.getByRole('button');
    await user.click(button);
    expect(handler).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('gera ripple ao pointerdown', () => {
    const { getByRole, container } = render(
      <GSButton ripple>Click</GSButton>
    );

    const button = getByRole('button');
    vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
      width: 120,
      height: 48,
      top: 0,
      left: 0,
      right: 120,
      bottom: 48,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    fireEvent.pointerDown(button, { clientX: 60, clientY: 24, pointerType: 'mouse' });
    const ripples = container.querySelectorAll('[data-gs-el="ripple"]');
    expect(ripples.length).toBeGreaterThan(0);
  });

  it('atribui role e aria-disabled quando renderizado como link', async () => {
    const handler = vi.fn();
    const user = userEvent.setup();

    render(
      <GSButton as="a" href="#" onClick={handler}>
        Link
      </GSButton>
    );

    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveAttribute('role', 'button');

    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('propaga propriedades via GSButtonGroup', () => {
    render(
      <GSButtonGroup variant="outlined" color="danger" spacing="sm">
        <GSButton>Primeiro</GSButton>
        <GSButton>Segundo</GSButton>
        <GSButton>Terceiro</GSButton>
      </GSButtonGroup>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveAttribute('data-variant', 'outlined');
    expect(buttons[0]).toHaveAttribute('data-color', 'danger');
    expect(buttons[1]).toHaveAttribute('data-group-position', 'middle');
  });
});
