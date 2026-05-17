import { useLocale } from '../../context/LocaleContext'
import {
  localeAmharicBody,
  localeBannerIdentityLineClass,
  localeBannerMetaLineClass,
  localeCapsTracking,
} from '../../i18n/localeTypography'
import type { MessageId } from '../../i18n/t'
import { tInterpolate } from '../../i18n/t'
import type { AuthRole } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'

const ROLE_TITLE: Record<AuthRole, MessageId> = {
  tenant: 'common.roleTenant',
  landlord: 'common.roleLandlord',
  officer: 'common.roleOfficer',
  admin: 'common.roleAdmin',
}

export function DashboardBanner({ role }: { role: AuthRole }) {
  const { user } = useAuth()
  const { t, lang } = useLocale()
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

  const roleLabel = t(ROLE_TITLE[role])

  return (
    <div className={officerVisual}>
      <div className="mx-auto max-w-6xl px-4 py-4 lg:px-6">
        <div className="min-w-0">
          <p
            className={`min-w-0 text-xs font-medium text-slate-500 ${localeCapsTracking(lang)} ${localeBannerMetaLineClass(lang)}`}
          >
            {tInterpolate(lang, 'common.signedInAs', {
              role: roleLabel,
            })}
          </p>
          <p
            className={`text-sm font-semibold text-slate-900 sm:text-base ${localeBannerIdentityLineClass(lang)}`}
          >
            {user?.displayName}
            <span className="block font-normal text-slate-600 sm:inline sm:before:content-['·_']">
              {user?.email}
            </span>
          </p>
          {dualParticipant ?
            <p
              className={`mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm ${localeAmharicBody(lang)}`}
            >
              {tInterpolate(lang, 'common.dualWorkspaceHint', {
                workspace: t('common.workspaceLabel'),
              })}
            </p>
          : null}
        </div>
      </div>
    </div>
  )
}
