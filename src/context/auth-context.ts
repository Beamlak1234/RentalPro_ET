import { createContext } from 'react'

import type { AuthRole, PublicAuthRole } from '../constants/roles'

export type AuthUser = {
  id: string
  email: string
  displayName: string
  role: AuthRole
}

export type AuthContextValue = {
  user: AuthUser | null
  login: (
    email: string,
    password: string,
    expectedRole: AuthRole,
  ) => { ok: true } | { ok: false; error: string }
  register: (
    email: string,
    password: string,
    passwordConfirm: string,
    displayName: string,
    role: PublicAuthRole,
  ) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
