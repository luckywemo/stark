/**
 * Validation utility functions for the Pass Manager application.
 */

export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates that a value is not null, undefined, or an empty string.
 * @param value The value to validate.
 * @param fieldName The name of the field for error messages.
 * @returns A ValidationResult indicating if the value is valid.
 */
export function validateRequired(value: any, fieldName = 'Field'): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} is required` }
  }
  return { valid: true }
}

/**
 * Validates that a string is a correctly formatted email address.
 * @param email The email address to validate.
 * @returns A ValidationResult indicating if the email is valid.
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, error: 'Email is required' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  return { valid: true }
}

/**
 * Validates that a string has a minimum length.
 * @param value The string to validate.
 * @param minLength The minimum allowed length.
 * @param fieldName The name of the field for error messages.
 * @returns A ValidationResult indicating if the string is long enough.
 */
export function validateMinLength(value: string, minLength: number, fieldName = 'Field'): ValidationResult {
  if (value.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` }
  }
  return { valid: true }
}

/**
 * Validates that a string has a maximum length.
 * @param value The string to validate.
 * @param maxLength The maximum allowed length.
 * @param fieldName The name of the field for error messages.
 * @returns A ValidationResult indicating if the string is short enough.
 */
export function validateMaxLength(value: string, maxLength: number, fieldName = 'Field'): ValidationResult {
  if (value.length > maxLength) {
    return { valid: false, error: `${fieldName} must be no more than ${maxLength} characters` }
  }
  return { valid: true }
}

/**
 * Validates that a number is within a specific range.
 * @param value The number to validate.
 * @param min The minimum allowed value (inclusive).
 * @param max The maximum allowed value (inclusive).
 * @param fieldName The name of the field for error messages.
 * @returns A ValidationResult indicating if the number is within range.
 */
export function validateRange(value: number, min: number, max: number, fieldName = 'Field'): ValidationResult {
  if (value < min || value > max) {
    return { valid: false, error: `${fieldName} must be between ${min} and ${max}` }
  }
  return { valid: true }
}

/**
 * Validates that a string matches a regular expression pattern.
 * @param value The string to validate.
 * @param pattern The regex pattern to match against.
 * @param errorMessage The error message to return if the pattern doesn't match.
 * @returns A ValidationResult indicating if the string matches the pattern.
 */
export function validatePattern(value: string, pattern: RegExp, errorMessage: string): ValidationResult {
  if (!pattern.test(value)) {
    return { valid: false, error: errorMessage }
  }
  return { valid: true }
}

/**
 * Validates that a string is a valid URL.
 * @param url The URL to validate.
 * @returns A ValidationResult indicating if the URL is valid.
 */
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { valid: false, error: 'URL is required' }
  }
  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

/**
 * Validates that a number is positive (greater than zero).
 * @param value The number to validate.
 * @param fieldName The name of the field for error messages.
 * @returns A ValidationResult indicating if the number is positive.
 */
export function validatePositiveNumber(value: number, fieldName = 'Field'): ValidationResult {
  if (value <= 0) {
    return { valid: false, error: `${fieldName} must be a positive number` }
  }
  return { valid: true }
}

/**
 * Validates that a number is non-negative (zero or greater).
 * @param value The number to validate.
 * @param fieldName The name of the field for error messages.
 * @returns A ValidationResult indicating if the number is non-negative.
 */
export function validateNonNegativeNumber(value: number, fieldName = 'Field'): ValidationResult {
  if (value < 0) {
    return { valid: false, error: `${fieldName} must be a non-negative number` }
  }
  return { valid: true }
}
