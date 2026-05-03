import { DashboardBanner } from '../dashboards/DashboardBanner'

export function AdminUsersPage() {
  return (
    <>
      <DashboardBanner role="admin" />
      <div className="w-full max-w-4xl rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-[#1e293b]">User management</h1>
        <p className="mt-2 text-sm text-slate-600">
          Demo roster — hooks to persisted accounts will land with your API integration.
        </p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Email pattern</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-3">tenant</td>
                <td className="px-4 py-3 text-slate-600">*</td>
                <td className="px-4 py-3 text-emerald-700">Invite-only (demo)</td>
              </tr>
              <tr className="border-t border-slate-100">
                <td className="px-4 py-3">officer</td>
                <td className="px-4 py-3 text-slate-600">agency domain</td>
                <td className="px-4 py-3 text-emerald-700">Monitored</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
