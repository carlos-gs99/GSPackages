# 🎯 PLANO MASTER DE MIGRAÇÃO - GRAFO DE DEPENDÊNCIAS

**Data:** 2025-12-03  
**Status:** PLANEJAMENTO COMPLETO  
**Objetivo:** Migrar TODOS os componentes GS com VERSÕES COMPLETAS

---

## 📊 RESUMO EXECUTIVO

| Categoria | Total | Migrados | Pendentes | % |
|-----------|-------|----------|-----------|---|
| **Base** | 4 | 4 | 0 | 100% ✅ |
| **Wave 0** | 11 | 11 | 0 | 100% ✅ |
| **Wave 1** | 5 | 4 | 1 | 80% 🔥 |
| **Wave 2** | 8 | 0 | 8 | 0% ⏳ |
| **Wave 3** | 6 | 0 | 6 | 0% ⏳ |
| **Wave 4** | 5+ | 0 | 5+ | 0% ⏳ |
| **TOTAL** | **39+** | **19** | **20+** | **49%** |

---

## 🌊 WAVE 0 - SEM DEPENDÊNCIAS GS (11) ✅ 100%

**Status:** COMPLETO  
**Features:** Versões simplificadas publicadas

### ✅ Migrados (11):
1. gs-icon ✅ (v1.0.0)
2. gs-badge ✅ (v1.0.0)
3. gs-spinner ✅ (v1.0.0)
4. gs-skeleton ✅ (v1.0.0)
5. gs-chip ✅ (v1.0.0) ⚠️ **FALTA: polimorfismo `as` prop**
6. gs-loading ✅ (v1.0.0)
7. gs-label ✅ (v1.0.0)
8. gs-divider ✅ (v1.0.0)
9. gs-avatar ✅ (v1.0.0)
10. gs-progress ✅ (v1.0.0)
11. gs-joytypography 🔴 **NÃO MIGRADO**

**Nota:** Todos standalone, sem deps GS components

---

## 🌊 WAVE 1 - DEPENDEM APENAS DE WAVE 0 (5) 🔥 80%

**Deps:** Apenas components da Wave 0

### ✅ Migrados (4):
1. gs-button ✅ (v1.0.0)
2. gs-alert ✅ (v1.0.0) ⚠️ **SIMPLIFICADO (sem GSIcon)**
3. gs-tooltip ✅ (v1.0.0) ⚠️ **SIMPLIFICADO (sem positioning avançado)**
4. gs-toast ✅ (v1.0.0) ⚠️ **EM PROGRESSO - SIMPLIFICADO**

### 🔴 Pendentes (1):
5. **gs-list** - Standalone
   - Deps: Nenhuma
   - Complexidade: Baixa
   - ETA: 30min

---

## 🌊 WAVE 2 - DEPENDEM DE WAVES 0+1 (8) ⏳ 25%

**Deps:** Components das Waves 0 e 1

### ✅ Migrados (2):
1. gs-modal ✅ (v1.0.0) ⚠️ **SIMPLIFICADO**
   - **FALTA:** Confirm mode, animations completas, GSButton/GSIcon deps
2. gs-card ✅ (v1.0.0) ⚠️ **MUITO SIMPLIFICADO**
   - **FALTA:** Collapsible, image, loading, interactive, GSIcon/GSLoading/GSTooltip deps

### 🔴 Pendentes (6):

3. **gs-input** 🔴 **CRÍTICO**
   - Deps: GSIcon, GSTooltip, GSLoading, GSFormControlWrapper, ButtonBase
   - Sub: GSInputGroup, PhoneCountryCodeSelect (depende de GSSelect!)
   - Features: Password strength, masks, debounce, copy, floating, validation
   - Complexidade: ALTA
   - Linhas: 1072
   - **ETA: 2-3h COMPLETO**
   - **Status atual:** v1.0.0 MUITO simplificado

