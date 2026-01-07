/**
 * Number utility functions for formatting and manipulating numeric values.
 */

/**
 * Formats a number with a specified number of decimal places using US locale.
 * @param num The number to format.
 * @param decimals The number of decimal places (default 2).
 * @returns The formatted number string.
 */
export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

/**
 * Formats a number as a currency string.
 * @param amount The amount to format.
 * @param currency The currency code (default 'USD').
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Formats a value as a percentage of a total.
 * @param value The numerator value.
 * @param total The denominator value.
 * @param decimals The number of decimal places (default 2).
 * @returns The formatted percentage string.
 */
export function formatPercentage(value: number, total: number, decimals = 2): string {
  if (total === 0) return '0%'
  return `${((value / total) * 100).toFixed(decimals)}%`
}

/**
 * Formats basis points as a percentage string.
 * @param bps The basis points value (10000 = 100%).
 * @param decimals The number of decimal places (default 2).
 * @returns The formatted percentage string.
 */
export function formatBPS(bps: number, decimals = 2): string {
  return `${(bps / 100).toFixed(decimals)}%`
}

/**
 * Parses a string or number into a number, removing commas.
 * @param value The value to parse.
 * @returns The parsed number, or 0 if invalid.
 */
export function parseNumber(value: string | number): number {
  if (typeof value === 'number') return value
  const parsed = parseFloat(value.replace(/,/g, ''))
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value The value to clamp.
 * @param min The minimum allowed value.
 * @param max The maximum allowed value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param value The value to round.
 * @param decimals The number of decimal places (default 2).
 * @returns The rounded number.
 */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Ceils a number to a specified number of decimal places.
 * @param value The value to ceil.
 * @param decimals The number of decimal places (default 2).
 * @returns The ceiled number.
 */
export function ceil(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.ceil(value * factor) / factor
}

/**
 * Floors a number to a specified number of decimal places.
 * @param value The value to floor.
 * @param decimals The number of decimal places (default 2).
 * @returns The floored number.
 */
export function floor(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.floor(value * factor) / factor
}

/**
 * Checks if a number is within a specified range (inclusive).
 * @param value The value to check.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns True if the value is in range.
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random integer.
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
