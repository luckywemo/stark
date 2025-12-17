'use client'

import { useState } from 'react'

interface NotificationBannerProps {
  message: string
  type?: 'info' | 'warning' | 'success' | 'error'
  dismissible?: boolean
  onDismiss?: () => void
}

export function NotificationBanner({
  message,
  type = 'info',
  dismissible = true,
  onDismiss
}: NotificationBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const styles = {
    info: {
      background: '#d1ecf1',
      border: '1px solid #bee5eb',
      color: '#0c5460'
    },
    warning: {
      background: '#fff3cd',
      border: '1px solid #ffeaa7',
      color: '#856404'
    },
    success: {
      background: '#d4edda',
      border: '1px solid #c3e6cb',
      color: '#155724'
    },
    error: {
      background: '#f8d7da',
      border: '1px solid #f5c6cb',
      color: '#721c24'
    }
  }

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div style={{
      ...styles[type],
      padding: '1rem',
      borderRadius: '6px',
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <span>{message}</span>
      {dismissible && (
        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.7,
            padding: '0 0.5rem',
            lineHeight: 1
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  )
}



