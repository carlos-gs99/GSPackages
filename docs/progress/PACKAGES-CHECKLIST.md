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

#### 4.1. Alta prioridade (Tier 2)

- [ ] `gs-radio`
- [ ] `gs-switch`
- [ ] `gs-textarea`
- [ ] `gs-table` (complexo – usa `@tanstack/react-table`)
- [ ] `gs-autocomplete`

#### 4.2. Prioridade média (Tier 3)

- [ ] `gs-drawer`
- [ ] `gs-accordion`
- [ ] `gs-breadcrumbs`
- [ ] `gs-stepper`
- [ ] `gs-pagination`
- [ ] `gs-dropdown`

#### 4.3. Prioridade baixa (Tier 4+)

- [ ] `gs-datepicker`
- [ ] `gs-timepicker`
- [ ] `gs-colorpicker`
- [ ] `gs-slider`
- [ ] `gs-rating`
- [ ] `gs-tree`
- [ ] Outros componentes custom do projeto (a listar quando forem identificados)

---

### 5. Sugestão de uso desta checklist

- Antes de começar uma sessão:
  - Ver em que componente estamos a trabalhar e qual o estado atual aqui.
- Depois de cada migração / melhoria:
  - Atualizar a linha correspondente (mudar `[ ]` para `[x]`, ou mover de “simplificado” para “FULL”).
- Antes de releases:
  - Confirmar que todos os componentes críticos de um fluxo estão marcados como FULL.


