/**
 * Helper utilities for Stacks smart contract interactions and data fetching.
 */
import { StacksTestnet, StacksMainnet } from '@stacks/network'
import type { PassData, ContractConfig } from '@/types/contract'

/**
 * Returns the appropriate Stacks network object based on environment configuration.
 * @returns StacksMainnet or StacksTestnet instance.
 */
export const getNetwork = () => {
  return process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
    ? new StacksMainnet()
    : new StacksTestnet()
}

/**
 * Returns the base API URL for the current Stacks network.
 * @returns Hiro API URL string.
 */
export const getApiUrl = () => {
  const network = getNetwork()
  return network.coreApiUrl
}

/**
 * Formats micro-STX into a decimal STX string with 6 decimal places.
 * @param microStx Value in micro-STX (10^-6 STX).
 * @returns Formatted STX string.
 */
export const formatSTX = (microStx: number): string => {
  return (microStx / 1_000_000).toFixed(6)
}

/**
 * Parses a decimal STX string into a micro-STX integer.
 * @param stx Decimal STX amount.
 * @returns micro-STX value.
 */
export const parseMicroStx = (stx: string): number => {
  return Math.floor(parseFloat(stx) * 1_000_000)
}

/**
 * Fetches pass ownership and metadata for a specific user from the contract.
 * @param contractAddress The principal of the pass manager contract.
 * @param userAddress The principal of the user to check.
 * @returns PassData object or null if no pass found or error.
 */
export const fetchPassData = async (
  contractAddress: string,
  userAddress: string
): Promise<PassData | null> => {
  try {
    const response = await fetch(
      `${getApiUrl()}/v2/contracts/call-read/${contractAddress}/get-pass`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userAddress,
          arguments: [
            {
              type: 'principal',
              value: userAddress,
            },
          ],
        }),
      }
    )

    const data = await response.json()
    if (data.result && data.result.repr !== 'none') {
      const result = data.result.value
      return {
        'expires-at': parseInt(result['expires-at'].value),
        'total-uses': parseInt(result['total-uses'].value),
        referrer: result.referrer?.value?.repr || null,
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching pass data:', error)
    return null
  }
}

/**
 * Fetches the global configuration settings of the pass manager contract.
 * @param contractAddress The principal of the pass manager contract.
 * @returns ContractConfig object or null if error.
 */
export const fetchConfig = async (
  contractAddress: string
): Promise<ContractConfig | null> => {
  try {
    const response = await fetch(
      `${getApiUrl()}/v2/contracts/call-read/${contractAddress}/get-config`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: contractAddress,
          arguments: [],
        }),
      }
    )

    const data = await response.json()
    if (data.result?.value) {
      const cfg = data.result.value
      return {
        owner: cfg.owner?.value?.repr || null,
        'community-vault': cfg['community-vault']?.value?.repr || null,
        'pass-price': parseInt(cfg['pass-price'].value),
        'usage-fee': parseInt(cfg['usage-fee'].value),
        'fee-split-bps': parseInt(cfg['fee-split-bps'].value),
        'referral-discount-bps': parseInt(cfg['referral-discount-bps'].value),
        'pass-duration-blocks': parseInt(cfg['pass-duration-blocks'].value),
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching config:', error)
    return null
  }
}

/**
 * Checks if a user has an active, non-expired pass.
 * @param contractAddress The principal of the pass manager contract.
 * @param userAddress The principal of the user to check.
 * @returns True if the user has an active pass.
 */
export const checkPassActive = async (
  contractAddress: string,
  userAddress: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${getApiUrl()}/v2/contracts/call-read/${contractAddress}/is-active`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userAddress,
          arguments: [
            {
              type: 'principal',
              value: userAddress,
            },
          ],
        }),
      }
    )

    const data = await response.json()
    return data.result?.value === 'true'
  } catch (error) {
    console.error('Error checking pass active:', error)
    return false
  }
}

/**
 * Converts a block count into a human-readable time duration.
 * @param blocks Number of blocks.
 * @returns Formatted duration string (days, hours, or minutes).
 */
export const formatBlockToTime = (blocks: number): string => {
  // Approximate: 1 block = 10 minutes
  const minutes = blocks * 10
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}`
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }
}
