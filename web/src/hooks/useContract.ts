// Custom React hook for contract interactions
import { useState, useEffect, useCallback } from 'react'
import { useConnect } from '@stacks/connect-react'
import { getNetwork } from '@/utils/contract-helpers'
import type { PassData, ContractConfig } from '@/types/contract'
import { fetchPassData, fetchConfig, checkPassActive } from '@/utils/contract-helpers'

interface UseContractOptions {
  contractAddress: string
  userAddress?: string
}

export function useContract({ contractAddress, userAddress }: UseContractOptions) {
  const { doContractCall } = useConnect()
  const [passData, setPassData] = useState<PassData | null>(null)
  const [config, setConfig] = useState<ContractConfig | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPassData = useCallback(async () => {
    if (!userAddress) return
    
    setLoading(true)
    try {
      const [pass, active] = await Promise.all([
        fetchPassData(contractAddress, userAddress),
        checkPassActive(contractAddress, userAddress)
      ])
      setPassData(pass)
      setIsActive(active)
    } catch (err: any) {
      setError(err.message || 'Failed to load pass data')
    } finally {
      setLoading(false)
    }
  }, [contractAddress, userAddress])

  const loadConfig = useCallback(async () => {
    setLoading(true)
    try {
      const cfg = await fetchConfig(contractAddress)
      setConfig(cfg)
    } catch (err: any) {
      setError(err.message || 'Failed to load config')
    } finally {
      setLoading(false)
    }
  }, [contractAddress])

  useEffect(() => {
    loadConfig()
  }, [loadConfig])

  useEffect(() => {
    if (userAddress) {
      loadPassData()
    }
  }, [userAddress, loadPassData])

  const buyPass = useCallback(async (referrer?: string) => {
    if (!userAddress) {
      setError('Wallet not connected')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await doContractCall({
        contractAddress: contractAddress.split('.')[0],
        contractName: contractAddress.split('.')[1],
        functionName: 'buy-pass',
        functionArgs: referrer 
          ? [{ type: 'some', value: { type: 'principal', value: referrer } }]
          : [{ type: 'none' }],
        network: getNetwork(),
        onFinish: () => {
          loadPassData()
          setLoading(false)
        },
        onCancel: () => {
          setLoading(false)
        }
      })
    } catch (err: any) {
      setError(err.message || 'Failed to buy pass')
      setLoading(false)
    }
  }, [userAddress, contractAddress, doContractCall, loadPassData])

  const renewPass = useCallback(async () => {
    if (!userAddress) {
      setError('Wallet not connected')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await doContractCall({
        contractAddress: contractAddress.split('.')[0],
        contractName: contractAddress.split('.')[1],
        functionName: 'renew-pass',
        functionArgs: [],
        network: getNetwork(),
        onFinish: () => {
          loadPassData()
          setLoading(false)
        },
        onCancel: () => {
          setLoading(false)
        }
      })
    } catch (err: any) {
      setError(err.message || 'Failed to renew pass')
      setLoading(false)
    }
  }, [userAddress, contractAddress, doContractCall, loadPassData])

  const usePass = useCallback(async () => {
    if (!userAddress) {
      setError('Wallet not connected')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await doContractCall({
        contractAddress: contractAddress.split('.')[0],
        contractName: contractAddress.split('.')[1],
        functionName: 'use-pass',
        functionArgs: [],
        network: getNetwork(),
        onFinish: () => {
          loadPassData()
          setLoading(false)
        },
        onCancel: () => {
          setLoading(false)
        }
      })
    } catch (err: any) {
      setError(err.message || 'Failed to use pass')
      setLoading(false)
    }
  }, [userAddress, contractAddress, doContractCall, loadPassData])

  return {
    passData,
    config,
    isActive,
    loading,
    error,
    buyPass,
    renewPass,
    usePass,
    refresh: loadPassData
  }
}

