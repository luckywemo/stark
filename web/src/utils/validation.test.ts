import { describe, it, expect } from 'vitest'
import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validateRange,
  validatePattern,
  validateUrl,
  validatePositiveNumber,
  validateNonNegativeNumber
} from './validation'

describe('validation utils', () => {
  describe('validateRequired', () => {
    it('should return valid: true for non-empty values', () => {
      expect(validateRequired('test').valid).toBe(true)
      expect(validateRequired(0).valid).toBe(true)
      expect(validateRequired(false).valid).toBe(true)
    })

    it('should return valid: false for empty values', () => {
      const result = validateRequired('', 'Name')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Name is required')
      expect(validateRequired(null).valid).toBe(false)
      expect(validateRequired(undefined).valid).toBe(false)
    })
  })

  describe('validateEmail', () => {
    it('should return valid: true for valid emails', () => {
      expect(validateEmail('test@example.com').valid).toBe(true)
    })

    it('should return valid: false for invalid emails', () => {
      const result = validateEmail('invalid')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Invalid email format')
    })
  })

  describe('validateMinLength', () => {
    it('should return valid: true if at least minLength', () => {
      expect(validateMinLength('abc', 3).valid).toBe(true)
      expect(validateMinLength('abcd', 3).valid).toBe(true)
    })

    it('should return valid: false if shorter than minLength', () => {
      const result = validateMinLength('ab', 3, 'Password')
      expect(result.valid).toBe(false)
      expect(result.error).toBe('Password must be at least 3 characters')
    })
  })

  describe('validateRange', () => {
    it('should return valid: true if within range', () => {
      expect(validateRange(5, 1, 10).valid).toBe(true)
      expect(validateRange(1, 1, 10).valid).toBe(true)
      expect(validateRange(10, 1, 10).valid).toBe(true)
    })

    it('should return valid: false if outside range', () => {
      expect(validateRange(0, 1, 10).valid).toBe(false)
      expect(validateRange(11, 1, 10).valid).toBe(false)
    })
  })

  describe('validateUrl', () => {
    it('should return valid: true for valid URLs', () => {
      expect(validateUrl('https://stacks.co').valid).toBe(true)
    })

    it('should return valid: false for invalid URLs', () => {
      expect(validateUrl('not-a-url').valid).toBe(false)
    })
  })

  describe('validatePositiveNumber', () => {
    it('should return valid: true for > 0', () => {
      expect(validatePositiveNumber(1).valid).toBe(true)
      expect(validatePositiveNumber(0.1).valid).toBe(true)
    })

    it('should return valid: false for <= 0', () => {
      expect(validatePositiveNumber(0).valid).toBe(false)
      expect(validatePositiveNumber(-1).valid).toBe(false)
    })
  })
})
