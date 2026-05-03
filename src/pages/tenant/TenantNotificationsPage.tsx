import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import {
  MOCK_TENANT_NOTIFICATIONS,
  filterTenantNotifications,
  type TenantNotificationFilter,
} from '../../data/mockTenantNotifications'
import { DashboardBanner } from '../dashboards/DashboardBanner'

const FILTERS: { value: TenantNotificationFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'contract', label: 'Contract' },
  { value: 'rent', label: 'Rent' },
]

export function TenantNotificationsPage() {
  const [filter, setFilter] = useState<TenantNotificationFilter>('all')
  const rows = useMemo(
    () => filterTenantNotifications(MOCK_TENANT_NOTIFICATIONS, filter),
    [filter],
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
            Notifications
          </h1>
        </div>

        <div className="mt-6 flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`min-h-10 rounded-md px-3 text-xs font-semibold transition sm:text-sm ${
                filter === value
                  ? 'bg-white text-[#1e293b] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="mt-8 space-y-3">
          {rows.map((n) => (
            <li
              key={n.id}
              className={`rounded-xl border px-4 py-4 shadow-sm ${n.read ? 'border-slate-200 bg-white' : 'border-sky-200 bg-sky-50/60'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">{n.title}</p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold capitalize text-[#1e293b]">
                  {n.kind}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{n.body}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <time dateTime={n.ts}>{new Date(n.ts).toLocaleString()}</time>
                {!n.read ?
                  <span className="font-semibold text-sky-800">Unread</span>
                : null}
                {n.relatedContractId ?
                  <Link
                    className="font-semibold text-[#1e293b] hover:underline"
                    to={`/tenant/contracts/${n.relatedContractId}`}
                  >
                    Open contract
                  </Link>
                : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
