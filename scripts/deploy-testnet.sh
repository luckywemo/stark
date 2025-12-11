#!/bin/bash
# Deployment script for Stacks testnet
# Usage: ./scripts/deploy-testnet.sh

set -e

echo "🚀 Deploying Pass Manager to Stacks Testnet..."

# Check if Clarinet is installed
if ! command -v clarinet &> /dev/null; then
    echo "❌ Clarinet is not installed. Please install it first."
    echo "   Visit: https://docs.hiro.so/clarinet/getting-started"
    exit 1
fi

# Run tests first
echo "🧪 Running tests..."
clarinet test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix issues before deploying."
    exit 1
fi

echo "✅ Tests passed!"

# Deploy to testnet
echo "📦 Deploying contract..."
clarinet deploy --testnet

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Bootstrap the contract with your addresses"
echo "2. Update web/src/app/page.tsx with the deployed contract address"
echo "3. Start using the frontend to generate activity!"

