/**
 * Error handling utilities for contract, validation, and network errors.
 */

/**
 * Error class for Stacks smart contract related failures.
 */
export class ContractError extends Error {
  constructor(
    message: string,
    public code?: string | number,
    public originalError?: any
  ) {
    super(message)
    this.name = 'ContractError'
  }
}

/**
 * Error class for form or data validation failures.
 */
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Error class for network or API related failures.
 */
export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

/**
 * Parses a Clarity error response and returns a user-friendly message.
 * @param error The raw error object or string from Clarity.
 * @returns A user-friendly error message string.
 */
export function parseClarityError(error: any): string {
  if (!error) return 'Unknown error'

  const errorString = typeof error === 'string' ? error : JSON.stringify(error)
  
  // Parse Clarity error codes
  const errorCodeMatch = errorString.match(/u(\d+)/)
  if (errorCodeMatch) {
    const code = parseInt(errorCodeMatch[1])
    const errorMessages: Record<number, string> = {
      100: 'Owner already set',
      101: 'Owner not set',
      102: 'Not owner',
      200: 'Pass not found',
      201: 'Pass expired',
      300: 'Invalid amount',
      400: 'Invalid referrer',
    }
    
    return errorMessages[code] || `Error code: ${code}`
  }

  // Try to extract readable message
  if (errorString.includes('insufficient funds')) {
    return 'Insufficient STX balance'
  }
  
  if (errorString.includes('tx-sender')) {
    return 'Transaction sender error'
  }

  return errorString
}

/**
 * Global error handler to convert various error types into human-readable messages.
 * @param error The error object to handle.
 * @returns A readable error message string.
 */
export function handleError(error: unknown): string {
  if (error instanceof ContractError) {
    return error.message
  }
  
  if (error instanceof ValidationError) {
    return error.message
  }
  
  if (error instanceof NetworkError) {
    return `Network error: ${error.message}`
  }
  
  if (error instanceof Error) {
    return parseClarityError(error.message)
  }
  
  return 'An unexpected error occurred'
}
