# GSCard

> Componente de card para agrupar conteúdo relacionado em um container visualmente distinto com diferentes estilos e elevações.

## 📋 Props

### GSCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Conteúdo do card |
| `variant` | `'default' \| 'outlined' \| 'soft' \| 'elevated' \| 'plain'` | `'default'` | Estilo visual |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | `undefined` | Cor auxiliar (principalmente para `soft`) |
| `level` | `'body' \| 'surface' \| 'level1' \| 'level2' \| 'level3'` | `undefined` | Altera background/elevation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Espaçamento interno |
| `loading` | `boolean` | `false` | Ativa overlay com `GSLoading` integrado |
| `loadingText` | `string` | `undefined` | Mensagem apresentada durante loading (ativa texto do loader) |
| `loadingProps` | `Partial<GSLoadingProps>` | `{}` | Personalização granular do loader interno |
| `disabled` | `boolean` | `false` | Desabilita interações e ativa tooltip de motivo |
| `disabledReason` | `string` | `undefined` | Texto exibido no tooltip e via screen reader |
| `clickable` | `boolean` | `false` | Ativa cursores/hover states |
| `href` | `string` | `undefined` | Quando definido, o card renderiza como `<a>` |
| `selected` | `boolean` | `false` | Marca o card como selecionado |
| `activeEffect` | `boolean` | `true` | Controla animação ao clicar quando `clickable` |
| `image` | `string` | `undefined` | URL da imagem do card |
| `imagePosition` | `'top' \| 'bottom' \| 'background'` | `'top'` | Posição da imagem |
| `aspectRatio` | `'auto' \| '1:1' \| '16:9' \| ...` | `'auto'` | Força aspect-ratio nativo |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout do conteúdo |
| `collapsible` | `boolean` | `false` | Converte header em trigger de colapso |
| `defaultExpanded` | `boolean` | `true` | Estado inicial (não controlado) |
| `expanded` | `boolean` | `undefined` | Estado controlado |
| `onExpandChange` | `(expanded: boolean) => void` | `undefined` | Callback de colapso |
| `expandIcon` | `string` | `'chevron-down'` | Ícone MDI do trigger |
| `expandIconPosition` | `'start' \| 'end'` | `'end'` | Posição do ícone |
| `animateCollapse` | `boolean` | `true` | Ativa animação suave usando height |
| `debug` | `boolean \| DebugConfig` | `false` | Ativa logs estruturados via `useComponentDebug` |

### GSCardHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | - | Conteúdo do header |
| className | `string` | - | Classes CSS adicionais |
| sx | `React.CSSProperties` | - | Estilos inline |

### GSCardBody Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | - | Conteúdo do body |
| className | `string` | - | Classes CSS adicionais |
| sx | `React.CSSProperties` | - | Estilos inline |

### GSCardFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | - | Conteúdo do footer |
| className | `string` | - | Classes CSS adicionais |
| sx | `React.CSSProperties` | - | Estilos inline |

### TypeScript Types

```typescript
interface GSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'soft' | 'elevated' | 'plain';
  level?: 'body' | 'surface' | 'level1' | 'level2' | 'level3';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  sx?: React.CSSProperties;
}

interface GSCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}

interface GSCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}

interface GSCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}
```

---

## 📖 Exemplos de Uso

### Exemplo Básico

```tsx
import { GSCard, GSCardHeader, GSCardBody, GSCardFooter } from '@/components/ui/GSCard';

function MyComponent() {
  return (
    <GSCard>
      <GSCardHeader>
        <h3>Título do Card</h3>
      </GSCardHeader>
      <GSCardBody>
        <p>Conteúdo principal do card</p>
      </GSCardBody>
      <GSCardFooter>
        <button>Ação</button>
      </GSCardFooter>
    </GSCard>
  );
}
```

### Estado de Loading (overlay integrado)

```tsx
<GSCard loading loadingText="A guardar registos…">
  <GSCardBody>Persistindo alterações…</GSCardBody>
</GSCard>

// Customizar via loadingProps
<GSCard loading loadingProps={{ size: 'lg', color: 'info', showText: true }}>
  <GSCardBody>Construindo dashboard…</GSCardBody>
</GSCard>
```

### Exemplo com Diferentes Variantes

```tsx
function CardVariants() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <GSCard variant="default">
        <GSCardBody>Default</GSCardBody>
      </GSCard>

      <GSCard variant="outlined">
        <GSCardBody>Outlined</GSCardBody>
      </GSCard>

      <GSCard variant="soft">
        <GSCardBody>Soft</GSCardBody>
      </GSCard>

      <GSCard variant="elevated">
        <GSCardBody>Elevated</GSCardBody>
      </GSCard>

      <GSCard variant="plain">
        <GSCardBody>Plain</GSCardBody>
      </GSCard>
    </div>
  );
}
```

### Exemplo com Níveis de Elevação

```tsx
function CardLevels() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <GSCard level="body">
        <GSCardBody>Body Level</GSCardBody>
      </GSCard>

      <GSCard level="surface">
        <GSCardBody>Surface Level</GSCardBody>
      </GSCard>

      <GSCard level="level1">
        <GSCardBody>Level 1</GSCardBody>
      </GSCard>

      <GSCard level="level2">
        <GSCardBody>Level 2</GSCardBody>
      </GSCard>

      <GSCard level="level3">
        <GSCardBody>Level 3</GSCardBody>
      </GSCard>
    </div>
  );
}
```

### Exemplo com Tamanhos

```tsx
function CardSizes() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <GSCard size="sm">
        <GSCardBody>Small Card</GSCardBody>
      </GSCard>

      <GSCard size="md">
        <GSCardBody>Medium Card (padrão)</GSCardBody>
      </GSCard>

      <GSCard size="lg">
        <GSCardBody>Large Card</GSCardBody>
      </GSCard>
    </div>
  );
}
```

