## ✅ Checklist de Estado dos Packages

> **ÚLTIMA ATUALIZAÇÃO:** 2025-12-06 (READMEs criados + testes verificados + wrappers promovidos a FULL)  
> **TOTAL DE PACKAGES:** 42 (100% migrados! 🎉)  
> **STATUS CI/CD:** ✅ 100% Passing (126 builds)  
> **TESTES:** 🟢 38/38 componentes GS (100%) - ✅ COMPLETO! 🎉

> Lista simples para sabermos **o que já está completo**, o que ainda está em versão mínima e **o que falta migrar**.  
> Atualizar este ficheiro sempre que completarmos um componente.

---

### 1. Base packages (fundação)

- [x] `@carlos-gs99/utils` – FULL (utils estáveis e usados em todos os GS)
- [x] `@carlos-gs99/hooks` – FULL (hooks core, dropdown, translation, etc.)
- [x] `@carlos-gs99/primitives` – FULL (inclui `Popper` avançado)
- [x] `@carlos-gs99/theme` – FULL (tokens + ThemeProvider)

---

### 2. GS Components – migrados em versão FULL / avançada

- [x] `@carlos-gs99/gs-icon` – FULL + testes
- [x] `@carlos-gs99/gs-badge` – FULL + testes
- [x] `@carlos-gs99/gs-spinner` – FULL
- [x] `@carlos-gs99/gs-skeleton` – FULL
- [x] `@carlos-gs99/gs-loading` – FULL
- [x] `@carlos-gs99/gs-label` – FULL
- [x] `@carlos-gs99/gs-divider` – FULL
- [x] `@carlos-gs99/gs-avatar` – FULL
- [x] `@carlos-gs99/gs-progress` – FULL
- [x] `@carlos-gs99/gs-list` – FULL (compound, i18n, a11y)
- [x] `@carlos-gs99/gs-select` – FULL (rich select; falta apenas re-ligar GSTooltip como nice-to-have)
- [x] `@carlos-gs99/gs-button` – FULL (polimorfismo, estados, i18n, testes unit/a11y/i18n)
- [x] `@carlos-gs99/gs-chip` – FULL (polimorfismo `as`, deletable, ícones, testes)
- [x] `@carlos-gs99/gs-alert` – FULL (GSIcon severity + close, i18n, debug)
- [x] `@carlos-gs99/gs-tooltip` – FULL (Popper avançado: auto-flip, collision, 12 placements)
- [x] `@carlos-gs99/gs-toast` – FULL (GSIcon severity auto-detect, animated progress bar, debug, i18n)
- [x] `@carlos-gs99/gs-modal` – FULL (confirm mode com GSButton, animações entrada/saída, GSIcon close, debug)
- [x] `@carlos-gs99/gs-checkbox` – FULL (GSCheckboxGroup, indeterminate, ripple, custom hooks, validation completa)
- [x] `@carlos-gs99/gs-input` – FULL (GSIcon integration, debounce, copy button, floating label, validation icons, testes completos)
- [x] `@carlos-gs99/gs-tabs` – FULL (keyboard navigation completa, orientation, variants, keepMounted, icons, debug)
- [x] `@carlos-gs99/gs-radio` – FULL (GSRadioGroup, ripple, orientation, validation, custom hooks, testes completos)
- [x] `@carlos-gs99/gs-switch` – FULL (toggle switch, ripple, loading, spinner integration, testes completos)
- [x] `@carlos-gs99/gs-textarea` – FULL (auto-resize, counters, copy/clear, floating label, debounce, GSIcon, testes completos)
- [x] `@carlos-gs99/gs-table` – FULL (pagination, sorting, filters, CRUD, @tanstack/react-table, hooks complexos, testes completos)
- [x] `@carlos-gs99/gs-autocomplete` – FULL (wrapper de GSSelect, search-optimized, i18n, testes completos)
- [x] `@carlos-gs99/gs-rating` – FULL (star rating, half-stars, hover effects, GSIcon, i18n, a11y)
- [x] `@carlos-gs99/gs-slider` – FULL (range slider, marks, keyboard nav, touch support, i18n, a11y)
- [x] `@carlos-gs99/gs-tree` – FULL (hierarchical tree, expand/collapse, icons, selection, i18n, a11y)
- [x] `@carlos-gs99/gs-card` – FULL (collapsible, image, loading, interactive, GSIcon + GSLoading, testes completos, README completo)
- [x] `@carlos-gs99/gs-accordion` – FULL (collapsible panels, multi/single, GSIcon, testes completos, README completo)
- [x] `@carlos-gs99/gs-breadcrumbs` – FULL (compound Item, separator custom, a11y, testes completos, README completo)
- [x] `@carlos-gs99/gs-stepper` – FULL (wizard multi-step, visual progress, GSIcon, testes completos, README completo)
- [x] `@carlos-gs99/gs-pagination` – FULL (page navigation, GSButton integration, testes completos, README completo)
- [x] `@carlos-gs99/gs-dropdown` – FULL (menu dropdown, useDropdown hook, GSList, testes completos, README completo)
- [x] `@carlos-gs99/gs-drawer` – FULL (offcanvas, 4 placements, animations, focus trap, testes completos, README completo)
- [x] `@carlos-gs99/gs-timepicker` – FULL (time selection, GSInput wrapper, native input, testes completos, README completo - versão simplificada intencional)
- [x] `@carlos-gs99/gs-colorpicker` – FULL (color picker, GSInput wrapper, native input, testes completos, README completo - versão simplificada intencional)
- [x] `@carlos-gs99/gs-datepicker` – FULL (date picker, GSInput wrapper, native input, testes completos, README completo - versão simplificada intencional)

