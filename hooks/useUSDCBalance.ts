// hooks/useUSDCBalance.ts
import { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/expo';
import { createPublicClient, http, formatUnits } from 'viem';
import { USDC_ADDRESS, TARGET_NETWORK } from '@/constants/vaults';
import { ERC20_ABI } from '@/lib/contracts';

export function useUSDCBalance() {
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
        address: USDC_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
      });

      const formatted = formatUnits(balanceResult, 6); // USDC has 6 decimals
      setBalance(formatted);
    } catch (error) {
      console.error('Error fetching USDC balance:', error);
      setBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  return { balance, isLoading, refetch: fetchBalance };
}
