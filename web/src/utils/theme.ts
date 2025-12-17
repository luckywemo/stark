// Theme utilities and color constants

export const colors = {
  primary: '#667eea',
  primaryDark: '#5568d3',
  secondary: '#764ba2',
  secondaryDark: '#633a82',
  
  success: '#28a745',
  successLight: '#d4edda',
  successBorder: '#c3e6cb',
  
  error: '#dc3545',
  errorLight: '#f8d7da',
  errorBorder: '#f5c6cb',
  
  warning: '#ffc107',
  warningLight: '#fff3cd',
  warningBorder: '#ffeaa7',
  
  info: '#17a2b8',
  infoLight: '#d1ecf1',
  infoBorder: '#bee5eb',
  
  text: {
    primary: '#333',
    secondary: '#666',
    muted: '#999',
    light: '#ccc',
  },
  
  background: {
    light: '#f8f9fa',
    white: '#ffffff',
    dark: '#2d3748',
  },
  
  border: '#e2e8f0',
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
} as const

export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

export const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
} as const



