# PowerShell deployment script for Stacks testnet
# Usage: .\scripts\deploy-testnet.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 Deploying Pass Manager to Stacks Testnet..." -ForegroundColor Cyan

# Check if Clarinet is installed
try {
    clarinet --version | Out-Null
} catch {
    Write-Host "❌ Clarinet is not installed. Please install it first." -ForegroundColor Red
    Write-Host "   Visit: https://docs.hiro.so/clarinet/getting-started" -ForegroundColor Yellow
    exit 1
}

# Run tests first
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
clarinet test

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tests failed. Please fix issues before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Tests passed!" -ForegroundColor Green

# Deploy to testnet
Write-Host "📦 Deploying contract..." -ForegroundColor Yellow
clarinet deploy --testnet

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Bootstrap the contract with your addresses"
    Write-Host "2. Update web/src/app/page.tsx with the deployed contract address"
    Write-Host "3. Start using the frontend to generate activity!"
} else {
    Write-Host "❌ Deployment failed." -ForegroundColor Red
    exit 1
}

