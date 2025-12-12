'use client'

import { formatSTX } from '@/utils/formatting'

interface PriceDisplayProps {
  amount: number
  label?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function PriceDisplay({ 
  amount, 
  label = 'Price',
  size = 'md',
  showLabel = true 
}: PriceDisplayProps) {
  const sizeStyles = {
    sm: { fontSize: '0.9rem', fontWeight: 500 },
    md: { fontSize: '1.1rem', fontWeight: 600 },
    lg: { fontSize: '1.5rem', fontWeight: 700 }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    }}>
      {showLabel && (
        <span style={{
          fontSize: '0.85rem',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {label}
        </span>
      )}
      <span style={{
        ...sizeStyles[size],
        color: '#667eea',
        fontFamily: 'monospace'
      }}>
        {formatSTX(amount)} STX
      </span>
    </div>
  )
}

