# PowerShell code formatting script

$ErrorActionPreference = "Continue"

Write-Host "🎨 Formatting code..." -ForegroundColor Cyan

# Check if npx is available
try {
    npx --version | Out-Null
} catch {
    Write-Host "⚠️  npx not found. Skipping Prettier formatting." -ForegroundColor Yellow
    exit 0
}

# Format frontend code
if (Test-Path "web") {
    Write-Host "Formatting frontend code..." -ForegroundColor Yellow
    Set-Location web
    
    if (Test-Path "package.json") {
        npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css}" 2>&1 | Out-Null
    }
    
    Set-Location ..
}

Write-Host "✅ Formatting complete!" -ForegroundColor Green



