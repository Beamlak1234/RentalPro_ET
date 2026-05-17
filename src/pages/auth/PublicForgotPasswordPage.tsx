import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { AuthCard } from '../../components/auth/AuthCard'
import { GovPageSurface } from '../../components/layout/GovPageSurface'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { updatePersistedPasswordForRoleDemo } from '../../auth/storage'
import { useLocale } from '../../context/LocaleContext'
import {
  ROLE_LABELS,
  dashboardPath,
  isPublicAuthRole,
  type PublicAuthRole,
} from '../../constants/roles'
import type { MessageId } from '../../i18n/t'
import { tInterpolate } from '../../i18n/t'
import { useAuth } from '../../hooks/useAuth'
import { enqueueAccessFlashBanner } from '../../navigation/pendingAccessFlash'

export function PublicForgotPasswordPage() {
  const { role: roleParam } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t: tr, lang } = useLocale()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!roleParam || !isPublicAuthRole(roleParam)) {
    return <Navigate to="/" replace />
  }

  const role: PublicAuthRole = roleParam

  const roleTitleKey = {
    tenant: 'common.roleTenant',
    landlord: 'common.roleLandlord',
    officer: 'common.roleOfficer',
  } as const satisfies Record<PublicAuthRole, MessageId>

  const roleDisplay = tr(roleTitleKey[role])

  if (user?.role === 'admin') {
    enqueueAccessFlashBanner(
      'You are signed in as platform admin. Use admin tools or sign out before public password-reset shells.',
    )
    return <Navigate to="/admin/dashboard" replace />
  }

  if (user) {
    enqueueAccessFlashBanner(
      `You are signed in as ${ROLE_LABELS[user.role]}. Password reset stubs are intended for signed-out testers.`,
    )
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setBusy(true)
    const res = updatePersistedPasswordForRoleDemo({
      email,
      expectedRole: role,
      newPassword,
      passwordConfirm: confirm,
    })
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }

    enqueueAccessFlashBanner(
      'Demo password updated in this browser storage. Sign in again with your new password.',
    )
    navigate(`/auth/${role}/sign-in`, { replace: true })
  }

  const formInner = (
    <section className="mx-auto w-full max-w-md flex-1 px-4 py-14 sm:py-20">
      <AuthCard
        title={tInterpolate(lang, 'auth.forgot.resetTitle', { role: roleDisplay })}
        subtitle={tr('auth.forgot.publicSubtitle')}
        footer={
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-sm text-slate-600">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center rounded-md px-2 font-semibold text-[#1e293b] underline decoration-slate-400 underline-offset-2 hover:decoration-[#1e293b]"
            >
              {tr('auth.home')}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center font-semibold text-[#1e293b] underline"
              to={`/auth/${role}/sign-in`}
            >
              {tr('auth.forgot.backSignIn')}
            </Link>
          </div>
        }
      >
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-100 sm:text-sm">
          {tr('auth.forgot.prototypeWarning')}
        </div>

        <form className="flex flex-col gap-5" autoComplete="on" onSubmit={handleSubmit} noValidate>
          {error ? (
            <p
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <Input
            key={`rp-forgot-email-${role}`}
            name="email"
            type="email"
            label={tr('auth.forgot.registeredEmail')}
            autoComplete="email"
            required
            labelClassName="text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            key={`rp-forgot-pw-${role}`}
            name="new-password"
            type="password"
            passwordVisibilityToggle
            label={tr('auth.forgot.newPw')}
            autoComplete="new-password"
            minLength={8}
            required
            labelClassName="text-base"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            key={`rp-forgot-pwc-${role}`}
            name="new-password-confirm"
            type="password"
            passwordVisibilityToggle
            label={tr('auth.forgot.confirmPw')}
            autoComplete="new-password"
            minLength={8}
            required
            labelClassName="text-base"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button type="submit" variant="primary" className="w-full" disabled={busy}>
            {busy ? tr('auth.forgot.saving') : tr('auth.forgot.save')}
          </Button>
        </form>
      </AuthCard>
    </section>
  )

  if (role === 'officer') {
    return (
      <GovPageSurface variant="institutional" topAccent className="min-h-full">
        {formInner}
      </GovPageSurface>
    )
  }

  return formInner
}
