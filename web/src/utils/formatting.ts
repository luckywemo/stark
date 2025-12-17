// Utility functions for formatting data

export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return ''
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

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

export const formatBlockHeight = (blocks: number): string => {
  return new Intl.NumberFormat('en-US').format(blocks)
}

export const formatSTX = (microStx: number, decimals = 6): string => {
  return (microStx / 1_000_000).toFixed(decimals)
}

export const formatPercentage = (value: number, total: number): string => {
  if (total === 0) return '0%'
  return `${((value / total) * 100).toFixed(2)}%`
}

export const formatBPS = (bps: number): string => {
  return `${(bps / 100).toFixed(2)}%`
}

export const parseSTX = (stx: string): number => {
  const parsed = parseFloat(stx)
  if (isNaN(parsed)) return 0
  return Math.floor(parsed * 1_000_000)
}

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



