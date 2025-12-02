# ⚠️ Utils Excluídos do @globalsoft/utils

## 🎯 Razão

Alguns utils do projeto original têm **dependências circulares** e foram temporariamente excluídos do export de `@globalsoft/utils`.

---

## 📋 Utils Excluídos

### 1. `perfObserverUtils.ts`

**Razão:** Usa `import.meta.env` que não é compatível com tsup DTS build

```typescript
if (import.meta.env.MODE !== 'development') return;
```

**Problema:** TypeScript não reconhece `import.meta.env` sem types específicos de Vite.

**Solução futura:**
- Remover dependência em import.meta
- Usar process.env ou outra abordagem
- Ou aceitar como Vite-specific utility

### 2. `classNameUtils.ts`

**Razão:** Importa types de `'../lib/types/design'`

```typescript
import { GSButtonVariant, GSButtonColor, GSButtonSize } from '../lib/types/design';
```

**Problema:** Estes types não existem em `@globalsoft/utils` isoladamente.

**Solução futura:**
- Mover types para `@globalsoft/theme` ou criar package de types
- Ou remover dependência e tornar util genérico

---

### 3. `renderUtils.tsx`

**Razão:** Importa componentes UI

```typescript
import { GSChip } from '../components/ui';
import { GSIcon } from '../components/ui/GSIcon';
```

**Problema:** Utils não podem depender de componentes (dependência circular).

**Solução futura:**
- Mover para package separado `@globalsoft/component-helpers`
- Ou aceitar como peer dependency e documentar

---

## 🔄 Status Atual

**Exports ativos (17 utils):**
- ✅ debugUtils
- ✅ accessibilityUtils
- ✅ a11yDev
- ✅ arrayUtils
- ✅ dateUtils
- ✅ dotnetDateUtils
- ✅ dateParsers
- ✅ stringUtils
- ✅ validationUtils
- ✅ domUtils
- ✅ tableUtils
- ✅ fieldMappers
- ✅ navigationUtils
- ✅ windowUtils
- ✅ commonUtils
- ✅ chartExport
- ✅ testUtils

**Exports desabilitados (3 utils):**
- ❌ perfObserverUtils (import.meta.env incompatível)
- ❌ classNameUtils (precisa types)
- ❌ renderUtils (precisa componentes)

---

## 🎯 Próximos Passos

Quando migrares mais packages, podes:
1. Criar `@globalsoft/component-utils` para utils que precisam de componentes
2. Ou mover types para `@globalsoft/theme`
3. Reativar exports

Por agora, `@globalsoft/utils` está **limpo e sem dependências circulares**! ✅

---

*Utils excluídos: 3/20 (85% disponíveis - 17 utils funcionais)*

