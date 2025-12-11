# Next Steps - Stacks Builder Challenge

Follow these steps to get your project fully operational and earning Builder Challenge points.

## ✅ Immediate Steps

### 1. Test the Contract Locally
```bash
clarinet test
```
Verify all tests pass. If there are any failures, fix them before deploying.

### 2. Deploy Contract to Testnet

**Option A: Using Clarinet console (recommended)**
```bash
clarinet console
# Then in the console:
::deploy pass-manager
```

**Option B: Using Clarinet deploy**
```bash
clarinet deploy --testnet
```

**Option C: Manual deployment via Stacks.js/CLI**
- Use your wallet to deploy the contract
- Save the deployed contract address (format: `ST1...contract-name`)

### 3. Bootstrap the Contract

After deployment, call the bootstrap function once (this can only be called once):
```bash
clarinet console
# In console, or use your wallet:
::contract_call pass-manager bootstrap 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01' 'SP974PMENTVC61C8PAE8517T0MQ9FQ8ZRV9PNK01'
```

Or via frontend/CLI after connecting your wallet.

### 4. Update Frontend Contract Address

Edit `web/src/app/page.tsx` line 16:
```typescript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_ADDRESS.pass-manager'
```
Replace `YOUR_DEPLOYED_ADDRESS` with your actual deployed contract address.

### 5. Install and Run Frontend

```bash
cd web
npm install
npm run dev
```

Visit http://localhost:3000 and test the full flow:
- Connect wallet
- Buy a pass
- Use the pass (generates fees!)
- Renew the pass

## 🎯 Builder Challenge Optimization

### Generate Users & Fees

1. **Invite Friends**: Share your frontend URL and encourage them to buy passes
2. **Create Multiple Transactions**: Use `use-pass` multiple times to generate fees
3. **Set Up Referrals**: Share referral links to get discounts + generate more activity

### GitHub Contributions

1. **Initial Commit**: Commit all the code
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pass Manager for Stacks Builder Challenge"
   ```

2. **Create Multiple PRs**:
   - Add more tests (edge cases)
   - Add CI/CD workflow
   - Improve documentation
   - Add deployment scripts
   - Add analytics/telemetry

3. **Incremental Commits**: Make small, meaningful commits to boost contribution count

### Clarity 4 Features

1. **Research Clarity 4 Built-ins**: Check the latest Stacks documentation for new functions
2. **Update Contract**: Replace the TODO in `contracts/pass-manager.clar` line 189 with actual Clarity 4 functions
3. **Test**: Ensure everything still works after adding Clarity 4 features

## 📊 Track Your Progress

### Monitor Onchain Activity
- Check your contract on Stacks Explorer (testnet)
- Track transaction count and fees generated
- Monitor event emissions from your contract

### Monitor GitHub Activity
- Make commits regularly
- Create PRs for features/improvements
- Engage with the Stacks community repos

### Builder Challenge Dashboard
- Connect your wallet and GitHub (already done)
- Check leaderboard daily
- See where you rank in this week's challenge

## 🚀 Advanced Steps (Optional)

1. **Deploy to Mainnet**: Once tested, deploy to mainnet for real STX rewards
2. **Add CI/CD**: Automate testing and deployment
3. **Add Analytics**: Track user engagement and fees
4. **Improve UI/UX**: Make the frontend more polished
5. **Add More Features**: 
   - Pass tiers (bronze/silver/gold)
   - Time-limited promotions
   - Governance features

## 📝 Checklist

- [ ] Run `clarinet test` - all tests pass
- [ ] Deploy contract to testnet
- [ ] Bootstrap contract with your addresses
- [ ] Update frontend contract address
- [ ] Install frontend dependencies (`npm install` in `web/`)
- [ ] Test frontend locally
- [ ] Make initial git commit
- [ ] Research and add Clarity 4 features
- [ ] Generate first onchain transactions
- [ ] Create GitHub PRs for improvements
- [ ] Check Builder Challenge leaderboard
- [ ] Share with community to drive usage

## 🔗 Helpful Resources

- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language Reference](https://docs.stacks.co/docs/clarity/language-functions)
- [Stacks Testnet Explorer](https://explorer.stacks.co/?chain=testnet)
- [Builder Challenge Platform](https://stacks.co/build/challenges)

Good luck with the Builder Challenge! 🚀

