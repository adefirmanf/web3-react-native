// components/vault/VaultCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Vault, RiskLevel } from '@/constants/vaults';
import { formatCompactCurrency, formatCurrency } from '@/lib/contracts';
import { useVaultBalance } from '@/hooks/useVaultBalance';

interface VaultCardProps {
  vault: Vault;
  onPress: () => void;
}

export function VaultCard({ vault, onPress }: VaultCardProps) {
  const { balance } = useVaultBalance(vault.contractAddress);
  const userBalanceValue = parseFloat(balance) * 1000; // Mock conversion to USD

  const getRiskColor = () => {
    switch (vault.riskLevel) {
      case RiskLevel.LOW:
        return 'bg-stable';
      case RiskLevel.MEDIUM:
        return 'bg-growth';
      case RiskLevel.HIGH:
        return 'bg-turbo';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-800 active:opacity-70"
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <Text className="text-white text-xl font-bold mb-1">{vault.name}</Text>
          <View className="flex-row items-center">
            <View className={`${getRiskColor()} px-2 py-1 rounded-md`}>
              <Text className="text-white text-xs font-semibold">
                {vault.riskLevel} Risk
              </Text>
            </View>
          </View>
        </View>
        <View
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: vault.color + '20' }}
        >
          <Text style={{ color: vault.color }} className="text-2xl">
            {vault.type === 'stable' ? '🛡️' : vault.type === 'growth' ? '📈' : '🚀'}
          </Text>
        </View>
      </View>

      {/* APY Range */}
      <View className="mb-3">
        <Text className="text-gray-400 text-sm mb-1">Target APY</Text>
        <Text className="text-white text-2xl font-bold">
          {vault.apyMin}% - {vault.apyMax}%
        </Text>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between pt-3 border-t border-gray-800">
        <View className="flex-1">
          <Text className="text-gray-400 text-xs mb-1">Your Balance</Text>
          <Text className="text-white font-semibold">
            {parseFloat(balance) > 0 ? formatCurrency(userBalanceValue) : '$0.00'}
          </Text>
        </View>
        <View className="flex-1 items-end">
          <Text className="text-gray-400 text-xs mb-1">TVL</Text>
          <Text className="text-white font-semibold">
            {formatCompactCurrency(vault.tvl)}
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text className="text-gray-500 text-xs mt-3 leading-5">
        {vault.description}
      </Text>
    </TouchableOpacity>
  );
}
