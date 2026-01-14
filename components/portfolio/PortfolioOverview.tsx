// components/portfolio/PortfolioOverview.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { VAULTS } from '@/constants/vaults';
import { formatCurrency, formatCompactCurrency } from '@/lib/contracts';
import { useVaultBalance } from '@/hooks/useVaultBalance';

interface VaultPosition {
  vaultName: string;
  shares: string;
  valueUSD: number;
  color: string;
}

export function PortfolioOverview() {
  const { user } = usePrivy();
  const [refreshing, setRefreshing] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [positions, setPositions] = useState<VaultPosition[]>([]);

  // Get balances for all vaults
  const stableBalance = useVaultBalance(VAULTS[0].contractAddress);
  const growthBalance = useVaultBalance(VAULTS[1].contractAddress);
  const turboBalance = useVaultBalance(VAULTS[2].contractAddress);

  useEffect(() => {
    if (user) {
      updatePositions();
    }
  }, [
    user,
    stableBalance.balance,
    growthBalance.balance,
    turboBalance.balance,
  ]);

  const updatePositions = () => {
    const newPositions: VaultPosition[] = [];
    let total = 0;

    // Calculate positions for each vault
    const vaultBalances = [stableBalance, growthBalance, turboBalance];
    
    VAULTS.forEach((vault, index) => {
      const shares = parseFloat(vaultBalances[index].balance);
      if (shares > 0) {
        // Mock conversion: 1 share ≈ $1000 (in real app, fetch actual price)
        const valueUSD = shares * 1000;
        total += valueUSD;

        newPositions.push({
          vaultName: vault.name,
          shares: shares.toFixed(4),
          valueUSD,
          color: vault.color,
        });
      }
    });

    setPositions(newPositions);
    setTotalValue(total);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      stableBalance.refetch(),
      growthBalance.refetch(),
      turboBalance.refetch(),
    ]);
    setRefreshing(false);
  };

  if (!user) {
    return (
      <View className="bg-gray-900 rounded-2xl p-8 items-center justify-center">
        <Text className="text-4xl mb-4">🔒</Text>
        <Text className="text-white text-lg font-bold mb-2">
          Connect Your Wallet
        </Text>
        <Text className="text-gray-400 text-center">
          Connect your wallet to view your portfolio
        </Text>
      </View>
    );
  }

  const isLoading =
    stableBalance.isLoading || growthBalance.isLoading || turboBalance.isLoading;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
      }
    >
      {/* Total Value Card */}
      <View className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 mb-6 border border-primary/30">
        <Text className="text-gray-400 text-sm mb-2">Total Portfolio Value</Text>
        {isLoading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <Text className="text-white text-4xl font-bold mb-1">
            {formatCurrency(totalValue)}
          </Text>
        )}
        <Text className="text-gray-400 text-xs">
          Across {positions.length} vault{positions.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Individual Positions */}
      <View className="bg-gray-900 rounded-2xl p-6 mb-6">
        <Text className="text-white text-xl font-bold mb-4">Your Positions</Text>

        {positions.length === 0 ? (
          <View className="py-8 items-center">
            <Text className="text-6xl mb-4">💼</Text>
            <Text className="text-gray-400 text-center">
              No positions yet. Deposit into a vault to get started!
            </Text>
          </View>
        ) : (
          positions.map((position, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center py-4 border-b border-gray-800 last:border-b-0"
            >
              <View className="flex-row items-center flex-1">
                <View
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: position.color }}
                />
                <View>
                  <Text className="text-white font-semibold mb-1">
                    {position.vaultName}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {position.shares} shares
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-white font-bold">
                  {formatCurrency(position.valueUSD)}
                </Text>
                <Text className="text-gray-400 text-xs">
                  {totalValue > 0
                    ? `${((position.valueUSD / totalValue) * 100).toFixed(1)}%`
                    : '0%'}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Portfolio Allocation Chart (Simple Visual) */}
      {positions.length > 0 && (
        <View className="bg-gray-900 rounded-2xl p-6">
          <Text className="text-white text-xl font-bold mb-4">Allocation</Text>
          <View className="flex-row h-4 rounded-full overflow-hidden mb-4">
            {positions.map((position, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: position.color,
                  width: `${(position.valueUSD / totalValue) * 100}%`,
                }}
              />
            ))}
          </View>
          <View>
            {positions.map((position, index) => (
              <View key={index} className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <View
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: position.color }}
                  />
                  <Text className="text-gray-400 text-sm">{position.vaultName}</Text>
                </View>
                <Text className="text-white font-semibold">
                  {((position.valueUSD / totalValue) * 100).toFixed(1)}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
