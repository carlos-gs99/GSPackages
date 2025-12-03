# GSDivider

> Componente divisor para separar conteúdo visualmente com linhas horizontais ou verticais.

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientação da linha divisória |
| children | `React.ReactNode` | - | Texto opcional no centro (apenas horizontal) |
| textAlign | `'left' \| 'center' \| 'right'` | `'center'` | Alinhamento do texto (apenas horizontal) |
| variant | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Estilo da linha divisória |
| color | `'neutral' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | Cor da linha (tokens Joy) |
| spacing | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Espaçamento ao redor do divisor |
| className | `string` | - | Classes CSS adicionais |
| ariaLabel | `string` | - | Etiqueta acessível personalizada |
| debug | `boolean` | `false` | Ativa logs de debug (`useComponentDebug`) |

### TypeScript Types

```typescript
export interface GSDividerProps {
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  ariaLabel?: string;
  debug?: boolean;
}
```

---

## 📖 Exemplos de Uso

### Exemplo Básico

```tsx
import { GSDivider } from '@/components/ui/GSDivider';

function MyComponent() {
  return (
    <div>
      <section>Seção 1</section>
      <GSDivider />
      <section>Seção 2</section>
    </div>
  );
}
```

### Exemplo com Texto

```tsx
function ComponentWithText() {
  return (
    <>
      <GSDivider textAlign="center">
        Seção Principal
      </GSDivider>

      <GSDivider textAlign="left">
        Subseção Esquerda
      </GSDivider>

      <GSDivider textAlign="right">
        Subseção Direita
      </GSDivider>
    </>
  );
}
```

### Exemplo com Orientação Vertical

```tsx
function VerticalDividers() {
  return (
    <div style={{ display: 'flex', height: '200px' }}>
      <aside>Sidebar</aside>
      <GSDivider orientation="vertical" />
      <main>Conteúdo Principal</main>
      <GSDivider orientation="vertical" />
      <aside>Sidebar Secundária</aside>
    </div>
  );
}
```

### Exemplo com Diferentes Variantes

```tsx
function DividerVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Solid (padrão)</h3>
        <GSDivider variant="solid" />
      </div>

      <div>
        <h3>Dashed</h3>
        <GSDivider variant="dashed" />
      </div>

      <div>
        <h3>Dotted</h3>
        <GSDivider variant="dotted" />
      </div>
    </div>
  );
}
```

---

## 🎨 Variantes & Tokens

### Orientation

```tsx
<GSDivider orientation="horizontal">Horizontal (padrão)</GSDivider>
<GSDivider orientation="vertical">Vertical</GSDivider>
```

### Variant

```tsx
<GSDivider variant="solid">Solid (padrão)</GSDivider>
<GSDivider variant="dashed">Dashed</GSDivider>
<GSDivider variant="dotted">Dotted</GSDivider>
```

### Color

```tsx
<GSDivider color="primary">Primary</GSDivider>
<GSDivider color="secondary">Secondary</GSDivider>
<GSDivider color="neutral">Neutral (padrão)</GSDivider>
```

### Spacing

```tsx
<GSDivider spacing="none">Sem espaçamento</GSDivider>
<GSDivider spacing="sm">Espaçamento pequeno</GSDivider>
<GSDivider spacing="md">Espaçamento médio (padrão)</GSDivider>
<GSDivider spacing="lg">Espaçamento grande</GSDivider>
<GSDivider spacing="xl">Espaçamento extra grande</GSDivider>
```

---

## 🔄 Estados

### Default

Estado padrão do componente.

```tsx
<GSDivider>Texto opcional</GSDivider>
```

---

## ♿ Acessibilidade

- `role="separator"` com `aria-orientation` e etiqueta traduzida (`ariaLabel` para override).
- Vertical ignora `children` (texto) para manter semântica.
- Pode ser referenciado externamente via `ref` para integração com layouts responsivos.

---

## 🧩 Data Attributes

- `data-gs="GSDivider"`
- `data-orientation="horizontal|vertical"`
- `data-variant="solid|dashed|dotted"`
- `data-color="neutral|primary|secondary|success|warning|danger|info"`
- `data-spacing="none|sm|md|lg|xl"`
- `data-has-text="true"` quando existe `children` em orientação horizontal
- `data-debug="true"` quando `debug` está ativo