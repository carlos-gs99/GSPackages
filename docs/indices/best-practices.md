# 🎯 Best Practices - Melhores Práticas

**Status:** Guia consolidado de melhores práticas do projeto  
**Última Atualização:** 2025-12-05  
**Aplicação:** OBRIGATÓRIA em todo o código

---

## 📋 TL;DR - Regras de Ouro

1. **🚫 Zero frameworks externos** (Base UI, MUI, Bootstrap)
2. **📦 Packlet structure** (tudo na pasta do componente)
3. **🎨 CSS Modules + Tokens** (sem inline, sem !important)
4. **🌐 i18n obrigatório** (en.json + pt.json)
5. **♿ A11y WCAG AA** (ARIA + keyboard nav)
6. **🐛 Debug mode** (useDebug integrado)
7. **🧪 Testes obrigatórios** (unit + a11y + i18n)
8. **📚 README completo** (único markdown na raiz)

---

## 🎨 Styling - CSS & Design

### ✅ DO - CSS Modules + Tokens

```tsx
// ✅ EXCELENTE - CSS Modules com tokens
import styles from './styles.module.css';

<button className={styles.button}>Click me</button>

// styles.module.css
.button {
  background: var(--gs-color-primary);
  padding: var(--gs-spacing-md);
  border-radius: var(--gs-radius-md);
  font-size: var(--gs-font-size-md);
}
```

```tsx
// ✅ BOM - Classes dinâmicas com clsx
import styles from './styles.module.css';
import clsx from 'clsx';

<button 
  className={clsx(
    styles.button,
    variant === 'outlined' && styles.buttonOutlined,
    disabled && styles.buttonDisabled
  )}
>
```

```tsx
// ✅ BOM - Props para customização
<GSButton 
  variant="outlined" 
  color="primary" 
  size="lg"
  className={myCustomClass}  // Permite override se necessário
/>
```

### ❌ DON'T - Inline Styles & !important

```tsx
// ❌ MAU - Inline styles demais
<button style={{ 
  backgroundColor: '#007bff',
  padding: '8px 16px',
  borderRadius: '4px' 
}}>

// ❌ PÉSSIMO - !important
.button {
  color: red !important;
  background: blue !important;
}

// ❌ MAU - Hardcoded values
.button {
  padding: 12px;        // Usar var(--gs-spacing-md)
  color: #007bff;       // Usar var(--gs-color-primary)
  font-size: 14px;      // Usar var(--gs-font-size-md)
}
```

### 🎨 Design Tokens - Uso Correto

```css
/* ✅ CORES */
var(--gs-color-primary)
var(--gs-color-neutral)
var(--gs-color-success)
var(--gs-color-warning)
var(--gs-color-danger)
var(--gs-color-info)

/* ✅ SPACING */
var(--gs-spacing-xs)   /* 4px */
var(--gs-spacing-sm)   /* 8px */
var(--gs-spacing-md)   /* 16px */
var(--gs-spacing-lg)   /* 24px */
var(--gs-spacing-xl)   /* 32px */

/* ✅ FONT SIZE */
var(--gs-font-size-xs)
var(--gs-font-size-sm)
var(--gs-font-size-md)
var(--gs-font-size-lg)
var(--gs-font-size-xl)

/* ✅ BORDER RADIUS */
var(--gs-radius-sm)
var(--gs-radius-md)
var(--gs-radius-lg)
var(--gs-radius-full)

/* ✅ SHADOWS */
var(--gs-shadow-sm)
var(--gs-shadow-md)
var(--gs-shadow-lg)
```

---

## 🏗️ Component Structure - Arquitetura

### ✅ DO - Packlet Structure

```
gs-button/
├── src/
│   ├── GSButton.tsx          # Componente principal
│   ├── types.ts              # Props e types
│   ├── styles.module.css     # CSS Modules
│   ├── i18n/                 # Traduções
│   │   ├── en.json
│   │   └── pt.json
│   ├── i18n.ts               # Helper registo
│   ├── hooks/                # Hooks específicos (se necessário)
│   │   └── useButtonState.ts
│   ├── partials/             # Lógica complexa (se necessário)
│   │   └── ButtonIcon.tsx
│   ├── index.ts              # Exports públicos
│   ├── __tests__/            # Testes
│   │   ├── GSButton.test.tsx
│   │   ├── GSButton.a11y.test.tsx
│   │   └── GSButton.i18n.test.tsx
│   └── css-modules.d.ts      # Types para CSS
├── package.json              # Deps isoladas
├── tsup.config.ts            # Build config
└── README.md                 # Documentação (ÚNICO markdown)
```

