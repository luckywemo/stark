// Application constants

export const CONTRACT_NAME = 'pass-manager'

export const DEFAULT_NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'testnet'

export const STACKS_API_URL = process.env.NEXT_PUBLIC_STACKS_API_URL || 
  (DEFAULT_NETWORK === 'mainnet' 
    ? 'https://api.hiro.so'
    : 'https://api.testnet.hiro.so')

export const EXPLORER_URL = DEFAULT_NETWORK === 'mainnet'
  ? 'https://explorer.stacks.co'
  : 'https://explorer.stacks.co/?chain=testnet'

export const DEFAULT_PASS_PRICE = 500000 // micro-STX (0.5 STX)
export const DEFAULT_USAGE_FEE = 1000 // micro-STX (0.001 STX)
export const DEFAULT_FEE_SPLIT = 8000 // 80% (basis points)
export const DEFAULT_REFERRAL_DISCOUNT = 500 // 5% (basis points)
export const DEFAULT_DURATION_BLOCKS = 144 // ~1 day (assuming 10min blocks)

export const BLOCK_TIME_MINUTES = 10 // Approximate Stacks block time

export const APP_NAME = 'Pass Manager'
export const APP_DESCRIPTION = 'Pass-based access system with fee splitting for Stacks Builder Challenge'

export const SOCIAL_LINKS = {
  github: 'https://github.com/luckywemo/stark',
  docs: 'https://docs.stacks.co',
  explorer: EXPLORER_URL,
  builderChallenge: 'https://stacks.co/build/challenges'
}




