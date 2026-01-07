// Storage utilities for managing browser storage

export const storage = {
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

  has: (key: string): boolean => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(key) !== null
  },
}

// Storage keys
export const STORAGE_KEYS = {
  CONTRACT_ADDRESS: 'pass-manager:contract-address',
  NETWORK: 'pass-manager:network',
  USER_PREFERENCES: 'pass-manager:user-preferences',
  TRANSACTION_HISTORY: 'pass-manager:transaction-history',
} as const




