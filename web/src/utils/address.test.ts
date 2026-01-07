import { describe, it, expect } from 'vitest'
import {
  isValidStacksAddress,
  isValidContractAddress,
  truncateAddress,
  formatAddress,
  getContractParts,
  isPrincipal
} from './address'

const MOCK_ADDR = 'SP2J9XB6CNM9ANT6P6P6E8Q8N40V3P831P7S6J6C'
const MOCK_ADDR_TEST = 'ST2J9XB6CNM9ANT6P6P6E8Q8N40V3P831P7S6J6C'
const MOCK_CONTRACT = 'SP2J9XB6CNM9ANT6P6P6E8Q8N40V3P831P7S6J6C.pass-manager'

describe('address utils', () => {
  describe('isValidStacksAddress', () => {
    it('should return true for valid SP address', () => {
      expect(isValidStacksAddress(MOCK_ADDR)).toBe(true)
    })

    it('should return true for valid ST address', () => {
      expect(isValidStacksAddress(MOCK_ADDR_TEST)).toBe(true)
    })

    it('should return false for invalid address', () => {
      expect(isValidStacksAddress('invalid')).toBe(false)
      expect(isValidStacksAddress(MOCK_ADDR.slice(0, -1))).toBe(false)
    })
  })

  describe('isValidContractAddress', () => {
    it('should return true for valid contract address', () => {
      expect(isValidContractAddress(MOCK_CONTRACT)).toBe(true)
    })

    it('should return false for standard address', () => {
      expect(isValidContractAddress(MOCK_ADDR)).toBe(false)
    })

    it('should return false for malformed contract name', () => {
      expect(isValidContractAddress(MOCK_ADDR + '.')).toBe(false)
      expect(isValidContractAddress(MOCK_ADDR + '.Invalid_Name')).toBe(false)
    })
  })

  describe('truncateAddress', () => {
    it('should truncate according to parameters', () => {
      expect(truncateAddress(MOCK_ADDR, 4, 4)).toBe('SP2J...6J6C')
    })

    it('should return original if short', () => {
      expect(truncateAddress('abc', 10, 10)).toBe('abc')
    })
  })

  describe('formatAddress', () => {
    it('should use short profile by default', () => {
      expect(formatAddress(MOCK_ADDR)).toBe('SP2J...6J6C')
    })

    it('should use medium profile', () => {
      expect(formatAddress(MOCK_ADDR, 'medium')).toBe('SP2J9X...7S6J6C')
    })
  })

  describe('getContractParts', () => {
    it('should return parts for valid contract', () => {
      const parts = getContractParts(MOCK_CONTRACT)
      expect(parts).toEqual({
        address: MOCK_ADDR,
        name: 'pass-manager'
      })
    })

    it('should return null for invalid contract', () => {
      expect(getContractParts(MOCK_ADDR)).toBeNull()
    })
  })

  describe('isPrincipal', () => {
    it('should return true for both address types', () => {
      expect(isPrincipal(MOCK_ADDR)).toBe(true)
      expect(isPrincipal(MOCK_CONTRACT)).toBe(true)
    })

    it('should return false for non-principal strings', () => {
      expect(isPrincipal('not-a-principal')).toBe(false)
    })
  })
})
