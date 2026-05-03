import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { MOCK_OFFICER_APPEALS } from '../../data/mockOfficerQueues'

export function OfficerAppealsPage() {
  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#1e293b]">Appeals</h1>
          <Link to="/officer/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </div>
        <ul className="mt-8 space-y-4">
          {MOCK_OFFICER_APPEALS.map((ap) => (
            <li
              key={ap.id}
              className="rounded-xl border border-slate-300/90 bg-white p-5 shadow-sm"
            >
              <p className="font-semibold text-slate-900">{ap.title}</p>
              <p className="mt-2 text-sm text-slate-600">Opened {ap.opened}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="success"
                  type="button"
                  className="min-h-11"
                  onClick={() => window.alert('Demo: appeal accepted.')}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  className="min-h-11"
                  onClick={() => window.alert('Demo: appeal rejected.')}
                >
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </GovPageSurface>
  )
}
