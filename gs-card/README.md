# @carlos-gs99/gs-card

Card container component with variants, collapsible support, images, and loading states.

## Installation

```bash
npm install @carlos-gs99/gs-card
```

## Basic Usage

```tsx
import { GSCard } from '@carlos-gs99/gs-card';
import '@carlos-gs99/gs-card/styles.css';

function MyComponent() {
  return (
    <GSCard>
      <GSCard.Header>Card Title</GSCard.Header>
      <GSCard.Body>Card content goes here</GSCard.Body>
      <GSCard.Footer>Card footer</GSCard.Footer>
    </GSCard>
  );
}
```

## Features

- ✅ Compound components (Header, Body, Footer)
- ✅ Collapsible cards
- ✅ Image support (top, left, right positions)
- ✅ Loading state with GSLoading
- ✅ Interactive mode (hover effects)
- ✅ 5 variants: `default`, `outlined`, `soft`, `solid`, `plain`
- ✅ 7 colors: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- ✅ 3 sizes: `sm`, `md`, `lg`
- ✅ Controlled/Uncontrolled collapse
- ✅ GSIcon integration
- ✅ Internationalization (EN/PT)
- ✅ Accessibility (WCAG AA)
- ✅ Debug mode
- ✅ TypeScript types

## Examples

### With Image

```tsx
<GSCard
  image="/path/to/image.jpg"
  imageAlt="Card image"
  imagePosition="top"
>
  <GSCard.Body>Content with image</GSCard.Body>
</GSCard>
```

### Collapsible Card

```tsx
<GSCard
  collapsible
  defaultCollapsed={false}
  onCollapseChange={(collapsed) => console.log('Collapsed:', collapsed)}
>
  <GSCard.Header>Click to collapse</GSCard.Header>
  <GSCard.Body>This content can be collapsed</GSCard.Body>
</GSCard>
```

### Loading State

```tsx
<GSCard loading loadingText="Loading content...">
  <GSCard.Body>Content will appear when loaded</GSCard.Body>
</GSCard>
```

### Interactive Card

```tsx
<GSCard
  interactive
  onClick={() => console.log('Card clicked')}
>
  <GSCard.Body>Hover for effects</GSCard.Body>
</GSCard>
```

### With Variants

```tsx
<GSCard variant="outlined" color="primary" size="lg">
  <GSCard.Body>Styled card</GSCard.Body>
</GSCard>
```

## Props

### GSCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Card content |
| `variant` | `GSCardVariant` | `'default'` | Visual variant |
| `color` | `GSCardColor` | - | Color theme |
| `size` | `GSCardSize` | `'md'` | Size variant |
| `collapsible` | `boolean` | `false` | Enable collapse |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state |
| `collapsed` | `boolean` | - | Controlled collapsed state |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Collapse change handler |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingText` | `string` | - | Loading message |
| `interactive` | `boolean` | `false` | Enable hover effects |
| `image` | `string` | - | Image URL |
| `imageAlt` | `string` | - | Image alt text |
| `imagePosition` | `GSCardImagePosition` | `'top'` | Image position |
| `onClick` | `() => void` | - | Click handler |
| `debug` | `boolean` | - | Debug mode |

### GSCard.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Header content |

### GSCard.Body

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Body content |

### GSCard.Footer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Footer content |

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`
- `@carlos-gs99/gs-loading ^1.0.0`

## License

MIT © Carlos Braga
