// Number utility functions

export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatPercentage(value: number, total: number, decimals = 2): string {
  if (total === 0) return '0%'
  return `${((value / total) * 100).toFixed(decimals)}%`
}

export function formatBPS(bps: number, decimals = 2): string {
  return `${(bps / 100).toFixed(decimals)}%`
}

export function parseNumber(value: string | number): number {
  if (typeof value === 'number') return value
  const parsed = parseFloat(value.replace(/,/g, ''))
  return isNaN(parsed) ? 0 : parsed
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

export function ceil(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.ceil(value * factor) / factor
}

export function floor(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.floor(value * factor) / factor
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}



