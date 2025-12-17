// Validation utility functions

export interface ValidationResult {
  valid: boolean
  error?: string
}

export function validateRequired(value: any, fieldName = 'Field'): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} is required` }
  }
  return { valid: true }
}

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

export function validateMinLength(value: string, minLength: number, fieldName = 'Field'): ValidationResult {
  if (value.length < minLength) {
    return { valid: false, error: `${fieldName} must be at least ${minLength} characters` }
  }
  return { valid: true }
}

export function validateMaxLength(value: string, maxLength: number, fieldName = 'Field'): ValidationResult {
  if (value.length > maxLength) {
    return { valid: false, error: `${fieldName} must be no more than ${maxLength} characters` }
  }
  return { valid: true }
}

export function validateRange(value: number, min: number, max: number, fieldName = 'Field'): ValidationResult {
  if (value < min || value > max) {
    return { valid: false, error: `${fieldName} must be between ${min} and ${max}` }
  }
  return { valid: true }
}

export function validatePattern(value: string, pattern: RegExp, errorMessage: string): ValidationResult {
  if (!pattern.test(value)) {
    return { valid: false, error: errorMessage }
  }
  return { valid: true }
}

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

export function validatePositiveNumber(value: number, fieldName = 'Field'): ValidationResult {
  if (value <= 0) {
    return { valid: false, error: `${fieldName} must be a positive number` }
  }
  return { valid: true }
}

export function validateNonNegativeNumber(value: number, fieldName = 'Field'): ValidationResult {
  if (value < 0) {
    return { valid: false, error: `${fieldName} must be a non-negative number` }
  }
  return { valid: true }
}



