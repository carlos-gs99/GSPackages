# GSLoading

Advanced loading component with multiple display modes, content slots, and backdrop support.

## Features

- Multiple modes: `fullscreen`, `viewport`, `section`
- Visual variants: `surface`, `transparent`, `inset`
- Content slots: title, description, message, illustration, actions
- Built-in spinner (no external dependencies)
- Backdrop with blur effect
- ARIA live regions
- Auto-focus support
- i18n support (EN/PT)
- WCAG AA compliant

## Installation

```bash
npm install @carlos-gs99/gs-loading
```

## Basic Usage

```tsx
import { GSLoading } from '@carlos-gs99/gs-loading';
import '@carlos-gs99/gs-loading/styles.css';

function MyComponent() {
  return <GSLoading />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `GSLoadingMode` | `'section'` | Display mode |
| `variant` | `GSLoadingVariant` | `'transparent'` | Background variant |
| `title` | `React.ReactNode` | - | Title above spinner |
| `description` | `React.ReactNode` | - | Description text |
| `message` | `React.ReactNode` | - | Short message |
| `illustration` | `React.ReactNode` | - | Custom illustration |
| `actions` | `React.ReactNode` | - | Action buttons |
| `align` | `GSLoadingAlignment` | `'center'` | Content alignment |
| `showBackdrop` | `boolean` | auto | Show backdrop |
| `color` | `string` | `'primary'` | Spinner color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |
| `showText` | `boolean` | `false` | Use default i18n texts |
| `focusOnMount` | `boolean` | `false` | Auto-focus on mount |
| `ariaLive` | `string` | `'polite'` | ARIA live region |

## Examples

### Basic Loading

```tsx
<GSLoading />
```

### With Title and Message

```tsx
<GSLoading
  title="Loading data..."
  message="Please wait"
/>
```

### Fullscreen Mode

```tsx
<GSLoading
  mode="fullscreen"
  title="Processing request"
  showText
/>
```

### With Actions

```tsx
<GSLoading
  message="Taking longer than expected..."
  actions={
    <button onClick={handleCancel}>Cancel</button>
  }
/>
```

### With Illustration

```tsx
<GSLoading
  illustration={<img src="/loading.svg" alt="" />}
  title="Setting up your workspace"
/>
```

### Section Mode (Default)

```tsx
<div style={{ position: 'relative', minHeight: '400px' }}>
  <GSLoading mode="section" />
</div>
```

## Modes

### fullscreen
- Fixed position covering entire viewport
- Z-index 9999
- Backdrop enabled by default

### viewport  
- Covers available viewport height
- Backdrop enabled by default

### section
- Fills parent container
- No backdrop by default
- Minimum height 8rem

## Variants

### transparent (default)
- No background
- Minimal padding
- Clean look

### surface
- Card-like background
- Shadow effect
- Rounded corners

### inset
- Subtle inset background
- Inner border
- Integrated look

## Accessibility

- `aria-live` region for screen readers
- `aria-busy="true"` during loading
- `aria-describedby` linking all text elements
- Focus management with `focusOnMount`
- Proper semantic HTML

## i18n

Default translations (EN/PT) available via `showText={true}`:

```tsx
<GSLoading showText />
// Shows: "We are getting everything ready…"
```

## TypeScript

```typescript
import type {
  GSLoadingProps,
  GSLoadingMode,
  GSLoadingVariant,
  GSLoadingAlignment,
} from '@carlos-gs99/gs-loading';
```

## Performance

- Bundle size: ~4 KB (gzipped)
- Built-in spinner (no external deps)
- CSS-only animations
- Conditional rendering

## License

MIT - Carlos Braga

