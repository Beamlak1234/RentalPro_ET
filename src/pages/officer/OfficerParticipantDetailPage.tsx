import type { ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { DIGITAL_ID_VERIFICATION_LABELS } from '../../auth/participantProfile'
import { findAccountById, loadAccounts } from '../../auth/storage'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { ROLE_LABELS } from '../../constants/roles'

function row(label: string, value: ReactNode) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:w-52 sm:shrink-0">
        {label}
      </dt>
      <dd className="min-w-0 text-sm text-slate-900 sm:text-right">{value}</dd>
    </div>
  )
}

export function OfficerParticipantDetailPage() {
  const { participantId } = useParams()

  const account =
    participantId ?
      findAccountById(loadAccounts(), participantId)
    : undefined

  if (
    participantId &&
    account &&
    account.role !== 'tenant' &&
    account.role !== 'landlord'
  ) {
    return <Navigate to="/officer/participants" replace />
  }

  const body =
    !participantId || !account ?
      <section className="mx-auto max-w-xl flex-1 px-4 py-16 text-center text-slate-700">
        <p className="text-lg font-semibold text-[#1e293b]">Record not found</p>
        <p className="mt-3 text-sm text-slate-600">
          Participants only include tenant and landlord accounts in this demo.
        </p>
        <Link
          to="/officer/participants"
          className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-[#1e293b] px-5 text-base font-semibold text-white hover:bg-[#334155]"
        >
          Back to directory
        </Link>
      </section>
    : <>
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:py-14">
          <nav className="text-sm font-medium text-[#1e293b]" aria-label="Breadcrumb">
            <Link className="hover:underline" to="/officer/participants">
              Participant directory
            </Link>{' '}
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-600">Record detail</span>
          </nav>

          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
            {account.participantProfile.legalFullName || account.displayName}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Demo account{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs text-slate-800">
              {account.id}
            </code>
          </p>

          <article className="mt-10 overflow-hidden rounded-xl border border-slate-300/90 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                Participant profile snapshot
              </h2>
            </div>
            <dl className="divide-y divide-slate-50 px-5 py-1">
              {row('Role', ROLE_LABELS[account.role])}
              {row('Email', account.email)}
              {row('Legal / full name', account.participantProfile.legalFullName)}
              {row('Phone', account.participantProfile.phone || '—')}
              {row('City / region', account.participantProfile.cityRegion || '—')}
              {row(
                'National ID reference',
                account.participantProfile.nationalIdRef ?
                  account.participantProfile.nationalIdRef
                : '—',
              )}
              {row(
                'Digital ID / Fayda reference',
                account.participantProfile.digitalIdFaydaRef ?
                  account.participantProfile.digitalIdFaydaRef
                : '—',
              )}
              {row(
                'Verification status (stub)',
                DIGITAL_ID_VERIFICATION_LABELS[
                  account.participantProfile.digitalIdVerificationStatus
                ],
              )}
              {row(
                'Emergency contact name',
                account.participantProfile.emergencyContactName ?
                  account.participantProfile.emergencyContactName
                : '—',
              )}
              {row(
                'Emergency contact phone',
                account.participantProfile.emergencyContactPhone ?
                  account.participantProfile.emergencyContactPhone
                : '—',
              )}
              {row(
                'Registered at',
                new Date(account.createdAt).toLocaleString(),
              )}
              {row(
                'Profile last updated',
                new Date(
                  account.participantProfile.profileUpdatedAt,
                ).toLocaleString(),
              )}
              {row(
                'Prototype consent acknowledged',
                account.participantProfile.demoConsentAcceptedAt ?
                  new Date(
                    account.participantProfile.demoConsentAcceptedAt,
                  ).toLocaleString()
                : '—',
              )}
            </dl>
          </article>

          <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50/85 px-4 py-4 text-xs text-amber-950 ring-1 ring-amber-100 sm:text-sm">
            <strong className="font-semibold">Activity timelines</strong> are omitted
            in this sprint — integrate contract events once backend wiring lands.
          </p>

          <div className="mt-10 pb-12">
            <Link
              to="/officer/participants"
              className="inline-flex min-h-12 items-center rounded-lg border-2 border-[#1e293b] bg-white px-5 text-base font-semibold text-[#1e293b] hover:bg-slate-50"
            >
              ← Back to list
            </Link>
          </div>
        </div>
      </>

  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      {body}
    </GovPageSurface>
  )
}
