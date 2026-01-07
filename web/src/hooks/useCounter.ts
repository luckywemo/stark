/**
 * Custom hook for managing a counter state with optional constraints.
 * @param initialValue The initial value of the counter (default 0).
 * @param min Optional minimum value constraint.
 * @param max Optional maximum value constraint.
 * @returns An object containing the counter state and manipulation functions.
 */

import { useState, useCallback } from 'react'

export function useCounter(initialValue = 0, min?: number, max?: number) {
  const [count, setCount] = useState(initialValue)

  /**
   * Increments the counter value, respecting the maximum constraint.
   */
  const increment = useCallback(() => {
    setCount(prev => {
      const next = prev + 1
      return max !== undefined ? Math.min(next, max) : next
    })
  }, [max])

  /**
   * Decrements the counter value, respecting the minimum constraint.
   */
  const decrement = useCallback(() => {
    setCount(prev => {
      const next = prev - 1
      return min !== undefined ? Math.max(next, min) : next
    })
  }, [min])

  /**
   * Resets the counter to its initial value.
   */
  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  /**
   * Sets the counter to a specific value, respecting constraints.
   * @param value The new value to set.
   */
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