### ✅ DO - Componente Bem Estruturado

```tsx
// ✅ EXCELENTE - Estrutura limpa
import { forwardRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@carlos-gs99/hooks';
import { useDebug } from '@carlos-gs99/hooks';
import type { GSButtonProps } from './types';
import styles from './styles.module.css';
import './i18n';

export const GSButton = forwardRef<HTMLButtonElement, GSButtonProps>(
  (props, ref) => {
    // 1. Destructure props
    const {
      children,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className,
      debug: debugProp,
      ...rest
    } = props;

    // 2. Hooks
    const { t } = useTranslation('gs-button');
    const { debug } = useDebug({ 
      component: 'GSButton', 
      enabled: debugProp 
    });

    // 3. Derived state
    const isDisabled = disabled || loading;

    // 4. Effects (se necessário)
    // useEffect(...);

    // 5. Event handlers
    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled) return;
      debug.log('Button clicked', { variant, color });
      props.onClick?.(e);
    };

    // 6. Render
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${color}`],
          styles[`button--${size}`],
          isDisabled && styles.buttonDisabled,
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        data-gs-debug={debug.enabled ? 'GSButton' : undefined}
        {...rest}
      >
        {loading && <Spinner size="sm" />}
        {children}
      </button>
    );
  }
);

GSButton.displayName = 'GSButton';
```

### ❌ DON'T - Componente Mal Estruturado

```tsx
// ❌ MAU - Tudo misturado, sem organização
export const BadButton = (props: any) => {  // ❌ any
  const [state, setState] = useState();     // ❌ Sem type
  
  // ❌ Lógica inline sem separação
  return (
    <button 
      style={{ background: 'blue' }}        // ❌ Inline
      onClick={() => {                       // ❌ Handler inline complexo
        if (props.disabled) return;
        console.log('clicked');
        setState(true);
        props.onClick?.();
      }}
    >
      Click me                               // ❌ Hardcoded text
    </button>
  );
};
// ❌ Sem displayName, sem forwardRef
```

---

## 🌐 Internationalization (i18n)

### ✅ DO - i18n Completo

```typescript
// ✅ EXCELENTE - Estrutura i18n
// i18n/en.json
{
  "button": {
    "submit": "Submit",
    "cancel": "Cancel",
    "loading": "Loading..."
  },
  "validation": {
    "required": "This field is required",
    "invalid": "Invalid value"
  }
}

// i18n/pt.json
{
  "button": {
    "submit": "Submeter",
    "cancel": "Cancelar",
    "loading": "A carregar..."
  },
  "validation": {
    "required": "Este campo é obrigatório",
    "invalid": "Valor inválido"
  }
}

// i18n.ts - Helper de registo
import { registerTranslations } from '@carlos-gs99/hooks';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

registerTranslations('gs-button', { en, pt });

// Uso no componente
const { t } = useTranslation('gs-button');
<button>{t('button.submit')}</button>
```

### ❌ DON'T - Sem i18n

```tsx
// ❌ MAU - Texto hardcoded
<button>Submit</button>
<button>Cancel</button>

// ❌ MAU - Strings inline
const message = 'This field is required';

// ❌ MAU - Tradução manual inline
const label = lang === 'en' ? 'Submit' : 'Submeter';
```

---

## ♿ Accessibility (A11y)

### ✅ DO - A11y Completo

```tsx
// ✅ EXCELENTE - ARIA completo
<button
  role="button"
  aria-label={t('button.submit')}
  aria-disabled={disabled}
  aria-busy={loading}
  aria-describedby={error ? 'error-msg' : undefined}
  tabIndex={disabled ? -1 : 0}
  onKeyDown={handleKeyDown}
>
  {children}
</button>

// ✅ BOM - Keyboard navigation
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
  if (e.key === 'Escape') {
    handleClose();
  }
};

// ✅ BOM - Focus management
const buttonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (autoFocus) {
    buttonRef.current?.focus();
  }
}, [autoFocus]);

// ✅ BOM - Screen reader text
<span className={styles.visuallyHidden}>
  {t('button.loadingAnnouncement')}
</span>
```

### ❌ DON'T - Sem A11y

```tsx
// ❌ MAU - Sem ARIA
<div onClick={handleClick}>Click me</div>  // ❌ div clicável
<button />                                   // ❌ Sem label

// ❌ MAU - Sem keyboard
// Apenas onClick, sem onKeyDown

