// Validation utility functions

export const isValidStacksAddress = (address: string): boolean => {
  if (!address) return false
  
  // Stacks addresses start with ST or SP
  const stacksAddressRegex = /^(ST|SP)[0-9A-Z]{38}$/
  return stacksAddressRegex.test(address)
}

export const isValidContractAddress = (address: string): boolean => {
  if (!address) return false
  
  // Contract addresses format: ST...contract-name or SP...contract-name
  const contractAddressRegex = /^(ST|SP)[0-9A-Z]{38}\.[a-z0-9-]+$/
  return contractAddressRegex.test(address)
}

export const validateSTXAmount = (amount: string): { valid: boolean; error?: string } => {
  if (!amount || amount.trim() === '') {
    return { valid: false, error: 'Amount is required' }
  }

  const num = parseFloat(amount)
  
  if (isNaN(num)) {
    return { valid: false, error: 'Invalid number format' }
  }

  if (num < 0) {
    return { valid: false, error: 'Amount must be positive' }
  }

  if (num > 1000000) {
    return { valid: false, error: 'Amount is too large' }
  }

  return { valid: true }
}

export const validateReferrer = (referrer: string): { valid: boolean; error?: string } => {
  if (!referrer || referrer.trim() === '') {
    return { valid: true } // Optional field
  }

  if (!isValidStacksAddress(referrer.trim())) {
    return { valid: false, error: 'Invalid Stacks address format' }
  }

  return { valid: true }
}

export const validateBasisPoints = (bps: number): { valid: boolean; error?: string } => {
  if (bps < 0) {
    return { valid: false, error: 'Basis points cannot be negative' }
  }

  if (bps > 10000) {
    return { valid: false, error: 'Basis points cannot exceed 10000 (100%)' }
  }

  return { valid: true }
}

export const validateBlockHeight = (blocks: number): { valid: boolean; error?: string } => {
  if (blocks < 1) {
    return { valid: false, error: 'Block height must be at least 1' }
  }

  if (blocks > 1000000) {
    return { valid: false, error: 'Block height is too large' }
  }

  return { valid: true }
}




