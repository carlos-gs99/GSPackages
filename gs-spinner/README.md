# GSSpinner

Loading spinner component with variants, sizes, colors and overlay support.

## Features

- Size variants: `sm`, `md`, `lg`
- Color tokens: `primary`, `neutral`, `success`, `warning`, `danger`, `info`
- Visual variants: `solid`, `soft`, `outlined`, `plain`
- Customizable thickness
- Centered and overlay modes
- Optional message display
- i18n support (EN/PT)
- WCAG AA compliant

## Installation

```bash
npm install @carlos-gs99/gs-spinner
```

## Basic Usage

```tsx
import { GSSpinner } from '@carlos-gs99/gs-spinner';
import '@carlos-gs99/gs-spinner/styles.css';

function MyComponent() {
  return <GSSpinner />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `color` | `GSSpinnerColor` | `'primary'` | Color using GS tokens |
| `variant` | `GSSpinnerVariant` | `'solid'` | Visual variant |
| `thickness` | `number` | `4` | Border thickness in pixels |
| `centered` | `boolean` | `false` | Center spinner in container |
| `overlay` | `boolean` | `false` | Show as fullscreen overlay |
| `message` | `string` | - | Optional message below spinner |
| `fullHeight` | `boolean` | `false` | Container uses full viewport height |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Size Variants

```tsx
<GSSpinner size="sm" />  {/* 16px */}
<GSSpinner size="md" />  {/* 24px - default */}
<GSSpinner size="lg" />  {/* 32px */}
```

### Color Variants

```tsx
<GSSpinner color="primary" />
<GSSpinner color="success" />
<GSSpinner color="warning" />
<GSSpinner color="danger" />
```

### Visual Variants

```tsx
<GSSpinner variant="solid" />    {/* Solid colors - default */}
<GSSpinner variant="soft" />     {/* Soft colors */}
<GSSpinner variant="outlined" /> {/* Outlined only */}
<GSSpinner variant="plain" />    {/* Minimal style */}
```

### With Message

```tsx
<GSSpinner
  size="lg"
  message="Loading data..."
  centered
/>
```

### As Overlay

```tsx
{loading && (
  <GSSpinner
    overlay
    fullHeight
    message="Processing request..."
  />
)}
```

### In Button

```tsx
<button disabled={loading}>
  {loading ? <GSSpinner size="sm" /> : 'Save'}
</button>
```

## Accessibility

- `role="status"` for loading state announcement
- `aria-label` with translated text
- Screen reader text (visually hidden)
- WCAG AA color contrast compliant

## i18n

Supports English and Portuguese out of the box:

```typescript
import { registerGSSpinnerI18n } from '@carlos-gs99/gs-spinner';

// Translations are registered automatically
// Custom translations can be added via i18next
```

## Styling

Uses CSS Modules and design tokens from `@carlos-gs99/theme`.

Custom styles can be applied via:
- `className` prop
- CSS custom properties
- Theme token overrides

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  GSSpinnerProps,
  GSSpinnerSize,
  GSSpinnerColor,
  GSSpinnerVariant,
} from '@carlos-gs99/gs-spinner';
```

## Performance

- Bundle size: ~1.5 KB (gzipped)
- React.memo optimization
- CSS-only animations (no JavaScript)
- Conditional rendering for overlay/centered modes

## License

MIT - Carlos Braga

