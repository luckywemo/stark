/**
 * Color utility functions for hexadecimal, RGB, and HSL conversions and manipulations.
 */

/**
 * Converts a hex color string to an RGB object.
 * @param hex Hex color string (e.g., '#FFFFFF').
 * @returns RGB object or null if invalid.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Converts RGB components to a hex color string.
 * @param r Red component (0-255).
 * @param g Green component (0-255).
 * @param b Blue component (0-255).
 * @returns Hex color string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Converts a hex color string to an HSL object.
 * @param hex Hex color string.
 * @returns HSL object or null if invalid.
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Lightens a hex color by a given percentage.
 * @param color Hex color string.
 * @param percent Percentage to lighten (0-100).
 * @returns Lightened hex color.
 */
export function lighten(color: string, percent: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  const factor = 1 + percent / 100
  const r = Math.min(255, Math.round(rgb.r * factor))
  const g = Math.min(255, Math.round(rgb.g * factor))
  const b = Math.min(255, Math.round(rgb.b * factor))

  return rgbToHex(r, g, b)
}

/**
 * Darkens a hex color by a given percentage.
 * @param color Hex color string.
 * @param percent Percentage to darken (0-100).
 * @returns Darkened hex color.
 */
export function darken(color: string, percent: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  const factor = 1 - percent / 100
  const r = Math.max(0, Math.round(rgb.r * factor))
  const g = Math.max(0, Math.round(rgb.g * factor))
  const b = Math.max(0, Math.round(rgb.b * factor))

  return rgbToHex(r, g, b)
}

/**
 * Adds an alpha channel to a hex color string, returning an RGBA string.
 * @param color Hex color string.
 * @param opacity Opacity value (0-1).
 * @returns RGBA color string.
 */
export function alpha(color: string, opacity: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

/**
 * Determines if a color is 'light' or 'dark' based on relative luminance.
 * @param color Hex color string.
 * @returns 'light' or 'dark'.
 */
export function contrast(color: string): 'light' | 'dark' {
  const rgb = hexToRgb(color)
  if (!rgb) return 'dark'

  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.5 ? 'light' : 'dark'
}
