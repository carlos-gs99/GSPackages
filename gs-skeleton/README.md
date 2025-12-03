# GSSkeleton

Skeleton loader component that intelligently wraps content and shows placeholder during loading states.

## Features

- Wrapper-based loading control
- Variants: `text`, `circular`, `rectangular`, `rounded`
- Sizes: `sm`, `md`, `lg`
- Animations: `wave` (shimmer), `pulse` (fade), or none
- Multiline support with automatic gap
- Compound component `GSSkeleton.Group`
- Inherits styles from children
- i18n support (EN/PT)
- WCAG AA compliant

## Installation

```bash
npm install @carlos-gs99/gs-skeleton
```

## Basic Usage

```tsx
import { GSSkeleton } from '@carlos-gs99/gs-skeleton';
import '@carlos-gs99/gs-skeleton/styles.css';

function MyComponent() {
  const [loading, setLoading] = useState(true);
  
  return (
    <GSSkeleton loading={loading}>
      <p>Your content here</p>
    </GSSkeleton>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | **required** | Controls skeleton visibility |
| `children` | `React.ReactNode` | - | Real content (shown when loading=false) |
| `variant` | `GSSkeletonVariant` | `'text'` | Skeleton shape |
| `size` | `GSSkeletonSize` | `'md'` | Size preset |
| `width` | `string \| number` | - | Custom width |
| `height` | `string \| number` | - | Custom height |
| `animation` | `GSSkeletonAnimation` | `'wave'` | Animation type |
| `lines` | `number` | `1` | Number of lines (multiline text) |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Inline styles |

## Examples

### Text Skeleton

```tsx
<GSSkeleton loading={loading}>
  <h1>Title</h1>
</GSSkeleton>
```

### Multiline Text

```tsx
<GSSkeleton loading={loading} lines={3}>
  <p>Paragraph with multiple lines of text content</p>
</GSSkeleton>
```

### Circular (Avatar)

```tsx
<GSSkeleton loading={loading} variant="circular" size="lg">
  <Avatar src={user.avatar} />
</GSSkeleton>
```

### Rectangular (Image)

```tsx
<GSSkeleton loading={loading} variant="rectangular" height={200}>
  <img src={image.url} alt={image.alt} />
</GSSkeleton>
```

### Custom Dimensions

```tsx
<GSSkeleton loading={loading} width="300px" height="100px">
  <div>Custom content</div>
</GSSkeleton>
```

### Animation Variants

```tsx
<GSSkeleton loading={loading} animation="pulse">
  <p>Pulse animation</p>
</GSSkeleton>

<GSSkeleton loading={loading} animation="wave">
  <p>Wave animation (default)</p>
</GSSkeleton>

<GSSkeleton loading={loading} animation={false}>
  <p>No animation</p>
</GSSkeleton>
```

### Group Component

```tsx
<GSSkeleton.Group direction="vertical" gap="lg">
  <GSSkeleton loading={loading} variant="circular" size="lg" />
  <GSSkeleton loading={loading} lines={2} />
  <GSSkeleton loading={loading} width="80%" />
</GSSkeleton.Group>
```

### Horizontal Group

```tsx
<GSSkeleton.Group direction="horizontal" gap="md">
  <GSSkeleton loading={loading} variant="circular" />
  <GSSkeleton loading={loading} width="200px" />
</GSSkeleton.Group>
```

## Accessibility

- `aria-busy="true"` during loading
- `aria-label` with translated text
- Hides actual content visibility (not from DOM)
- Screen reader announces loading state

## Behavior

- When `loading={true}`: Shows skeleton
- When `loading={false}` and has `children`: Shows children
- When `loading={false}` and no `children`: Returns null
- Inherits className and styles from children when possible

## TypeScript

```typescript
import type {
  GSSkeletonProps,
  GSSkeletonGroupProps,
  GSSkeletonVariant,
  GSSkeletonSize,
  GSSkeletonAnimation,
} from '@carlos-gs99/gs-skeleton';
```

## Performance

- Bundle size: ~3 KB (gzipped)
- CSS-only animations
- Conditional rendering
- Minimal re-renders

## License

MIT - Carlos Braga

