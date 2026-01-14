// constants/vaults.ts - Vault configurations and types

export enum VaultType {
  STABLE = 'stable',
  GROWTH = 'growth',
  TURBO = 'turbo',
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Vault {
  id: string;
  name: string;
  type: VaultType;
  riskLevel: RiskLevel;
  apyMin: number;
  apyMax: number;
  tvl: number;
  contractAddress: string;
  description: string;
  color: string;
}

// Mock vault data - replace with actual contract addresses
export const VAULTS: Vault[] = [
  {
    id: 'stable-vault',
    name: 'Stable Vault',
    type: VaultType.STABLE,
    riskLevel: RiskLevel.LOW,
    apyMin: 5,
    apyMax: 12,
    tvl: 2500000,
    contractAddress: '0x1234567890123456789012345678901234567890',
    description: 'Conservative strategy focused on stablecoins and low-risk DeFi protocols',
    color: '#4CAF50',
  },
  {
    id: 'growth-vault',
    name: 'Growth Vault',
    type: VaultType.GROWTH,
    riskLevel: RiskLevel.MEDIUM,
    apyMin: 15,
    apyMax: 35,
    tvl: 1800000,
    contractAddress: '0x2345678901234567890123456789012345678901',
    description: 'Balanced approach with mid-cap tokens and yield farming strategies',
    color: '#2196F3',
  },
  {
    id: 'turbo-vault',
    name: 'Turbo Vault',
    type: VaultType.TURBO,
    riskLevel: RiskLevel.HIGH,
    apyMin: 40,
    apyMax: 120,
    tvl: 950000,
    contractAddress: '0x3456789012345678901234567890123456789012',
    description: 'Aggressive strategy leveraging high-yield opportunities and emerging tokens',
    color: '#FF9800',
  },
];

// USDC token address (example - update with actual address)
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

// HyperEVM Chain ID (update with actual chain ID)
export const HYPEREVM_CHAIN_ID = 998; // Example chain ID

export const TARGET_NETWORK = {
  chainId: HYPEREVM_CHAIN_ID,
  name: 'HyperEVM',
  rpcUrl: 'https://rpc.hyperevm.network', // Example RPC
  blockExplorer: 'https://explorer.hyperevm.network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};
