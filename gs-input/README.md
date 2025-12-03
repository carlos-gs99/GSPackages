# GSInput

Input component with decorators, validation, clear button and password toggle.

## Features

- 3 sizes: `sm`, `md`, `lg`
- 5 variants: `outlined`, `filled`, `soft`, `solid`, `plain`
- 7 colors
- Start/End decorators
- Clear button
- Password toggle
- Character counter
- Validation states
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-input
```

## Basic Usage

```tsx
import { GSInput } from '@carlos-gs99/gs-input';
import '@carlos-gs99/gs-input/styles.css';

function MyForm() {
  const [value, setValue] = useState('');
  
  return (
    <GSInput
      label="Email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Examples

### With Clear Button

```tsx
<GSInput
  label="Search"
  clearable
  onClear={() => console.log('cleared')}
/>
```

### Password with Toggle

```tsx
<GSInput
  type="password"
  label="Password"
  showPasswordToggle
/>
```

### With Character Counter

```tsx
<GSInput
  label="Bio"
  maxLength={100}
  showCharCount
/>
```

### With Decorators

```tsx
<GSInput
  label="Amount"
  startDecorator="€"
  endDecorator=".00"
/>
```

## License

MIT - Carlos Braga

