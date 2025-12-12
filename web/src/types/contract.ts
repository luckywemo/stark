// TypeScript types for contract interactions
// Generated types for type-safe contract calls

export interface PassData {
  'expires-at': number
  'total-uses': number
  referrer: string | null
}

export interface ContractConfig {
  owner: string | null
  'community-vault': string | null
  'pass-price': number
  'usage-fee': number
  'fee-split-bps': number
  'referral-discount-bps': number
  'pass-duration-blocks': number
}

export interface ContractEvent {
  event: string
  user?: string
  'expires-at'?: number
  price?: number
  at?: number
}

export interface Analytics {
  totalPassesSold: number
  totalRevenue: number
  activePasses: number
  totalUses: number
}

export type ContractFunction =
  | 'buy-pass'
  | 'renew-pass'
  | 'use-pass'
  | 'bootstrap'
  | 'set-params'
  | 'get-pass'
  | 'is-active'
  | 'get-config'

export interface ContractCallOptions {
  contractAddress: string
  contractName: string
  functionName: ContractFunction
  functionArgs: any[]
  network: any
  onFinish?: (data: any) => void
  onCancel?: () => void
}

