# @carlos-gs99/gs-dropdown

Dropdown menu component built on useDropdown hook and GSList.

## Installation

```bash
npm install @carlos-gs99/gs-dropdown
```

## Basic Usage

```tsx
import { GSDropdown } from '@carlos-gs99/gs-dropdown';
import { GSButton } from '@carlos-gs99/gs-button';
import { GSList } from '@carlos-gs99/gs-list';

function MyComponent() {
  return (
    <GSDropdown
      trigger={<GSButton>Open Menu</GSButton>}
      align="start"
    >
      <GSList.Item>Option 1</GSList.Item>
      <GSList.Item>Option 2</GSList.Item>
      <GSList.Item>Option 3</GSList.Item>
    </GSDropdown>
  );
}
```

## Features

- ✅ Built on useDropdown hook
- ✅ GSList integration
- ✅ Custom trigger element
- ✅ Alignment options (start, center, end)
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ TypeScript types

## Examples

### With Icon Button

```tsx
import { GSIcon } from '@carlos-gs99/gs-icon';

<GSDropdown
  trigger={
    <GSButton variant="plain" size="sm">
      <GSIcon name="more-vertical" />
    </GSButton>
  }
>
  <GSList.Item>Edit</GSList.Item>
  <GSList.Item>Delete</GSList.Item>
</GSDropdown>
```

### Center Aligned

```tsx
<GSDropdown
  trigger={<GSButton>Menu</GSButton>}
  align="center"
>
  <GSList.Item>Center aligned menu</GSList.Item>
</GSDropdown>
```

### With Actions

```tsx
<GSDropdown
  trigger={<GSButton>Actions</GSButton>}
>
  <GSList.Item onClick={() => console.log('View')}>View</GSList.Item>
  <GSList.Item onClick={() => console.log('Edit')}>Edit</GSList.Item>
  <GSList.Item onClick={() => console.log('Delete')}>Delete</GSList.Item>
</GSDropdown>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `React.ReactNode` | - | Element that triggers the dropdown |
| `children` | `React.ReactNode` | - | Dropdown menu content (typically GSList.Item) |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Menu alignment |

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/gs-list ^1.0.0`

## License

MIT © Carlos Braga

