/**
 * Client-only persistence for demos. Passwords are stored in plaintext — replace with
 * secure API authentication before production.
 */

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
}

function safeParseAccounts(raw: string | null): PersistedAccount[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isAccountShape)
  } catch {
    return []
  }
}

function isAccountShape(value: unknown): value is PersistedAccount {
  if (!value || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.email === 'string' &&
    typeof o.password === 'string' &&
    typeof o.displayName === 'string' &&
    typeof o.role === 'string' &&
    typeof o.createdAt === 'string'
  )
}

function seedAdminIfMissing(accounts: PersistedAccount[]): PersistedAccount[] {
  const hasAdmin = accounts.some((a) => a.role === 'admin')
  if (hasAdmin) return accounts
  const seeded: PersistedAccount = {
    id: 'seed-admin',
    email: 'admin@rentalpro.et',
    password: 'ChangeMeAdmin!',
    displayName: 'Platform admin',
    role: 'admin',
    createdAt: new Date().toISOString(),
  }
  const next = [...accounts, seeded]
  saveAccounts(next)
  return next
}

export function loadAccounts(): PersistedAccount[] {
  const list = safeParseAccounts(localStorage.getItem(ACCOUNTS_KEY))
  return seedAdminIfMissing(list)
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

export function createAccount(
  accounts: PersistedAccount[],
  input: {
    email: string
    password: string
    displayName: string
    role: PublicAuthRole
  },
): { ok: true; account: PersistedAccount } | { ok: false; error: string } {
  if (findAccountByEmail(accounts, input.email)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  if (input.password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' }
  }
  const account: PersistedAccount = {
    id: crypto.randomUUID(),
    email: normalizeEmail(input.email),
    password: input.password,
    displayName: input.displayName.trim() || 'User',
    role: input.role,
    createdAt: new Date().toISOString(),
  }
  const next = [...accounts, account]
  saveAccounts(next)
  return { ok: true, account }
}