// ❌ MAU - Sem focus management
// Elementos interativos sem tabIndex

// ❌ MAU - Cores sem contraste
.button {
  color: #ccc;              // ❌ Contraste baixo
  background: #ddd;
}
```

---

## 🐛 Debug Mode

### ✅ DO - Debug Integrado

```tsx
// ✅ EXCELENTE - useDebug completo
import { useDebug } from '@carlos-gs99/hooks';

const { debug } = useDebug({ 
  component: 'GSButton', 
  enabled: props.debug 
});

// Log estruturado
debug.log('Rendering', { variant, color, size });
debug.warn('Deprecated prop used', { prop: 'oldProp' });
debug.error('Invalid configuration', { error });

// Data attributes para debug visual
<button 
  data-gs-debug={debug.enabled ? 'GSButton' : undefined}
  data-gs-state={debug.enabled ? JSON.stringify({ disabled, loading }) : undefined}
>
```

### ❌ DON'T - Console direto

```tsx
// ❌ MAU - console.log direto
console.log('Button clicked');              // ❌ Sempre ativo
console.log(props);                         // ❌ Sem contexto

// ❌ MAU - Sem data attributes para debug visual
<button>Click me</button>
```

---

## 🧪 Testing

### ✅ DO - Testes Completos

```tsx
// ✅ EXCELENTE - 3 ficheiros obrigatórios

