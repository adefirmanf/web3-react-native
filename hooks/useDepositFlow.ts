// hooks/useDepositFlow.ts
import { useState } from 'react';
import { usePrivy } from '@privy-io/expo';
import { createWalletClient, custom, createPublicClient, http } from 'viem';
import { USDC_ADDRESS, TARGET_NETWORK } from '@/constants/vaults';
import { ERC20_ABI, VAULT_ABI } from '@/lib/contracts';

export function useDepositFlow() {
  const { user } = usePrivy();
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);

  const getWalletClient = async () => {
    const walletAccount = user?.linked_accounts?.find((account: any) => account.type === 'wallet') as any;
    if (!user || !walletAccount?.address) {
      throw new Error('Wallet not connected');
    }

    // Get the embedded wallet provider from Privy
    const provider = await (walletAccount as any).getEthereumProvider();

    return createWalletClient({
      account: walletAccount.address as `0x${string}`,
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
      transport: custom(provider),
    });
  };

  const getPublicClient = () => {
    return createPublicClient({
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
  };

  const approveUSDC = async (spender: string, amount: bigint): Promise<boolean> => {
    try {
      setIsApproving(true);
      const walletClient = await getWalletClient();
      const publicClient = getPublicClient();

      // Check current allowance
      const walletAccount = user?.linked_accounts?.find((account: any) => account.type === 'wallet') as any;
      if (!walletAccount?.address) {
        throw new Error('Wallet not connected');
      }

      const currentAllowance = await publicClient.readContract({
        address: USDC_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [walletAccount.address as `0x${string}`, spender as `0x${string}`],
      });

      // If allowance is sufficient, no need to approve
      if (currentAllowance >= amount) {
        return true;
      }

      // Send approval transaction
      const hash = await walletClient.writeContract({
        address: USDC_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spender as `0x${string}`, amount],
      });

      // Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      return receipt.status === 'success';
    } catch (error) {
      console.error('Approval error:', error);
      throw error;
    } finally {
      setIsApproving(false);
    }
  };

  const depositToVault = async (vaultAddress: string, amount: bigint): Promise<boolean> => {
    try {
      setIsDepositing(true);
      const walletClient = await getWalletClient();
      const publicClient = getPublicClient();

      // Send deposit transaction
      const hash = await walletClient.writeContract({
        address: vaultAddress as `0x${string}`,
        abi: VAULT_ABI,
        functionName: 'deposit',
        args: [amount],
      });

      // Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      return receipt.status === 'success';
    } catch (error) {
      console.error('Deposit error:', error);
      throw error;
    } finally {
      setIsDepositing(false);
    }
  };

  return {
    approveUSDC,
    depositToVault,
    isApproving,
    isDepositing,
  };
}
