# GSList

List component with compound components (Header, Item, Separator, Footer) - COMPLETE VERSION

## Features

- Compound components pattern
- 3 item variants: simple, complex, with-metadata
- React Router Link integration
- Polymorphic `as` prop
- Icon support
- Active/disabled states
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-list
```

## Usage

```tsx
import { GSList } from '@carlos-gs99/gs-list';

<GSList>
  <GSList.Header>My List</GSList.Header>
  <GSList.Item title="Item 1" icon={<Icon />} onClick={() => {}} />
  <GSList.Separator />
  <GSList.Item title="Item 2" />
  <GSList.Footer>Footer content</GSList.Footer>
</GSList>
```

## License

MIT - Carlos Braga

