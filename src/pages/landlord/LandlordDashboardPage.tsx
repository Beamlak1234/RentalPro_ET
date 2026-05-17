import { Building2, ChevronRight, FileText, Receipt } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  MOCK_LANDLORD_CONTRACTS,
  MOCK_LANDLORD_NOTIFICATIONS,
  propertyAndUnitCount,
} from '../../data/mockLandlordPortfolio'
import { useLocale } from '../../context/LocaleContext'
import { localeAmharicBody, localeCapsTracking } from '../../i18n/localeTypography'
import { tInterpolate } from '../../i18n/t'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function LandlordDashboardPage() {
  const { t, lang } = useLocale()
  const { properties, units } = propertyAndUnitCount()
  const pendingContracts = MOCK_LANDLORD_CONTRACTS.filter(
    (c) => c.status === 'awaiting_tenant' || c.status === 'amendment',
  ).length
  const previewNotes = MOCK_LANDLORD_NOTIFICATIONS.slice(0, 2)

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
        <h1 className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl">
          {t('common.landlord.title')}
        </h1>
        <p
          className={`mx-auto mt-2 max-w-xl text-center text-sm text-slate-600 ${localeAmharicBody(lang)}`}
        >
          {t('common.landlord.subtitle')}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <Building2 className="size-5 text-[#1e293b]" aria-hidden />
              <span
                className={`text-xs font-semibold ${localeCapsTracking(lang)}`}
              >
                {t('common.landlord.myProperties')}
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-[#1e293b]">{properties}</p>
            <p className={`text-sm text-slate-600 ${localeAmharicBody(lang)}`}>
              {tInterpolate(lang, 'common.landlord.unitsTotal', {
                count: units,
              })}
            </p>
            <Link
              to="/landlord/properties"
              className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#1e293b] hover:underline"
            >
              {t('common.landlord.manage')}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <FileText className="size-5 text-[#1e293b]" aria-hidden />
              <span
                className={`text-xs font-semibold ${localeCapsTracking(lang)}`}
              >
                {t('common.landlord.pendingContractsHeading')}
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-[#1e293b]">
              {pendingContracts}
            </p>
            <p className={`text-sm text-slate-600 ${localeAmharicBody(lang)}`}>
              {t('common.landlord.awaitingTenantAmendment')}
            </p>
            <Link
              to="/landlord/contracts"
              className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#1e293b] hover:underline"
            >
              {t('common.landlord.openContractsLink')}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </article>

          <article className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm sm:col-span-2">
            <div className="flex items-center gap-2 text-amber-900">
              <Receipt className="size-5" aria-hidden />
              <span
                className={`text-xs font-semibold ${localeCapsTracking(lang)}`}
              >
                {t('common.landlord.rentTaxStubTitle')}
              </span>
            </div>
            <p className={`mt-2 text-sm text-amber-950 ${localeAmharicBody(lang)}`}>
              {tInterpolate(lang, 'common.landlord.rentTaxStubBody', {
                amount: '12,400',
              })}
            </p>
            <Link
              to="/landlord/reports"
              className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-amber-950 underline-offset-2 hover:underline"
            >
              {t('common.landlord.openReportsLink')}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </article>
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2
              className={`text-sm font-semibold text-slate-500 ${localeCapsTracking(lang)}`}
            >
              {t('common.landlord.rentDueAlertsHeading')}
            </h2>
          </div>
          <p
            className={`mt-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm ${localeAmharicBody(lang)}`}
          >
            {t('common.landlord.demoRentWindow')}
          </p>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-2">
            <h2
              className={`text-sm font-semibold text-slate-500 ${localeCapsTracking(lang)}`}
            >
              {t('common.landlord.recentUpdates')}
            </h2>
            <Link
              to="/landlord/notifications"
              className="text-sm font-semibold text-[#1e293b] hover:underline"
            >
              {t('common.inbox')}
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {previewNotes.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
              >
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className={`text-slate-600 ${localeAmharicBody(lang)}`}>
                  {n.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
