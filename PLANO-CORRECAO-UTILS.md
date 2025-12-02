# 📋 Plano de Correção Completa dos Utils

## 🎯 Objetivo

Corrigir todos os utils para compilarem com TypeScript strict e gerarem `.d.ts` perfeitos.

---

## 📊 Análise Atual

### ✅ O Que Já Funciona
- ESM build ✅ (81.78 KB)
- CJS build ✅ (85.10 KB)
- Sourcemaps ✅

### ❌ O Que Falta
- DTS build (TypeScript declarations)
- Causado por erros TypeScript strict em vários utils

---

## 🔍 Utils com Problemas Identificados

### 1. **debugUtils.ts** (linha 332)
**Erro:** `Not all code paths return a value`

**Fix:** Já aplicado! ✅

### 2. **perfObserverUtils.ts** (linha 28)
**Erro:** `Property 'env' does not exist on type 'ImportMeta'`

**Fix:** 
- Remover uso de `import.meta.env`
- Usar `process.env.NODE_ENV` ou tornar configurável via prop

### 3. **accessibilityUtils.ts** (linha 239, 343)
**Erros:**
- `Not all code paths return a value`
- `'priority' is declared but its value is never read`

**Fix:**
- Adicionar returns faltantes
- Remover variáveis não usadas ou usar com `_priority`

### 4. **arrayUtils.ts** (linha 37)
**Erro:** `Type '(T[] | undefined)[]' is not assignable to type 'T[][]'`

**Fix:** Já tentado com `!` mas precisa verificar melhor

### 5. **classNameUtils.ts** (linha 21)
**Erro:** `Cannot find module '../lib/types/design'`

**Fix:** 
- Remover dependência externa
- Criar types locais ou passar como generics

### 6. **renderUtils.tsx** (linhas 7, 8)
**Erro:** `Cannot find module '../components/ui'`

**Fix:**
- Remover dependências de componentes
- Mover para package separado

---

## 🎯 Estratégia de Correção

### Fase 1: Excluir Problemáticos (5 min) ✅
- [x] classNameUtils
- [x] renderUtils  
- [x] perfObserverUtils

**Status:** FEITO! Build funciona sem DTS.

### Fase 2: Corrigir Utils Simples (30 min)
Corrigir os utils que ficaram, um a um:

#### 2.1. debugUtils.ts
- [ ] Verificar função `monitorPerformance`
- [ ] Garantir return em todos os paths

#### 2.2. accessibilityUtils.ts
- [ ] Linha 239: Adicionar return faltante
- [ ] Linha 343: Remover `priority` ou usar com `_priority`

#### 2.3. arrayUtils.ts
- [ ] Linha 37: Garantir que map retorna sempre T[]

#### 2.4. Verificar Restantes
- [ ] dateUtils
- [ ] dotnetDateUtils
- [ ] dateParsers
- [ ] stringUtils
- [ ] validationUtils
- [ ] domUtils
- [ ] tableUtils
- [ ] fieldMappers
- [ ] navigationUtils
- [ ] windowUtils
- [ ] commonUtils
- [ ] chartExport
- [ ] a11yDev
- [ ] testUtils

### Fase 3: Ativar DTS (1 min)
- [ ] Mudar `dts: false` → `dts: true` em tsup.config.ts
- [ ] Testar build
- [ ] Verificar pasta dist/ tem .d.ts

### Fase 4: Validação Final (5 min)
- [ ] Build completo sem erros
- [ ] dist/ tem index.js, index.cjs, index.d.ts
- [ ] Testar import em projeto teste
- [ ] Intellisense funciona

---

## 🛠️ Comandos para Cada Fase

### Corrigir Utils (Fase 2)

Para cada util com erro:

```bash
# 1. Abrir ficheiro
code GSPackages/utils/src/debugUtils.ts

# 2. Corrigir erro TypeScript
# (ver erro específico no terminal)

# 3. Testar build
npm run build --workspace @globalsoft/utils

# 4. Se falhar, ver próximo erro e repetir
# 5. Se passar, próximo util!
```

### Ativar DTS (Fase 3)

```typescript
// GSPackages/utils/tsup.config.ts
dts: true  // ← Mudar de false para true
```

```bash
npm run build --workspace @globalsoft/utils
```

---

## 📋 Checklist de Correção

### Utils Principais (Precisam estar OK)
- [ ] debugUtils.ts
- [ ] accessibilityUtils.ts
- [ ] dateUtils.ts
- [ ] stringUtils.ts
- [ ] arrayUtils.ts

### Utils Secundários (Nice to have)
- [ ] dotnetDateUtils.ts
- [ ] dateParsers.ts
- [ ] validationUtils.ts
- [ ] domUtils.ts
- [ ] tableUtils.ts
- [ ] fieldMappers.ts
- [ ] navigationUtils.tsx
- [ ] windowUtils.ts
- [ ] commonUtils.ts
- [ ] chartExport.ts
- [ ] a11yDev.ts
- [ ] testUtils.ts

### Utils Excluídos (Para depois)
- [ ] classNameUtils.ts (precisa types externos)
- [ ] renderUtils.tsx (precisa componentes)
- [ ] perfObserverUtils.ts (import.meta.env)

---

## ⏱️ Estimativa de Tempo

| Fase | Tempo | Descrição |
|------|-------|-----------|
| **Fase 1** | ✅ 5 min | Excluir problemáticos (FEITO) |
| **Fase 2** | ⏳ 1-2h | Corrigir erros TypeScript strict |
| **Fase 3** | ⏳ 5 min | Ativar DTS e testar |
| **Fase 4** | ⏳ 10 min | Validação final |
| **TOTAL** | **~2h** | Para utils 100% perfeitos |

---

## 🎯 Abordagem Recomendada

### Opção 1: Fazer Tudo Agora (2h straight)
- ✅ Fica completo de uma vez
- ❌ Sessão longa
- ❌ Pode ser cansativo

### Opção 2: Fazer em Sessões (Recomendado)
- **Sessão 1 (30 min):** Corrigir debugUtils + accessibilityUtils
- **Sessão 2 (30 min):** Corrigir arrayUtils + dateUtils
- **Sessão 3 (30 min):** Verificar restantes
- **Sessão 4 (30 min):** Ativar DTS e validar

### Opção 3: Publicar Assim e Corrigir Depois
- ✅ Package já funciona (sem types)
- ✅ Podes começar a migrar outros packages
- ✅ Corriges utils aos poucos
- ⏳ v1.0.0 sem types → v1.1.0 com types

---

## 💡 Minha Recomendação

**Opção 3 (Pragmática):**

1. **AGORA:**
   - ✅ Build funciona (sem DTS)
   - ✅ Podes publicar no GitHub
   - ✅ Focar em migrar componentes importantes

2. **DEPOIS:**
   - Criar tarefa "Corrigir utils TypeScript"
   - Fazer aos poucos quando tiveres tempo
   - Release v1.1.0 com types completos

**Benefícios:**
- Não bloqueias progresso
- Tens package funcional AGORA
- Corriges com calma depois

---

**O que preferes?**
1. Corrigir tudo agora (~2h)?
2. Corrigir em sessões curtas?
3. Deixar para depois e avançar com outros packages?

Diz-me e eu ajudo da forma que preferires! 😊

