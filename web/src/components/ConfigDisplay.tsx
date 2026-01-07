'use client'

import type { ContractConfig } from '@/types/contract'
import { formatSTX, formatBPS } from '@/utils/formatting'

interface ConfigDisplayProps {
  config: ContractConfig | null
  loading?: boolean
}

export function ConfigDisplay({ config, loading }: ConfigDisplayProps) {
  if (loading) {
    return (
      <div className="card">
        <h2>Configuration</h2>
        <p>Loading...</p>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="card">
        <h2>Configuration</h2>
        <p>Unable to load configuration</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>⚙️ Contract Configuration</h2>
      <div className="info-grid" style={{ marginTop: '1rem' }}>
        <div className="info-item">
          <strong>Pass Price</strong>
          {formatSTX(config['pass-price'])} STX
        </div>
        
        <div className="info-item">
          <strong>Usage Fee</strong>
          {formatSTX(config['usage-fee'])} STX
        </div>
        
        <div className="info-item">
          <strong>Fee Split</strong>
          {formatBPS(config['fee-split-bps'])} to owner
          <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            {formatBPS(10000 - config['fee-split-bps'])} to vault
          </div>
        </div>
        
        <div className="info-item">
          <strong>Referral Discount</strong>
          {formatBPS(config['referral-discount-bps'])}
        </div>
        
        <div className="info-item">
          <strong>Pass Duration</strong>
          {config['pass-duration-blocks'].toLocaleString()} blocks
          <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            ~{Math.round(config['pass-duration-blocks'] * 10 / 60)} hours
          </div>
        </div>
        
        {config.owner && (
          <div className="info-item">
            <strong>Owner</strong>
            <span style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
              {config.owner}
            </span>
          </div>
        )}
        
        {config['community-vault'] && (
          <div className="info-item">
            <strong>Community Vault</strong>
            <span style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
              {config['community-vault']}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}




