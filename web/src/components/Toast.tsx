'use client'

import { useEffect } from 'react'
import type { Toast as ToastType } from '@/hooks/useToast'

interface ToastProps {
  toast: ToastType
  onRemove: (id: string) => void
}

export function Toast({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id)
      }, toast.duration)

      return () => clearTimeout(timer)
    }
  }, [toast.id, toast.duration, onRemove])

  const bgColor = {
    success: '#d4edda',
    error: '#f8d7da',
    info: '#d1ecf1',
    warning: '#fff3cd'
  }

  const textColor = {
    success: '#155724',
    error: '#721c24',
    info: '#0c5460',
    warning: '#856404'
  }

  const borderColor = {
    success: '#c3e6cb',
    error: '#f5c6cb',
    info: '#bee5eb',
    warning: '#ffeaa7'
  }

  return (
    <div
      style={{
        background: bgColor[toast.type],
        color: textColor[toast.type],
        border: `1px solid ${borderColor[toast.type]}`,
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '500px'
      }}
    >
      <span>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: textColor[toast.type],
          cursor: 'pointer',
          fontSize: '1.2rem',
          padding: '0 0.5rem',
          marginLeft: '1rem'
        }}
      >
        ×
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastType[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}



