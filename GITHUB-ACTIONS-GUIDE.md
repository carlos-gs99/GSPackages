# 🤖 GitHub Actions - Guia Completo

## 🎯 O Que São GitHub Actions?

GitHub Actions são **automações CI/CD** (Continuous Integration/Continuous Deployment) que executam automaticamente quando há eventos no teu repositório.

---

## 📋 Workflows Configurados

### 1️⃣ **CI Workflow** (`ci.yml`)

**Quando executa:**
- ✅ Em CADA commit para `main` ou `develop`
- ✅ Em CADA pull request para `main` ou `develop`

**O que faz:**

#### Job 1: Lint
- Instala dependências
- Executa `npm run lint`
- Verifica formatação e qualidade do código

#### Job 2: Type Check
- Instala dependências
- Executa `npm run typecheck`
- Valida tipos TypeScript em todos os packages

#### Job 3: Test
- Instala dependências
- Compila todos os packages
- Executa `npm run test`
- Corre todos os testes Vitest

#### Job 4: Build
- Instala dependências
- Compila todos os packages
- Verifica se os artefactos foram criados

**Objetivo:** Garantir que NADA quebrado entra no repositório!

---

### 2️⃣ **Publish Workflow** (`publish.yml`)

**Quando executa:**
- ✅ Quando fazes push para `main` E há mudanças em packages
- ✅ Manualmente via botão "Run workflow" no GitHub

**O que faz:**
- 📦 Compila todos os packages
- 🚀 Publica automaticamente no **GitHub Packages**
- 🏷️ Cria tags de versão

**Objetivo:** Automatizar releases sem esforço manual!

---

## ✅ Status Atual (Após Configuração)

### Scripts Configurados
```json
{
  "build": "npm run build --workspaces --if-present", ✅
  "typecheck": "tsc --noEmit --project tsconfig.json", ✅
  "lint": "eslint ... --max-warnings 50", ✅
  "test": "vitest run", ✅
  "test:ci": "vitest run --reporter=verbose" ✅
}
```

### Testes Locais (Antes de Push)

```bash
# 1. Typecheck
npm run typecheck
# ✅ Deve passar sem erros

# 2. Lint
npm run lint
# ✅ Deve passar com warnings aceitáveis

# 3. Test
npm run test
# ✅ Passa mesmo sem testes (passWithNoTests: true)

# 4. Build
npm run build
# ✅ Compila @globalsoft/utils com sucesso
```

---

## 🔍 Como Ver os Resultados das Actions

### No GitHub:

1. **Actions Tab:**
   - `https://github.com/carlos-gs99/GSPackages/actions`
   - Mostra histórico de todas as execuções

2. **Status de Commits:**
   - ✅ Verde (checkmark) = Tudo passou
   - ❌ Vermelho (X) = Algo falhou
   - 🟡 Amarelo (•) = Em execução

3. **Detalhes de Falhas:**
   - Clica num commit com ❌
   - Vê logs detalhados
   - Identifica qual job falhou

---

## 🛠️ Como Corrigir Falhas

### Se o Lint falhar:
```bash
npm run lint
# Vê os erros localmente
npm run lint:fix
# Tenta corrigir automaticamente
```

### Se o Typecheck falhar:
```bash
npm run typecheck
# Vê os erros TypeScript
# Corrige manualmente
```

### Se os Testes falharem:
```bash
npm run test
# Vê quais testes falharam
# Corrige e testa novamente
```

### Se o Build falhar:
```bash
npm run build
# Vê os erros de compilação
# Corrige os erros TypeScript/imports
```

---

## 🎯 Fluxo de Trabalho Recomendado

### Antes de Fazer Push:

```bash
# 1. Valida tudo localmente
npm run typecheck  # ✅
npm run lint       # ✅
npm run test       # ✅
npm run build      # ✅

# 2. Faz commit
git add .
git commit -m "feat: add new feature"

# 3. Faz push
git push origin main

# 4. Verifica Actions no GitHub
# Se falhar, corrige e faz novo push
```

---

## 📊 Status das Actions (Atualizado)

### ✅ Configuração Completa

**Workflows:** 2 workflows criados
- ✅ `ci.yml` - Validação contínua
- ✅ `publish.yml` - Publicação automática

**Scripts:** Todos os scripts necessários
- ✅ `npm run build`
- ✅ `npm run typecheck`
- ✅ `npm run lint`
- ✅ `npm run test`

**Configurações:**
- ✅ ESLint configurado (`.eslintrc.json`)
- ✅ TypeScript configurado (`tsconfig.json`)
- ✅ Vitest configurado (`vitest.config.ts`)
- ✅ Prettier configurado (`.prettierrc`)

---

## 🚀 Próximos Passos

### 1. Push Inicial para GitHub

```bash
# No GitHub Desktop:
1. Abre a pasta GSPackages como repositório
2. Faz commit de tudo
3. Publica no repositório remoto
```

### 2. Verificar Actions

1. Vai a `https://github.com/carlos-gs99/GSPackages/actions`
2. Vê se os workflows correm com sucesso ✅
3. Se falharem, vê os logs e corrige

### 3. Publicar Primeiro Package

```bash
# Quando estiveres pronto:
npm login
npm publish --workspace @globalsoft/utils --access public
```

---

## 💡 Dicas Importantes

### ⚠️ Warnings vs Errors

- **Errors (❌):** PARAM o workflow
- **Warnings (⚠️):** NÃO PARAM o workflow (até 50 warnings aceites)

### 🔄 Re-run Actions

Se uma Action falhar por motivos externos (network, etc):
- Clica em "Re-run all jobs"
- Não precisa fazer novo commit

### 📝 Logs Detalhados

Cada job mostra:
- Comandos executados
- Output completo
- Erros específicos
- Tempo de execução

---

## ✅ Checklist Final

Antes de fazer push para GitHub:

- [x] ESLint configurado e funciona
- [x] TypeScript typecheck passa
- [x] Vitest configurado e passa
- [x] Build gera DTS perfeitos
- [x] Scripts npm todos funcionais
- [x] Workflows prontos em `.github/workflows/`

**TUDO PRONTO PARA O GITHUB! 🚀**

---

**Criado em:** 2025-12-02  
**Status:** ✅ Completo e testado

