# 📄 Component Template - Template de Componente

**Status:** Template copy-paste para criar novos componentes  
**Última Atualização:** 2025-12-05  
**Uso:** Copiar e adaptar para cada novo componente

---

## 🚀 Quick Start

```bash
# 1. Criar pasta do componente
cd GSPackages
mkdir gs-newcomponent
cd gs-newcomponent

# 2. Criar estrutura
mkdir -p src/i18n src/__tests__

# 3. Copiar templates abaixo e adaptar
# 4. Build e validar
npm run build --workspace @carlos-gs99/gs-newcomponent
npm test -- gs-newcomponent
```

---

## 📁 Estrutura Completa

```
gs-newcomponent/
├── src/
│   ├── GSNewComponent.tsx
│   ├── types.ts
│   ├── styles.module.css
│   ├── i18n/
│   │   ├── en.json
│   │   └── pt.json
│   ├── i18n.ts
│   ├── index.ts
│   ├── css-modules.d.ts
│   └── __tests__/
│       ├── GSNewComponent.test.tsx
│       ├── GSNewComponent.a11y.test.tsx
│       └── GSNewComponent.i18n.test.tsx
├── package.json
├── tsup.config.ts
└── README.md
```

---

## 📄 Templates

### 1. `package.json`

```json
{
  "name": "@carlos-gs99/gs-newcomponent",
  "version": "1.0.0",
  "description": "GSNewComponent - Brief description",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@carlos-gs99/hooks": "^1.0.0",
    "@carlos-gs99/utils": "^1.0.0",
    "@carlos-gs99/theme": "^1.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@carlos-gs99/hooks": "^1.0.0",
    "@carlos-gs99/utils": "^1.0.0",
    "@carlos-gs99/theme": "^1.0.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0",
    "clsx": "^2.0.0"
  },
  "keywords": [
    "react",
    "component",
    "ui",
    "typescript",
    "gs-style"
  ],
  "author": "Carlos Braga <carlos.braga@grupoglobalsoft.pt>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/carlos-gs99/GSPackages.git",
    "directory": "gs-newcomponent"
  }
}
```

---

### 2. `tsup.config.ts`

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    'react',
    'react-dom',
    '@carlos-gs99/hooks',
    '@carlos-gs99/utils',
    '@carlos-gs99/theme',
    // Adicionar outras deps GS aqui se necessário
    // 'gs-icon',
    // 'gs-button',
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
```

---

### 3. `src/types.ts`

```typescript
import type { ComponentPropsWithRef } from 'react';

/**
 * Variantes visuais do componente
 */
export type GSNewComponentVariant = 'default' | 'outlined' | 'soft' | 'plain';

/**
 * Cores disponíveis
 */
export type GSNewComponentColor =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/**
 * Tamanhos disponíveis
 */
export type GSNewComponentSize = 'sm' | 'md' | 'lg';

/**
 * Props do componente GSNewComponent
 *
 * @example
 * ```tsx
 * <GSNewComponent variant="outlined" color="primary">
 *   Content
 * </GSNewComponent>
 * ```
 */
export interface GSNewComponentProps extends ComponentPropsWithRef<'div'> {
  /**
   * Variante visual do componente
   * @default 'default'
   */
  variant?: GSNewComponentVariant;

  /**
   * Cor do componente
   * @default 'primary'
   */
  color?: GSNewComponentColor;

  /**
   * Tamanho do componente
   * @default 'md'
   */
  size?: GSNewComponentSize;

  /**
   * Desabilita interações
   * @default false
   */
  disabled?: boolean;

  /**
   * Estado de loading
   * @default false
   */
  loading?: boolean;

