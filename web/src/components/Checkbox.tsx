'use client'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Checkbox({ checked, onChange, label, disabled, size = 'md' }: CheckboxProps) {
  const sizeStyles = {
    sm: { width: '16px', height: '16px' },
    md: { width: '20px', height: '20px' },
    lg: { width: '24px', height: '24px' },
  }

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        userSelect: 'none'
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => !disabled && onChange(e.target.checked)}
        disabled={disabled}
        style={{
          ...sizeStyles[size],
          cursor: disabled ? 'not-allowed' : 'pointer',
          accentColor: '#667eea'
        }}
      />
      {label && (
        <span style={{ fontSize: size === 'sm' ? '0.85rem' : size === 'lg' ? '1.1rem' : '1rem' }}>
          {label}
        </span>
      )}
    </label>
  )
}




