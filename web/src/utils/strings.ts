/**
 * String manipulation utility functions for case conversion, truncation, and validation.
 */

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns Capitalized string.
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Converts a string to camelCase.
 * @param str The string to convert.
 * @returns camelCased string.
 */
export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * Converts a string to kebab-case.
 * @param str The string to convert.
 * @returns kebab-cased string.
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Converts a string to snake_case.
 * @param str The string to convert.
 * @returns snake_cased string.
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

/**
 * Truncates a string to a specific length and adds a suffix.
 * @param str The string to truncate.
 * @param maxLength Maximum length including suffix.
 * @param suffix The suffix to add (default '...').
 * @returns Truncated string.
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - suffix.length) + suffix
}

/**
 * Adds an ellipsis to a string if it exceeds maximum length.
 * @param str The string.
 * @param maxLength Maximum length.
 * @returns Truncated string with ellipsis.
 */
export function ellipsis(str: string, maxLength: number): string {
  return truncate(str, maxLength)
}

/**
 * Strips HTML tags from a string.
 * @param html The HTML string.
 * @returns Text-only string.
 */
export function stripHtml(html: string): string {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

/**
 * Converts a string into a URL-friendly slug.
 * @param str The string to slugify.
 * @returns URL-friendly slug.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Pluralizes a word based on count.
 * @param word The singular word.
 * @param count The number of items.
 * @returns Pluralized or singular word.
 */
export function pluralize(word: string, count: number): string {
  return count === 1 ? word : word + 's'
}

/**
 * Checks if a string is null, undefined, or empty/whitespace only.
 * @param str The string to check.
 * @returns True if empty.
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0
}

/**
 * Basic email validation using regex.
 * @param email The email string.
 * @returns True if valid.
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
