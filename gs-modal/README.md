# GSModal

Modal dialog with overlay, focus trap and compound components.

## Features

- 4 sizes: `sm`, `md`, `lg`, `xl`
- Portal rendering
- Overlay/Backdrop
- Focus trap
- Close on ESC
- Compound components (Header, Title, Body, Footer)
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-modal
```

## Basic Usage

```tsx
import { GSModal } from '@carlos-gs99/gs-modal';
import '@carlos-gs99/gs-modal/styles.css';

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      
      <GSModal open={open} onClose={() => setOpen(false)}>
        <GSModal.Header closeButton>
          <GSModal.Title>My Modal</GSModal.Title>
        </GSModal.Header>
        <GSModal.Body>
          <p>Modal content here...</p>
        </GSModal.Body>
        <GSModal.Footer>
          <button onClick={() => setOpen(false)}>Close</button>
        </GSModal.Footer>
      </GSModal>
    </>
  );
}
```

## Compound Components

### GSModal.Header
Header section with optional close button.

### GSModal.Title
Title heading for the modal.

### GSModal.Body
Main content area (scrollable).

### GSModal.Footer
Footer section for actions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Show modal |
| `onClose` | `() => void` | - | Close handler |
| `size` | `GSModalSize` | `'md'` | Modal size |
| `centered` | `boolean` | `true` | Center vertically |
| `backdrop` | `boolean \| 'static'` | `true` | Show backdrop |
| `keyboard` | `boolean` | `true` | Close on ESC |
| `closeOnEscape` | `boolean` | `true` | Close on ESC |
| `restoreFocus` | `boolean` | `true` | Restore focus on close |

## Examples

### Different Sizes

```tsx
<GSModal open={open} size="sm">...</GSModal>
<GSModal open={open} size="lg">...</GSModal>
```

### Static Backdrop

```tsx
<GSModal open={open} backdrop="static">
  {/* Can't close by clicking backdrop */}
</GSModal>
```

### With Close Button

```tsx
<GSModal open={open} onClose={handleClose}>
  <GSModal.Header closeButton>
    <GSModal.Title>Title</GSModal.Title>
  </GSModal.Header>
  <GSModal.Body>Content</GSModal.Body>
</GSModal>
```

## License

MIT - Carlos Braga

