# Pass Manager Architecture

Technical architecture and design decisions for the Pass Manager project.

## Overview

Pass Manager is a Clarity smart contract system with a Next.js frontend, designed for the Stacks Builder Challenge. It implements a pass-based access system with fee splitting and referral discounts.

## Contract Architecture

### Core Contract: `pass-manager.clar`

**Key Components:**

1. **Storage Maps**
   - `passes`: Maps user principals to pass data (expiration, uses, referrer)
   - `owner`: Contract owner (set during bootstrap)
   - `community-vault`: Vault address for fee splitting

2. **State Variables**
   - `pass-price`: Cost to purchase a pass (default: 0.5 STX)
   - `usage-fee`: Fee charged per pass usage (default: 0.001 STX)
   - `fee-split-bps`: Basis points for fee distribution (default: 8000 = 80%)
   - `referral-discount-bps`: Discount for referrals (default: 500 = 5%)
   - `pass-duration-blocks`: Pass validity duration (default: 144 blocks ≈ 1 day)

3. **Public Functions**
   - `bootstrap`: One-time initialization
   - `buy-pass`: Purchase a new pass
   - `renew-pass`: Extend existing pass
   - `use-pass`: Use pass (generates fees)
   - `set-params`: Owner-only configuration

4. **Read-Only Functions**
   - `get-pass`: Retrieve user's pass data
   - `is-active`: Check if pass is valid
   - `get-config`: Get contract configuration

### Utility Contract: `pass-manager-utils.clar`

Analytics and tracking contract (separate for modularity):
- Event tracking
- Revenue aggregation
- Pass sales counters

## Frontend Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS
- **Blockchain**: Stacks Connect (@stacks/connect-react)

### Component Structure

```
src/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # App layout with wallet provider
│   └── globals.css       # Global styles
├── components/
│   ├── ConnectWallet.tsx # Wallet connection
│   ├── PassStatus.tsx    # Pass status display
│   └── Analytics.tsx     # Platform analytics
├── hooks/
│   └── useContract.ts    # Custom hook for contract interactions
├── types/
│   └── contract.ts       # TypeScript type definitions
└── utils/
    └── contract-helpers.ts # Utility functions
```

### Data Flow

1. **User connects wallet** → Stacks Connect authenticates
2. **Load pass data** → Read-only contract calls via Stacks API
3. **User actions** → Contract calls via Stacks Connect
4. **Update UI** → Refresh data after transaction confirmation

## Fee Flow

```
User buys pass (0.5 STX)
  ↓
Split based on fee-split-bps (80/20):
  - 80% → Owner address
  - 20% → Community vault
```

## Security Considerations

1. **Bootstrap Protection**: Can only be called once
2. **Owner Guards**: Admin functions protected
3. **Expiration Checks**: Passes expire based on block height
4. **Referral Validation**: Users can't refer themselves

## Clarity 4 Features

The contract targets Clarity 4 (clarity_version = 4). Currently includes:
- Standard Clarity functions
- TODO: Add Clarity 4-specific built-ins once finalized

## Testing Strategy

1. **Unit Tests**: Clarinet test suite
   - Happy path scenarios
   - Edge cases (expiration, referrals, permissions)
   
2. **Integration**: Manual testing via frontend

## Deployment

- **Testnet**: For development and testing
- **Mainnet**: Production deployment (after thorough testing)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Future Enhancements

- Pass tiers (bronze/silver/gold)
- Time-limited promotions
- Governance features
- Analytics dashboard
- Multi-contract composition

