# 🚀 Quick Start Checklist

Use this checklist to get the app running in under 5 minutes!

## ☐ Prerequisites (2 minutes)

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Xcode installed (for iOS development)
- [ ] iOS Simulator ready

## ☐ Installation (1 minute)

```bash
# Navigate to project
cd web3-tm

# Install dependencies
npm install
```

## ☐ Configuration (2 minutes)

### 1. Create Privy Account
- [ ] Go to https://dashboard.privy.io/
- [ ] Sign up (free)
- [ ] Create a new app
- [ ] Copy your App ID (starts with `cl...`)

### 2. Set Environment Variable
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Privy App ID
# EXPO_PUBLIC_PRIVY_APP_ID=your_app_id_here
```

## ☐ Run the App (30 seconds)

```bash
# Start Expo
npm run ios

# Or if you have expo-cli installed globally:
# expo start
# Then press 'i' for iOS simulator
```

## ☐ Test the App (2 minutes)

### Basic Flow Test
- [ ] App opens on iOS simulator
- [ ] You see "Token Metrics Vaults" header
- [ ] You see 3 vault cards (Stable, Growth, Turbo)
- [ ] Tap "Connect Wallet" button
- [ ] Complete Privy wallet setup
- [ ] See your wallet address (truncated)
- [ ] See USDC balance (will be 0.00 on testnet)

### Deposit Flow Test (Optional - requires testnet USDC)
- [ ] Tap on any vault card
- [ ] Deposit modal opens
- [ ] Enter an amount or use quick buttons
- [ ] Tap "Deposit" button
- [ ] Approve transaction (if first time)
- [ ] Complete deposit transaction
- [ ] See confetti animation on success

### Portfolio Test
- [ ] Tap "Portfolio" tab at bottom
- [ ] See total portfolio value
- [ ] Pull down to refresh

## 🎉 Success!

If you completed all steps, you're ready to develop!

## 🔧 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Simulator not opening
```bash
# Make sure Xcode is installed
xcode-select --install

# Open simulator manually
open -a Simulator
```

### Privy not connecting
- Check .env file has correct App ID
- Verify App ID in Privy dashboard
- Try clearing cache: `npx expo start -c`

### Styles not showing
```bash
# Clear cache and restart
npx expo start -c
```

## 📚 Next Steps

Once you have the app running:

1. **Read the docs:**
   - [README.md](README.md) - Full documentation
   - [SETUP.md](SETUP.md) - Detailed setup
   - [DEVELOPER.md](DEVELOPER.md) - Development guide

2. **Customize:**
   - Update vault addresses in `constants/vaults.ts`
   - Change colors in `tailwind.config.js`
   - Add your own features!

3. **Deploy:**
   - See README.md for TestFlight instructions
   - Configure production Privy app
   - Test on real devices

## 💡 Pro Tips

- **Cmd+D** in simulator opens developer menu
- **Cmd+R** reloads the app
- Use **React DevTools** for debugging
- Check **Metro bundler** terminal for errors
- **Pull to refresh** updates balances

## ⏱️ Total Time: ~5 minutes

You should now have a fully functional Web3 mobile app running on your iOS simulator!

---

Need help? Check the troubleshooting section above or see [SETUP.md](SETUP.md) for detailed guidance.
