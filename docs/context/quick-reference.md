# 🚀 Quick Reference - Referência Rápida

**Status:** Cheat sheet dos 42 packages GSPackages  
**Última Atualização:** 2025-12-05  
**Uso:** Consulta rápida durante desenvolvimento

---

## 📦 Base Packages (4)

| Package | Exports Principais | Peer Deps | Status Testes |
|---------|-------------------|-----------|---------------|
| **@carlos-gs99/utils** | debugUtils, a11yUtils, dateUtils, stringUtils, etc (20+) | - | ⏳ Pendente |
| **@carlos-gs99/hooks** | useTranslation, useDebug, useDropdown, useDebounce (15+) | react, react-i18next | ⏳ Pendente |
| **@carlos-gs99/primitives** | ButtonBase, Overlay, FocusTrap, Popper | react, react-dom | ⏳ Pendente |
| **@carlos-gs99/theme** | ThemeProvider, tokens CSS | react | ⏳ Pendente |

---

## 🎨 Tier 1 - Core Components (20)

### Icons & Badges

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-icon** | `name`, `size`, `color`, `spin` | - | ✅ 100% |
| **gs-badge** | `badgeContent`, `color`, `variant`, `max` | - | ✅ 100% |

### Buttons & Chips

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-button** | `variant`, `color`, `size`, `loading`, `disabled` | primitives (ButtonBase) | ✅ 100% |
| **gs-chip** | `label`, `color`, `variant`, `deletable`, `onDelete` | primitives (ButtonBase) | ✅ 100% |

### Loading States

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-spinner** | `color`, `size`, `thickness`, `label` | utils, hooks | 🔄 Criados |
| **gs-skeleton** | `variant`, `width`, `height`, `animation` | - | ⏳ Pendente |
| **gs-loading** | `loading`, `children`, `spinner`, `overlay` | gs-spinner | ⏳ Pendente |

### Typography & Layout

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-label** | `htmlFor`, `required`, `disabled`, `error` | - | ⏳ Pendente |
| **gs-divider** | `orientation`, `variant`, `textAlign` | - | ⏳ Pendente |
| **gs-avatar** | `src`, `alt`, `size`, `variant`, `fallback` | gs-icon | ⏳ Pendente |

### Progress & Feedback

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-progress** | `value`, `variant`, `color`, `size`, `showLabel` | - | ⏳ Pendente |
| **gs-alert** | `severity`, `variant`, `closable`, `onClose` | gs-icon | ⏳ Pendente |
| **gs-toast** | `message`, `color`, `duration`, `showProgressBar` | gs-icon, utils | ⏳ Pendente |

### Containers

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-card** | `variant`, `elevation`, `collapsible`, `loading` | gs-icon, gs-loading | ⏳ Pendente |
| **gs-list** | Compound: `List`, `List.Item`, `List.Divider` | - | ⏳ Pendente |
| **gs-tooltip** | `title`, `placement`, `arrow`, `trigger` | primitives (Popper) | ⏳ Pendente |

### Overlays

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-modal** | `open`, `onClose`, `mode`, `animation` | gs-icon, gs-button, primitives | ⏳ Pendente |

### Forms - Basic

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-input** | `type`, `value`, `onChange`, `error`, `debounce` | gs-icon, hooks | ⏳ Pendente |
| **gs-checkbox** | `checked`, `onChange`, `indeterminate`, `disabled` | utils, hooks | ⏳ Pendente |

### Navigation

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-tabs** | `value`, `onChange`, `orientation`, `variant` | - | ⏳ Pendente |

### Data Display

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-select** | `value`, `onChange`, `options`, `searchable`, `multi` | hooks (useDropdown), gs-list | ⏳ Pendente |

---

## 🔥 Tier 2 - Formulários Avançados (5)

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-radio** | Compound: `Radio`, `RadioGroup` | utils, hooks (useRipple) | ⏳ Pendente |
| **gs-switch** | `checked`, `onChange`, `loading`, `disabled` | gs-spinner | ⏳ Pendente |
| **gs-textarea** | `value`, `onChange`, `autoResize`, `maxLength` | gs-icon, hooks | ⏳ Pendente |
| **gs-table** | `data`, `columns`, `pagination`, `sortable`, `filters` | @tanstack/react-table, gs-button | ⏳ Pendente |
| **gs-autocomplete** | `options`, `onSearch`, `value`, `onChange` | gs-select | ⏳ Pendente |

---

## 🎯 Tier 3 - Navegação & Layout (6)

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-drawer** | `open`, `onClose`, `placement`, `backdrop` | primitives (Overlay) | ⏳ Pendente |
| **gs-accordion** | Compound: `Accordion`, `Accordion.Item` | gs-icon | ⏳ Pendente |
| **gs-breadcrumbs** | Compound: `Breadcrumbs`, `Breadcrumbs.Item` | gs-icon | ⏳ Pendente |
| **gs-stepper** | `steps`, `activeStep`, `onStepChange` | gs-icon | ⏳ Pendente |
| **gs-pagination** | `page`, `totalPages`, `onChange` | gs-button | ⏳ Pendente |
| **gs-dropdown** | `trigger`, `items`, `placement` | hooks (useDropdown), gs-list | ⏳ Pendente |

---

## ⚡ Tier 4 - Especializados (7)

