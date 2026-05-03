import { Download } from 'lucide-react'
import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, type FormEvent } from 'react'

import { Button } from '../../components/ui/Button'
import { getTenantContract } from '../../data/mockTenantContracts'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function TenantContractDetailPage() {
  const { contractId } = useParams()
  const contract = contractId ? getTenantContract(contractId) : undefined
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const pdfSrc = useMemo(() => {
    if (!contract) return ''
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Demo lease</title><style>body{font-family:system-ui,Segoe UI,sans-serif;padding:24px;line-height:1.55;color:#0f172a}</style></head><body><h1 style="font-size:20px">Lease document (demo)</h1><p><strong>${contract.contractNumber}</strong></p><p>${contract.title} — ${contract.unit}</p><p>${contract.propertyDetail}</p><p>Monthly rent: <strong>${contract.rentEtb.toLocaleString()} ETB</strong></p><p style="color:#64748b;font-size:13px">This embedded page is a placeholder for a real PDF in production.</p></body></html>`
    return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
  }, [contract])

  if (!contract) {
    return <Navigate to="/tenant/contracts" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 2000)
  }

  const showPendingConfirm =
    contract.needsTenantConfirmation && contract.status === 'pending_confirmation'
  const showAmendmentActions =
    contract.listBucket === 'amendment' || contract.rentIncreaseProposedEtb != null

  const title =
    showPendingConfirm ? 'Pending confirmation' : 'Contract details'

  return (
    <>
      <DashboardBanner role="tenant" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <div className="flex items-center gap-3">
          <Link
            to="/tenant/contracts"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-[#1e293b] hover:bg-slate-50"
            aria-label="Back to contracts"
          >
            ←
          </Link>
          <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
            {title}
          </h1>
        </div>

        <article className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-slate-500">
            {contract.contractNumber}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-violet-700">
            Lifecycle: {contract.listBucket}
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Landlord</dt>
              <dd className="text-slate-900">{contract.landlordName}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Property</dt>
              <dd className="text-slate-900">{contract.propertyDetail}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Unit</dt>
              <dd className="text-slate-900">{contract.unit}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Lease period</dt>
              <dd className="text-slate-900">
                {contract.leaseStart} – {contract.leaseEnd}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Rent</dt>
              <dd className="text-slate-900">
                {contract.rentEtb.toLocaleString()} ETB / month
              </dd>
            </div>
          </dl>

          {showPendingConfirm ?
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="success"
                className="w-full"
                type="button"
                onClick={() =>
                  window.alert('Demo: contract would be confirmed.')
                }
              >
                Confirm contract
              </Button>
              <Button
                variant="danger"
                className="w-full"
                type="button"
                onClick={() =>
                  window.alert('Demo: contract would be rejected.')
                }
              >
                Reject contract
              </Button>
              <Button
                variant="warning"
                className="w-full"
                type="button"
                onClick={() =>
                  window.alert(
                    'Demo: request changes — opens structured workflow later.',
                  )
                }
              >
                Request changes
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                onClick={() =>
                  window.alert(
                    'Demo: appeal — escalates to officer queue in production.',
                  )
                }
              >
                Appeal (escalate)
              </Button>
            </div>
          : null}

          {!showPendingConfirm && showAmendmentActions ?
            <div className="mt-6 flex flex-col gap-3">
              <p className="text-sm text-slate-600">
                This contract has an amendment or rent revision in progress.
                Use the actions below (demo only).
              </p>
              <Button
                variant="warning"
                className="w-full"
                type="button"
                onClick={() =>
                  window.alert('Demo: request amendment from landlord.')
                }
              >
                Request amendment
              </Button>
              <Button
                variant="danger"
                className="w-full"
                type="button"
                onClick={() =>
                  window.alert('Demo: formal appeal to government officer.')
                }
              >
                Appeal
              </Button>
            </div>
          : null}

          {!showPendingConfirm && !showAmendmentActions ?
            <p className="mt-6 text-sm text-slate-600">
              This contract is active. Management actions will appear here when
              the backend is connected.
            </p>
          : null}

          <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
            <p className="text-sm font-semibold text-slate-700">
              PDF preview (embedded demo)
            </p>
            <iframe
              title={`Lease preview ${contract.contractNumber}`}
              src={pdfSrc}
              className="h-64 w-full rounded-lg border border-slate-200 bg-slate-50 sm:h-80"
              sandbox="allow-same-origin"
            />
            <Button
              variant="secondary"
              className="w-full gap-2 sm:inline-flex"
              type="button"
              onClick={() =>
                window.alert('Demo: original PDF download would start here.')
              }
            >
              <Download className="size-4" aria-hidden />
              Download PDF (demo)
            </Button>
          </div>
        </article>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Comments
          </h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <label htmlFor="tenant-contract-comment" className="sr-only">
              Your comments
            </label>
            <textarea
              id="tenant-contract-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comments here."
              rows={4}
              className="min-h-[120px] w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
            />
            <div className="mt-4 flex justify-end">
              <Button type="submit" variant="primary" disabled={submitted}>
                {submitted ? 'Sent (demo)' : 'Submit'}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}
