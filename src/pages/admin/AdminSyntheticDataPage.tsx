import { Button } from '../../components/ui/Button'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function AdminSyntheticDataPage() {
  return (
    <>
      <DashboardBanner role="admin" />
      <div className="w-full max-w-xl rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-[#1e293b]">Synthetic datasets</h1>
        <p className="mt-2 text-sm text-slate-600">
          Trigger placeholder jobs for AI benchmarks (no compute runs locally).
        </p>
        <Button
          type="button"
          variant="primary"
          className="mt-6 min-h-12 w-full sm:w-auto"
          onClick={() => window.alert('Demo: queued synthetic rent curve v0.')}
        >
          Regenerate nightly bundle
        </Button>
      </div>
    </>
  )
}
