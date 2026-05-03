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

const ACTIVE_PARTICIPANT_KEY = 'rp_et_active_participant_by_user_v1'

export type ParticipantEntitlements = {
  tenant: boolean
  landlord: boolean
}

/** Browser map: remembered workspace for dual tenant+landlord demo accounts. */
function readActiveParticipantMap(): Record<string, 'tenant' | 'landlord'> {
  try {
    const raw = localStorage.getItem(ACTIVE_PARTICIPANT_KEY)
    if (!raw) return {}
    const p: unknown = JSON.parse(raw)
    if (!p || typeof p !== 'object') return {}
    const out: Record<string, 'tenant' | 'landlord'> = {}
    for (const [key, val] of Object.entries(p)) {
      if ((val === 'tenant' || val === 'landlord') && typeof key === 'string') {
        out[key] = val
      }
    }
    return out
  } catch {
    return {}
  }
}

function writeActiveParticipantMap(map: Record<string, 'tenant' | 'landlord'>) {
  localStorage.setItem(ACTIVE_PARTICIPANT_KEY, JSON.stringify(map))
}

export function getStoredActiveParticipantRole(
  userId: string,
): 'tenant' | 'landlord' | null {
  const hit = readActiveParticipantMap()[userId]
  return hit === 'tenant' || hit === 'landlord' ? hit : null
}

export function setStoredActiveParticipantRole(
  userId: string | null | undefined,
  mode: 'tenant' | 'landlord',
): void {
  if (!userId) return
  const next = readActiveParticipantMap()
  next[userId] = mode
  writeActiveParticipantMap(next)
}

export function participantEntitlementsFromAccount(
  account: PersistedAccount,
): ParticipantEntitlements {
  if (account.role === 'officer' || account.role === 'admin') {
    return { tenant: false, landlord: false }
  }
  if (
    account.participantEntitlements &&
    (account.participantEntitlements.tenant ||
      account.participantEntitlements.landlord)
  ) {
    return {
      tenant: Boolean(account.participantEntitlements.tenant),
      landlord: Boolean(account.participantEntitlements.landlord),
    }
  }

  return {
    tenant: account.role === 'tenant',
    landlord: account.role === 'landlord',
  }
}

export function isDualParticipantAccount(account: PersistedAccount): boolean {
  const e = participantEntitlementsFromAccount(account)
  return e.tenant && e.landlord
}

export function resolveActiveParticipantRole(
  userId: string,
  entitlements: ParticipantEntitlements,
): 'tenant' | 'landlord' {
  const stored = getStoredActiveParticipantRole(userId)
  if (stored === 'tenant' && entitlements.tenant) return 'tenant'
  if (stored === 'landlord' && entitlements.landlord) return 'landlord'
  if (entitlements.tenant && !entitlements.landlord) return 'tenant'
  if (!entitlements.tenant && entitlements.landlord) return 'landlord'
  return 'tenant'
}

function coerceParticipantEntitlementJson(
  raw: unknown,
  legacyRole: 'tenant' | 'landlord',
): ParticipantEntitlements {
  if (!raw || typeof raw !== 'object') {
    return {
      tenant: legacyRole === 'tenant',
      landlord: legacyRole === 'landlord',
    }
  }
  const o = raw as Record<string, unknown>
  const t = o.tenant === true
  const l = o.landlord === true
  if (t || l) return { tenant: t, landlord: l }
  return {
    tenant: legacyRole === 'tenant',
    landlord: legacyRole === 'landlord',
  }
}

function ensureParticipantEntitlementsPersisted(
  a: PersistedAccount,
): PersistedAccount {
  if (a.role !== 'tenant' && a.role !== 'landlord') return a
  const inferred = participantEntitlementsFromAccount(a)
  if (
    a.participantEntitlements?.tenant === inferred.tenant &&
    a.participantEntitlements?.landlord === inferred.landlord
  ) {
    return a
  }
  return {
    ...a,
    participantEntitlements: inferred,
  }
}

