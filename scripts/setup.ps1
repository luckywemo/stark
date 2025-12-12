# PowerShell setup script for Pass Manager project
# Installs dependencies and sets up development environment

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up Pass Manager project..." -ForegroundColor Cyan

# Check for required tools
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow

try {
    $clarinetVersion = clarinet --version 2>&1
    Write-Host "✅ Clarinet installed: $clarinetVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Clarinet is not installed" -ForegroundColor Yellow
    Write-Host "   Install from: https://docs.hiro.so/clarinet/getting-started" -ForegroundColor Cyan
}

try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Write-Host "   Install from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}

# Install frontend dependencies
Write-Host ""
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location web
npm install
Set-Location ..

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run 'clarinet test' to test the contract"
Write-Host "2. Run 'cd web && npm run dev' to start the frontend"
Write-Host "3. Check NEXT_STEPS.md for deployment instructions"

