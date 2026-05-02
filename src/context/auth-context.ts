import { createContext } from 'react'

import type {
  ParticipantProfile,
  ParticipantRegistrationDraft,
} from '../auth/participantProfile'
import type { AuthRole, PublicAuthRole } from '../constants/roles'

export type AuthUser = {
  id: string
  email: string
  displayName: string
  role: AuthRole
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
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