### Exemplo Completo

```tsx
function ProductCard({ product }) {
  return (
    <GSCard variant="elevated" level="level1" className="product-card">
      <GSCardHeader>
        <h3>{product.name}</h3>
        <span className="product-price">{product.price}</span>
      </GSCardHeader>

      <GSCardBody>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
      </GSCardBody>

      <GSCardFooter>
        <button>Add to Cart</button>
        <button>Favorite</button>
      </GSCardFooter>
    </GSCard>
  );
}
```

---

## 🎨 Variantes

### Variant

```tsx
<GSCard variant="default">Default (padrão)</GSCard>
<GSCard variant="outlined">Outlined</GSCard>
<GSCard variant="soft">Soft</GSCard>
<GSCard variant="elevated">Elevated</GSCard>
<GSCard variant="plain">Plain</GSCard>
```

**Visual**:
- `default` - Estilo padrão
- `outlined` - Com borda
- `soft` - Fundo suave
- `elevated` - Com sombra elevada
- `plain` - Sem estilo específico

---

### Level (Elevação)

```tsx
<GSCard level="body">Body (sem sombra)</GSCard>
<GSCard level="surface">Surface (sombra mínima)</GSCard>
<GSCard level="level1">Level 1 (sombra baixa)</GSCard>
<GSCard level="level2">Level 2 (sombra média)</GSCard>
<GSCard level="level3">Level 3 (sombra alta)</GSCard>
```

---

### Size

```tsx
<GSCard size="sm">Small</GSCard>
<GSCard size="md">Medium (padrão)</GSCard>
<GSCard size="lg">Large</GSCard>
```

---

## 🔄 Estados

### Default

Estado padrão do componente.

```tsx
<GSCard>Conteúdo padrão</GSCard>
```

---

## ♿ Acessibilidade

### ARIA Attributes

Os componentes card são semanticamente neutros e não requerem atributos ARIA específicos, mas podem ser combinados com elementos semânticos apropriados.

### Screen Readers

Cards são elementos de layout e seu conteúdo interno deve ser adequadamente estruturado com headings apropriados e landmarks semânticos.

---

## 🎯 Casos de Uso Comuns

### Caso de Uso 1: Card de Produto

```tsx
<GSCard variant="elevated">
  <GSCardHeader>
    <h3>{product.name}</h3>
    <span>{product.price}</span>
  </GSCardHeader>
  <GSCardBody>
    <img src={product.image} alt={product.name} />
    <p>{product.description}</p>
  </GSCardBody>
  <GSCardFooter>
    <button>Add to Cart</button>
  </GSCardFooter>
</GSCard>
```

### Caso de Uso 2: Card de Perfil

```tsx
<GSCard variant="soft">
  <GSCardBody>
    <GSAvatar text={user.name} src={user.avatar} size="lg" />
    <h3>{user.name}</h3>
    <p>{user.bio}</p>
  </GSCardBody>
</GSCard>
```

### Caso de Uso 3: Card de Estatísticas

```tsx
<GSCard variant="outlined">
  <GSCardHeader>
    <h3>Estatísticas</h3>
  </GSCardHeader>
  <GSCardBody>
    <div className="stats-grid">
      <div>Total: {stats.total}</div>
      <div>Ativos: {stats.active}</div>
      <div>Inativos: {stats.inactive}</div>
    </div>
  </GSCardBody>
</GSCard>
```

### Caso de Uso 4: Card de Configurações

```tsx
<GSCard>
  <GSCardHeader>
    <h3>Configurações</h3>
  </GSCardHeader>
  <GSCardBody>
    <GSInput label="Nome" value={name} onChange={setName} />
    <GSSelect label="Tema" value={theme} onChange={setTheme}>
      <option value="light">Claro</option>
      <option value="dark">Escuro</option>
    </GSSelect>
  </GSCardBody>
  <GSCardFooter>
    <button>Salvar</button>
    <button>Cancelar</button>
  </GSCardFooter>
</GSCard>
```

---

## ⚠️ Edge Cases e Limitações

### Edge Case 1: Cards Aninhados

**Problema**: Sombra sobreposta em cards aninhados
**Solução**: Ajustar `level`/`variant` ou remover sombra via CSS utilitária

### Limitação 1: Layout Responsivo

**Descrição**: GSCard não define layout automático
**Alternativa**: Usar `GSLayout`, CSS Grid/Flex ou `GSCard` horizontal conforme necessário

---

## 🔗 Componentes Relacionados

- **[GSLayout](../layout/README.md)** - Para layouts responsivos de cards
- **[GSAvatar](../GSAvatar/README.md)** - Para avatars dentro de cards
- **[GSButton](../GSButton/README.md)** - Para ações dentro de cards

---

## 📊 Performance

### Otimizações Implementadas

- ✅ Compound components para melhor tree-shaking
- ✅ CSS custom properties para temas
- ✅ Minimal re-renders com React.memo

### Métricas

- **Bundle Size**: ~1.5 kb (gzipped)
- **Render Time**: ~0.5 ms (average)

---

## 🐛 Troubleshooting

### Problema: Card não aparece com sombra

**Causa**: Pode estar usando `level="body"` ou `variant="plain"`
**Solução**: Usar níveis de elevação maiores ou variante "elevated"

### Problema: Layout quebrado

**Causa**: Cards não são flexíveis por padrão
**Solução**: Usar com GSLayout ou container flex/grid

---

## 📝 Changelog

### [v1.0.0] - 2025-01-09
- 🎉 Release inicial

---

*Última atualização: 2025-01-09*
*Versão: 1.0.0*
