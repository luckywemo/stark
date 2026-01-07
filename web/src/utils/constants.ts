/**
 * Application-wide constants for configuration, networking, contract defaults, and storage keys.
 */

/**
 * Basic application metadata.
 */
export const APP_CONFIG = {
  name: 'Stark Pass Manager',
  description: 'Pass-based access system with fee splitting for Stacks',
  version: '1.0.0',
  author: 'Stacks Builder Challenge',
} as const

/**
 * Network specific URLs and configuration.
 */
export const NETWORK_CONFIG = {
  testnet: {
    name: 'Testnet',
    apiUrl: 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.stacks.co/?chain=testnet',
  },
  mainnet: {
    name: 'Mainnet',
    apiUrl: 'https://api.hiro.so',
    explorerUrl: 'https://explorer.stacks.co',
  },
} as const

/**
 * Default parameters for the smart contract interactions.
 */
export const CONTRACT_DEFAULTS = {
  passPrice: 500000, // micro-STX (0.5 STX)
  usageFee: 1000, // micro-STX (0.001 STX)
  feeSplitBps: 8000, // 80%
  referralDiscountBps: 500, // 5%
  passDurationBlocks: 144, // ~1 day
  blockTimeMinutes: 10,
} as const

/**
 * UI and animation configuration values.
 */
export const UI_CONFIG = {
  toastDuration: 5000,
  refreshInterval: 30000,
  debounceDelay: 300,
  blockUpdateInterval: 60000,
} as const

/**
 * Keys used for browser localStorage.
 */
export const STORAGE_KEYS = {
  contractAddress: 'pass-manager:contract-address',
  network: 'pass-manager:network',
  preferences: 'pass-manager:preferences',
  history: 'pass-manager:transaction-history',
} as const
