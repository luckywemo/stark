'use client'

import { useBlockHeight } from '@/hooks/useBlockHeight'
import { formatBlockHeight } from '@/utils/formatting'

export function BlockHeightDisplay() {
  const { blockHeight, loading, error } = useBlockHeight()

  if (loading) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '6px',
        fontSize: '0.85rem',
        color: 'white'
      }}>
        <span>⏳</span>
        <span>Loading block...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(248, 215, 218, 0.8)',
        borderRadius: '6px',
        fontSize: '0.85rem',
        color: '#721c24'
      }}>
        <span>⚠️</span>
        <span>Network error</span>
      </div>
    )
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '6px',
      fontSize: '0.85rem',
      color: 'white'
    }}>
      <span>📦</span>
      <span>Block: {blockHeight ? formatBlockHeight(blockHeight) : 'N/A'}</span>
    </div>
  )
}




