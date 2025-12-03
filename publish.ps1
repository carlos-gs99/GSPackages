# Script de Publicacao para GSPackages
# Uso: .\publish.ps1 <workspace-name>
# Exemplo: .\publish.ps1 gs-spinner

param(
    [Parameter(Mandatory=$true)]
    [string]$Workspace
)

Write-Host "Publicando @carlos-gs99/$Workspace..." -ForegroundColor Cyan

# Carregar token do .env.example
if (Test-Path ".env.example") {
    Get-Content .env.example | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.+)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            Set-Item -Path "env:$name" -Value $value
            Write-Host "[OK] $name configurado" -ForegroundColor Green
        }
    }
} else {
    Write-Host "[ERRO] .env.example nao encontrado!" -ForegroundColor Yellow
    Write-Host "Configure manualmente: `$env:NODE_AUTH_TOKEN = 'seu_token'" -ForegroundColor Yellow
    exit 1
}

# Publicar
Write-Host ""
Write-Host "Publicando package..." -ForegroundColor Cyan
npm publish --workspace @carlos-gs99/$Workspace

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCESSO] Package @carlos-gs99/$Workspace publicado!" -ForegroundColor Green
    Write-Host "Verifica em: https://github.com/carlos-gs99?tab=packages" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "[ERRO] Erro ao publicar package!" -ForegroundColor Red
    Write-Host "Verifica o token e tenta novamente" -ForegroundColor Yellow
}
