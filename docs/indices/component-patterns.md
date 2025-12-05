# 🏗️ Component Patterns - Padrões Arquiteturais

**Status:** Padrões estabelecidos no projeto GSPackages  
**Última Atualização:** 2025-12-05  
**Uso:** Seguir em TODOS os componentes novos/modificados

---

## 📋 TL;DR - Padrões Principais

1. **📦 Packlet Pattern** - Isolamento total por componente
2. **🔧 Compound Components** - Composição de sub-componentes
3. **🎭 Polymorphic Components** - `as` prop para polimorfismo
4. **🎣 Custom Hooks** - Lógica reutilizável extraída
5. **🎨 Variant System** - Consistência visual sistemática
6. **♿ Accessible by Default** - A11y integrada desde o início

---

## 📦 Pattern 1: Packlet (Isolamento Total)

### Conceito
Cada componente é um "mini-package" autocontido que poderia ser publicado independentemente.

### Estrutura Obrigatória

```
gs-component/
├── src/
│   ├── GSComponent.tsx       # Componente principal
│   ├── types.ts              # Props e types
│   ├── styles.module.css     # CSS Modules
│   ├── i18n/                 # Traduções autocontidas
│   │   ├── en.json
│   │   └── pt.json
│   ├── i18n.ts               # Helper de registo
│   ├── hooks/                # Hooks específicos (opcional)
│   │   └── useComponentState.ts
│   ├── partials/             # Lógica complexa (opcional)
│   │   └── ComponentPart.tsx
│   ├── utils/                # Utils específicos (opcional)
│   │   └── componentHelpers.ts
│   ├── index.ts              # Exports públicos
│   ├── __tests__/            # Testes completos
│   │   ├── GSComponent.test.tsx
│   │   ├── GSComponent.a11y.test.tsx
│   │   └── GSComponent.i18n.test.tsx
│   └── css-modules.d.ts      # Types para CSS Modules
├── package.json              # Deps isoladas
├── tsup.config.ts            # Build config
└── README.md                 # Documentação completa
```

### Princípios

1. **Tudo na pasta do componente** - Markup, styles, i18n, tests
2. **Zero dependências globais** - Apenas peer dependencies explícitas
3. **Props-only configuration** - Sem contexto externo necessário
4. **Publicável independentemente** - Poderia virar npm package hoje

### Exemplo: gs-button

```typescript
// ✅ CORRETO - Tudo autocontido
gs-button/
├── src/
│   ├── GSButton.tsx          # Componente
│   ├── types.ts              # Props locais
│   ├── styles.module.css     # CSS local
│   ├── i18n/                 # Traduções locais
│   └── __tests__/            # Testes locais
├── package.json              # Deps explícitas
└── README.md                 # Docs próprias

// ❌ ERRADO - Dependências externas não declaradas
gs-button/
├── src/
│   └── GSButton.tsx
└── package.json
// Usa contexto global não declarado
// CSS em outro lugar
// i18n compartilhado
```

---

## 🔧 Pattern 2: Compound Components

### Conceito
Componentes complexos divididos em sub-componentes relacionados.

### Quando Usar
- Componente tem múltiplas partes relacionadas
- Precisa de flexibilidade de composição
- Usuário deve controlar ordem/presença de partes

### Implementação: Namespace Pattern

```typescript
// ✅ EXCELENTE - GSList com compound components

// GSList.tsx
import { GSListRoot } from './partials/GSListRoot';
import { GSListItem } from './partials/GSListItem';
import { GSListDivider } from './partials/GSListDivider';

export const GSList = Object.assign(GSListRoot, {
  Item: GSListItem,
  Divider: GSListDivider,
});

// Uso
<GSList>
  <GSList.Item>Item 1</GSList.Item>
  <GSList.Divider />
  <GSList.Item active>Item 2</GSList.Item>
  <GSList.Item disabled>Item 3</GSList.Item>
</GSList>
```

### Exemplo Completo: GSCard

