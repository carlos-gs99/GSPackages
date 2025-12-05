# 📝 Authoring Rules - Regras de Criação de Componentes

**Status:** Regras OBRIGATÓRIAS para criar/modificar componentes  
**Última Atualização:** 2025-12-05  
**Compliance:** 100% obrigatório para aprovação em PR

---

## 🎯 Visão Geral

Este documento estabelece as **regras obrigatórias** para criar ou modificar componentes no ecossistema GSPackages. Seguir estas regras garante:

- ✅ **Consistência** entre todos os componentes
- ✅ **Qualidade** mínima garantida
- ✅ **Publicabilidade** como npm packages
- ✅ **Manutenibilidade** a longo prazo

---

## 🚨 Regra #1: Zero Dependências Externas de UI

### ❌ PROIBIDO ABSOLUTAMENTE

```json
// ❌ NUNCA adicionar ao package.json:
{
  "dependencies": {
    "@mui/base": "*",
    "@mui/material": "*",
    "bootstrap": "*",
    "@chakra-ui/react": "*",
    "ant-design": "*",
    "semantic-ui-react": "*",
    "react-bootstrap": "*"
  }
}
```

### ✅ PERMITIDO

```json
// ✅ Dependências GS internas
{
  "peerDependencies": {
    "@carlos-gs99/hooks": "^1.0.0",
    "@carlos-gs99/utils": "^1.0.0",
    "@carlos-gs99/primitives": "^1.0.0",
    "@carlos-gs99/theme": "^1.0.0"
  }
}

// ✅ Dependências headless (exceções documentadas)
{
  "peerDependencies": {
    "@tanstack/react-table": "^8.0.0"  // Headless utility
  }
}
```

### 🔍 Razão

- **Package-ready:** Componentes devem ser publicáveis independentemente
- **Zero acoplamento:** Sem dependência de contextos/providers externos
- **Controle total:** 100% controle sobre aparência e comportamento

### 📄 Exceções

Ver `docs/packaging/acceptable-exceptions.md` para lista de exceções permitidas.

---

## 📦 Regra #2: Estrutura Packlet Obrigatória

### Estrutura Mínima

```
gs-component/
├── src/
│   ├── GSComponent.tsx       # ✅ OBRIGATÓRIO
│   ├── types.ts              # ✅ OBRIGATÓRIO
│   ├── styles.module.css     # ✅ OBRIGATÓRIO
│   ├── i18n/                 # ✅ OBRIGATÓRIO
│   │   ├── en.json           # ✅ OBRIGATÓRIO
│   │   └── pt.json           # ✅ OBRIGATÓRIO
│   ├── i18n.ts               # ✅ OBRIGATÓRIO
│   ├── index.ts              # ✅ OBRIGATÓRIO
│   ├── __tests__/            # ✅ OBRIGATÓRIO
│   │   ├── Component.test.tsx      # ✅ OBRIGATÓRIO
│   │   ├── Component.a11y.test.tsx # ✅ OBRIGATÓRIO
│   │   └── Component.i18n.test.tsx # ✅ OBRIGATÓRIO
│   └── css-modules.d.ts      # ✅ OBRIGATÓRIO
├── package.json              # ✅ OBRIGATÓRIO
├── tsup.config.ts            # ✅ OBRIGATÓRIO
└── README.md                 # ✅ OBRIGATÓRIO
```

### Estrutura Estendida (Opcional)

```
gs-component/
├── src/
│   ├── hooks/                # ⚪ OPCIONAL - Hooks específicos
│   │   └── useComponentState.ts
│   ├── partials/             # ⚪ OPCIONAL - Sub-componentes
│   │   └── ComponentPart.tsx
│   ├── utils/                # ⚪ OPCIONAL - Utils específicos
│   │   └── componentHelpers.ts
│   └── docs/                 # ⚪ OPCIONAL - Docs adicionais
│       ├── TESTING.md
│       └── PERFORMANCE.md
```

### ❌ Proibido

```
gs-component/
├── TESTING.md                # ❌ Markdown solto (deve estar em docs/)
├── NOTES.md                  # ❌ Markdown solto (deve estar em docs/)
├── styles.css                # ❌ CSS global (deve ser .module.css)
└── src/
    ├── en.json               # ❌ i18n fora de pasta (deve estar em i18n/)
    └── Component.tsx         # ❌ Sem prefixo GS
```

---

## 🎨 Regra #3: CSS Modules + Tokens Obrigatórios

### ✅ Estrutura Correta

