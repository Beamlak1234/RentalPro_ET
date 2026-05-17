import { Landmark, Shield, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { dashboardPath } from '../../constants/roles'
import { useLocale } from '../../context/LocaleContext'
import { useAuth } from '../../hooks/useAuth'

export function GovernmentWelcomePage() {
  const { user } = useAuth()
  const { t } = useLocale()
  const participantBrowsingGovernment = Boolean(user?.participantEntitlements)

  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="flex-1 px-4 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col rounded-xl border border-slate-300/90 bg-white p-7 shadow-md sm:flex-row sm:items-start sm:gap-6 sm:p-9">
            <span
              className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#1e293b] text-white shadow-sm ring-4 ring-[#1e293b]/10"
              aria-hidden
            >
              <Landmark className="size-8" />
            </span>
            <div className="mt-6 min-w-0 text-center sm:mt-0 sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1e293b]/90">
                {t('gov.officialChannel')}
              </p>
              <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
                {t('gov.portalTitle')}
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-700 sm:mx-0 sm:text-lg">
                {t('gov.portalLeadBefore')}
                <Link
                  className="font-semibold text-[#1e293b] underline decoration-slate-300 underline-offset-2 hover:no-underline"
                  to="/"
                >
                  {t('gov.portalLeadLink')}
                </Link>
                {t('gov.portalLeadAfter')}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-300/90 bg-white px-5 py-8 shadow-md sm:px-8 sm:py-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#1e293b]/12 text-[#1e293b] ring-1 ring-[#1e293b]/15">
                <Shield className="size-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-slate-900">
                  {t('gov.signInHeading')}
                </h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
                  {t('gov.signInBody')}
                </p>
              </div>
            </div>

            {user?.role === 'officer' ?
              <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/85 px-4 py-4 text-sm leading-relaxed text-sky-950 ring-1 ring-sky-100 sm:px-5">
                <strong className="font-semibold">{t('gov.signedInBadge')}</strong>
                {t('gov.signedInOfficerMid')}
                <Link
                  className="font-semibold underline decoration-sky-400 underline-offset-2 hover:no-underline"
                  to="/officer/participants"
                >
                  {t('gov.directoryLink')}
                </Link>
                {t('gov.signedInOfficerTail')}
              </div>
            : null}

            {participantBrowsingGovernment ?
              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-4 text-sm leading-relaxed text-amber-950 ring-1 ring-amber-100 sm:px-5">
                <p>
                  <strong className="font-semibold">{t('gov.restrictedBold')}</strong>{' '}
                  {t('gov.restrictedBody')}{' '}
                  <Link
                    className="font-semibold underline decoration-amber-600 underline-offset-2 hover:no-underline"
                    to={user ? dashboardPath(user.role) : '/'}
                  >
                    {t('gov.returnWorkspace')}
                  </Link>
                  {' '}
                  {t('gov.signOutHint')}
                </p>
              </div>
            : <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/auth/officer/sign-in"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-lg bg-[#1e293b] px-5 text-base font-semibold text-white shadow-sm hover:bg-[#334155] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]"
                >
                  {t('gov.officerSignIn')}
                  <ChevronRight className="size-5 opacity-90" aria-hidden />
                </Link>
                <Link
                  to="/auth/officer/sign-up"
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border-2 border-[#1e293b] bg-white px-5 text-base font-semibold text-[#1e293b] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]"
                >
                  {t('gov.createOfficer')}
                </Link>
              </div>
            }
          </div>

          <p className="mt-8 text-center text-xs text-slate-600 sm:text-left">
            {t('gov.staffFootnote.before')}
            <Link
              className="font-semibold text-[#1e293b] underline-offset-2 hover:underline"
              to="/admin/sign-in"
            >
              {t('gov.staffAdminLink')}
            </Link>
            {t('gov.staffFootnote.after')}
          </p>
        </div>
      </section>
    </GovPageSurface>
  )
}