```typescript
// types.ts
export interface GSCardProps extends ComponentPropsWithRef<'div'> {
  variant?: 'elevation' | 'outlined' | 'soft';
  elevation?: 0 | 1 | 2 | 3;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface GSCardHeaderProps extends ComponentPropsWithRef<'div'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export interface GSCardBodyProps extends ComponentPropsWithRef<'div'> {}

export interface GSCardFooterProps extends ComponentPropsWithRef<'div'> {
  align?: 'left' | 'center' | 'right';
}

// partials/GSCardRoot.tsx
export const GSCardRoot = forwardRef<HTMLDivElement, GSCardProps>(
  (props, ref) => {
    const { children, variant = 'elevation', ...rest } = props;
    
    return (
      <div ref={ref} className={styles.card} {...rest}>
        {children}
      </div>
    );
  }
);

// partials/GSCardHeader.tsx
export const GSCardHeader = forwardRef<HTMLDivElement, GSCardHeaderProps>(
  (props, ref) => {
    const { title, subtitle, action, ...rest } = props;
    
    return (
      <div ref={ref} className={styles.cardHeader} {...rest}>
        <div className={styles.cardHeaderContent}>
          {title && <h3 className={styles.cardTitle}>{title}</h3>}
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
        {action && <div className={styles.cardHeaderAction}>{action}</div>}
      </div>
    );
  }
);

// partials/GSCardBody.tsx
export const GSCardBody = forwardRef<HTMLDivElement, GSCardBodyProps>(
  (props, ref) => {
    return <div ref={ref} className={styles.cardBody} {...props} />;
  }
);

// partials/GSCardFooter.tsx
export const GSCardFooter = forwardRef<HTMLDivElement, GSCardFooterProps>(
  (props, ref) => {
    const { align = 'right', ...rest } = props;
    
    return (
      <div 
        ref={ref} 
        className={clsx(
          styles.cardFooter,
          styles[`cardFooter--${align}`]
        )} 
        {...rest} 
      />
    );
  }
);

// GSCard.tsx - Export composto
export const GSCard = Object.assign(GSCardRoot, {
  Header: GSCardHeader,
  Body: GSCardBody,
  Footer: GSCardFooter,
});

// Uso flexível
<GSCard variant="elevation">
  <GSCard.Header 
    title="Card Title" 
    subtitle="Card subtitle"
    action={<GSButton>Action</GSButton>}
  />
  <GSCard.Body>
    Card content here
  </GSCard.Body>
  <GSCard.Footer align="right">
    <GSButton variant="outlined">Cancel</GSButton>
    <GSButton>Submit</GSButton>
  </GSCard.Footer>
</GSCard>
```

### Benefícios
- ✅ **Flexibilidade** - Usuário controla composição
- ✅ **Tipagem forte** - TypeScript valida estrutura
- ✅ **Namespace limpo** - `GSCard.Header` é auto-descritivo
- ✅ **Fácil descoberta** - IntelliSense mostra sub-componentes

---

## 🎭 Pattern 3: Polymorphic Components

### Conceito
Componente pode renderizar como diferentes elementos HTML via `as` prop.

### Quando Usar
- Componente é semanticamente flexível
- Precisa ser `<a>`, `<button>`, `<div>` dependendo do contexto
- Mantém todos os estilos independente do elemento

### Implementação: Polimorfismo Tipado

```typescript
// types.ts - Tipos polimórficos
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

type MergeProps<T, U> = U & DistributiveOmit<T, keyof U>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = MergeProps<React.ComponentPropsWithoutRef<C>, Props & { as?: C }>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

// GSButton polimórfico
export type GSButtonProps<C extends React.ElementType = 'button'> = 
  PolymorphicComponentPropsWithRef<C, {
    variant?: GSButtonVariant;
    color?: GSButtonColor;
    size?: GSButtonSize;
    // ... outras props
  }>;
```

```typescript
// GSButton.tsx - Implementação polimórfica
export const GSButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    props: GSButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const {
      as,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      children,
      className,
      ...rest
    } = props;

    const Component = as || 'button';

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${color}`],
          styles[`button--${size}`],
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
) as <C extends React.ElementType = 'button'>(
  props: GSButtonProps<C>
) => React.ReactElement | null;

