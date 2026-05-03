import { ROLE_LABELS, type AuthRole } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'

export function DashboardBanner({ role }: { role: AuthRole }) {
  const { user } = useAuth()
  const officerVisual =
    role === 'officer'
      ? 'border-b border-slate-200 bg-white'
      : 'border-b border-slate-100 bg-slate-50'

  const dualParticipant =
    (role === 'tenant' || role === 'landlord') &&
    Boolean(
      user?.participantEntitlements?.tenant &&
        user.participantEntitlements.landlord,
    )

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
          {dualParticipant ?
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              Tenant + landlord share this demo login. Routes follow the workspace
              you pick from the{' '}
              <strong className="font-semibold text-slate-700">Workspace</strong>{' '}
              control in the site header — swap there before hopping between tenant
              and landlord tools.
            </p>
          : null}
        </div>
      </div>
    </div>
  )
}
