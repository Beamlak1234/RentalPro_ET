import { createContext, type MutableRefObject } from 'react'

import type {
  ParticipantProfile,
  ParticipantRegistrationDraft,
} from '../auth/participantProfile'
import type { ParticipantEntitlements } from '../auth/storage'
import type { AuthRole, PublicAuthRole } from '../constants/roles'

export type AuthUser = {
  id: string
  email: string
  displayName: string
  /** Effective routing role — tenant vs landlord swaps for dual workspaces (demo localStorage). */
  role: AuthRole
  /**
   * Presents landlord + tenant booleans together; officers/admins omit (null).
   */
  participantEntitlements: ParticipantEntitlements | null
}

export type RegisterInput = {
  email: string
  password: string
  passwordConfirm: string
  displayName: string
  role: PublicAuthRole
  participantDraft?: ParticipantRegistrationDraft
  demoConsentAccepted: boolean
}

export type AuthContextValue = {
  user: AuthUser | null
  login: (
    email: string,
    password: string,
    expectedRole: AuthRole,
  ) => { ok: true } | { ok: false; error: string }
  register: (
    input: RegisterInput,
  ) => { ok: true } | { ok: false; error: string }
  updateParticipantProfile: (
    patch: Partial<ParticipantProfile>,
  ) => { ok: true } | { ok: false; error: string }
  /** Dual tenant+landlord accounts only; swaps active workspace without full logout. */
  switchParticipantWorkspace: (
    role: 'tenant' | 'landlord',
  ) => { ok: true } | { ok: false; error: string }
  /** Bumps each logout so auth inputs remount — reduces stale browser autofill after sign-out. */
  authShellEpoch: number
  /** True while intentional sign-out is in flight (see useSignOutToHome). */
  isSigningOut: boolean
  /**
   * Set to `true` synchronously during intentional sign-out so `ProtectedRoute` does
   * not race React state updates when `logout()` runs.
   */
  signingOutRef: MutableRefObject<boolean>
  /** Call immediately before navigating home during sign-out so ProtectedRoute does not send users to /auth/.../sign-in. */
  startSigningOut: () => void
  /** Clears the sign-out flag without clearing session (e.g. if navigation aborts before logout runs). */
  clearSigningOut: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