> **TOTAL FULL:** 38/38 componentes GS (100%! 🎉)  
> **TOTAL PACKAGES:** 39/42 packages (93% - 4 base + 35 GS FULL + 3 wrappers FULL)  
> Estes já estão prontos para uso em produção no ecossistema GS Style.

---

### 3. GS Components – migrados mas **ainda simplificados** (precisam de mais features)

> Sempre que um destes chegar a FULL, marcar aqui como `[x]` e, idealmente, mover para a secção de FULL/avançados.

#### 3.1. Falta documentação completa (README)
> **VAZIO** - Todos os componentes com documentação pendente foram completados! ✅

#### 3.2. Wrappers simplificados (intencional)
> **VAZIO** - Todos os wrappers foram promovidos a FULL! ✅  
> **NOTA:** Os wrappers (timepicker, colorpicker, datepicker) são FULL mas usam input nativo por design. Para features avançadas (calendário visual, etc.), usar versões do legacy quando disponíveis.

---

### 4. Componentes **ainda não migrados** (só planeados)

> **NOTA:** Todos os componentes planeados foram migrados! Esta secção está vazia.

---

---

### 5. Estado dos Testes (em progresso)

#### 🧪 Componentes com Testes Completos (38/38 componentes GS = 100%! 🎉)
- [x] `gs-icon` - unit, a11y, i18n ✅
- [x] `gs-badge` - unit, a11y, i18n ✅
- [x] `gs-button` - unit, a11y, i18n ✅
- [x] `gs-chip` - unit, a11y, i18n ✅
- [x] `gs-spinner` - unit (20), a11y (11), i18n (9) = 40 testes ✅
- [x] `gs-loading` - unit (22), a11y (23), i18n (17) = 62 testes ✅
- [x] `gs-list` - unit (22), a11y (10), i18n (13) = 45 testes ✅ (6 axe skipped)
- [x] `gs-label` - unit (20), a11y (18), i18n (18) = 56 testes ✅
- [x] `gs-divider` - unit (30), a11y (18), i18n (16) = 64 testes ✅
- [x] `gs-avatar` - unit (42), a11y (25), i18n (20) = 87 testes ✅
- [x] `gs-skeleton` - unit (40), a11y (12), i18n (16) = 68 testes ✅ (8 axe skipped)
- [x] `gs-progress` - unit (35), a11y (5), i18n (21) = 61 testes ✅
- [x] `gs-alert` - unit (20), a11y (5), i18n (22) = 47 testes ✅
- [x] `gs-card` - unit (42), a11y (6), i18n (25) = 73 testes ✅
- [x] `gs-tooltip` - unit (48), a11y (3), i18n (13) = 64 testes ✅ (3 axe skipped)
- [x] `gs-modal` - unit (75), a11y (5), i18n (13) = 83 testes ✅ (3 axe skipped)
- [x] `gs-toast` - unit (48), a11y (8), i18n (8) = 64 testes ✅ (2 axe skipped)
- [x] `gs-drawer` - unit (38), a11y (6), i18n (4) = 48 testes ✅ (2 axe skipped)
- [x] `gs-accordion` - unit (25), a11y (9), i18n (6) = 40 testes ✅
- [x] `gs-checkbox` - unit (~27), a11y (~15), i18n (~8) = ~50 testes ✅
- [x] `gs-select` - unit (40), a11y (18), i18n (13) = 71 testes ✅
- [x] `gs-radio` - unit (40), a11y (11), i18n (7) = 58 testes ✅ (6 axe skipped)
- [x] `gs-switch` - unit (40), a11y (9), i18n (7) = 56 testes ✅ (4 axe skipped)
- [x] `gs-textarea` - unit (40), a11y (9), i18n (7) = 56 testes ✅
- [x] `gs-input` - unit (48), a11y (9), i18n (7) = 64 testes ✅
- [x] `gs-table` - unit (20), a11y (8), i18n (5) = 33 testes ✅
- [x] `gs-autocomplete` - unit (18), a11y (7), i18n (6) = 31 testes ✅
- [x] `gs-breadcrumbs` - unit (18), a11y (12) = 30 testes ✅ (Sem i18n)
- [x] `gs-stepper` - unit (14), a11y (6) = 20 testes ✅ (Sem i18n)
- [x] `gs-pagination` - unit (15), a11y (8) = 23 testes ✅ (Sem i18n)
- [x] `gs-tabs` - unit (28), a11y (15), i18n (6) = 49 testes ✅
- [x] `gs-rating` - unit (~25), a11y (~12), i18n (~9) = ~46 testes ✅
- [x] `gs-slider` - unit (~20), a11y (~13), i18n (~9) = ~42 testes ✅
- [x] `gs-tree` - unit (~17), a11y (~8), i18n (~9) = ~34 testes ✅
- [x] `gs-dropdown` - unit (~9), a11y (~4) = ~13 testes ✅ (Sem i18n)
- [x] `gs-timepicker` - unit (~12), a11y (~8) = ~20 testes ✅ (Sem i18n - wrapper simplificado)
- [x] `gs-colorpicker` - unit (~14), a11y (~5) = ~19 testes ✅ (Sem i18n - wrapper simplificado)
- [x] `gs-datepicker` - unit (~12), a11y (~8) = ~20 testes ✅ (Sem i18n - wrapper simplificado)

#### ⏳ Componentes Sem Testes (0/38 componentes GS)

> **NOTA:** Todos os 38 componentes GS têm testes! Os 4 packages restantes são base packages (utils, hooks, primitives, theme) que não são componentes UI e têm estrutura de testes diferente.

**META:** 80%+ coverage por componente, WCAG AA compliance

---

### 6. Sugestão de uso desta checklist

- Antes de começar uma sessão:
  - Ver em que componente estamos a trabalhar e qual o estado atual aqui.
- Depois de cada migração / melhoria:
  - Atualizar a linha correspondente (mudar `[ ]` para `[x]`, ou mover de "simplificado" para "FULL").
- Antes de releases:
  - Confirmar que todos os componentes críticos de um fluxo estão marcados como FULL.


