# 📖 Documentation Index

Welcome to the Token Metrics Vault Mobile App documentation!

## 🚀 Getting Started

### New to the Project?
Start here for a quick setup:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡
   - 5-minute setup guide
   - Installation checklist
   - Quick testing guide

2. **[SETUP.md](SETUP.md)** 🔧
   - Detailed setup instructions
   - Prerequisites
   - Configuration guide
   - Troubleshooting

## 📚 Main Documentation

### Project Overview
- **[README.md](README.md)** 📋
  - Main project documentation
  - Features overview
  - Tech stack
  - Usage instructions
  - Deployment guide

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ✅
  - Assignment completion summary
  - All requirements met
  - Deliverables checklist
  - High-signal checkpoints

### Technical Documentation
- **[ARCHITECTURE.md](ARCHITECTURE.md)** 🏗️
  - Application architecture
  - Component hierarchy
  - Data flow diagrams
  - State management
  - Design patterns

- **[FEATURES.md](FEATURES.md)** ✨
  - Detailed feature documentation
  - Implementation details
  - Technical decisions
  - Future enhancements

## 👨‍💻 Developer Resources

### Development Guide
- **[DEVELOPER.md](DEVELOPER.md)** 🛠️
  - Developer quick reference
  - Key files to modify
  - Common tasks
  - Debugging tips
  - Build process

### Configuration
- **[.env.example](.env.example)** ⚙️
  - Environment variable template
  - Required configuration

## 📁 Code Organization

### Application Structure
```
app/                    # Screens and routing
├── (tabs)/
│   ├── index.tsx      # Vaults screen
│   └── explore.tsx    # Portfolio screen
└── _layout.tsx        # Root layout

components/            # UI components
├── vault/            # Vault-related components
├── wallet/           # Wallet components
├── network/          # Network components
└── portfolio/        # Portfolio components

hooks/                # Custom React hooks
├── useUSDCBalance.ts
├── useVaultBalance.ts
└── useDepositFlow.ts

constants/            # Configuration
└── vaults.ts         # Vault configs

lib/                  # Utilities
└── contracts.ts      # ABIs and helpers

providers/            # Context providers
└── PrivyProvider.tsx # Wallet provider
```

## 🎯 Quick Links by Task

### I want to...

#### Set up the project
→ [QUICKSTART.md](QUICKSTART.md) or [SETUP.md](SETUP.md)

#### Understand the codebase
→ [ARCHITECTURE.md](ARCHITECTURE.md)

#### Add a new feature
→ [DEVELOPER.md](DEVELOPER.md)

#### Configure vaults
→ [constants/vaults.ts](constants/vaults.ts)

#### Modify the UI
→ [tailwind.config.js](tailwind.config.js)

