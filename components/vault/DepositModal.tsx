// components/vault/DepositModal.tsx
import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';
import { usePrivy } from '@privy-io/expo';
import { parseUnits, formatUnits } from 'viem';
import { Vault } from '@/constants/vaults';
import { formatCurrency } from '@/lib/contracts';
import { useUSDCBalance } from '@/hooks/useUSDCBalance';
import { useDepositFlow } from '@/hooks/useDepositFlow';

interface DepositModalProps {
  visible: boolean;
  vault: Vault | null;
  onClose: () => void;
}

enum DepositStep {
  INPUT = 'input',
  APPROVING = 'approving',
  DEPOSITING = 'depositing',
  SUCCESS = 'success',
  ERROR = 'error',
}

export function DepositModal({ visible, vault, onClose }: DepositModalProps) {
  const { user } = usePrivy();
  const { balance: usdcBalance } = useUSDCBalance();
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<DepositStep>(DepositStep.INPUT);
  const [errorMessage, setErrorMessage] = useState('');
  const confettiRef = useRef<any>(null);

  const { approveUSDC, depositToVault, isApproving, isDepositing } = useDepositFlow();

  const handleClose = () => {
    setAmount('');
    setStep(DepositStep.INPUT);
    setErrorMessage('');
    onClose();
  };

  const setQuickAmount = (percentage: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const maxBalance = parseFloat(usdcBalance);
    const quickAmount = (maxBalance * percentage).toFixed(2);
    setAmount(quickAmount);
  };

  const estimatedShares = () => {
    if (!amount || parseFloat(amount) === 0) return '0';
    // Simplified calculation - in real app, use previewDeposit from contract
    return (parseFloat(amount) * 0.95).toFixed(2);
  };

  const handleDeposit = async () => {
    if (!vault || !user) {
      Alert.alert('Error', 'Please connect your wallet first');
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (depositAmount > parseFloat(usdcBalance)) {
      Alert.alert('Insufficient Balance', 'You do not have enough USDC');
      return;
    }

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // Step 1: Approve USDC
      setStep(DepositStep.APPROVING);
      const amountInWei = parseUnits(amount, 6); // USDC has 6 decimals
      
      const approveSuccess = await approveUSDC(vault.contractAddress, amountInWei);
      
      if (!approveSuccess) {
        throw new Error('Approval failed');
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Step 2: Deposit to vault
      setStep(DepositStep.DEPOSITING);
      const depositSuccess = await depositToVault(vault.contractAddress, amountInWei);

      if (!depositSuccess) {
        throw new Error('Deposit failed');
      }

      // Success!
      setStep(DepositStep.SUCCESS);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      confettiRef.current?.start();

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error: any) {
      console.error('Deposit error:', error);
      setStep(DepositStep.ERROR);
      
      if (error.message?.includes('user rejected')) {
        setErrorMessage('Transaction was rejected');
      } else if (error.message?.includes('insufficient funds')) {
        setErrorMessage('Insufficient funds for gas');
      } else {
        setErrorMessage(error.message || 'Transaction failed');
      }
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  if (!vault) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View className="flex-1 bg-black/80 justify-end">
        <View className="bg-gray-900 rounded-t-3xl p-6 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-bold">
                Deposit to {vault.name}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                className="w-8 h-8 bg-gray-800 rounded-full items-center justify-center"
              >
                <Text className="text-white text-lg">×</Text>
              </TouchableOpacity>
            </View>

            {step === DepositStep.INPUT && (
              <>
                {/* Balance Display */}
                <View className="bg-gray-800 rounded-xl p-4 mb-4">
                  <Text className="text-gray-400 text-sm mb-1">Available Balance</Text>
                  <Text className="text-white text-xl font-bold">
                    {formatCurrency(parseFloat(usdcBalance))} USDC
                  </Text>
                </View>

                {/* Amount Input */}
                <View className="mb-4">
                  <Text className="text-gray-400 text-sm mb-2">Deposit Amount</Text>
                  <View className="bg-gray-800 rounded-xl p-4 flex-row items-center">
                    <TextInput
                      value={amount}
                      onChangeText={setAmount}
                      placeholder="0.00"
                      placeholderTextColor="#6B7280"
                      keyboardType="numeric"
                      className="flex-1 text-white text-2xl font-bold"
                    />
                    <Text className="text-gray-400 text-lg ml-2">USDC</Text>
                  </View>
                </View>

                {/* Quick Amount Buttons */}
                <View className="flex-row justify-between mb-6">
                  {[0.25, 0.5, 0.75, 1].map((pct) => (
                    <TouchableOpacity
                      key={pct}
                      onPress={() => setQuickAmount(pct)}
                      className="bg-gray-800 px-4 py-2 rounded-lg active:opacity-70"
                    >
                      <Text className="text-white font-semibold">
                        {pct === 1 ? 'MAX' : `${pct * 100}%`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Estimated Shares */}
                {parseFloat(amount) > 0 && (
                  <View className="bg-gray-800/50 rounded-xl p-4 mb-6">
                    <Text className="text-gray-400 text-sm mb-1">
                      Estimated Shares to Receive
                    </Text>
                    <Text className="text-white text-lg font-bold">
                      {estimatedShares()} shares
                    </Text>
                  </View>
                )}

                {/* Deposit Button */}
                <TouchableOpacity
                  onPress={handleDeposit}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className={`rounded-xl py-4 ${
                    !amount || parseFloat(amount) <= 0
                      ? 'bg-gray-700'
                      : 'bg-primary'
                  }`}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Deposit
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {(step === DepositStep.APPROVING || step === DepositStep.DEPOSITING) && (
              <View className="items-center py-12">
                <ActivityIndicator size="large" color="#007AFF" />
                <Text className="text-white text-xl font-bold mt-6 mb-2">
                  {step === DepositStep.APPROVING
                    ? 'Approving USDC...'
                    : 'Depositing...'}
                </Text>
                <Text className="text-gray-400 text-center">
                  {step === DepositStep.APPROVING
                    ? 'Please confirm the approval transaction in your wallet'
                    : 'Please confirm the deposit transaction in your wallet'}
                </Text>
              </View>
            )}

            {step === DepositStep.SUCCESS && (
              <View className="items-center py-12">
                <Text className="text-6xl mb-4">🎉</Text>
                <Text className="text-white text-2xl font-bold mb-2">
                  Deposit Successful!
                </Text>
                <Text className="text-gray-400 text-center">
                  You've successfully deposited {amount} USDC to {vault.name}
                </Text>
              </View>
            )}

            {step === DepositStep.ERROR && (
              <View className="items-center py-12">
                <Text className="text-6xl mb-4">⚠️</Text>
                <Text className="text-white text-2xl font-bold mb-2">
                  Transaction Failed
                </Text>
                <Text className="text-gray-400 text-center mb-6">
                  {errorMessage}
                </Text>
                <TouchableOpacity
                  onPress={() => setStep(DepositStep.INPUT)}
                  className="bg-primary rounded-xl px-6 py-3"
                >
                  <Text className="text-white font-bold">Try Again</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>

          <ConfettiCannon
            ref={confettiRef}
            count={200}
            origin={{ x: -10, y: 0 }}
            fadeOut={true}
            autoStart={false}
          />
        </View>
      </View>
    </Modal>
  );
}
