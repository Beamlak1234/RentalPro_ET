import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { MOCK_OFFICER_PROPERTY_REVIEW } from '../../data/mockOfficerQueues'

export function OfficerPropertiesReviewPage() {
  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
            Properties review
          </h1>
          <Link to="/officer/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-300/90 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Sub-city</th>
                <th className="px-4 py-3">Flags</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_OFFICER_PROPERTY_REVIEW.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                  <td className="px-4 py-3">{row.subCity}</td>
                  <td className="px-4 py-3 tabular-nums">{row.flags}</td>
                  <td className="px-4 py-3 capitalize">{row.status}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        type="button"
                        variant="success"
                        className="min-h-10 px-3 text-xs"
                        onClick={() => window.alert('Demo: approved in queue.')}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        className="min-h-10 px-3 text-xs"
                        onClick={() => window.alert('Demo: flagged for audit.')}
                      >
                        Flag
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </GovPageSurface>
  )
}
