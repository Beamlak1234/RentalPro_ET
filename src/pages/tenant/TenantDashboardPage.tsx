import { AlertCircle, ChevronRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import {
  MOCK_TENANT_CONTRACTS,
  countTenantBuckets,
  getDashboardContractRows,
} from '../../data/mockTenantContracts'
import { MOCK_TENANT_NOTIFICATIONS } from '../../data/mockTenantNotifications'
import { tenantT } from '../../i18n/tenantUi'
import { useAuth } from '../../hooks/useAuth'
import { useTenantLang } from '../../hooks/useParticipantUiPrefs'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function TenantDashboardPage() {
  const { user } = useAuth()
  const lang = useTenantLang()
  const firstName = user?.displayName?.split(/\s+/)[0] ?? 'Tenant'
  const rows = getDashboardContractRows()
  const buckets = countTenantBuckets(MOCK_TENANT_CONTRACTS)
  const recentNotes = MOCK_TENANT_NOTIFICATIONS.slice(0, 3)

  const pendingContract = MOCK_TENANT_CONTRACTS.find(
    (c) => c.needsTenantConfirmation,
  )
  const rentBump = MOCK_TENANT_CONTRACTS.find(
    (c) => c.rentIncreaseProposedEtb != null,
  )

  return (
    <>
      <DashboardBanner role="tenant" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <h1 className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl">
          {tenantT(lang, 'dashWelcome')}, {firstName}
        </h1>

        <section className="mt-10" aria-labelledby="contract-buckets-heading">
          <h2
            id="contract-buckets-heading"
            className="text-sm font-semibold uppercase tracking-wide text-slate-500"
          >
            {tenantT(lang, 'contractBuckets')}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(
              [
                ['active', buckets.active, 'emerald'],
                ['pending', buckets.pending, 'amber'],
                ['amendment', buckets.amendment, 'violet'],
              ] as const
            ).map(([key, count, tone]) => (
              <Link
                key={key}
                to="/tenant/contracts"
                state={{ filter: key }}
                className={`rounded-xl border px-4 py-4 shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b] ${
                  tone === 'emerald'
                    ? 'border-emerald-200 bg-emerald-50/90'
                    : tone === 'amber'
                      ? 'border-amber-200 bg-amber-50/90'
                      : 'border-violet-200 bg-violet-50/90'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {tenantT(lang, key as 'active')}
                </p>
                <p className="mt-2 text-3xl font-bold tabular-nums text-[#1e293b]">
                  {count}
                </p>
                <p className="mt-1 text-xs font-medium text-[#1e293b]">
                  View contracts →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {tenantT(lang, 'pendingActions')}
          </h2>
          <ul className="mt-4 space-y-4">
            {pendingContract ? (
              <li>
                <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="h-1 bg-amber-500" aria-hidden />
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <AlertCircle
                        className="size-4 shrink-0 text-amber-600"
                        aria-hidden
                      />
                      Contract awaiting confirmation
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Property: {pendingContract.title}
                    </p>
                    <Link
                      to={`/tenant/contracts/${pendingContract.id}`}
                      className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1e293b] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-[#334155] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b] sm:w-auto"
                    >
                      Review now
                    </Link>
                  </div>
                </article>
              </li>
            ) : null}
            {rentBump?.rentIncreaseProposedEtb != null ? (
              <li>
                <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="h-1 bg-sky-500" aria-hidden />
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <FileText
                        className="size-4 shrink-0 text-[#1e293b]"
                        aria-hidden
                      />
                      Rent increase proposed
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Amount: {rentBump.rentIncreaseProposedEtb.toLocaleString()}{' '}
                      ETB
                    </p>
                    <Button
                      variant="primary"
                      className="mt-4 w-full sm:w-auto"
                      type="button"
                      onClick={() => {
                        window.alert('Demo: rent increase flow not wired yet.')
                      }}
                    >
                      Respond now
                    </Button>
                  </div>
                </article>
              </li>
            ) : null}
            {!pendingContract && !rentBump?.rentIncreaseProposedEtb ? (
              <li className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
                No pending items right now.
              </li>
            ) : null}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="tenant-recent-notify">
          <div className="flex items-center justify-between gap-2">
            <h2
              id="tenant-recent-notify"
              className="text-sm font-semibold uppercase tracking-wide text-slate-500"
            >
              {tenantT(lang, 'notifications')}
            </h2>
            <Link
              to="/tenant/notifications"
              className="inline-flex min-h-10 items-center gap-0.5 text-sm font-semibold text-[#1e293b] hover:underline"
            >
              Inbox
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            {recentNotes.map((n) => (
              <li
                key={n.id}
                className="rounded-lg px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-100"
              >
                <p className="font-semibold text-slate-900">{n.title}</p>
                <p className="mt-1 text-slate-600">{n.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {tenantT(lang, 'myContracts')}
            </h2>
            <Link
              to="/tenant/contracts"
              className="inline-flex min-h-10 items-center gap-0.5 text-sm font-semibold text-[#1e293b] hover:underline"
            >
              View more
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Invoice / property</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Payment (ETB)</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {r.label}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            r.statusTone === 'pending'
                              ? 'rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900'
                              : r.statusTone === 'amendment'
                                ? 'rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-900'
                                : 'rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-900'
                          }
                        >
                          {r.statusDisplay}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-slate-800">
                        {r.paymentAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
