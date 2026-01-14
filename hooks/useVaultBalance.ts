// hooks/useVaultBalance.ts
import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/expo';
import { createPublicClient, http, formatUnits } from 'viem';
import { TARGET_NETWORK } from '@/constants/vaults';
import { VAULT_ABI } from '@/lib/contracts';

export function useVaultBalance(vaultAddress: string) {
  const { user } = usePrivy();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalance = async () => {
    const walletAccount = user?.linked_accounts?.find((account: any) => account.type === 'wallet') as any;
    const walletAddress = walletAccount?.address;
    if (!user || !walletAddress) {
      setBalance('0');
      return;
    }

    try {
      setIsLoading(true);
      const publicClient = createPublicClient({
        chain: {
          id: TARGET_NETWORK.chainId,
          name: TARGET_NETWORK.name,
          network: TARGET_NETWORK.name.toLowerCase(),
          nativeCurrency: TARGET_NETWORK.nativeCurrency,
          rpcUrls: {
            default: { http: [TARGET_NETWORK.rpcUrl] },
            public: { http: [TARGET_NETWORK.rpcUrl] },
          },
        },
        transport: http(),
      });

      const balanceResult = await publicClient.readContract({
        address: vaultAddress as `0x${string}`,
        abi: VAULT_ABI,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
      });

      const formatted = formatUnits(balanceResult, 18); // Vault shares typically 18 decimals
      setBalance(formatted);
    } catch (error) {
      console.error('Error fetching vault balance:', error);
      setBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user, vaultAddress]);

  return { balance, isLoading, refetch: fetchBalance };
}
