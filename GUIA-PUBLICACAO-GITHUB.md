# 📦 Guia Completo - Publicar no GitHub Packages

## 🎯 Passo a Passo para Publicar os 4 Packages

---

## 1️⃣ Criar Personal Access Token (PAT)

### No GitHub Web:

1. **Vai a:** `https://github.com/settings/tokens`

2. **Clica em:** `Generate new token` → `Generate new token (classic)`

3. **Preenche:**
   - **Note:** `GSPackages-Publish-Token`
   - **Expiration:** `90 days` (ou `No expiration`)

4. **Seleciona os Scopes:**
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:packages` (Upload packages to GitHub Package Registry)
   - ✅ `read:packages` (Download packages from GitHub Package Registry)
   - ✅ `delete:packages` (Delete packages from GitHub Package Registry)

5. **Clica:** `Generate token`

6. **COPIA O TOKEN!** 
   - Começa com `ghp_...`
   - **IMPORTANTE:** Só aparece uma vez!
   - Guarda num lugar seguro

---

## 2️⃣ Configurar Token no Sistema

### Opção A - Variável de Ambiente (Mais Seguro)

**No PowerShell:**

```powershell
# Definir para esta sessão apenas
$env:NODE_AUTH_TOKEN = "ghp_SEU_TOKEN_AQUI"

# Verificar se ficou definido
echo $env:NODE_AUTH_TOKEN
```

**OU Permanente (recomendado):**

```powershell
# Definir permanentemente (precisa reiniciar PowerShell depois)
[System.Environment]::SetEnvironmentVariable('NODE_AUTH_TOKEN', 'ghp_SEU_TOKEN_AQUI', 'User')

# Verificar
[System.Environment]::GetEnvironmentVariable('NODE_AUTH_TOKEN', 'User')
```

---

### Opção B - Editar .npmrc Diretamente (Temporário)

**ATENÇÃO:** O token ficará visível no ficheiro!

Editar `GSPackages/.npmrc`:

```ini
# npm configuration
legacy-peer-deps=true
save-exact=false
engine-strict=false

# GitHub Packages configuration
@globalsoft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_SEU_TOKEN_AQUI

# ⚠️ IMPORTANTE: Não fazer commit deste ficheiro com o token!
```

**Adicionar ao .gitignore:**
```
.npmrc
```

---

## 3️⃣ Testar Autenticação

```bash
cd GSPackages

# Testar se o token funciona
npm whoami --registry=https://npm.pkg.github.com
```

**Deve retornar:** `carlos-gs99`

Se der erro, o token não está configurado corretamente.

---

## 4️⃣ Publicar os Packages

### Publicar Um a Um (Recomendado para primeira vez):

```bash
# Utils
npm publish --workspace @globalsoft/utils --registry=https://npm.pkg.github.com

# Hooks
npm publish --workspace @globalsoft/hooks --registry=https://npm.pkg.github.com

# Primitives
npm publish --workspace @globalsoft/primitives --registry=https://npm.pkg.github.com

# Theme
npm publish --workspace @globalsoft/theme --registry=https://npm.pkg.github.com
```

### OU Publicar Todos de Uma Vez:

```bash
npm publish --workspaces --registry=https://npm.pkg.github.com
```

---

## 5️⃣ Verificar Publicação

Depois de publicar, os packages aparecem em:

1. **Packages do Utilizador:**
   `https://github.com/carlos-gs99?tab=packages`

2. **Packages do Repositório:**
   `https://github.com/carlos-gs99/GSPackages/packages`

3. **Package Individual:**
   - `https://github.com/carlos-gs99/GSPackages/packages/XXXXXXXX` (número gerado)

---

## 6️⃣ Instalar os Packages (Como Utilizador)

### Configurar Cliente para Usar GitHub Packages:

Criar `.npmrc` no projeto que vai usar:

```ini
@globalsoft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN_AQUI
```

**OU** configurar globalmente:

```bash
npm config set @globalsoft:registry https://npm.pkg.github.com
```

### Instalar:

```bash
npm install @globalsoft/utils
npm install @globalsoft/hooks
npm install @globalsoft/primitives
npm install @globalsoft/theme
```

---

## 🚨 Resolução de Problemas

### Erro: "npm error code E401"
**Causa:** Token inválido ou expirado  
**Solução:** Gerar novo token e reconfigurar

### Erro: "npm error code E403"
**Causa:** Sem permissões para publicar  
**Solução:** Verificar se o token tem scope `write:packages`

### Erro: "npm error code E404"
**Causa:** Registry incorreto  
**Solução:** Verificar se `@globalsoft:registry` está configurado

### Erro: "npm error package already exists"
**Causa:** Versão já publicada  
**Solução:** Incrementar versão em `package.json`

---

## 📋 Checklist de Publicação

- [ ] Token PAT criado no GitHub
- [ ] Token configurado (`$env:NODE_AUTH_TOKEN` OU `.npmrc`)
- [ ] Testado autenticação (`npm whoami`)
- [ ] Build dos packages OK (`npm run build`)
- [ ] Publicado @globalsoft/utils
- [ ] Publicado @globalsoft/hooks
- [ ] Publicado @globalsoft/primitives
- [ ] Publicado @globalsoft/theme
- [ ] Verificado packages no GitHub
- [ ] Testado instalação num projeto

---

## 🎯 Comandos Resumidos

```bash
# 1. Configurar token (escolher uma opção)
$env:NODE_AUTH_TOKEN = "ghp_TOKEN"
# OU
# Editar .npmrc manualmente

# 2. Testar
npm whoami --registry=https://npm.pkg.github.com

# 3. Publicar
npm publish --workspace @globalsoft/utils --registry=https://npm.pkg.github.com
npm publish --workspace @globalsoft/hooks --registry=https://npm.pkg.github.com
npm publish --workspace @globalsoft/primitives --registry=https://npm.pkg.github.com
npm publish --workspace @globalsoft/theme --registry=https://npm.pkg.github.com
```

---

## 📚 Próximos Passos Após Publicação

1. ✅ Verificar packages no GitHub
2. ✅ Criar releases/tags
3. ✅ Atualizar README.md com badges
4. ✅ Documentar como instalar
5. ✅ Testar em projeto real

---

**Boa sorte com a publicação! 🚀**

