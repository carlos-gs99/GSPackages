# @gs-style/hooks

> ⚡ React hooks for GS Style components - translation, dropdowns, autocomplete, performance monitoring and more

## Visão Geral

O package `@gs-style/hooks` fornece custom React hooks reutilizáveis para funcionalidades comuns nos componentes GS Style. Todos os hooks seguem as regras do React e incluem TypeScript types completos.

## 📦 Instalação

```bash
npm install @gs-style/hooks
# ou
yarn add @gs-style/hooks
# ou
pnpm add @gs-style/hooks
```

## 🚀 Quick Start

```typescript
import { useTranslation, useDropdown, useToggle } from '@gs-style/hooks';

// Translation
const { t } = useTranslation('myNamespace');

// Dropdown
const { isOpen, toggle, close } = useDropdown();

// Toggle
const [isActive, toggleActive] = useToggle(false);
```

---

## 📚 Hooks Disponíveis

### 🌐 Translation & i18n

#### `useTranslation`
Hook para internacionalização integrado com react-i18next.

```typescript
import { useTranslation } from '@gs-style/hooks';

const MyComponent = () => {
  const { t, i18n } = useTranslation('gsbutton');
  
  return <button>{t('label.save', 'Save')}</button>;
};
```

**Features:**
- ✅ Namespace isolation
- ✅ Fallback values
- ✅ Language switching
- ✅ TypeScript support

---

### 🎯 Dropdown & Menu

#### `useDropdown`
Gerencia estado e comportamento de dropdowns.

```typescript
import { useDropdown } from '@gs-style/hooks';

const Dropdown = () => {
  const { isOpen, toggle, close, open } = useDropdown();
  
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Menu content</div>}
    </>
  );
};
```

**Features:**
- ✅ Auto close on outside click
- ✅ Keyboard navigation (ESC)
- ✅ Accessibility

#### `useMenuHover`
Deteta hover em menus para mostrar submenus.

#### `useMenuPositioning`
Calcula posição inteligente de menus (evita sair do viewport).

#### `useSubmenuPosition`
Posiciona submenus de forma responsiva.

---

### 🔍 Autocomplete

#### `useAutocompleter`
Gerencia estado e lógica de componentes autocomplete.

```typescript
import { useAutocompleter } from '@gs-style/hooks';

const MyAutocomplete = () => {
  const {
    inputValue,
    setInputValue,
    suggestions,
    loading,
    error
  } = useAutocompleter({
    fetchSuggestions: async (query) => {
      const response = await fetch(`/api/search?q=${query}`);
      return response.json();
    }
  });
  
  return (
    <input 
      value={inputValue} 
      onChange={(e) => setInputValue(e.target.value)} 
    />
  );
};
```

**Features:**
- ✅ Debounced search
- ✅ Loading states
- ✅ Error handling
- ✅ Keyboard navigation

---

### 🎛️ State Management

#### `useToggle`
Toggle simples para estados booleanos.

```typescript
import { useToggle } from '@gs-style/hooks';

const Component = () => {
  const [isOpen, toggle, setIsOpen] = useToggle(false);
  
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </>
  );
};
```

#### `useAutoSave`
Auto-save de formulários com debounce.

```typescript
import { useAutoSave } from '@gs-style/hooks';

const Form = () => {
  const { state, lastSaved } = useAutoSave({
    data: formData,
    onSave: async (data) => {
      await api.save(data);
    },
    delay: 2000
  });
  
  return <div>Status: {state} | Saved: {lastSaved}</div>;
};
```

---

### 📏 Viewport & Layout

#### `useViewPort`
Deteta tamanho do viewport e breakpoints.

```typescript
import { useViewPort } from '@gs-style/hooks';

const ResponsiveComponent = () => {
  const { width, height, isMobile, isTablet, isDesktop } = useViewPort();
  
  return isMobile ? <MobileView /> : <DesktopView />;
};
```

#### `usePageSize`
Gerencia tamanho de página para tabelas.

```typescript
import { usePageSize } from '@gs-style/hooks';

const Table = () => {
  const [pageSize, setPageSize] = usePageSize(10);
  
  return <select value={pageSize} onChange={(e) => setPageSize(+e.target.value)}>
    <option value={10}>10</option>
    <option value={25}>25</option>
    <option value={50}>50</option>
  </select>;
};
```

---

### ⚡ Performance

#### `usePerformance`
Monitoring de performance de componentes.