```css
/* styles.module.css */

/* Componente base */
.component {
  /* Usar SEMPRE tokens CSS */
  background: var(--gs-color-primary);
  padding: var(--gs-spacing-md);
  border-radius: var(--gs-radius-md);
  font-size: var(--gs-font-size-md);
  
  /* Transições padrão */
  transition: all var(--gs-duration-normal) var(--gs-easing-standard);
}

/* Variantes */
.component--outlined {
  background: transparent;
  border: 1px solid var(--gs-color-primary);
  color: var(--gs-color-primary);
}

.component--soft {
  background: var(--gs-color-primary-soft);
  color: var(--gs-color-primary);
}

/* Estados */
.component--disabled {
  opacity: var(--gs-opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

.component--loading {
  opacity: var(--gs-opacity-loading);
}

/* Sizes */
.component--sm {
  padding: var(--gs-spacing-sm);
  font-size: var(--gs-font-size-sm);
}

.component--md {
  padding: var(--gs-spacing-md);
  font-size: var(--gs-font-size-md);
}

.component--lg {
  padding: var(--gs-spacing-lg);
  font-size: var(--gs-font-size-lg);
}
```

### ❌ Proibido

```css
/* ❌ MAU - Valores hardcoded */
.component {
  background: #007bff;      /* ❌ Usar var(--gs-color-primary) */
  padding: 16px;            /* ❌ Usar var(--gs-spacing-md) */
  font-size: 14px;          /* ❌ Usar var(--gs-font-size-md) */
}

/* ❌ MAU - !important */
.component {
  color: red !important;    /* ❌ NUNCA usar !important */
}

/* ❌ MAU - CSS global */
.button {                   /* ❌ Deve ser .component (CSS Module) */
  background: blue;
}
```

### 📋 Checklist CSS

- [ ] ✅ Apenas CSS Modules (`.module.css`)
- [ ] ✅ Usa tokens CSS para cores
- [ ] ✅ Usa tokens CSS para spacing
- [ ] ✅ Usa tokens CSS para font-size
- [ ] ✅ Usa tokens CSS para border-radius
- [ ] ✅ Zero valores hardcoded
- [ ] ✅ Zero `!important`
- [ ] ✅ Nomes de classe descritivos (BEM-like)

---

## 🌐 Regra #4: i18n Obrigatório (EN + PT)

### Estrutura Mínima

```
i18n/
├── en.json   # ✅ OBRIGATÓRIO - Inglês
└── pt.json   # ✅ OBRIGATÓRIO - Português
```

### Conteúdo en.json

```json
{
  "component": {
    "label": "Label text",
    "placeholder": "Enter value",
    "error": "Invalid value",
    "loading": "Loading...",
    "empty": "No items found"
  },
  "actions": {
    "submit": "Submit",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  },
  "validation": {
    "required": "This field is required",
    "invalid": "Invalid format"
  },
  "accessibility": {
    "closeButton": "Close",
    "moreOptions": "More options",
    "loading": "Content is loading"
  }
}
```

### Conteúdo pt.json

```json
{
  "component": {
    "label": "Texto do rótulo",
    "placeholder": "Insira valor",
    "error": "Valor inválido",
    "loading": "A carregar...",
    "empty": "Nenhum item encontrado"
  },
  "actions": {
    "submit": "Submeter",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar"
  },
  "validation": {
    "required": "Este campo é obrigatório",
    "invalid": "Formato inválido"
  },
  "accessibility": {
    "closeButton": "Fechar",
    "moreOptions": "Mais opções",
    "loading": "O conteúdo está a carregar"
  }
}
```

### Helper i18n.ts

```typescript
// i18n.ts
import { registerTranslations } from '@carlos-gs99/hooks';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

// Registar automaticamente ao importar componente
registerTranslations('gs-component', { en, pt });

export { en, pt };
```

### Uso no Componente

```tsx
import { useTranslation } from '@carlos-gs99/hooks';
import './i18n';  // ✅ Import para auto-registo

export const GSComponent = (props: GSComponentProps) => {
  const { t } = useTranslation('gs-component');
  
  return (
    <div>
      <label>{t('component.label')}</label>
      <button>{t('actions.submit')}</button>
      <span aria-label={t('accessibility.closeButton')}>×</span>
    </div>
  );
};
```

### ❌ Proibido

```tsx
// ❌ MAU - Texto hardcoded
<button>Submit</button>
<button>Cancel</button>

// ❌ MAU - Tradução manual inline
const label = lang === 'en' ? 'Submit' : 'Submeter';

// ❌ MAU - Apenas um idioma
// i18n/en.json existe mas pt.json não
```

---

