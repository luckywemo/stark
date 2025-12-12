'use client'

import { useState, useEffect } from 'react'
import { formatRelativeTime } from '@/utils/formatting'

interface PassExpiryCountdownProps {
  expiresAt: number
  currentBlock?: number
}

export function PassExpiryCountdown({ expiresAt, currentBlock }: PassExpiryCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('')

  useEffect(() => {
    if (!currentBlock) {
      setTimeRemaining('Loading...')
      return
    }

    const updateCountdown = () => {
      const blocksRemaining = Math.max(0, expiresAt - currentBlock)
      
      if (blocksRemaining === 0) {
        setTimeRemaining('Expired')
        return
      }

      // Approximate: 1 block = 10 minutes
      const minutesRemaining = blocksRemaining * 10
      const hoursRemaining = Math.floor(minutesRemaining / 60)
      const daysRemaining = Math.floor(hoursRemaining / 24)

      if (daysRemaining > 0) {
        setTimeRemaining(`${daysRemaining}d ${hoursRemaining % 24}h`)
      } else if (hoursRemaining > 0) {
        setTimeRemaining(`${hoursRemaining}h ${minutesRemaining % 60}m`)
      } else {
        setTimeRemaining(`${minutesRemaining}m`)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [expiresAt, currentBlock])

  const isExpiringSoon = currentBlock && expiresAt - currentBlock < 10 // Less than 10 blocks

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: isExpiringSoon ? '#fff3cd' : '#d1ecf1',
      borderRadius: '6px',
      border: `1px solid ${isExpiringSoon ? '#ffeaa7' : '#bee5eb'}`,
      fontSize: '0.9rem',
      fontWeight: 600,
      color: isExpiringSoon ? '#856404' : '#0c5460'
    }}>
      <span>{isExpiringSoon ? '⚠️' : '⏰'}</span>
      <span>{timeRemaining}</span>
      {isExpiringSoon && <span style={{ fontSize: '0.85rem' }}>Expiring soon!</span>}
    </div>
  )
}

