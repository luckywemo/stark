#!/bin/bash
# Comprehensive project check script

set -e

echo "🔍 Running project checks..."

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Clarinet
echo -e "\n${YELLOW}Checking Clarinet...${NC}"
if command -v clarinet &> /dev/null; then
    echo -e "${GREEN}✓ Clarinet installed${NC}"
    clarinet --version
else
    echo -e "${RED}✗ Clarinet not found${NC}"
fi

# Check Node.js
echo -e "\n${YELLOW}Checking Node.js...${NC}"
if command -v node &> /dev/null; then
    echo -e "${GREEN}✓ Node.js installed${NC}"
    node --version
else
    echo -e "${RED}✗ Node.js not found${NC}"
fi

# Check npm
echo -e "\n${YELLOW}Checking npm...${NC}"
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✓ npm installed${NC}"
    npm --version
else
    echo -e "${RED}✗ npm not found${NC}"
fi

# Check contract syntax
echo -e "\n${YELLOW}Checking contract syntax...${NC}"
if command -v clarinet &> /dev/null; then
    clarinet check && echo -e "${GREEN}✓ Contracts valid${NC}" || echo -e "${RED}✗ Contract errors${NC}"
fi

# Check frontend dependencies
echo -e "\n${YELLOW}Checking frontend dependencies...${NC}"
if [ -d "web" ]; then
    cd web
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓ Dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠ Dependencies not installed (run npm install)${NC}"
    fi
    cd ..
fi

# Check Git
echo -e "\n${YELLOW}Checking Git...${NC}"
if command -v git &> /dev/null; then
    echo -e "${GREEN}✓ Git installed${NC}"
    git --version
else
    echo -e "${RED}✗ Git not found${NC}"
fi

echo -e "\n${GREEN}✅ Checks complete!${NC}"

