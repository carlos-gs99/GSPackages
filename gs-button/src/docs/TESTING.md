# GSButton - Plano de Testes

## Suites

| Arquivo | Objetivo |
| --- | --- |
| `GSButton.test.tsx` | Render, eventos, ripple, prop `as` |
| `GSButton.a11y.test.tsx` | Acessibilidade (ARIA, teclado, foco) |
| `GSButton.i18n.test.tsx` | Registo de traducoes e mudanca de idioma |

## Casos Obrigatorios

1. Render padrao com `data-gs` e datasets (`variant`, `color`, `size`).
2. Clique bloqueado durante `loading` e `disabled`.
3. Ripple gerado via `pointerdown` (com cleanup).
4. Funcionamento com `as="a"` (`role`, `tabIndex`, `aria-disabled`).
5. Altura/padding diferenciados por `size` (`sm`, `md`, `lg`).
6. `GSButtonGroup` propaga `variant`, `color`, `size`, `fullWidth` e controla spacing.
7. `aria-*` configurado para `pressed`, `expanded`, `controls`, `haspopup`, `busy`.
8. `keyboardShortcut` anunciado via elemento `sr-only`.
9. i18n regista bundles `en` e `pt` e responde a `changeLanguage`.

## Execucao

```bash
npm run test -- GSButton
```

Adicionar spec Playwright (`tests/e2e/components/gsbutton.spec.ts`) quando a pagina GS-Dev estiver actualizada.
