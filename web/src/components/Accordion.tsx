'use client'

import { useState, ReactNode } from 'react'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
}

export function Accordion({ items, allowMultiple = false, defaultOpen = [] }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(id)
      }
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map(item => {
        const isOpen = openItems.has(item.id)
        return (
          <div
            key={item.id}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 600,
                color: '#333',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <span>{item.title}</span>
              <span
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  fontSize: '1.2rem'
                }}
              >
                ▼
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '1rem',
                  borderTop: '1px solid #e2e8f0',
                  background: '#f8f9fa'
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

