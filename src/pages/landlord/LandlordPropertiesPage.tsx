import { ChevronDown, ChevronRight, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { MOCK_LANDLORD_PROPERTIES } from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function LandlordPropertiesPage() {
  const [openId, setOpenId] = useState<string | null>(
    MOCK_LANDLORD_PROPERTIES[0]?.id ?? null,
  )

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
              My properties
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Expand blocks to see units (demo data).
            </p>
          </div>
          <Link
            to="/landlord/properties/new"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1e293b] px-5 text-base font-semibold text-white shadow-sm hover:bg-[#334155]"
          >
            Add new property
          </Link>
        </div>

        <ul className="mt-10 space-y-3">
          {MOCK_LANDLORD_PROPERTIES.map((p) => {
            const open = openId === p.id
            return (
              <li
                key={p.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full min-h-14 items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                  onClick={() => setOpenId(open ? null : p.id)}
                  aria-expanded={open}
                >
                  <span className="font-semibold text-slate-900">{p.name}</span>
                  {open ?
                    <ChevronDown className="size-5 shrink-0 text-slate-500" />
                  : <ChevronRight className="size-5 shrink-0 text-slate-500" />}
                </button>
                {open ?
                  <div className="border-t border-slate-100 px-4 py-4">
                    <p className="text-sm text-slate-600">
                      {p.subCity} · {p.addressLine}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        to={`/landlord/properties/${p.id}/edit`}
                        className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-[#1e293b] hover:bg-slate-50"
                      >
                        <Pencil className="size-4" aria-hidden />
                        Edit property
                      </Link>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {p.units.map((u) => (
                        <li
                          key={u.id}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm"
                        >
                          <span className="font-medium text-slate-900">
                            {u.label}{' '}
                            <span className="text-slate-500">({u.kind})</span>
                          </span>
                          <span className="tabular-nums text-slate-700">
                            {u.rentEtb.toLocaleString()} ETB
                            {u.occupied ?
                              <span className="ml-2 text-emerald-700">· Occupied</span>
                            : <span className="ml-2 text-amber-700">· Vacant</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                : null}
              </li>
            )
          })}
        </ul>

        <p className="mt-10 text-center">
          <Link
            to="/landlord/dashboard"
            className="text-sm font-semibold text-[#1e293b] hover:underline"
          >
            ← Back to dashboard
          </Link>
        </p>
      </div>
    </>
  )
}
