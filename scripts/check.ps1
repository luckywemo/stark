# PowerShell comprehensive project check script

$ErrorActionPreference = "Continue"

Write-Host "🔍 Running project checks..." -ForegroundColor Cyan

# Check Clarinet
Write-Host "`nChecking Clarinet..." -ForegroundColor Yellow
try {
    $clarinetVersion = clarinet --version 2>&1
    Write-Host "✓ Clarinet installed: $clarinetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Clarinet not found" -ForegroundColor Red
}

# Check Node.js
Write-Host "`nChecking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found" -ForegroundColor Red
}

# Check npm
Write-Host "`nChecking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found" -ForegroundColor Red
}

# Check contract syntax
Write-Host "`nChecking contract syntax..." -ForegroundColor Yellow
try {
    clarinet check | Out-Null
    Write-Host "✓ Contracts valid" -ForegroundColor Green
} catch {
    Write-Host "✗ Contract errors" -ForegroundColor Red
}

# Check frontend dependencies
Write-Host "`nChecking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "web") {
    Set-Location web
    if (Test-Path "node_modules") {
        Write-Host "✓ Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "⚠ Dependencies not installed (run npm install)" -ForegroundColor Yellow
    }
    Set-Location ..
}

# Check Git
Write-Host "`nChecking Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git not found" -ForegroundColor Red
}

Write-Host "`n✅ Checks complete!" -ForegroundColor Green




