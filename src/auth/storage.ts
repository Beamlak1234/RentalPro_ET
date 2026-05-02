/**
 * Client-only persistence for demos. Passwords are stored in plaintext — replace with
 * secure API authentication before production.
 */

import {
  createDefaultParticipantProfile,
  normalizeParticipantProfile,
  profileFromRegistration,
  type ParticipantProfile,
  type ParticipantRegistrationDraft,
} from './participantProfile'
import type { AuthRole, PublicAuthRole } from '../constants/roles'

const ACCOUNTS_KEY = 'rp_et_accounts_v2'

const SESSION_KEY = 'rp_et_session_user_id_v2'

export type PersistedAccount = {
  id: string
  email: string
  /** Demo only — do not ship to production storage as plaintext. */
  password: string
  displayName: string
  role: AuthRole
  createdAt: string
  participantProfile: ParticipantProfile
}

function migrateAccountsJson(raw: unknown): PersistedAccount[] {
  if (!Array.isArray(raw)) return []
  const out: PersistedAccount[] = []
  for (const item of raw) {
    const acc = coercePersistedAccount(item)
    if (acc) out.push(acc)
  }
  return out
}

function coercePersistedAccount(value: unknown): PersistedAccount | null {
  if (!value || typeof value !== 'object') return null
  const o = value as Record<string, unknown>
  if (
    typeof o.id !== 'string' ||
    typeof o.email !== 'string' ||
    typeof o.password !== 'string' ||
    typeof o.displayName !== 'string' ||
    typeof o.role !== 'string' ||
    typeof o.createdAt !== 'string'
  ) {
    return null
  }
  const role = o.role as AuthRole
  if (
    role !== 'tenant' &&
    role !== 'landlord' &&
    role !== 'officer' &&
    role !== 'admin'
  ) {
    return null
  }

  /** Legacy keyed `profile` from earlier drafts vs final `participantProfile`. */
  const rawProfile =
    'participantProfile' in o ? o.participantProfile : o.profile

  const participantProfile = normalizeParticipantProfile(
    rawProfile,
    o.displayName,
  )

  return {
    id: o.id,
    email: o.email,
    password: o.password,
    displayName: o.displayName.trim() || participantProfile.legalFullName,
    role,
    createdAt: o.createdAt,
    participantProfile,
  }
}

function safeParseAccounts(raw: string | null): PersistedAccount[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    return migrateAccountsJson(parsed)
  } catch {
    return []
  }
}

function persistIfChanged(
  previous: PersistedAccount[],
  next: PersistedAccount[],
) {
  if (JSON.stringify(previous) !== JSON.stringify(next)) {
    saveAccounts(next)
  }
}

export function seedAdminIfMissing(
  accounts: PersistedAccount[],
): PersistedAccount[] {
  const hasAdmin = accounts.some((a) => a.role === 'admin')
  if (hasAdmin) return accounts
  const now = new Date().toISOString()
  const seeded: PersistedAccount = {
    id: 'seed-admin',
    email: 'admin@rentalpro.et',
    password: 'ChangeMeAdmin!',
    displayName: 'Platform admin',
    role: 'admin',
    createdAt: now,
    participantProfile: createDefaultParticipantProfile('Platform admin'),
  }
  const next = [...accounts, seeded]
  saveAccounts(next)
  return next
}

export function loadAccounts(): PersistedAccount[] {
  const parsed = safeParseAccounts(localStorage.getItem(ACCOUNTS_KEY))
  const normalizedForSave = parsed.map((a) => ({
    ...a,
    participantProfile: normalizeParticipantProfile(
      a.participantProfile,
      a.displayName,
    ),
  }))

  persistIfChanged(parsed, normalizedForSave)

  const withAdmin = seedAdminIfMissing(normalizedForSave)

  persistIfChanged(normalizedForSave, withAdmin)

  return withAdmin
}

