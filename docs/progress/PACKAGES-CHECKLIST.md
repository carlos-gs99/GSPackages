## ✅ Checklist de Estado dos Packages

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
- [x] `@carlos-gs99/gs-card` – avançado (collapsible, image, loading, interactive, GSIcon + GSLoading)
- [x] `@carlos-gs99/gs-toast` – FULL (GSIcon severity auto-detect, animated progress bar, debug, i18n)
- [x] `@carlos-gs99/gs-modal` – FULL (confirm mode com GSButton, animações entrada/saída, GSIcon close, debug)
- [x] `@carlos-gs99/gs-checkbox` – FULL (GSCheckboxGroup, indeterminate, ripple, custom hooks, validation completa)
- [x] `@carlos-gs99/gs-input` – avançado (GSIcon integration, debounce, copy button, floating label, validation icons)
- [x] `@carlos-gs99/gs-tabs` – FULL (keyboard navigation completa, orientation, variants, keepMounted, icons, debug)

> Estes já estão prontos para uso em produção no ecossistema GS Style.

---

### 3. GS Components – migrados mas **ainda simplificados** (precisam de mais features)

> Sempre que um destes chegar a FULL, marcar aqui como `[x]` e, idealmente, mover para a secção de FULL/avançados.

---

### 4. Componentes **ainda não migrados** (só planeados)

#### 4.1. Alta prioridade (Tier 2) - ✅ COMPLETO 100%!

- [x] `gs-radio` – MIGRADO (GSRadioGroup, ripple, orientation, validation, custom hooks)
- [x] `gs-switch` – MIGRADO (toggle switch, ripple, loading, spinner integration)
- [x] `gs-textarea` – MIGRADO (auto-resize, counters, copy/clear, floating label, debounce, GSIcon)
- [x] `gs-table` – MIGRADO (pagination, sorting, filters, CRUD, @tanstack/react-table, hooks complexos)
- [x] `gs-autocomplete` – MIGRADO (wrapper de GSSelect, search-optimized, i18n)

#### 4.2. Prioridade média (Tier 3) - ✅ COMPLETO 100%!

- [x] `gs-drawer` – MIGRADO (offcanvas, 4 placements, animations, focus trap)
- [x] `gs-accordion` – MIGRADO (collapsible panels, multi/single, GSIcon)
- [x] `gs-breadcrumbs` – MIGRADO (compound Item, separator custom, a11y)
- [x] `gs-stepper` – MIGRADO (wizard multi-step, visual progress, GSIcon)
- [x] `gs-pagination` – MIGRADO (page navigation, GSButton integration)
- [x] `gs-dropdown` – MIGRADO (menu dropdown, useDropdown hook, GSList)

#### 4.3. Prioridade baixa (Tier 4+) - ✅ COMPLETO 100%!

- [x] `gs-rating` – MIGRADO (star rating, half-stars, hover effects, GSIcon)
- [x] `gs-slider` – MIGRADO (range slider, marks, keyboard nav, touch support)
- [x] `gs-tree` – MIGRADO (hierarchical tree, expand/collapse, icons, selection)
- [x] `gs-timepicker` – MIGRADO (time selection, GSInput wrapper, native)
- [x] `gs-colorpicker` – MIGRADO (color picker, GSInput wrapper, native)
- [x] `gs-datepicker` – MIGRADO (date picker, GSInput wrapper, native - versão simplificada)

---

### 5. Sugestão de uso desta checklist

- Antes de começar uma sessão:
  - Ver em que componente estamos a trabalhar e qual o estado atual aqui.
- Depois de cada migração / melhoria:
  - Atualizar a linha correspondente (mudar `[ ]` para `[x]`, ou mover de “simplificado” para “FULL”).
- Antes de releases:
  - Confirmar que todos os componentes críticos de um fluxo estão marcados como FULL.


