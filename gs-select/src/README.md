# GSSelect 🏆

Advanced select/dropdown component with MUI Joy-style design, fully accessible and feature-rich.

**Status**: ✅ **Platinum Tier** | **Cobertura**: 90%+ | **Storybook**: 30+ stories

## 📦 Features

- ✅ **Label and Error Handling** - Built-in support for labels, errors, and helper text
- ✅ **Size Variants** - `sm`, `md`, `lg`
- ✅ **Visual Variants** - `outlined`, `filled`, `standard`
- ✅ **Accessible** - Full ARIA support and keyboard navigation
- ✅ **Controlled/Uncontrolled** - Works with or without external state management
- ✅ **i18n Support** - Multi-language with fallback
- ✅ **Custom Options** - Flexible option structure with disabled state
- ✅ **Click Outside** - Auto-close on outside click
- ✅ **Keyboard Navigation** - Arrow keys, Home, End, Enter, Escape, Typeahead
- ✅ **Debug Mode** - Full useDebug integration
- ✅ **Loading State** - Spinner in trigger
- ✅ **Clearable** - X button to clear selection
- ✅ **Search/Filter** - Input inside dropdown with sticky positioning
- ✅ **Multi-Select** - Chips/tags mode with max selections
- ✅ **Option Groups** - Sticky headers (MUI Joy style)
- ✅ **Async Loading** - Load options from API with debounce
- ✅ **Auto-Position** - Opens upward if no space below
- ✅ **Custom Rendering** - Rich content support (avatars, multi-line)
- ✅ **Validation States** - Success, warning, error with icons
- ✅ **Scroll to Selected** - Smooth scroll to selected option on open

## 📥 Installation

```typescript
import { GSSelect } from '@/components/form/base/GSSelect';
```

## 🎯 Basic Usage

### Simple Select

```tsx
<GSSelect
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'pt', label: 'Portugal' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' }
  ]}
  onChange={(value) => console.log(value)}
/>
```

### Controlled Select

```tsx
const [country, setCountry] = useState('pt');

<GSSelect
  label="Country"
  value={country}
  onChange={setCountry}
  options={[
    { value: 'pt', label: 'Portugal' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' }
  ]}
/>
```

### With Error

```tsx
<GSSelect
  label="Required Field"
  error="Please select an option"
  required
  options={options}
/>
```

### With Helper Text

```tsx
<GSSelect
  label="Language"
  helperText="Select your preferred language"
  options={languages}
/>
```

## 🎨 Variants

### Size Variants

```tsx
<GSSelect size="sm" options={options} />
<GSSelect size="md" options={options} /> {/* Default */}
<GSSelect size="lg" options={options} />
```

### Visual Variants

```tsx
<GSSelect variant="outlined" options={options} /> {/* Default */}
<GSSelect variant="filled" options={options} />
<GSSelect variant="standard" options={options} />
```

## 🔧 Advanced Examples

### Disabled Options

```tsx
<GSSelect
  label="Priority"
  options={[
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent', disabled: true }
  ]}
/>
```

### With Default Value

```tsx
<GSSelect
  label="Status"
  defaultValue="active"
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ]}
/>
```

### Disabled Select

```tsx
<GSSelect
  label="Disabled Select"
  disabled
  value="option1"
  options={options}
/>
```

### Custom ID and Name

```tsx
<GSSelect
  id="user-country"
  name="country"
  label="Country"
  options={countries}
/>
```

### Validation States

```tsx
{/* Success state - icon inside (default) */}
<GSSelect
  label="Verified Email"
  validationState="success"
  showValidationIcon
  value="user@example.com"
  options={emails}
/>

{/* Error state - icon inside before chevron */}
<GSSelect
  label="Required Field"
  validationState="error"
  showValidationIcon
  error="This field is required"
  options={options}
/>

{/* Warning state - icon outside select */}
<GSSelect
  label="Old Password"
  validationState="warning"
  showValidationIcon
  validationIconOutside  // Icon appears after the select
  helperText="This password will expire soon"
  options={options}
/>
```

### Loading States

```tsx
{/* Loading - spinner replaces chevron (default) */}
<GSSelect
  label="Loading Data"
  loading
  loadingPosition="inside"  // Default
  options={options}
/>

{/* Loading - spinner appears outside */}
<GSSelect
  label="Fetching Options"
  loading
  loadingPosition="outside"
  options={options}
/>
```

### Clearable Select

```tsx
{/* Clearable - with clear button */}
<GSSelect
  label="Country"
  clearable
  value={country}
  onChange={setCountry}
  onClear={() => console.log('Cleared!')}
  options={countries}
/>

{/* Clearable with validation - clear button appears before validation icon */}
<GSSelect
  label="Priority"
  clearable
  validationState="success"
  showValidationIcon
  value={priority}
  options={priorities}
/>
```

