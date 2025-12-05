# 🔧 Troubleshooting - Guia de Resolução de Problemas

**Status:** Soluções para problemas comuns  
**Última Atualização:** 2025-12-05  
**Uso:** Consultar quando encontrar erro

---

## 🎯 Como Usar Este Guia

1. **Encontrar o erro** na lista abaixo
2. **Seguir a solução** passo a passo
3. **Validar** que problema foi resolvido
4. **Documentar** se encontrar novo problema

---

## 🔴 Erros de Build

### ❌ "Module '[module]' not found"

**Sintomas:**
```
Error: Cannot find module '@carlos-gs99/gs-icon'
```

**Causas:**
- Dependência não declarada em `package.json`
- Dependência não adicionada a `external[]` no `tsup.config.ts`

**Solução:**

```bash
# 1. Adicionar ao package.json
cd gs-component
vim package.json

# Adicionar em peerDependencies E devDependencies:
{
  "peerDependencies": {
    "@carlos-gs99/gs-icon": "^1.0.0"
  },
  "devDependencies": {
    "@carlos-gs99/gs-icon": "^1.0.0"
  }
}

# 2. Adicionar ao tsup.config.ts
vim tsup.config.ts

# Adicionar a external array:
external: [
  'react',
  'react-dom',
  'gs-icon',  // ← Adicionar aqui
],

# 3. Install dependencies
cd ..
npm install

# 4. Build novamente
npm run build --workspace @carlos-gs99/gs-component
```

---

### ❌ "Type errors" (TypeScript)

**Sintomas:**
```
TS2322: Type 'string' is not assignable to type 'number'
TS2339: Property 'x' does not exist on type 'Y'
```

**Causas:**
- Types incorretos
- Props mal tipadas
- Imports incorretos

**Solução:**

```typescript
// 1. Verificar types.ts
export interface GSComponentProps {
  // ❌ MAU
  value: string | number;  // Muito amplo
  
  // ✅ BOM
  value: number;  // Específico
}

// 2. Verificar extends
export interface GSComponentProps 
  extends ComponentPropsWithRef<'div'> {  // ← Elemento correto
  // ...
}

// 3. Verificar forwardRef
export const GSComponent = forwardRef<
  HTMLDivElement,  // ← Type do ref
  GSComponentProps
>((props, ref) => {
  // ...
});

// 4. Build novamente
npm run build --workspace @carlos-gs99/gs-component
```

---

### ❌ "CSS Module declaration not found"

**Sintomas:**
```
TS2307: Cannot find module './styles.module.css'
```

**Causas:**
- Falta ficheiro `css-modules.d.ts`

**Solução:**

```bash
# 1. Criar css-modules.d.ts
cd gs-component/src
cat > css-modules.d.ts << 'EOF'
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
EOF

# 2. Build novamente
cd ../..
npm run build --workspace @carlos-gs99/gs-component
```

---

### ❌ "Workspace dependency not found"

**Sintomas:**
```
Error: Cannot find workspace @carlos-gs99/gs-button
```

**Causas:**
- Package não existe em `package-lock.json`
- Novo package criado mas não instalado

**Solução:**

```bash
# 1. Atualizar package-lock.json
cd GSPackages
npm install

# 2. Verificar que package foi adicionado
grep -r "gs-newcomponent" package-lock.json

# 3. Build novamente
npm run build --workspace @carlos-gs99/gs-newcomponent
```

---

## 🧪 Erros de Testes

### ❌ "Cannot find module in tests"

**Sintomas:**
```
Error: Cannot find module '../GSComponent'
```

**Causas:**
- Component não foi buildado antes de testar
- Import path incorreto

**Solução:**

```bash
# 1. Build ANTES de testar
cd GSPackages
npm run build --workspace @carlos-gs99/gs-component

# 2. Verificar import path
# __tests__/GSComponent.test.tsx
import { GSComponent } from '../GSComponent';  // ✅ Correto

# 3. Executar testes
cd ..
npm test -- gs-component
```

---

### ❌ "Timeout exceeded" em testes

**Sintomas:**
```
Error: Timeout of 5000ms exceeded
```

**Causas:**
- Operação async não aguardada
- Test não tem await
- Component muito lento

**Solução:**

```typescript
// ❌ MAU - Sem await
it('should click button', () => {
  userEvent.click(button);  // ❌ Sem await
  expect(handleClick).toHaveBeenCalled();
});

// ✅ BOM - Com await
it('should click button', async () => {
  await userEvent.click(button);  // ✅ Com await
  expect(handleClick).toHaveBeenCalled();
});

// Ou aumentar timeout:
it('should do something', async () => {
  // ...
}, 10000);  // ← 10 segundos
```

---