  /**
   * Ativa debug mode
   * @default false
   */
  debug?: boolean;
}
```

---

### 4. `src/GSNewComponent.tsx`

```tsx
import { forwardRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/hooks';
import type { GSNewComponentProps } from './types';
import styles from './styles.module.css';
import './i18n';

/**
 * GSNewComponent - Brief description
 *
 * @example
 * ```tsx
 * <GSNewComponent variant="outlined" color="primary">
 *   Content here
 * </GSNewComponent>
 * ```
 */
export const GSNewComponent = forwardRef<HTMLDivElement, GSNewComponentProps>(
  (props, ref) => {
    // 1. Destructure props
    const {
      children,
      variant = 'default',
      color = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className,
      debug: debugProp,
      ...rest
    } = props;

    // 2. Hooks
    const { t } = useTranslation('gs-newcomponent');
    const { debug } = useDebug({
      component: 'GSNewComponent',
      enabled: debugProp,
    });

    // 3. Derived state
    const isDisabled = disabled || loading;

    // 4. Effects (se necessário)
    // useEffect(() => { ... }, []);

    // 5. Event handlers
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) return;
      debug.log('Component clicked', { variant, color, size });
      props.onClick?.(e);
    };

    // 6. Debug logs
    debug.log('Rendering', {
      variant,
      color,
      size,
      disabled,
      loading,
    });

    // 7. Render
    return (
      <div
        ref={ref}
        className={clsx(
          styles.component,
          styles[`component--${variant}`],
          styles[`component--${color}`],
          styles[`component--${size}`],
          isDisabled && styles.componentDisabled,
          loading && styles.componentLoading,
          className
        )}
        onClick={handleClick}
        data-gs-debug={debug.enabled ? 'GSNewComponent' : undefined}
        data-gs-state={
          debug.enabled
            ? JSON.stringify({ variant, color, size, disabled, loading })
            : undefined
        }
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {loading && <span className={styles.loader}>Loading...</span>}
        {children}
      </div>
    );
  }
);

GSNewComponent.displayName = 'GSNewComponent';
```

---

### 5. `src/styles.module.css`

```css
/* Base component */
.component {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gs-spacing-sm);
  
  /* Spacing */
  padding: var(--gs-spacing-md);
  
  /* Typography */
  font-family: var(--gs-font-family);
  font-size: var(--gs-font-size-md);
  font-weight: var(--gs-font-weight-medium);
  line-height: var(--gs-line-height-md);
  
  /* Borders */
  border: none;
  border-radius: var(--gs-radius-md);
  
  /* Transitions */
  transition: all var(--gs-duration-normal) var(--gs-easing-standard);
  
  /* Cursor */
  cursor: pointer;
}

/* Variants */
.component--default {
  background: var(--gs-color-primary);
  color: var(--gs-color-primary-contrast);
}

.component--outlined {
  background: transparent;
  border: 1px solid var(--gs-color-primary);
  color: var(--gs-color-primary);
}

.component--soft {
  background: var(--gs-color-primary-soft);
  color: var(--gs-color-primary);
}

.component--plain {
  background: transparent;
  color: var(--gs-color-primary);
}

/* Colors */
.component--primary { /* ... */ }
.component--neutral { /* ... */ }
.component--success { /* ... */ }
.component--warning { /* ... */ }
.component--danger { /* ... */ }
.component--info { /* ... */ }

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

