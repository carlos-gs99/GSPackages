# ===================================================
# SIMULACAO CI COMPLETA - REPLICA GITHUB ACTIONS
# ===================================================
# Este script replica EXATAMENTE o que o GitHub Actions faz
# Usar ANTES de fazer commit para detectar problemas!

Write-Host "`n===============================================================" -ForegroundColor Cyan
Write-Host "  SIMULACAO CI COMPLETA - GITHUB ACTIONS REPLICA" -ForegroundColor Cyan
Write-Host "===============================================================" -ForegroundColor Cyan

$ErrorActionPreference = "Continue"
$global:hasErrors = $false

# ===================================================
# STEP 1: LIMPAR AMBIENTE (como no CI) - dist + node_modules
# ===================================================
Write-Host "`n[1/6] Limpando dist/ de TODOS os packages + node_modules (como no CI)..." -ForegroundColor Yellow

# Usa o script oficial de clean da raiz, que já sabe limpar todos os workspaces
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
    Write-Host "[AVISO] npm nao encontrado para correr npm run clean" -ForegroundColor Yellow
}

# ===================================================
# STEP 2: INSTALAR COM npm ci (como no CI)
# ===================================================
Write-Host "`n[2/6] Instalando com npm ci (EXATAMENTE como no CI)..." -ForegroundColor Yellow
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
# STEP 3: TypeCheck
# ===================================================
Write-Host "`n[3/6] TypeCheck..." -ForegroundColor Yellow
$typecheckOutput = npm run typecheck 2>&1
$typecheckExitCode = $LASTEXITCODE

$typeErrors = $typecheckOutput | Select-String "error TS"
if ($typeErrors.Count -gt 0) {
    Write-Host "[ERRO] TypeCheck FALHOU! ($($typeErrors.Count) errors)" -ForegroundColor Red
    $typeErrors | Select-Object -First 10 | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    $global:hasErrors = $true
} else {
    Write-Host "[OK] TypeCheck PASS" -ForegroundColor Green
}

# ===================================================
# STEP 4: Lint
# ===================================================
Write-Host "`n[4/6] Lint..." -ForegroundColor Yellow
$lintOutput = npm run lint 2>&1
$lintExitCode = $LASTEXITCODE

$lintSummary = $lintOutput | Select-String "(\d+) errors, (\d+) warnings"
if ($lintSummary -match "(\d+) errors") {
    $errorCount = $matches[1]
    if ([int]$errorCount -gt 0) {
        Write-Host "[ERRO] Lint FALHOU! ($errorCount errors)" -ForegroundColor Red
        $global:hasErrors = $true
    } else {
        Write-Host "[OK] Lint PASS (0 errors)" -ForegroundColor Green
    }
}

# ===================================================
# STEP 5: Test
# ===================================================
Write-Host "`n[5/6] Test..." -ForegroundColor Yellow
$testOutput = npm run test 2>&1
$testExitCode = $LASTEXITCODE

$testSummary = $testOutput | Select-String "Tests:.*passed"
if ($testExitCode -ne 0) {
    Write-Host "[ERRO] Test FALHOU!" -ForegroundColor Red
    $testOutput | Select-String "FAIL|error" | Select-Object -First 10 | ForEach-Object { 
        Write-Host $_ -ForegroundColor Red 
    }
    $global:hasErrors = $true
} else {
    Write-Host "[OK] Test PASS - $testSummary" -ForegroundColor Green
}

# ===================================================
# STEP 6: Build (o mais importante!)
# ===================================================
Write-Host "`n[6/6] Build (CRITICO - aqui costuma falhar!)..." -ForegroundColor Yellow
$buildOutput = npm run build 2>&1
$buildExitCode = $LASTEXITCODE

# Procurar por erros especificos
$buildErrors = $buildOutput | Select-String "Build error|error TS|Cannot find module|npm error.*failed"
$duplicateKeys = $buildOutput | Select-String "Duplicate key"

if ($buildErrors.Count -gt 0 -or $duplicateKeys.Count -gt 0) {
    Write-Host "[ERRO] Build FALHOU!" -ForegroundColor Red
    
    if ($duplicateKeys.Count -gt 0) {
        Write-Host "`nDUPLICATE KEYS ENCONTRADOS:" -ForegroundColor Red
        $duplicateKeys | Select-Object -First 5 | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    }
    
    if ($buildErrors.Count -gt 0) {
        Write-Host "`nERROS DE BUILD:" -ForegroundColor Red
        $buildErrors | Select-Object -First 15 | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    }
    
    $global:hasErrors = $true
} else {
    $successCount = ($buildOutput | Select-String "Build success").Count
    Write-Host "[OK] Build PASS ($successCount builds)" -ForegroundColor Green
}

# ===================================================
# RESULTADO FINAL
# ===================================================
Write-Host "`n===============================================================" -ForegroundColor Cyan
if ($global:hasErrors) {
    Write-Host "  [FALHOU] SIMULACAO CI: ENCONTRADOS ERROS" -ForegroundColor Red
    Write-Host "  NAO FAZER COMMIT! Corrigir erros primeiro!" -ForegroundColor Red
    Write-Host "===============================================================" -ForegroundColor Red
    exit 1
} else {
    Write-Host "  [SUCESSO] SIMULACAO CI: 100% PASSING" -ForegroundColor Green
    Write-Host "  SEGURO PARA COMMIT!" -ForegroundColor Green
    Write-Host "===============================================================" -ForegroundColor Green
    exit 0
}
