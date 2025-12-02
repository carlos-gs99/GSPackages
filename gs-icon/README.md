# GSIcon

Wrapper agnóstico para Material Design Icons (MDI) com escala Joy, suporte a i18n e fallback inteligente.

## Principais Recursos

- Escala de tamanhos Joy (`xs`, `sm`, `md`, `lg`, `xl`) + valores custom
- Tokens de cor GS (`primary`, `danger`, …) ou qualquer valor CSS
- `decorative` / `ariaLabel` para acessibilidade controlada
- Fallback visual (`?`) com mensagem traduzida (`gsicon.missingIcon`)
- Debug opcional (`debug` prop) com data attributes (`data-gs="GSIcon"`)

---

## Props

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| `name` | `string` | **obrigatório** | Nome do ícone MDI (`"mdi-home"`, `"home"`, …) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string \| number` | `'md'` | Escala Joy ou tamanho custom (ex: `"32px"`, `24`) |
| `color` | `'primary' \| … \| 'inherit' \| string` | `'currentColor'` | Cor usando tokens GS ou valor CSS |
| `decorative` | `boolean` | `undefined` | Marca o ícone como decorativo (`aria-hidden`) |
| `ariaLabel` | `string` | `undefined` | Texto alternativo; obrigatório se não for decorativo |
| `ariaHidden` | `boolean` | `undefined` | Override manual para `aria-hidden` |
| `debug` | `boolean` | `false` | Activa logs via `useComponentDebug` |
| `className` | `string` | `undefined` | Classe extra (merge com CSS Module) |

### Tipos Exportados

```ts
import {
  GSIcon,
  GSIconProps,
  GSIconRef,
  GSIconSize,
  GSIconColor,
  GS_ICON_SIZES,
  GS_ICON_COLORS
} from '@/components/ui';
```

---

## Escala de Tamanhos (Joy)

| Token | Altura | Uso sugerido |
|-------|--------|--------------|
| `xs`  | 12px | Ícones inline muito pequenos |
| `sm`  | 16px | Labels, texto secundário |
| `md`  | 20px | Botões padrão, ícones gerais |
| `lg`  | 24px | Navegação lateral, header |
| `xl`  | 28px | Destaques, hero |

**Custom**: `size="32px"`, `size="2rem"`, `size={48}` → aceita qualquer valor CSS.

---

## Sistema de Cores

Suporta tokens GS e valores livres:

```tsx
<GSIcon name="check" color="success" />
<GSIcon name="alert" color="warning" />
<GSIcon name="heart" color="#ff1744" />
```

Tokens disponíveis: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`, `currentColor`, `inherit`.

---

## Uso Básico

```tsx
import { GSIcon } from '@/components/ui';

// Ícone padrão (20px, cor herdada)
<GSIcon name="home" />

// Escala Joy
<GSIcon name="bell" size="xl" color="info" />

// Tamanho custom em pixels
<GSIcon name="star" size="32px" color="warning" />

// Decorativo (ignorado por leitores de ecrã)
<GSIcon name="check" decorative />

// Informativo com label
<GSIcon name="alert-circle" ariaLabel="Aviso" color="warning" />
```

---

## Fallback & Debug

Quando o ícone não é encontrado:

- Mostra um círculo vermelho com `?`
- `data-missing="true"`
- `aria-label` traduzido (`gsicon.fallbackLabel`)
- Console warning (apenas em desenvolvimento)

```