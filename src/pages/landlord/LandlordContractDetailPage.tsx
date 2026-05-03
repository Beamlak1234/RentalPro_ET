import { Link, Navigate, useParams } from 'react-router-dom'

import { Button } from '../../components/ui/Button'
import { getLandlordContract } from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function LandlordContractDetailPage() {
  const { contractId } = useParams()
  const c = contractId ? getLandlordContract(contractId) : undefined

  if (!c) {
    return <Navigate to="/landlord/contracts" replace />
  }

  const pdfSrc =
    `data:text/html;charset=utf-8,` +
    encodeURIComponent(
      `<!DOCTYPE html><html><body style="font-family:system-ui;padding:20px"><h1>Landlord copy</h1><p>${c.id}</p><p>${c.tenantName}</p></body></html>`,
    )

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <Link
          to="/landlord/contracts"
          className="inline-flex min-h-10 items-center text-sm font-semibold text-[#1e293b] hover:underline"
        >
          ← Contracts
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[#1e293b]">
          {c.propertyName}
        </h1>
        <p className="text-slate-600">{c.unitLabel}</p>

        <article className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm">
            Status:{' '}
            <strong className="capitalize">{c.status.replace('_', ' ')}</strong>
          </p>
          <p className="text-sm">Tenant: {c.tenantName}</p>
          <p className="text-sm">Rent: {c.rentEtb.toLocaleString()} ETB / mo</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="warning"
              className="min-h-12"
              onClick={() => window.alert('Demo: request amendment to tenant.')}
            >
              Request amendment
            </Button>
            <Button
              type="button"
              variant="primary"
              className="min-h-12"
              onClick={() => window.alert('Demo: rent increase proposal.')}
            >
              Rent increase
            </Button>
          </div>
        </article>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Version history
          </h2>
          <ul className="mt-3 space-y-2">
            {c.versions.map((v, i) => (
              <li
                key={`${v.at}-${i}`}
                className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <span className="font-semibold text-slate-900">{v.label}</span>
                <span className="text-slate-500"> · {v.at}</span>
                <span className="ml-2 tabular-nums text-slate-700">
                  {v.rentEtb.toLocaleString()} ETB
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            PDF preview
          </h2>
          <iframe
            title="Contract PDF demo"
            src={pdfSrc}
            className="mt-3 h-56 w-full rounded-lg border border-slate-200 sm:h-64"
            sandbox="allow-same-origin"
          />
        </section>
      </div>
    </>
  )
}
