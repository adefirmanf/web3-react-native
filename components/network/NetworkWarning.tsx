// components/network/NetworkWarning.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { TARGET_NETWORK } from '@/constants/vaults';

export function NetworkWarning() {
  const { user } = usePrivy();
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);

  useEffect(() => {
    checkNetwork();
  }, [user]);

  const checkNetwork = async () => {
    const walletAccount = user?.linked_accounts?.find((account: any) => account.type === 'wallet');
    if (!user || !walletAccount) {
      setWrongNetwork(false);
      return;
    }

    try {
      const provider = await (walletAccount as any).getEthereumProvider();
      const chainId = await provider.request({ method: 'eth_chainId' });
      const chainIdNumber = parseInt(chainId as string, 16);
      
      setCurrentChainId(chainIdNumber);
      setWrongNetwork(chainIdNumber !== TARGET_NETWORK.chainId);
    } catch (error) {
      console.error('Error checking network:', error);
    }
  };

  const handleSwitchNetwork = async () => {
    const walletAccount = user?.linked_accounts?.find((account: any) => account.type === 'wallet');
    if (!walletAccount) return;

    try {
      const provider = await (walletAccount as any).getEthereumProvider();
      
      // Try to switch to the target network
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${TARGET_NETWORK.chainId.toString(16)}` }],
      });

      // Recheck network after switching
      setTimeout(checkNetwork, 1000);
    } catch (error: any) {
      // If the network doesn't exist, try to add it
      if (error.code === 4902) {
        try {
          const provider = await (walletAccount as any).getEthereumProvider();
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${TARGET_NETWORK.chainId.toString(16)}`,
                chainName: TARGET_NETWORK.name,
                nativeCurrency: TARGET_NETWORK.nativeCurrency,
                rpcUrls: [TARGET_NETWORK.rpcUrl],
                blockExplorerUrls: [TARGET_NETWORK.blockExplorer],
              },
            ],
          });
          setTimeout(checkNetwork, 1000);
        } catch (addError) {
          console.error('Error adding network:', addError);
          Alert.alert('Error', 'Failed to add network. Please add it manually.');
        }
      } else {
        console.error('Error switching network:', error);
        Alert.alert('Error', 'Failed to switch network. Please switch manually.');
      }
    }
  };

  if (!wrongNetwork) return null;

  return (
    <View className="bg-warning/20 border border-warning rounded-xl p-4 mb-4">
      <View className="flex-row items-start">
        <Text className="text-2xl mr-3">⚠️</Text>
        <View className="flex-1">
          <Text className="text-warning font-bold text-lg mb-1">
            Wrong Network
          </Text>
          <Text className="text-white mb-3">
            Please switch to {TARGET_NETWORK.name} to use the vaults.
            {currentChainId && ` Currently on chain ${currentChainId}.`}
          </Text>
          <TouchableOpacity
            onPress={handleSwitchNetwork}
            className="bg-warning rounded-lg px-4 py-2 self-start"
          >
            <Text className="text-white font-semibold">
              Switch to {TARGET_NETWORK.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
