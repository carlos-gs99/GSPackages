# ===================================================
# SIMULACAO PUBLISH PACKAGES - REPLICA GITHUB ACTIONS
# ===================================================
# Este script simula o job "Publish Packages" do GitHub Actions,
# mas usando npm publish em modo --dry-run (nao publica de verdade).
#
# Uso:
#   cd GSPackages
#   .\simulate-publish.ps1
#
# Objetivo:
# - Garantir que:
#   - npm ci funciona num ambiente limpo
#   - npm run build funciona para TODOS os workspaces
#   - npm publish --workspaces (dry-run) nao rebenta
#   - Conseguimos detetar localmente quase todos os erros que o job real teria

Write-Host "`n===============================================================" -ForegroundColor Cyan
Write-Host "  SIMULACAO PUBLISH PACKAGES - GITHUB ACTIONS REPLICA" -ForegroundColor Cyan
Write-Host "===============================================================" -ForegroundColor Cyan

$ErrorActionPreference = "Continue"
$global:hasErrors = $false

# ===================================================
# STEP 0: CARREGAR TOKEN (se existir .env.example)
# ===================================================
Write-Host "`n[0/4] Configurando NODE_AUTH_TOKEN (se .env.example existir)..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Get-Content .env.example | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.+)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            if ($name -eq "NODE_AUTH_TOKEN") {
                Set-Item -Path "env:$name" -Value $value
                Write-Host "[OK] $name configurado a partir de .env.example" -ForegroundColor Green
            }
        }
    }
} else {
    Write-Host "[AVISO] .env.example nao encontrado - assumindo que NODE_AUTH_TOKEN ja esta configurado no ambiente." -ForegroundColor Yellow
}

# ===================================================
# STEP 1: LIMPAR AMBIENTE (como no CI) - dist + node_modules
# ===================================================
Write-Host "`n[1/4] Limpando dist/ de TODOS os packages + node_modules (como no CI do publish)..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $cleanOutput = npm run clean 2>&1
    $cleanExitCode = $LASTEXITCODE

    if ($cleanExitCode -ne 0) {
        Write-Host "[AVISO] npm run clean falhou, a continuar mesmo assim..." -ForegroundColor Yellow
        $cleanOutput | Select-String "error" | Select-Object -First 5 | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    } else {
        Write-Host "[OK] Ambiente limpo (dist + node_modules)" -ForegroundColor Green
    }
} else {
    Write-Host "[ERRO] npm nao encontrado no PATH" -ForegroundColor Red
    exit 1
}

# ===================================================
# STEP 2: INSTALAR COM npm ci (como no job do publish)
# ===================================================
Write-Host "`n[2/4] Instalando com npm ci (EXATAMENTE como no job Publish Packages)..." -ForegroundColor Yellow
$installOutput = npm ci 2>&1
$installExitCode = $LASTEXITCODE

if ($installExitCode -ne 0) {
    Write-Host "[ERRO] npm ci FALHOU!" -ForegroundColor Red
    $installOutput | Select-String "error|EUNSUPPORTED" | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    $global:hasErrors = $true
    exit 1
} else {
    $added = $installOutput | Select-String "added (\d+) packages"
    Write-Host "[OK] $added" -ForegroundColor Green
}

# ===================================================
# STEP 3: Build (igual ao job de publish)
# ===================================================
Write-Host "`n[3/4] Build de TODOS os packages (npm run build)..." -ForegroundColor Yellow
$buildOutput = npm run build 2>&1
$buildExitCode = $LASTEXITCODE

if ($buildExitCode -ne 0) {
    Write-Host "[ERRO] Build FALHOU durante a simulacao de publish!" -ForegroundColor Red
    $buildOutput | Select-String "error TS|Build error|Cannot find module|npm error.*failed" | Select-Object -First 15 | ForEach-Object {
        Write-Host $_ -ForegroundColor Red
    }
    $global:hasErrors = $true
    exit 1
} else {
    $successCount = ($buildOutput | Select-String "Build success").Count
    Write-Host "[OK] Build PASS ($successCount builds)" -ForegroundColor Green
}

# ===================================================
# STEP 4: Simular npm publish --workspaces (dry-run)
# ===================================================
Write-Host "`n[4/4] Simulando npm publish --workspaces (DRY-RUN, NAO PUBLICA DE VERDADE)..." -ForegroundColor Yellow

# Usamos --dry-run para validar packaging, mas sem publicar
$publishOutput = npm publish --workspaces --access public --dry-run 2>&1
$publishExitCode = $LASTEXITCODE

if ($publishExitCode -ne 0) {
    Write-Host "[ERRO] Simulacao de publish FALHOU!" -ForegroundColor Red

    # Mostrar erros mais relevantes
    $publishErrors = $publishOutput | Select-String "E401|E403|E404|E409|ERR|error|npm error"
    if ($publishErrors.Count -eq 0) {
        $publishErrors = $publishOutput | Select-Object -First 20
    }

    $publishErrors | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    $global:hasErrors = $true
    exit 1
} else {
    Write-Host "[OK] Simulacao de publish PASS (npm publish --workspaces --dry-run)" -ForegroundColor Green
}

# ===================================================
# RESULTADO FINAL
# ===================================================
Write-Host "`n===============================================================" -ForegroundColor Cyan
if ($global:hasErrors) {
    Write-Host "  [FALHOU] SIMULACAO PUBLISH: ENCONTRADOS ERROS" -ForegroundColor Red
    Write-Host "  NAO FAZER COMMIT! Corrigir erros primeiro!" -ForegroundColor Red
    Write-Host "===============================================================" -ForegroundColor Red
    exit 1
} else {
    Write-Host "  [SUCESSO] SIMULACAO PUBLISH: 100% PASSING" -ForegroundColor Green
    Write-Host "  SEGURO PARA COMMIT (no que toca ao job Publish Packages)!" -ForegroundColor Green
    Write-Host "===============================================================" -ForegroundColor Green
    exit 0
}


