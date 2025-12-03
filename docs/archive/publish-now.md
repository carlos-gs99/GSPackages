# 🚀 PUBLICAR PACKAGES - Comandos Prontos

## ✅ Scope Atualizado para `@carlos-gs99`

Todos os packages foram renomeados de `@globalsoft/*` para `@carlos-gs99/*` para serem compatíveis com o GitHub Packages.

---

## 📋 Passo a Passo SIMPLES

### 1️⃣ Criar Token GitHub (SE AINDA NÃO TENS)

**Abre:** https://github.com/settings/tokens/new

**Configura:**
- Note: `GSPackages-Token`
- Expiration: `90 days`
- Scopes:
  - ✅ `repo`
  - ✅ `write:packages`
  - ✅ `read:packages`

**Clica "Generate token" e COPIA!**

---

### 2️⃣ Configurar Token no PowerShell

**No PowerShell (pasta GSPackages):**

```powershell
# SUBSTITUI ghp_XXX pelo teu token!
$env:NODE_AUTH_TOKEN = "ghp_SEU_TOKEN_AQUI"

# Verifica se ficou definido
echo $env:NODE_AUTH_TOKEN
```

---

### 3️⃣ Testar Autenticação

```powershell
npm whoami --registry=https://npm.pkg.github.com
```

**Deve mostrar:** `carlos-gs99`

Se der erro → Token errado ou não configurado

---

### 4️⃣ Publicar os Packages! 🚀

```powershell
# Utils (13 utils)
npm publish --workspace @carlos-gs99/utils

# Hooks (12 hooks)
npm publish --workspace @carlos-gs99/hooks

# Primitives (4 primitives + CSS)
npm publish --workspace @carlos-gs99/primitives

# Theme (design tokens)
npm publish --workspace @carlos-gs99/theme
```

**Cada comando deve mostrar:**
```
+ @carlos-gs99/utils@1.0.0
```

---

### 5️⃣ Verificar Publicação

**Abre:** https://github.com/carlos-gs99?tab=packages

Deve mostrar os 4 packages:
- ✅ @carlos-gs99/utils
- ✅ @carlos-gs99/hooks
- ✅ @carlos-gs99/primitives
- ✅ @carlos-gs99/theme

---

## 🎯 Comandos Resumidos (COPY-PASTE)

```powershell
# Configurar token (substituir!)
$env:NODE_AUTH_TOKEN = "ghp_SEU_TOKEN_AQUI"

# Testar
npm whoami --registry=https://npm.pkg.github.com

# Publicar todos
npm publish --workspace @carlos-gs99/utils
npm publish --workspace @carlos-gs99/hooks
npm publish --workspace @carlos-gs99/primitives
npm publish --workspace @carlos-gs99/theme
```

---

## 🚨 Se Der Erro E403

**Causa:** Token sem permissões

**Solução:**
1. Criar novo token com TODOS os scopes:
   - repo
   - write:packages
   - read:packages
   - delete:packages
2. Reconfigurar: `$env:NODE_AUTH_TOKEN = "novo_token"`
3. Tentar novamente

---

## 🚨 Se Der Erro E401

**Causa:** Token inválido ou expirado

**Solução:**
1. Gerar novo token
2. Reconfigurar variável ambiente
3. Tentar novamente

---

## ✅ Após Publicar com Sucesso

Os packages estarão disponíveis em:
- GitHub Packages: `https://github.com/carlos-gs99?tab=packages`
- Para instalar: `npm install @carlos-gs99/utils` (com .npmrc configurado)

---

**BOA SORTE! 🚀🎉**

**Quando publicares, diz-me o resultado!**

