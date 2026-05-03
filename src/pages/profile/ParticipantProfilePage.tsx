import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'

import {
  DIGITAL_ID_VERIFICATION_LABELS,
  type DigitalIdVerificationStatus,
  type ParticipantProfile,
  type UiLanguagePreference,
} from '../../auth/participantProfile'
import { findAccountById, loadAccounts, type PersistedAccount } from '../../auth/storage'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import {
  dashboardPath,
  participantProfilePath,
  signInPathForRole,
} from '../../constants/roles'
import type { AuthRole } from '../../constants/roles'
import { PROFILE_REFRESH_EVENT } from '../../hooks/useParticipantUiPrefs'
import { useAuth } from '../../hooks/useAuth'

type Props = { expectedRole: Extract<AuthRole, 'tenant' | 'landlord'> }

type EditorProps = {
  account: PersistedAccount
  expectedRole: Extract<AuthRole, 'tenant' | 'landlord'>
  onSaved?: () => void
}

function ParticipantProfileEditor({
  account,
  expectedRole,
  onSaved,
}: EditorProps) {
  const { updateParticipantProfile } = useAuth()
  const [form, setForm] = useState<ParticipantProfile>(() => ({
    ...account.participantProfile,
  }))
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  function setField<K extends keyof ParticipantProfile>(
    key: K,
    value: ParticipantProfile[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    const res = updateParticipantProfile({
      legalFullName: form.legalFullName.trim(),
      phone: form.phone.trim(),
      cityRegion: form.cityRegion.trim(),
      nationalIdRef: form.nationalIdRef.trim(),
      digitalIdFaydaRef: form.digitalIdFaydaRef.trim(),
      digitalIdVerificationStatus: form.digitalIdVerificationStatus,
      emergencyContactName: form.emergencyContactName.trim(),
      emergencyContactPhone: form.emergencyContactPhone.trim(),
      preferredLanguage: form.preferredLanguage,
      landlordSubCity: form.landlordSubCity.trim(),
    })
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    window.dispatchEvent(new Event(PROFILE_REFRESH_EVENT))
    onSaved?.()
  }

  const statusChoices = Object.entries(
    DIGITAL_ID_VERIFICATION_LABELS,
  ) as [DigitalIdVerificationStatus, string][]

  return (
    <>
      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs text-amber-950 ring-1 ring-amber-100 sm:text-sm">
        <strong className="font-semibold">Do not submit real scanned ID documents</strong>{' '}
        in this prototype — only short reference text belongs here if you experiment.
      </div>

      <form
        className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        onSubmit={handleSubmit}
        noValidate
      >
        {error ? (
          <p
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <Input
          label="Legal / full name"
          labelClassName="text-base"
          autoComplete="name"
          required
          value={form.legalFullName}
          onChange={(e) => setField('legalFullName', e.target.value)}
        />
        <Input
          type="tel"
          label="Phone"
          labelClassName="text-base"
          autoComplete="tel"
          required
          value={form.phone}
          onChange={(e) => setField('phone', e.target.value)}
        />
        <Input
          label="City / region"
          labelClassName="text-base"
          required
          value={form.cityRegion}
          onChange={(e) => setField('cityRegion', e.target.value)}
        />
        <Input
          label="National ID reference (optional)"
          labelClassName="text-base"
          placeholder="Masked or hashed reference — demo text only"
          value={form.nationalIdRef}
          onChange={(e) => setField('nationalIdRef', e.target.value)}
        />
        <Input
          label="Digital ID / Fayda reference (optional)"
          labelClassName="text-base"
          placeholder="External reference identifier — demo"
          value={form.digitalIdFaydaRef}
          onChange={(e) => setField('digitalIdFaydaRef', e.target.value)}
        />

        <div className="flex w-full flex-col gap-1.5">
          <label
            className="text-base font-medium text-slate-700"
            htmlFor="ui-language"
          >
            Preferred language / ቋንቋ
          </label>
          <select
            id="ui-language"
            className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
            value={form.preferredLanguage}
            onChange={(e) =>
              setField(
                'preferredLanguage',
                e.target.value as UiLanguagePreference,
              )
            }
          >
            <option value="en">English</option>
            <option value="am">አማርኛ (Amharic)</option>
          </select>
        </div>

        {expectedRole === 'landlord' ?
          <div className="flex w-full flex-col gap-1.5">
            <label
              className="text-base font-medium text-slate-700"
              htmlFor="landlord-subcity"
            >
              Sub-city (Addis Ababa convention)
            </label>
            <select
              id="landlord-subcity"
              className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
              value={form.landlordSubCity || ''}
              onChange={(e) => setField('landlordSubCity', e.target.value)}
            >
              <option value="">Select…</option>
              <option value="Arada">Arada</option>
              <option value="Bole">Bole</option>
              <option value="Kirkos">Kirkos</option>
              <option value="Kolfe Keranio">Kolfe Keranio</option>
              <option value="Lideta">Lideta</option>
              <option value="Nifas Silk-Lafto">Nifas Silk-Lafto</option>
              <option value="Yeka">Yeka</option>
              <option value="Other">Other / regional</option>
            </select>
          </div>
        : null}

        <div className="flex w-full flex-col gap-1.5">
          <label
            className="text-base font-medium text-slate-700"
            htmlFor="verification-status"
          >
            Verification status (demo stub)
          </label>
          <select
            id="verification-status"
            className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20"
            value={form.digitalIdVerificationStatus}
            onChange={(e) =>
              setField(
                'digitalIdVerificationStatus',
                e.target.value as DigitalIdVerificationStatus,
              )
            }
          >
            {statusChoices.map(([value, lab]) => (
              <option key={value} value={value}>
                {lab}
              </option>
            ))}
          </select>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Emergency contact (optional)
          </p>
          <div className="mt-4 space-y-5">
            <Input
              label="Name"
              labelClassName="text-base"
              autoComplete="name"
              value={form.emergencyContactName}
              onChange={(e) =>
                setField('emergencyContactName', e.target.value)
              }
            />
            <Input
              type="tel"
              label="Phone"
              labelClassName="text-base"
              autoComplete="tel"
              value={form.emergencyContactPhone}
              onChange={(e) =>
                setField('emergencyContactPhone', e.target.value)
              }
            />
          </div>
        </div>

        <dl className="rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-600 sm:text-sm">
          <div className="flex flex-wrap justify-between gap-2 border-b border-slate-100 py-2 first:pt-0 last:border-b-0 last:pb-0">
            <dt className="font-medium text-slate-700">Email (sign-in)</dt>
            <dd className="text-right">{account.email}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-b border-slate-100 py-2 first:pt-0 last:border-b-0 last:pb-0">
            <dt className="font-medium text-slate-700">Account created</dt>
            <dd className="text-right tabular-nums">
              {new Date(account.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-b border-slate-100 py-2 first:pt-0 last:border-b-0 last:pb-0">
            <dt className="font-medium text-slate-700">Profile last updated</dt>
            <dd className="text-right tabular-nums">
              {new Date(form.profileUpdatedAt).toLocaleString()}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2 py-2 pt-4">
            <dt className="font-medium text-slate-700">Prototype consent logged</dt>
            <dd className="max-w-[12rem] text-right sm:max-w-none">
              {form.demoConsentAcceptedAt
                ? new Date(form.demoConsentAcceptedAt).toLocaleString()
                : '—'}
            </dd>
          </div>
        </dl>

        <Button type="submit" variant="primary" className="w-full sm:w-auto min-h-12" disabled={busy}>
          {busy ? 'Saving…' : 'Save profile'}
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        Share this sheet with testers only. Path:{' '}
        <code className="rounded bg-slate-100 px-1 py-0.5">{participantProfilePath(expectedRole)}</code>
      </p>
    </>
  )
}

export function ParticipantProfilePage({ expectedRole }: Props) {
  const { user } = useAuth()
  const [saveNotice, setSaveNotice] = useState<string | null>(null)

  if (!user) {
    return <Navigate to={signInPathForRole(expectedRole)} replace />
  }

  if (user.role !== expectedRole) {
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  const account = findAccountById(loadAccounts(), user.id)

  if (!account) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-12 text-center text-sm text-slate-600">
        We could not load your participant record. Try signing out and back in.
      </section>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
      <h1 className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl">
        Your profile
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-center text-sm text-slate-600">
        Information you save here stays in{' '}
        <strong className="font-semibold text-slate-700">demo browser storage</strong>{' '}
        — not verified by any government registry. Officers can browse these
        fields in the prototype participant directory only.
      </p>

      {saveNotice ?
        <p
          className="mx-auto mt-6 max-w-lg rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900 ring-1 ring-emerald-100"
          role="status"
        >
          {saveNotice}
        </p>
      : null}

      <ParticipantProfileEditor
        key={`${account.id}:${account.participantProfile.profileUpdatedAt}:${account.participantProfile.preferredLanguage}:${account.participantProfile.landlordSubCity}`}
        account={account}
        expectedRole={expectedRole}
        onSaved={() =>
          setSaveNotice(
            `Profile saved at ${new Date().toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
            })}.`,
          )
        }
      />
    </div>
  )
}
