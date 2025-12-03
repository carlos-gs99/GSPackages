# GSButton

Versatile button component with multiple variants, loading states, ripple effect, and full accessibility support.

## Features

- 5 variants: `solid`, `outlined`, `soft`, `alternate`, `plain`
- 7 colors: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- 3 sizes: `sm`, `md`, `lg`
- Loading state with spinner
- Ripple effect
- Gradient support
- Icon support (start/end)
- Full keyboard support
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-button
```

## Basic Usage

```tsx
import { GSButton } from '@carlos-gs99/gs-button';
import '@carlos-gs99/gs-button/styles.css';

function MyComponent() {
  return <GSButton>Click me</GSButton>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `GSButtonVariant` | `'solid'` | Visual variant |
| `color` | `GSButtonColor` | `'primary'` | Color semantic |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `fullWidth` | `boolean` | `false` | Expand to full width |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingPosition` | `'start' \| 'end'` | `'start'` | Spinner position |
| `startIcon` | `React.ReactNode` | - | Icon before text |
| `endIcon` | `React.ReactNode` | - | Icon after text |
| `ripple` | `boolean` | `false` | Enable ripple effect |
| `rounded` | `boolean \| 'full'` | `false` | Rounded style |
| `gradient` | `boolean` | `false` | Enable gradient |
| `disabled` | `boolean` | `false` | Disable button |

## Examples

### Basic Button

```tsx
<GSButton>Click me</GSButton>
```

### Variants

```tsx
<GSButton variant="solid">Solid</GSButton>
<GSButton variant="outlined">Outlined</GSButton>
<GSButton variant="soft">Soft</GSButton>
<GSButton variant="plain">Plain</GSButton>
<GSButton variant="alternate">Alternate</GSButton>
```

### Colors

```tsx
<GSButton color="primary">Primary</GSButton>
<GSButton color="success">Success</GSButton>
<GSButton color="danger">Danger</GSButton>
```

### With Icons

```tsx
import { GSIcon } from '@carlos-gs99/gs-icon';

<GSButton startIcon={<GSIcon name="home" />}>
  Home
</GSButton>
```

### Loading State

```tsx
<GSButton loading>
  Loading...
</GSButton>
```

### With Ripple

```tsx
<GSButton ripple>
  Click for ripple effect
</GSButton>
```

### Rounded

```tsx
<GSButton rounded>Pill Button</GSButton>
<GSButton rounded="full">Icon Only</GSButton>
```

### Gradient

```tsx
<GSButton variant="solid" gradient>
  Gradient Button
</GSButton>
```

### Full Width

```tsx
<GSButton fullWidth>
  Full Width Button
</GSButton>
```

## Accessibility

- Proper ARIA attributes
- Keyboard navigation (Enter, Space)
- Focus management
- Loading announcements
- Screen reader support

## TypeScript

```typescript
import type { GSButtonProps } from '@carlos-gs99/gs-button';
```

## License

MIT - Carlos Braga

