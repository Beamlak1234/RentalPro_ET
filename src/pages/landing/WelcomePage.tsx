import { Building2, ChevronRight, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { useLocale } from '../../context/LocaleContext'
import type { MessageId } from '../../i18n/t'

type RoleCard = {
  role: 'tenant' | 'landlord'
  titleKey: MessageId
  descriptionKey: MessageId
  Icon: typeof UserRound
}

const ROLE_CARD_SPECS: RoleCard[] = [
  {
    role: 'tenant',
    titleKey: 'landing.cardTenant.title',
    descriptionKey: 'landing.cardTenant.description',
    Icon: UserRound,
  },
  {
    role: 'landlord',
    titleKey: 'landing.cardLandlord.title',
    descriptionKey: 'landing.cardLandlord.description',
    Icon: Building2,
  },
]

export function WelcomePage() {
  const { t } = useLocale()

  return (
    <GovPageSurface variant="civic" topAccent className="min-h-full">
      <section className="border-b border-slate-200/90 bg-white/80 px-4 py-14 backdrop-blur-sm sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#1e293b]">
            {t('landing.ethiopiaSubtitle')}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-[#1e293b] sm:text-5xl">
            {t('landing.heroTitle')}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-slate-700 sm:text-xl">
            {t('landing.heroBody')}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-slate-600">
            {t('landing.heroGovNote')}
          </p>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href="#roles"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#1e293b] px-6 text-base font-semibold text-white shadow-sm transition hover:bg-[#334155] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]"
            >
              {t('landing.ctaPrimary')}
            </a>
            <a
              href="#footer-help"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#1e293b] bg-white px-6 text-base font-semibold text-[#1e293b] shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]"
            >
              {t('landing.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>

      <section
        id="roles"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:py-16 lg:px-6 lg:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
            {t('landing.rolesHeading')}
          </h2>
          <p className="mt-3 text-pretty text-base text-slate-700 sm:text-lg">
            {t('landing.rolesBody')}
            <Link
              className="font-semibold text-[#1e293b] underline underline-offset-2 hover:no-underline"
              to="/auth/officer/sign-in"
            >
              {t('landing.rolesBodyOfficerLink')}
            </Link>
            {t('landing.rolesBodySuffix')}
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {ROLE_CARD_SPECS.map(({ role, titleKey, descriptionKey, Icon }) => (
            <li key={role}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-300/80 bg-white p-6 shadow-md transition hover:border-[#1e293b]/25 hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1e293b]/10 text-[#1e293b] ring-1 ring-[#1e293b]/10">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {t(titleKey)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {t(descriptionKey)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link
                    to={`/auth/${role}/sign-in`}
                    className="inline-flex min-h-12 flex-1 items-center justify-center gap-1 rounded-lg bg-[#1e293b] px-4 text-center text-sm font-semibold text-white hover:bg-[#334155]"
                  >
                    {t('landing.signIn')} <ChevronRight className="size-4 opacity-90" aria-hidden />
                  </Link>
                  <Link
                    to={`/auth/${role}/sign-up`}
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-center text-sm font-semibold text-[#1e293b] hover:bg-slate-50"
                  >
                    {t('landing.createAccount')}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </GovPageSurface>
  )
}
