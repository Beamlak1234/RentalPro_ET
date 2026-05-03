import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { MOCK_OFFICER_CONTRACT_REVIEW } from '../../data/mockOfficerQueues'

export function OfficerContractsReviewPage() {
  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
            Contracts review
          </h1>
          <Link to="/officer/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-slate-300/90 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Parties</th>
                <th className="px-4 py-3 text-right">Rent ETB</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_OFFICER_CONTRACT_REVIEW.map((row) => (
                <tr key={row.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{row.parties}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {row.rentEtb.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">{row.risk}</td>
                  <td className="px-4 py-3 capitalize">{row.status}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        type="button"
                        variant="success"
                        className="min-h-10 px-3 text-xs"
                        onClick={() => window.alert('Demo: contract cleared.')}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        className="min-h-10 px-3 text-xs"
                        onClick={() => window.alert('Demo: flagged.')}
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
