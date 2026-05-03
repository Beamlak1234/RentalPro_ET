import { Building2, ChevronRight, FileText, Receipt } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  MOCK_LANDLORD_CONTRACTS,
  MOCK_LANDLORD_NOTIFICATIONS,
  propertyAndUnitCount,
} from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function LandlordDashboardPage() {
  const { properties, units } = propertyAndUnitCount()
  const pendingContracts = MOCK_LANDLORD_CONTRACTS.filter(
    (c) => c.status === 'awaiting_tenant' || c.status === 'amendment',
  ).length
  const previewNotes = MOCK_LANDLORD_NOTIFICATIONS.slice(0, 2)

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl">
          Landlord workspace
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
          Demo portfolio metrics — data is static until you wire an API.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <Building2 className="size-5 text-[#1e293b]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">
                My properties
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-[#1e293b]">{properties}</p>
            <p className="text-sm text-slate-600">{units} units total</p>
            <Link
              to="/landlord/properties"
              className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#1e293b] hover:underline"
            >
              Manage
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <FileText className="size-5 text-[#1e293b]" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Pending contracts
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-[#1e293b]">
              {pendingContracts}
            </p>
            <p className="text-sm text-slate-600">Awaiting tenant / amendment</p>
            <Link
              to="/landlord/contracts"
              className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#1e293b] hover:underline"
            >
              Open contracts
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </article>

          <article className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm sm:col-span-2">
            <div className="flex items-center gap-2 text-amber-900">
              <Receipt className="size-5" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Rent & tax preview (stub)
              </span>
            </div>
            <p className="mt-2 text-sm text-amber-950">
              Estimated withholding on collected rent this quarter:{' '}
              <strong>12,400 ETB</strong> (illustrative).
            </p>
            <Link
              to="/landlord/reports"
              className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-amber-950 underline-offset-2 hover:underline"
            >
              Open reports
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </article>
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Rent due alerts
            </h2>
          </div>
          <p className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm">
            Demo: 1 unit approaching its rent window within 7 days (Bole Unit
            305).
          </p>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Recent notifications
            </h2>
            <Link
              to="/landlord/notifications"
              className="text-sm font-semibold text-[#1e293b] hover:underline"
            >
              Inbox
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {previewNotes.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
              >
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className="text-slate-600">{n.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
