# 🔐 GUIA DE AUTENTICAÇÃO CI - GITHUB PACKAGES

**Data:** 2025-12-04  
**Problema Resolvido:** CI falhava porque não conseguia instalar packages GS do GitHub Packages  
**Solução:** Configurar autenticação em GitHub Actions

---

## 🐛 **PROBLEMA ORIGINAL**

### **Erro no CI:**
```
error TS2307: Cannot find module '@carlos-gs99/gs-icon' or its corresponding type declarations.
error TS2307: Cannot find module '@carlos-gs99/gs-loading' or its corresponding type declarations.
```

### **Causa Raiz:**
1. npm ci no GitHub Actions não instala `peerDependencies`
2. Packages GS estão em GitHub Packages PRIVADO
3. GitHub Packages requer autenticação mesmo para packages "públicos"
4. CI não tinha `NODE_AUTH_TOKEN` configurado
5. TypeScript DTS generation falhava porque não encontrava os types

---

## ✅ **SOLUÇÃO IMPLEMENTADA**

### **1. Atualizar package.json (3 packages):**

**Adicionar packages GS em peerDependencies E devDependencies:**

```json
{
  "peerDependencies": {
    "@carlos-gs99/gs-icon": "^1.0.0"
  },
  "devDependencies": {
    "@carlos-gs99/gs-icon": "^1.0.0",
    // ... outros
  }
}
```

**Porquê?**
- `peerDependencies` → Para consumidores do package (quando publicado)
- `devDependencies` → Para npm ci instalar durante build/CI

**Packages corrigidos:**
- ✅ `gs-alert/package.json`
- ✅ `gs-card/package.json`
- ✅ `gs-tooltip/package.json`

---

### **2. Configurar tsup.config.ts (3 packages):**

**Adicionar packages GS ao array `external`:**

```typescript
export default defineConfig({
  // ...
  external: [
    'react', 
    'react-dom', 
    'react-i18next',
    '@carlos-gs99/hooks',
    '@carlos-gs99/utils',
    '@carlos-gs99/gs-icon',      // ← Adicionar
    '@carlos-gs99/gs-loading',   // ← Adicionar
    '@carlos-gs99/primitives',   // ← Adicionar
  ],
});
```

**Porquê?**
- Evita bundlar os packages GS no output
- Mantém como dependencies externas
- Reduz tamanho do bundle

**Packages corrigidos:**
- ✅ `gs-alert/tsup.config.ts`
- ✅ `gs-card/tsup.config.ts`
- ✅ `gs-tooltip/tsup.config.ts`

---

### **3. Criar GitHub Actions workflows (2 files):**

**`.github/workflows/ci.yml`** (4 jobs):

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
    registry-url: 'https://npm.pkg.github.com'
    scope: '@carlos-gs99'

- name: Install dependencies
  run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**CRÍTICO:** `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`

**Como funciona:**
1. `setup-node` configura registry para GitHub Packages
2. `NODE_AUTH_TOKEN` é automaticamente disponibilizado pelo GitHub
3. `.npmrc` usa `${NODE_AUTH_TOKEN}` para autenticar
4. npm ci consegue baixar packages privados do GitHub Packages

**`.github/workflows/publish.yml`:**
- Publica automaticamente em push para main
- Usa mesma autenticação

---

### **4. Script de Simulação CI (`simulate-ci.ps1`):**

**Replica EXATAMENTE o GitHub Actions:**

```powershell
# 1. Remove node_modules (ambiente limpo)
# 2. npm ci (não npm install!)
# 3. TypeCheck
# 4. Lint
# 5. Test
# 6. Build (detecta erros de DTS, duplicate keys, missing modules)
```

**Usar SEMPRE antes de commit:**
```bash
.\simulate-ci.ps1
```

**Exit codes:**
- `0` = Seguro para commit
- `1` = Erros encontrados, NÃO fazer commit

---

## 🔑 **AUTENTICAÇÃO - COMO FUNCIONA**

### **Local (.npmrc):**
```ini
@carlos-gs99:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**Variável de ambiente:**
```powershell
$env:NODE_AUTH_TOKEN = "ghp_YOUR_TOKEN"
```

### **GitHub Actions:**
```yaml
env:
  NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**`secrets.GITHUB_TOKEN`:**
- Automaticamente disponibilizado pelo GitHub Actions
- Tem permissões para ler packages do mesmo repositório
- Renovado automaticamente
- Não precisa configurar em Settings → Secrets!

---

## 📊 **PACKAGES PUBLICADOS**

**Total: 25 packages (21 GS + 4 Base)**

### **Base Packages:**
- @carlos-gs99/utils@1.0.0
- @carlos-gs99/hooks@1.0.0
- @carlos-gs99/primitives@1.0.0
- @carlos-gs99/theme@1.0.0

### **GS Components (21):**
- gs-icon, gs-badge, gs-spinner, gs-skeleton, gs-loading
- gs-chip, gs-label, gs-divider, gs-avatar, gs-progress
- gs-tooltip, gs-button, gs-alert, gs-toast, gs-modal
- gs-card, gs-list, gs-select, gs-input, gs-checkbox
- gs-tabs

---

## ✅ **CHECKLIST DE VALIDAÇÃO**

Antes de fazer commit:

- [x] Executar `.\simulate-ci.ps1`
- [x] Ver "[SUCESSO] SIMULACAO CI: 100% PASSING"
- [x] Verificar todos os 6 checks passaram
- [x] Confirmar 75 builds successful
- [x] Confirmar 153 testes passing
- [x] Git add + commit + push

---

## 🚨 **TROUBLESHOOTING**

### **Erro: "Cannot find module @carlos-gs99/..."**
**Causa:** Package GS não está em devDependencies  
**Fix:** Adicionar em peerDependencies E devDependencies

### **Erro: "Duplicate key 'dependencies'"**
**Causa:** package.json tem chave duplicada  
**Fix:** Fazer merge das dependencies num único objeto

### **Erro: "EUNSUPPORTEDPROTOCOL workspace:*"**
**Causa:** workspace:* em dependencies (só funciona em peerDeps)  
**Fix:** Usar versão específica (^1.0.0) ou remover

### **Simulação local passa mas CI falha:**
**Causa:** npm install cria symlinks, npm ci não  
**Fix:** Usar simulate-ci.ps1 que usa npm ci

---

## 📝 **LIÇÕES APRENDIDAS**

### **✅ O Que Funciona:**
1. **peerDependencies + devDependencies** para packages GS
2. **external** no tsup.config.ts para não bundlar
3. **NODE_AUTH_TOKEN** no GitHub Actions
4. **simulate-ci.ps1** para detectar problemas antes do commit
5. **npm ci** (não npm install) para replicar CI

### **❌ O Que NÃO Funciona:**
1. Apenas peerDependencies (npm ci não instala)
2. workspace:* em dependencies (erro EUNSUPPORTEDPROTOCOL)
3. npm install para simular CI (cria symlinks que CI não tem)
4. Assumir que local = CI (comportamentos diferentes!)

---

## 🎯 **RESULTADO FINAL**

```
✅ CI GitHub Actions: Configurado com autenticação
✅ Packages: 25/25 publicados no GitHub Packages
✅ Dependencies: Corretamente configuradas
✅ Build: 100% passing (75 builds)
✅ Tests: 100% passing (153 tests)
✅ Simulação: Script validado e funcional
```

---

**DOCUMENTADO POR:** Agent + User  
**DATA:** 2025-12-04  
**STATUS:** ✅ PROBLEMA RESOLVIDO  

