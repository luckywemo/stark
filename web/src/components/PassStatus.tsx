'use client'

import { formatSTX, formatBlockToTime } from '@/utils/contract-helpers'
import type { PassData, ContractConfig } from '@/types/contract'

interface PassStatusProps {
  passData: PassData | null
  config: ContractConfig | null
  isActive: boolean
  currentBlock?: number
}

export function PassStatus({ passData, config, isActive, currentBlock }: PassStatusProps) {
  if (!passData) {
    return (
      <div className="card">
        <h2>No Pass Found</h2>
        <p>You don't have an active pass. Purchase one to get started!</p>
      </div>
    )
  }

  const blocksRemaining = currentBlock
    ? Math.max(0, passData['expires-at'] - currentBlock)
    : 0
  const timeRemaining = formatBlockToTime(blocksRemaining)

  return (
    <div className="card">
      <h2>Your Pass Status</h2>
      
      <div className="info-grid">
        <div className="info-item">
          <strong>Status</strong>
          {isActive ? (
            <span style={{ color: '#28a745' }}>✅ Active</span>
          ) : (
            <span style={{ color: '#dc3545' }}>❌ Expired</span>
          )}
        </div>
        
        <div className="info-item">
          <strong>Expires At</strong>
          Block {passData['expires-at']}
          {currentBlock && (
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
              {blocksRemaining > 0 ? `~${timeRemaining} remaining` : 'Expired'}
            </div>
          )}
        </div>
        
        <div className="info-item">
          <strong>Total Uses</strong>
          {passData['total-uses']}
        </div>
        
        {passData.referrer && (
          <div className="info-item">
            <strong>Referrer</strong>
            <span style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
              {passData.referrer}
            </span>
          </div>
        )}
      </div>

      {config && passData.referrer && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: '#e7f3ff', 
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          💰 You're getting a {config['referral-discount-bps'] / 100}% discount thanks to your referrer!
        </div>
      )}
    </div>
  )
}

