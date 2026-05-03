import { Link } from 'react-router-dom'

import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { MOCK_OFFICER_ANOMALIES } from '../../data/mockOfficerQueues'

export function OfficerAnomaliesPage() {
  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#1e293b]">Risk monitoring</h1>
          <Link to="/officer/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </div>
        <ul className="mt-8 space-y-3">
          {MOCK_OFFICER_ANOMALIES.map((a) => (
            <li
              key={a.id}
              className="rounded-xl border border-red-100 bg-white px-4 py-4 shadow-sm"
            >
              <p className="font-semibold text-slate-900">{a.subject}</p>
              <p className="mt-1 text-sm text-slate-600">
                Risk score{' '}
                <strong className="tabular-nums text-red-700">{a.score}</strong>{' '}
                · Severity:{' '}
                <span className="capitalize">{a.severity}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </GovPageSurface>
  )
}
