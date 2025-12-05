# 🧪 Plano de Testes - GSPackages

**Data de Criação:** 2025-12-04  
**Status:** Em Progresso (5/42 componentes = 12%)  
**Objetivo:** 100% dos componentes com testes unit + a11y + i18n

---

## 📊 Resumo Executivo

| Categoria | Status | Progresso |
|-----------|--------|-----------|
| **Com Testes** | ✅ 4 componentes | icon, badge, button, chip |
| **Em Criação** | 🔄 1 componente | spinner (validação pendente) |
| **Sem Testes** | ⏳ 37 componentes | 88% restante |
| **Meta Coverage** | 🎯 80%+ por componente | WCAG AA compliance |

---

## 🎯 Estratégia de Testes por Burst

### ✅ **Componentes COMPLETOS (7/42 = 17%)**
1. ✅ gs-icon
2. ✅ gs-badge
3. ✅ gs-button
4. ✅ gs-chip
5. ✅ gs-spinner (40 testes)
6. ✅ gs-loading (62 testes)
7. ✅ gs-list (45 testes, 6 axe skipped)

---

### ✅ **BURST 1 - Core Components (COMPLETO!)**
**Prioridade:** CRÍTICA  
**Tempo Real:** ~1.5h  
**Status:** ✅ 100% (3/3)

**Total:** 147 testes criados! 🎉

---

### 🟠 **BURST 2 - Layout Components**
**Prioridade:** ALTA  
**Tempo Estimado:** 2h  
**Status:** 0% (0/4)

8. ⏳ gs-label (~15min)
9. ⏳ gs-divider (~15min)
10. ⏳ gs-avatar (~25min)
11. ⏳ gs-skeleton (~20min)

---

### 🟡 **BURST 3 - UI Components**
**Prioridade:** ALTA  
**Tempo Estimado:** 2.5h  
**Status:** 0% (0/4)

12. ⏳ gs-progress (~30min)
13. ⏳ gs-alert (~35min)
14. ⏳ gs-card (~45min)
15. ⏳ gs-tooltip (~40min)

---

### 🟢 **BURST 4 - Interactive Components**
**Prioridade:** ALTA  
**Tempo Estimado:** 2.5h  
**Status:** 0% (0/4)

16. ⏳ gs-modal (~45min)
17. ⏳ gs-toast (~40min)
18. ⏳ gs-drawer (~35min)
19. ⏳ gs-accordion (~35min)

---

### 🔵 **BURST 5 - Form Components**
**Prioridade:** MÉDIA  
**Tempo Estimado:** 3h  
**Status:** 0% (0/5)

20. ⏳ gs-select (~40min)
21. ⏳ gs-radio (~40min)
22. ⏳ gs-switch (~35min)
23. ⏳ gs-textarea (~45min)
24. ⏳ gs-input (~45min) - Verificar se já tem testes

---

### 🟣 **BURST 6 - Advanced Components**
**Prioridade:** MÉDIA  
**Tempo Estimado:** 3.5h  
**Status:** 0% (0/6)

25. ⏳ gs-table (~1h) - Complexo
26. ⏳ gs-autocomplete (~40min)
27. ⏳ gs-breadcrumbs (~30min)
28. ⏳ gs-stepper (~30min)
29. ⏳ gs-pagination (~25min)
30. ⏳ gs-tabs (~35min) - Verificar se já tem testes

---

### ⚪ **BURST 7 - Tier 3 & 4 Components**
**Prioridade:** BAIXA  
**Tempo Estimado:** 3h  
**Status:** 0% (0/8)

31. ⏳ gs-dropdown (~30min)
32. ⏳ gs-checkbox (~40min) - Verificar se já tem testes
33. ⏳ gs-rating (~30min)
34. ⏳ gs-slider (~35min)
35. ⏳ gs-tree (~40min)
36. ⏳ gs-timepicker (~15min)
37. ⏳ gs-colorpicker (~15min)
38. ⏳ gs-datepicker (~20min)

---

## 📋 Template de Teste (Padrão Estabelecido)

Cada componente deve ter **3 ficheiros de teste**:

### 1️⃣ `Component.test.tsx` - Unit Tests
```typescript
✅ Rendering
  - Should render with default props
  - Should render with custom className
  
✅ Size/Color/Variant Tests
  - Test all variants systematically
  
✅ Props & States
  - All boolean props (disabled, loading, etc)
  - All functional props (onClick, onChange, etc)
  
✅ Edge Cases
  - Empty states
  - Error states
  - Loading states
```

### 2️⃣ `Component.a11y.test.tsx` - Accessibility
```typescript
✅ ARIA Attributes
  - Correct roles
  - Labels and descriptions
  - Live regions
  
✅ Keyboard Navigation
  - Tab, Enter, Space, Arrow keys
  - Escape key
  
✅ Screen Reader Support
  - Announcements
  - Hidden text
  
✅ Axe Tests
  - No violations for all variants
  - Color contrast
  - Focus management
```

### 3️⃣ `Component.i18n.test.tsx` - Internationalization
```typescript
✅ English Translations
  - All UI text in English
  
✅ Portuguese Translations
  - All UI text in Portuguese
  
✅ Language Switching
  - Dynamic language change
  - Maintains functionality
  
✅ Fallback Behavior
  - Missing translations
  - Unsupported languages
  
✅ Translation Registration
  - Namespaces registered
  - No duplication
```

---

## 🎯 Metas de Qualidade

| Métrica | Target | Atual |
|---------|--------|-------|
| **Coverage** | 80%+ por componente | ~10% global |
| **A11y** | WCAG AA (100%) | Pendente |
| **i18n** | EN + PT (100%) | Implementado |
| **Performance** | < 50ms render | Não medido |

---

## 📊 Progresso por Sessão

### Sessão 1 - 2025-12-04
- ✅ Criados testes para gs-spinner (unit, a11y, i18n)
- ✅ Estabelecido template de testes
- ✅ Documentado plano completo (este ficheiro)
- **Progresso:** 5/42 = 12%

### Próximas Sessões
- **Sessão 2:** Completar BURST 1 (gs-loading, gs-list)
- **Sessão 3:** BURST 2 (layout components)
- **Sessão 4-5:** BURST 3-4 (UI + interactive)
- **Sessão 6-7:** BURST 5-6 (forms + advanced)
- **Sessão 8:** BURST 7 (Tier 3-4)

**ETA Total:** 8-10 sessões (~20-25h)

---

## 🚀 Como Continuar

1. **Validar testes do gs-spinner:**
   ```bash
   cd GSPackages
   npm run build
   cd ..
   npm test -- gs-spinner
   ```

2. **Criar testes do próximo componente:**
   - Copiar template dos testes do gs-spinner
   - Adaptar para o componente específico
   - Executar e validar

3. **Atualizar este ficheiro:**
   - Marcar componente como ✅
   - Atualizar % de progresso
   - Registar tempo real vs estimado

---

**Mantém o foco! Pequenos bursts, progresso contínuo!** 🎯

