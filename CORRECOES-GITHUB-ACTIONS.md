# 🔧 Correções GitHub Actions - Histórico

## ❌ Problema 1: Node.js Version Incompatível

### Erro Original:
```
npm error engine Unsupported engine
npm error engine Not compatible with your version of node/npm: @isaacs/balanced-match@4.0.1
npm error notsup Required: {"node":"20 || >=22"}
npm error notsup Actual:   {"npm":"10.8.2","node":"v18.20.8"}
```

### Causa:
- Workflows configurados para Node.js 18
- Dependência `@isaacs/balanced-match@4.0.1` requer Node.js 20+

### Solução:
✅ Atualizado todos os workflows para Node.js 20

**Ficheiros alterados:**
- `.github/workflows/ci.yml` - `node-version: '20'`
- `.github/workflows/publish.yml` - `node-version: '20'`
- `package.json` - `engines.node: ">=20.0.0"`

---

## ❌ Problema 2: @tanstack/react-table Missing

### Erro:
```
Cannot find module '@tanstack/react-table' or its corresponding type declarations.
```

### Causa:
- `tableUtils.ts` e `testUtils.ts` importam tipos de `@tanstack/react-table`
- Dependência não estava instalada no workspace

### Solução:
✅ Adicionado `@tanstack/react-table` às dependências

**Ficheiros alterados:**

1. **`utils/package.json`:**
   ```json
   "peerDependencies": {
     "@tanstack/react-table": "^8.0.0"
   },
   "peerDependenciesMeta": {
     "@tanstack/react-table": {
       "optional": true
     }
   },
   "devDependencies": {
     "@tanstack/react-table": "^8.20.5"
   }
   ```

2. **`package.json` (root):**
   ```json
   "devDependencies": {
     "@tanstack/react-table": "^8.20.5",
     "react": "^18.3.1"
   }
   ```

3. **`.npmrc`:**
   ```
   legacy-peer-deps=true
   engine-strict=false
   ```

---

## ✅ Status Final

### Todos os Comandos Passam:
```bash
✅ npm run build      # Build com DTS
✅ npm run typecheck  # TypeScript OK
✅ npm run lint       # ESLint OK
✅ npm run test       # Vitest OK
```

### GitHub Actions:
Após fazer commit das alterações:
- ✅ Lint - Deve passar
- ✅ Type Check - Deve passar (com Node 20 + @tanstack)
- ✅ Test - Deve passar
- ✅ Build - Deve passar

---

## 📋 Checklist para Próximo Push

Antes de fazer push para GitHub:

- [x] Node.js 20 nos workflows
- [x] @tanstack/react-table instalado
- [x] React instalado (peer dependency)
- [x] .npmrc com legacy-peer-deps=true
- [x] Todos os scripts passam localmente

**Fazer commit e push AGORA! Deve funcionar! 🚀**

---

**Data:** 2025-12-02  
**Status:** ✅ Pronto para GitHub

