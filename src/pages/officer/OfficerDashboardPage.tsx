import { Landmark, ClipboardList, Users, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

import { GovPageSurface } from '../../components/layout/GovPageSurface'
import {
  MOCK_LANDLORD_CONTRACTS,
  MOCK_LANDLORD_PROPERTIES,
} from '../../data/mockLandlordPortfolio'
import { MOCK_OFFICER_ANOMALIES } from '../../data/mockOfficerQueues'
import { useLocale } from '../../context/LocaleContext'
import { localeAmharicBody, localeCapsTracking } from '../../i18n/localeTypography'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function OfficerDashboardPage() {
  const { t, lang } = useLocale()

  return (
    <GovPageSurface variant="institutional" className="min-h-full">
      <DashboardBanner role="officer" />
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-bold text-[#1e293b] sm:text-4xl">
          {t('officer.dashboardTitle')}
        </h1>
        <p
          className={`mt-2 max-w-2xl text-sm text-slate-700 sm:text-base ${localeAmharicBody(lang)}`}
        >
          {t('officer.dashboardSubtitle')}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              {
                kind: 'count' as const,
                labelKey: 'officer.kpi.properties' as const,
                value: MOCK_LANDLORD_PROPERTIES.length,
                icon: Landmark,
              },
              {
                kind: 'count' as const,
                labelKey: 'officer.kpi.contracts' as const,
                value: MOCK_LANDLORD_CONTRACTS.length,
                icon: ClipboardList,
              },
              {
                kind: 'count' as const,
                labelKey: 'officer.kpi.anomalies' as const,
                value: MOCK_OFFICER_ANOMALIES.length,
                icon: TriangleAlert,
              },
              {
                kind: 'browse' as const,
                labelKey: 'officer.kpi.directory' as const,
                browseLabelKey: 'officer.kpi.browse' as const,
                href: '/officer/participants',
                icon: Users,
              },
            ] as const
          ).map((card) => (
            <article
              key={card.labelKey}
              className="rounded-xl border border-slate-300/90 bg-white p-5 shadow-sm"
            >
              <card.icon className="size-8 text-[#1e293b]" aria-hidden />
              <p
                className={`mt-3 text-xs font-semibold text-slate-500 ${localeCapsTracking(lang)}`}
              >
                {t(card.labelKey)}
              </p>
              {card.kind === 'count' ?
                <p className="mt-2 text-3xl font-bold text-[#1e293b]">
                  {card.value}
                </p>
              : <Link
                  to={card.href}
                  className="mt-2 inline-block text-lg font-semibold text-sky-800 underline-offset-2 hover:underline"
                >
                  {t(card.browseLabelKey)}
                </Link>
              }
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl border border-slate-300/90 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {t('officer.quickLinks')}
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-[#1e293b]">
              <li>
                <Link className="hover:underline" to="/officer/participants">
                  {t('officer.link.participants')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/properties-review">
                  {t('officer.link.propertiesReview')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/contracts-review">
                  {t('officer.link.contractsReview')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/map">
                  {t('officer.link.map')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/anomalies">
                  {t('officer.link.anomalies')}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/officer/reports">
                  {t('officer.link.reports')}
                </Link>
              </li>
            </ul>
          </article>
          <article className="rounded-xl border border-slate-300/90 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {t('officer.appealsTitle')}
            </h2>
            <p className={`mt-3 text-sm text-slate-600 ${localeAmharicBody(lang)}`}>
              {t('officer.appealsBody')}
            </p>
            <Link
              to="/officer/appeals"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[#1e293b] px-5 text-sm font-semibold text-white hover:bg-[#334155]"
            >
              {t('officer.appealsCta')}
            </Link>
          </article>
        </div>
      </section>
    </GovPageSurface>
  )
}