### Full Width & Width Modes

```tsx
{/* Min width (default) - 200px minimum */}
<GSSelect
  label="Minimum Width"
  widthMode="min"  // default
  options={options}
/>

{/* Auto width - fit content (150px minimum) */}
<GSSelect
  label="Auto Width"
  widthMode="auto"
  options={options}
/>

{/* Compact width - fit content (no minimum) */}
<GSSelect
  label="Compact Width"
  widthMode="compact"
  options={options}
/>

{/* Full width - 100% of container */}
<GSSelect
  label="Full Width"
  widthMode="full"
  options={options}
/>

{/* Deprecated: fullWidth prop (use widthMode="full" instead) */}
<GSSelect
  label="Full Width (deprecated)"
  fullWidth
  options={options}
/>
```

### Disabled State

```tsx
{/* Disabled state - identical styling to GSInput */}
<GSSelect
  label="Disabled Select"
  disabled
  value="selected"
  options={options}
/>
// Note: All icons (clear, validation, loading, chevron) are hidden
// Decorators remain visible but dimmed (60% opacity)
// Background: #f3f4f6, Border: #d1d5db, Text: #9ca3af
```

## 📋 Props

### GSSelectProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `GSSelectOption[]` | `[]` | Array of options to display |
| `value` | `string \| number` | - | Controlled value |
| `onChange` | `(value: string \| number) => void` | - | Change handler |
| `defaultValue` | `string \| number \| null` | `null` | Default value for uncontrolled mode |
| `label` | `string` | - | Label text |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below select |
| `required` | `boolean` | `false` | Required field indicator |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `variant` | `'outlined' \| 'filled' \| 'standard'` | `'outlined'` | Visual variant |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `validationState` | `'success' \| 'warning' \| 'error' \| null` | `null` | Validation state |
| `showValidationIcon` | `boolean` | `false` | Show validation icon |
| `validationIconOutside` | `boolean` | `false` | Show validation icon outside select (default: inside before chevron) |
| `loadingPosition` | `'inside' \| 'outside'` | `'inside'` | Loading spinner position: inside replaces chevron, outside appears after select |
| `clearable` | `boolean` | `false` | Show clear button when value is selected |
| `clearButtonOutside` | `boolean` | `false` | Show clear button outside select (default: inside before validation) |
| `widthMode` | `'min' \| 'auto' \| 'compact' \| 'full'` | `'min'` | Width behavior: min (200px), auto (fit content, 150px min), compact (fit content, no min), full (100%) |
| `className` | `string` | - | Additional CSS classes |
| `selectClassName` | `string` | - | CSS classes for select element |
| `id` | `string` | - | HTML id attribute |
| `name` | `string` | - | HTML name attribute |

### GSSelectOption

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string \| number` | ✅ | Option value |
| `label` | `string` | ✅ | Display label |
| `disabled` | `boolean` | ❌ | Disabled state |

## ⌨️ Keyboard Navigation

- **Enter / Space** - Open/close dropdown
- **Arrow Down** - Open dropdown or move to next option
- **Arrow Up** - Open dropdown or move to previous option
- **Escape** - Close dropdown and return focus
- **Tab** - Close dropdown and move to next element

## ♿ Accessibility

The component follows WAI-ARIA best practices:

- ✅ **ARIA Attributes** - Proper `role`, `aria-expanded`, `aria-haspopup`
- ✅ **Keyboard Support** - Full keyboard navigation
- ✅ **Focus Management** - Proper focus handling
- ✅ **Screen Reader** - Clear announcements for state changes
- ✅ **Error Handling** - `aria-invalid` and `aria-describedby`
- ✅ **Required Fields** - `aria-required` support

## 🌍 Internationalization

The component supports i18n through the translation system:

```typescript
import { registerGSSelectI18n } from '@/components/form/base/GSSelect/i18n';

// Register translations
registerGSSelectI18n(i18n);
```

### Translation Keys

- `label` - Default label
- `placeholder` - Default placeholder
- `noOptions` - No options available message
- `aria.open` - Open dropdown
- `aria.close` - Close dropdown
- `aria.selected` - Selected option announcement

## 🎯 Use Cases

### Form Select

```tsx
<GSSelect
  name="category"
  label="Category"
  required
  options={categories}
  error={errors.category?.message}
/>
```

### Filter Dropdown

```tsx
<GSSelect
  label="Filter by Status"
  size="sm"
  variant="filled"
  options={statusOptions}
  onChange={handleFilterChange}