export type PersistedAccount = {
  id: string
  email: string
  /** Demo only — do not ship to production storage as plaintext. */
  password: string
  displayName: string
  role: AuthRole
  createdAt: string
  participantProfile: ParticipantProfile
  /**
   * Tenant + landlord in one demo account when both true.
   * Omitted legacy rows — infer from `role` via `participantEntitlementsFromAccount`.
   */
  participantEntitlements?: ParticipantEntitlements
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

  const participantEntitlements =
    role === 'tenant' || role === 'landlord'
      ? coerceParticipantEntitlementJson(o.participantEntitlements, role)
      : undefined

  return {
    id: o.id,
    email: o.email,
    password: o.password,
    displayName: o.displayName.trim() || participantProfile.legalFullName,
    role,
    createdAt: o.createdAt,
    participantProfile,
    ...(participantEntitlements ? { participantEntitlements } : {}),
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
  const normalizedForSave = parsed.map((a) => {
    const ensured = ensureParticipantEntitlementsPersisted(a)
    return {
      ...ensured,
      participantProfile: normalizeParticipantProfile(
        ensured.participantProfile,
        ensured.displayName,
      ),
    }
  })

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
  if (expectedRole === 'tenant' || expectedRole === 'landlord') {
    return accounts.find((a) => {
      if (normalizeEmail(a.email) !== e || a.password !== password) return false
      if (a.role !== 'tenant' && a.role !== 'landlord') return false
      const ent = participantEntitlementsFromAccount(a)
      return Boolean(ent[expectedRole])
    })
  }
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

/** Tenant/landlord use entitlements; officer/admin strict role field (demo-only). */
export function persistedAccountMatchesExpectedRole(
  account: PersistedAccount,
  expectedRole: AuthRole,
): boolean {
  if (expectedRole === 'admin') return account.role === 'admin'
  if (expectedRole === 'officer') return account.role === 'officer'
  if (expectedRole === 'tenant' || expectedRole === 'landlord') {
    const ent = participantEntitlementsFromAccount(account)
    return Boolean(ent[expectedRole])
  }
  return false
}

/** Local demo reset — plaintext password storage only. Synced session is not invalidated. */
export function updatePersistedPasswordForRoleDemo(input: {
  email: string
  expectedRole: AuthRole
  newPassword: string
  passwordConfirm: string
}): { ok: true } | { ok: false; error: string } {
  const { expectedRole } = input
  if (input.newPassword !== input.passwordConfirm) {
    return { ok: false, error: 'Passwords do not match.' }
  }
  if (input.newPassword.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' }
  }

  const accounts = loadAccounts()
  const prev = findAccountByEmail(accounts, input.email)
  if (!prev) {
    return {
      ok: false,
      error: 'No account with this email exists in demo storage for this flow.',
    }
  }

  if (!persistedAccountMatchesExpectedRole(prev, expectedRole)) {
    return {
      ok: false,
      error:
        'This demo account belongs to another role pathway. Pick the matching forgot-password page.',
    }
  }

  const idx = accounts.findIndex((a) => a.id === prev.id)
  if (idx === -1) return { ok: false, error: 'Account not found.' }

  const next = [...accounts]
  next[idx] = { ...prev, password: input.newPassword }
  saveAccounts(next)
  return { ok: true }
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

export type UpgradeParticipantInput = {
  email: string
  password: string
  roleToAdd: 'tenant' | 'landlord'
  participantDraft: ParticipantRegistrationDraft
  demoConsentAccepted: boolean
}

/** Add tenant or landlord entitlement to an existing participant email/password (dual-role demo). */
export function upgradeParticipantWithSecondRole(
  accounts: PersistedAccount[],
  input: UpgradeParticipantInput,
): { ok: true; account: PersistedAccount } | { ok: false; error: string } {
  const prev = findAccountByEmail(accounts, input.email)
  if (
    !prev ||
    prev.role === 'officer' ||
    prev.role === 'admin' ||
    (prev.role !== 'tenant' && prev.role !== 'landlord')
  ) {
    return {
      ok: false,
      error:
        'This email is tied to another account type. Officers and admins cannot merge with tenant or landlord workspaces.',
    }
  }

  if (prev.password !== input.password) {
    return {
      ok: false,
      error:
        'Enter the correct password for this email to add the extra participant workspace.',
    }
  }

  if (!input.demoConsentAccepted) {
    return {
      ok: false,
      error: 'Confirm prototype data handling to continue.',
    }
  }

  if (!input.participantDraft.legalFullName?.trim()) {
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

  const ents = participantEntitlementsFromAccount(prev)
  if (ents[input.roleToAdd]) {
    return {
      ok: false,
      error:
        input.roleToAdd === 'tenant' ?
          'This account already includes the tenant workspace.'
        : 'This account already includes the landlord workspace.',
    }
  }

  const nowIso = new Date().toISOString()
  const mergedProfile = normalizeParticipantProfile(
    {
      ...prev.participantProfile,
      legalFullName:
        input.participantDraft.legalFullName.trim() ||
        prev.participantProfile.legalFullName,
      phone:
        input.participantDraft.phone.trim().length > 0
          ? input.participantDraft.phone.trim()
          : prev.participantProfile.phone,
      cityRegion:
        input.participantDraft.cityRegion.trim().length > 0
          ? input.participantDraft.cityRegion.trim()
          : prev.participantProfile.cityRegion,
      nationalIdRef:
        input.participantDraft.nationalIdRef.trim().length > 0
          ? input.participantDraft.nationalIdRef.trim()
          : prev.participantProfile.nationalIdRef,
      digitalIdFaydaRef:
        input.participantDraft.digitalIdFaydaRef.trim().length > 0
          ? input.participantDraft.digitalIdFaydaRef.trim()
          : prev.participantProfile.digitalIdFaydaRef,
      emergencyContactName:
        input.participantDraft.emergencyContactName.trim().length > 0
          ? input.participantDraft.emergencyContactName.trim()
          : prev.participantProfile.emergencyContactName,
      emergencyContactPhone:
        input.participantDraft.emergencyContactPhone.trim().length > 0
          ? input.participantDraft.emergencyContactPhone.trim()
          : prev.participantProfile.emergencyContactPhone,
      profileUpdatedAt: nowIso,
      demoConsentAcceptedAt:
        prev.participantProfile.demoConsentAcceptedAt ?? nowIso,
    },
    prev.displayName,
  )

  const displayName =
    mergedProfile.legalFullName.trim() || prev.displayName.trim() || 'User'

  const nextEnts: ParticipantEntitlements = {
    tenant: ents.tenant || input.roleToAdd === 'tenant',
    landlord: ents.landlord || input.roleToAdd === 'landlord',
  }

  const updated: PersistedAccount = {
    ...prev,
    displayName,
    participantProfile: mergedProfile,
    participantEntitlements: nextEnts,
  }

  const next = [...accounts]
  const idx = next.findIndex((a) => a.id === prev.id)
  if (idx === -1) return { ok: false, error: 'Account not found.' }
  next[idx] = updated
  saveAccounts(next)
  setStoredActiveParticipantRole(updated.id, input.roleToAdd)
  return { ok: true, account: updated }
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

  const participantEntitlements =
    input.role === 'tenant' ?
      ({
        tenant: true,
        landlord: false,
      } as ParticipantEntitlements)
    : input.role === 'landlord' ?
      ({
        tenant: false,
        landlord: true,
      } as ParticipantEntitlements)
    : undefined

  const account: PersistedAccount = {
    id: crypto.randomUUID(),
    email: normalizeEmail(input.email),
    password: input.password,
    displayName: displayBase,
    role: input.role,
    createdAt: nowIso,
    participantProfile,
    ...(participantEntitlements ? { participantEntitlements } : {}),
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
