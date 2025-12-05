# 📋 Essential Context - Contexto Essencial do Projeto

**Status:** CRÍTICO - Leitura OBRIGATÓRIA no início de cada sessão  
**Última Atualização:** 2025-12-05  
**Versão:** 1.2.0

---

## 🎯 TL;DR - Resumo Executivo (30 segundos)

| Informação | Valor |
|------------|-------|
| **Projeto** | GSPackages - Biblioteca de Componentes React |
| **Total Packages** | 42 (100% migrados! 🎉) |
| **Status CI/CD** | ✅ 100% Passing (126 builds) |
| **Testes** | 🟡 5/42 componentes (12%) - Em progresso |
| **Tecnologias** | React 18, TypeScript 5, Vitest, Playwright, tsup |
| **Filosofia** | 100% Agnóstica (zero frameworks externos) |
| **Próxima Fase** | Testes (BURST 1: gs-spinner, gs-loading, gs-list) |

---

## 📦 Estado Atual do Projeto (2025-12-05)

### ✅ O Que Está COMPLETO (100%)

#### 🏗️ Infraestrutura Base (4 packages)
1. **`@carlos-gs99/utils`** - 20+ utility functions
2. **`@carlos-gs99/hooks`** - 15+ React hooks (useTranslation, useDebug, useDropdown, useDebounce)
3. **`@carlos-gs99/primitives`** - Headless components (ButtonBase, Overlay, FocusTrap, Popper)
4. **`@carlos-gs99/theme`** - Design tokens + ThemeProvider

#### 🎨 Componentes UI (38 packages)

**Tier 1 - Core (20 componentes):**
- gs-icon, gs-badge, gs-button, gs-chip, gs-spinner, gs-skeleton
- gs-loading, gs-label, gs-divider, gs-avatar, gs-progress
- gs-list, gs-select, gs-alert, gs-tooltip, gs-card
- gs-toast, gs-modal, gs-checkbox, gs-input, gs-tabs

**Tier 2 - Formulários Avançados (5 componentes):**
- gs-radio, gs-switch, gs-textarea, gs-table, gs-autocomplete

**Tier 3 - Navegação e Layout (6 componentes):**
- gs-drawer, gs-accordion, gs-breadcrumbs, gs-stepper, gs-pagination, gs-dropdown

**Tier 4 - Especializados (7 componentes):**
- gs-rating, gs-slider, gs-tree, gs-timepicker, gs-colorpicker, gs-datepicker

**TOTAL:** 42 packages, 126 builds CI/CD, 100% passing ✅

---

## 🧪 Estado dos Testes (Em Progresso - 12%)

### ✅ Com Testes Completos (4/42)
- gs-icon (unit + a11y + i18n)
- gs-badge (unit + a11y + i18n)
- gs-button (unit + a11y + i18n)
- gs-chip (unit + a11y + i18n)

### 🔄 Em Criação (1/42)
- gs-spinner (testes criados, validação pendente)

### ⏳ Sem Testes (37/42)
**Próximo:** BURST 1 (gs-loading, gs-list)  
**Plano completo:** `docs/progress/TEST-PLAN.md`

---

## 🛠️ Stack Tecnológica

### Core
- **React 18+** - Library de UI
- **TypeScript 5+** - Tipagem estática (strict mode)
- **Vite** - Build tool e dev server
- **tsup** - Package bundler (ESM + CJS + DTS)

### Testes
- **Vitest** - Test runner moderno (substituiu Jest)
- **Happy DOM** - Ambiente DOM rápido (substituiu JSDOM)
- **@testing-library/react** - Testes de componentes
- **@testing-library/user-event** - Simulação de usuário
- **vitest-axe** - Testes de acessibilidade
- **Playwright** - Testes E2E (Chromium, Firefox, WebKit)

### Styling
- **CSS Modules** - Estilos isolados por componente
- **Design Tokens** - Variáveis CSS do @carlos-gs99/theme
- **clsx** - Utility para class names condicionais

### Internacionalização
- **react-i18next** - i18n framework
- **Namespaces por componente** - en.json + pt.json em cada package

### Estado e Hooks
- **React hooks** - useState, useEffect, useCallback, useMemo
- **Custom hooks** - useTranslation, useDebug, useDropdown, useDebounce
- **Zustand** - Estado global (se necessário - não usado ainda)

### Outros
- **@tanstack/react-table** - Lógica de tabelas headless (gs-table)
- **GitHub Actions** - CI/CD automatizado
- **npm workspaces** - Monorepo management

---

## 🎯 Princípios Arquiteturais CRÍTICOS

### 1. 🚫 ZERO Frameworks Externos (Princípio Agnóstico)