4. **gs-checkbox** 🔴 **CRÍTICO**
   - Deps: GSSpinner (✅), GSTooltip (✅), GSIcon (✅), GSLoading
   - Sub: GSCheckboxGroup, GSCheckboxParent, GSCheckboxField
   - Features: Group, parent-child, indeterminate, validation, ripple
   - Complexidade: ALTA
   - Linhas: 366 + partials
   - **ETA: 1.5-2h COMPLETO**
   - **Status atual:** v1.0.0 simplificado

5. **gs-select** 🔴 **CRÍTICO**
   - Deps: GSIcon (✅)
   - Features: Autocomplete, multi-select, search, grupos, async loading
   - Complexidade: MUITO ALTA
   - Linhas: ~800
   - **ETA: 2-3h COMPLETO**
   - **Status:** NÃO MIGRADO

6. **gs-radio**
   - Deps: Similar a GSCheckbox
   - Features: RadioGroup, ripple, validation
   - Complexidade: MÉDIA
   - **ETA: 1h**

7. **gs-switch**
   - Deps: GSLoading (?)
   - Features: Toggle, loading, validation
   - Complexidade: BAIXA-MÉDIA
   - **ETA: 45min**

8. **gs-textarea**
   - Deps: Similar a GSInput
   - Features: Auto-resize, char count, validation
   - Complexidade: MÉDIA
   - **ETA: 1h**

---

## 🌊 WAVE 3 - DEPENDEM DE WAVES 0+1+2 (6) ⏳ 17%

### ✅ Migrados (1):
1. gs-tabs ✅ (v1.0.0) ⚠️ **SIMPLIFICADO**
   - **FALTA:** Sliding indicator, scroll buttons, ripple, gradient, GSIcon/GSButton

### 🔴 Pendentes (5):

2. **gs-formcontrolwrapper**
   - Deps: Usado por outros (GSCheckbox, GSInput)
   - Complexidade: BAIXA
   - **ETA: 30min**
   - **Nota:** DEVE ser migrado ANTES de corrigir Input/Checkbox!

3. **gs-nav**
   - Deps: GSIcon, GSButton, tooltips, dropdowns
   - Complexidade: MUITO ALTA
   - Linhas: ~500+
   - **ETA: 2-3h**

4. **gs-navlist**
   - Deps: GSIcon, múltiplos sub-components
   - Complexidade: MUITO ALTA
   - Linhas: ~800+
   - **ETA: 3h**

5. **gs-breadcrumb**
   - Deps: GSIcon
   - Complexidade: BAIXA
   - **ETA: 30min**

6. **gs-dropdown-simple**
   - Deps: GSButton, GSIcon, GSList
   - Complexidade: MÉDIA
   - **ETA: 1h**

---

## 🌊 WAVE 4 - COMPONENTES COMPLEXOS (5+) ⏳ 0%

### 🔴 Todos Pendentes:

1. **gs-autocompleter** 🔴 **COMPLEXO**
   - Deps: GSInput, GSLoading, GSIcon
   - Features: Debounce, search, async, virtualization
   - Complexidade: MUITO ALTA
   - **ETA: 2-3h**

2. **gs-datepicker-native** 🔴 **COMPLEXO**
   - Deps: GSInput, GSIcon, muitos hooks
   - Features: Calendar, date navigation, modes, i18n dates
   - Complexidade: MUITO ALTA
   - Linhas: ~1000+
   - **ETA: 3-4h**

3. **gs-imageupload-native** 🔴 **COMPLEXO**
   - Deps: GSIcon, GSLoading, GSButton, muitos
   - Features: Dropzone, crop, webcam, preview, múltiplas
   - Complexidade: EXTREMA
   - Linhas: ~1500+
   - **ETA: 4-5h**

4. **gs-chart** 🔴 **COMPLEXO**
   - Deps: GSIcon, GSDropdown, GSLoading, chart library
   - Complexidade: ALTA
   - **ETA: 2-3h**

5. **gs-table** 🔴 **MUITO COMPLEXO**
   - Deps: @tanstack/react-table, GSIcon, GSButton, GSLoading, muitos
   - Features: Server-side, sorting, filtering, pagination, virtualization
   - Complexidade: EXTREMA
   - **ETA: 4-6h**

---

## 🚨 COMPONENTES COM BLOQUEIOS

