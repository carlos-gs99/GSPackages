# GSTooltip

Tooltip component with intelligent positioning, multiple triggers, smooth animations, and full customization. Built from scratch without external dependencies (except React).

## Features

- ✅ **100% Independent** - No external tooltip libraries
- 🎯 **12 Placements** - top, bottom, left, right + start/end variations
- 📏 **3 Sizes** - sm, md, lg
- 🎨 **7 Colors** - primary, secondary, success, warning, danger, info, neutral
- 🎭 **3 Variants** - solid, outlined, soft
- ➡️ **Optional Arrow** - Show/hide tooltip arrow
- 🖱️ **Multiple Triggers** - hover, click, focus, manual
- ⏱️ **Customizable Delays** - Independent enter/leave delays
- 🎯 **Follow Cursor** - Option to follow mouse cursor
- 📱 **Viewport Aware** - Automatic adjustment to stay within viewport
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 🎭 **Smooth Animations** - Fade in/out with scale
- 🎯 **TypeScript** - Complete typing

## Installation

```bash
npm install @carlos-gs99/gs-tooltip
```

## Usage

```tsx
import { GSTooltip } from '@carlos-gs99/gs-tooltip';

<GSTooltip content="Tooltip text">
  <button>Hover me</button>
</GSTooltip>
```

## Props

### GSTooltipProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | **required** | Tooltip content |
| `children` | `React.ReactElement` | **required** | Element that triggers the tooltip |
| `placement` | `GSTooltipPlacement` | `'top'` | Tooltip positioning |
| `color` | `GSColor` | `'neutral'` | Color theme |
| `size` | `GSSize` | `'md'` | Tooltip size |
| `variant` | `GSTooltipVariant` | `'solid'` | Visual variant |
| `arrow` | `boolean` | `true` | Show arrow |
| `trigger` | `GSTooltipTrigger \| Array` | `'hover'` | How to activate |
| `enterDelay` | `number` | `200` | Delay before showing (ms) |
| `leaveDelay` | `number` | `0` | Delay before hiding (ms) |
| `disabled` | `boolean` | `false` | Disable tooltip |
| `open` | `boolean` | `undefined` | Controlled state |
| `defaultOpen` | `boolean` | `false` | Initial state (uncontrolled) |
| `onOpenChange` | `Function` | `undefined` | State change callback |
| `offset` | `number` | `8` | Distance from element (px) |
| `maxWidth` | `string \| number` | `300` | Maximum width |
| `zIndex` | `number` | `9999` | Tooltip z-index |
| `followCursor` | `boolean` | `false` | Follow mouse cursor |
| `className` | `string` | - | Additional CSS classes |
| `contentClassName` | `string` | - | CSS classes for content |
| `style` | `React.CSSProperties` | - | Inline styles |

## Examples

### Basic

```tsx
import { GSTooltip, GSButton } from '@carlos-gs99/gs-tooltip';

function BasicExample() {
  return (
    <GSTooltip content="Hello World!">
      <GSButton>Hover me</GSButton>
    </GSTooltip>
  );
}
```

### All Placements

```tsx
function PlacementsExample() {
  return (
    <div className="grid gap-4">
      {/* Top */}
      <GSTooltip content="Top" placement="top">
        <GSButton>Top</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Top Start" placement="top-start">
        <GSButton>Top Start</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Top End" placement="top-end">
        <GSButton>Top End</GSButton>
      </GSTooltip>
      
      {/* Bottom */}
      <GSTooltip content="Bottom" placement="bottom">
        <GSButton>Bottom</GSButton>
      </GSTooltip>
      
      {/* Left */}
      <GSTooltip content="Left" placement="left">
        <GSButton>Left</GSButton>
      </GSTooltip>
      
      {/* Right */}
      <GSTooltip content="Right" placement="right">
        <GSButton>Right</GSButton>
      </GSTooltip>
    </div>
  );
}
```

### Colors and Variants

```tsx
function ColorsExample() {
  return (
    <div className="flex gap-2">
      {/* Solid (default) */}
      <GSTooltip content="Primary" color="primary" variant="solid">
        <GSButton>Primary</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Success" color="success" variant="solid">
        <GSButton color="success">Success</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Danger" color="danger" variant="solid">
        <GSButton color="danger">Danger</GSButton>
      </GSTooltip>
      
      {/* Outlined */}
      <GSTooltip content="Outlined" color="primary" variant="outlined">
        <GSButton>Outlined</GSButton>
      </GSTooltip>
      
      {/* Soft */}
      <GSTooltip content="Soft" color="info" variant="soft">
        <GSButton color="info">Soft</GSButton>
      </GSTooltip>
    </div>
  );
}
```

### Sizes

```tsx
function SizesExample() {
  return (
    <>
      <GSTooltip content="Small tooltip" size="sm">
        <GSButton size="sm">Small</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Medium tooltip (default)" size="md">
        <GSButton>Medium</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Large tooltip with more text" size="lg">
        <GSButton size="lg">Large</GSButton>
      </GSTooltip>
    </>
  );
}
```

