# 🛠️ Development Guide - Guia de Desenvolvimento

**Status:** Guia rápido para desenvolvimento diário  
**Última Atualização:** 2025-12-05  
**Audience:** Developers (humanos e IA)

---

## 🚀 Quick Start (5 minutos)

### 1. Clone e Setup

```bash
# Clone (se ainda não tiver)
git clone https://github.com/carlos-gs99/GSPackages.git
cd GSPackages

# Install dependencies
npm install

# Build tudo
npm run build
```

### 2. Verificar Estado

```bash
# Ver packages
ls -la

# Ver status git
git status

# Ver última sessão
cat docs/progress/SESSION-2025-12-04.md
```

### 3. Ler Contexto Essencial

```bash
# Ler contexto (5min)
cat docs/context/essential-context.md

# Ou quick reference (2min)
cat docs/context/quick-reference.md
```

✅ **Pronto para desenvolver!**

---

## 📋 Workflows Comuns

### 🆕 Criar Novo Componente

```bash
# 1. Criar pasta
cd GSPackages
mkdir gs-newcomponent
cd gs-newcomponent

# 2. Criar estrutura
mkdir -p src/i18n src/__tests__

# 3. Copiar templates
# Ver: docs/packaging/component-template.md
# Copiar todos os 14 templates e adaptar

# 4. Adaptar
# - Substituir GSNewComponent pelo nome real
# - Substituir gs-newcomponent pelo nome real
# - Implementar lógica específica
# - Escrever testes reais

# 5. Build
cd ..
npm run build --workspace @carlos-gs99/gs-newcomponent

# 6. Test
npm test -- gs-newcomponent

# 7. Validar checklist
# Ver: docs/packaging/authoring-rules.md (Regra #1-8)
```

**Tempo estimado:** 2-4h para componente simples

---

### 🔧 Modificar Componente Existente

```bash
# 1. Ler documentação
cat gs-component/README.md
cat gs-component/src/types.ts

# 2. ANÁLISE PRIMEIRO (Workflow obrigatório)
# - Investigar problema completamente
# - Comparar com código existente
# - Documentar descobertas
# - Listar soluções possíveis
# Ver: docs/indices/analyze-then-act-workflow.md

# 3. APRESENTAR (mostrar análise ao utilizador)
# - Tabelas de comparação
# - Propor soluções
# - Aguardar confirmação

# 4. IMPLEMENTAR (após confirmação)
# - Fazer mudanças
# - Atualizar types.ts
# - Atualizar README.md
# - Atualizar testes

# 5. Validar
npm run build --workspace @carlos-gs99/gs-component
npm test -- gs-component
npm run lint

# 6. Commit
git add gs-component/
git commit -m "feat(gs-component): description"
```

**Tempo estimado:** 30min - 2h dependendo da complexidade

---

### 🧪 Criar Testes para Componente

```bash
# 1. Criar pasta __tests__
cd gs-component/src
mkdir __tests__

# 2. Copiar template
# Ver: docs/packaging/component-template.md
# Copiar 3 ficheiros de teste e adaptar:
# - Component.test.tsx (unit tests)
# - Component.a11y.test.tsx (accessibility)
# - Component.i18n.test.tsx (internationalization)

# 3. Executar
cd ../../..
npm test -- gs-component

# 4. Coverage
npm test -- gs-component --coverage

# 5. Validar
# Meta: 80%+ coverage
# Zero violations axe
# EN + PT funcionando
```

**Tempo estimado:** 40min - 1h

---

### 🔄 Atualizar Documentação

```bash
# 1. README do componente
vim gs-component/README.md
# - Adicionar novos props
# - Adicionar exemplos
# - Atualizar A11y section

# 2. Checklist do projeto
vim docs/progress/PACKAGES-CHECKLIST.md
# - Marcar [x] se completo
# - Mover de "simplificado" para "FULL"

# 3. Quick Reference
vim docs/context/quick-reference.md
# - Atualizar tabela de props
# - Atualizar status

# 4. Working Memory (se sessão ativa)
vim docs/context/working-memory.md
# - Registar mudança
# - Atualizar métricas
```

---

### 🎨 Adicionar Novo Token CSS