```typescript
import { usePerformance } from '@gs-style/hooks';

const HeavyComponent = () => {
  const perf = usePerformance('HeavyComponent', true);
  
  useEffect(() => {
    perf.mark('data-fetch-start');
    fetchData().then(() => {
      perf.mark('data-fetch-end');
      perf.measure('Data Fetch', 'data-fetch-start', 'data-fetch-end');
    });
  }, []);
  
  return <div>...</div>;
};
```

---

### 🎨 UI Helpers

#### `useOutlineToggle`
Toggle de outlines para acessibilidade.

#### `useFavorites`
Gerencia lista de favoritos com localStorage.

```typescript
import { useFavorites } from '@gs-style/hooks';

const Component = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites('myApp');
  
  return (
    <button onClick={() => addFavorite({ id: '1', name: 'Item' })}>
      {isFavorite('1') ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};
```

#### `useErrorHandler`
Tratamento consistente de erros.

---

## 📋 Lista Completa de Hooks

| Hook | Descrição | Categoria |
|------|-----------|-----------|
| `useTranslation` | i18n e traduções | Translation |
| `useDropdown` | Estado de dropdown | Dropdown/Menu |
| `useMenuHover` | Hover em menus | Dropdown/Menu |
| `useMenuPositioning` | Posicionamento de menus | Dropdown/Menu |
| `useMenuViewportDetection` | Detecção de viewport | Dropdown/Menu |
| `useSubmenuPosition` | Posição de submenus | Dropdown/Menu |
| `useAutocompleter` | Autocomplete logic | Form |
| `useToggle` | Toggle booleano | State |
| `useAutoSave` | Auto-save forms | State |
| `useViewPort` | Viewport size | Layout |
| `usePageSize` | Table page size | Table |
| `usePerformance` | Performance monitoring | Performance |
| `useOutlineToggle` | Accessibility outlines | UI |
| `useFavorites` | Favorites management | UI |
| `useErrorHandler` | Error handling | Error |

---

## 🎯 Padrões de Uso

### Pattern 1: Hook com Estado
```typescript
const [value, setValue] = useMyHook(initialValue);
```

### Pattern 2: Hook com Objeto
```typescript
const { data, loading, error, refetch } = useMyHook(options);
```

### Pattern 3: Hook com Callbacks
```typescript
const handler = useMyHook(() => {
  // callback
});
```

---

## 🔧 Desenvolvimento

### Criar Novo Hook

1. **Criar ficheiro** em `src/hooks/useMyHook.ts`
2. **Seguir convenções React** - começar com `use`
3. **TypeScript types** completos
4. **JSDoc** com exemplos
5. **Exportar** em `index.ts`
6. **Documentar** neste README
7. **Testes** quando aplicável

### Template de Hook

```typescript
import { useState, useEffect } from 'react';

/**
 * Descrição do hook
 * @param param - Descrição do parâmetro
 * @returns Descrição do retorno
 * 
 * @example
 * const result = useMyHook('value');
 */
export const useMyHook = (param: string) => {
  const [state, setState] = useState<string>(param);
  
  useEffect(() => {
    // effect logic
  }, [param]);
  
  return { state, setState };
};
```

---

## 📦 Exports

Todos os hooks estão disponíveis via export centralizado:

```typescript
// Import múltiplos
import { useTranslation, useDropdown, useToggle } from '@gs-style/hooks';

// Import individual (tree-shaking)
import { useTranslation } from '@gs-style/hooks/useTranslation';
```

---

## 🎯 Melhores Práticas

### ✅ DOs
- Seguir regras do React Hooks
- TypeScript types completos
- JSDoc com exemplos
- Tratar edge cases
- Cleanup em useEffect
- Memoização quando necessário

### ❌ DON'Ts
- Chamar hooks condicionalmente
- Hooks em loops
- Hooks em callbacks
- Side effects sem cleanup
- Ignorar dependencies array

---

## 📚 Dependências

**Peer Dependencies:**
- `react` ^18.0.0
- `react-i18next` ^15.0.0 (apenas para `useTranslation`)

**Sem dependências externas** - apenas React e tipos.

---

## 🤝 Contribuir

Para adicionar novos hooks, consulte:
- **[Guia de Desenvolvimento](../../docs/indices/development-guide.md)**
- **[Padrões de Hooks](../../docs/indices/component-patterns.md#custom-hooks)**

---

*Package: @gs-style/hooks v1.0.0*

