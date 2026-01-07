'use client'

import { useState, useEffect } from 'react'
import { getApiUrl } from '@/utils/contract-helpers'

export function NetworkStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const apiUrl = getApiUrl()
        const response = await fetch(`${apiUrl}/v2/info`, {
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        })
        
        if (response.ok) {
          setStatus('online')
        } else {
          setStatus('offline')
        }
      } catch (error) {
        setStatus('offline')
      }
      
      setLastCheck(new Date())
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const statusColors = {
    checking: '#ffc107',
    online: '#28a745',
    offline: '#dc3545'
  }

  const statusText = {
    checking: 'Checking...',
    online: 'Online',
    offline: 'Offline'
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '6px',
      fontSize: '0.85rem'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: statusColors[status],
        animation: status === 'checking' ? 'pulse 1.5s ease-in-out infinite' : 'none'
      }} />
      <span style={{ color: 'white' }}>
        {statusText[status]}
      </span>
      {lastCheck && status === 'online' && (
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
          {lastCheck.toLocaleTimeString()}
        </span>
      )}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}




