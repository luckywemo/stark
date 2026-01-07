/**
 * General purpose formatting utilities for addresses, dates, and Stacks specific values.
 */

/**
 * Truncates a Stacks address for display.
 * @param address The full address.
 * @param startChars Characters to show at the start.
 * @param endChars Characters to show at the end.
 * @returns Truncated string.
 */
export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return ''
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * Formats a timestamp into a localized date string.
 * @param timestamp Unix timestamp or ISO string.
 * @returns Formatted date string.
 */
export const formatDate = (timestamp: number | string): string => {
  const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Formats a block height with comma separators.
 * @param blocks The block count.
 * @returns Formatted number string.
 */
export const formatBlockHeight = (blocks: number): string => {
  return new Intl.NumberFormat('en-US').format(blocks)
}

/**
 * Formats micro-STX into a decimal STX string.
 * @param microStx Value in micro-STX.
 * @param decimals Decimal places to include.
 * @returns Formatted STX string.
 */
export const formatSTX = (microStx: number, decimals = 6): string => {
  return (microStx / 1_000_000).toFixed(decimals)
}

/**
 * Calculates and formats a percentage.
 * @param value The numerator.
 * @param total The denominator.
 * @returns Formatted percentage string.
 */
export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%'
  return `${((value / total) * 100).toFixed(2)}%`
}

/**
 * Formats Basis Points (BPS) into a percentage string.
 * @param bps Value in BPS (1/100th of a percent).
 * @returns Formatted percentage string.
 */
export const formatBPS = (bps: number): string => {
  return `${(bps / 100).toFixed(2)}%`
}

/**
 * Parses a decimal STX string into micro-STX.
 * @param stx Decimal STX amount.
 * @returns Value in micro-STX.
 */
export const parseSTX = (stx: string): number => {
  const parsed = parseFloat(stx)
  if (isNaN(parsed)) return 0
  return Math.floor(parsed * 1_000_000)
}

/**
 * Formats a timestamp as relative time (e.g., '2 hours ago').
 * @param timestamp Unix timestamp.
 * @returns Relative time string.
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now()
  const diff = now - (typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}