### ❌ NÃO MIGRÁVEL (deps externas UI):
- **GSOffcanvas** - Usa @base-ui-components/react/dialog ❌

### ⚠️ DEPS EXTERNAS ACEITÁVEIS:
- **gs-imageupload-native** - FilePond (headless utility)
- **gs-table** - @tanstack/react-table (headless utility)
- **gs-datepicker-native** - date-fns (utility)
- **PhoneCountryCodeSelect** - react-flagpack (flags only)

---

## 📋 PLANO DE CORREÇÃO - VERSÕES COMPLETAS

### 🎯 PRIORIDADE 1 - CRÍTICOS (Corrigir AGORA)

**Ordem sugerida:**

1. **gs-formcontrolwrapper** (30min)
   - ✅ Sem deps GS
   - Necessário para Input/Checkbox

2. **gs-input COMPLETO** (2-3h)
   - Password strength completo
   - Masks PT completos
   - Debounce, copy, floating
   - GSIcon, GSTooltip, GSLoading deps
   - **SEM** PhoneCountryCodeSelect (depende de GSSelect)
   - Bump: 1.0.0 → 1.1.0

3. **gs-checkbox COMPLETO** (1.5-2h)
   - GSTooltip, GSIcon, GSLoading integration
   - GSCheckboxField (React Hook Form)
   - GSCheckboxParent
   - CheckboxIndicator com GSLoading
   - Ripple completo
   - Bump: 1.0.0 → 1.1.0

4. **gs-select COMPLETO** (2-3h)
   - Autocomplete, multi-select
   - Search/filter
   - Grupos
   - Async loading
   - GSIcon integration
   - Novo: v1.0.0

5. **gs-input v1.2.0** - Adicionar PhoneCountryCodeSelect
   - Agora que GSSelect existe
   - Bump: 1.1.0 → 1.2.0

---

### 🎯 PRIORIDADE 2 - IMPORTANTES

6. **gs-card COMPLETO** (2h)
   - Collapsible/expandable
   - Image support
   - Loading overlay
   - Interactive/clickable
   - GSIcon, GSLoading, GSTooltip deps
   - Bump: 1.0.0 → 1.1.0

7. **gs-modal COMPLETO** (1.5h)
   - Confirm mode completo
   - Animations (fade, slide, zoom)
   - GSButton, GSIcon, GSJoyTypography deps
   - Bump: 1.0.0 → 1.1.0

8. **gs-tabs COMPLETO** (2h)
   - Sliding indicator
   - Scroll buttons
   - Ripple effect
   - Gradient
   - GSIcon, GSButton deps
   - Bump: 1.0.0 → 1.1.0

9. **gs-tooltip COMPLETO** (1h)
   - Follow cursor
   - Advanced positioning
   - Scroll handling
   - Bump: 1.0.0 → 1.1.0

10. **gs-chip COMPLETO** (30min)
    - Polimorfismo `as` prop
    - Bump: 1.0.0 → 1.1.0

---

### 🎯 PRIORIDADE 3 - NOVOS COMPONENTES

11. **gs-radio** (1h)
12. **gs-switch** (45min)
13. **gs-textarea** (1h)
14. **gs-list** (45min)
15. **gs-joytypography** (30min)
16. **gs-breadcrumb** (30min)
17. **gs-dropdown-simple** (1h)

---

## ⏱️ ESTIMATIVAS TOTAIS

### Correções (Versões Completas):
- **Críticos (5):** 9-12h
- **Importantes (5):** 7-8h
- **Novos Wave 1-3 (7):** 5-6h

**SUBTOTAL URGENTE:** 21-26h

### Componentes Complexos (Wave 4):
- **Wave 4 (5+):** 15-20h

**TOTAL COMPLETO:** 36-46h

---

## 🎯 ESTRATÉGIA RECOMENDADA

### Sessão Atual (~5h restantes):
1. ✅ gs-formcontrolwrapper (30min)
2. ✅ gs-input COMPLETO (2h)
3. ✅ gs-checkbox COMPLETO (1.5h)
4. ✅ gs-chip COMPLETO (30min)
5. ✅ Commit e validar (30min)

