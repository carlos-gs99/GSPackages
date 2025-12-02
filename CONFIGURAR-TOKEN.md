# 🔑 Configurar Token do GitHub - Método Permanente

## 🎯 Criar Ficheiro .env (Recomendado)

### Passo a Passo:

#### 1. Criar ficheiro `.env` na pasta `GSPackages/`

```bash
# No PowerShell, na pasta GSPackages:
New-Item -Path ".env" -ItemType File -Force
```

#### 2. Editar o ficheiro `.env`

Abrir `GSPackages/.env` num editor de texto e adicionar:

```env
NODE_AUTH_TOKEN=ghp_SEU_TOKEN_AQUI
```

**SUBSTITUIR `ghp_SEU_TOKEN_AQUI` pelo teu token real!**

---

## ⚡ Usar o Token Automaticamente

### Opção A - PowerShell (Carregar .env manualmente)

Criar script `load-env.ps1`:

```powershell
# GSPackages/load-env.ps1
Get-Content .env | ForEach-Object {
    if ($_ -match '^\s*([^#][^=]+)=(.+)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value, 'Process')
        Write-Host "✅ $name configurado"
    }
}
```

**Usar:**
```powershell
cd GSPackages
.\load-env.ps1
npm publish --workspace @carlos-gs99/gs-icon
```

---

### Opção B - dotenv em npm scripts

```bash
# Instalar dotenv-cli
npm install -D dotenv-cli

# Usar em scripts (package.json):
"publish:utils": "dotenv npm publish --workspace @carlos-gs99/utils",
"publish:hooks": "dotenv npm publish --workspace @carlos-gs99/hooks",
```

---

### Opção C - Variável de Ambiente Permanente (Windows)

**PowerShell como Administrador:**

```powershell
[System.Environment]::SetEnvironmentVariable(
    'NODE_AUTH_TOKEN', 
    'ghp_SEU_TOKEN', 
    'User'
)
```

**Vantagem:** Funciona em TODAS as sessões PowerShell  
**Desvantagem:** Token fica no sistema (menos seguro)

---

## 🔒 Segurança

### ✅ O que FAZER:
- ✅ Adicionar `.env` ao `.gitignore` (já está!)
- ✅ Nunca fazer commit do `.env`
- ✅ Usar `.env.example` como template
- ✅ Guardar token em lugar seguro

### ❌ O que NÃO fazer:
- ❌ Fazer commit do `.env`
- ❌ Partilhar o token
- ❌ Deixar token em código
- ❌ Usar token em variáveis hardcoded

---

## 📋 Verificar .gitignore

O `.gitignore` deve ter:

```gitignore
# Environment variables
.env
.env.local
.env.*.local

# npm
node_modules
.npmrc
```

✅ Já está configurado!

---

## 🚀 Publicar com .env

### Depois de criar .env com o token:

**PowerShell:**
```powershell
# Carregar variáveis do .env
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.+)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        Set-Item -Path "env:$name" -Value $value
    }
}

# Publicar
npm publish --workspace @carlos-gs99/gs-icon
```

---

## 💡 Solução MAIS SIMPLES (Para Já)

**Apenas criar comando para cada sessão:**

```powershell
# Copiar e colar isto no início de cada sessão PowerShell
$env:NODE_AUTH_TOKEN = "ghp_SEU_TOKEN_REAL"
```

**Guardar o token num ficheiro de texto seguro** (fora do Git) e copiar quando necessário.

---

## ✅ Recomendação

Para AGORA:
```powershell
# 1. Copiar isto e substituir o token
$env:NODE_AUTH_TOKEN = "ghp_SEU_TOKEN"

# 2. Verificar
echo $env:NODE_AUTH_TOKEN

# 3. Publicar
npm publish --workspace @carlos-gs99/gs-icon
```

**É a forma mais rápida! Depois configuramos melhor se quiseres.**

---

**Configura o token e publica! 🚀**

