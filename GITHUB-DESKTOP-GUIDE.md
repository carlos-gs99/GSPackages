# 🖥️ Guia GitHub Desktop - Globalsoft Components

## 🎯 Objetivo

Usar a pasta `packages/` do projeto atual como repositório GitHub separado, sem ter que copiar ficheiros manualmente.

---

## ✅ Setup com GitHub Desktop (5 Passos)

### 1️⃣ Abrir GitHub Desktop

1. Abrir **GitHub Desktop**
2. File → **Add Local Repository**
3. Navegar até: `C:\Users\user\Desktop\New CliCloudLayouts\clicloud3TopbarSidebarFooter\packages`
4. Clicar **Add Repository**

Se der erro "This directory doesn't appear to be a Git repository":
1. Clicar **Create a repository instead**
2. Name: `GSPackages`
3. Local Path: `.../clicloud3TopbarSidebarFooter/packages`
4. ✅ Marcar "Initialize this repository with a README" (ou não, já tens README.md)
5. Git Ignore: **None** (já tens .gitignore)
6. License: **MIT** (já tens LICENSE)
7. Clicar **Create Repository**

### 2️⃣ Conectar ao GitHub

1. No GitHub Desktop: **Publish repository**
2. Name: `GSPackages`
3. Description: "Globalsoft Components - Modern React Component Library"
4. ✅ **DESMARCAR** "Keep this code private" (público)
5. Organization: **Escolher conta pessoal** (carlos-gs99)
6. Clicar **Publish Repository**

✅ **Pronto!** O repo já está no GitHub em https://github.com/carlos-gs99/GSPackages

### 3️⃣ Verificar Ficheiros Iniciais

No GitHub Desktop, deves ver estes ficheiros:
```
✅ package.json
✅ .npmrc
✅ tsconfig.json
✅ .gitignore
✅ .prettierrc
✅ LICENSE
✅ README.md
✅ .github/workflows/ci.yml
✅ .github/workflows/publish.yml
✅ utils/
   ├── src/
   │   ├── debugUtils.ts
   │   ├── dateUtils.ts
   │   ├── ... (todos os utils)
   │   └── index.ts
   ├── package.json
   ├── tsup.config.ts
   └── README.md
```

### 4️⃣ Primeiro Commit

1. No GitHub Desktop, escrever commit message:
   ```
   chore: initial monorepo setup with @globalsoft/utils
   ```
2. Clicar **Commit to main**
3. Clicar **Push origin**

✅ **Feito!** Primeiro package no GitHub!

### 5️⃣ Instalar e Testar Localmente

Abrir terminal na pasta `packages/`:
```bash
# Instalar dependências
npm install

# Build do utils
npm run build --workspace @globalsoft/utils

# Verificar se criou dist/
dir utils\dist
```

---

## 🔄 Adicionar Mais Packages

### Opção A - Via Explorador de Ficheiros (Simples)

1. No Windows Explorer, ir a `clicloud3TopbarSidebarFooter/packages/`
2. Criar pasta `hooks/`
3. Dentro criar pasta `src/`
4. Copiar ficheiros de `../src/hooks/` para `hooks/src/`
5. Criar `hooks/package.json` (copiar de `../src/hooks/package.json` e adaptar)
6. Criar `hooks/tsup.config.ts` (copiar do utils)
7. Copiar `hooks/README.md`

**No GitHub Desktop:**
- Aparece automaticamente os novos ficheiros
- Escrever commit: `feat(hooks): add @globalsoft/hooks package`
- Commit → Push
- ✅ Feito!

### Opção B - Via Terminal (Rápido)

```bash
# Na pasta packages/
cd packages

# Criar estrutura
mkdir hooks\src

# Copiar código
Copy-Item -Path "..\src\hooks\*.ts" -Destination "hooks\src\" -Recurse
Copy-Item -Path "..\src\hooks\README.md" -Destination "hooks\"
Copy-Item -Path "..\src\hooks\package.json" -Destination "hooks\"
Copy-Item -Path "utils\tsup.config.ts" -Destination "hooks\"

# GitHub Desktop detecta automaticamente!
```

