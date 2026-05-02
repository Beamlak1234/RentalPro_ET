export const PUBLIC_AUTH_ROLES = ['tenant', 'landlord', 'officer'] as const

export type PublicAuthRole = (typeof PUBLIC_AUTH_ROLES)[number]

export type AuthRole = PublicAuthRole | 'admin'

export function isPublicAuthRole(role: string): role is PublicAuthRole {
  return PUBLIC_AUTH_ROLES.includes(role as PublicAuthRole)
}

export function isAuthRole(role: string): role is AuthRole {
  return role === 'admin' || isPublicAuthRole(role)
}

/** Demo-only seeded admin (see auth/storage.ts). */
export function isAdminRole(role: AuthRole): role is 'admin' {
  return role === 'admin'
}

export function dashboardPath(role: AuthRole): string {
  switch (role) {
    case 'tenant':
      return '/tenant/dashboard'
    case 'landlord':
      return '/landlord/dashboard'
    case 'officer':
      return '/officer/dashboard'
    case 'admin':
      return '/admin/dashboard'
  }
}

export function signInPathForRole(role: AuthRole): string {
  if (role === 'admin') return '/admin/sign-in'
  return `/auth/${role}/sign-in`
}

export const ROLE_LABELS: Record<AuthRole, string> = {
  tenant: 'Tenant',
  landlord: 'Landlord',
  officer: 'Government officer',
  admin: 'Admin',
}
