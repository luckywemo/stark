'use client'

import { useState, useEffect } from 'react'
import { formatSTX } from '@/utils/contract-helpers'

interface AnalyticsProps {
  contractAddress: string
}

export function Analytics({ contractAddress }: AnalyticsProps) {
  const [stats, setStats] = useState({
    totalPasses: 0,
    activePasses: 0,
    totalRevenue: 0,
    loading: true
  })

  useEffect(() => {
    // Placeholder for analytics fetching
    // In production, this would call the analytics contract
    const fetchStats = async () => {
      try {
        // TODO: Implement actual analytics contract calls
        setStats({
          totalPasses: 0,
          activePasses: 0,
          totalRevenue: 0,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching analytics:', error)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }

    fetchStats()
  }, [contractAddress])

  if (stats.loading) {
    return (
      <div className="card">
        <h2>Analytics</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>📊 Platform Analytics</h2>
      <div className="info-grid">
        <div className="info-item">
          <strong>Total Passes Sold</strong>
          {stats.totalPasses}
        </div>
        <div className="info-item">
          <strong>Active Passes</strong>
          {stats.activePasses}
        </div>
        <div className="info-item">
          <strong>Total Revenue</strong>
          {formatSTX(stats.totalRevenue)} STX
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
        Analytics powered by the Pass Manager analytics contract
      </p>
    </div>
  )
}

