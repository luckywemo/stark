#!/bin/bash
# Code formatting script

set -e

echo "🎨 Formatting code..."

# Check if Prettier is available
if ! command -v npx &> /dev/null; then
    echo "⚠️  npx not found. Skipping Prettier formatting."
    exit 0
fi

# Format frontend code
if [ -d "web" ]; then
    echo "Formatting frontend code..."
    cd web
    
    if [ -f "package.json" ]; then
        npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css}" || true
    fi
    
    cd ..
fi

echo "✅ Formatting complete!"




