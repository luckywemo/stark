'use client'

import { StatsCard } from './StatsCard'
import { formatSTX } from '@/utils/formatting'

interface MetricsProps {
  totalPasses?: number
  activePasses?: number
  totalRevenue?: number
  totalUses?: number
}

export function Metrics({ 
  totalPasses = 0, 
  activePasses = 0, 
  totalRevenue = 0,
  totalUses = 0 
}: MetricsProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>📊 Platform Metrics</h2>
      <div className="info-grid" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        <StatsCard
          title="Total Passes Sold"
          value={totalPasses.toLocaleString()}
          icon="🎫"
          subtitle="All time purchases"
        />
        
        <StatsCard
          title="Active Passes"
          value={activePasses.toLocaleString()}
          icon="✅"
          subtitle="Currently valid passes"
        />
        
        <StatsCard
          title="Total Revenue"
          value={formatSTX(totalRevenue)}
          icon="💰"
          subtitle="STX generated"
        />
        
        <StatsCard
          title="Total Uses"
          value={totalUses.toLocaleString()}
          icon="🔔"
          subtitle="Pass activations"
        />
      </div>
    </div>
  )
}




