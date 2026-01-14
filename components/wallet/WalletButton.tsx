// components/wallet/WalletButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { formatAddress } from '@/lib/contracts';

export function WalletButton() {
  const { login, logout, user, isReady } = usePrivy();

  if (!isReady) {
    return (
      <View className="bg-gray-800 px-4 py-3 rounded-xl">
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <TouchableOpacity
        onPress={login}
        className="bg-primary px-6 py-3 rounded-xl active:opacity-70"
      >
        <Text className="text-white font-semibold text-center">
          Connect Wallet
        </Text>
      </TouchableOpacity>
    );
  }

  const walletAccount = user?.linked_accounts?.find((account: any) => account.type === 'wallet') as any;
  const walletAddress = walletAccount?.address;

  return (
    <TouchableOpacity
      onPress={logout}
      className="bg-gray-800 px-4 py-3 rounded-xl flex-row items-center active:opacity-70"
    >
      <View className="w-2 h-2 bg-success rounded-full mr-2" />
      <Text className="text-white font-medium">
        {walletAddress ? formatAddress(walletAddress) : 'Connected'}
      </Text>
    </TouchableOpacity>
  );
}
