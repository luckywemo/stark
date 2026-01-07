'use client'

import { useState } from 'react'
import { useConnect } from '@stacks/connect-react'

export function ReferralLink() {
  const { isSignedIn, userSession } = useConnect()
  const [copied, setCopied] = useState(false)
  const userAddress = userSession?.loadUserData()?.profile?.stxAddress?.testnet

  if (!isSignedIn || !userAddress) {
    return null
  }

  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}?ref=${userAddress}`
    : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="card" style={{
      background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
      border: '2px solid #667eea'
    }}>
      <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>
        💰 Earn with Referrals
      </h2>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Share your referral link and help others get a 5% discount on their pass purchase.
      </p>
      
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <input
          type="text"
          readOnly
          value={referralUrl}
          className="input"
          style={{
            flex: 1,
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            background: 'white'
          }}
        />
        <button
          onClick={handleCopy}
          className="btn btn-secondary"
          style={{ whiteSpace: 'nowrap' }}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>

      <div style={{
        padding: '0.75rem',
        background: 'rgba(102, 126, 234, 0.1)',
        borderRadius: '6px',
        fontSize: '0.85rem',
        color: '#667eea'
      }}>
        <strong>Your address:</strong> {userAddress}
      </div>
    </div>
  )
}




