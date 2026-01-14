# Developer Quick Reference

## Project Overview
This is a React Native (Expo) app for Token Metrics vaults with Web3 integration using Privy for wallet connection.

## Key Files to Modify

### 1. Vault Configuration
**File:** `constants/vaults.ts`
- Update vault contract addresses
- Modify USDC token address
- Change network configuration
- Adjust APY ranges and risk levels

### 2. Privy Configuration
**File:** `.env`
- Set `EXPO_PUBLIC_PRIVY_APP_ID`

**File:** `providers/PrivyProvider.tsx`
- Customize Privy appearance
- Modify wallet creation settings

### 3. Styling
**File:** `tailwind.config.js`
- Update color scheme
- Add custom colors for vaults

**File:** `global.css`
- Add global CSS overrides

### 4. Contract ABIs
**File:** `lib/contracts.ts`
- Update ERC20 ABI if needed
- Modify Vault ABI based on your contracts
- Add helper functions

## Component Architecture

### Screens
- `app/(tabs)/index.tsx` - Vaults listing (home)
- `app/(tabs)/explore.tsx` - Portfolio view

### Key Components
- `components/vault/VaultCard.tsx` - Individual vault display
- `components/vault/DepositModal.tsx` - Deposit flow modal
- `components/wallet/WalletButton.tsx` - Wallet connection
- `components/network/NetworkWarning.tsx` - Network detection
- `components/portfolio/PortfolioOverview.tsx` - Portfolio summary

### Hooks
- `hooks/useUSDCBalance.ts` - Fetch USDC balance
- `hooks/useVaultBalance.ts` - Fetch vault shares
- `hooks/useDepositFlow.ts` - Handle deposit transactions

## Testing Checklist

### Before Committing
- [ ] Run `npm run lint`
- [ ] Test wallet connection
- [ ] Test deposit flow
- [ ] Test network switching
- [ ] Verify portfolio view
- [ ] Check error states
- [ ] Test on iOS simulator

### Manual Testing
1. **Wallet Connection**
   - Connect wallet
   - Verify address display
   - Check USDC balance

2. **Deposit Flow**
   - Open deposit modal
   - Test quick amount buttons
   - Submit deposit
   - Verify success state
   - Test error handling

3. **Portfolio**
   - View positions
   - Pull to refresh
   - Check allocation chart

## Common Tasks

### Add a New Vault
1. Edit `constants/vaults.ts`
2. Add vault to `VAULTS` array:
```typescript
{
  id: 'new-vault',
  name: 'New Vault',
  type: VaultType.GROWTH,
  riskLevel: RiskLevel.MEDIUM,
  apyMin: 20,
  apyMax: 40,
  tvl: 1000000,
  contractAddress: '0x...',
  description: 'Description here',
  color: '#FF5722',
}
```

### Change Color Scheme
1. Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#yourColor',
  stable: '#yourColor',
  growth: '#yourColor',
  turbo: '#yourColor',
}
```

### Add Network
1. Edit `constants/vaults.ts`:
```typescript
export const TARGET_NETWORK = {
  chainId: 1, // Your chain ID
  name: 'Ethereum',
  rpcUrl: 'https://eth.llamarpc.com',
  blockExplorer: 'https://etherscan.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
};
```

### Update Contract ABI
1. Edit `lib/contracts.ts`
2. Replace or extend `VAULT_ABI`:
```typescript
export const VAULT_ABI = [
  // Add your ABI here
] as const;
```

## Debugging

### Enable Debug Logs
Add to your code:
```typescript
console.log('Debug:', value);
```

### View Network Requests
1. Open developer menu (Cmd+D on iOS)
2. Enable "Debug JS Remotely"
3. Open browser console

### Check Metro Bundler
- View terminal where `npm start` is running
- Look for errors and warnings

### React DevTools
```bash
npm install -g react-devtools
react-devtools
```

## Performance Tips

1. **Optimize Re-renders**
   - Use `React.memo()` for expensive components
   - Use `useMemo()` for expensive calculations
   - Use `useCallback()` for callback functions

2. **Reduce Bundle Size**
   - Import only what you need from libraries
   - Use dynamic imports for large components

3. **Network Optimization**
   - Cache blockchain data
   - Batch contract calls
   - Use multicall patterns

## Security Considerations

1. **Never commit:**
   - Private keys
   - Mnemonics
   - Production API keys
   - `.env` file (add to `.gitignore`)

2. **Validate user input:**
   - Check amounts before transactions
   - Validate addresses
   - Handle edge cases

3. **Error handling:**
   - Never expose sensitive error details
   - Log errors securely
   - Provide user-friendly messages

## Build Process

### Development Build
```bash
npm start
```

### Production Build (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform ios --profile production
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `EXPO_PUBLIC_PRIVY_APP_ID` | Privy App ID | Required |

## Useful Commands

```bash
# Clear Metro cache
npx expo start -c

# Clear all caches
rm -rf node_modules
npm install
npx expo start -c

# Check for updates
npm outdated

# Update dependencies
npm update

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Resources

- [Project README](./README.md)
- [Setup Guide](./SETUP.md)
- [Expo Docs](https://docs.expo.dev/)
- [Privy Docs](https://docs.privy.io/)
- [Viem Docs](https://viem.sh/)