---

## 📦 Estrutura Final (Depois de Migrar Tudo)

```
packages/                         ← Repositório GitHub
├── .github/workflows/
├── utils/                        ← @globalsoft/utils
├── hooks/                        ← @globalsoft/hooks
├── primitives/                   ← @globalsoft/primitives
├── theme/                        ← @globalsoft/theme
├── gs-button/                    ← @globalsoft/gs-button
├── gs-input/                     ← @globalsoft/gs-input
├── gs-select/                    ← @globalsoft/gs-select
├── ... (40+ componentes)
├── package.json
├── README.md
└── LICENSE
```

**No projeto original:**
```
clicloud3TopbarSidebarFooter/
├── src/              ← Desenvolvimento continua aqui
├── packages/         ← Repositório GitHub (git separado)
└── ...
```

---

## 🔄 Workflow Diário

### Desenvolvimento Normal (Projeto Atual)
```
1. Trabalhas em src/components/ui/GSButton/
2. Fazes mudanças, testes, etc
3. Tudo normal como sempre
```

### Atualizar Package no GitHub
```
1. Copiar mudanças de src/components/ui/GSButton/ → packages/gs-button/src/
2. GitHub Desktop detecta mudanças
3. Commit: "fix(gs-button): corrigir bug X"
4. Push
5. ✅ Package atualizado no GitHub!
```

### Sincronização Opcional
```
# Podes criar script para copiar automaticamente
# Ou copiar manualmente quando pronto para publicar
```

---

## 🎯 Vantagens Desta Abordagem

✅ **Dois repos separados:**
- Desenvolvimento em `clicloud3TopbarSidebarFooter/` (projeto completo)
- Packages em `packages/` (só o que vai para GitHub)

✅ **GitHub Desktop simples:**
- Apenas aponta para `packages/`
- Commits e pushes visuais
- Sem comandos git complexos

✅ **Desenvolvimento intocado:**
- Projeto atual continua funcionando
- Não quebras nada
- Migras aos poucos

✅ **Controle total:**
- Decides o que vai para GitHub
- Quando vai
- Como vai

---

## ⚠️ Pontos de Atenção

### Manter Sincronizado

Quando mudas código em `src/`, **não esquecer** de copiar para `packages/` antes de publicar.

**Dica:** Podes criar um script:
```json
// Em package.json (projeto atual)
{
  "scripts": {
    "sync:utils": "robocopy src\\utils packages\\utils\\src /MIR /XD node_modules",
    "sync:hooks": "robocopy src\\hooks packages\\hooks\\src /MIR /XD node_modules"
  }
}
```

### Git Ignorar `packages/` no Projeto Principal

No `.gitignore` do projeto principal (`clicloud3TopbarSidebarFooter/.gitignore`):
```
# Packages repository (separate git)
/packages/
```

Assim não tens conflitos entre os dois repositórios!

---

## 📋 Checklist Rápido

- [x] ✅ Pasta `packages/` criada
- [x] ✅ Configs copiados (package.json, .npmrc, etc)
- [x] ✅ Primeiro package (utils) copiado
- [ ] ⏳ GitHub Desktop apontado para `packages/`
- [ ] ⏳ Repository publicado no GitHub
- [ ] ⏳ Primeiro commit e push
- [ ] ⏳ Testar `npm install` na pasta packages/

---

## 🚀 Próximo Passo AGORA

1. **Abre GitHub Desktop**
2. **Add Local Repository** → Navega para `.../clicloud3TopbarSidebarFooter/packages`
3. Se pedir para criar repo → **Create**
4. **Publish repository** → Nome: `GSPackages`
5. ✅ **Feito!**

Depois disto, sempre que fizeres mudanças na pasta `packages/`, o GitHub Desktop detecta automaticamente! 🎉

---

**Tudo pronto para começares!** Queres que te ajude com algum passo específico? 😊