GSButton.displayName = 'GSButton';
```

### Uso

```tsx
// Como button (default)
<GSButton onClick={handleClick}>
  Click me
</GSButton>

// Como link
<GSButton as="a" href="/page">
  Go to page
</GSButton>

// Como Next.js Link
<GSButton as={Link} to="/page">
  Next page
</GSButton>

// TypeScript valida props corretas para cada elemento!
<GSButton as="a" href="/page">       // ✅ href válido
<GSButton as="a" onClick={...}>      // ✅ onClick válido
<GSButton as="button" href="/page">  // ❌ TypeScript erro!
```

### Benefícios
- ✅ **Flexibilidade semântica** - HTML correto para cada caso
- ✅ **Type-safety** - Props validadas para cada elemento
- ✅ **Estilos consistentes** - Aparência igual independente do elemento
- ✅ **A11y correto** - Elemento HTML apropriado para contexto

---

## 🎣 Pattern 4: Custom Hooks

### Conceito
Extrair lógica reutilizável em hooks customizados.

### Quando Usar
- Lógica usada em 2+ componentes
- Estado complexo que precisa de encapsulamento
- Side effects que precisam de cleanup
- Lógica de UI que não é componente visual

### Exemplo 1: useRipple (Efeito Visual)

```typescript
// hooks/useRipple.ts
export interface RippleOptions {
  disabled?: boolean;
  color?: string;
  duration?: number;
}

export const useRipple = (options: RippleOptions = {}) => {
  const { disabled = false, color, duration = 600 } = options;
  
  const [ripples, setRipples] = useState<Array<{
    id: number;
    x: number;
    y: number;
  }>>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
  }, [disabled]);

  useEffect(() => {
    if (ripples.length === 0) return;
    
    const timer = setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, duration);
    
    return () => clearTimeout(timer);
  }, [ripples, duration]);

  return {
    ripples,
    addRipple,
    RippleContainer: () => (
      <span className={styles.rippleContainer}>
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: color,
            }}
          />
        ))}
      </span>
    ),
  };
};

// Uso em GSButton
const { addRipple, RippleContainer } = useRipple({ disabled });

<button onClick={addRipple}>
  {children}
  <RippleContainer />
</button>
```

### Exemplo 2: useDropdown (Lógica Complexa)

```typescript
// hooks/useDropdown.ts
export interface UseDropdownOptions {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  offset?: number;
}

export const useDropdown = (options: UseDropdownOptions = {}) => {
  const {
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    offset = 8,
  } = options;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current?.contains(event.target as Node) ||
        dropdownRef.current?.contains(event.target as Node)
      ) {
        return;
      }
      close();
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const close = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const toggle = useCallback(() => {
    isOpen ? close() : open();
  }, [isOpen, open, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    triggerRef,
    dropdownRef,
    triggerProps: {
      ref: triggerRef,
      onClick: toggle,
      'aria-expanded': isOpen,
      'aria-haspopup': 'true' as const,
    },
    dropdownProps: {
      ref: dropdownRef,
      role: 'menu',
      'aria-hidden': !isOpen,
    },
  };
};

// Uso em GSSelect
const { isOpen, triggerProps, dropdownProps } = useDropdown({
  onOpenChange: (open) => {
    if (open) loadOptions();
  },
});

<button {...triggerProps}>Open</button>
<div {...dropdownProps}>Dropdown content</div>
```

### Benefícios
- ✅ **Reutilização** - Lógica compartilhada entre componentes
- ✅ **Testabilidade** - Hook pode ser testado isoladamente
- ✅ **Separação de concerns** - Lógica vs apresentação
- ✅ **Manutenibilidade** - Mudança em 1 lugar afeta todos os usos

---

## 🎨 Pattern 5: Variant System

### Conceito
Sistema consistente de variantes visuais em todos os componentes.

### Props Padrão

```typescript
// Presente em TODOS os componentes visuais
export interface VariantSystemProps {
  /**
   * Variante visual
   * @default 'default' ou 'solid'
   */
  variant?: 'default' | 'outlined' | 'soft' | 'plain';
  