### With and Without Arrow

```tsx
function ArrowExample() {
  return (
    <>
      <GSTooltip content="With arrow (default)" arrow={true}>
        <GSButton>With Arrow</GSButton>
      </GSTooltip>
      
      <GSTooltip content="Without arrow" arrow={false}>
        <GSButton>No Arrow</GSButton>
      </GSTooltip>
    </>
  );
}
```

### Different Triggers

```tsx
function TriggersExample() {
  return (
    <>
      {/* Hover (default) */}
      <GSTooltip content="Shown on hover" trigger="hover">
        <GSButton>Hover</GSButton>
      </GSTooltip>
      
      {/* Click */}
      <GSTooltip content="Shown on click" trigger="click">
        <GSButton>Click</GSButton>
      </GSTooltip>
      
      {/* Focus */}
      <GSTooltip content="Shown on focus" trigger="focus">
        <GSButton>Focus</GSButton>
      </GSTooltip>
      
      {/* Multiple triggers */}
      <GSTooltip content="Hover or click" trigger={['hover', 'click']}>
        <GSButton>Hover or Click</GSButton>
      </GSTooltip>
    </>
  );
}
```

### Custom Delays

```tsx
function DelaysExample() {
  return (
    <>
      {/* Fast (no delay) */}
      <GSTooltip content="Instant!" enterDelay={0} leaveDelay={0}>
        <GSButton>Instant</GSButton>
      </GSTooltip>
      
      {/* Default */}
      <GSTooltip content="200ms delay" enterDelay={200}>
        <GSButton>Default</GSButton>
      </GSTooltip>
      
      {/* Slow */}
      <GSTooltip content="Slow appear" enterDelay={800} leaveDelay={300}>
        <GSButton>Slow</GSButton>
      </GSTooltip>
    </>
  );
}
```

### Controlled (Manual)

```tsx
function ControlledExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <GSTooltip 
        content="Controlled tooltip" 
        trigger="manual"
        open={open}
        onOpenChange={setOpen}
      >
        <GSButton>Controlled</GSButton>
      </GSTooltip>
      
      <GSButton onClick={() => setOpen(!open)}>
        Toggle Tooltip
      </GSButton>
    </div>
  );
}
```

### Follow Cursor

```tsx
function FollowCursorExample() {
  return (
    <GSTooltip 
      content="I follow your cursor!" 
      followCursor
      placement="top"
    >
      <div className="p-8 bg-gray-100 rounded">
        Move your mouse here
      </div>
    </GSTooltip>
  );
}
```

### Rich Content

```tsx
function RichContentExample() {
  return (
    <GSTooltip 
      content={
        <div>
          <strong>User Information</strong>
          <p className="mt-1">John Doe</p>
          <p className="text-sm">john@example.com</p>
        </div>
      }
      size="lg"
      maxWidth={250}
    >
      <GSButton>User Info</GSButton>
    </GSTooltip>
  );
}
```

### Icon Tooltips

```tsx
function IconTooltipExample() {
  return (
    <div className="flex gap-2">
      <GSTooltip content="Delete" color="danger" size="sm">
        <button className="icon-button">
          <i className="bi bi-trash"></i>
        </button>
      </GSTooltip>
      
      <GSTooltip content="Edit" color="primary" size="sm">
        <button className="icon-button">
          <i className="bi bi-pencil"></i>
        </button>
      </GSTooltip>
      
      <GSTooltip content="Download" color="success" size="sm">
        <button className="icon-button">
          <i className="bi bi-download"></i>
        </button>
      </GSTooltip>
    </div>
  );
}
```

### Disabled Input Tooltip

```tsx
function DisabledInputExample() {
  return (
    <GSTooltip content="This field is currently disabled">
      <span> {/* Wrapper needed for disabled elements */}
        <GSInput disabled placeholder="Disabled input" />
      </span>
    </GSTooltip>
  );
}
```

### Form Validation Tooltip

```tsx
function FormValidationExample() {
  const [email, setEmail] = useState('');
  const isValid = email.includes('@');
  
  return (
    <GSTooltip 
      content="Please enter a valid email address"
      color="danger"
      variant="solid"
      open={!isValid && email.length > 0}
      trigger="manual"
      placement="right"
    >
      <GSInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        error={!isValid && email.length > 0}
      />
    </GSTooltip>
  );
}
```

## Customization

### CSS Classes

```css
.gs-tooltip { }
.gs-tooltip-content { }
.gs-tooltip-arrow { }

/* Modifiers */
.gs-tooltip--sm { }
.gs-tooltip--md { }
.gs-tooltip--lg { }

.gs-tooltip--variant-solid { }
.gs-tooltip--variant-outlined { }
.gs-tooltip--variant-soft { }

.gs-tooltip--color-primary { }
.gs-tooltip--color-success { }
/* ... etc */

.gs-tooltip--placement-top { }
.gs-tooltip--placement-bottom { }
/* ... etc */
```

