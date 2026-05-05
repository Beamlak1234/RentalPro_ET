import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

import {
  applyParticipantProfilePatch,
  createAccount,
  findAccountByCredentials,
  findAccountByEmail,
  getSessionUserId,
  loadAccounts,
  participantEntitlementsFromAccount,
  resolveActiveParticipantRole,
  setSessionUserId,
  setStoredActiveParticipantRole,
  upgradeParticipantWithSecondRole,
  type PersistedAccount,
} from '../auth/storage'
import type { ParticipantProfile } from '../auth/participantProfile'
import type { AuthRole } from '../constants/roles'

import { AuthContext, type AuthUser, type RegisterInput } from './auth-context'

function accountToUser(account: PersistedAccount): AuthUser {
  const { id, email, displayName } = account
  if (account.role === 'admin' || account.role === 'officer') {
    return {
      id,
      email,
      displayName,
      role: account.role,
      participantEntitlements: null,
    }
  }

  const ent = participantEntitlementsFromAccount(account)
  const role = resolveActiveParticipantRole(account.id, ent)
  return { id, email, displayName, role, participantEntitlements: ent }
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
  const [authShellEpoch, bumpAuthShellEpoch] = useState(0)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const signingOutRef = useRef(false)

  const startSigningOut = useCallback(() => {
    signingOutRef.current = true
    flushSync(() => {
      setIsSigningOut(true)
    })
  }, [])

  const clearSigningOut = useCallback(() => {
    signingOutRef.current = false
    setIsSigningOut(false)
  }, [])

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
      if (expectedRole === 'tenant' || expectedRole === 'landlord') {
        setStoredActiveParticipantRole(match.id, expectedRole)
      }
      setSessionUserId(match.id)
      setUser(accountToUser(match))
      signingOutRef.current = false
      setIsSigningOut(false)
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

    const mergeCandidate = findAccountByEmail(accounts, input.email)
    const canMergeParticipant =
      isParticipant &&
      mergeCandidate &&
      (mergeCandidate.role === 'tenant' || mergeCandidate.role === 'landlord')

    if (canMergeParticipant && !input.participantDraft) {
      return {
        ok: false as const,
        error: 'Legal name, phone, and city fields are required to add another workspace.',
      }
    }

    const created =
      canMergeParticipant &&
      input.participantDraft &&
      (input.role === 'tenant' || input.role === 'landlord')
      ? upgradeParticipantWithSecondRole(accounts, {
          email: input.email,
          password: input.password,
          roleToAdd: input.role,
          participantDraft: input.participantDraft,
          demoConsentAccepted: input.demoConsentAccepted,
        })
      : createAccount(accounts, {
          email: input.email,
          password: input.password,
          displayName: disp,
          role: input.role,
          participantDraft: input.participantDraft,
          demoConsentAccepted: input.demoConsentAccepted,
        })
    if (!created.ok) return created
    if (input.role === 'tenant' || input.role === 'landlord') {
      setStoredActiveParticipantRole(created.account.id, input.role)
    }
    setSessionUserId(created.account.id)
    setUser(accountToUser(created.account))
    signingOutRef.current = false
    setIsSigningOut(false)
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
      if (!current.participantEntitlements) {
        return {
          ok: false,
          error:
            'Only tenant and landlord demo profiles support this prototype editor.',
        }
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

  const switchParticipantWorkspace = useCallback(
    (next: 'tenant' | 'landlord'): { ok: true } | { ok: false; error: string } => {
      const current = user
      if (!current?.id || !current.participantEntitlements) {
        return { ok: false, error: 'Switching workspaces is only for tenants and landlords.' }
      }
      if (!current.participantEntitlements.tenant || !current.participantEntitlements.landlord) {
        return {
          ok: false,
          error: 'Dual tenant + landlord access is needed before switching workspaces.',
        }
      }
      if (!current.participantEntitlements[next]) {
        return { ok: false, error: 'This workspace is not available on your account.' }
      }
      setStoredActiveParticipantRole(current.id, next)
      setUser({ ...current, role: next })
      return { ok: true }
    },
    [user],
  )

  const logout = useCallback(() => {
    setSessionUserId(null)
    setUser(null)
    signingOutRef.current = false
    setIsSigningOut(false)
    // Helps auth shells remount input nodes so browser autofill is less sticky after demo sign-out.
    bumpAuthShellEpoch((n) => n + 1)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      updateParticipantProfile,
      switchParticipantWorkspace,
      logout,
      authShellEpoch,
      isSigningOut,
      signingOutRef,
      startSigningOut,
      clearSigningOut,
    }),
    [
      authShellEpoch,
      clearSigningOut,
      isSigningOut,
      login,
      logout,
      register,
      startSigningOut,
      signingOutRef,
      switchParticipantWorkspace,
      updateParticipantProfile,
      user,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