## ♿ Regra #5: Acessibilidade WCAG AA

### Checklist Obrigatório

#### 1. ARIA Attributes

```tsx
<element
  // ✅ Role correto
  role="button"
  
  // ✅ Labels
  aria-label={t('accessibility.label')}
  aria-labelledby="label-id"
  aria-describedby="description-id"
  
  // ✅ Estados
  aria-disabled={disabled}
  aria-busy={loading}
  aria-expanded={isOpen}
  aria-selected={isSelected}
  aria-checked={isChecked}
  aria-hidden={hidden}
  
  // ✅ Live regions
  aria-live="polite"
  aria-atomic="true"
/>
```

#### 2. Keyboard Navigation

```tsx
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':           // ✅ Space key
      event.preventDefault();
      handleActivate();
      break;
      
    case 'Escape':      // ✅ Escape key
      event.preventDefault();
      handleClose();
      break;
      
    case 'ArrowDown':   // ✅ Arrow navigation
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowRight':
      handleArrowKey(event.key);
      break;
      
    case 'Home':        // ✅ Home/End keys
    case 'End':
      handleHomeEnd(event.key);
      break;
  }
};

<element
  tabIndex={disabled ? -1 : 0}  // ✅ Tab index
  onKeyDown={handleKeyDown}     // ✅ Keyboard handler
/>
```

#### 3. Focus Management

```tsx
const elementRef = useRef<HTMLElement>(null);

// ✅ Auto-focus quando necessário
useEffect(() => {
  if (autoFocus) {
    elementRef.current?.focus();
  }
}, [autoFocus]);

// ✅ Restore focus quando fechar modal/dropdown
useEffect(() => {
  if (!isOpen && previousFocusRef.current) {
    previousFocusRef.current.focus();
  }
}, [isOpen]);

// ✅ Focus trap em modais
<FocusTrap active={isOpen}>
  <div ref={elementRef} tabIndex={-1}>
    {children}
  </div>
</FocusTrap>
```

#### 4. Screen Reader Support

```tsx
// ✅ Conteúdo apenas para screen readers
<span className={styles.visuallyHidden}>
  {t('accessibility.srOnlyText')}
</span>

// ✅ Live regions para anúncios
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
>
  {statusMessage}
</div>

// ✅ CSS para visuallyHidden
.visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

#### 5. Color Contrast

```css
/* ✅ Contraste mínimo 4.5:1 para texto */
.component {
  color: var(--gs-color-text);        /* ✅ Contraste validado */
  background: var(--gs-color-bg);
}

/* ✅ Contraste mínimo 3:1 para elementos interativos */
.button {
  border: 2px solid var(--gs-color-primary);
}

/* ❌ MAU - Contraste insuficiente */
.badComponent {
  color: #ccc;          /* ❌ Contraste < 4.5:1 */
  background: #ddd;
}
```

### 📋 Checklist A11y Completo

- [ ] ✅ ARIA labels corretos
- [ ] ✅ ARIA estados (disabled, busy, expanded, etc)
- [ ] ✅ Keyboard navigation (Enter, Space, Arrow, Escape)
- [ ] ✅ TabIndex apropriado
- [ ] ✅ Focus management
- [ ] ✅ Focus visual indicators
- [ ] ✅ Screen reader text onde necessário
- [ ] ✅ Live regions para anúncios dinâmicos
- [ ] ✅ Color contrast WCAG AA (4.5:1 texto, 3:1 UI)
- [ ] ✅ Testes axe passam (sem violations)

---

## 🐛 Regra #6: Debug Mode Integrado

### Implementação Obrigatória

```tsx
import { useDebug } from '@carlos-gs99/hooks';

