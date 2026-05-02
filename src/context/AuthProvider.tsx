import { useCallback, useMemo, useState, type ReactNode } from 'react'

import {
  applyParticipantProfilePatch,
  createAccount,
  findAccountByCredentials,
  getSessionUserId,
  loadAccounts,
  setSessionUserId,
  type PersistedAccount,
} from '../auth/storage'
import type { ParticipantProfile } from '../auth/participantProfile'
import type { AuthRole } from '../constants/roles'

import { AuthContext, type AuthUser, type RegisterInput } from './auth-context'

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

  const register = useCallback((input: RegisterInput) => {
    if (input.password !== input.passwordConfirm) {
      return { ok: false as const, error: 'Passwords do not match.' }
    }

    const isParticipant =
      input.role === 'tenant' || input.role === 'landlord'
    if (isParticipant && !input.demoConsentAccepted) {
      return {
        ok: false as const,
        error: 'Confirm prototype data handling to continue.',
      }
    }

    const accounts = loadAccounts()
    const disp =
      input.displayName.trim() ||
      input.participantDraft?.legalFullName?.trim() ||
      'User'
    const created = createAccount(accounts, {
      email: input.email,
      password: input.password,
      displayName: disp,
      role: input.role,
      participantDraft: input.participantDraft,
      demoConsentAccepted: input.demoConsentAccepted,
    })
    if (!created.ok) return created
    setSessionUserId(created.account.id)
    setUser(accountToUser(created.account))
    return { ok: true as const }
  }, [])

  const updateParticipantProfile = useCallback(
    (
      patch: Partial<ParticipantProfile>,
    ): { ok: true } | { ok: false; error: string } => {
      const current = user
      if (!current?.id) {
        return { ok: false, error: 'You are signed out.' }
      }
      if (current.role !== 'tenant' && current.role !== 'landlord') {
        return { ok: false, error: 'Only tenant and landlord profiles are editable.' }
      }
      const accounts = loadAccounts()
      const next = applyParticipantProfilePatch(accounts, current.id, patch)
      if (!next) return { ok: false, error: 'Account not found.' }
      const hit = next.find((a) => a.id === current.id)
      if (hit) setUser(accountToUser(hit))
      return { ok: true }
    },
    [user],
  )

  const logout = useCallback(() => {
    setSessionUserId(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      updateParticipantProfile,
      logout,
    }),
    [login, logout, register, updateParticipantProfile, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
