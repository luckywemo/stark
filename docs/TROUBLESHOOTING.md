# Troubleshooting Guide

Common issues and solutions for the Pass Manager project.

## Contract Issues

### Contract deployment fails

**Symptoms:**
- Deployment transaction fails
- Error during `clarinet deploy`

**Solutions:**
1. Check you have enough STX for deployment fees
   ```bash
   # Check balance in Clarinet console
   clarinet console
   ::get_balances
   ```

2. Verify contract syntax
   ```bash
   clarinet check
   ```

3. Ensure Clarinet is up to date
   ```bash
   cargo install clarinet --force
   ```

4. Check network connectivity
   - Verify internet connection
   - Check Stacks API status

---

### Bootstrap fails

**Symptoms:**
- Bootstrap transaction fails
- Error: "Owner already set"

**Solutions:**
1. Bootstrap can only be called once
   - If already bootstrapped, use `set-params` for changes

2. Verify addresses are correct
   - Use valid Stacks addresses (ST1... or SP1...)
   - Check address format

3. Ensure you're calling from the correct network
   - Testnet vs Mainnet

---

### Pass purchase fails

**Symptoms:**
- Transaction fails
- Error: "Invalid amount"

**Solutions:**
1. Check you have enough STX
   - Minimum required: pass price + transaction fee

2. Verify referrer address format (if provided)
   - Must be valid principal
   - Cannot be your own address

3. Check contract is bootstrapped
   ```clarity
   (get-config)  # Should return config, not none
   ```

---

### Pass use fails

**Symptoms:**
- "Pass expired" error
- "Pass not found" error

**Solutions:**
1. **Pass expired:**
   - Purchase a new pass or renew existing one
   - Check expiration with: `(get-pass 'YOUR_ADDRESS)`

2. **Pass not found:**
   - Purchase a pass first
   - Verify correct address

---

## Frontend Issues

### Wallet connection fails

**Symptoms:**
- "Connect Wallet" button doesn't work
- Wallet popup doesn't appear

**Solutions:**
1. Ensure wallet extension is installed
   - Hiro Wallet: https://www.hiro.so/wallet
   - Xverse: https://www.xverse.app

2. Refresh the page
   - Clear browser cache if needed

3. Check browser permissions
   - Allow popups for the site
   - Enable wallet extension

4. Verify network matches
   - Frontend network should match wallet network

---

### Contract calls fail

**Symptoms:**
- Transaction popup appears but fails
- Error messages in console

**Solutions:**
1. Verify contract address is correct
   - Check `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`
   - Format: `ST1...contract-name`

2. Check network configuration
   - Frontend network should match deployed contract network
   - Update `NEXT_PUBLIC_NETWORK` if needed

3. Verify contract is deployed
   - Check on Stacks Explorer
   - Ensure bootstrap was called

4. Check sufficient STX balance
   - Need STX for fees

---

### Data not loading

**Symptoms:**
- Pass status not showing
- Config not loading

**Solutions:**
1. Check Stacks API accessibility
   ```bash
   curl https://api.testnet.hiro.so/v2/info
   ```

2. Verify contract address
   - Correct format
   - Correct network

3. Check browser console for errors
   - Open DevTools (F12)
   - Look for API errors

4. Verify CORS settings
   - Check if API allows your domain

---

## Testing Issues

### Tests fail

**Symptoms:**
- `clarinet test` fails
- Specific test errors

**Solutions:**
1. Check test syntax
   - Verify test file format
   - Check function names

2. Run tests individually
   ```bash
   clarinet test --test tests/pass-manager_test.ts
   ```

3. Check account setup
   - Ensure deployer and test accounts exist
   - Verify account balances

4. Review test output
   - Look for specific error messages
   - Check stack traces

---

## Build Issues

### Frontend build fails

**Symptoms:**
- `npm run build` errors
- TypeScript errors

**Solutions:**
1. Install dependencies
   ```bash
   cd web
   npm install
   ```

2. Check Node.js version
   - Requires Node.js 18+
   ```bash
   node --version
   ```

3. Clear cache and rebuild
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

4. Check TypeScript errors
   ```bash
   npm run type-check
   ```

---

## Deployment Issues

### Vercel/Netlify deployment fails

**Symptoms:**
- Build fails on platform
- Environment variable errors

**Solutions:**
1. Set environment variables
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_NETWORK`

2. Check build logs
   - Review platform build output
   - Look for specific errors

3. Verify build command
   - Should be: `npm run build`
   - Check `package.json` scripts

---

## Common Errors

### "Owner already set"
- Bootstrap was already called
- Cannot bootstrap twice

### "Not owner"
- Function requires owner privileges
- Use owner address for transaction

### "Pass expired"
- Pass validity period ended
- Renew or purchase new pass

### "Invalid amount"
- Parameter validation failed
- Check value ranges

---

## Getting Help

1. Check the documentation:
   - README.md
   - DEPLOYMENT.md
   - ARCHITECTURE.md

2. Review contract code:
   - `contracts/pass-manager.clar`

3. Check Stacks resources:
   - [Stacks Docs](https://docs.stacks.co)
   - [Clarity Docs](https://docs.stacks.co/docs/clarity)
   - [Forum](https://forum.stacks.org)

4. Open an issue:
   - GitHub: https://github.com/luckywemo/stark/issues

---

## Debug Mode

Enable debug logging:

**Frontend:**
```javascript
localStorage.setItem('debug', 'true')
```

**Contract:**
Use `print` statements (already included for events)

**Tests:**
```bash
clarinet test --verbose
```




