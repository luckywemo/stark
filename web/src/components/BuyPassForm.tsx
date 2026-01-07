'use client'

import { useState } from 'react'
import { validateReferrer } from '@/lib/validation'
import { truncateAddress } from '@/utils/formatting'

interface BuyPassFormProps {
  onSubmit: (referrer?: string) => void
  loading: boolean
  passPrice?: number
  disabled?: boolean
}

export function BuyPassForm({ onSubmit, loading, passPrice, disabled }: BuyPassFormProps) {
  const [referrer, setReferrer] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validation = validateReferrer(referrer)
    if (!validation.valid) {
      setError(validation.error || 'Invalid referrer address')
      return
    }

    onSubmit(referrer.trim() || undefined)
  }

  const formatPrice = (microStx?: number) => {
    if (!microStx) return '...'
    return (microStx / 1_000_000).toFixed(6)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="referrer" style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          fontWeight: 600,
          color: '#333'
        }}>
          Referrer Address (Optional)
        </label>
        <input
          id="referrer"
          type="text"
          className="input"
          placeholder="ST1... or SP1..."
          value={referrer}
          onChange={(e) => {
            setReferrer(e.target.value)
            setError(null)
          }}
          disabled={loading || disabled}
          style={{ 
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}
        />
        {error && (
          <p style={{ 
            color: '#dc3545', 
            fontSize: '0.85rem', 
            marginTop: '0.5rem',
            margin: 0
          }}>
            {error}
          </p>
        )}
        {referrer && !error && (
          <p style={{ 
            color: '#28a745', 
            fontSize: '0.85rem', 
            marginTop: '0.5rem',
            margin: 0
          }}>
            ✓ Valid address: {truncateAddress(referrer)}
          </p>
        )}
        <p style={{ 
          fontSize: '0.85rem', 
          color: '#666', 
          marginTop: '0.5rem',
          marginBottom: 0
        }}>
          Enter a referrer address to get a 5% discount on your pass purchase.
        </p>
      </div>

      <button 
        type="submit"
        className="btn"
        disabled={loading || disabled}
      >
        {loading ? (
          <>
            <span className="loading"></span>
            Processing...
          </>
        ) : (
          `Buy Pass (${formatPrice(passPrice)} STX)`
        )}
      </button>
    </form>
  )
}




