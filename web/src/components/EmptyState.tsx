'use client'

import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: string | ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem 2rem',
      color: '#666'
    }}>
      {icon && (
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          opacity: 0.5
        }}>
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
      <h3 style={{
        margin: '0 0 0.5rem 0',
        color: '#333',
        fontSize: '1.25rem',
        fontWeight: 600
      }}>
        {title}
      </h3>
      {description && (
        <p style={{
          margin: '0 0 1.5rem 0',
          color: '#666',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {description}
        </p>
      )}
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}