| Componente | Props Principais | Deps Principais | Testes |
|-----------|------------------|-----------------|--------|
| **gs-rating** | `value`, `onChange`, `max`, `precision`, `icon` | gs-icon | ⏳ Pendente |
| **gs-slider** | `value`, `onChange`, `min`, `max`, `step`, `marks` | - | ⏳ Pendente |
| **gs-tree** | `data`, `onSelect`, `expandable`, `selectable` | gs-icon | ⏳ Pendente |
| **gs-timepicker** | Wrapper de `gs-input` com `type="time"` | gs-input | ⏳ Pendente |
| **gs-colorpicker** | Wrapper de `gs-input` com `type="color"` | gs-input | ⏳ Pendente |
| **gs-datepicker** | Wrapper de `gs-input` com `type="date"` | gs-input | ⏳ Pendente |

---

## 🎨 Props Comuns (Todos os Componentes)

### Standard Props

```typescript
// Todos os componentes aceitam:
className?: string;           // Classes CSS customizadas
style?: React.CSSProperties;  // Estilos inline (desencorajado)
id?: string;                  // ID do elemento
debug?: boolean;              // Ativa debug mode
```

### Variant Props

```typescript
// Maioria dos componentes visuais:
variant?: 'default' | 'outlined' | 'soft' | 'plain';
color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
size?: 'sm' | 'md' | 'lg';
```

### State Props

```typescript
// Componentes interativos:
disabled?: boolean;
loading?: boolean;
error?: boolean;
readOnly?: boolean;
```

---

## 📚 Imports Comuns

### Componentes

```typescript
// Import de componente
import { GSButton } from '@carlos-gs99/gs-button';
import { GSIcon } from '@carlos-gs99/gs-icon';

// Import de types
import type { GSButtonProps } from '@carlos-gs99/gs-button';
```

### Hooks

```typescript
// Hooks core
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/hooks';
import { useDropdown } from '@carlos-gs99/hooks';
import { useDebounce } from '@carlos-gs99/hooks';
```

### Utils

```typescript
// Utils
import { debugLog } from '@carlos-gs99/utils';
import { formatA11yLabel } from '@carlos-gs99/utils';
import { convertApiDate } from '@carlos-gs99/utils';
```

### Theme

```typescript
// Theme
import { ThemeProvider } from '@carlos-gs99/theme';
import '@carlos-gs99/theme/tokens.css';
```

---

## 🔧 Comandos Rápidos

### Build

```bash
# Build todos os packages
npm run build

# Build package específico
npm run build --workspace @carlos-gs99/gs-button

# Watch mode (desenvolvimento)
npm run dev
```

### Testes

```bash
# Todos os testes
npm test

# Componente específico
npm test -- gs-button

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# E2E (Playwright)
npm run test:e2e
```

### Linting

```bash
# Lint todos
npm run lint

# TypeCheck
npm run typecheck

# Fix auto
npm run lint:fix
```

### CI/CD Local

```bash
# Simular GitHub Actions localmente
cd GSPackages
./simulate-ci.ps1
```

---

## 🎯 Padrões de Uso Comuns

### 1. Componente Básico

```tsx
import { GSButton } from '@carlos-gs99/gs-button';

<GSButton 
  variant="solid" 
  color="primary" 
  size="md"
  onClick={() => console.log('Clicked!')}
>
  Click me
</GSButton>
```

### 2. Com Estado de Loading

```tsx
import { GSButton } from '@carlos-gs99/gs-button';

<GSButton 
  loading={isLoading}
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</GSButton>
```

### 3. Compound Components

```tsx
import { GSList } from '@carlos-gs99/gs-list';

<GSList>
  <GSList.Item>Item 1</GSList.Item>
  <GSList.Divider />
  <GSList.Item active>Item 2</GSList.Item>
</GSList>
```

### 4. Com i18n

```tsx
import { GSButton } from '@carlos-gs99/gs-button';
import { useTranslation } from '@carlos-gs99/hooks';

const MyComponent = () => {
  const { t } = useTranslation('my-namespace');
  
  return (
    <GSButton>
      {t('button.submit')}
    </GSButton>
  );
};
```

### 5. Com Debug Mode

```tsx
import { GSButton } from '@carlos-gs99/gs-button';

<GSButton debug>
  Debug Button
</GSButton>
// Console mostra: [GSButton] Rendering with props: {...}
```

---

## 🚨 Avisos Comuns

### ❌ NÃO Fazer

```tsx
// ❌ Estilos inline demais
<GSButton style={{ backgroundColor: 'red', color: 'white' }}>

// ❌ Importar Base UI / MUI
import { Button } from '@mui/base';

// ❌ !important no CSS
.button { color: red !important; }

// ❌ Hardcoded text (sem i18n)
<GSButton>Click me</GSButton>
```

### ✅ Fazer

```tsx
// ✅ CSS Modules
<GSButton className={styles.customButton}>

// ✅ Usar primitivos GS
import { ButtonBase } from '@carlos-gs99/primitives';

// ✅ Tokens CSS
.button { color: var(--gs-color-primary); }

// ✅ i18n
<GSButton>{t('button.label')}</GSButton>
```

---

## 📊 Status Geral (2025-12-05)

| Métrica | Valor | Status |
|---------|-------|--------|
| **Total Packages** | 42 | ✅ 100% |
| **CI/CD Builds** | 126 | ✅ 100% |
| **Com Testes** | 5 | 🟡 12% |
| **Sem Testes** | 37 | ⏳ 88% |
| **Docs Completos** | 42 | ✅ 100% |
| **i18n (EN+PT)** | 42 | ✅ 100% |

---

## 🔗 Links Rápidos

- **Contexto Completo:** `docs/context/essential-context.md`
- **Checklist:** `docs/progress/PACKAGES-CHECKLIST.md`
- **Plano de Testes:** `docs/progress/TEST-PLAN.md`
- **Workflow:** `docs/indices/analyze-then-act-workflow.md`
- **Regras IA:** `docs/indices/ai-memory-rules.md`

---

**Use esta referência para lookup rápido durante desenvolvimento!** 🚀