export const GSComponent = (props: GSComponentProps) => {
  const { debug: debugProp, ...rest } = props;
  
  // ✅ useDebug integrado
  const { debug } = useDebug({
    component: 'GSComponent',
    enabled: debugProp,
  });
  
  // ✅ Logs estruturados
  debug.log('Rendering', { 
    variant: props.variant, 
    color: props.color,
    disabled: props.disabled 
  });
  
  // ✅ Warnings
  if (props.deprecatedProp) {
    debug.warn('Deprecated prop used', { 
      prop: 'deprecatedProp',
      useInstead: 'newProp' 
    });
  }
  
  // ✅ Errors
  if (invalidConfig) {
    debug.error('Invalid configuration', { error: details });
  }
  
  return (
    <div
      // ✅ Data attributes para debug visual
      data-gs-debug={debug.enabled ? 'GSComponent' : undefined}
      data-gs-state={debug.enabled ? JSON.stringify({ 
        variant, 
        disabled, 
        loading 
      }) : undefined}
    >
      {children}
    </div>
  );
};
```

### Props Type

```typescript
export interface GSComponentProps {
  /**
   * Ativa debug mode
   * @default false
   */
  debug?: boolean;
}
```

---

## 🧪 Regra #7: Testes Obrigatórios

### Estrutura Mínima

```
__tests__/
├── Component.test.tsx         # ✅ OBRIGATÓRIO - Unit tests
├── Component.a11y.test.tsx    # ✅ OBRIGATÓRIO - A11y tests
└── Component.i18n.test.tsx    # ✅ OBRIGATÓRIO - i18n tests
```

### 1. Component.test.tsx (Unit Tests)

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { GSComponent } from '../GSComponent';

describe('GSComponent', () => {
  // ✅ Rendering básico
  it('should render with default props', () => {
    render(<GSComponent>Content</GSComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  
  // ✅ Todas as variantes
  it('should render all variants', () => {
    const variants = ['solid', 'outlined', 'soft', 'plain'];
    variants.forEach(variant => {
      const { rerender } = render(
        <GSComponent variant={variant}>Test</GSComponent>
      );
    });
  });
  
  // ✅ Props booleanas
  it('should handle disabled state', () => {
    render(<GSComponent disabled>Disabled</GSComponent>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  // ✅ Event handlers
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<GSComponent onClick={handleClick}>Click me</GSComponent>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  // ✅ Edge cases
  it('should handle empty children', () => {
    render(<GSComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 2. Component.a11y.test.tsx (A11y Tests)

```tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { GSComponent } from '../GSComponent';

expect.extend(toHaveNoViolations);

