// Custom hook for focus state

import { useState, useRef, useEffect } from 'react'

export function useFocus<T extends HTMLElement = HTMLInputElement>(): [React.RefObject<T>, boolean] {
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    return () => {
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }, [])

  return [ref, isFocused]
}



