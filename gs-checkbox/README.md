# GSCheckbox

Accessible checkbox component with group support, ripple effect, and indeterminate state.

## Features

- 3 sizes: `sm`, `md`, `lg`
- 7 colors: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `neutral`
- 4 variants: `outlined`, `soft`, `solid`, `plain`
- Group support (GSCheckboxGroup)
- Indeterminate state
- Ripple effect
- Loading state
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-checkbox
```

## Basic Usage

```tsx
import { GSCheckbox } from '@carlos-gs99/gs-checkbox';
import '@carlos-gs99/gs-checkbox/styles.css';

function MyForm() {
  const [checked, setChecked] = useState(false);
  
  return (
    <GSCheckbox
      checked={checked}
      onChange={setChecked}
      label="Accept terms"
    />
  );
}
```

## Group Usage

```tsx
import { GSCheckbox, GSCheckboxGroup } from '@carlos-gs99/gs-checkbox';

function MyForm() {
  const [values, setValues] = useState(['option1']);
  
  return (
    <GSCheckboxGroup value={values} onChange={setValues}>
      <GSCheckbox value="option1" label="Option 1" />
      <GSCheckbox value="option2" label="Option 2" />
      <GSCheckbox value="option3" label="Option 3" />
    </GSCheckboxGroup>
  );
}
```

## Props

### GSCheckbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled state |
| `onChange` | `(checked: boolean) => void` | - | Change handler |
| `defaultChecked` | `boolean` | `false` | Uncontrolled default |
| `label` | `React.ReactNode` | - | Label text |
| `value` | `string` | - | Value for groups |
| `size` | `GSCheckboxSize` | `'md'` | Size variant |
| `color` | `GSCheckboxColor` | `'primary'` | Color theme |
| `variant` | `GSCheckboxVariant` | `'outlined'` | Visual variant |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `ripple` | `boolean` | `false` | Enable ripple |
| `disabled` | `boolean` | `false` | Disabled state |
| `readOnly` | `boolean` | `false` | Read-only state |
| `loading` | `boolean` | `false` | Loading state |
| `required` | `boolean` | `false` | Required field |

### GSCheckboxGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | - | Selected values |
| `onChange` | `(value: string[]) => void` | - | Change handler |
| `defaultValue` | `string[]` | `[]` | Default values |
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout |
| `size` | `GSCheckboxSize` | `'md'` | Size for children |
| `color` | `GSCheckboxColor` | `'primary'` | Color for children |
| `disabled` | `boolean` | `false` | Disable all |

## Examples

### Basic

```tsx
<GSCheckbox label="Accept" />
```

### With Ripple

```tsx
<GSCheckbox label="Accept" ripple />
```

### Indeterminate

```tsx
<GSCheckbox indeterminate label="Select all (partial)" />
```

### Group

```tsx
<GSCheckboxGroup value={selected} onChange={setSelected}>
  <GSCheckbox value="a" label="Option A" />
  <GSCheckbox value="b" label="Option B" />
</GSCheckboxGroup>
```

## License

MIT - Carlos Braga

