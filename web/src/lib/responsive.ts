// Responsive design utilities

import { breakpoints } from '@/utils/theme'

export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  mobile: `(max-width: ${parseInt(breakpoints.md) - 1}px)`,
  tablet: `(min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  desktop: `(min-width: ${breakpoints.lg})`,
} as const

export function isMobile(width: number): boolean {
  return width < parseInt(breakpoints.md)
}

export function isTablet(width: number): boolean {
  return width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg)
}

export function isDesktop(width: number): boolean {
  return width >= parseInt(breakpoints.lg)
}

export function getDeviceType(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile(width)) return 'mobile'
  if (isTablet(width)) return 'tablet'
  return 'desktop'
}



