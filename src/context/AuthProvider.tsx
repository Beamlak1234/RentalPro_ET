import { useCallback, useMemo, useState, type ReactNode } from 'react'

import {
  createAccount,
  findAccountByCredentials,
  getSessionUserId,
  loadAccounts,
  setSessionUserId,
  type PersistedAccount,
} from '../auth/storage'
import type { AuthRole, PublicAuthRole } from '../constants/roles'

import { AuthContext, type AuthUser } from './auth-context'

function accountToUser(account: PersistedAccount): AuthUser {
  const { id, email, displayName, role } = account
  return { id, email, displayName, role }
}

function readUserFromStorage(): AuthUser | null {
  const userId = getSessionUserId()
  if (!userId) return null
  const accounts = loadAccounts()
  const hit = accounts.find((a) => a.id === userId)
  return hit ? accountToUser(hit) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readUserFromStorage())

  const login = useCallback(
    (
      email: string,
      password: string,
      expectedRole: AuthRole,
    ): { ok: true } | { ok: false; error: string } => {
      const accounts = loadAccounts()
      const match = findAccountByCredentials(
        accounts,
        email,
        password,
        expectedRole,
      )
      if (!match) {
        return {
          ok: false,
          error:
            'Invalid credentials, or this account belongs to another role.',
        }
      }
      setSessionUserId(match.id)
      setUser(accountToUser(match))
      return { ok: true }
    },
    [],
  )

  const register = useCallback(
    (
      email: string,
      password: string,
      passwordConfirm: string,
      displayName: string,
      role: PublicAuthRole,
    ): { ok: true } | { ok: false; error: string } => {
      if (password !== passwordConfirm) {
        return { ok: false, error: 'Passwords do not match.' }
      }
      const accounts = loadAccounts()
      const created = createAccount(accounts, {
        email,
        password,
        displayName,
        role,
      })
      if (!created.ok) return created
      setSessionUserId(created.account.id)
      setUser(accountToUser(created.account))
      return { ok: true }
    },
    [],
  )

  const logout = useCallback(() => {
    setSessionUserId(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [login, logout, register, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