### ❌ "Axe violations detected"

**Sintomas:**
```
Expected no axe violations but received:
- "button" must have accessible text
```

**Causas:**
- ARIA labels ausentes
- Elementos sem text alternativo
- Color contrast insuficiente

**Solução:**

```tsx
// ❌ MAU - Sem ARIA
<button onClick={handleClick}>
  <Icon name="close" />
</button>

// ✅ BOM - Com ARIA
<button 
  onClick={handleClick}
  aria-label="Close dialog"  // ← ARIA label
>
  <Icon name="close" />
</button>

// Ou usar screen reader only text:
<button onClick={handleClick}>
  <Icon name="close" />
  <span className={styles.visuallyHidden}>Close</span>
</button>
```

---

### ❌ "i18n translations not found"

**Sintomas:**
```
Error: Missing translation for key 'component.label'
```

**Causas:**
- Namespace não registado
- Ficheiro i18n.ts não importado
- Key não existe em en.json/pt.json

**Solução:**

```typescript
// 1. Verificar i18n.ts existe e está correto
// src/i18n.ts
import { registerTranslations } from '@carlos-gs99/hooks';
import en from './i18n/en.json';
import pt from './i18n/pt.json';

registerTranslations('gs-component', { en, pt });

// 2. Importar i18n no componente
// src/GSComponent.tsx
import './i18n';  // ← Import ANTES de usar

const { t } = useTranslation('gs-component');

// 3. Verificar key existe
// i18n/en.json
{
  "component": {
    "label": "Label text"  // ← Key deve existir
  }
}

// 4. Executar testes
npm test -- gs-component --grep "i18n"
```

---

## 🎨 Erros de CSS

### ❌ "CSS classes not applied"

**Sintomas:**
- Component renderiza mas sem estilos
- Classes CSS não aparecem

**Causas:**
- CSS Module não importado
- Nome de classe incorreto
- CSS não buildado

**Solução:**

```typescript
// 1. Verificar import
import styles from './styles.module.css';  // ✅ Correto

// 2. Verificar uso
<div className={styles.component}>  // ✅ Correto
  {children}
</div>

// 3. Verificar nome no CSS
// styles.module.css
.component {  // ← Nome deve coincidir
  /* ... */
}

// 4. Build novamente
npm run build --workspace @carlos-gs99/gs-component
```

---

### ❌ "Token CSS não funciona"

**Sintomas:**
```css
.component {
  color: var(--gs-color-primary);  /* ❌ Não funciona */
}
```

**Causas:**
- Token CSS não existe
- Theme não importado
- Nome do token incorreto

**Solução:**

```tsx
// 1. Importar theme tokens na app
import '@carlos-gs99/theme/tokens.css';

// 2. Verificar token existe
// theme/src/tokens.css
:root {
  --gs-color-primary: #007bff;  // ← Deve existir
}

// 3. Usar token correto
.component {
  color: var(--gs-color-primary);  // ✅ Nome correto
}

// 4. Build theme
npm run build --workspace @carlos-gs99/theme
```

---

## 🔄 Erros de Git

### ❌ "Merge conflicts"

**Sintomas:**
```
CONFLICT (content): Merge conflict in file.tsx
```

**Solução:**

```bash
# 1. Ver conflitos
git status

# 2. Abrir ficheiro e resolver
vim file.tsx

# Procurar por:
<<<<<<< HEAD
[seu código]
=======
[código do remote]
>>>>>>> branch

# 3. Escolher versão ou merge manual

# 4. Adicionar resolved
git add file.tsx

# 5. Continuar merge/rebase
git merge --continue
# ou
git rebase --continue
```

---

### ❌ "Rejected push (out of sync)"

**Sintomas:**
```
! [rejected] main -> main (fetch first)
```

**Solução:**

```bash
# 1. Fetch e pull primeiro
git fetch origin
git pull origin main

# 2. Resolver conflitos se houver
# (ver secção acima)

# 3. Push novamente
git push origin main
```

---

## 🚨 Erros de CI/CD

### ❌ "CI build fails but local build works"

**Sintomas:**
- Build local: ✅ Passa
- Build CI: ❌ Falha

**Causas:**
- Cache do CI desatualizado
- Dependências não em package-lock.json
- Environment variables diferentes

**Solução:**

```bash
# 1. Simular CI localmente
cd GSPackages
./simulate-ci.ps1

# 2. Verificar package-lock.json atualizado
npm install  # Atualiza lock file

# 3. Commit lock file
git add package-lock.json
git commit -m "chore: update package-lock.json"
git push

# 4. Re-run CI (auto-trigger)
```

---

### ❌ "Tests pass locally but fail in CI"

**Sintomas:**
- Testes locais: ✅ Passam
- Testes CI: ❌ Falham

