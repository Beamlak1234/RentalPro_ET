import { Download } from 'lucide-react'
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

  if (!contract) {
    return <Navigate to="/tenant/contracts" replace />
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    window.setTimeout(() => setSubmitted(false), 2000)
  }

  const title =
    contract.needsTenantConfirmation && contract.status === 'pending_confirmation'
      ? 'Pending confirmation'
      : 'Contract details'

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

          {contract.needsTenantConfirmation &&
          contract.status === 'pending_confirmation' ? (
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
                  window.alert('Demo: request changes / appeal flow.')
                }
              >
                Request changes / Appeal
              </Button>
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate-600">
              This contract is active. Management actions will appear here when
              the backend is connected.
            </p>
          )}

          <div className="mt-6 border-t border-slate-100 pt-6">
            <Button
              variant="secondary"
              className="w-full gap-2 sm:inline-flex"
              type="button"
              onClick={() =>
                window.alert('Demo: PDF would open or download here.')
              }
            >
              <Download className="size-4" aria-hidden />
              View PDF
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
