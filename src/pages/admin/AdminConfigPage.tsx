import { Button } from '../../components/ui/Button'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function AdminConfigPage() {
  return (
    <>
      <DashboardBanner role="admin" />
      <div className="w-full max-w-lg rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-[#1e293b]">System configuration</h1>
        <p className="mt-2 text-sm text-slate-600">
          Adjust demo thresholds — values are illustrative only.
        </p>
        <div className="mt-6 space-y-4 text-sm">
          <label className="block font-medium text-slate-700" htmlFor="tax-rate">
            Withholding %
          </label>
          <input
            id="tax-rate"
            type="number"
            defaultValue={10}
            className="min-h-12 w-full rounded-lg border border-slate-300 px-4"
          />
        </div>
        <Button type="button" variant="primary" className="mt-6 min-h-12" onClick={() => window.alert('Demo: saved.')}>
          Save (demo)
        </Button>
      </div>
    </>
  )
}
