'use client'

import { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  onClose?: () => void
}

export function Alert({ children, type = 'info', title, onClose }: AlertProps) {
  const styles = {
    info: {
      background: '#d1ecf1',
      border: '1px solid #bee5eb',
      color: '#0c5460',
    },
    success: {
      background: '#d4edda',
      border: '1px solid #c3e6cb',
      color: '#155724',
    },
    warning: {
      background: '#fff3cd',
      border: '1px solid #ffeaa7',
      color: '#856404',
    },
    error: {
      background: '#f8d7da',
      border: '1px solid #f5c6cb',
      color: '#721c24',
    },
  }

  return (
    <div
      style={{
        ...styles[type],
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          {title && (
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              {title}
            </div>
          )}
          <div>{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'inherit',
              opacity: 0.7,
              padding: '0 0.5rem',
              marginLeft: '1rem',
              lineHeight: 1
            }}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

