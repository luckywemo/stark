# Deployment Guide

Complete guide for deploying Pass Manager to Stacks testnet and mainnet.

## Prerequisites

- Clarinet installed and configured
- Stacks wallet with STX for deployment fees
- Contract owner address: `SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01`

## Testnet Deployment

### Step 1: Prepare Deployment

```bash
# Run tests to ensure everything works
clarinet test

# Check deployment configuration
clarinet deployments list
```

### Step 2: Deploy Contract

**Option A: Using Clarinet (Recommended)**

```bash
clarinet deploy --testnet
```

**Option B: Using Clarinet Console**

```bash
clarinet console
::deploy pass-manager
```

**Option C: Manual Deployment**

1. Use your wallet (Hiro/Xverse) to deploy the contract
2. Copy the transaction ID
3. Wait for confirmation on [Stacks Explorer](https://explorer.stacks.co/?chain=testnet)

### Step 3: Bootstrap Contract

After deployment, bootstrap with owner addresses:

```bash
clarinet console
::contract_call pass-manager bootstrap 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01' 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01'
```

Or use your wallet to call the bootstrap function.

### Step 4: Update Frontend

1. Copy your deployed contract address (format: `ST1...contract-name`)
2. Update `web/src/app/page.tsx`:
   ```typescript
   const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_ADDRESS.pass-manager'
   ```
3. Or create `.env.local`:
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_DEPLOYED_ADDRESS.pass-manager
   NEXT_PUBLIC_NETWORK=testnet
   ```

### Step 5: Deploy Frontend

**Vercel (Recommended)**

```bash
cd web
npm install -g vercel
vercel
```

**Netlify**

```bash
cd web
npm run build
# Upload the 'out' directory to Netlify
```

**Manual**

```bash
cd web
npm run build
npm start
```

## Mainnet Deployment

⚠️ **Important**: Only deploy to mainnet after thorough testing on testnet!

### Differences from Testnet

1. Use `--mainnet` flag:
   ```bash
   clarinet deploy --mainnet
   ```

2. Update network in frontend:
   ```
   NEXT_PUBLIC_NETWORK=mainnet
   ```

3. Verify contract on [Mainnet Explorer](https://explorer.stacks.co)

## Post-Deployment Checklist

- [ ] Contract deployed and confirmed
- [ ] Bootstrap function called successfully
- [ ] Frontend updated with contract address
- [ ] Frontend deployed and accessible
- [ ] Test buy-pass transaction
- [ ] Test use-pass transaction
- [ ] Verify fees are being split correctly
- [ ] Check events on Stacks Explorer

## Troubleshooting

### Contract deployment fails
- Check you have enough STX for fees
- Verify Clarinet is up to date
- Check contract syntax with `clarinet check`

### Bootstrap fails
- Ensure contract is deployed first
- Verify addresses are correct
- Check you're using the correct network

### Frontend can't connect
- Verify contract address is correct
- Check network configuration (testnet vs mainnet)
- Ensure Stacks API is accessible

## Monitoring

- **Stacks Explorer**: Monitor transactions and events
- **Frontend Analytics**: Track user activity
- **Contract Events**: Monitor pass purchases and usage

For more details, see [NEXT_STEPS.md](../NEXT_STEPS.md)

