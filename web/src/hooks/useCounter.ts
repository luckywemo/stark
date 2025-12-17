// Custom hook for counter state

import { useState, useCallback } from 'react'

export function useCounter(initialValue = 0, min?: number, max?: number) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(prev => {
      const next = prev + 1
      return max !== undefined ? Math.min(next, max) : next
    })
  }, [max])

  const decrement = useCallback(() => {
    setCount(prev => {
      const next = prev - 1
      return min !== undefined ? Math.max(next, min) : next
    })
  }, [min])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  const setValue = useCallback((value: number) => {
    let newValue = value
    if (min !== undefined) newValue = Math.max(newValue, min)
    if (max !== undefined) newValue = Math.min(newValue, max)
    setCount(newValue)
  }, [min, max])

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  }
}



