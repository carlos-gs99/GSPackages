# Plano de Limpeza - GSPackages
## Organização e Remoção de Redundâncias

**Data:** 2025-12-03  
**Objetivo:** Limpar e organizar o monorepo

---

## 1. Pasta Duplicada (ERRO)

### GSPackages/GSPackages/
```
GSPackages/
└── GSPackages/  ← DUPLICADO (vazio)
    ├── hooks/src/
    └── theme/src/
```

**Ação:** DELETAR completamente (pasta vazia/erro)

---

## 2. Dependências de Teste Redundantes

### Instalado Atualmente:

**Vitest:**
- `vitest`: ^4.0.14
- `@vitest/ui`: ^4.0.14
- `@vitest/coverage-v8`: (instalado)
- `@vitejs/plugin-react`: (instalado)
- `happy-dom`: ^20.0.11

**Jest:**
- `jest`: ^30.2.0
- `@types/jest`: (instalado)
- `jest-environment-jsdom`: (instalado)
- `ts-jest`: (instalado)
- `jsdom`: (instalado)
- `identity-obj-proxy`: (instalado)

**Comuns:**
- `@testing-library/react`: ^16.3.0
- `@testing-library/jest-dom`: (instalado)
- `@testing-library/user-event`: (instalado)
- `vitest-axe`: (instalado)
- `jest-axe`: (instalado)
- `@axe-core/react`: (instalado)
- `i18next`: (instalado)

### Recomendação:

**MANTER APENAS JEST** (mais maduro, melhor docs)

**Remover:**
- ❌ vitest
- ❌ @vitest/ui
- ❌ @vitest/coverage-v8
- ❌ @vitejs/plugin-react (se não usado noutro lugar)
- ❌ happy-dom
- ❌ vitest-axe (usar jest-axe)