**Total:** ~5h

### Próximas Sessões:
**Sessão 2 (8h):** gs-select, gs-card, gs-modal, gs-tabs completos  
**Sessão 3 (8h):** Novos componentes Wave 1-3  
**Sessão 4 (10h):** Wave 4 complexos

---

## 📝 COMPONENTES COM PROBLEMAS IDENTIFICADOS

### ⚠️ Simplificados (necessitam correção):
- gs-chip (remove polimorfismo)
- gs-checkbox (remove GSTooltip, GSIcon, Field)
- gs-input (remove 80% features!)
- gs-modal (remove confirm mode, animations)
- gs-tabs (remove indicator, scroll, ripple)
- gs-card (remove quase tudo!)
- gs-tooltip (remove follow cursor, positioning)
- gs-toast (em progresso, simplificado)

### ❌ Bloqueados:
- gs-offcanvas (Base UI Dialog - deps UI externa!)

---

## 🔄 ORDEM DE MIGRAÇÃO CORRETA

```
FOUNDATION (4) ✅
└─ utils, hooks, primitives, theme

WAVE 0 - STANDALONE (11) ✅
└─ icon, badge, spinner, skeleton, chip*, loading, label, divider, avatar, progress, joytypography

WAVE 1 - DEPS WAVE 0 (5)
├─ button ✅
├─ alert* ✅
├─ tooltip* ✅
├─ toast* (em progresso)
└─ list

WAVE 2 - DEPS WAVES 0+1 (8)
├─ formcontrolwrapper 🔴 URGENTE!
├─ input* 🔴 CRÍTICO!
├─ checkbox* 🔴 CRÍTICO!
├─ select 🔴 CRÍTICO!
├─ radio
├─ switch
├─ textarea
└─ card*

WAVE 3 - DEPS WAVES 0+1+2 (6)
├─ modal*
├─ tabs*
├─ nav
├─ navlist
├─ breadcrumb
└─ dropdown-simple

WAVE 4 - COMPLEXOS (5+)
├─ autocompleter
├─ datepicker-native
├─ imageupload-native
├─ chart
└─ table
```

**Legenda:**  
✅ = Migrado  
* = Simplificado (precisa correção)  
🔴 = Alta prioridade

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### AGORA (próximas 5h):

1. **gs-formcontrolwrapper** (30min)
   - Migrar completo
   - Zero deps GS
   - Usado por Input/Checkbox

2. **gs-input v1.1.0 COMPLETO** (2h)
   - Copiar 1072 linhas completas
   - passwordStrength.ts completo
   - GSInputGroup completo
   - Todas masks, debounce, copy, floating
   - Deps: GSIcon, GSTooltip, GSLoading, GSFormControlWrapper
   - **SEM PhoneCountryCodeSelect** (esperar GSSelect)

3. **gs-checkbox v1.1.0 COMPLETO** (1.5h)
   - Copiar código original completo
   - GSCheckboxField, GSCheckboxGroup, GSCheckboxParent
   - CheckboxIndicator com GSLoading
   - Tooltips e icons completos
   - Ripple completo

4. **gs-chip v1.1.0 COMPLETO** (30min)
   - Adicionar polimorfismo `as` prop
   - Tipos complexos

---

## 💾 VERSIONING STRATEGY

**Para componentes já publicados:**
- v1.0.0 (atual simplificado) → v1.1.0 (completo)
- Breaking changes → v2.0.0

**Para novos componentes:**
- Publicar direto v1.0.0 completo

---

## 📊 MÉTRICAS DE SUCESSO

| Métrica | Meta |
|---------|------|
| **Componentes migrados** | 39+ |
| **Versões completas** | 100% |
| **Features mantidas** | 95%+ |
| **Deps UI externas** | 0 (exceto headless utils) |
| **CI/CD verde** | 100% |
| **Testes** | 80%+ coverage |

---

**PRONTO PARA COMEÇAR?**

Começamos com **gs-formcontrolwrapper**? (necessário para Input/Checkbox)

