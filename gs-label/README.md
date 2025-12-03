# GSLabel

Consistent label component for forms with required indicator, helper text, and full accessibility.

## Features

- 3 sizes: `sm`, `md`, `lg`
- Required indicator (*)
- Helper text with info icon
- Reserved mode (invisible but takes space)
- Disabled state
- Custom color support
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-label
```

## Basic Usage

```tsx
import { GSLabel } from '@carlos-gs99/gs-label';
import '@carlos-gs99/gs-label/styles.css';

function MyForm() {
  return <GSLabel htmlFor="email">Email</GSLabel>;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Label text |
| `htmlFor` | `string` | - | Associated input ID |
| `required` | `boolean` | `false` | Show required indicator (*) |
| `disabled` | `boolean` | `false` | Disabled state |
| `reserved` | `boolean` | `false` | Invisible but takes space |
| `helperText` | `string` | - | Helper text with info icon |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Label size |
| `color` | `string` | - | Custom color override |

## Examples

### Basic Label

```tsx
<GSLabel htmlFor="username">Username</GSLabel>
```

### Required Field

```tsx
<GSLabel htmlFor="email" required>
  Email
</GSLabel>
```

### With Helper Text

```tsx
<GSLabel htmlFor="password" helperText="Min 8 characters">
  Password
</GSLabel>
```

### Disabled

```tsx
<GSLabel htmlFor="disabled-field" disabled>
  Disabled Field
</GSLabel>
```

### Reserved Mode

```tsx
<GSLabel reserved>
  Hidden Label
</GSLabel>
```

### Different Sizes

```tsx
<GSLabel size="sm">Small Label</GSLabel>
<GSLabel size="md">Medium Label</GSLabel>
<GSLabel size="lg">Large Label</GSLabel>
```

### Custom Color

```tsx
<GSLabel color="#ff0000">
  Custom Color Label
</GSLabel>
```

## Accessibility

- Proper `htmlFor` association
- ARIA attributes
- Screen reader support
- Required announcements

## TypeScript

```typescript
import type { GSLabelProps } from '@carlos-gs99/gs-label';
```

## License

MIT - Carlos Braga

