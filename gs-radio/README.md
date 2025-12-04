# @carlos-gs99/gs-radio

Radio button component with group support, ripple effect, and full accessibility.

## Installation

```bash
npm install @carlos-gs99/gs-radio
```

## Basic Usage

### Individual Radio

```tsx
import { GSRadio } from '@carlos-gs99/gs-radio';
import '@carlos-gs99/gs-radio/styles.css';

function MyForm() {
  const [selected, setSelected] = useState('option1');

  return (
    <>
      <GSRadio
        value="option1"
        label="Option 1"
        checked={selected === 'option1'}
        onChange={(value) => setSelected(value as string)}
        name="my-radio"
      />
      <GSRadio
        value="option2"
        label="Option 2"
        checked={selected === 'option2'}
        onChange={(value) => setSelected(value as string)}
        name="my-radio"
      />
    </>
  );
}
```

### Radio Group

```tsx
import { GSRadioGroup } from '@carlos-gs99/gs-radio';

function MyForm() {
  const [value, setValue] = useState('option1');

  return (
    <GSRadioGroup
      value={value}
      onChange={(val) => setValue(val as string)}
      label="Choose an option"
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3', disabled: true },
      ]}
    />
  );
}
```

## Features

- ✅ Individual radio buttons
- ✅ GSRadioGroup with Context API
- ✅ Controlled/Uncontrolled modes
- ✅ Ripple effect
- ✅ Size variants (sm, md, lg)
- ✅ Color variants
- ✅ Visual variants (outlined, soft, solid, plain)
- ✅ Orientation (horizontal/vertical)
- ✅ Loading state
- ✅ Disabled state
- ✅ Read-only state
- ✅ Validation (error, helperText, required)
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

## License

MIT © Carlos Braga

