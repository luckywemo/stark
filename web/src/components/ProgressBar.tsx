'use client'

interface ProgressBarProps {
  value: number
  max?: number
  showLabel?: boolean
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ 
  value, 
  max = 100, 
  showLabel = true,
  color = '#667eea',
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeStyles = {
    sm: { height: '4px' },
    md: { height: '8px' },
    lg: { height: '12px' },
  }

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.85rem',
          color: '#666'
        }}>
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          background: '#e2e8f0',
          borderRadius: '9999px',
          overflow: 'hidden',
          ...sizeStyles[size],
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: color,
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}




