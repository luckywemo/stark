/**
 * Date and time formatting and manipulation utilities.
 */

/**
 * Formats a date object or string into a readable date string.
 * @param date The date to format.
 * @param format The format style ('short', 'long', or 'relative').
 * @returns The formatted date string.
 */
export function formatDate(date: Date | string | number, format: 'short' | 'long' | 'relative' = 'short'): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date

  if (format === 'relative') {
    return formatRelativeTime(dateObj)
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'long' ? 'long' : 'short',
    day: 'numeric',
  }

  return dateObj.toLocaleDateString('en-US', options)
}

/**
 * Formats a date into a localized date and time string.
 * @param date The date to format.
 * @param includeSeconds Whether to include seconds in the output.
 * @returns The formatted date and time string.
 */
export function formatDateTime(date: Date | string | number, includeSeconds = false): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date

  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
  })
}

/**
 * Formats a date as a relative time string (e.g., '5 minutes ago').
 * @param date The date to format.
 * @returns The relative time string.
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date

  const now = new Date()
  const diff = now.getTime() - dateObj.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}

/**
 * Checks if a given date is today.
 * @param date The date to check.
 * @returns True if the date is today.
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  const today = new Date()
  return dateObj.toDateString() === today.toDateString()
}

/**
 * Checks if a given date was yesterday.
 * @param date The date to check.
 * @returns True if the date was yesterday.
 */
export function isYesterday(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateObj.toDateString() === yesterday.toDateString()
}

/**
 * Checks if a given date is within the last 7 days.
 * @param date The date to check.
 * @returns True if the date is within this week.
 */
export function isThisWeek(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number' 
    ? new Date(date) 
    : date
  const today = new Date()
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  return dateObj >= weekAgo && dateObj <= today
}

/**
 * Adds a specified number of days to a date.
 * @param date The base date.
 * @param days The number of days to add.
 * @returns A new Date object.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Adds a specified number of hours to a date.
 * @param date The base date.
 * @param hours The number of hours to add.
 * @returns A new Date object.
 */
export function addHours(date: Date, hours: number): Date {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

/**
 * Adds a specified number of minutes to a date.
 * @param date The base date.
 * @param minutes The number of minutes to add.
 * @returns A new Date object.
 */
export function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date)
  result.setMinutes(result.getMinutes() + minutes)
  return result
}
