import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import {
  findAccountByEmail,
  loadAccounts,
  persistedAccountMatchesExpectedRole,
} from '../../auth/storage'
import { AuthCard } from '../../components/auth/AuthCard'
import { Button } from '../../components/ui/Button'
import { useLocale } from '../../context/LocaleContext'
import { dashboardPath } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../../components/ui/Input'

export function AdminSignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, authShellEpoch } = useAuth()
  const { t } = useLocale()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const emailLookup = email.trim()
      setPassword((currentPw) => {
        if (currentPw.trim() !== '') return currentPw
        const acc = findAccountByEmail(loadAccounts(), emailLookup)
        if (!acc || !persistedAccountMatchesExpectedRole(acc, 'admin')) return currentPw
        return acc.password
      })
    }, 350)
    return () => window.clearTimeout(timer)
  }, [email])

  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  if (user) {
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setBusy(true)
    const res = login(email, password, 'admin')
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    const st = location.state as { from?: { pathname: string } } | undefined
    const from = st?.from?.pathname
    const safe =
      from &&
      from.startsWith('/') &&
      from.startsWith('/admin') &&
      !from.startsWith('/admin/sign-in')
    navigate(safe ? from : '/admin/dashboard', { replace: true })
  }

  return (
    <AuthCard
      title={t('auth.admin.title')}
      subtitle={t('auth.admin.subtitle')}
      footer={
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-sm text-slate-600">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md px-2 font-semibold text-[#1e293b] underline decoration-slate-400 underline-offset-2 hover:decoration-[#1e293b]"
          >
            {t('auth.home')}
          </Link>
          <span>
            {t('auth.admin.footerLead')}{' '}
            <Link
              className="inline-flex min-h-11 items-center font-semibold text-[#1e293b] underline"
              to="/"
            >
              {t('auth.admin.footerWelcomeLink')}
            </Link>
            .
          </span>
        </div>
      }
    >
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-left text-sm text-amber-950 ring-1 ring-amber-100">
        <span className="font-semibold">{t('auth.admin.demoLabel')}</span>{' '}
        <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs">
          admin@rentalpro.et
        </code>{' '}
        /{' '}
        <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs">
          ChangeMeAdmin!
        </code>
        {' '}{t('auth.admin.demoSeeded')}
      </p>
      <form
        className="mt-6 flex flex-col gap-5"
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
        <Input
          key={`adm-email-${authShellEpoch}`}
          name="email"
          type="email"
          label={t('auth.admin.workEmail')}
          autoComplete="username email"
          placeholder="you@agency.gov.et"
          required
          labelClassName="text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          key={`adm-pw-${authShellEpoch}`}
          name="password"
          type="password"
          passwordVisibilityToggle
          label={t('auth.admin.password')}
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          labelClassName="text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={busy}
        >
          {busy ? t('auth.admin.signingIn') : t('auth.signIn.cta')}
        </Button>
        <p className="text-center">
          <Link
            className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold text-[#1e293b] underline decoration-slate-400 underline-offset-2 hover:decoration-[#1e293b]"
            to="/admin/forgot-password"
          >
            {t('auth.forgot.link')}
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
