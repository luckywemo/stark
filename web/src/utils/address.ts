/**
 * Stacks and contract address utility functions.
 */

/**
 * Validates if a string is a valid Stacks address (SP or ST prefix).
 * @param address The address string to validate.
 * @returns True if the address is valid.
 */
export function isValidStacksAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  
  // Stacks addresses start with ST or SP and are 39 characters after prefix
  const stacksAddressRegex = /^(ST|SP)[0-9A-Z]{38}$/
  return stacksAddressRegex.test(address)
}

/**
 * Validates if a string is a valid Stacks contract address (Principal.contract-name).
 * @param address The address string to validate.
 * @returns True if it's a valid contract address.
 */
export function isValidContractAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  
  // Contract addresses format: ST...contract-name or SP...contract-name
  const contractAddressRegex = /^(ST|SP)[0-9A-Z]{38}\.[a-z0-9-]+$/
  return contractAddressRegex.test(address)
}

/**
 * Truncates a Stacks address for display (e.g., SP12...3456).
 * @param address The full address string.
 * @param startChars Number of characters to keep at the start.
 * @param endChars Number of characters to keep at the end.
 * @returns The truncated address string.
 */
export function truncateAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return ''
  if (address.length <= startChars + endChars) return address
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

/**
 * Formats an address with predefined length profiles.
 * @param address The address string.
 * @param length The profile to use ('short', 'medium', or 'long').
 * @returns The formatted address string.
 */
export function formatAddress(address: string, length: 'short' | 'medium' | 'long' = 'short'): string {
  const formats = {
    short: { start: 4, end: 4 },
    medium: { start: 6, end: 6 },
    long: { start: 10, end: 10 }
  }
  
  const { start, end } = formats[length]
  return truncateAddress(address, start, end)
}

/**
 * Splits a contract principal into its address and contract name parts.
 * @param contractAddress The full contract principal string.
 * @returns An object with address and name, or null if invalid.
 */
export function getContractParts(contractAddress: string): { address: string; name: string } | null {
  if (!isValidContractAddress(contractAddress)) return null
  
  const parts = contractAddress.split('.')
  if (parts.length !== 2) return null
  
  return {
    address: parts[0],
    name: parts[1]
  }
}

/**
 * Checks if a string is a valid Stacks principal (standard or contract).
 * @param address The address string to check.
 * @returns True if it's a valid principal.
 */
export function isPrincipal(address: string): boolean {
  return isValidStacksAddress(address) || isValidContractAddress(address)
}
