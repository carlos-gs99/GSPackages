# @carlos-gs99/gs-card

Card container component with variants, collapsible support, images, loading states, and full accessibility.

## Installation

```bash
npm install @carlos-gs99/gs-card
```

## Basic Usage

```tsx
import { GSCard } from '@carlos-gs99/gs-card';
import '@carlos-gs99/gs-card/styles.css';

function MyComponent() {
  return (
    <GSCard>
      <GSCard.Header>Card Title</GSCard.Header>
      <GSCard.Body>Card content goes here</GSCard.Body>
      <GSCard.Footer>Card footer</GSCard.Footer>
    </GSCard>
  );
}
```

## Features

- ✅ Compound components (Header, Body, Footer)
- ✅ Collapsible cards
- ✅ Image support (top, bottom, background positions)
- ✅ Loading state with GSLoading overlay
- ✅ Interactive mode (hover effects, clickable)
- ✅ 5 variants: `default`, `outlined`, `soft`, `elevated`, `plain`
- ✅ 7 colors: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- ✅ 3 sizes: `sm`, `md`, `lg`
- ✅ Elevation levels: `body`, `surface`, `level1`, `level2`, `level3`
- ✅ Controlled/Uncontrolled collapse
- ✅ GSIcon integration
- ✅ Internationalization (EN/PT)
- ✅ Accessibility (WCAG AA)
- ✅ Debug mode
- ✅ TypeScript types

## Props

### GSCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Card content |
| `variant` | `'default' \| 'outlined' \| 'soft' \| 'elevated' \| 'plain'` | `'default'` | Visual variant |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | - | Color theme (mainly for `soft` variant) |
| `level` | `'body' \| 'surface' \| 'level1' \| 'level2' \| 'level3'` | - | Background/elevation level |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal spacing |
| `loading` | `boolean` | `false` | Show loading overlay with integrated GSLoading |
| `loadingText` | `string` | - | Loading message (enables loader text) |
| `loadingProps` | `Partial<GSLoadingProps>` | `{}` | Granular loader customization |
| `disabled` | `boolean` | `false` | Disable interactions and show tooltip with reason |
| `disabledReason` | `string` | - | Text shown in tooltip and via screen reader |
| `clickable` | `boolean` | `false` | Enable cursors/hover states |
| `href` | `string` | - | When defined, card renders as `<a>` |
| `selected` | `boolean` | `false` | Mark card as selected |
| `activeEffect` | `boolean` | `true` | Control click animation when `clickable` |
| `image` | `string` | - | Card image URL |
| `imagePosition` | `'top' \| 'bottom' \| 'background'` | `'top'` | Image position |
| `aspectRatio` | `'auto' \| '1:1' \| '16:9' \| ...` | `'auto'` | Force native aspect-ratio |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Content layout |
| `collapsible` | `boolean` | `false` | Convert header into collapse trigger |
| `defaultExpanded` | `boolean` | `true` | Initial state (uncontrolled) |
| `expanded` | `boolean` | - | Controlled state |
| `onExpandChange` | `(expanded: boolean) => void` | - | Collapse change callback |
| `expandIcon` | `string` | `'chevron-down'` | MDI icon for trigger |
| `expandIconPosition` | `'start' \| 'end'` | `'end'` | Icon position |
| `animateCollapse` | `boolean` | `true` | Enable smooth animation using height |
| `debug` | `boolean \| DebugConfig` | `false` | Enable structured logs via `useComponentDebug` |

### GSCard.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Header content |
| `className` | `string` | - | Additional CSS classes |
| `sx` | `React.CSSProperties` | - | Inline styles |

### GSCard.Body

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Body content |
| `className` | `string` | - | Additional CSS classes |
| `sx` | `React.CSSProperties` | - | Inline styles |

### GSCard.Footer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Footer content |
| `className` | `string` | - | Additional CSS classes |
| `sx` | `React.CSSProperties` | - | Inline styles |

## Examples

### Basic Card

```tsx
<GSCard>
  <GSCard.Header>
    <h3>Card Title</h3>
  </GSCard.Header>
  <GSCard.Body>
    <p>Card content</p>
  </GSCard.Body>
  <GSCard.Footer>
    <button>Action</button>
  </GSCard.Footer>
</GSCard>
```

### Variants

```tsx
<GSCard variant="default">Default</GSCard>
<GSCard variant="outlined">Outlined</GSCard>
<GSCard variant="soft">Soft</GSCard>
<GSCard variant="elevated">Elevated</GSCard>
<GSCard variant="plain">Plain</GSCard>
```

### Elevation Levels

```tsx
<GSCard level="body">Body (no shadow)</GSCard>
<GSCard level="surface">Surface (minimal shadow)</GSCard>
<GSCard level="level1">Level 1 (low shadow)</GSCard>
<GSCard level="level2">Level 2 (medium shadow)</GSCard>
<GSCard level="level3">Level 3 (high shadow)</GSCard>
```

### Sizes

