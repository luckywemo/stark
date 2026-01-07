import { describe, it, expect } from 'vitest'
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatBPS,
  parseNumber,
  clamp,
  round,
  ceil,
  floor,
  isInRange,
  random
} from './numbers'

describe('number utils', () => {
  describe('formatNumber', () => {
    it('should format number with default decimals', () => {
      expect(formatNumber(1234.567)).toBe('1,234.57')
    })

    it('should format number with specified decimals', () => {
      expect(formatNumber(1234.567, 1)).toBe('1,234.6')
      expect(formatNumber(1234, 0)).toBe('1,234')
    })
  })

  describe('formatCurrency', () => {
    it('should format as USD by default', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentage', () => {
      expect(formatPercentage(50, 100)).toBe('50.00%')
      expect(formatPercentage(1, 3)).toBe('33.33%')
    })

    it('should handle zero total', () => {
      expect(formatPercentage(50, 0)).toBe('0%')
    })
  })

  describe('formatBPS', () => {
    it('should format basis points', () => {
      expect(formatBPS(500)).toBe('5.00%')
      expect(formatBPS(10000)).toBe('100.00%')
    })
  })

  describe('parseNumber', () => {
    it('should parse string with commas', () => {
      expect(parseNumber('1,234.56')).toBe(1234.56)
    })

    it('should handle number input', () => {
      expect(parseNumber(1234.56)).toBe(1234.56)
    })

    it('should handle invalid input', () => {
      expect(parseNumber('abc')).toBe(0)
    })
  })

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 1, 10)).toBe(5)
      expect(clamp(0, 1, 10)).toBe(1)
      expect(clamp(11, 1, 10)).toBe(10)
    })
  })

  describe('round', () => {
    it('should round to specified decimals', () => {
      expect(round(1.234, 2)).toBe(1.23)
      expect(round(1.235, 2)).toBe(1.24)
    })
  })

  describe('floor', () => {
    it('should floor to specified decimals', () => {
      expect(floor(1.239, 2)).toBe(1.23)
    })
  })

  describe('isInRange', () => {
    it('should return true if in range', () => {
      expect(isInRange(5, 1, 10)).toBe(true)
      expect(isInRange(1, 1, 10)).toBe(true)
    })

    it('should return false if out of range', () => {
      expect(isInRange(0, 1, 10)).toBe(false)
    })
  })

  describe('random', () => {
    it('should generate value in range', () => {
      const val = random(1, 10)
      expect(val).toBeGreaterThanOrEqual(1)
      expect(val).toBeLessThanOrEqual(10)
      expect(Number.isInteger(val)).toBe(true)
    })
  })
})
