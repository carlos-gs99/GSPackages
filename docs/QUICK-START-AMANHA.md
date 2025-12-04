# 🚀 QUICK START - SESSÃO 2025-12-04

**Status Atual:** 21 GS Packages migrados ✅ + 4 Base Packages ✅  
**CI/CD:** PASSING 100% ✅  
**Próximo:** Completar versões FULL dos componentes simplificados

---

## ⚡ COMEÇAR RÁPIDO

### 1. Abrir Projeto:
```bash
cd C:\Users\user\Desktop\New CliCloudLayouts\clicloud3TopbarSidebarFooter\GSPackages
```

### 2. Validar Estado:
```powershell
# Verificar se tudo está funcionando
npm run typecheck  # Deve passar
npm run lint       # Deve passar (0 errors)
npm run test       # Deve passar (31 tests)
npm run build      # Deve passar (25 packages)
```

### 3. Abrir Documentação:
- `docs/MASTER-MIGRATION-PLAN.md` - Plano completo
- `docs/QUICK-START-AMANHA.md` - Este ficheiro
- `docs/progress/session-2025-12-03.md` - O que foi feito ontem

---

## 🎯 TAREFAS DE HOJE (Prioridade)

### 🔥 MANHÃ (3-4h):

#### ✅ TAREFA 1: Restaurar Testes do gs-button (1h)
**Objetivo:** Criar testes Jest funcionais para gs-button

**Passos:**
1. Criar `gs-button/src/__tests__/GSButton.test.tsx`
2. Mockar dependencies:
   ```typescript
   jest.mock('@carlos-gs99/hooks', () => ({
     useTranslation: jest.fn(() => ({
       t: (key: string) => key,
       language: 'en',
       registerBundle: jest.fn(),
     })),
   }));
   
   jest.mock('@carlos-gs99/utils', () => ({
     useDebug: jest.fn(() => false),
     generateAriaAttributes: jest.fn(() => ({})),
     useFocusManagement: jest.fn(() => ({ focusRef: null })),
   }));
   
   jest.mock('@carlos-gs99/primitives', () => ({
     ButtonBase: ({ children, ...props }: any) => <button {...props}>{children}</button>,
   }));
   ```
3. Criar 10+ testes unitários
4. Criar `GSButton.a11y.test.tsx` (8+ testes)
5. Criar `GSButton.i18n.test.tsx` (3+ testes)

**Validar:**
```bash
cd gs-button
npm run test  # Deve passar todos os testes
cd ..
npm run test  # Deve passar 50+ testes agora
```

**Referência:** Usar `gs-icon/__tests__/GSIcon.jest.test.tsx` como template

---

#### ✅ TAREFA 2: Completar gs-chip (1h)
**Objetivo:** Adicionar polimorfismo `as` prop

**Passos:**
1. Abrir `gs-chip/src/types.ts`
2. Copiar tipos polimórficos de `gs-button/src/types.ts`:
   ```typescript
   export type GSChipProps<C extends React.ElementType = 'span'> = {
     as?: C;
     // ... resto das props
   } & Omit<React.ComponentPropsWithoutRef<C>, keyof GSChipPropsBase>;
   ```
3. Atualizar `gs-chip/src/GSChip.tsx`:
   ```typescript
   const GSChip = forwardRef(<C extends React.ElementType = 'span'>(
     { as, ...props }: GSChipProps<C>,
     ref: React.ForwardedRef<HTMLElement>
   ) => {
     const Component = as || 'span';
     return <Component ref={ref} {...props}>{children}</Component>;
   }) as <C extends React.ElementType = 'span'>(
     props: GSChipProps<C> & { ref?: React.ForwardedRef<HTMLElement> }
   ) => React.ReactElement;
   ```
4. Criar testes (10+ unitários, 8+ a11y, 3+ i18n)

**Validar:**
```bash
cd gs-chip
npm run build  # Deve passar
npm run test   # Deve passar todos os testes
```

---

#### ✅ TAREFA 3: Completar gs-alert (1h)
**Objetivo:** Integrar gs-icon para ícones de severity

**Passos:**
1. Adicionar `@carlos-gs99/gs-icon` a `peerDependencies` no `package.json`
2. Importar GSIcon: `import { GSIcon } from '@carlos-gs99/gs-icon';`
3. Criar mapa de ícones por severity:
   ```typescript
   const severityIcons = {
     success: 'check-circle',
     warning: 'alert-circle',
     error: 'close-circle',
     info: 'information',
   };
   ```
4. Adicionar ícone ao componente
5. Criar testes

**Validar:**
```bash
cd gs-alert
npm run build
npm run test
```

---

#### ✅ TAREFA 4: Validar e Commit (30min)
```powershell
# Simulação CI completa
npm run typecheck
npm run lint
npm run test
npm run build

# Se tudo passar:
git add .
git commit -m "feat: complete gs-button tests + gs-chip polymorphism + gs-alert icons

- ✅ gs-button: restored 20+ Jest tests (unit, a11y, i18n)
- ✅ gs-chip: added polymorphic 'as' prop support
- ✅ gs-alert: integrated gs-icon for severity icons
- ✅ All packages: validated CI simulation

Tests: 50+ → 90+ passing
"
git push

# Monitorar CI
# Abrir: https://github.com/carlos-gs99/GSPackages/actions
```