  /**
   * Cor semântica
   * @default 'primary'
   */
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  
  /**
   * Tamanho
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
```

### Implementação CSS

```css
/* Variant base */
.component {
  /* Base styles */
}

/* Variant - solid */
.component--solid {
  background: var(--gs-color-primary);
  color: var(--gs-color-primary-contrast);
}

/* Variant - outlined */
.component--outlined {
  background: transparent;
  border: 1px solid var(--gs-color-primary);
  color: var(--gs-color-primary);
}

/* Variant - soft */
.component--soft {
  background: var(--gs-color-primary-soft);
  color: var(--gs-color-primary);
}

/* Variant - plain */
.component--plain {
  background: transparent;
  color: var(--gs-color-primary);
}

/* Color modifiers */
.component--success { /* ... */ }
.component--warning { /* ... */ }
.component--danger { /* ... */ }

/* Size modifiers */
.component--sm { font-size: var(--gs-font-size-sm); }
.component--md { font-size: var(--gs-font-size-md); }
.component--lg { font-size: var(--gs-font-size-lg); }
```

### Uso Consistente

```tsx
// TODOS estes componentes têm mesmas props de variant system:
<GSButton variant="outlined" color="primary" size="md" />
<GSChip variant="soft" color="success" size="sm" />
<GSBadge variant="solid" color="danger" size="lg" />
<GSAlert variant="soft" color="warning" />
```

### Benefícios
- ✅ **Consistência** - Aparência similar em todos os componentes
- ✅ **Predictibilidade** - Usuário sabe o que esperar
- ✅ **Manutenibilidade** - Mudança global de tema é fácil
- ✅ **Documentação** - Props iguais, docs iguais

---

## ♿ Pattern 6: Accessible by Default

### Conceito
Acessibilidade não é opcional, é integrada desde o design.

### Checklist Obrigatório

```typescript
// Todos os componentes interativos DEVEM ter:
export const GSComponent = forwardRef<HTMLElement, GSComponentProps>(
  (props, ref) => {
    return (
      <element
        ref={ref}
        // 1. Role correto
        role="button"
        
        // 2. ARIA labels
        aria-label={props['aria-label'] || computedLabel}
        aria-labelledby={props['aria-labelledby']}
        aria-describedby={props['aria-describedby']}
        
        // 3. Estados ARIA
        aria-disabled={disabled}
        aria-busy={loading}
        aria-expanded={isOpen}
        aria-selected={isSelected}
        aria-checked={isChecked}
        
        // 4. Keyboard navigation
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        
        // 5. Focus management
        autoFocus={autoFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  }
);
```

### Keyboard Navigation Pattern

```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleActivate();
      break;
      
    case 'Escape':
      event.preventDefault();
      handleClose();
      break;
      
    case 'ArrowDown':
      event.preventDefault();
      focusNext();
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      focusPrevious();
      break;
      
    case 'Home':
      event.preventDefault();
      focusFirst();
      break;
      
    case 'End':
      event.preventDefault();
      focusLast();
      break;
  }
};
```

### Screen Reader Pattern

```tsx
// Conteúdo visível apenas para screen readers
<span className={styles.visuallyHidden}>
  {t('component.srOnlyText')}
</span>

// Live region para anúncios
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// CSS para visuallyHidden
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

---

## 📋 Resumo - Quando Usar Cada Pattern

| Pattern | Quando Usar | Exemplo |
|---------|-------------|---------|
| **Packlet** | SEMPRE | Todos os componentes |
| **Compound Components** | Componente com múltiplas partes | GSCard, GSList, GSAccordion |
| **Polymorphic** | Elemento HTML flexível | GSButton, GSChip |
| **Custom Hooks** | Lógica reutilizável | useRipple, useDropdown |
| **Variant System** | SEMPRE (componentes visuais) | Todos os componentes UI |
| **Accessible by Default** | SEMPRE (componentes interativos) | Todos os componentes |

---

**Seguir estes padrões garante consistência e qualidade!** 🏗️

