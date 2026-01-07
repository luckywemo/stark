'use client'

import { useState, useRef } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function Select({ options, value, onChange, placeholder = 'Select...', disabled }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useClickOutside(containerRef, () => setIsOpen(false))

  const selectedOption = options.find(opt => opt.value === value)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="input"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1
        }}
      >
        <span style={{ color: selectedOption ? '#333' : '#999' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.25rem',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxHeight: '200px',
            overflow: 'auto'
          }}
        >
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: option.value === value ? '#667eea' : 'transparent',
                color: option.value === value ? 'white' : option.disabled ? '#999' : '#333',
                border: 'none',
                textAlign: 'left',
                cursor: option.disabled ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                opacity: option.disabled ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!option.disabled && option.value !== value) {
                  e.currentTarget.style.background = '#f8f9fa'
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}




