import { Landmark, ClipboardList, Users, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GovPageSurface } from '../../components/layout/GovPageSurface'
import {
  MOCK_LANDLORD_CONTRACTS,
  MOCK_LANDLORD_PROPERTIES,
} from '../../data/mockLandlordPortfolio'
import { MOCK_OFFICER_ANOMALIES } from '../../data/mockOfficerQueues'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function OfficerDashboardPage() {
  return (
    <GovPageSurface variant="institutional" className="min-h-full">
      <DashboardBanner role="officer" />
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-[#1e293b] sm:text-4xl">
          Officer dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-700 sm:text-base">
          Prototype KPIs — derived from bundled mock datasets in this browser
          demo.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Properties (mock)',
              value: MOCK_LANDLORD_PROPERTIES.length,
              icon: Landmark,
            },
            {
              label: 'Contracts on file (mock)',
              value: MOCK_LANDLORD_CONTRACTS.length,
              icon: ClipboardList,
            },
            {
              label: 'Anomalies tracked',
              value: MOCK_OFFICER_ANOMALIES.length,
              icon: TriangleAlert,
            },
            {
              label: 'Participant directory',
              value: 'Open',
              icon: Users,
              link: '/officer/participants',
            },
          ].map((card) => (
            <article
              key={card.label}
              className="rounded-xl border border-slate-300/90 bg-white p-5 shadow-sm"
            >
              <card.icon className="size-8 text-[#1e293b]" aria-hidden />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {card.label}
              </p>
              {typeof card.value === 'number' ?
                <p className="mt-2 text-3xl font-bold text-[#1e293b]">
                  {card.value}
                </p>
              : <Link
                  to={card.link ?? '#'}
                  className="mt-2 inline-block text-lg font-semibold text-sky-800 underline-offset-2 hover:underline"
                >
                  Browse
                </Link>
              }
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-300/90 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick links</h2>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-[#1e293b]">
              <li>
                <Link className="hover:underline" to="/officer/participants">
                  Participant directory
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/properties-review">
                  Properties review queue
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/contracts-review">
                  Contracts review queue
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/map">
                  GIS heatmap (placeholder)
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/anomalies">
                  Anomalies (stub queue)
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/reports">
                  Reports (stub)
                </Link>
              </li>
            </ul>
          </article>
          <article className="rounded-xl border border-slate-300/90 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Pending appeals (stub)
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              1 rent-increase appeal awaiting assignment — open the appeals work
              queue to review (demo).
            </p>
            <Link
              to="/officer/appeals"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#1e293b] px-5 text-sm font-semibold text-white hover:bg-[#334155]"
            >
              Go to appeals
            </Link>
          </article>
        </div>
      </section>
    </GovPageSurface>
  )
}
