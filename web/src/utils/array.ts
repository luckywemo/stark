/**
 * Array utility functions for common operations like chunking, grouping, and shuffling.
 */

/**
 * Splits an array into chunks of a specified size.
 * @param array The array to chunk.
 * @param size The size of each chunk.
 * @returns An array of chunks.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Returns a new array with duplicate values removed.
 * @param array The array to process.
 * @returns A unique array.
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * Returns a unique array based on a specific property of the objects.
 * @param array The array of objects.
 * @param key The property key to check for uniqueness.
 * @returns A unique array of objects.
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  })
}

/**
 * Groups an array of objects by a specific property.
 * @param array The array of objects.
 * @param key The property key to group by.
 * @returns A record where keys are group values and values are arrays of objects.
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key])
    if (!result[group]) {
      result[group] = []
    }
    result[group].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Sorts an array of objects by a specific property.
 * @param array The array of objects.
 * @param key The property key to sort by.
 * @param order The sort order ('asc' or 'desc').
 * @returns A new sorted array.
 */
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Flattens a nested array into a single level.
 * @param array The nested array to flatten.
 * @returns A flat array.
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  const result: T[] = []
  array.forEach(val => {
    if (Array.isArray(val)) {
      result.push(...flatten(val as (T | T[])[]))
    } else {
      result.push(val)
    }
  })
  return result
}

/**
 * Generates an array of numbers in a range.
 * @param start The starting number (inclusive).
 * @param end The ending number (exclusive).
 * @param step The increment value.
 * @returns An array of numbers.
 */
export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

/**
 * Combines two arrays into an array of pairs.
 * @param array1 First array.
 * @param array2 Second array.
 * @returns An array of tuples.
 */
export function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
  const length = Math.min(array1.length, array2.length)
  return Array.from({ length }, (_, i) => [array1[i], array2[i]])
}