**Causas:**
- Timezone differences
- Environment setup
- Async timing issues

**Solução:**

```typescript
// 1. Usar timers fake
import { vi } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// 2. Aumentar timeouts
it('should do something', async () => {
  // ...
}, 10000);  // 10 segundos

// 3. Usar waitFor
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(element).toBeInTheDocument();
});
```

---

## 💻 Erros de Desenvolvimento

### ❌ "Hot reload not working"

**Sintomas:**
- Mudanças no código não aparecem
- Precisa refresh manual

**Solução:**

```bash
# 1. Restart dev server
# Ctrl+C para parar
npm run dev

# 2. Clear cache
rm -rf node_modules/.cache
rm -rf dist/

# 3. Rebuild
npm run build
npm run dev
```

---

### ❌ "IDE não reconhece types"

**Sintomas:**
- IntelliSense não funciona
- Types mostram como 'any'

**Solução:**

```bash
# 1. Restart TypeScript server
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"

# 2. Verificar tsconfig.json
cat tsconfig.json
# Deve incluir:
{
  "compilerOptions": {
    "types": ["node", "vitest"],
    "moduleResolution": "bundler"
  }
}

# 3. Rebuild
npm run build

# 4. Restart IDE
```

---

## 🔍 Debugging Avançado

### Enable Debug Mode

```tsx
// 1. Ativar em componente
<GSComponent debug>Content</GSComponent>

// Console mostra:
// [GSComponent] Rendering with props: {...}
// [GSComponent] State changed: {...}

// 2. Verificar data attributes
// Browser DevTools:
// <div data-gs-debug="GSComponent" data-gs-state="{...}">
```

### Verbose Testing

```bash
# Testes com mais informação
npm test -- gs-component --verbose

# Com reporter detalhado
npm test -- --reporter=verbose

# Com stack traces completos
npm test -- --no-coverage --verbose
```

### Build Verbose

```bash
# Build com logs completos
npm run build --workspace @carlos-gs99/gs-component -- --verbose

# TypeScript diagnostics
npm run typecheck -- --listFiles
```

---

## 📋 Checklist de Troubleshooting

Quando encontrar erro, seguir esta ordem:

1. [ ] **Ler mensagem de erro completa**
   - Não só primeira linha
   - Ler stack trace
   - Identificar linha exata

2. [ ] **Verificar ficheiro mencionado**
   - Abrir ficheiro
   - Ver linha do erro
   - Entender contexto

3. [ ] **Procurar neste guia**
   - Ver se erro está listado
   - Seguir solução proposta

4. [ ] **Build limpo**
   ```bash
   rm -rf dist/ node_modules/.cache
   npm run build
   ```

5. [ ] **Verificar dependencies**
   ```bash
   npm install
   npm run build
   ```

6. [ ] **Executar linting**
   ```bash
   npm run lint
   npm run typecheck
   ```

7. [ ] **Simular CI**
   ```bash
   ./simulate-ci.ps1
   ```

8. [ ] **Consultar documentação**
   - README do componente
   - docs/indices/best-practices.md
   - docs/packaging/authoring-rules.md

9. [ ] **Pedir ajuda**
   - Criar issue no GitHub
   - Incluir mensagem de erro completa
   - Incluir passos para reproduzir

---

## 🆘 Quando Nada Funciona

### Nuclear Option (Reset Total)

```bash
# ⚠️ AVISO: Apaga tudo e recomeça do zero

# 1. Backup (se necessário)
git stash

# 2. Limpar tudo
rm -rf node_modules/
rm -rf dist/
rm -rf coverage/
rm -rf .turbo/
rm -rf package-lock.json

# 3. Reinstalar
npm install

# 4. Rebuild tudo
npm run build

# 5. Testar
npm test

# 6. Restore backup (se necessário)
git stash pop
```

---

## 📝 Adicionar Novo Problema

Encontrou problema novo? Adicione aqui:

```markdown
### ❌ [Título do Problema]

**Sintomas:**
```
[Mensagem de erro ou descrição]
```

**Causas:**
- [Causa 1]
- [Causa 2]

**Solução:**

```bash
# Passo 1
[comando ou ação]

# Passo 2
[comando ou ação]
```

**Validação:**
[Como confirmar que problema foi resolvido]
```

---

## 🔗 Recursos Úteis

- **Stack Overflow:** https://stackoverflow.com/questions/tagged/react
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **Vitest Docs:** https://vitest.dev/
- **Testing Library:** https://testing-library.com/react
- **GitHub Issues:** https://github.com/carlos-gs99/GSPackages/issues

---

**Problemas fazem parte do desenvolvimento! Use este guia para resolver rápido!** 🔧

