# @carlos-gs99/gs-accordion

Accordion component with collapsible panels, single or multiple expansion modes.

## Installation

```bash
npm install @carlos-gs99/gs-accordion
```

## Basic Usage

```tsx
import { GSAccordion } from '@carlos-gs99/gs-accordion';
import '@carlos-gs99/gs-accordion/styles.css';

function MyComponent() {
  const items = [
    {
      id: 'panel1',
      title: 'Panel 1',
      content: 'Content for panel 1',
    },
    {
      id: 'panel2',
      title: 'Panel 2',
      content: 'Content for panel 2',
    },
  ];

  return <GSAccordion items={items} />;
}
```

## Features

- ✅ Single or multiple expansion modes
- ✅ Controlled/Uncontrolled modes
- ✅ Disabled panels support
- ✅ GSIcon integration (chevron indicators)
- ✅ 3 variants: `outlined`, `soft`, `plain`
- ✅ 3 sizes: `sm`, `md`, `lg`
- ✅ Internationalization (EN/PT)
- ✅ Accessibility (WCAG AA, ARIA expanded)
- ✅ Debug mode
- ✅ TypeScript types

## Examples

### Multiple Expansion

```tsx
<GSAccordion
  items={items}
  multiple
  defaultExpanded={['panel1', 'panel2']}
  onChange={(expanded) => console.log('Expanded:', expanded)}
/>
```

### Single Expansion (Default)

```tsx
<GSAccordion
  items={items}
  defaultExpanded={['panel1']}
/>
```

### With Disabled Panel

```tsx
const items = [
  {
    id: 'panel1',
    title: 'Enabled Panel',
    content: 'This panel can be expanded',
  },
  {
    id: 'panel2',
    title: 'Disabled Panel',
    content: 'This panel is disabled',
    disabled: true,
  },
];

<GSAccordion items={items} />
```

### With Variants

```tsx
<GSAccordion
  items={items}
  variant="outlined"
  size="lg"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `GSAccordionItemProps[]` | - | Accordion items |
| `multiple` | `boolean` | `false` | Allow multiple panels open |
| `defaultExpanded` | `string[]` | `[]` | Initially expanded panel IDs |
| `onChange` | `(expanded: string[]) => void` | - | Change handler |
| `variant` | `'outlined' \| 'soft' \| 'plain'` | `'outlined'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `className` | `string` | - | Additional CSS class |
| `debug` | `boolean` | `false` | Debug mode |

### GSAccordionItemProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | - | Unique item ID |
| `title` | `React.ReactNode` | - | Panel title |
| `content` | `React.ReactNode` | - | Panel content |
| `disabled` | `boolean` | `false` | Disable panel |
| `defaultExpanded` | `boolean` | `false` | Initially expanded (uncontrolled) |

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`

## License

MIT © Carlos Braga
