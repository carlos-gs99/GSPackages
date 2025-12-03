# GSSelect

Advanced Select component with autocomplete, multi-select, search, and groups - COMPLETE VERSION

## Features

- **Autocomplete** - Type-ahead search
- **Multi-select** - Select multiple options
- **Search/Filter** - Real-time filtering
- **Option Groups** - Organized options
- **Async Loading** - Dynamic option loading
- **Clearable** - Clear button
- **Validation** - Success/error/warning states
- **Decorators** - Start/end icons
- **Custom Rendering** - renderOption, renderValue
- **WCAG AA** - Full accessibility
- **i18n** - EN/PT support

## Installation

```bash
npm install @carlos-gs99/gs-select
```

## Usage

```tsx
import { GSSelect } from '@carlos-gs99/gs-select';

<GSSelect
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select an option"
  searchable
  clearable
/>
```

## License

MIT - Carlos Braga

