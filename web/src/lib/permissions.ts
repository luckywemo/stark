// Permission and role management utilities

export type Permission = 
  | 'view_pass'
  | 'buy_pass'
  | 'renew_pass'
  | 'use_pass'
  | 'view_analytics'
  | 'manage_contract'
  | 'view_transactions'

export type Role = 'user' | 'admin' | 'viewer'

const rolePermissions: Record<Role, Permission[]> = {
  user: [
    'view_pass',
    'buy_pass',
    'renew_pass',
    'use_pass',
    'view_transactions',
  ],
  admin: [
    'view_pass',
    'buy_pass',
    'renew_pass',
    'use_pass',
    'view_analytics',
    'manage_contract',
    'view_transactions',
  ],
  viewer: [
    'view_pass',
    'view_transactions',
  ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission))
}

export function getPermissions(role: Role): Permission[] {
  return rolePermissions[role] ?? []
}




