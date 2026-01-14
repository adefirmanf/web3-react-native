# Token Metrics Vault Mobile App

A React Native (Expo) mobile application for Token Metrics vaults with Web3 wallet integration, allowing users to connect wallets, view vault information, and deposit/withdraw funds.

## � Documentation

- 🚀 **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- 🔧 **[SETUP.md](SETUP.md)** - Detailed setup guide
- 🛠️ **[DEVELOPER.md](DEVELOPER.md)** - Developer reference
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- ✨ **[FEATURES.md](FEATURES.md)** - Feature details
- ✅ **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Assignment completion
- 📚 **[DOCS_INDEX.md](DOCS_INDEX.md)** - Complete documentation index

> **New here?** Start with [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide!

## 🚀 Features

### Core Features
- ✅ **Wallet Connection** - Privy wallet integration with persistent connection
- ✅ **Multi-Vault Support** - Three vaults: Stable (Low Risk), Growth (Medium Risk), Turbo (High Risk)
- ✅ **Deposit Flow** - Complete approve → deposit transaction sequence
- ✅ **Portfolio View** - Track positions across all vaults with total USD value
- ✅ **Network Handling** - Auto-detect and switch to correct network (HyperEVM)
- ✅ **Transaction States** - Loading, success, and error handling with haptic feedback
- ✅ **Native UI** - Built with NativeWind (TailwindCSS) for native look and feel

### User Experience
- 🎉 Success animations with confetti
- 📱 Haptic feedback for all interactions
- 🔄 Pull-to-refresh for balance updates
- ⚠️ Comprehensive error handling (user reject, tx revert, insufficient funds)
- 🌓 Dark mode support
- 📊 Real-time balance updates

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Web3 Integration**: 
  - Privy (wallet connection)
  - viem (Ethereum interactions)
  - wagmi (React hooks for Ethereum)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **State Management**: React hooks
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Privy App ID (get from [Privy Dashboard](https://dashboard.privy.io/))

## 🏁 Quick Start

> **Full guide:** See [QUICKSTART.md](QUICKSTART.md) for a complete 5-minute setup checklist

### 1. Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### 2. Configure Privy

1. Create a free account at [Privy Dashboard](https://dashboard.privy.io/)
2. Create a new app
3. Copy your App ID
4. Update `.env`:

```env
EXPO_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

### 3. Update Network Configuration (Optional)

Edit `constants/vaults.ts` to configure:
- Target network chain ID
- RPC URL
- Vault contract addresses
- USDC token address

### 4. Run the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Vaults screen (home)
│   ├── explore.tsx        # Portfolio screen
│   └── _layout.tsx        # Tab navigation
└── _layout.tsx            # Root layout with providers

components/
├── vault/
│   ├── VaultCard.tsx      # Individual vault card
│   └── DepositModal.tsx   # Deposit flow modal
├── wallet/
│   └── WalletButton.tsx   # Connect/disconnect wallet
├── network/
│   └── NetworkWarning.tsx # Wrong network detection
└── portfolio/
    └── PortfolioOverview.tsx # Portfolio summary

hooks/
├── useUSDCBalance.ts      # Fetch USDC balance
├── useVaultBalance.ts     # Fetch vault shares
└── useDepositFlow.ts      # Approve & deposit logic

constants/
├── vaults.ts              # Vault configurations
└── theme.ts               # Theme constants

lib/
└── contracts.ts           # Contract ABIs and utilities

providers/
└── PrivyProvider.tsx      # Privy wallet provider
```

## 🔑 Key Features Implementation

### Wallet Connection
- Privy embedded wallet integration
- Persistent connection across app restarts
- Display connected address (truncated format)
- Real-time USDC balance display

### Vault Display
Each vault card shows:
- Vault name with risk indicator (Low/Medium/High)
- Target APY range
- User's current balance (if deposited)
- Total Value Locked (TVL)
- Descriptive information

### Deposit Flow
1. **Input Amount**
   - Manual input or quick buttons (25%, 50%, 75%, MAX)
   - Real-time balance validation
   - Estimated shares calculation

2. **Approve USDC**
   - Check existing allowance
   - Request approval if needed
   - Loading state with haptic feedback

3. **Deposit to Vault**
   - Execute deposit transaction
   - Wait for confirmation
   - Success animation with confetti

4. **Error Handling**
   - User rejection
   - Transaction revert
   - Insufficient funds
   - Network errors

### Network Handling
- Auto-detect current network
- Display warning if on wrong network
- One-click network switch to HyperEVM
- Automatic network addition if not found

### Portfolio View
- Total portfolio value in USD
- Individual vault positions
- Percentage allocation
- Visual allocation chart
- Pull-to-refresh functionality

## 🧪 Testing

### Test on iOS Simulator

```bash
npm run ios
```

### Test User Flows

1. **Connect Wallet**
   - Tap "Connect Wallet"
   - Complete Privy authentication
   - Verify address display

2. **View Vaults**
   - Check all 3 vaults display correctly
   - Verify APY ranges and risk levels

3. **Deposit Flow**
   - Select a vault
   - Enter amount
   - Try quick buttons
   - Complete approve → deposit
   - Verify success state

4. **Network Switch**
   - Switch to wrong network in wallet
   - Verify warning appears
   - Test network switch functionality

5. **Portfolio View**
   - Navigate to Portfolio tab
   - Verify positions display
   - Test pull-to-refresh

## 🎯 High-Signal Checkpoints

### Async Blockchain Transactions
- ✅ Proper loading states during tx confirmation
- ✅ Haptic feedback at each stage
- ✅ Transaction status tracking
- ✅ Error recovery flows

### Error Handling
- ✅ User rejection handling
- ✅ Transaction revert detection
- ✅ Insufficient funds validation
- ✅ Network errors
- ✅ Wrong network detection

### Native Feel
- ✅ Not a web wrapper - native React Native
- ✅ Haptic feedback throughout
- ✅ Native animations (confetti)
- ✅ iOS-style modals
- ✅ Pull-to-refresh
- ✅ Proper keyboard handling

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_PRIVY_APP_ID` | Privy application ID | Yes |

## 🎨 Customization

### Update Vault Information
Edit `constants/vaults.ts`:
```typescript
export const VAULTS: Vault[] = [
  {
    id: 'stable-vault',
    name: 'Stable Vault',
    contractAddress: '0x...', // Your contract
    apyMin: 5,
    apyMax: 12,
    // ... more config
  },
];
```

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#007AFF',
      stable: '#4CAF50',
      // ... more colors
    },
  },
},
```

## 🐛 Troubleshooting

### "Module not found" errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start -c
```

### NativeWind styles not applying
```bash
# Rebuild with cache clear
npx expo start -c
```

### Privy connection issues
- Verify `EXPO_PUBLIC_PRIVY_APP_ID` is set correctly
- Check Privy dashboard for app configuration
- Ensure correct bundle ID in app.json

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Privy Documentation](https://docs.privy.io/)
- [Viem Documentation](https://viem.sh/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)

## 📄 License

MIT

---

Built with ❤️ for Token Metrics