**NUNCA adicionar dependências em:**
- ❌ Base UI
- ❌ MUI (Material-UI)
- ❌ Bootstrap
- ❌ Chakra UI
- ❌ Ant Design
- ❌ Qualquer framework que force estilos ou estrutura

**Exceção documentada:**
- ✅ `@tanstack/react-table` - Headless utility (apenas lógica, zero UI)
- Documentação: `docs/packaging/acceptable-exceptions.md`

**Porquê?**
- Componentes devem ser **package-ready** (publicáveis como npm packages)
- **Props-only configuration** (sem dependências de contexto externo)
- **100% controle visual** (CSS Modules + tokens)

### 2. 📦 Estrutura Packlet (Isolamento Total)

Cada componente é um "mini-package" autocontido:

```
gs-button/
├── src/
│   ├── GSButton.tsx          # Componente principal
│   ├── types.ts              # Props com TSDoc
│   ├── styles.module.css     # CSS Modules
│   ├── i18n/                 # Traduções
│   │   ├── en.json
│   │   └── pt.json
│   ├── i18n.ts               # Helper de registo
│   ├── index.ts              # Exports públicos
│   ├── __tests__/            # Testes Vitest
│   │   ├── GSButton.test.tsx
│   │   ├── GSButton.a11y.test.tsx
│   │   └── GSButton.i18n.test.tsx
│   └── css-modules.d.ts      # Types para CSS Modules
├── package.json              # Dependências isoladas
├── tsup.config.ts            # Build config
└── README.md                 # Documentação (ÚNICO markdown)
```

**Regras:**
- ✅ Tudo na pasta do componente (markup, styles, i18n, tests)
- ✅ Apenas 1 README.md (na raiz do componente)
- ✅ Documentação adicional em `docs/` folder (se necessário)
- ❌ NUNCA markdown solto fora de docs/ ou README.md

### 3. 🎨 CSS Modules + Tokens (Sem Inline/Interno)

**Padrão obrigatório:**
```tsx
// ✅ BOM
import styles from './styles.module.css';
<div className={styles.button} />

// ❌ MAU
<div style={{ color: 'red' }} />
<div className="button" /> // sem CSS Modules
```

**Tokens CSS:**
```css
/* ✅ BOM */
.button {
  background: var(--gs-color-primary);
  padding: var(--gs-spacing-md);
}

/* ❌ MAU */
.button {
  background: #007bff !important; /* hardcoded + !important */
}
```

### 4. 🌐 i18n Obrigatório (EN + PT)

**Estrutura:**
```
i18n/
├── en.json   # {"button": {"label": "Click me"}}
└── pt.json   # {"button": {"label": "Clique aqui"}}

i18n.ts       # registerTranslations('gs-button', ...)
```

**Uso:**
```tsx
const { t } = useTranslation('gs-button');
<button>{t('button.label')}</button>
```

### 5. ♿ Acessibilidade (WCAG AA)

**Obrigatório em TODOS os componentes:**
- ✅ ARIA labels/roles/states
- ✅ Keyboard navigation (Tab, Enter, Space, Arrow keys)
- ✅ Screen reader support
- ✅ Focus management
- ✅ Color contrast (mínimo 4.5:1)
- ✅ Testes vitest-axe

### 6. 🐛 Debug Mode (useDebug)

**Integração obrigatória:**
```tsx
const { debug } = useDebug({ component: 'GSButton', enabled: props.debug });

debug.log('Rendering button', { variant, color, size });

<button data-gs-debug={debug.enabled ? 'GSButton' : undefined}>
```

---

## 📁 Estrutura de Diretórios

```
GSPackages/
├── docs/                     # 📚 Documentação centralizada
│   ├── indices/              # Índices e regras (AI, workflow, patterns)
│   ├── context/              # Contexto e referências
│   ├── packaging/            # Regras de packaging
│   ├── progress/             # Progress trackers e sessões
│   ├── guides/               # Guias (GitHub, CI/CD, publishing)
│   ├── historical/           # Histórico de fixes
│   └── notes/                # Notas técnicas
├── utils/                    # @carlos-gs99/utils
├── hooks/                    # @carlos-gs99/hooks
├── primitives/               # @carlos-gs99/primitives
├── theme/                    # @carlos-gs99/theme
├── gs-{component}/           # 38 componentes GS
│   ├── src/
│   ├── __tests__/ (se existir)
│   ├── package.json
│   ├── tsup.config.ts
│   └── README.md
├── tests/                    # Configuração de testes
│   ├── __mocks__/
│   └── jest.setup.ts
├── package.json              # Monorepo root
├── tsconfig.json             # TypeScript config
└── README.md                 # Overview do projeto
```

---

## 🔧 Comandos Úteis

### Build
```bash
cd GSPackages
npm run build                          # Build todos os packages
npm run build --workspace gs-button    # Build package específico
```

