/**
 * Object manipulation utility functions for omitting, picking, and deep merging.
 */

/**
 * Creates a new object by omitting specified keys from the source object.
 * @param obj Source object.
 * @param keys Array of keys to omit.
 * @returns New object without the omitted keys.
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => delete (result as any)[key])
  return result
}

/**
 * Creates a new object by picking specified keys from the source object.
 * @param obj Source object.
 * @param keys Array of keys to pick.
 * @returns New object with only the picked keys.
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      (result as any)[key] = (obj as any)[key]
    }
  })
  return result
}

/**
 * Checks if an object is empty (has no own properties).
 * @param obj Object to check.
 * @returns True if empty or null/undefined.
 */
export function isEmpty(obj: Record<string, any> | null | undefined): boolean {
  if (!obj) return true
  return Object.keys(obj).length === 0
}

/**
 * Deeply merges multiple source objects into a target object.
 * @param target Target object to merge into.
 * @param sources Source objects to merge from.
 * @returns Merged target object.
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      const sourceValue = (source as any)[key]
      if (isObject(sourceValue)) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key] as any, sourceValue)
      } else {
        Object.assign(target, { [key]: sourceValue })
      }
    }
  }

  return deepMerge(target, ...sources)
}

/**
 * Internal helper to check if an item is a plain object.
 * @param item Item to check.
 * @returns True if it's a plain object.
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Retrieves a value from an object using a dot-notation path.
 * @param obj Source object.
 * @param path Path string (e.g., 'user.profile.name').
 * @param defaultValue Value to return if path is not found.
 * @returns Resolved value or default.
 */
export function get(obj: Record<string, any>, path: string, defaultValue?: any): any {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue
    }
    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

/**
 * Sets a value in an object using a dot-notation path.
 * @param obj Target object.
 * @param path Path string.
 * @param value Value to set.
 */
export function set(obj: Record<string, any>, path: string, value: any): void {
  const keys = path.split('.')
  const lastKey = keys.pop()!

  let current = obj
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  current[lastKey] = value
}
