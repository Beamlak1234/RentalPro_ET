import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  DIGITAL_ID_VERIFICATION_LABELS,
  type DigitalIdVerificationStatus,
} from '../../auth/participantProfile'
import { loadAccounts, listPublicParticipantAccounts } from '../../auth/storage'
import type { PersistedAccount } from '../../auth/storage'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { ROLE_LABELS } from '../../constants/roles'

type RoleFilter = 'all' | 'tenant' | 'landlord'

type VerificationFilter =
  | 'all'
  | DigitalIdVerificationStatus

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function matchesSearch(account: PersistedAccount, query: string) {
  const q = normalize(query)
  if (!q) return true
  const p = account.participantProfile
  return [
    account.email,
    account.displayName,
    p.legalFullName,
    p.phone,
    p.cityRegion,
    p.nationalIdRef,
    p.digitalIdFaydaRef,
  ].some((x) => normalize(x || '').includes(q))
}

export function OfficerParticipantsDirectoryPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>('all')

  const rows = useMemo(() => {
    let list = listPublicParticipantAccounts(loadAccounts())
    if (roleFilter !== 'all') {
      list = list.filter((a) => a.role === roleFilter)
    }
    if (verificationFilter !== 'all') {
      list = list.filter(
        (a) =>
          a.participantProfile.digitalIdVerificationStatus ===
          verificationFilter,
      )
    }
    list = list.filter((a) => matchesSearch(a, search))
    return list.slice().sort((a, b) => {
      const nameA =
        normalize(a.participantProfile.legalFullName) ||
        normalize(a.displayName)
      const nameB =
        normalize(b.participantProfile.legalFullName) ||
        normalize(b.displayName)
      return nameA.localeCompare(nameB)
    })
  }, [search, roleFilter, verificationFilter])

  const body = (
    <section className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e293b]/80">
        Participant directory — read only
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
        Tenant & landlord records
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
        Inspect demo registration data persisted in officers’ browsers. This is{' '}
        <strong className="font-semibold text-slate-900">not</strong> a secured
        government registry — production would use APIs, federation, and
        audit tooling.
      </p>

      <div className="mt-10 flex flex-col gap-4 rounded-xl border border-slate-300/90 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:gap-5 sm:p-5">
        <div className="min-w-0 flex-1">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="participant-search"
          >
            Search
          </label>
          <input
            id="participant-search"
            className="mt-1 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
            placeholder="Name, email, phone, Fayda reference…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <span className="text-sm font-medium text-slate-700">Role</span>
          <div className="mt-2 flex rounded-lg bg-slate-100 p-1">
            {(
              [
                ['all', 'All'],
                ['tenant', ROLE_LABELS.tenant],
                ['landlord', ROLE_LABELS.landlord],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`min-h-11 flex-1 rounded-md px-2 text-sm font-semibold transition-colors sm:px-3 ${
                  roleFilter === value
                    ? 'bg-white text-[#1e293b] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setRoleFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:min-w-[11rem]">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="participant-verification"
          >
            Verification status
          </label>
          <select
            id="participant-verification"
            className="mt-1 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-900 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
            value={verificationFilter}
            onChange={(e) =>
              setVerificationFilter(e.target.value as VerificationFilter)
            }
          >
            <option value="all">All</option>
            {(
              ['unverified', 'pending_review', 'verified_demo'] as const
            ).map((v) => (
              <option key={v} value={v}>
                {DIGITAL_ID_VERIFICATION_LABELS[v]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {rows.map((account) => {
          const v =
            DIGITAL_ID_VERIFICATION_LABELS[
              account.participantProfile.digitalIdVerificationStatus
            ]
          const titleLabel =
            account.participantProfile.legalFullName || account.displayName
          return (
            <li key={account.id}>
              <Link
                to={`/officer/participants/${account.id}`}
                className="block rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm ring-1 ring-transparent transition hover:border-slate-300 hover:ring-slate-200/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b] sm:flex sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-slate-900">
                    {titleLabel}
                  </p>
                  <p className="mt-1 truncate text-sm text-slate-600">
                    {account.email}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-600">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-[#1e293b]">
                      {ROLE_LABELS[account.role]}
                    </span>
                    <span>{account.participantProfile.cityRegion}</span>
                  </p>
                </div>
                <div className="mt-4 shrink-0 sm:mt-0 sm:pl-4 sm:text-right">
                  <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-900 ring-1 ring-sky-100">
                    {v}
                  </span>
                  <p className="mt-2 hidden text-xs font-semibold text-[#1e293b] sm:block">
                    View record →
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {rows.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-slate-200 bg-white/80 px-4 py-8 text-center text-sm text-slate-600">
          No participants match. Register a tenant or landlord from the welcome
          page to seed browser storage first.
        </p>
      ) : null}

      <div className="mt-12 text-center sm:text-left">
        <Link
          to="/officer/dashboard"
          className="text-sm font-semibold text-[#1e293b] underline underline-offset-2 hover:no-underline"
        >
          Back to officer workspace
        </Link>
      </div>
    </section>
  )

  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      {body}
    </GovPageSurface>
  )
}
