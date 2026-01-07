/**
 * URL and query string parsing and manipulation utility functions.
 */

/**
 * Parses a query string into a key-value record.
 * @param queryString The raw query string (e.g., '?foo=bar').
 * @returns Object with key-value pairs.
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {}
  
  if (!queryString) return params

  queryString
    .replace(/^\?/, '')
    .split('&')
    .forEach(param => {
      const [key, value] = param.split('=')
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : ''
      }
    })

  return params
}

/**
 * Builds a query string from a key-value record.
 * @param params Object with key-value pairs.
 * @returns Formatted query string starting with '?'.
 */
export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const pairs = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  
  return pairs.length > 0 ? `?${pairs.join('&')}` : ''
}

/**
 * Updates or deletes a query parameter in a URL.
 * @param url The full URL string.
 * @param key The parameter key.
 * @param value The value to set, or null to delete.
 * @returns The updated path and query string.
 */
export function updateQueryParam(url: string, key: string, value: string | null): string {
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
  
  if (value === null) {
    urlObj.searchParams.delete(key)
  } else {
    urlObj.searchParams.set(key, value)
  }
  
  return urlObj.pathname + urlObj.search + urlObj.hash
}

/**
 * Retrieves a specific query parameter from a URL.
 * @param url The URL string.
 * @param key The parameter key.
 * @returns Parameter value or null if not found/invalid.
 */
export function getQueryParam(url: string | null, key: string): string | null {
  if (!url) return null
  
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
    return urlObj.searchParams.get(key)
  } catch {
    return null
  }
}

/**
 * Validates if a string is a properly formatted URL.
 * @param url The string to validate.
 * @returns True if valid.
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Extracts the domain (hostname) from a URL.
 * @param url The URL string.
 * @returns Domain string or null if invalid.
 */
export function getDomain(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

/**
 * Extracts the pathname from a URL.
 * @param url The URL string.
 * @returns Pathname or null if invalid.
 */
export function getPath(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch {
    return null
  }
}
