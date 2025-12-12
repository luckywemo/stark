'use client'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

export function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps) {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  }

  const borderMap = {
    small: '3px',
    medium: '4px',
    large: '6px'
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `${borderMap[size]} solid rgba(102, 126, 234, 0.3)`,
          borderTop: `${borderMap[size]} solid #667eea`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {message && (
        <p style={{ 
          marginTop: '1rem', 
          color: '#666',
          fontSize: '0.9rem'
        }}>
          {message}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

