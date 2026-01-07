'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  footer?: ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export function Card({ children, title, footer, hover = false, padding = 'md' }: CardProps) {
  const paddingStyles = {
    none: { padding: 0 },
    sm: { padding: '1rem' },
    md: { padding: '1.5rem' },
    lg: { padding: '2rem' },
  }

  return (
    <div
      className="card"
      style={{
        ...paddingStyles[padding],
        transition: hover ? 'transform 0.2s, box-shadow 0.2s' : 'none',
        cursor: hover ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)'
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      {title && (
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#667eea' }}>
          {title}
        </h2>
      )}
      <div>{children}</div>
      {footer && (
        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          {footer}
        </div>
      )}
    </div>
  )
}




