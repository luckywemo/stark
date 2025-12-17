'use client'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: string
  trend?: {
    value: number
    label: string
  }
}

export function StatsCard({ title, value, subtitle, icon, trend }: StatsCardProps) {
  return (
    <div className="info-item" style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}>
      {icon && (
        <div style={{ 
          fontSize: '2rem', 
          marginBottom: '0.5rem' 
        }}>
          {icon}
        </div>
      )}
      <strong style={{ 
        display: 'block',
        color: '#667eea',
        fontSize: '0.9rem',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </strong>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '0.25rem'
      }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ 
          fontSize: '0.85rem', 
          color: '#666',
          marginTop: '0.5rem'
        }}>
          {subtitle}
        </div>
      )}
      {trend && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.5rem',
          background: trend.value >= 0 ? '#d4edda' : '#f8d7da',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: trend.value >= 0 ? '#155724' : '#721c24'
        }}>
          {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
        </div>
      )}
    </div>
  )
}



