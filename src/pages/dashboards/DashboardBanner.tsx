import { ROLE_LABELS, type AuthRole } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'

export function DashboardBanner({ role }: { role: AuthRole }) {
  const { user } = useAuth()
  const officerVisual =
    role === 'officer'
      ? 'border-b border-slate-200 bg-white'
      : 'border-b border-slate-100 bg-slate-50'

  return (
    <div className={officerVisual}>
      <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-500">
            Signed in • {ROLE_LABELS[role]}
          </p>
          <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
            {user?.displayName}
            <span className="block font-normal text-slate-600 sm:inline sm:before:content-['·_']">
              {user?.email}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
