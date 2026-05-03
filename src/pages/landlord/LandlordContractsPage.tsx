import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import { Button } from '../../components/ui/Button'
import {
  MOCK_LANDLORD_CONTRACTS,
  type LandlordContractStatus,
} from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

type F = 'all' | LandlordContractStatus

export function LandlordContractsPage() {
  const [filter, setFilter] = useState<F>('all')
  const rows = useMemo(
    () =>
      filter === 'all' ?
        MOCK_LANDLORD_CONTRACTS
      : MOCK_LANDLORD_CONTRACTS.filter((c) => c.status === filter),
    [filter],
  )

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
              Contracts & rent
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Filter by workflow status (demo).
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              to="/landlord/contracts/new"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1e293b] px-5 text-base font-semibold text-white shadow-sm hover:bg-[#334155]"
            >
              Create new contract
            </Link>
            <Button
              type="button"
              variant="secondary"
              className="min-h-12"
              onClick={() =>
                window.alert('Demo: rent declaration wizard would open here.')
              }
            >
              Rent declaration
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {(
            [
              ['all', 'All'],
              ['active', 'Active'],
              ['awaiting_tenant', 'Awaiting tenant'],
              ['amendment', 'Amendment'],
              ['draft', 'Draft'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`min-h-10 rounded-md px-2.5 text-xs font-semibold sm:text-sm ${
                filter === value
                  ? 'bg-white text-[#1e293b] shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="mt-8 space-y-3">
          {rows.map((c) => (
            <li
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">
                    {c.propertyName} · {c.unitLabel}
                  </p>
                  <p className="text-sm text-slate-600">Tenant: {c.tenantName}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase text-[#1e293b]">
                  {c.status.replace('_', ' ')}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-800">
                Rent {c.rentEtb.toLocaleString()} ETB / mo
              </p>
              <Link
                to={`/landlord/contracts/${c.id}`}
                className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-[#1e293b] px-4 text-sm font-semibold text-white hover:bg-[#334155]"
              >
                Open
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <Link
            to="/landlord/dashboard"
            className="text-sm font-semibold text-[#1e293b] hover:underline"
          >
            ← Dashboard
          </Link>
        </p>
      </div>
    </>
  )
}
