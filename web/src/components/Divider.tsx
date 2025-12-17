'use client'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  text?: string
  spacing?: 'sm' | 'md' | 'lg'
}

export function Divider({ 
  orientation = 'horizontal', 
  text,
  spacing = 'md' 
}: DividerProps) {
  const spacingStyles = {
    sm: { margin: '0.5rem 0' },
    md: { margin: '1rem 0' },
    lg: { margin: '2rem 0' },
  }

  if (orientation === 'vertical') {
    return (
      <div
        style={{
          width: '1px',
          height: '100%',
          background: '#e2e8f0',
          ...spacingStyles[spacing],
        }}
      />
    )
  }

  if (text) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          ...spacingStyles[spacing],
        }}
      >
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        <span style={{ 
          padding: '0 1rem', 
          color: '#666', 
          fontSize: '0.85rem' 
        }}>
          {text}
        </span>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100%',
        height: '1px',
        background: '#e2e8f0',
        ...spacingStyles[spacing],
      }}
    />
  )
}



