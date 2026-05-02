import { DashboardBanner } from '../dashboards/DashboardBanner'

export function AdminDashboardPage() {
  return (
    <>
      <DashboardBanner role="admin" />
      <div className="w-full max-w-2xl rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center shadow-sm sm:px-8">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          RentalPro ET
        </p>
        <h1 className="mt-3 text-2xl font-bold text-[#1e293b] sm:text-3xl">
          Admin dashboard — coming soon
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base text-slate-600">
          Authentication is active in this demo. Replace local storage persistence
          with your API — this space will hold configuration, moderation, audits,
          and staff tools.
        </p>
      </div>
    </>
  )
}
