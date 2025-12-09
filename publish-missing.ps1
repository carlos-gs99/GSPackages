# Script para publicar todos os packages não publicados
# Uso: .\publish-missing.ps1

Write-Host "Publicando packages não publicados..." -ForegroundColor Cyan
Write-Host ""

# Lista de packages não publicados
$notPublished = @(
    "gs-accordion",
    "gs-autocomplete",
    "gs-breadcrumbs",
    "gs-colorpicker",
    "gs-datepicker",
    "gs-drawer",
    "gs-dropdown",
    "gs-pagination",
    "gs-radio",
    "gs-rating",
    "gs-slider",
    "gs-stepper",
    "gs-switch",
    "gs-table",
    "gs-textarea",
    "gs-timepicker",
    "gs-tree"
)

# Verificar se token está configurado
if (-not $env:NODE_AUTH_TOKEN) {
    Write-Host "[AVISO] NODE_AUTH_TOKEN não configurado!" -ForegroundColor Yellow
    Write-Host "Configure com: `$env:NODE_AUTH_TOKEN = 'seu_token'" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Deseja continuar mesmo assim? (s/n)"
    if ($continue -ne "s" -and $continue -ne "S") {
        Write-Host "Cancelado." -ForegroundColor Yellow
        exit 0
    }
}

$success = @()
$failed = @()
$skipped = @()

foreach ($pkg in $notPublished) {
    $packageName = "@carlos-gs99/$pkg"
    
    Write-Host "Publicando $packageName..." -NoNewline
    
    try {
        # Verificar se já está publicado (pode ter sido publicado entretanto)
        $existing = npm view $packageName version --registry=https://npm.pkg.github.com 2>&1
        
        if ($LASTEXITCODE -eq 0 -and $existing -notmatch "error|404|ENOENT") {
            Write-Host " JÁ PUBLICADO (versão: $existing)" -ForegroundColor Green
            $skipped += $packageName
            continue
        }
        
        # Publicar
        $result = npm publish --workspace $packageName 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host " OK" -ForegroundColor Green
            $success += $packageName
        } elseif ($result -match "409|Cannot publish over existing version") {
            Write-Host " JÁ EXISTE (409)" -ForegroundColor Yellow
            $skipped += $packageName
        } else {
            Write-Host " ERRO" -ForegroundColor Red
            Write-Host "  $result" -ForegroundColor Red
            $failed += $packageName
        }
    } catch {
        Write-Host " ERRO" -ForegroundColor Red
        Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
        $failed += $packageName
    }
    
    # Pequeno delay entre publicações
    Start-Sleep -Milliseconds 500
}

Write-Host ""
Write-Host "=== RESUMO ===" -ForegroundColor Cyan
Write-Host "Total processados: $($notPublished.Count)" -ForegroundColor White
Write-Host "Publicados com sucesso: $($success.Count)" -ForegroundColor Green
Write-Host "Já existiam: $($skipped.Count)" -ForegroundColor Yellow
if ($failed.Count -gt 0) {
    Write-Host "Falharam: $($failed.Count)" -ForegroundColor Red
}

if ($success.Count -gt 0) {
    Write-Host ""
    Write-Host "Packages publicados:" -ForegroundColor Green
    $success | ForEach-Object { Write-Host "  - $_" -ForegroundColor Green }
}

if ($failed.Count -gt 0) {
    Write-Host ""
    Write-Host "Packages que falharam:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}

Write-Host ""
Write-Host "Verificar em: https://github.com/carlos-gs99?tab=packages" -ForegroundColor Cyan

