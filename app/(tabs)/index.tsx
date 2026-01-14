// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { VAULTS, Vault } from '@/constants/vaults';
import { VaultCard } from '@/components/vault/VaultCard';
import { DepositModal } from '@/components/vault/DepositModal';
import { WalletButton } from '@/components/wallet/WalletButton';
import { NetworkWarning } from '@/components/network/NetworkWarning';
import { useUSDCBalance } from '@/hooks/useUSDCBalance';
import { usePrivy } from '@privy-io/expo';
import { formatCurrency } from '@/lib/contracts';

export default function HomeScreen() {
  const { user } = usePrivy();
  const { balance: usdcBalance } = useUSDCBalance();
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [depositModalVisible, setDepositModalVisible] = useState(false);

  const handleVaultPress = (vault: Vault) => {
    setSelectedVault(vault);
    setDepositModalVisible(true);
  };

  const handleCloseModal = () => {
    setDepositModalVisible(false);
    setSelectedVault(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold mb-2">
            Token Metrics Vaults
          </Text>
          <Text className="text-gray-400 text-base">
            Earn passive income with crypto vaults
          </Text>
        </View>

        {/* Wallet Section */}
        <View className="mb-6">
          <WalletButton />
        </View>

        {/* USDC Balance (if connected) */}
        {user && (
          <View className="bg-gray-900 rounded-xl p-4 mb-6">
            <Text className="text-gray-400 text-sm mb-1">Your USDC Balance</Text>
            <Text className="text-white text-2xl font-bold">
              {formatCurrency(parseFloat(usdcBalance))}
            </Text>
          </View>
        )}

        {/* Network Warning */}
        <NetworkWarning />

        {/* Vaults Section */}
        <View className="mb-4">
          <Text className="text-white text-xl font-bold mb-4">
            Available Vaults
          </Text>
          {VAULTS.map((vault) => (
            <VaultCard
              key={vault.id}
              vault={vault}
              onPress={() => handleVaultPress(vault)}
            />
          ))}
        </View>

        {/* Info Section */}
        <View className="bg-gray-900/50 rounded-xl p-4 mb-6">
          <Text className="text-gray-400 text-sm leading-6">
            💡 Vaults automatically rebalance and compound your earnings. Each vault
            has a different risk profile and target APY range. Choose based on your
            risk tolerance.
          </Text>
        </View>
      </ScrollView>

      {/* Deposit Modal */}
      <DepositModal
        visible={depositModalVisible}
        vault={selectedVault}
        onClose={handleCloseModal}
      />
    </SafeAreaView>
  );
}