### Testes
```bash
npm test                               # Todos os testes (Vitest)
npm test -- gs-button                  # Testes de componente específico
npm test -- --coverage                 # Com coverage report
npm run test:e2e                       # Testes E2E (Playwright)
```

### Desenvolvimento
```bash
npm run dev                            # Watch mode
npm run lint                           # Linting
npm run typecheck                      # TypeScript check
```

### CI/CD (Simulação Local)
```bash
cd GSPackages
./simulate-ci.ps1                      # Simula GitHub Actions localmente
```

---

## 🎯 Workflow de Desenvolvimento

### 1. Criar Novo Componente
```bash
# 1. Criar pasta
mkdir gs-newcomponent

# 2. Copiar template de package.json, tsup.config.ts
# 3. Criar estrutura src/
# 4. Implementar componente
# 5. Adicionar testes
# 6. Documentar README.md
# 7. Build e validar
npm run build --workspace gs-newcomponent
```

### 2. Modificar Componente Existente
```bash
# 1. Ler README do componente
# 2. Verificar types.ts
# 3. Fazer mudanças
# 4. Atualizar documentação
# 5. Build e validar
npm run build --workspace gs-component
# 6. Executar testes
npm test -- gs-component
```

### 3. Adicionar Testes a Componente
```bash
# 1. Criar pasta __tests__/
# 2. Copiar template de gs-spinner/__tests__/
# 3. Adaptar testes
# 4. Executar
npm test -- gs-component
# 5. Validar coverage
npm test -- gs-component --coverage
```

---

## 📊 Metas de Qualidade

| Métrica | Target | Atual | Status |
|---------|--------|-------|--------|
| **Packages** | 42 | 42 | ✅ 100% |
| **CI/CD Builds** | 126 | 126 | ✅ 100% |
| **Testes Coverage** | 80%+ | ~12% | 🟡 Em progresso |
| **A11y WCAG AA** | 100% | ~50% | 🟡 Em implementação |
| **i18n (EN+PT)** | 100% | 100% | ✅ 100% |
| **Documentation** | 100% | ~90% | 🟡 Em atualização |
| **TypeScript Strict** | 100% | 100% | ✅ 100% |

---

## 🚀 Próximos Passos (Roadmap)

### Imediato (Esta Sessão)
- [ ] Validar testes gs-spinner
- [ ] Completar BURST 1 (gs-loading, gs-list)

### Curto Prazo (1-2 semanas)
- [ ] BURST 2-7 de testes (35 componentes)
- [ ] Coverage 80%+ em todos os componentes
- [ ] A11y WCAG AA compliance 100%

### Médio Prazo (1 mês)
- [ ] Storybook stories para todos os componentes
- [ ] Documentação avançada (`docs/` folders)
- [ ] Performance benchmarks

### Longo Prazo (2-3 meses)
- [ ] Publicação oficial v1.2.0 no npm
- [ ] Website de documentação
- [ ] Showcase de exemplos

---

## 📚 Documentos Relacionados

### CRÍTICO - Ler Sempre
- **Este documento** - Contexto essencial
- `docs/indices/ai-memory-rules.md` - Regras para IA
- `docs/indices/analyze-then-act-workflow.md` - Workflow oficial
- `docs/indices/communication-guidelines.md` - Como comunicar

### Referências Frequentes
- `docs/progress/PACKAGES-CHECKLIST.md` - Status de packages
- `docs/progress/TEST-PLAN.md` - Plano de testes
- `docs/progress/SESSION-2025-12-04.md` - Última sessão

### Templates e Guias
- `docs/packaging/component-template.md` - Template de componente
- `docs/packaging/authoring-rules.md` - Regras de criação
- `docs/indices/best-practices.md` - Melhores práticas

---

## 🆘 FAQs Rápidos

**Q: Como adicionar novo componente?**  
A: Seguir estrutura packlet, ver `gs-button/` como exemplo.

**Q: Posso usar Base UI / MUI?**  
A: ❌ NÃO! Princípio agnóstico, zero frameworks externos.

**Q: Como testar componente?**  
A: 3 ficheiros obrigatórios: `*.test.tsx`, `*.a11y.test.tsx`, `*.i18n.test.tsx`

**Q: Posso usar estilos inline?**  
A: ❌ NÃO! Apenas CSS Modules + tokens.

**Q: Como funciona i18n?**  
A: `en.json` + `pt.json` + `registerTranslations()` + `useTranslation()`.

**Q: Onde fica documentação adicional?**  
A: `docs/` folder dentro do componente (nunca markdowns soltos).

**Q: Como validar antes de commit?**  
A: `npm run build && npm test && npm run lint`

---

**Este documento é o ponto de partida para QUALQUER ação no projeto!** 📍

