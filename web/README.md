# Pass Manager Frontend

Next.js frontend for the Pass Manager contract, designed for Stacks Builder Challenge participation.

## Setup

1. Install dependencies:
```bash
cd web
npm install
```

2. Update contract address:
   - Edit `src/app/page.tsx`
   - Update `CONTRACT_ADDRESS` constant with your deployed contract address (format: `ST...contract-name`)

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Features

- **Wallet Connection**: Connect using Stacks Connect (Hiro Wallet, Xverse, etc.)
- **Buy Pass**: Purchase a new pass with optional referrer for 5% discount
- **Renew Pass**: Extend your existing pass
- **Use Pass**: Activate your pass (generates usage fees)
- **View Status**: See pass expiration, usage count, and active status
- **View Config**: See current pricing and fee split configuration

## Deploy

Build for production:
```bash
npm run build
npm start
```

Or deploy to Vercel/Netlify for easy hosting.

## How This Helps with Builder Challenge

- **Users & Fees**: Every interaction (`buy-pass`, `renew-pass`, `use-pass`) generates onchain transactions and fees
- **GitHub Contributions**: Frontend code can be committed separately, increasing your contribution count
- **Real Usage**: Easy-to-use UI encourages actual user adoption and repeated transactions
