import { Link } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '../../components/ui/Button'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function LandlordReportsPage() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [deduction, setDeduction] = useState('standard')

  const base = period === 'monthly' ? 12400 : 148800
  const tax = Math.round(base * 0.1)

  function downloadBlob() {
    const text = `RentalPro ET — Tax preview (${period})\nTaxable base: ${base}\nWithholding (demo 10%): ${tax}\n`
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tax-preview-${period}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#1e293b]">Reports & tax</h1>
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              className={`min-h-10 rounded-md px-3 text-sm font-semibold ${
                period === 'monthly' ? 'bg-white shadow-sm' : 'text-slate-600'
              }`}
              onClick={() => setPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`min-h-10 rounded-md px-3 text-sm font-semibold ${
                period === 'yearly' ? 'bg-white shadow-sm' : 'text-slate-600'
              }`}
              onClick={() => setPeriod('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="text-sm font-medium text-slate-700" htmlFor="deduction">
            Deduction profile (demo)
          </label>
          <select
            id="deduction"
            className="mt-2 min-h-12 w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 text-base"
            value={deduction}
            onChange={(e) => setDeduction(e.target.value)}
          >
            <option value="standard">Standard (10% placeholder)</option>
            <option value="reduced">Reduced (demo)</option>
            <option value="none">None (demo)</option>
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Line</th>
                <th className="px-4 py-3 text-right">ETB</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-3">Declared rent ({period})</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {base.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-3">Withholding (demo)</td>
                <td className="px-4 py-3 text-right tabular-nums text-amber-800">
                  {tax.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="primary" className="min-h-12" onClick={downloadBlob}>
            Download summary (.txt)
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="min-h-12"
            onClick={() => window.alert('Demo: annual PDF bundle would generate here.')}
          >
            Download all (demo)
          </Button>
        </div>

        <p className="mt-10 text-center">
          <Link to="/landlord/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </p>
      </div>
    </>
  )
}