### Custom Styles

```tsx
<GSTooltip 
  content="Custom styled"
  className="my-custom-tooltip"
  contentClassName="custom-content"
  style={{ 
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    borderRadius: '12px'
  }}
>
  <GSButton>Custom</GSButton>
</GSTooltip>
```

## Accessibility

### ARIA Attributes

- `role="tooltip"` on tooltip element
- `aria-hidden` to control visibility
- Keyboard navigation support

### Keyboard Support

- **Tab**: Navigate to trigger element
- **Enter/Space**: Activate tooltip (if trigger="click")
- **Escape**: Close tooltip (recommended to add)
- **Focus**: Show tooltip (if trigger="focus")

### Best Practices

```tsx
// ✅ Good - Accessible content
<GSTooltip content="Delete this item">
  <button aria-label="Delete">
    <i className="bi bi-trash"></i>
  </button>
</GSTooltip>

// ✅ Good - Additional information
<GSTooltip content="More information about this field">
  <label>
    Email
    <i className="bi bi-info-circle" aria-label="Help"></i>
  </label>
</GSTooltip>

// ❌ Avoid - Essential information
// Don't use tooltip for critical information that should always be visible
```

## Use Cases

### Contextual Help

```tsx
<GSTooltip content="Your password must be at least 8 characters" placement="right">
  <GSInput type="password" />
</GSTooltip>
```

### Additional Information

```tsx
<GSTooltip content="Last updated: 2 hours ago">
  <span className="badge">Active</span>
</GSTooltip>
```

### Button Actions

```tsx
<GSTooltip content="Copy to clipboard" size="sm">
  <button onClick={handleCopy}>
    <i className="bi bi-clipboard"></i>
  </button>
</GSTooltip>
```

### Truncated Values

```tsx
<GSTooltip content={fullText}>
  <div className="truncate max-w-xs">
    {fullText}
  </div>
</GSTooltip>
```

## Edge Cases and Handling

### Disabled Element

```tsx
{/* ✅ Correct - Use wrapper */}
<GSTooltip content="Button is disabled">
  <span>
    <GSButton disabled>Disabled</GSButton>
  </span>
</GSTooltip>

{/* ❌ Wrong - Events don't work on disabled elements */}
<GSTooltip content="Button is disabled">
  <GSButton disabled>Disabled</GSButton>
</GSTooltip>
```

### Viewport Boundaries

```tsx
{/* Tooltip automatically adjusts position to stay within viewport */}
<GSTooltip content="I stay in viewport!" placement="right">
  <button style={{ position: 'absolute', right: 0 }}>
    Edge Button
  </button>
</GSTooltip>
```

### Scroll Container

```tsx
{/* Tooltip automatically repositions on scroll */}
<div className="overflow-auto">
  <GSTooltip content="I follow you on scroll">
    <div>Scrollable content</div>
  </GSTooltip>
</div>
```

### Multiple Tooltips

```tsx
{/* Only one tooltip visible at a time (by default) */}
<div>
  <GSTooltip content="First">
    <GSButton>Button 1</GSButton>
  </GSTooltip>
  <GSTooltip content="Second">
    <GSButton>Button 2</GSButton>
  </GSTooltip>
</div>
```

## Performance

### Optimizations

- Portal rendering to avoid z-index issues
- Automatic event listener cleanup
- Debounced resize/scroll listeners
- Lazy positioning (only calculates when visible)
- Memoized classes and styles

### Best Practices

```tsx
// ✅ Good - Simple content
<GSTooltip content="Simple text">
  <GSButton>Button</GSButton>
</GSTooltip>

// ✅ Good - Light memoized component
const TooltipContent = React.memo(() => <div>Content</div>);
<GSTooltip content={<TooltipContent />}>
  <GSButton>Button</GSButton>
</GSTooltip>

// ⚠️ Caution - Avoid heavy components
<GSTooltip content={<HeavyChartComponent data={bigData} />}>
  <GSButton>Button</GSButton>
</GSTooltip>
```

## Related Components

- **GSPopover** - For richer and interactive content
- **GSToast** - For temporary notifications
- **GSAlert** - For persistent messages
- **GSModal** - For complete dialogs

## References

- [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [MDN: ARIA Tooltip](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role)
- [MUI Tooltip](https://mui.com/material-ui/react-tooltip/) (visual inspiration)

## Tips

1. **Performance**: Use `trigger="manual"` for fine control over when to show
2. **Mobile**: Consider `trigger="click"` for touch devices
3. **Accessibility**: Always provide meaningful content, not just "..."
4. **UX**: Use reasonable delays (200-500ms) to avoid "nervous" tooltips
5. **Viewport**: Trust automatic adjustment, but test on small screens
6. **Content**: Keep tooltips concise (max 2-3 lines ideally)
7. **Disabled Elements**: Always use wrapper `<span>` for disabled elements
8. **Z-index**: Adjust `zIndex` if needed for contexts with complex stacking contexts

## License

MIT © Carlos Braga