```tsx
<GSCard size="sm">Small</GSCard>
<GSCard size="md">Medium (default)</GSCard>
<GSCard size="lg">Large</GSCard>
```

### Loading State

```tsx
<GSCard loading loadingText="Saving records...">
  <GSCard.Body>Persisting changes...</GSCard.Body>
</GSCard>

// Customize via loadingProps
<GSCard 
  loading 
  loadingProps={{ size: 'lg', color: 'info', showText: true }}
>
  <GSCard.Body>Building dashboard...</GSCard.Body>
</GSCard>
```

### Collapsible Card

```tsx
<GSCard
  collapsible
  defaultExpanded={false}
  onExpandChange={(expanded) => console.log('Expanded:', expanded)}
>
  <GSCard.Header>Click to collapse</GSCard.Header>
  <GSCard.Body>This content can be collapsed</GSCard.Body>
</GSCard>
```

### Interactive Card

```tsx
<GSCard
  clickable
  onClick={() => console.log('Card clicked')}
>
  <GSCard.Body>Hover for effects</GSCard.Body>
</GSCard>
```

### Card with Image

```tsx
<GSCard
  image="/path/to/image.jpg"
  imagePosition="top"
  aspectRatio="16:9"
>
  <GSCard.Body>Content with image</GSCard.Body>
</GSCard>
```

### Card as Link

```tsx
<GSCard
  href="https://example.com"
  clickable
>
  <GSCard.Body>Clickable card link</GSCard.Body>
</GSCard>
```

### Selected Card

```tsx
<GSCard
  selected
  clickable
  onClick={() => handleSelect()}
>
  <GSCard.Body>Selected card</GSCard.Body>
</GSCard>
```

### Disabled Card

```tsx
<GSCard
  disabled
  disabledReason="This card is currently unavailable"
>
  <GSCard.Body>Disabled card content</GSCard.Body>
</GSCard>
```

## Use Cases

### Product Card

```tsx
<GSCard variant="elevated" level="level1">
  <GSCard.Header>
    <h3>{product.name}</h3>
    <span>{product.price}</span>
  </GSCard.Header>
  <GSCard.Body>
    <img src={product.image} alt={product.name} />
    <p>{product.description}</p>
  </GSCard.Body>
  <GSCard.Footer>
    <button>Add to Cart</button>
  </GSCard.Footer>
</GSCard>
```

### Profile Card

```tsx
<GSCard variant="soft">
  <GSCard.Body>
    <GSAvatar text={user.name} src={user.avatar} size="lg" />
    <h3>{user.name}</h3>
    <p>{user.bio}</p>
  </GSCard.Body>
</GSCard>
```

### Statistics Card

```tsx
<GSCard variant="outlined">
  <GSCard.Header>
    <h3>Statistics</h3>
  </GSCard.Header>
  <GSCard.Body>
    <div className="stats-grid">
      <div>Total: {stats.total}</div>
      <div>Active: {stats.active}</div>
      <div>Inactive: {stats.inactive}</div>
    </div>
  </GSCard.Body>
</GSCard>
```

### Settings Card

```tsx
<GSCard>
  <GSCard.Header>
    <h3>Settings</h3>
  </GSCard.Header>
  <GSCard.Body>
    <GSInput label="Name" value={name} onChange={setName} />
    <GSSelect label="Theme" value={theme} onChange={setTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </GSSelect>
  </GSCard.Body>
  <GSCard.Footer>
    <button>Save</button>
    <button>Cancel</button>
  </GSCard.Footer>
</GSCard>
```

## Accessibility

### ARIA Attributes

Card components are semantically neutral and don't require specific ARIA attributes, but can be combined with appropriate semantic elements.

### Screen Readers

Cards are layout elements and their internal content should be properly structured with appropriate headings and semantic landmarks.

## Edge Cases and Limitations

### Nested Cards

**Problem**: Overlapping shadows in nested cards  
**Solution**: Adjust `level`/`variant` or remove shadow via utility CSS

### Responsive Layout

**Description**: GSCard doesn't define automatic layout  
**Alternative**: Use `GSLayout`, CSS Grid/Flex or horizontal `GSCard` as needed

## Related Components

- **[GSLayout](../layout/README.md)** - For responsive card layouts
- **[GSAvatar](../GSAvatar/README.md)** - For avatars inside cards
- **[GSButton](../GSButton/README.md)** - For actions inside cards

## Performance

### Optimizations Implemented

- ✅ Compound components for better tree-shaking
- ✅ CSS custom properties for themes
- ✅ Minimal re-renders with React.memo

### Metrics

- **Bundle Size**: ~1.5 kb (gzipped)
- **Render Time**: ~0.5 ms (average)

## Troubleshooting

### Problem: Card doesn't show shadow

**Cause**: May be using `level="body"` or `variant="plain"`  
**Solution**: Use higher elevation levels or "elevated" variant

### Problem: Broken layout

**Cause**: Cards are not flexible by default  
**Solution**: Use with GSLayout or flex/grid container

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`
- `@carlos-gs99/gs-loading ^1.0.0`

## License

MIT © Carlos Braga