// 1. Component.test.tsx - Unit tests
describe('GSButton', () => {
  it('should render with default props', () => {
    render(<GSButton>Click me</GSButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle all variants', () => {
    const variants = ['solid', 'outlined', 'soft', 'plain'];
    variants.forEach(variant => {
      render(<GSButton variant={variant}>Test</GSButton>);
    });
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<GSButton onClick={handleClick}>Click</GSButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// 2. Component.a11y.test.tsx - Accessibility
describe('GSButton - Accessibility', () => {
  it('should have no axe violations', async () => {
    const { container } = render(<GSButton>Click me</GSButton>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', async () => {
    const handleClick = vi.fn();
    render(<GSButton onClick={handleClick}>Click</GSButton>);
    const button = screen.getByRole('button');
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });
});

// 3. Component.i18n.test.tsx - Internationalization
describe('GSButton - i18n', () => {
  it('should render in English', () => {
    i18n.changeLanguage('en');
    render(<GSButton>{t('button.submit')}</GSButton>);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render in Portuguese', () => {
    i18n.changeLanguage('pt');
    render(<GSButton>{t('button.submit')}</GSButton>);
    expect(screen.getByText('Submeter')).toBeInTheDocument();
  });
});
```

### ❌ DON'T - Sem Testes

```tsx
// ❌ MAU - Componente sem testes
// Nenhum ficheiro __tests__/

// ❌ MAU - Testes incompletos
describe('GSButton', () => {
  it('renders', () => {
    render(<GSButton>Click</GSButton>);
  });
});
// ❌ Apenas 1 teste trivial, sem coverage
```

---

## 📦 Dependencies - Gerenciamento

### ✅ DO - Deps Corretas

```json
// ✅ EXCELENTE - package.json limpo
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@carlos-gs99/hooks": "^1.0.0",
    "@carlos-gs99/utils": "^1.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@carlos-gs99/hooks": "^1.0.0",
    "@carlos-gs99/utils": "^1.0.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0"
  }
}

// ✅ tsup.config.ts - Externals corretos
export default defineConfig({
  external: [
    'react',
    'react-dom',
    'gs-icon',        // Outras dependências GS
    'gs-button'
  ]
});
```

### ❌ DON'T - Deps Erradas

```json
// ❌ MAU - Frameworks externos
{
  "dependencies": {
    "@mui/base": "^5.0.0",      // ❌ PROIBIDO
    "bootstrap": "^5.0.0",      // ❌ PROIBIDO
    "chakra-ui": "^2.0.0"       // ❌ PROIBIDO
  }
}

// ❌ MAU - Deps não declaradas
// Usar gs-icon sem adicionar a peerDependencies

// ❌ MAU - Deps em dependencies (deveria ser peer)
{
  "dependencies": {
    "react": "^18.0.0"          // ❌ Deveria ser peer
  }
}
```

---

## 📝 Documentation

### ✅ DO - README Completo

```markdown
# GSButton

> Componente de botão altamente customizável e acessível.

## Instalação

\`\`\`bash
npm install @carlos-gs99/gs-button
\`\`\`

## Uso Básico

\`\`\`tsx
import { GSButton } from '@carlos-gs99/gs-button';

<GSButton variant="solid" color="primary">
  Click me
</GSButton>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'outlined' \| 'soft' \| 'plain'` | `'solid'` | Variante visual |
| `color` | `GSColor` | `'primary'` | Cor do botão |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `disabled` | `boolean` | `false` | Desabilita interação |
| `loading` | `boolean` | `false` | Estado de loading |

## Exemplos

### Com Loading
\`\`\`tsx
<GSButton loading>Submitting...</GSButton>
\`\`\`

### Disabled
\`\`\`tsx
<GSButton disabled>Can't click</GSButton>
\`\`\`

## Acessibilidade

- ✅ ARIA labels completos
- ✅ Keyboard navigation (Enter, Space)
- ✅ Focus management
- ✅ Screen reader support

## i18n

Suporta EN e PT via `useTranslation('gs-button')`.

## Debug Mode

\`\`\`tsx
<GSButton debug>Debug Button</GSButton>
\`\`\`
```

### ❌ DON'T - README Vazio/Incompleto

```markdown
# GSButton

A button component.

## Usage

\`\`\`tsx
<GSButton>Click</GSButton>
\`\`\`
```

---

## 🎯 TypeScript - Types

### ✅ DO - Types Completos

```typescript
// ✅ EXCELENTE - types.ts com TSDoc
import type { ComponentPropsWithRef } from 'react';

/**
 * Variantes visuais do botão
 */
export type GSButtonVariant = 'solid' | 'outlined' | 'soft' | 'plain';

/**
 * Cores disponíveis
 */
export type GSButtonColor = 
  | 'primary' 
  | 'neutral' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info';

/**
 * Props do componente GSButton
 * 
 * @example
 * ```tsx
 * <GSButton variant="outlined" color="primary">
 *   Click me
 * </GSButton>
 * ```
 */
export interface GSButtonProps extends ComponentPropsWithRef<'button'> {
  /**
   * Variante visual do botão
   * @default 'solid'
   */
  variant?: GSButtonVariant;
  
  /**
   * Cor do botão
   * @default 'primary'
   */
  color?: GSButtonColor;
  
  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
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

### ❌ DON'T - Types Incompletos

```typescript
// ❌ MAU - Sem TSDoc
export interface ButtonProps {
  variant?: string;        // ❌ any string
  color?: string;          // ❌ any string
  onClick?: Function;      // ❌ Function genérica
}

// ❌ MAU - any
export interface BadProps {
  [key: string]: any;
}
```

---

## 🔄 Workflow - Desenvolvimento

### ✅ DO - Workflow Correto

```bash
# 1. Análise completa (FASE 1)
# - Investigar requisito
# - Comparar com código existente
# - Documentar descobertas
# - Listar soluções

# 2. Apresentar e aguardar confirmação (FASE 2)
# - Mostrar análise
# - Propor soluções
# - Expor dúvidas
# - Aguardar OK do utilizador

# 3. Implementar completo (FASE 3)
# - Código + Types + CSS + i18n + Testes + Docs
npm run build --workspace gs-button
npm test -- gs-button
npm run lint

# 4. Validar
# - Build passou
# - Testes passaram
# - Linting passou
# - Documentação atualizada
```

### ❌ DON'T - Workflow Errado

```bash
# ❌ MAU - Implementar sem análise
# Aplicar mudanças imediatamente

# ❌ MAU - Implementação parcial
# Adicionar código sem types/testes/docs

# ❌ MAU - Não validar
# Commit sem build/test/lint
```

---

## ✅ Checklist Final

Antes de considerar componente "completo":

- [ ] ✅ Estrutura packlet (tudo na pasta)
- [ ] ✅ Zero deps externas (sem Base UI/MUI/Bootstrap)
- [ ] ✅ CSS Modules + tokens (sem inline/!important)
- [ ] ✅ i18n completo (en.json + pt.json + helper)
- [ ] ✅ A11y WCAG AA (ARIA + keyboard + axe tests)
- [ ] ✅ Debug mode (useDebug + data-gs)
- [ ] ✅ TypeScript strict (types completos + TSDoc)
- [ ] ✅ Testes 80%+ (unit + a11y + i18n)
- [ ] ✅ README completo (props + exemplos + a11y + i18n)
- [ ] ✅ Build passa (0 erros TypeScript)
- [ ] ✅ Linting passa (0 warnings)
- [ ] ✅ CI/CD passa (simulate-ci.ps1)

---

**Estas práticas garantem qualidade máxima e consistência!** 🎯

