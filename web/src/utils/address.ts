// Address utility functions

export function isValidStacksAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  
  // Stacks addresses start with ST or SP and are 39 characters after prefix
  const stacksAddressRegex = /^(ST|SP)[0-9A-Z]{38}$/
  return stacksAddressRegex.test(address)
}

export function isValidContractAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  
  // Contract addresses format: ST...contract-name or SP...contract-name
  const contractAddressRegex = /^(ST|SP)[0-9A-Z]{38}\.[a-z0-9-]+$/
  return contractAddressRegex.test(address)
}

export function truncateAddress(
  address: string,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return ''
  if (address.length <= startChars + endChars) return address
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

export function formatAddress(address: string, length: 'short' | 'medium' | 'long' = 'short'): string {
  const formats = {
    short: { start: 4, end: 4 },
    medium: { start: 6, end: 6 },
    long: { start: 10, end: 10 }
  }
  
  const { start, end } = formats[length]
  return truncateAddress(address, start, end)
}

export function getContractParts(contractAddress: string): { address: string; name: string } | null {
  if (!isValidContractAddress(contractAddress)) return null
  
  const parts = contractAddress.split('.')
  if (parts.length !== 2) return null
  
  return {
    address: parts[0],
    name: parts[1]
  }
}

export function isPrincipal(address: string): boolean {
  return isValidStacksAddress(address) || isValidContractAddress(address)
}