```bash
# 1. Editar theme
cd theme/src
vim tokens.css

# Adicionar token
:root {
  --gs-new-token: value;
}

# 2. Build theme
cd ../..
npm run build --workspace @carlos-gs99/theme

# 3. Usar em componente
# styles.module.css
.component {
  property: var(--gs-new-token);
}

# 4. Documentar
# Adicionar em docs/indices/best-practices.md
# Adicionar em theme/README.md
```

---

### 🐛 Debug de Problema

```bash
# 1. Ativar debug mode
<GSComponent debug>Content</GSComponent>

# Console mostra:
# [GSComponent] Rendering with props: {...}

# 2. Verificar data attributes
# Inspecionar elemento no browser:
# data-gs-debug="GSComponent"
# data-gs-state="{...}"

# 3. Executar testes específicos
npm test -- gs-component --verbose

# 4. Verificar build
npm run build --workspace @carlos-gs99/gs-component

# 5. Verificar linting
npm run lint

# 6. Simular CI localmente
cd GSPackages
./simulate-ci.ps1
```

---

## 🔧 Comandos Úteis

### Build

```bash
# Build tudo
npm run build

# Build específico
npm run build --workspace @carlos-gs99/gs-button

# Build múltiplos
npm run build --workspace @carlos-gs99/gs-button --workspace @carlos-gs99/gs-icon

# Watch mode (desenvolvimento)
npm run dev

# Clean build
rm -rf dist/ && npm run build
```

### Testes

```bash
# Todos os testes
npm test

# Componente específico
npm test -- gs-button

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch

# Apenas unit tests
npm test -- gs-button --grep "test.tsx"

# Apenas a11y tests
npm test -- gs-button --grep "a11y.test.tsx"

# Apenas i18n tests
npm test -- gs-button --grep "i18n.test.tsx"

# E2E (Playwright)
npm run test:e2e
npm run test:e2e:ui  # Com interface visual
```

### Linting

```bash
# Lint tudo
npm run lint

# TypeCheck
npm run typecheck

# Fix automático
npm run lint:fix

# Lint específico
npm run lint -- gs-button/src/**/*.ts
```

### Git

```bash
# Status
git status --short

# Diff
git diff
git diff --staged

# Add
git add docs/
git add gs-component/

# Commit
git commit -m "type(scope): description"

# Tipos de commit:
# feat: Nova feature
# fix: Bug fix
# docs: Documentação
# refactor: Refactoring
# test: Testes
# chore: Manutenção

# Push
git push
```

### CI/CD Local

```bash
# Simular GitHub Actions
cd GSPackages
./simulate-ci.ps1

# Ver output
# Deve mostrar:
# ✅ Build success (126/126 packages)
# ✅ TypeCheck passed
# ✅ Lint passed
# ✅ Tests passed (153/153)
```

---

## 📁 Estrutura de Diretórios

```
GSPackages/
├── docs/                    # 📚 Documentação
│   ├── indices/            # Regras, workflow, patterns
│   ├── context/            # Contexto, quick ref, working memory
│   ├── packaging/          # Authoring rules, templates
│   ├── progress/           # Checklists, test plans, sessions
│   └── guides/             # Guias práticos
│
├── utils/                   # @carlos-gs99/utils
├── hooks/                   # @carlos-gs99/hooks
├── primitives/              # @carlos-gs99/primitives
├── theme/                   # @carlos-gs99/theme
│
├── gs-{component}/          # 38 componentes GS
│   ├── src/
│   │   ├── GSComponent.tsx
│   │   ├── types.ts
│   │   ├── styles.module.css
│   │   ├── i18n/
│   │   ├── __tests__/
│   │   └── index.ts
│   ├── package.json
│   ├── tsup.config.ts
│   └── README.md
│
├── tests/                   # Configuração de testes
├── package.json             # Monorepo root
├── tsconfig.json
└── README.md
```

---

## 🚨 Troubleshooting Rápido

### Build Falha

```bash
# Erro: Module not found
# → Adicionar dependency ao package.json
# → Adicionar a external[] no tsup.config.ts

# Erro: TypeScript
# → Verificar types.ts
# → Verificar imports

# Erro: CSS Modules
# → Verificar css-modules.d.ts existe
# → Verificar import paths
```

