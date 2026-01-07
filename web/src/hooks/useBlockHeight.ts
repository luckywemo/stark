// Custom hook for fetching current block height

import { useState, useEffect } from 'react'
import { getBlockHeight } from '@/utils/api'

export function useBlockHeight(refreshInterval = 60000) {
  const [blockHeight, setBlockHeight] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getBlockHeight()
        
        if (response.data) {
          setBlockHeight(response.data)
        } else {
          setError(response.error || 'Failed to fetch block height')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchBlockHeight()
    
    const interval = setInterval(fetchBlockHeight, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

  return { blockHeight, loading, error }
}