/>
```

### Settings Panel

```tsx
<GSSelect
  label="Theme"
  helperText="Choose your preferred theme"
  options={[
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ]}
/>
```

## 🚨 Common Pitfalls

### ❌ Don't mix controlled and uncontrolled

```tsx
// BAD - mixing modes
<GSSelect value={value} defaultValue="initial" />

// GOOD - choose one
<GSSelect value={value} onChange={setValue} />
<GSSelect defaultValue="initial" />
```

### ❌ Don't forget onChange in controlled mode

```tsx
// BAD - value won't update
<GSSelect value={value} options={options} />

// GOOD
<GSSelect value={value} onChange={setValue} options={options} />
```

### ❌ Don't use plain strings as options

```tsx
// BAD
<GSSelect options={['Option 1', 'Option 2']} />

// GOOD
<GSSelect
  options={[
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ]}
/>
```

## 🔗 Related Components

- **GSInput** - Text input component
- **GSTextArea** - Multi-line text input
- **GSCheckbox** - Checkbox component
- **GSRadio** - Radio button component

## 📝 Notes

- Options array should be memoized to prevent unnecessary re-renders
- The dropdown automatically positions itself within viewport bounds
- Click outside and Escape key close the dropdown
- Disabled options are skipped in keyboard navigation

### Element Ordering (Left to Right)

**Inside Select (default):**
1. Start Decorator
2. Display Value / Chips
3. End Decorator
4. **Clear Button** (if `clearable` && `!clearButtonOutside`)
5. **Validation Icon** (if `showValidationIcon` && `!validationIconOutside`)
6. **Loading Spinner** (if `loading` && `loadingPosition="inside"`) OR **Chevron Icon**

**Outside Select (in wrapper):**
- **Clear Button** (if `clearButtonOutside`) - FIRST
- **Validation Icon** (if `validationIconOutside`) - SECOND
- **Loading Spinner** (if `loadingPosition="outside"`) - THIRD

**Priority Rules:**
- ✅ Clear button **ALWAYS** appears before validation icon (when both in same location)
- ✅ Validation icon **ALWAYS** appears before loading spinner (when both in same location)
- ✅ All icons hidden in disabled state (except decorators which are dimmed)
- ✅ No z-index conflicts or visual overlapping

**Visual Examples:**
```
Inside (all):  [Select: Value] [×] [✓] [⏳/⌄]
Outside (all): [Select: Value] [⌄] [×] [✓] [⏳]
Mixed:         [Select: Value] [×] [⌄] [✓] [⏳]
```

## 📝 Feature Notes

### Align Selected to Trigger (alignSelectedToTrigger) - BaseUI Style + Centered

When enabled, the dropdown opens with the selected option **perfectly aligned** with the trigger and **centered in the visible area**, creating maximum context by showing options both above and below the selection.

**How it works (Technical Deep-Dive):**

1. **Dropdown renders** in normal position (below trigger)
2. **Calculate option position using offsetTop** (scroll-independent):
   ```typescript
   optionOffsetInDropdown = selectedOptionEl.offsetTop
   // Walk up parent tree to accumulate nested offsets
   ```
3. **🎯 CENTER the selected option (NEW!):**
   ```typescript
   const centerOffset = dropdownVisibleHeight / 2 - optionHeight / 2
   const idealCenterScroll = optionOffsetInDropdown - centerOffset
   dropdownRef.scrollTop = Math.max(0, Math.min(idealCenterScroll, maxScroll))
   // This centers the option with context above and below
   ```
4. **Measure after scroll:**
   ```typescript
   optionRect = selectedOptionEl.getBoundingClientRect()
   dropdownRect = dropdownRef.current.getBoundingClientRect()
   optionVisibleOffset = optionRect.top - dropdownRect.top
   ```
5. **Calculate transform offset:**
   ```typescript
   offset = triggerRect.top - dropdownRect.top - optionVisibleOffset
   // This aligns option with trigger
   ```
6. **Viewport bounds protection:**
   - If `dropdown.top + offset < 8px` → clamp to top
   - If `dropdown.bottom + offset > viewport - 8px` → clamp to bottom
7. **Apply transform:**
   ```css
   transform: translateY(${offset}px)
   ```

**Why this works with max-height and scroll:**
- ✅ Uses `offsetTop` → scroll-independent position
- ✅ **Centers option** → provides context (options above + below)
- ✅ Scrolls intelligently → option at ~50% of visible area (when possible)
- ✅ Measures AFTER scroll → accurate position in visible area
- ✅ Uses CSS transform → aligns dropdown without breaking scroll
- ✅ Scroll stays centered → maximum context maintained

**Three-phase approach:**
1. **Center** - positions option in middle of visible area with context
2. **Scroll** - applies the centering scroll (internal scroll)
3. **Transform** - moves dropdown to align option with trigger (external positioning)

**Visual Effect:**
- Selected option aligns with trigger (BaseUI style)
- **Options visible above and below** (improved UX!)
- Smooth and intuitive interaction
- Maintains context throughout the list

```tsx
<GSSelect
  alignSelectedToTrigger  // BaseUI positioning algorithm
  options={longList}
  defaultValue="option-15"  // Opens with option-15 aligned to trigger
  maxHeight={300}