export function saveAccounts(accounts: PersistedAccount[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function getSessionUserId(): string | null {
  return localStorage.getItem(SESSION_KEY)
}

export function setSessionUserId(userId: string | null): void {
  if (userId) localStorage.setItem(SESSION_KEY, userId)
  else localStorage.removeItem(SESSION_KEY)
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function findAccountByCredentials(
  accounts: PersistedAccount[],
  email: string,
  password: string,
  expectedRole: AuthRole,
): PersistedAccount | undefined {
  const e = normalizeEmail(email)
  return accounts.find(
    (a) =>
      normalizeEmail(a.email) === e &&
      a.password === password &&
      a.role === expectedRole,
  )
}

export function findAccountByEmail(
  accounts: PersistedAccount[],
  email: string,
): PersistedAccount | undefined {
  const e = normalizeEmail(email)
  return accounts.find((a) => normalizeEmail(a.email) === e)
}

export function findAccountById(
  accounts: PersistedAccount[],
  id: string,
): PersistedAccount | undefined {
  return accounts.find((a) => a.id === id)
}

export type CreateAccountInput = {
  email: string
  password: string
  displayName: string
  role: PublicAuthRole
  participantDraft?: ParticipantRegistrationDraft
  /** Required for tenant / landlord demos. Officers skip. */
  demoConsentAccepted?: boolean
}

export function createAccount(
  accounts: PersistedAccount[],
  input: CreateAccountInput,
): { ok: true; account: PersistedAccount } | { ok: false; error: string } {
  if (findAccountByEmail(accounts, input.email)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  if (input.password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' }
  }

  const isParticipantRole =
    input.role === 'tenant' || input.role === 'landlord'
  if (isParticipantRole) {
    if (!input.demoConsentAccepted) {
      return {
        ok: false,
        error: 'Confirm prototype data handling to continue.',
      }
    }
    if (!input.participantDraft?.legalFullName?.trim()) {
      return {
        ok: false,
        error: 'Legal / full name is required.',
      }
    }
    if (!input.participantDraft.phone?.trim()) {
      return { ok: false, error: 'Phone is required.' }
    }
    if (!input.participantDraft.cityRegion?.trim()) {
      return { ok: false, error: 'City / region is required.' }
    }
  }

  const nowIso = new Date().toISOString()
  const displayBase =
    (isParticipantRole
      ? input.participantDraft?.legalFullName?.trim()
      : input.displayName.trim()) ||
    input.displayName.trim() ||
    'User'

  const participantProfile =
    isParticipantRole && input.participantDraft && input.demoConsentAccepted
      ? profileFromRegistration(
          displayBase,
          input.participantDraft,
          nowIso,
        )
      : createDefaultParticipantProfile(displayBase)

  const account: PersistedAccount = {
    id: crypto.randomUUID(),
    email: normalizeEmail(input.email),
    password: input.password,
    displayName: displayBase,
    role: input.role,
    createdAt: nowIso,
    participantProfile,
  }

  const next = [...accounts, account]
  saveAccounts(next)
  return { ok: true, account }
}

/** Patch profile for an account id; merges into stored list and returns next list. */
export function applyParticipantProfilePatch(
  accounts: PersistedAccount[],
  userId: string,
  patch: Partial<ParticipantProfile>,
): PersistedAccount[] | null {
  const idx = accounts.findIndex((a) => a.id === userId)
  if (idx === -1) return null

  const prev = accounts[idx]
  const now = new Date().toISOString()
  const nextProfile = normalizeParticipantProfile(
    {
      ...prev.participantProfile,
      ...patch,
      profileUpdatedAt: now,
    },
    prev.displayName,
  )

  const displayName =
    nextProfile.legalFullName.trim() || prev.displayName.trim() || 'User'

  const updated: PersistedAccount = {
    ...prev,
    displayName,
    participantProfile: nextProfile,
  }

  const next = [...accounts]
  next[idx] = updated
  saveAccounts(next)
  return next
}

export function listPublicParticipantAccounts(
  accounts: PersistedAccount[],
): PersistedAccount[] {
  return accounts.filter((a) => a.role === 'tenant' || a.role === 'landlord')
}
