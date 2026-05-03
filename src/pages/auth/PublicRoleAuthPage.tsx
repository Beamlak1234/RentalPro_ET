import { useEffect, useState, type FormEvent } from 'react'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import type { ParticipantRegistrationDraft } from '../../auth/participantProfile'
import {
  findAccountByEmail,
  loadAccounts,
  persistedAccountMatchesExpectedRole,
} from '../../auth/storage'

import { AuthCard } from '../../components/auth/AuthCard'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import {
  ROLE_LABELS,
  dashboardPath,
  isPublicAuthRole,
  type PublicAuthRole,
} from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { enqueueAccessFlashBanner } from '../../navigation/pendingAccessFlash'

type Mode = 'sign-in' | 'sign-up'

/** Router state when opening participant auth from the government portal. */
type PublicAuthLocationState = {
  from?: { pathname: string }
  fromGovernment?: boolean
}

function postAuthPathname(
  role: PublicAuthRole,
  location: ReturnType<typeof useLocation>,
): string {
  const st = location.state as PublicAuthLocationState | undefined
  const from = st?.from?.pathname
  if (
    from &&
    from.startsWith('/') &&
    !from.startsWith('/auth/') &&
    !from.startsWith('/admin/sign-in')
  ) {
    return from
  }
  return dashboardPath(role)
}

function emptyDraft(): ParticipantRegistrationDraft {
  return {
    legalFullName: '',
    phone: '',
    cityRegion: '',
    nationalIdRef: '',
    digitalIdFaydaRef: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  }
}

