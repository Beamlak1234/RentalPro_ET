import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'

import {
  MOCK_LANDLORD_NOTIFICATIONS,
  type LandlordNotificationKind,
} from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

type F = 'all' | 'unread' | LandlordNotificationKind

export function LandlordNotificationsPage() {
  const [filter, setFilter] = useState<F>('all')
  const rows = useMemo(() => {
    return MOCK_LANDLORD_NOTIFICATIONS.filter((n) => {
      if (filter === 'all') return true
      if (filter === 'unread') return !n.read
      return n.kind === filter
    })
  }, [filter])

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <div className="flex items-center gap-3">
          <Link
            to="/landlord/dashboard"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-[#1e293b] hover:bg-slate-50"
          >
            ←
          </Link>
          <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
            Notifications
          </h1>
        </div>

        <div className="mt-6 flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
          {(
            [
              ['all', 'All'],
              ['unread', 'Unread'],
              ['contract', 'Contract'],
              ['rent', 'Rent'],
              ['tax', 'Tax'],
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
          {rows.map((n) => (
            <li
              key={n.id}
              className={`rounded-xl border px-4 py-4 ${n.read ? 'border-slate-200 bg-white' : 'border-sky-200 bg-sky-50/50'}`}
            >
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold text-slate-900">{n.title}</p>
                <span className="text-xs font-semibold uppercase text-slate-500">
                  {n.kind}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{n.body}</p>
              <p className="mt-2 text-xs text-slate-500">
                {new Date(n.ts).toLocaleString()}
                {!n.read ?
                  <span className="ml-2 font-semibold text-sky-800">Unread</span>
                : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
