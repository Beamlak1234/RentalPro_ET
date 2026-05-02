import { Link } from 'react-router-dom'

import type { PublicAuthRole } from '../../constants/roles'
import { ROLE_LABELS } from '../../constants/roles'

import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { DashboardBanner } from './DashboardBanner'

type Props = { role: PublicAuthRole }

const BLURBS: Record<PublicAuthRole, string> = {
  tenant: 'Browse rentals, renewals, payments, and messages will live here.',
  landlord:
    'List units, leases, payouts, and compliance tasks will be organized here.',
  officer:
    'Case queues, filings, inspections, and reports will arrive here next.',
}

export function ActorDashboardPage({ role }: Props) {
  const title = ROLE_LABELS[role]

  const body = (
    <>
      <DashboardBanner role={role} />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
          Your workspace
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600">
          {BLURBS[role]}
        </p>
        <div
          className={
            role === 'officer'
              ? 'mt-10 rounded-xl border border-slate-300/90 bg-white px-6 py-10 text-center text-sm text-slate-600 shadow-sm'
              : 'mt-10 rounded-xl border border-dashed border-slate-200 bg-white/90 px-6 py-10 text-center text-sm text-slate-600'
          }
        >
          Main features for{' '}
          <span className="font-semibold text-slate-800">{title}s</span> go here
          in the next build step.
          {role === 'officer' ?
            <span className="mt-8 block border-t border-slate-100 pt-6">
              <Link
                to="/officer/participants"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1e293b] px-5 font-semibold text-white shadow-sm transition hover:bg-[#334155]"
              >
                Open participant directory (tenant & landlord)
              </Link>
              <span className="mx-auto mt-3 block max-w-md text-xs text-slate-500">
                Read-only prototype list from browser-stored signup data.
              </span>
            </span>
          : null}
        </div>
      </section>
    </>
  )

  if (role === 'officer') {
    return (
      <GovPageSurface variant="institutional" className="min-h-full">
        {body}
      </GovPageSurface>
    )
  }

  return body
}
