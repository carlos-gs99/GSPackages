# GSChip

Polymorphic chip/tag component with variants, icons, deletable support and full keyboard navigation.

## Features

- Polymorphic API (`as` prop) - render as span, button, anchor, etc.
- Size variants: `sm`, `md`, `lg`
- Color tokens: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- Visual variants: `soft`, `outlined`, `solid`, `plain`
- Icons support (`startIcon`, `endIcon`)
- Deletable chips with delete button
- Interactive mode with click handler
- Full keyboard navigation
- ForwardRef with imperative API
- i18n support (EN/PT)
- WCAG AA compliant

## Installation

```bash
npm install @carlos-gs99/gs-chip
```

## Basic Usage

```tsx
import { GSChip } from '@carlos-gs99/gs-chip';
import '@carlos-gs99/gs-chip/styles.css';

function MyComponent() {
  return <GSChip>Label</GSChip>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Chip content |
| `as` | `React.ElementType` | `'span'` | Base element to render |
| `variant` | `GSChipVariant` | `'soft'` | Visual variant |
| `color` | `GSChipColor` | `'primary'` | Color using GS tokens |
| `size` | `GSChipSize` | `'md'` | Chip size |
| `deletable` | `boolean` | `false` | Show delete button |
| `onDelete` | `() => void` | - | Callback when deleted |
| `startIcon` | `React.ReactNode` | - | Icon at start |
| `endIcon` | `React.ReactNode` | - | Icon at end |
| `onClick` | `(event) => void` | - | Makes chip interactive |
| `disabled` | `boolean` | `false` | Disabled state |
| `ariaLabel` | `string` | - | Custom aria-label |
| `deleteButtonAriaLabel` | `string` | - | Custom delete button label |
| `debug` | `boolean` | `false` | Enable debug mode |

## Examples

### Basic Chip

```tsx
<GSChip>Default</GSChip>
<GSChip variant="outlined">Outlined</GSChip>
<GSChip variant="solid" color="success">Success</GSChip>
```

### With Icons

```tsx
<GSChip startIcon={<GSIcon name="star" size="sm" />}>
  Featured
</GSChip>

<GSChip endIcon={<GSIcon name="check" size="sm" />} color="success">
  Completed
</GSChip>
```

### Deletable

```tsx
<GSChip
  deletable
  onDelete={() => console.log('Deleted!')}
  color="danger"
>
  Remove me
</GSChip>
```

### Interactive (Clickable)

```tsx
<GSChip
  onClick={() => console.log('Clicked!')}
  color="primary"
>
  Click me
</GSChip>
```

### Polymorphic - As Button

```tsx
<GSChip as="button" onClick={handleClick}>
  Button chip
</GSChip>
```

### Polymorphic - As Link

```tsx
<GSChip as="a" href="/path" color="info">
  Link chip
</GSChip>
```

### Sizes

```tsx
<GSChip size="sm">Small</GSChip>
<GSChip size="md">Medium</GSChip>
<GSChip size="lg">Large</GSChip>
```

### All Variants

```tsx
<GSChip variant="soft">Soft</GSChip>
<GSChip variant="outlined">Outlined</GSChip>
<GSChip variant="solid">Solid</GSChip>
<GSChip variant="plain">Plain</GSChip>
```

## Accessibility

- `role="button"` when interactive (with onClick)
- `tabIndex={0}` for keyboard navigation when interactive
- Full keyboard support:
  - Enter/Space: trigger onClick
  - Delete/Backspace: trigger onDelete (when deletable)
- `aria-label` with translated text
- `aria-disabled` when disabled
- Delete button has separate aria-label
- Focus visible styles

## Imperative API (Ref)

```tsx
const chipRef = useRef<GSChipRef>(null);

// Focus the chip
chipRef.current?.focus();

// Trigger removal
chipRef.current?.remove();
```

## i18n

Supports English and Portuguese:

```typescript
import { registerGSChipI18n } from '@carlos-gs99/gs-chip';

// Translations registered automatically
```

## TypeScript

Full TypeScript support with polymorphic types:

```typescript
import type {
  GSChipProps,
  GSChipRef,
  GSChipVariant,
  GSChipColor,
  GSChipSize,
} from '@carlos-gs99/gs-chip';

// Polymorphic usage with proper typing
<GSChip<'button'> as="button" onClick={handleClick}>
  Type-safe button chip
</GSChip>
```

## Performance

- Bundle size: ~3 KB (gzipped)
- React.memo optimization
- CSS-only transitions
- Polymorphic without runtime overhead

## License

MIT - Carlos Braga

