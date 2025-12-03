# GSTabs

Tab navigation component with keyboard support and variants.

## Features

- 4 variants: `solid`, `soft`, `outlined`, `plain`
- 7 colors
- 3 sizes: `sm`, `md`, `lg`
- Horizontal/Vertical orientation
- Keyboard navigation (Arrow keys, Home, End)
- WCAG AA compliant
- i18n support (EN/PT)

## Installation

```bash
npm install @carlos-gs99/gs-tabs
```

## Basic Usage

```tsx
import { GSTabs } from '@carlos-gs99/gs-tabs';
import '@carlos-gs99/gs-tabs/styles.css';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
];

function MyComponent() {
  return <GSTabs tabs={tabs} />;
}
```

## Controlled Usage

```tsx
const [activeTab, setActiveTab] = useState('tab1');

<GSTabs
  tabs={tabs}
  value={activeTab}
  onValueChange={setActiveTab}
/>
```

## Examples

### Vertical Tabs

```tsx
<GSTabs tabs={tabs} orientation="vertical" />
```

### Different Variants

```tsx
<GSTabs tabs={tabs} variant="outlined" />
<GSTabs tabs={tabs} variant="soft" />
```

### With Icons

```tsx
const tabs = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, content: <Home /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon />, content: <Profile /> },
];

<GSTabs tabs={tabs} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `GSTabItem[]` | - | List of tabs |
| `value` | `string` | - | Active tab (controlled) |
| `defaultValue` | `string` | - | Default tab (uncontrolled) |
| `onValueChange` | `(value: string) => void` | - | Change handler |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout |
| `variant` | `GSTabsVariant` | `'solid'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `color` | `GSTabsColor` | `'primary'` | Color theme |
| `fullWidth` | `boolean` | `false` | Full width tabs |
| `keepMounted` | `boolean` | `true` | Keep inactive panels in DOM |

## Keyboard Navigation

- `Arrow Left/Right` (horizontal) or `Arrow Up/Down` (vertical): Navigate tabs
- `Home`: First tab
- `End`: Last tab

## License

MIT - Carlos Braga

