# Setup Guide - Token Metrics Vault Mobile App

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Xcode installed (for iOS development)
- [ ] Expo CLI installed globally
- [ ] Privy account created

## Step-by-Step Setup

### 1. Install Expo CLI

```bash
npm install -g expo-cli
```

### 2. Install Project Dependencies

```bash
cd web3-tm
npm install
```

### 3. Configure Privy

#### Create Privy App
1. Go to https://dashboard.privy.io/
2. Sign up or log in
3. Click "Create New App"
4. Name your app (e.g., "TM Vault Mobile")
5. Copy the App ID from the dashboard

#### Update Environment Variables
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Privy App ID:
```env
EXPO_PUBLIC_PRIVY_APP_ID=clxxxxxxxxxxxx
```

### 4. Configure Network & Contracts

Edit `constants/vaults.ts`:

```typescript
// Update these values for your deployment
export const USDC_ADDRESS = '0xYourUSDCAddress';
export const HYPEREVM_CHAIN_ID = 998; // Your chain ID

export const TARGET_NETWORK = {
  chainId: HYPEREVM_CHAIN_ID,
  name: 'HyperEVM',
  rpcUrl: 'https://your-rpc-url.com',
  blockExplorer: 'https://your-explorer.com',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};

// Update vault contract addresses
export const VAULTS: Vault[] = [
  {
    id: 'stable-vault',
    name: 'Stable Vault',
    contractAddress: '0xYourStableVaultAddress',
    // ... rest of config
  },
  // ... other vaults
];
```

### 5. Test the App

#### Start Development Server
```bash
npm start
```

#### Run on iOS Simulator
```bash
# Press 'i' in terminal, or run:
npm run ios
```

#### Run on Android Emulator
```bash
# Press 'a' in terminal, or run:
npm run android
```

## Troubleshooting

### Issue: NativeWind styles not working
**Solution:**
```bash
npx expo start -c  # Clear cache
```

### Issue: "Unable to resolve module"
**Solution:**
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Issue: Privy login not working
**Checklist:**
- [ ] Verify `EXPO_PUBLIC_PRIVY_APP_ID` is correct
- [ ] Check app is configured in Privy dashboard
- [ ] Ensure bundle ID matches in app.json

### Issue: Metro bundler errors
**Solution:**
```bash
# Kill any running Metro processes
killall -9 node
# Restart
npm start
```

## Development Workflow

### 1. Making Changes
- Edit any file in `app/`, `components/`, `hooks/`, etc.
- Changes will hot reload automatically

### 2. Testing Features
- Use iOS Simulator or physical device
- Test all user flows (connect, deposit, portfolio)
- Verify haptic feedback works
- Check error handling

### 3. Debugging
- Open developer menu: `Cmd+D` (iOS) or `Cmd+M` (Android)
- Use React DevTools
- Check Metro bundler logs
- Use `console.log()` for debugging

## Next Steps

### Before Production
1. [ ] Test with real testnet
2. [ ] Update all contract addresses
3. [ ] Configure production Privy app
4. [ ] Add error tracking (Sentry)
5. [ ] Add analytics
6. [ ] Security audit
7. [ ] Add Terms of Service
8. [ ] Create TestFlight build

### Building for TestFlight

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for iOS:
```bash
eas build --platform ios
```

4. Submit to TestFlight:
```bash
eas submit --platform ios
```

## Common Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Clear cache and restart
npx expo start -c

# Check for errors
npm run lint

# Type check
npx tsc --noEmit
```

## Environment Setup

### macOS (iOS Development)
1. Install Xcode from App Store
2. Install Xcode Command Line Tools:
```bash
xcode-select --install
```
3. Install Watchman:
```bash
brew install watchman
```

### Windows/Linux (Android Development)
1. Install Android Studio
2. Set up Android SDK
3. Create Android Virtual Device (AVD)

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Privy Docs](https://docs.privy.io/)
- [Viem Docs](https://viem.sh/)
