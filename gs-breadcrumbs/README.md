# @carlos-gs99/gs-breadcrumbs

Breadcrumb navigation component with compound Item component and customizable separator.

## Installation

```bash
npm install @carlos-gs99/gs-breadcrumbs
```

## Basic Usage

```tsx
import { GSBreadcrumbs } from '@carlos-gs99/gs-breadcrumbs';
import '@carlos-gs99/gs-breadcrumbs/styles.css';

function MyComponent() {
  return (
    <GSBreadcrumbs>
      <GSBreadcrumbs.Item href="/">Home</GSBreadcrumbs.Item>
      <GSBreadcrumbs.Item href="/products">Products</GSBreadcrumbs.Item>
      <GSBreadcrumbs.Item active>Current Page</GSBreadcrumbs.Item>
    </GSBreadcrumbs>
  );
}
```

## Features

- ✅ Compound component pattern (Item)
- ✅ Customizable separator
- ✅ Active state support
- ✅ Link support (href or custom component)
- ✅ Accessibility (ARIA labels, current page)
- ✅ Semantic HTML (nav, ol, li)
- ✅ TypeScript types

## Examples

### Custom Separator

```tsx
<GSBreadcrumbs separator="→">
  <GSBreadcrumbs.Item href="/">Home</GSBreadcrumbs.Item>
  <GSBreadcrumbs.Item href="/about">About</GSBreadcrumbs.Item>
  <GSBreadcrumbs.Item active>Contact</GSBreadcrumbs.Item>
</GSBreadcrumbs>
```

### With Custom Link Component

```tsx
import { Link } from 'react-router-dom';

<GSBreadcrumbs>
  <GSBreadcrumbs.Item as={Link} to="/">Home</GSBreadcrumbs.Item>
  <GSBreadcrumbs.Item as={Link} to="/products">Products</GSBreadcrumbs.Item>
  <GSBreadcrumbs.Item active>Product Details</GSBreadcrumbs.Item>
</GSBreadcrumbs>
```

### Custom ARIA Label

```tsx
<GSBreadcrumbs ariaLabel="Navigation breadcrumb">
  <GSBreadcrumbs.Item href="/">Home</GSBreadcrumbs.Item>
  <GSBreadcrumbs.Item active>Current</GSBreadcrumbs.Item>
</GSBreadcrumbs>
```

## Props

### GSBreadcrumbs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Breadcrumb items |
| `separator` | `React.ReactNode` | `'/'` | Separator between items |
| `ariaLabel` | `string` | `'Breadcrumb'` | ARIA label for navigation |

### GSBreadcrumbs.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Item content |
| `active` | `boolean` | `false` | Mark as active (current page) |
| `href` | `string` | - | Link URL |
| `as` | `React.ElementType` | - | Custom component (e.g., Link from react-router) |
| `className` | `string` | - | Additional CSS class |

## Dependencies

### Peer Dependencies
- `react ^18.0.0`

## License

MIT © Carlos Braga