**Manter:**
- ✅ jest
- ✅ @types/jest
- ✅ jest-environment-jsdom
- ✅ ts-jest
- ✅ jsdom
- ✅ identity-obj-proxy
- ✅ @testing-library/* (todos)
- ✅ jest-axe
- ✅ @axe-core/react
- ✅ i18next

---

## 3. Arquivos de Configuração de Teste

### Manter:
- ✅ `jest.config.js` - Configuração Jest
- ✅ `tests/jest.setup.ts` - Setup Jest
- ✅ `tests/__mocks__/` - Mocks do Jest

### Remover:
- ❌ `vitest.config.ts` - Não usado mais
- ❌ `tests/setup.ts` - Era para Vitest
- ❌ `tests/test-utils.ts` - Redundante
- ❌ `tests/test-utils.tsx` - Redundante

---

## 4. Arquivos de Teste Duplicados

### gs-icon/__tests__/ (7 arquivos!)

**Manter apenas 1:**
- ✅ `GSIcon.jest.test.tsx` (10 testes básicos - simplificar e expandir)

**Remover tentativas:**
- ❌ `GSIcon.test.tsx` (tentativa Vitest)
- ❌ `GSIcon.a11y.test.tsx` (tentativa Vitest)
- ❌ `GSIcon.i18n.test.tsx` (tentativa Vitest)
- ❌ `GSIcon.simple.test.tsx` (tentativa)
- ❌ `GSIcon.working.test.tsx` (tentativa)
- ❌ `GSIcon.final.test.tsx` (tentativa)

**Criar depois (quando testes funcionarem):**
- ⏳ `GSIcon.test.tsx` (unitários completos)
- ⏳ `GSIcon.a11y.test.tsx` (acessibilidade)
- ⏳ `GSIcon.i18n.test.tsx` (internacionalização)

### gs-badge/__tests__/ (2 arquivos)

**Manter:**
- ✅ `GSBadge.simple.test.tsx` (renomear para `GSBadge.jest.test.tsx`)

**Remover:**
- ❌ `GSBadge.test.tsx` (tentativa Vitest)

---

## 5. Documentação Markdown

### Estrutura Atual (21 arquivos na raiz!):
```
GSPackages/
├── AUDITORIA-REGRAS.md
├── COMANDOS-PUBLICACAO.md
├── CONFIGURAR-TOKEN.md
├── CORRECAO-FINAL-CSS-MODULES.md
├── CORRECOES-GITHUB-ACTIONS.md
├── FASE-1-COMPLETA.md
├── GITHUB-ACTIONS-GUIDE.md
├── GITHUB-DESKTOP-GUIDE.md
├── GUIA-PUBLICACAO-GITHUB.md
├── NOTA-IMPORTANTE.md
├── PLANO-ACAO-CONFORMIDADE.md
├── PLANO-CORRECAO-UTILS.md
├── PLANO-LIMPEZA.md
├── PROGRESSO-COMPONENTES.md
├── PROGRESSO-TESTES.md
├── PUBLICAR-AGORA.md
├── PUBLICAR-GS-BADGE.md
├── RESUMO-AUDITORIA.md
├── RESUMO-COMPLETO.md
├── RESUMO-FINAL-TESTES.md
├── SITUACAO-FINAL-TESTES.md
├── SOBRE-WARNINGS.md
├── START-HERE.md
└── ULTIMO-PASSO.md
```

### Proposta de Organização:

```
GSPackages/
├── README.md (único na raiz)
├── START-HERE.md (guia inicial)
├── LICENSE
├── package.json
├── docs/
│   ├── guides/
│   │   ├── github-actions.md
│   │   ├── publishing.md
│   │   ├── configuration.md
│   │   └── token-setup.md
│   ├── progress/
│   │   ├── components-progress.md
│   │   ├── tests-progress.md
│   │   ├── phase-1-complete.md
│   │   └── audit-report.md
│   ├── historical/
│   │   ├── corrections-*.md
│   │   ├── plans-*.md
│   │   └── notes-*.md
│   └── archive/
│       └── (documentos obsoletos)
└── [packages...]
```

### Categorização:

**Essenciais (Manter na Raiz):**
- ✅ README.md
- ✅ START-HERE.md  
- ✅ LICENSE

**Guias (→ docs/guides/):**
- → GITHUB-ACTIONS-GUIDE.md
- → GITHUB-DESKTOP-GUIDE.md
- → GUIA-PUBLICACAO-GITHUB.md
- → CONFIGURAR-TOKEN.md
- → COMANDOS-PUBLICACAO.md

**Progresso (→ docs/progress/):**
- → PROGRESSO-COMPONENTES.md
- → PROGRESSO-TESTES.md
- → FASE-1-COMPLETA.md
- → AUDITORIA-REGRAS.md
- → RESUMO-AUDITORIA.md
- → PLANO-ACAO-CONFORMIDADE.md

**Histórico/Temporário (→ docs/historical/):**
- → CORRECAO-FINAL-CSS-MODULES.md
- → CORRECOES-GITHUB-ACTIONS.md
- → PLANO-CORRECAO-UTILS.md
- → NOTA-IMPORTANTE.md
- → SOBRE-WARNINGS.md
- → RESUMO-COMPLETO.md
- → RESUMO-FINAL-TESTES.md
- → SITUACAO-FINAL-TESTES.md
- → PLANO-LIMPEZA.md (este)

**Obsoletos (→ docs/archive/ ou DELETE):**
- → PUBLICAR-AGORA.md (já publicado)
- → PUBLICAR-GS-BADGE.md (já publicado)
- → ULTIMO-PASSO.md (obsoleto)

---

## Resumo das Ações

### Deletar Completamente:
1. ❌ `GSPackages/GSPackages/` (pasta duplicada vazia)
2. ❌ `vitest.config.ts`
3. ❌ `tests/setup.ts` (Vitest)
4. ❌ `tests/test-utils.ts` e `tests/test-utils.tsx`
5. ❌ `gs-icon/__tests__/GSIcon.test.tsx` (Vitest)
6. ❌ `gs-icon/__tests__/GSIcon.a11y.test.tsx` (Vitest)
7. ❌ `gs-icon/__tests__/GSIcon.i18n.test.tsx` (Vitest)
8. ❌ `gs-icon/__tests__/GSIcon.simple.test.tsx`
9. ❌ `gs-icon/__tests__/GSIcon.working.test.tsx`
10. ❌ `gs-icon/__tests__/GSIcon.final.test.tsx`
11. ❌ `gs-badge/__tests__/GSBadge.test.tsx` (Vitest)

### Remover Dependências:
```bash
npm uninstall vitest @vitest/ui @vitest/coverage-v8 happy-dom vitest-axe
```

### Reorganizar:
1. Criar `docs/` com subpastas
2. Mover markdowns para categorias apropriadas
3. Manter apenas README.md, START-HERE.md, LICENSE na raiz

### Renomear:
- `gs-badge/__tests__/GSBadge.simple.test.tsx` → `GSBadge.jest.test.tsx`

---

## Benefícios da Limpeza

### Antes:
- 21 arquivos markdown na raiz
- 2 frameworks de teste instalados
- 11 arquivos de teste (tentativas)
- Pasta duplicada
- Confusão e desordem

### Depois:
- 3 arquivos na raiz (README, START-HERE, LICENSE)
- 1 framework de teste (Jest)
- 2 arquivos de teste (1 por componente)
- Estrutura organizada
- Clareza e profissionalismo

---

## Tempo Estimado

- Deletar arquivos: 5 min
- Remover dependências: 2 min
- Criar estrutura docs/: 5 min
- Mover arquivos: 10 min
- Validar: 3 min

**Total:** ~25 minutos

---

## Próximo Passo

**Quer que execute este plano de limpeza agora?**

Vai deixar o projeto:
- ✅ Organizado profissionalmente
- ✅ Sem redundâncias
- ✅ Fácil de navegar
- ✅ Pronto para continuar

**Aguardo confirmação para prosseguir!**

