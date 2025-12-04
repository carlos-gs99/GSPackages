# @carlos-gs99/gs-switch

Toggle switch component with ripple effect and full accessibility.

## Installation

```bash
npm install @carlos-gs99/gs-switch
```

## Basic Usage

```tsx
import { GSSwitch } from '@carlos-gs99/gs-switch';
import '@carlos-gs99/gs-switch/styles.css';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <GSSwitch
      checked={checked}
      onChange={(checked) => setChecked(checked)}
      label="Enable notifications"
    />
  );
}
```

## Features

- ✅ Controlled/Uncontrolled modes
- ✅ Size variants (sm, md, lg)
- ✅ Color variants (7 colors)
- ✅ Label positioning (start/end)
- ✅ Loading state with spinner
- ✅ Disabled state
- ✅ Read-only state
- ✅ Ripple effect
- ✅ Custom icons (checked/unchecked)
- ✅ Validation (error, helperText)
- ✅ Internationalization (EN/PT)
- ✅ Accessibility (WCAG AA, role="switch")
- ✅ Debug mode
- ✅ TypeScript types

## Dependencies

### Peer Dependencies
- `react ^18.0.0`
- `react-i18next ^15.0.0`
- `@carlos-gs99/hooks ^1.0.0`
- `@carlos-gs99/utils ^1.0.0`
- `@carlos-gs99/gs-spinner ^1.0.0`

## License

MIT © Carlos Braga

