'use client'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  rounded = false 
}: BadgeProps) {
  const variantStyles = {
    default: {
      background: '#e2e8f0',
      color: '#333',
    },
    success: {
      background: '#d4edda',
      color: '#155724',
    },
    warning: {
      background: '#fff3cd',
      color: '#856404',
    },
    error: {
      background: '#f8d7da',
      color: '#721c24',
    },
    info: {
      background: '#d1ecf1',
      color: '#0c5460',
    },
  }

  const sizeStyles = {
    sm: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
    },
    md: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.85rem',
    },
    lg: {
      padding: '0.5rem 1rem',
      fontSize: '1rem',
    },
  }

  return (
    <span
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 600,
        borderRadius: rounded ? '9999px' : '4px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}




