# Pass Manager (Stacks Builder Challenge)

Pass-based access with fee splitting and referrals, aimed at earning Stacks Builder Challenge points (Clarity 4 usage, onchain users/fees, GitHub commits).

## What’s inside
- Clarity contract `contracts/pass-manager.clar`: buy/renew/use passes, split fees to owner + community vault, referral discount.
- Tests `tests/pass-manager_test.ts`: covers bootstrap, purchase, renewal, and usage.
- Clarinet config `Clarinet.toml`: targets Clarity 4 (adjust epoch/clarity_version to match your toolchain).

## Quick start (testnet)

### Prerequisites
- Install [Clarinet](https://docs.hiro.so/clarinet/getting-started) (>= latest with Clarity 4 support)
- Node.js 18+ (for frontend)

### Test the Contract (Clarity)
```bash
# Run Clarity smart contract tests
clarinet test
```

### Test the Frontend (TypeScript)
```bash
# Run Vitest unit tests for utilities
cd web
npm test
```

This runs both basic and edge case tests. See `tests/` directory for contract tests and `web/src/utils/*.test.ts` for frontend unit tests.

## Deploy (testnet)

### Using Deployment Scripts

**Windows (PowerShell):**
```powershell
.\scripts\deploy-testnet.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/deploy-testnet.sh
./scripts/deploy-testnet.sh
```

### Manual Deployment

1. Deploy contract:
   ```bash
   clarinet deploy --testnet
   ```

2. Bootstrap with your addresses (admin = vault = `SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01`):
   ```bash
   clarinet console
   ::contract_call pass-manager bootstrap 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01' 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01'
   ```

3. Update frontend: Edit `web/src/app/page.tsx` or create `.env.local` with:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_ADDRESS.pass-manager
   ```

### Contract Functions

- `buy-pass(optional-referrer)` - Purchase a pass
- `renew-pass` - Extend your existing pass
- `use-pass` - Use your pass (generates fees)
- `set-params(...)` - Owner-only: adjust pricing and fees

## How this maps to the Builder Challenge
- Clarity 4: contract is flagged for Clarity 4; drop in any mandatory Clarity 4-only built-ins where required once finalized in your toolchain (see TODO in contract).
- Users/fees: every `buy-pass`, `renew-pass`, and `use-pass` charges fees and emits events for easy analytics.
- GitHub: commit code/tests/docs in small PRs; add CI as a follow-up for more contributions.

## Frontend (Next.js)

A complete Next.js frontend is available in the `web/` directory. See `web/README.md` for setup instructions.

Quick start:
```bash
cd web
npm install
npm run dev
```

The frontend provides:
- Wallet connection (Stacks Connect)
- Buy/Renew/Use pass UI
- Real-time pass status and config display
- Easy user onboarding to generate onchain activity

## Next Steps

See **NEXT_STEPS.md** for a complete step-by-step guide to:
- Testing and deploying the contract
- Setting up the frontend
- Generating users and fees for the Builder Challenge
- Maximizing GitHub contributions
- Adding Clarity 4 features

Quick checklist:
1. Run `clarinet test` ✅
2. Deploy to testnet
3. Bootstrap contract
4. Update frontend contract address
5. Run frontend and start generating activity!

## Project Structure

```
.
├── contracts/
│   └── pass-manager.clar      # Main Clarity contract
├── tests/
│   ├── pass-manager_test.ts           # Basic tests
│   └── pass-manager-edge-cases_test.ts # Edge case tests
├── web/                         # Next.js frontend
│   ├── src/app/
│   │   ├── page.tsx            # Main UI
│   │   └── layout.tsx          # App layout
│   └── src/components/
│       └── ConnectWallet.tsx   # Wallet connection
├── scripts/
│   ├── deploy-testnet.sh       # Linux/Mac deployment
│   └── deploy-testnet.ps1      # Windows deployment
├── .github/workflows/
│   └── test.yml                # CI/CD pipeline
├── Clarinet.toml               # Clarinet config
├── README.md                   # This file
├── NEXT_STEPS.md              # Detailed next steps guide
└── CONTRIBUTING.md            # Contribution guidelines
```

## Next steps (advanced)
- ✅ Added comprehensive edge case tests
- ✅ Added deployment scripts
- ✅ Added CI/CD workflow
- ✅ Added environment configuration
- Confirm the exact Clarity 4 built-ins available and replace TODO with real usage
- Set up analytics to track onchain activity
- Deploy to mainnet after thorough testing

