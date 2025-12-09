# @carlos-gs99/gs-drawer

Drawer/Offcanvas side panel component with animations, focus trap, and full accessibility.

## Installation

```bash
npm install @carlos-gs99/gs-drawer
```

## Basic Usage

```tsx
import { GSDrawer } from '@carlos-gs99/gs-drawer';
import '@carlos-gs99/gs-drawer/styles.css';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <GSDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer Title"
        placement="end"
      >
        <p>Drawer content goes here</p>
      </GSDrawer>
    </>
  );
}
```

## Features

- ✅ 4 placements: `start`, `end`, `top`, `bottom`
- ✅ 4 sizes: `sm`, `md`, `lg`, `xl`
- ✅ Smooth animations (enter/exit)
- ✅ Focus trap (accessibility)
- ✅ Keyboard navigation (ESC to close)
- ✅ Backdrop support
- ✅ Restore focus on close
- ✅ GSIcon integration (close button)
- ✅ Internationalization (EN/PT)
- ✅ Accessibility (WCAG AA, ARIA)
- ✅ Debug mode
- ✅ TypeScript types

## Examples

### Different Placements

```tsx
// Left side
<GSDrawer open={open} onClose={onClose} placement="start">
  Content
</GSDrawer>

// Right side (default)
<GSDrawer open={open} onClose={onClose} placement="end">
  Content
</GSDrawer>

// Top
<GSDrawer open={open} onClose={onClose} placement="top">
  Content
</GSDrawer>

// Bottom
<GSDrawer open={open} onClose={onClose} placement="bottom">
  Content
</GSDrawer>
```

### Different Sizes

```tsx
<GSDrawer
  open={open}
  onClose={onClose}
  size="sm"  // or md, lg, xl
>
  Small drawer
</GSDrawer>
```

### Without Backdrop

```tsx
<GSDrawer
  open={open}
  onClose={onClose}
  backdrop={false}
>
  Drawer without backdrop
</GSDrawer>
```

### Custom ARIA Label

```tsx
<GSDrawer
  open={open}
  onClose={onClose}
  ariaLabel="Navigation menu"
>
  Menu content
</GSDrawer>
```

### Without Title

```tsx
<GSDrawer
  open={open}
  onClose={onClose}
>
  Drawer without title
</GSDrawer>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Drawer content |
| `open` | `boolean` | - | Open state |
| `onClose` | `() => void` | - | Close handler |
| `title` | `string` | - | Drawer title |
| `placement` | `GSDrawerPlacement` | `'end'` | Drawer position |
| `size` | `GSDrawerSize` | `'md'` | Drawer size |
| `backdrop` | `boolean` | `true` | Show backdrop |
| `keyboard` | `boolean` | `true` | Enable keyboard navigation |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key |
| `restoreFocus` | `boolean` | `true` | Restore focus on close |
| `className` | `string` | - | Additional CSS class |
| `ariaLabel` | `string` | - | ARIA label |
| `debug` | `boolean` | `false` | Debug mode |

### GSDrawerPlacement

- `'start'` - Left side
- `'end'` - Right side
- `'top'` - Top
- `'bottom'` - Bottom

### GSDrawerSize

- `'sm'` - Small
- `'md'` - Medium
- `'lg'` - Large
- `'xl'` - Extra large

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/primitives ^1.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`

## License

MIT © Carlos Braga
