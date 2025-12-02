# 🚀 START HERE - Setup em 3 Passos!

## ✅ Passo 1: GitHub Desktop (2 minutos)

1. **Abrir GitHub Desktop**
2. **File** → **Add Local Repository...**
3. **Choose:** Navegar até esta pasta (`GSPackages`)
4. Clicar **Add Repository**

Se pedir para criar:
5. Clicar **create a repository here instead**
6. Clicar **Create Repository**

Depois:
7. **Publish repository**
8. Name: `GSPackages`
9. Description: `Globalsoft Components - Modern React Component Library`
10. ✅ **Desmarcar** "Keep this code private"
11. Clicar **Publish Repository**

✅ **Pronto! Repositório no GitHub:** https://github.com/carlos-gs99/GSPackages

---

## ✅ Passo 2: Instalar Dependências (1 minuto)

Abrir terminal **nesta pasta** (`GSPackages/`):

```bash
npm install
```

**Nota:** Vais ver alguns warnings de packages deprecated. **É normal!** São de sub-dependências de ferramentas de desenvolvimento e **não afetam** os packages publicados. Ver [SOBRE-WARNINGS.md](./SOBRE-WARNINGS.md) para mais detalhes.

Aguardar instalação (~30 segundos).

---

## ✅ Passo 3: Testar Build (1 minuto)

```bash
npm run build --workspace @globalsoft/utils
```

Se funcionar, deves ver:
```
✓ Built in XXXms
dist/index.js       XXkb
dist/index.mjs      XXkb
dist/index.d.ts     XXkb
```

✅ **Package utils está pronto!**

**Nota:** 2 utils foram temporariamente excluídos (`classNameUtils`, `renderUtils`) porque têm dependências de componentes. Ver [utils/EXCLUDED-UTILS.md](./utils/EXCLUDED-UTILS.md) para detalhes. Os restantes 18 utils estão todos disponíveis!

---

## 🎯 O Que Tens Agora

- ✅ Repositório GitHub: https://github.com/carlos-gs99/GSPackages
- ✅ Primeiro package: `@globalsoft/utils` (20 utilities)
- ✅ Build funcionando
- ✅ GitHub Actions configurado (CI automático)
- ✅ Pronto para adicionar mais packages!

---

## 🔄 Adicionar Mais Packages (Quando Quiseres)

### Copiar hooks (exemplo):

```bash
# Criar estrutura
mkdir hooks\src

# Copiar código (estar na pasta GSPackages)
Copy-Item -Path "..\src\hooks\*.ts" -Destination "hooks\src\" -Recurse
Copy-Item -Path "..\src\hooks\README.md" -Destination "hooks\"
Copy-Item -Path "..\src\hooks\package.json" -Destination "hooks\"
Copy-Item -Path "utils\tsup.config.ts" -Destination "hooks\"

# Editar hooks/package.json:
# - Trocar @gs-style/hooks → @globalsoft/hooks
# - Atualizar repository.url para carlos-gs99/GSPackages

# No GitHub Desktop:
# - Aparece os novos ficheiros
# - Commit: "feat(hooks): add @globalsoft/hooks package"
# - Push

# Build
npm run build --workspace @globalsoft/hooks
```

✅ **Repetir para cada package!**

---

## 📝 Estrutura de Cada Package

Quando criares novo package, seguir este padrão:

```
gs-button/                    ← Nome da pasta (lowercase, com hífen)
├── src/
│   ├── GSButton.tsx         ← Componente (PascalCase com GS)
│   ├── types.ts
│   ├── styles.module.css
│   ├── i18n/
│   └── index.ts
├── package.json             ← name: "@globalsoft/gs-button"
├── tsup.config.ts
└── README.md
```

**Naming:**
- Pasta: `gs-button` (lowercase)
- Package: `@globalsoft/gs-button`
- Componente: `GSButton` (PascalCase)

---

## 🎯 Próximo Passo

**Agora:**
1. Abre GitHub Desktop
2. Aponta para pasta `GSPackages`
3. Publish no GitHub
4. ✅ Feito!

**Depois:**
5. Copia mais packages conforme precisares
6. Commit com GitHub Desktop
7. Push
8. Repete!

---

**Tudo está em `GSPackages/` agora! Segue os 3 passos acima e estás pronto!** 🚀