/>

// Try selecting different options and reopening - 
// each time it opens aligned to the new selection!
```

**Important:**
- Works with groups, search, multi-select
- Handles viewport bounds automatically
- Uses CSS transform (not absolute positioning)
- Smooth transition when alignment changes

### Auto-Position
Automatically detects available space and opens upward if there's insufficient space below the trigger.

### Multi-Select
Displays selected values as removable chips. Each chip has an X button for individual removal.

---

## 📚 **Documentação Adicional**

Documentação técnica detalhada disponível em:

- **[Autocomplete](./docs/AUTOCOMPLETE.md)** - Sistema de autocomplete com busca em tempo real, filtragem inteligente, async loading, debounce e custom filters
- **[Multi-Select](./docs/MULTI-SELECT.md)** - Seleção múltipla com chips, maxSelections, Select All/Clear All, validação e custom rendering
- **[Search & Filter](./docs/SEARCH-FILTER.md)** - Sistema avançado de busca com 5 tipos de filtros (includes, starts with, exact, fuzzy, multi-field), highlight matches e performance optimization
- **[Option Groups](./docs/GROUPS.md)** - Sistema de agrupamento com sticky headers, grupos dinâmicos (groupBy), busca em grupos e boas práticas
- **[Testing Guide](./docs/TESTING.md)** - Guia completo para executar e criar testes (115+ testes: unit, a11y, i18n)

---

## 🎨 **Storybook**

Para ver todos os exemplos interativos e testar o componente:

```bash
npm run storybook
```

**Aceder**: [http://localhost:6006/?path=/story/form-components-gsselect](http://localhost:6006/?path=/story/form-components-gsselect)

**Stories Disponíveis** (30+):
- ✅ Basic (5 stories) - Default, With Options, Placeholder, Default Value, With Label
- ✅ Variants (3 stories) - Outlined, Filled, Plain
- ✅ Sizes (3 stories) - Small, Medium, Large
- ✅ Multi-Select (5 stories) - Basic, Max Selected, With Chips, Select All, Custom Render
- ✅ Search/Filter (5 stories) - With Search, Autocomplete, Async Options, Custom Filter, Highlight Matches
- ✅ Groups (3 stories) - Grouped Options, Nested Groups, Group with Headers
- ✅ States (5 stories) - Disabled, ReadOnly, Error, Loading, Empty State
- ✅ Edge Cases (6 stories) - Many Options (100), Long Labels, Custom Option Render, Controlled, Uncontrolled, Form Integration

---

## 🏆 **Status Platinum**

Este componente atingiu o **Platinum Tier** com:

- ✅ **Estrutura** - 100% folderizada e organizada
- ✅ **CSS Modules** - Estilos isolados sem conflitos
- ✅ **i18n** - EN/PT completo (traduções, fallbacks)
- ✅ **types.ts** - TypeScript types separados e completos
- ✅ **Testes** - 3 suítes completas (115+ testes):
  - `GSSelect.test.tsx` (~60 unit tests)
  - `GSSelect.a11y.test.tsx` (~40 a11y tests)
  - `GSSelect.i18n.test.tsx` (~15 i18n tests)
- ✅ **Storybook** - 30+ stories interativas
- ✅ **docs/** - 5 documentos técnicos detalhados
- ✅ **component.json** - Metadata de dependências
- ✅ **A11y** - WCAG AA compliant (role="combobox", keyboard navigation)
- ✅ **Cobertura** - 90%+ de testes

**Features Avançadas**:
- 🔍 Autocomplete com busca em tempo real
- ✅ Multi-select com chips removíveis
- 🔎 Search & filter com 5 tipos de filtros
- 📁 Option groups com sticky headers
- 🌐 Async loading de opções (API)
- ⌨️ Keyboard navigation completa (Arrow keys, Home, End, Enter, Escape, Typeahead)
- 🎨 Custom rendering (options e values)
- 📱 Responsive design
- ♿ Acessibilidade completa (115+ testes)

---

## 🚀 Future Enhancements

- 🔜 Virtual scrolling for lists with 1000+ items
- 🔜 Infinite scroll pagination
- 🔜 Creatable options (add new on-the-fly)
- 🔜 Drag to reorder in multi-select
- 🔜 Option templates/presets

---

*Last updated: 2025-10-28*