export function PublicRoleAuthPage({ mode }: { mode: Mode }) {
  const { role: roleParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, register, authShellEpoch } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  /** Officer sign-up convenience name; tenants/landlords use legal draft. */
  const [displayName, setDisplayName] = useState('')
  const [participantDraft, setParticipantDraft] = useState<ParticipantRegistrationDraft>(
    emptyDraft,
  )
  const [prototypeConsent, setPrototypeConsent] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (
      mode !== 'sign-in' ||
      !roleParam ||
      !isPublicAuthRole(roleParam)
    ) {
      return
    }
    const roleForStoredMatch: PublicAuthRole = roleParam
    const timer = window.setTimeout(() => {
      const emailLookup = email.trim()
      setPassword((currentPw) => {
        if (currentPw.trim() !== '') return currentPw
        const acc = findAccountByEmail(loadAccounts(), emailLookup)
        if (!acc || !persistedAccountMatchesExpectedRole(acc, roleForStoredMatch))
          return currentPw
        return acc.password
      })
    }, 350)
    return () => window.clearTimeout(timer)
  }, [email, mode, roleParam])

  if (!roleParam || !isPublicAuthRole(roleParam)) {
    return <Navigate to="/" replace />
  }

  const role: PublicAuthRole = roleParam

  if (user) {
    if (user.role === 'admin') {
      enqueueAccessFlashBanner(
        'You are signed in as platform admin. Participant and officer sign-up use separate demo workspaces.',
      )
      return <Navigate to="/admin/dashboard" replace />
    }

    if (role === 'officer' && user.role !== 'officer') {
      enqueueAccessFlashBanner(
        'Government officer registration and sign-in are limited to authorised officer accounts.',
      )
      return <Navigate to={dashboardPath(user.role)} replace />
    }

    if ((role === 'tenant' || role === 'landlord') && user.role === 'officer') {
      enqueueAccessFlashBanner(
        'You are in the officer console. Participant signup is intentionally separate.',
      )
      return <Navigate to="/officer/dashboard" replace />
    }

    if (role === user.role && (role === 'tenant' || role === 'landlord')) {
      return <Navigate to={dashboardPath(user.role)} replace />
    }

    if (role === 'officer' && user.role === 'officer') {
      return <Navigate to="/officer/dashboard" replace />
    }
  }

  const label = ROLE_LABELS[role]
  const participantRole = role === 'tenant' || role === 'landlord'

  const prevAuthLocationState =
    location.state as PublicAuthLocationState | undefined
  const fromGovernmentEnrollment = prevAuthLocationState?.fromGovernment === true
  const authNavState: PublicAuthLocationState | undefined = fromGovernmentEnrollment ?
    {
      ...prevAuthLocationState,
      fromGovernment: true,
    }
  : undefined

  function patchDraft(patch: Partial<ParticipantRegistrationDraft>) {
    setParticipantDraft((prev) => ({ ...prev, ...patch }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setBusy(true)

    if (mode === 'sign-in') {
      const res = login(email, password, role)
      setBusy(false)
      if (!res.ok) {
        setError(res.error)
        return
      }
      navigate(postAuthPathname(role, location), { replace: true })
      return
    }

    const nameForRegister = participantRole
      ? participantDraft.legalFullName.trim()
      : displayName.trim()

    const res = register({
      email,
      password,
      passwordConfirm,
      displayName: nameForRegister || displayName.trim(),
      role,
      participantDraft: participantRole ? participantDraft : undefined,
      demoConsentAccepted: participantRole ? prototypeConsent : false,
    })
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(dashboardPath(role), { replace: true })
  }

  const formSection = (
    <section className="mx-auto w-full max-w-md flex-1 px-4 py-14 sm:py-20">
      <AuthCard
        title={`${mode === 'sign-in' ? 'Sign in' : 'Create account'} — ${label}`}
        subtitle={
          mode === 'sign-in'
            ? 'Welcome back. Use the email you registered for this role.'
            : role === 'officer'
              ? `Register as ${label.toLowerCase()}. Officer access stays isolated from tenant / landlord—even if someone rents and lets out property, they still need a separate officer credential in this demo.`
              : `Register as ${label.toLowerCase()}. Already have the other participant workspace? Use the same email + password and complete the form again—this demo merges tenant + landlord into one account.`
        }
        footer={
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-sm text-slate-600">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center rounded-md px-2 font-semibold text-[#1e293b] underline decoration-slate-400 underline-offset-2 hover:decoration-[#1e293b]"
            >
              Home
            </Link>
            {mode === 'sign-in' ? (
              <span>
                New here?{' '}
                <Link
                  className="inline-flex min-h-11 items-center font-semibold text-[#1e293b] underline"
                  to={`/auth/${role}/sign-up`}
                  state={authNavState}
                >
                  Create an account
                </Link>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <Link
                  className="inline-flex min-h-11 items-center font-semibold text-[#1e293b] underline"
                  to={`/auth/${role}/sign-in`}
                  state={authNavState}
                >
                  Sign in
                </Link>
              </span>
            )}
          </div>
        }
      >
        {fromGovernmentEnrollment && participantRole ?
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-100 sm:text-sm">
            <strong className="font-semibold">Government desk context.</strong>{' '}
            Tenant and landlord accounts use participant credentials stored and
            managed separately from your officer workstation. Signing in here is
            for personal rental enrolment—not for acting on behalf of regulated
            review inside the officer console.
          </div>
        : null}

        {mode === 'sign-up' && participantRole ? (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-100 sm:text-sm">
            <strong className="font-semibold">Prototype only.</strong> Data stays in{' '}
            this browser profile (localStorage) and is{' '}
            <strong className="font-semibold">not</strong> legal identity
            verification. Do{' '}
            <strong className="font-semibold">not</strong> paste real scanned ID or
            full national ID strings if you wouldn’t paste them elsewhere.
          </div>
        ) : null}

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="on"
        >
          {error ? (
            <p
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          {mode === 'sign-up' && participantRole ? (
            <>
              <Input
                name="legalFullName"
                label="Legal / full name"
                autoComplete="name"
                placeholder="Match how you identify on formal documents — demo text"
                labelClassName="text-base"
                value={participantDraft.legalFullName}
                onChange={(e) => patchDraft({ legalFullName: e.target.value })}
                required
              />
              <Input
                name="participantPhone"
                type="tel"
                label="Phone"
                autoComplete="tel"
                labelClassName="text-base"
                value={participantDraft.phone}
                onChange={(e) => patchDraft({ phone: e.target.value })}
                required
              />
              <Input
                name="cityRegion"
                label="City / region"
                labelClassName="text-base"
                value={participantDraft.cityRegion}
                onChange={(e) => patchDraft({ cityRegion: e.target.value })}
                required
              />
              <Input
                name="nationalIdRef"
                label="National ID reference (optional)"
                placeholder="Masked or abbreviated reference — demo only"
                labelClassName="text-base"
                value={participantDraft.nationalIdRef}
                onChange={(e) =>
                  patchDraft({ nationalIdRef: e.target.value })
                }
              />
              <Input
                name="digitalIdFaydaRef"
                label="Digital ID / Fayda reference (optional)"
                placeholder="External reference identifier — demo"
                labelClassName="text-base"
                value={participantDraft.digitalIdFaydaRef}
                onChange={(e) =>
                  patchDraft({ digitalIdFaydaRef: e.target.value })
                }
              />
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Emergency contact (optional)
                </p>
                <div className="mt-3 space-y-4">
                  <Input
                    name="emergencyName"
                    label="Name"
                    autoComplete="name"
                    labelClassName="text-base"
                    value={participantDraft.emergencyContactName}
                    onChange={(e) =>
                      patchDraft({
                        emergencyContactName: e.target.value,
                      })
                    }
                  />
                  <Input
                    name="emergencyPhone"
                    type="tel"
                    label="Phone"
                    autoComplete="tel"
                    labelClassName="text-base"
                    value={participantDraft.emergencyContactPhone}
                    onChange={(e) =>
                      patchDraft({
                        emergencyContactPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <label className="flex cursor-pointer gap-3 rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-800 ring-1 ring-slate-200">
                <input
                  type="checkbox"
                  className="mt-0.5 size-5 shrink-0 rounded border-slate-400"
                  checked={prototypeConsent}
                  onChange={(e) => setPrototypeConsent(e.target.checked)}
                  aria-describedby="prototype-consent-hint"
                />
                <span id="prototype-consent-hint">
                  I understand this is a prototype: my details are saved only in{' '}
                  demo browser storage, are not authenticated by RentalPro ET or{' '}
                  government systems, and I will not rely on them as legal proofs.
                </span>
              </label>
            </>
          ) : null}

          {mode === 'sign-up' && role === 'officer' ? (
            <Input
              name="displayName"
              label="Full name"
              autoComplete="name"
              placeholder="Ada Mulu"
              labelClassName="text-base"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          ) : null}

          <Input
            key={
              mode === 'sign-in' ?
                `rp-email-${role}-${authShellEpoch}`
              : `rp-email-${role}-reg`
            }
            name="email"
            type="email"
            label="Email"
            autoComplete={mode === 'sign-in' ? 'username email' : 'email'}
            placeholder={`you@example.com (${label})`}
            labelClassName="text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            key={
              mode === 'sign-in' ?
                `rp-pw-${role}-${authShellEpoch}`
              : `rp-pw-${role}-reg`
            }
            name="password"
            type="password"
            label="Password"
            autoComplete={
              mode === 'sign-in' ? 'current-password' : 'new-password'
            }
            labelClassName="text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={mode === 'sign-up' ? 8 : undefined}
          />

          {mode === 'sign-up' ? (
            <Input
              name="passwordConfirm"
              type="password"
              label="Confirm password"
              autoComplete="new-password"
              labelClassName="text-base"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          ) : null}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={busy}
          >
            {busy ?
              'Please wait…'
            : mode === 'sign-in' ?
              'Sign in'
            : 'Create account'}
          </Button>
          {mode === 'sign-in' ?
            <p className="text-center">
              <Link
                className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-[#1e293b] underline decoration-slate-400 underline-offset-2 hover:decoration-[#1e293b]"
                to={`/auth/${role}/forgot-password`}
                state={participantRole ? authNavState : undefined}
              >
                Forgot password?
              </Link>
            </p>
          : null}
        </form>

        <p className="mt-5 text-center text-xs text-slate-500">
          Demo auth stores accounts in your browser — use fake credentials to try
          flows.
        </p>
      </AuthCard>
    </section>
  )

  if (role === 'officer') {
    return (
      <GovPageSurface variant="institutional" topAccent className="min-h-full">
        {formSection}
      </GovPageSurface>
    )
  }

  return formSection
}
