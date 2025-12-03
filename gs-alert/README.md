# GSAlert

Alert component with variants, colors and dismissible option.

## Features

- 4 variants: `solid`, `soft`, `outlined`, `plain`
- 7 colors: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- Dismissible with close button
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-alert
```

## Basic Usage

```tsx
import { GSAlert } from '@carlos-gs99/gs-alert';
import '@carlos-gs99/gs-alert/styles.css';

function MyComponent() {
  return (
    <GSAlert color="success">
      Operation completed successfully!
    </GSAlert>
  );
}
```

## Examples

### Success Alert

```tsx
<GSAlert color="success">
  Profile updated successfully!
</GSAlert>
```

### Error Alert

```tsx
<GSAlert color="danger">
  An error occurred. Please try again.
</GSAlert>
```

### Dismissible Alert

```tsx
<GSAlert
  color="warning"
  dismissible
  onClose={() => console.log('closed')}
>
  Warning: This action cannot be undone.
</GSAlert>
```

### Different Variants

```tsx
<GSAlert variant="solid" color="info">Solid variant</GSAlert>
<GSAlert variant="soft" color="info">Soft variant</GSAlert>
<GSAlert variant="outlined" color="info">Outlined variant</GSAlert>
<GSAlert variant="plain" color="info">Plain variant</GSAlert>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Alert content |
| `variant` | `GSAlertVariant` | `'soft'` | Visual variant |
| `color` | `GSAlertColor` | `'info'` | Color theme |
| `dismissible` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close handler |
| `closeIcon` | `React.ReactNode` | - | Custom close icon |

## License

MIT - Carlos Braga

