# @carlos-gs99/gs-autocomplete

Autocomplete component optimized for search and filtering (built on top of GSSelect).

## Installation

```bash
npm install @carlos-gs99/gs-autocomplete
```

## Basic Usage

```tsx
import { GSAutocomplete } from '@carlos-gs99/gs-autocomplete';

function MyForm() {
  const [value, setValue] = useState(null);

  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  return (
    <GSAutocomplete
      value={value}
      onChange={setValue}
      options={options}
      label="Search options"
    />
  );
}
```

## Features

- ✅ Built on GSSelect (inherits all features)
- ✅ Search enabled by default
- ✅ Single select optimized
- ✅ Async loading support
- ✅ Debounced search
- ✅ Custom filter functions
- ✅ No results message
- ✅ Internationalization (EN/PT)
- ✅ Accessibility
- ✅ TypeScript types

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-select ^1.0.0`

## License

MIT © Carlos Braga

