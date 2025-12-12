'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
  copiedLabel?: string
  className?: string
}

export function CopyButton({ 
  text, 
  label = 'Copy', 
  copiedLabel = 'Copied!',
  className = 'btn btn-secondary'
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={className}
      style={{ whiteSpace: 'nowrap' }}
    >
      {copied ? (
        <>
          ✓ {copiedLabel}
        </>
      ) : (
        label
      )}
    </button>
  )
}