---

### 🔥 TARDE (3-4h):

#### ✅ TAREFA 5: Completar gs-tooltip (2h)
**Objetivo:** Integrar Popper para positioning avançado

**Passos:**
1. Importar `Popper` de `@carlos-gs99/primitives`
2. Implementar auto-flip positioning
3. Adicionar collision detection
4. Criar testes completos

**Features a adicionar:**
- Auto-flip quando não cabe na viewport
- Collision padding
- Arrow positioning
- Offset customizável

---

#### ✅ TAREFA 6: Completar gs-card (2h)
**Objetivo:** Adicionar funcionalidades avançadas

**Passos:**
1. Adicionar `collapsible` mode (state + animation)
2. Adicionar `image` support (top, left, right positions)
3. Adicionar `loading` state (integrar `gs-loading`)
4. Adicionar `interactive` (hover + onClick)
5. Integrar `gs-icon` para collapse icon
6. Criar testes completos

---

#### ✅ TAREFA 7: Validar e Commit (30min)
```powershell
# Mesma validação da manhã
npm run typecheck && npm run lint && npm run test && npm run build
git add .
git commit -m "feat: complete gs-tooltip Popper + gs-card advanced features"
git push
```

---

## 🛠️ FERRAMENTAS ÚTEIS

### Simulação CI (SEMPRE usar antes de commit):
```powershell
Write-Host "=== SIMULAÇÃO CI COMPLETA ===" -ForegroundColor Cyan
Write-Host "`n1. TypeCheck..." -ForegroundColor Yellow
npm run typecheck
Write-Host "`n2. Lint..." -ForegroundColor Yellow
npm run lint
Write-Host "`n3. Test..." -ForegroundColor Yellow
npm run test
Write-Host "`n4. Build..." -ForegroundColor Yellow
npm run build
```

### Build Individual:
```bash
cd gs-component-name
npm run build
npm run typecheck
npm run test  # Se houver testes
```

### Ver Todos os Packages:
```powershell
Get-ChildItem -Directory -Filter "gs-*" | Select-Object Name | Sort-Object Name
```

---

## 📋 REFERÊNCIAS RÁPIDAS

### Estrutura de Teste (Template):
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentName from '../ComponentName';

// Mocks
jest.mock('@carlos-gs99/hooks', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key,
    language: 'en',
    registerBundle: jest.fn(),
  })),
}));

jest.mock('@carlos-gs99/utils', () => ({
  useDebug: jest.fn(() => false),
}));

describe('ComponentName', () => {
  it('renders component', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('applies data-gs attribute', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toHaveAttribute('data-gs', 'ComponentName');
  });
  
  // ... mais testes
});
```

### Polimorfismo (Template):
```typescript
// types.ts
export type ComponentProps<C extends React.ElementType = 'div'> = {
  as?: C;
  // ... outras props
} & Omit<React.ComponentPropsWithoutRef<C>, keyof ComponentPropsBase>;

// Component.tsx
const Component = forwardRef(<C extends React.ElementType = 'div'>(
  { as, children, ...props }: ComponentProps<C>,
  ref: React.ForwardedRef<HTMLElement>
) => {
  const Component = as || 'div';
  return <Component ref={ref} {...props}>{children}</Component>;
}) as <C extends React.ElementType = 'div'>(
  props: ComponentProps<C> & { ref?: React.ForwardedRef<HTMLElement> }
) => React.ReactElement;
```

---

## 🚨 AVISOS IMPORTANTES

### ⚠️ NUNCA fazer push sem validar:
```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

### ⚠️ SEMPRE usar imports de packages:
```typescript
// ✅ CORRETO
import { useTranslation } from '@carlos-gs99/hooks';

// ❌ ERRADO
import { useTranslation } from '../../../../hooks/useTranslation';
```

### ⚠️ SEMPRE mockar dependencies em testes:
```typescript
// Sem mocks = testes falham!
jest.mock('@carlos-gs99/hooks', () => ({ ... }));
jest.mock('@carlos-gs99/utils', () => ({ ... }));
jest.mock('@carlos-gs99/primitives', () => ({ ... }));
```

---

## 🎯 META DO DIA

**Objetivo:** 6 componentes com versão FULL

✅ gs-button (testes restaurados)  
✅ gs-chip (polimorfismo)  
✅ gs-alert (gs-icon integration)  
✅ gs-tooltip (Popper integration)  
✅ gs-card (features avançadas)  
✅ gs-modal (se houver tempo)

**KPIs:**
- 📦 Packages: 21 → 21 (versões melhoradas)
- 🧪 Testes: 31 → 150+
- ✅ CI: PASSING
- 🎯 Coverage: 20% → 60%+

---

## 📞 LINKS ÚTEIS

- **Plano Completo:** `docs/MASTER-MIGRATION-PLAN.md`
- **GitHub Actions:** https://github.com/carlos-gs99/GSPackages/actions
- **Sessão Anterior:** `docs/progress/session-2025-12-03.md`

---

**BOM TRABALHO!** 🚀💪

Qualquer dúvida, consultar o `MASTER-MIGRATION-PLAN.md` que tem TODOS os detalhes!

