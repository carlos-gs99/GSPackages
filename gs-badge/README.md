# GSBadge

Componente de badge overlay agnóstico inspirado no Joy UI. Permite sinalizar contadores ou estados sobre qualquer elemento, com variantes e cores controladas por tokens.

## Visão Geral
- Estrutura packlet (`forwardRef`, `data-gs`, `useComponentDebug`)
- CSS Modules + design tokens (`--gs-badge-*`)
- Variantes `solid`, `soft`, `outlined`, `plain` e `dot`
- Cores alinhadas aos tokens (`primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`)
- Posições configuráveis (`anchorOrigin`) e ajuste fino (`badgeInset`)
- Acessibilidade pronta: `role="status"`, `aria-live="polite"`, traduções EN/PT

## Props

| Prop | Tipo | Default | Descrição |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — | Elemento que recebe o overlay do badge |
| `badgeContent` | `React.ReactNode` | — | Conteúdo do badge (número, texto curto, ícone) |
| `variant` | `GSBadgeVariant` | `'solid'` | Aparência do badge (`solid`, `soft`, `outlined`, `plain`, `dot`) |
| `color` | `GSBadgeColor` | `'danger'` | Token de cor aplicado ao badge |
| `size` | `GSBadgeSize` | `'md'` | Escala do badge (`sm`, `md`, `lg`) |
| `anchorOrigin` | `GSBadgeAnchorOrigin` | `{ vertical: 'top', horizontal: 'right' }` | Posição relativa ao elemento filho |
| `badgeInset` | `string  | { top?: string; right?: string; bottom?: string; left?: string }` | — | Ajuste manual da posição via inset/top/right/bottom/left |
| `invisible` | `boolean` | `false` | Força o badge a ficar oculto |
| `showZero` | `boolean` | `false` | Mantém o badge visível quando `badgeContent` é `0` |
| `max` | `number` | `99` | Limite para contadores numéricos (`max+` quando excede) |
| `ariaLabel` | `string` | — | Substitui o texto anunciado pelo leitor de ecrã |
| `debug` | `boolean` | `false` | Activa `useComponentDebug` e marcações de desenvolvimento |
| `...rest` | `React.HTMLAttributes<HTMLSpanElement>` | — | Atributos extra no elemento raiz |

### Tipagens

```ts
export interface GSBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  variant?: GSBadgeVariant;
  color?: GSBadgeColor;
  size?: GSBadgeSize;
  anchorOrigin?: GSBadgeAnchorOrigin;
  badgeInset?: string | { top?: string; right?: string; bottom?: string; left?: string };
  invisible?: boolean;
  showZero?: boolean;
  max?: number;
  ariaLabel?: string;
  debug?: boolean;
}
```

## Data Attributes

| Atributo | Elemento | Descrição |
| --- | --- | --- |
| `data-gs="GSBadge"` | container | Identificador principal do componente |
| `data-variant` | container e indicador | Variante aplicada (`solid`, `soft`, `outlined`, `plain`, `dot`) |
| `data-color` | container e indicador | Cor activa |
| `data-size` | container e indicador | Escala (`sm`, `md`, `lg`) |
| `data-anchor-vertical` | indicador | Âncora vertical (`top`, `bottom`) |
| `data-anchor-horizontal` | indicador | Âncora horizontal (`left`, `right`) |
| `data-inset="true"` | indicador | Inset manual activo |
| `data-debug="true"` | container e indicador | Debug visível |

## Tokens CSS

| Variável | Descrição |
| --- | --- |
| `--gs-badge-bg` | Cor de fundo do badge |
| `--gs-badge-color` | Cor do texto |
| `--gs-badge-border` | Cor da borda (outlined) |
| `--gs-badge-size` | Dimensão mínima (altura/largura) |
| `--gs-badge-font-size` | Tamanho da tipografia |
| `--gs-badge-padding-x` / `--gs-badge-padding-y` | Espaçamento interno |

Os valores são controlados via classes de módulo (`styles.module.css`) em função dos data attributes.

## Exemplos

### Contador padrão

```tsx
<GSBadge badgeContent={8}>
  <GSIcon name="bell" size="lg" />
</GSBadge>
```

### `anchorOrigin` custom

```tsx
<GSBadge
  badgeContent={3}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
>
  <GSButton variant="plain">
    <GSIcon name="email" />
  </GSButton>
</GSBadge>
```

### `badgeInset`

```tsx
<GSBadge badgeContent={1} badgeInset="4px">
  <GSIcon name="calendar" size="xl" />
</GSBadge>

<GSBadge badgeContent={2} badgeInset={{ top: '6px', right: '10px' }}>
  <GSIcon name="calendar" size="xl" />
</GSBadge>
```

### Variante `dot`

```tsx
<GSBadge variant="dot" color="success">
  <Avatar status="online" />
</GSBadge>
```

### `showZero` e `max`

```tsx
<GSBadge badgeContent={0} showZero>
  <GSIcon name="inbox" />
</GSBadge>

<GSBadge badgeContent={156} max={99}>
  <GSIcon name="clipboard-list" />
</GSBadge>
```

## Acessibilidade
- `role="status"` + `aria-live="polite"` garantem anúncio automático
- Traduções EN/PT (`countLabel`, `dotLabel`) carregadas via `registerGSBadgeI18n`
- Use `ariaLabel` quando o conteúdo não for auto-descritivo (ex.: ícones customizados)
- `variant="dot"` anuncia `dotLabel`

## Debug
- `debug` activa `useComponentDebug`
- Marcações visuais (`outline` no indicador) facilitam inspeção
- `data-debug` aparece no DOM para filtros e testes

## Testes
- Ver `docs/TESTING.md`
- Suites Vitest: unitário, acessibilidade, i18n
- Cobertura mínima esperada: 80%

## Integração
- Actualizar consumidores que utilizavam classes globais (`.gs-badge*`) para `GSBadge`
- Substituir badges inline por `GSChip` quando não for overlay
- Remover dependências antigas em `src/assets/gsstyle/components/badge.css`

## Troubleshooting
| Sintoma | Possível causa | Solução |
| --- | --- | --- |
| Badge não aparece | `badgeContent` vazio e `variant` diferente de `dot` | Usar `showZero`, passar conteúdo ou usar `variant="dot"` |
| Badge deslocado | `badgeInset` inválido | Confirmar string CSS válida ou objecto com valores específicos |
| Leitor não anuncia | `ariaLabel` não definido para conteúdo não textual | Definir `ariaLabel` ou fornecer `badgeContent` textual |

## Roadmap
- E2E Playwright após actualização do GS-Dev
- Variantes adicionais (ex.: `outlined-soft`) se necessário
- Inline lozenges migrar para `GSChip`
