# 📦 PLANO DE PUBLICAÇÃO - GITHUB PACKAGES

**Data:** 2025-12-04  
**Objetivo:** Publicar packages base no GitHub Packages para resolver dependências circulares no CI

---

## 🎯 PROBLEMA A RESOLVER

**CI Falha com:**
```
error TS2307: Cannot find module '@carlos-gs99/gs-icon' or its corresponding type declarations.
error TS2307: Cannot find module '@carlos-gs99/gs-loading' or its corresponding type declarations.
```

**Causa:** 
- `peerDependencies` com `workspace:*` não são instaladas pelo `npm ci` no CI
- `workspace:*` não pode ir em `dependencies` (erro EUNSUPPORTEDPROTOCOL)

**Solução:**
- Publicar packages base no GitHub Packages
- Usar versões publicadas (ex: `^1.0.0`) em vez de `workspace:*`

---

## 📦 PACKAGES A PUBLICAR (ORDEM)

### **WAVE 1 - Base Dependencies (sem GS dependencies):**

1. **@carlos-gs99/utils** v1.0.0
   - Status: ✅ Build OK
   - Dependencies: Nenhuma GS
   
2. **@carlos-gs99/hooks** v1.0.0
   - Status: ✅ Build OK
   - Dependencies: Nenhuma GS
   
3. **@carlos-gs99/primitives** v1.0.0
   - Status: ✅ Build OK
   - Dependencies: Nenhuma GS
   
4. **@carlos-gs99/theme** v1.0.0
   - Status: ✅ Build OK
   - Dependencies: Nenhuma GS

### **WAVE 2 - Tier 0 Components (dependem apenas de Wave 1):**

5. **@carlos-gs99/gs-icon** v1.0.0
   - Status: ✅ Build OK, 10 testes passing
   - Dependencies: @carlos-gs99/hooks, @carlos-gs99/utils
   
6. **@carlos-gs99/gs-badge** v1.0.0
   - Status: ✅ Build OK, 21 testes passing
   - Dependencies: @carlos-gs99/hooks, @carlos-gs99/utils
   
7. **@carlos-gs99/gs-loading** v1.0.0
   - Status: ✅ Build OK
   - Dependencies: @carlos-gs99/hooks, @carlos-gs99/utils
   
8. **@carlos-gs99/gs-spinner** v1.0.0
   - Status: ✅ Build OK
   - Dependencies: @carlos-gs99/hooks, @carlos-gs99/utils

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA

### **Token GitHub:**
```powershell
$env:NODE_AUTH_TOKEN = "ghp_YOUR_TOKEN_HERE"
```

**Scopes necessários:**
- ✅ `write:packages`
- ✅ `read:packages`

### **Verificar .npmrc:**
```ini
@carlos-gs99:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

---

## 📋 COMANDOS DE PUBLICAÇÃO

### **Manual (um a um):**
```bash
# Wave 1
npm publish --workspace=utils --access public
npm publish --workspace=hooks --access public
npm publish --workspace=primitives --access public
npm publish --workspace=theme --access public

# Wave 2
npm publish --workspace=gs-icon --access public
npm publish --workspace=gs-badge --access public
npm publish --workspace=gs-loading --access public
npm publish --workspace=gs-spinner --access public
```

### **Automático (todos de uma vez):**
```bash
npm publish --workspaces --access public
```

**⚠️ ATENÇÃO:** Automático pode falhar se houver dependências entre packages!

---

## ✅ PÓS-PUBLICAÇÃO

### **Verificar Publicação:**
```bash
npm view @carlos-gs99/utils
npm view @carlos-gs99/hooks
npm view @carlos-gs99/primitives
npm view @carlos-gs99/theme
npm view @carlos-gs99/gs-icon
npm view @carlos-gs99/gs-loading
```

### **Atualizar Referências:**

Depois de publicar, atualizar packages que usam as dependencies:

**gs-alert/package.json:**
```json
"peerDependencies": {
  "@carlos-gs99/gs-icon": "^1.0.0"  // ← mudar de workspace:* para ^1.0.0
}
```

**gs-card/package.json:**
```json
"peerDependencies": {
  "@carlos-gs99/gs-icon": "^1.0.0",
  "@carlos-gs99/gs-loading": "^1.0.0"
}
```

**gs-tooltip/package.json:**
```json
"peerDependencies": {
  "@carlos-gs99/primitives": "^1.0.0"
}
```

**E TODOS os outros packages que usam hooks/utils:**
```json
"peerDependencies": {
  "@carlos-gs99/hooks": "^1.0.0",
  "@carlos-gs99/utils": "^1.0.0"
}
```

### **Reinstalar:**
```bash
npm install
```

### **Validar CI Novamente:**
```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

---

## 🚨 TROUBLESHOOTING

### **Erro: 404 Not Found**
- Verificar se o repositório existe no GitHub
- Verificar se tens permissões de write
- Verificar se o scope @carlos-gs99 está correto

### **Erro: 401 Unauthorized**
- Token inválido ou expirado
- Recriar token com scopes corretos

### **Erro: 403 Forbidden**
- Sem permissões para publicar
- Verificar se és owner/admin do repo

---

## 📊 ESTIMATIVA

- **Publicação manual:** ~15-20min (1-2min por package)
- **Atualização de referências:** ~10min
- **Validação:** ~5min
- **Total:** ~30-35min

---

**PRONTO PARA COMEÇAR!** 🚀

Assim que configurares o token, podemos iniciar a publicação!

