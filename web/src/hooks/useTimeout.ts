// Custom hook for timeout execution

import { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current?.()
    }

    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}

