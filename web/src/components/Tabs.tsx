'use client'

import { useState, ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onTabChange?: (tabId: string) => void
}

export function Tabs({ tabs, defaultTab, onTabChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div>
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e2e8f0',
        marginBottom: '1.5rem'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
              color: activeTab === tab.id ? '#667eea' : '#666',
              fontWeight: activeTab === tab.id ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-2px'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTabContent}
      </div>
    </div>
  )
}



