# @carlos-gs99/gs-textarea

Textarea component with auto-resize, character/word/line counters, and validation.

## Installation

```bash
npm install @carlos-gs99/gs-textarea
```

## Basic Usage

```tsx
import { GSTextArea } from '@carlos-gs99/gs-textarea';
import '@carlos-gs99/gs-textarea/styles.css';

function MyForm() {
  const [value, setValue] = useState('');

  return (
    <GSTextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Description"
      placeholder="Enter description..."
      rows={4}
    />
  );
}
```

## Features

- ✅ Controlled/Uncontrolled modes
- ✅ Auto-resize based on content
- ✅ Character/Word/Line counters
- ✅ Clear button (GSIcon)
- ✅ Copy to clipboard button
- ✅ Validation (error, helperText)
- ✅ Validation icons (GSIcon)
- ✅ Floating label
- ✅ Debounce support
- ✅ Size variants (sm, md, lg)
- ✅ Visual variants
- ✅ Loading state
- ✅ Disabled/Read-only states
- ✅ Internationalization (EN/PT)
- ✅ Accessibility (WCAG AA)
- ✅ Debug mode
- ✅ TypeScript types

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-icon ^1.0.0`

## License

MIT © Carlos Braga