#### Deploy the app
→ [README.md](README.md#deployment)

#### Troubleshoot issues
→ [SETUP.md](SETUP.md#troubleshooting)

#### Understand features
→ [FEATURES.md](FEATURES.md)

## 📖 Documentation by Role

### For Product Managers
1. [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - What's built
2. [FEATURES.md](FEATURES.md) - Feature details
3. [README.md](README.md) - Product overview

### For Developers
1. [QUICKSTART.md](QUICKSTART.md) - Get started fast
2. [DEVELOPER.md](DEVELOPER.md) - Development guide
3. [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture

### For DevOps/Deployment
1. [SETUP.md](SETUP.md) - Environment setup
2. [README.md](README.md) - Deployment section
3. [.env.example](.env.example) - Configuration

### For QA/Testing
1. [QUICKSTART.md](QUICKSTART.md) - Testing checklist
2. [FEATURES.md](FEATURES.md) - Feature specifications
3. [README.md](README.md) - Testing guide

## 🔍 Find What You Need

### By Topic

#### Wallet Integration
- [FEATURES.md](FEATURES.md#wallet-connection)
- [components/wallet/](components/wallet/)
- [providers/PrivyProvider.tsx](providers/PrivyProvider.tsx)

#### Vault System
- [FEATURES.md](FEATURES.md#vault-display-system)
- [components/vault/](components/vault/)
- [constants/vaults.ts](constants/vaults.ts)

#### Deposit Flow
- [FEATURES.md](FEATURES.md#deposit-flow)
- [components/vault/DepositModal.tsx](components/vault/DepositModal.tsx)
- [hooks/useDepositFlow.ts](hooks/useDepositFlow.ts)

#### Portfolio
- [FEATURES.md](FEATURES.md#portfolio-view)
- [components/portfolio/](components/portfolio/)
- [app/(tabs)/explore.tsx](app/(tabs)/explore.tsx)

#### Network Handling
- [FEATURES.md](FEATURES.md#network-handling)
- [components/network/](components/network/)

#### Smart Contracts
- [lib/contracts.ts](lib/contracts.ts)
- [hooks/useDepositFlow.ts](hooks/useDepositFlow.ts)

#### Styling
- [tailwind.config.js](tailwind.config.js)
- [global.css](global.css)

## 📝 Key Files Reference

### Configuration
| File | Purpose |
|------|---------|
| `.env.example` | Environment variables template |
| `constants/vaults.ts` | Vault configurations |
| `tailwind.config.js` | Styling configuration |
| `tsconfig.json` | TypeScript configuration |
| `app.json` | Expo configuration |

### Core Components
| File | Purpose |
|------|---------|
| `app/_layout.tsx` | Root layout with providers |
| `app/(tabs)/index.tsx` | Vaults screen |
| `app/(tabs)/explore.tsx` | Portfolio screen |
| `components/vault/DepositModal.tsx` | Deposit flow |
| `components/wallet/WalletButton.tsx` | Wallet connection |

### Web3 Integration
| File | Purpose |
|------|---------|
| `providers/PrivyProvider.tsx` | Wallet provider |
| `hooks/useDepositFlow.ts` | Transaction logic |
| `hooks/useUSDCBalance.ts` | USDC balance |
| `hooks/useVaultBalance.ts` | Vault shares |
| `lib/contracts.ts` | ABIs and utilities |

## 🆘 Need Help?

### Common Questions
1. **How do I get started?**
   → See [QUICKSTART.md](QUICKSTART.md)

2. **Where do I configure vaults?**
   → See [constants/vaults.ts](constants/vaults.ts)

3. **How do I add a new feature?**
   → See [DEVELOPER.md](DEVELOPER.md#common-tasks)

4. **App won't start?**
   → See [SETUP.md](SETUP.md#troubleshooting)

5. **How does the deposit flow work?**
   → See [FEATURES.md](FEATURES.md#deposit-flow)

### Still Stuck?
1. Check the troubleshooting guide in [SETUP.md](SETUP.md)
2. Review error messages in Metro bundler
3. Check console logs
4. Review the relevant documentation above

## 📊 Project Stats

- **Lines of Code**: ~3,000+
- **Components**: 10+
- **Custom Hooks**: 3
- **Documentation Files**: 8
- **Features Implemented**: 10+
- **Test Coverage**: Manual testing guide provided

## 🎯 Next Steps

After reading the docs:

1. ✅ Complete [QUICKSTART.md](QUICKSTART.md) to run the app
2. ✅ Review [ARCHITECTURE.md](ARCHITECTURE.md) to understand the structure
3. ✅ Check [DEVELOPER.md](DEVELOPER.md) for development workflows
4. ✅ Customize vaults in [constants/vaults.ts](constants/vaults.ts)
5. ✅ Deploy using [README.md](README.md) guide

---

**Happy Coding! 🚀**

For the best experience, start with [QUICKSTART.md](QUICKSTART.md) if you're new, or jump to [DEVELOPER.md](DEVELOPER.md) if you're ready to develop.
