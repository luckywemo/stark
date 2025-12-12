// API utility functions

import { getApiUrl } from './contract-helpers'
import type { NetworkError } from './errors'

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

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

export async function getTransactions(
  address: string,
  limit = 10
): Promise<ApiResponse<any>> {
  return apiRequest(`/extended/v1/address/${address}/transactions?limit=${limit}`)
}

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

