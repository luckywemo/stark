// URL utility functions

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

export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const pairs = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  
  return pairs.length > 0 ? `?${pairs.join('&')}` : ''
}

export function updateQueryParam(url: string, key: string, value: string | null): string {
  const urlObj = new URL(url, window.location.origin)
  
  if (value === null) {
    urlObj.searchParams.delete(key)
  } else {
    urlObj.searchParams.set(key, value)
  }
  
  return urlObj.pathname + urlObj.search + urlObj.hash
}

export function getQueryParam(url: string | null, key: string): string | null {
  if (!url) return null
  
  try {
    const urlObj = new URL(url, window.location.origin)
    return urlObj.searchParams.get(key)
  } catch {
    return null
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getDomain(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    return null
  }
}

export function getPath(url: string): string | null {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch {
    return null
  }
}




