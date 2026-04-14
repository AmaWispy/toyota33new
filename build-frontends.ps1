$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Building Admin (Vite, backend\) and Main site (Next, frontend\) in separate windows..." -ForegroundColor Cyan
Write-Host "Root: $Root" -ForegroundColor DarkGray

$backend = Join-Path $Root "backend"
$frontend = Join-Path $Root "frontend"

Start-Process powershell -ArgumentList @(
    "-Command",
    "Set-Location -LiteralPath '$backend'; npm run build; if (`$LASTEXITCODE -ne 0) { Read-Host 'Press Enter to close...' }"
)

Start-Process powershell -ArgumentList @(
    "-Command",
    "Set-Location -LiteralPath '$frontend'; npm run build; if (`$LASTEXITCODE -ne 0) { Read-Host 'Press Enter to close...' }"
)

Write-Host "Both build processes launched in separate PowerShell windows." -ForegroundColor Green
