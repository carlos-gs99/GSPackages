# GSButton

Botao agnostico do GS Style. Implementa variantes, tamanhos e estados padrao utilizando apenas props e CSS Modules.

## Caracteristicas

- Variantes: `solid`, `outlined`, `soft`, `alternate`, `plain`
- Cores: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- Tamanhos: `sm`, `md`, `lg`
- Props de produtividade: `fullWidth`, `loading`, `loadingPosition`, `ripple`, `gradient`, `rounded`
- Suporte a `startIcon` e `endIcon`
- Compatibilidade com `as` para links externos (`a`) ou elementos customizados
- Acessibilidade completa (ARIA, teclado, focus visible)
- i18n isolado (`gsbutton` namespace) e debug padronizado (`useComponentDebug`)

## Importacao

```tsx
import { GSButton, GSButtonGroup } from '@/components/ui/GSButton';
```

## Props Principais

| Prop | Tipo | Default | Descricao |
| --- | --- | --- | --- |
| `variant` | `GSButtonVariant` | `solid` | Estilo visual |
| `color` | `GSButtonColor` | `primary` | Paleta semantica |
| `size` | `GSButtonSize` | `md` | Escala de tamanho |
| `fullWidth` | `boolean` | `false` | Expande para 100% da largura |
| `loading` | `boolean` | `false` | Ativa spinner e bloqueia cliques |
| `loadingPosition` | `'start' | 'end'` | `start` | Posição do spinner |
| `startIcon` / `endIcon` | `React.ReactNode` | `undefined` | Decoradores visuais |
| `ripple` | `boolean` | `false` | Ativa efeito ripple |
| `gradient` | `boolean` | `false` | Gradiente (apenas variant `solid`) |
| `rounded` | `boolean | 'full'` | `false` | Pill (`true`) ou circular (`'full'`) |
| `as` | `React.ElementType` | `'button'` | Substitui elemento raiz |
| `keyboardShortcut` | `string` | `undefined` | Texto anunciado a screen readers |

Todas as props nativas do elemento subjacente (ex.: `type`, `href`, `id`) sao suportadas via spread. Quando `as` nao for `'button'`, o componente atribui `role="button"`, `tabIndex=0` e `aria-disabled` automaticamente.

## Exemplos

```tsx
<GSButton variant="solid" color="success" ripple>
  Guardar
</GSButton>

<GSButton variant="outlined" color="neutral" startIcon={<GSIcon name="mdi-arrow-left" />}>
  Voltar
</GSButton>

<GSButton as="a" href="https://example.com" variant="soft" endIcon={<GSIcon name="mdi-chevron-right" />}>
  Link Externo
</GSButton>

<GSButton loading loadingPosition="end" gradient>
  A processar
</GSButton>
```

### GSButtonGroup

```tsx
<GSButtonGroup variant="outlined" color="primary" spacing="sm">
  <GSButton>Primeiro</GSButton>
  <GSButton>Segundo</GSButton>
  <GSButton>Terceiro</GSButton>
</GSButtonGroup>

<GSButtonGroup orientation="vertical" fullWidth>
  <GSButton>Hoje</GSButton>
  <GSButton>Amanha</GSButton>
</GSButtonGroup>
```

## Acessibilidade

- `generateAriaAttributes` aplicado automaticamente
- Role e tabIndex mantidos em elementos customizados
- Ripple e gradient nao interferem com ARIA
- Atalhos de teclado anunciados com texto `sr-only`
- Focus visivel com outline consistente

## Internacionalizacao

- Namespace: `gsbutton`
- Traducoes em `i18n/en.json` e `i18n/pt.json`
- Helper `registerGSButtonI18n` garante registo idempotente

## Testes

- `__tests__/GSButton.test.tsx`
- `__tests__/GSButton.a11y.test.tsx`
- `__tests__/GSButton.i18n.test.tsx`
- Plano detalhado em `docs/TESTING.md`

## Boas praticas

- Use `gradient` apenas em acoes primarias (submit, confirmar)
- Combine `ripple` com variantes interativas; evite quando `disabled`
- Forneca `ariaLabel` para botoes apenas com icone
- Prefira `GSButtonGroup` para toolbars ou segmented controls

