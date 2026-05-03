import { DashboardBanner } from '../dashboards/DashboardBanner'

export function AdminSubcityPage() {
  return (
    <>
      <DashboardBanner role="admin" />
      <div className="w-full max-w-3xl rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-[#1e293b]">Sub-city management</h1>
        <ul className="mt-6 space-y-2 text-sm text-slate-700">
          <li className="rounded-lg border border-slate-100 px-3 py-2">Bole boundary pack (stub)</li>
          <li className="rounded-lg border border-slate-100 px-3 py-2">Kirkos boundary pack (stub)</li>
          <li className="rounded-lg border border-slate-100 px-3 py-2">Lideta boundary pack (stub)</li>
        </ul>
      </div>
    </>
  )
}