describe('GSComponent - Accessibility', () => {
  // ✅ Axe tests
  it('should have no axe violations', async () => {
    const { container } = render(<GSComponent>Content</GSComponent>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // ✅ ARIA attributes
  it('should have correct ARIA attributes', () => {
    render(<GSComponent aria-label="Test label">Content</GSComponent>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Test label');
  });
  
  // ✅ Keyboard navigation
  it('should support keyboard navigation', async () => {
    const handleClick = vi.fn();
    render(<GSComponent onClick={handleClick}>Click</GSComponent>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await userEvent.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
  
  // ✅ Focus management
  it('should manage focus correctly', () => {
    const { rerender } = render(<GSComponent autoFocus>Content</GSComponent>);
    expect(screen.getByRole('button')).toHaveFocus();
  });
});
```

### 3. Component.i18n.test.tsx (i18n Tests)

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { i18n } from '@carlos-gs99/hooks';
import { GSComponent } from '../GSComponent';

describe('GSComponent - i18n', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });
  
  // ✅ Inglês
  it('should render in English', () => {
    i18n.changeLanguage('en');
    render(<GSComponent />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
  
  // ✅ Português
  it('should render in Portuguese', () => {
    i18n.changeLanguage('pt');
    render(<GSComponent />);
    expect(screen.getByText('Submeter')).toBeInTheDocument();
  });
  
  // ✅ Language switching
  it('should change language dynamically', () => {
    const { rerender } = render(<GSComponent />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
    
    i18n.changeLanguage('pt');
    rerender(<GSComponent />);
    expect(screen.getByText('Submeter')).toBeInTheDocument();
  });
  
  // ✅ Fallback
  it('should fall back to English for unsupported language', () => {
    i18n.changeLanguage('fr');  // Não suportado
    render(<GSComponent />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
```

### Metas de Coverage

- **Mínimo:** 80% coverage por componente
- **Ideal:** 90%+ coverage
- **Branches:** 75%+ coverage
- **Functions:** 85%+ coverage

---

## 📚 Regra #8: README Completo

### Template Obrigatório

```markdown
# GSComponent

> Breve descrição do componente (1-2 linhas).

## 📦 Instalação

\`\`\`bash
npm install @carlos-gs99/gs-component
\`\`\`

## 🚀 Uso Básico

\`\`\`tsx
import { GSComponent } from '@carlos-gs99/gs-component';

<GSComponent variant="solid" color="primary">
  Content here
</GSComponent>
\`\`\`

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outlined' \| 'soft' \| 'plain'` | `'solid'` | Variante visual |
| `color` | `GSColor` | `'primary'` | Cor semântica |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do componente |
| `disabled` | `boolean` | `false` | Desabilita interação |

## 🎨 Variantes

### Solid (default)

\`\`\`tsx
<GSComponent variant="solid" color="primary">Solid</GSComponent>
\`\`\`

### Outlined

\`\`\`tsx
<GSComponent variant="outlined" color="primary">Outlined</GSComponent>
\`\`\`

## 🎯 Exemplos

### Com Estado de Loading

\`\`\`tsx
<GSComponent loading>Loading...</GSComponent>
\`\`\`

### Disabled

\`\`\`tsx
<GSComponent disabled>Can't interact</GSComponent>
\`\`\`

## ♿ Acessibilidade

- ✅ ARIA labels completos
- ✅ Keyboard navigation (Enter, Space, Arrow keys)
- ✅ Focus management
- ✅ Screen reader support
- ✅ WCAG AA compliant

## 🌐 Internacionalização

Suporta EN e PT automaticamente via `useTranslation('gs-component')`.

## 🐛 Debug Mode

\`\`\`tsx
<GSComponent debug>Debug Component</GSComponent>
\`\`\`

Logs estruturados no console para debugging.

## 🧪 Testes

```bash
npm test -- gs-component
```

- ✅ Unit tests (80%+ coverage)
- ✅ Accessibility tests (vitest-axe)
- ✅ i18n tests (EN + PT)

## 📦 Dependências

### Peer Dependencies

- `react` ^18.0.0
- `react-dom` ^18.0.0
- `@carlos-gs99/hooks` ^1.0.0
- `@carlos-gs99/utils` ^1.0.0

## 📄 License

MIT © [Carlos Braga](mailto:carlos.braga@grupoglobalsoft.pt)
```

---

## ✅ Checklist Final de Aprovação

Antes de abrir PR ou considerar componente completo:

### Estrutura
- [ ] ✅ Estrutura packlet completa
- [ ] ✅ Todos os ficheiros obrigatórios presentes
- [ ] ✅ Sem ficheiros proibidos (markdown solto, CSS global)

### Dependências
- [ ] ✅ Zero deps de UI externos (Base UI, MUI, Bootstrap)
- [ ] ✅ Apenas deps GS internas (`@carlos-gs99/*`)
- [ ] ✅ Deps corretamente em `peerDependencies`
- [ ] ✅ `tsup.config.ts` com `external` corretos

### Styling
- [ ] ✅ Apenas CSS Modules (`.module.css`)
- [ ] ✅ Usa tokens CSS (sem hardcoded values)
- [ ] ✅ Zero `!important`
- [ ] ✅ Responsive (mobile, tablet, desktop)

### i18n
- [ ] ✅ `i18n/en.json` completo
- [ ] ✅ `i18n/pt.json` completo (tradução real, não copy-paste)
- [ ] ✅ `i18n.ts` helper presente
- [ ] ✅ Zero texto hardcoded no componente

### Acessibilidade
- [ ] ✅ ARIA labels/roles corretos
- [ ] ✅ Keyboard navigation (Enter, Space, Arrow, Escape)
- [ ] ✅ Focus management
- [ ] ✅ Screen reader support
- [ ] ✅ Color contrast WCAG AA (4.5:1)
- [ ] ✅ Testes axe passam (zero violations)

### Debug
- [ ] ✅ `useDebug` integrado
- [ ] ✅ `data-gs-debug` attributes
- [ ] ✅ Logs estruturados
- [ ] ✅ Props `debug?: boolean` presente

### TypeScript
- [ ] ✅ `types.ts` com TSDoc completo
- [ ] ✅ Types exportados em `index.ts`
- [ ] ✅ Props estendem `ComponentPropsWithRef<element>`
- [ ] ✅ `forwardRef` implementado corretamente
- [ ] ✅ `displayName` definido

### Testes
- [ ] ✅ `Component.test.tsx` (unit tests, 15+ casos)
- [ ] ✅ `Component.a11y.test.tsx` (axe + keyboard + focus)
- [ ] ✅ `Component.i18n.test.tsx` (EN + PT + switching)
- [ ] ✅ Coverage mínimo 80%
- [ ] ✅ Todos os testes passam

### Build & Lint
- [ ] ✅ `npm run build` passa (0 erros TypeScript)
- [ ] ✅ `npm run lint` passa (0 warnings)
- [ ] ✅ `npm test` passa (todos os testes)
- [ ] ✅ `./simulate-ci.ps1` passa (CI/CD local)

### Documentação
- [ ] ✅ `README.md` completo (seguir template)
- [ ] ✅ Props documentadas com exemplos
- [ ] ✅ A11y section presente
- [ ] ✅ i18n section presente
- [ ] ✅ Exemplos de uso (mínimo 3)

---

**Seguir estas regras garante qualidade consistente e publicabilidade!** 📝✨

