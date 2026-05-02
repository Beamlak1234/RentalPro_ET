import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import {
  MOCK_TENANT_CONTRACTS,
  filterTenantContracts,
  type ContractFilterStatus,
} from '../../data/mockTenantContracts'
import { DashboardBanner } from '../dashboards/DashboardBanner'

const FILTER_OPTIONS: { value: ContractFilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'active', label: 'Active' },
]

export function TenantContractsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<ContractFilterStatus>('all')

  const filtered = useMemo(
    () => filterTenantContracts(MOCK_TENANT_CONTRACTS, search, filter),
    [search, filter],
  )

  return (
    <>
      <DashboardBanner role="tenant" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <div className="flex items-center gap-3">
          <Link
            to="/tenant/dashboard"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-[#1e293b] hover:bg-slate-50"
            aria-label="Back to dashboard"
          >
            ←
          </Link>
          <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
            My contracts
          </h1>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search property or contract…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-2 pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
              aria-label="Search contracts"
            />
          </div>
          <div className="flex shrink-0 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {FILTER_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`min-h-10 flex-1 rounded-md px-3 text-sm font-semibold transition sm:flex-none ${
                  filter === value
                    ? 'bg-white text-[#1e293b] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          {filtered.length === 0 ? (
            <li className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-10 text-center text-sm text-slate-600">
              No contracts match your search.
            </li>
          ) : (
            filtered.map((c) => (
              <li key={c.id}>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{c.unit}</p>
                  <p className="mt-2 text-sm font-medium text-slate-800">
                    Rent: {c.rentEtb.toLocaleString()} ETB
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-medium text-slate-800">Status:</span>{' '}
                    {c.status === 'pending_confirmation'
                      ? 'Pending confirmation'
                      : 'Active'}{' '}
                    <span className="text-slate-400">|</span> {c.dateLabel}
                  </p>
                  <Link
                    to={`/tenant/contracts/${c.id}`}
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1e293b] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[#334155] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b] sm:w-auto"
                  >
                    View
                  </Link>
                </article>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}
