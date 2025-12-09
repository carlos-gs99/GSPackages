# Script para verificar quais packages estão publicados no GitHub Packages
# Uso: .\check-published.ps1

Write-Host "Verificando packages publicados no GitHub Packages..." -ForegroundColor Cyan
Write-Host ""

# Lista de todos os packages
$basePackages = @("utils", "hooks", "primitives", "theme")
$componentPackages = Get-ChildItem -Path "." -Directory -Filter "gs-*" | Select-Object -ExpandProperty Name | Sort-Object
$allPackages = $basePackages + $componentPackages

$published = @()
$notPublished = @()
$errors = @()

foreach ($pkg in $allPackages) {
    $packageName = "@carlos-gs99/$pkg"
    
    Write-Host "Verificando $packageName..." -NoNewline
    
    try {
        # Tentar verificar se o package existe no registry
        $result = npm view $packageName version --registry=https://npm.pkg.github.com 2>&1
        
        if ($LASTEXITCODE -eq 0 -and $result -notmatch "error|404|ENOENT") {
            Write-Host " OK (versão: $result)" -ForegroundColor Green
            $published += @{
                Name = $packageName
                Version = $result
            }
        } else {
            Write-Host " NÃO PUBLICADO" -ForegroundColor Yellow
            $notPublished += $packageName
        }
    } catch {
        Write-Host " ERRO" -ForegroundColor Red
        $errors += @{
            Name = $packageName
            Error = $_.Exception.Message
        }
    }
}

Write-Host ""
Write-Host "=== RESUMO ===" -ForegroundColor Cyan
Write-Host "Total de packages: $($allPackages.Count)" -ForegroundColor White
Write-Host "Publicados: $($published.Count)" -ForegroundColor Green
Write-Host "Não publicados: $($notPublished.Count)" -ForegroundColor Yellow
if ($errors.Count -gt 0) {
    Write-Host "Erros: $($errors.Count)" -ForegroundColor Red
}

if ($notPublished.Count -gt 0) {
    Write-Host ""
    Write-Host "Packages não publicados:" -ForegroundColor Yellow
    $notPublished | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
}

if ($published.Count -gt 0) {
    Write-Host ""
    Write-Host "Packages publicados:" -ForegroundColor Green
    $published | ForEach-Object { Write-Host "  - $($_.Name)@$($_.Version)" -ForegroundColor Green }
}

