/**
 * API utility functions for interacting with Stacks nodes and internal services.
 */

import { getApiUrl } from './contract-helpers'

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

/**
 * Generic API request wrapper using fetch.
 * @param endpoint The API endpoint path.
 * @param options Standard fetch request options.
 * @returns An ApiResponse object with data or error.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const apiUrl = getApiUrl()
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        status: response.status,
        error: data.error || `HTTP ${response.status}`,
      }
    }

    return {
      status: response.status,
      data,
    }
  } catch (error) {
    return {
      status: 0,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

/**
 * Calls a read-only function on a Stacks smart contract.
 * @param contractAddress The full contract principal.
 * @param functionName The name of the function to call.
 * @param args Array of arguments for the function.
 * @param sender The sender's address for context.
 * @returns An ApiResponse with the call result.
 */
export async function callReadOnlyContract(
  contractAddress: string,
  functionName: string,
  args: any[],
  sender: string
): Promise<ApiResponse<any>> {
  return apiRequest(`/v2/contracts/call-read/${contractAddress}/${functionName}`, {
    method: 'POST',
    body: JSON.stringify({
      sender,
      arguments: args,
    }),
  })
}

/**
 * Fetches transactions for a specific Stacks address.
 * @param address The Stacks address to query.
 * @param limit The maximum number of transactions to return.
 * @returns An ApiResponse with the transactions list.
 */
export async function getTransactions(
  address: string,
  limit = 10
): Promise<ApiResponse<any>> {
  return apiRequest(`/extended/v1/address/${address}/transactions?limit=${limit}`)
}

/**
 * Fetches the current block height from the Stacks node.
 * @returns An ApiResponse with the current tip height.
 */
export async function getBlockHeight(): Promise<ApiResponse<number>> {
  const response = await apiRequest<any>('/v2/info')
  
  if (response.data?.stacks_tip_height) {
    return {
      status: response.status,
      data: response.data.stacks_tip_height,
    }
  }

  return {
    status: response.status,
    error: 'Could not fetch block height',
  }
}
