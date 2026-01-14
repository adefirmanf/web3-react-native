// app/(tabs)/explore.tsx - Portfolio screen
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { PortfolioOverview } from '@/components/portfolio/PortfolioOverview';

export default function PortfolioScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 p-5">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold mb-2">
            Portfolio
          </Text>
          <Text className="text-gray-400 text-base">
            Track your vault positions and performance
          </Text>
        </View>

        {/* Portfolio Overview */}
        <PortfolioOverview />
      </View>
    </SafeAreaView>
  );
}
