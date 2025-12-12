#!/bin/bash
# Setup script for Pass Manager project
# Installs dependencies and sets up development environment

set -e

echo "🚀 Setting up Pass Manager project..."

# Check for required tools
echo "📋 Checking prerequisites..."

if ! command -v clarinet &> /dev/null; then
    echo "⚠️  Clarinet is not installed"
    echo "   Install from: https://docs.hiro.so/clarinet/getting-started"
else
    echo "✅ Clarinet installed"
    clarinet --version
fi

if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js is not installed"
    echo "   Install from: https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js installed"
    node --version
fi

if ! command -v npm &> /dev/null; then
    echo "⚠️  npm is not installed"
    exit 1
else
    echo "✅ npm installed"
    npm --version
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd web
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'clarinet test' to test the contract"
echo "2. Run 'cd web && npm run dev' to start the frontend"
echo "3. Check NEXT_STEPS.md for deployment instructions"