### Testes Falham

```bash
# Erro: Cannot find module
# → npm run build (build antes de testar)
# → Verificar imports

# Erro: Timeout
# → Aumentar timeout no teste
# → Verificar async/await

# Erro: Axe violations
# → Adicionar ARIA labels
# → Verificar keyboard nav
# → Verificar color contrast
```

### Linting Falha

```bash
# Erro: Unused variable
# → Remover ou usar variável
# → Ou prefixar com _ (_unused)

# Erro: Missing types
# → Adicionar types explícitos
# → Usar any como último recurso

# Erro: ESLint
# → Seguir sugestão do linter
# → Ou adicionar // eslint-disable-next-line
```

---

## 📚 Documentação Essencial

### Ler SEMPRE (Início de Sessão)

1. **[Essential Context](./context/essential-context.md)** (5min)
   - Estado atual do projeto
   - Stack tecnológica
   - Princípios arquiteturais

2. **[Working Memory](./context/working-memory.md)** (2min)
   - Estado da sessão atual
   - Tarefas em progresso
   - Próximos passos

### Consultar Quando Necessário

3. **[Quick Reference](./context/quick-reference.md)**
   - Cheat sheet dos 42 componentes
   - Props comuns
   - Comandos úteis

4. **[Best Practices](./indices/best-practices.md)**
   - Do's and Don'ts
   - Exemplos de código

5. **[Component Patterns](./indices/component-patterns.md)**
   - Padrões arquiteturais
   - Quando usar cada pattern

6. **[Authoring Rules](./packaging/authoring-rules.md)**
   - Regras obrigatórias (8 regras)
   - Checklist de aprovação

7. **[Component Template](./packaging/component-template.md)**
   - Templates copy-paste
   - 14 ficheiros prontos

---

## ⚡ Atalhos e Dicas

### Para IA/LLM

```markdown
🔴 CRÍTICO - SEMPRE:
1. Ler essential-context.md no início
2. Seguir analyze-then-act workflow
3. Aplicar communication guidelines
4. Consultar authoring-rules antes de criar/modificar

🟡 IMPORTANTE - Frequente:
1. Verificar quick-reference.md
2. Seguir best-practices.md
3. Usar component-template.md
4. Atualizar working-memory.md

🟢 ÚTIL - Quando Necessário:
1. Ver component-patterns.md
2. Consultar acceptable-exceptions.md
3. Ler session notes
```

### Para Humanos

```markdown
📚 Onboarding (primeira vez):
1. README.md (raiz) - 5min
2. essential-context.md - 5min
3. PACKAGES-CHECKLIST.md - 2min

💻 Desenvolvimento diário:
1. quick-reference.md - lookup rápido
2. working-memory.md - estado atual
3. best-practices.md - quando em dúvida

🎯 Criar componente:
1. component-template.md - copiar templates
2. authoring-rules.md - validar regras
3. best-practices.md - seguir padrões

🧪 Criar testes:
1. test-plan.md - ver estratégia
2. component-template.md - copiar testes
3. authoring-rules.md - validar coverage
```

---

## 🎯 Metas de Qualidade

Antes de considerar tarefa completa:

### Componente
- [ ] Build passa (0 erros TypeScript)
- [ ] Linting passa (0 warnings)
- [ ] Testes passam (80%+ coverage)
- [ ] Axe tests passam (0 violations)
- [ ] i18n EN + PT funcionando
- [ ] README completo
- [ ] Debug mode integrado

### Documentação
- [ ] README atualizado
- [ ] Types com TSDoc
- [ ] Exemplos práticos (mínimo 3)
- [ ] A11y section presente
- [ ] Checklist atualizado

### Git
- [ ] Commit message claro
- [ ] Scope correto
- [ ] Breaking changes documentadas
- [ ] Sem ficheiros debug/temp

---

## 🔗 Links Úteis

- **GitHub Repo:** https://github.com/carlos-gs99/GSPackages
- **npm Scope:** @carlos-gs99/*
- **Issues:** https://github.com/carlos-gs99/GSPackages/issues
- **CI/CD:** GitHub Actions (auto-trigger em push)

---

**Use este guia como referência durante desenvolvimento!** 🛠️

