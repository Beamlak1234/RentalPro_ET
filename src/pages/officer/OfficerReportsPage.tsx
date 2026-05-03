import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import { GovPageSurface } from '../../components/layout/GovPageSurface'

export function OfficerReportsPage() {
  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-14">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#1e293b]">Reports & analytics</h1>
          <Link to="/officer/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </div>
        <div className="mt-10 space-y-4 rounded-xl border border-slate-300/90 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-700">
            Tax compliance rollup and rent trend exports will bind to telemetry
            services later.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="primary" className="min-h-11" onClick={() => window.alert('Demo PDF')}>
              Tax compliance PDF
            </Button>
            <Button type="button" variant="secondary" className="min-h-11" onClick={() => window.alert('Demo CSV')}>
              Rent trend CSV
            </Button>
          </div>
        </div>
      </section>
    </GovPageSurface>
  )
}
