/**
 * Utility for managing browser localStorage with JSON serialization.
 */
export const storage = {
  /**
   * Reads a value from localStorage.
   * @param key Storage key.
   * @param defaultValue Optional default value if key is not found.
   * @returns Parsed value or null/default.
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : (defaultValue || null)
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue || null
    }
  },

  /**
   * Writes a value to localStorage.
   * @param key Storage key.
   * @param value Value to store (will be JSON serialized).
   * @returns True if successful.
   */
  set: <T>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') return false

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Removes a specific key from localStorage.
   * @param key Storage key to remove.
   * @returns True if successful.
   */
  remove: (key: string): boolean => {
    if (typeof window === 'undefined') return false

    try {
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Clears all values from localStorage for the current domain.
   * @returns True if successful.
   */
  clear: (): boolean => {
    if (typeof window === 'undefined') return false

    try {
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },

  /**
   * Checks if a specific key exists in localStorage.
   * @param key Storage key.
   * @returns True if key exists.
   */
  has: (key: string): boolean => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(key) !== null
  },
}

/**
 * Centralized keys for localStorage to avoid collisions.
 */
export const STORAGE_KEYS = {
  CONTRACT_ADDRESS: 'pass-manager:contract-address',
  NETWORK: 'pass-manager:network',
  USER_PREFERENCES: 'pass-manager:user-preferences',
  TRANSACTION_HISTORY: 'pass-manager:transaction-history',
} as const
