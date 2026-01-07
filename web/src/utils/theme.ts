/**
 * Application-wide design system tokens including colors, spacing, shadows, and transitions.
 */

/**
 * Color palette for the application.
 */
export const colors = {
  primary: '#64748b',
  primaryDark: '#475569',
  secondary: '#7c3aed',
  secondaryDark: '#6d28d9',
  
  success: '#10b981',
  successLight: '#d1fae5',
  successBorder: '#a7f3d0',
  
  error: '#ef4444',
  errorLight: '#fee2e2',
  errorBorder: '#fecaca',
  
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  warningBorder: '#fde68a',
  
  info: '#3b82f6',
  infoLight: '#dbeafe',
  infoBorder: '#bfdbfe',
  
  text: {
    primary: '#1e293b',
    secondary: '#475569',
    muted: '#94a3b8',
    light: '#f1f5f9',
  },
  
  background: {
    light: '#f8fafc',
    white: '#ffffff',
    dark: '#0f172a',
  },
  
  border: '#e2e8f0',
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const

/**
 * Standard spacing scale based on rem units.
 */
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
} as const

/**
 * Standard border radius values.
 */
export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
} as const

/**
 * Box shadow styles for depth and elevation.
 */
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
} as const

/**
 * Responsive design breakpoints.
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

/**
 * CSS transition duration and easing presets.
 */
export const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
} as const
