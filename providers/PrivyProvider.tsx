// providers/PrivyProvider.tsx
import React, { ReactNode } from 'react';
import { PrivyProvider as PrivyProviderBase } from '@privy-io/expo';
import { TARGET_NETWORK } from '@/constants/vaults';

interface PrivyProviderProps {
  children: ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  return (
    <PrivyProviderBase
      appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID || 'YOUR_PRIVY_APP_ID'}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#007AFF',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: {
          id: TARGET_NETWORK.chainId,
          name: TARGET_NETWORK.name,
          network: TARGET_NETWORK.name.toLowerCase(),
          nativeCurrency: TARGET_NETWORK.nativeCurrency,
          rpcUrls: {
            default: { http: [TARGET_NETWORK.rpcUrl] },
            public: { http: [TARGET_NETWORK.rpcUrl] },
          },
          blockExplorers: {
            default: {
              name: 'Explorer',
              url: TARGET_NETWORK.blockExplorer,
            },
          },
        },
      }}
    >
      {children}
    </PrivyProviderBase>
  );
}