/* States */
.component--disabled {
  opacity: var(--gs-opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

.component--loading {
  opacity: var(--gs-opacity-loading);
  cursor: wait;
}

/* Loader */
.loader {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Hover (não disabled) */
.component:not(.component--disabled):hover {
  opacity: var(--gs-opacity-hover);
}

/* Focus */
.component:focus-visible {
  outline: 2px solid var(--gs-color-primary);
  outline-offset: 2px;
}
```

---

### 6. `src/i18n/en.json`

```json
{
  "component": {
    "label": "Label",
    "placeholder": "Placeholder",
    "loading": "Loading...",
    "error": "Error message",
    "empty": "No items"
  },
  "actions": {
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "accessibility": {
    "loading": "Content is loading",
    "disabled": "This component is disabled"
  }
}
```

---

### 7. `src/i18n/pt.json`

```json
{
  "component": {
    "label": "Rótulo",
    "placeholder": "Placeholder",
    "loading": "A carregar...",
    "error": "Mensagem de erro",
    "empty": "Sem itens"
  },
  "actions": {
    "submit": "Submeter",
    "cancel": "Cancelar"
  },
  "accessibility": {
    "loading": "O conteúdo está a carregar",
    "disabled": "Este componente está desabilitado"
  }
}
```

---

### 8. `src/i18n.ts`

```typescript
import { registerTranslations } from '@carlos-gs99/hooks';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

// Auto-register translations when component is imported
registerTranslations('gs-newcomponent', { en, pt });

export { en, pt };
```

---

### 9. `src/index.ts`

```typescript
export { GSNewComponent } from './GSNewComponent';
export type {
  GSNewComponentProps,
  GSNewComponentVariant,
  GSNewComponentColor,
  GSNewComponentSize,
} from './types';
```

---

### 10. `src/css-modules.d.ts`

```typescript
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

---

### 11. `src/__tests__/GSNewComponent.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { GSNewComponent } from '../GSNewComponent';

describe('GSNewComponent', () => {
  it('should render with default props', () => {
    render(<GSNewComponent>Content</GSNewComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render all variants', () => {
    const variants = ['default', 'outlined', 'soft', 'plain'] as const;
    variants.forEach((variant) => {
      const { rerender } = render(
        <GSNewComponent variant={variant}>Test</GSNewComponent>
      );
    });
  });

  it('should handle disabled state', () => {
    render(<GSNewComponent disabled>Disabled</GSNewComponent>);
    expect(screen.getByText('Disabled')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<GSNewComponent onClick={handleClick}>Click me</GSNewComponent>);

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(
      <GSNewComponent disabled onClick={handleClick}>
        Click me
      </GSNewComponent>
    );

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render with custom className', () => {
    render(<GSNewComponent className="custom">Content</GSNewComponent>);
    expect(screen.getByText('Content')).toHaveClass('custom');
  });
});
```

---

### 12. `src/__tests__/GSNewComponent.a11y.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'vitest-axe';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { GSNewComponent } from '../GSNewComponent';

expect.extend(toHaveNoViolations);

describe('GSNewComponent - Accessibility', () => {
  it('should have no axe violations', async () => {
    const { container } = render(<GSNewComponent>Content</GSNewComponent>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have correct ARIA attributes', () => {
    render(
      <GSNewComponent aria-label="Test label" disabled>
        Content
      </GSNewComponent>
    );
    const component = screen.getByText('Content');
    expect(component).toHaveAttribute('aria-label', 'Test label');
    expect(component).toHaveAttribute('aria-disabled', 'true');
  });

  it('should have loading state ARIA', () => {
    render(<GSNewComponent loading>Loading content</GSNewComponent>);
    expect(screen.getByText('Loading content')).toHaveAttribute('aria-busy', 'true');
  });

  it('should be keyboard accessible', async () => {
    const handleClick = vi.fn();
    render(<GSNewComponent onClick={handleClick}>Content</GSNewComponent>);

    const component = screen.getByText('Content');
    component.focus();

    // Simulate Enter key
    await userEvent.keyboard('{Enter}');
    // Adicionar lógica de keyboard handler se necessário
  });
});
```

---

### 13. `src/__tests__/GSNewComponent.i18n.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { i18n } from '@carlos-gs99/hooks';
import { GSNewComponent } from '../GSNewComponent';

describe('GSNewComponent - i18n', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('should render in English', () => {
    i18n.changeLanguage('en');
    render(<GSNewComponent />);
    // Adicionar assertions específicas para textos traduzidos
  });

  it('should render in Portuguese', () => {
    i18n.changeLanguage('pt');
    render(<GSNewComponent />);
    // Adicionar assertions específicas para textos traduzidos
  });

  it('should change language dynamically', () => {
    const { rerender } = render(<GSNewComponent />);
    // Verificar texto em inglês

    i18n.changeLanguage('pt');
    rerender(<GSNewComponent />);
    // Verificar texto em português
  });

  it('should fall back to English for unsupported language', () => {
    i18n.changeLanguage('fr'); // Não suportado
    render(<GSNewComponent />);
    // Verificar fallback para inglês
  });
});
```

---

### 14. `README.md`

```markdown
# GSNewComponent

> Brief description of the component (1-2 lines).

## 📦 Installation

\`\`\`bash
npm install @carlos-gs99/gs-newcomponent
\`\`\`

## 🚀 Basic Usage

\`\`\`tsx
import { GSNewComponent } from '@carlos-gs99/gs-newcomponent';
import '@carlos-gs99/theme/tokens.css';

<GSNewComponent variant="outlined" color="primary">
  Content here
</GSNewComponent>
\`\`\`

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outlined' \| 'soft' \| 'plain'` | `'default'` | Visual variant |
| `color` | `GSColor` | `'primary'` | Semantic color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Loading state |
| `debug` | `boolean` | `false` | Enable debug mode |

## 🎨 Variants

### Default

\`\`\`tsx
<GSNewComponent variant="default" color="primary">Default</GSNewComponent>
\`\`\`

### Outlined

\`\`\`tsx
<GSNewComponent variant="outlined" color="primary">Outlined</GSNewComponent>
\`\`\`

### Soft

\`\`\`tsx
<GSNewComponent variant="soft" color="success">Soft</GSNewComponent>
\`\`\`

### Plain

\`\`\`tsx
<GSNewComponent variant="plain" color="danger">Plain</GSNewComponent>
\`\`\`

## 🎯 Examples

### With Loading State

\`\`\`tsx
<GSNewComponent loading>Loading...</GSNewComponent>
\`\`\`

### Disabled

\`\`\`tsx
<GSNewComponent disabled>Can't interact</GSNewComponent>
\`\`\`

### Different Sizes

\`\`\`tsx
<GSNewComponent size="sm">Small</GSNewComponent>
<GSNewComponent size="md">Medium</GSNewComponent>
<GSNewComponent size="lg">Large</GSNewComponent>
\`\`\`

## ♿ Accessibility

- ✅ ARIA labels complete
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader support
- ✅ WCAG AA compliant

## 🌐 Internationalization

Supports EN and PT automatically via `useTranslation('gs-newcomponent')`.

## 🐛 Debug Mode

\`\`\`tsx
<GSNewComponent debug>Debug Component</GSNewComponent>
\`\`\`

Logs structured information to console for debugging.

## 🧪 Testing

\`\`\`bash
npm test -- gs-newcomponent
\`\`\`

- ✅ Unit tests (80%+ coverage)
- ✅ Accessibility tests (vitest-axe)
- ✅ i18n tests (EN + PT)

## 📦 Dependencies

### Peer Dependencies

- `react` ^18.0.0
- `react-dom` ^18.0.0
- `@carlos-gs99/hooks` ^1.0.0
- `@carlos-gs99/utils` ^1.0.0
- `@carlos-gs99/theme` ^1.0.0

## 📄 License

MIT © [Carlos Braga](mailto:carlos.braga@grupoglobalsoft.pt)
```

---

## ✅ Checklist Pós-Criação

Após copiar e adaptar templates:

- [ ] ✅ Substituir `GSNewComponent` pelo nome real em TODOS os ficheiros
- [ ] ✅ Substituir `gs-newcomponent` pelo nome real em TODOS os ficheiros
- [ ] ✅ Atualizar description em `package.json`
- [ ] ✅ Implementar lógica específica do componente
- [ ] ✅ Adaptar props para necessidades específicas
- [ ] ✅ Implementar CSS específico (cores, variantes)
- [ ] ✅ Traduzir `i18n/pt.json` (não copy-paste de `en.json`)
- [ ] ✅ Escrever testes específicos (não deixar templates vazios)
- [ ] ✅ Documentar exemplos reais no README
- [ ] ✅ Build: `npm run build --workspace @carlos-gs99/gs-newcomponent`
- [ ] ✅ Test: `npm test -- gs-newcomponent`
- [ ] ✅ Lint: `npm run lint`
- [ ] ✅ CI: `./simulate-ci.ps1`

---

**Use este template como base, mas adapte para necessidades específicas!** 📄✨

