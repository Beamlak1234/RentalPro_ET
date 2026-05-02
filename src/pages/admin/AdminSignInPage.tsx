import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { AuthCard } from '../../components/auth/AuthCard'
import { Button } from '../../components/ui/Button'
import { dashboardPath } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../../components/ui/Input'

export function AdminSignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

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
      title="Admin sign-in"
      subtitle="Privileged access. No public registration — accounts are issued by your organization."
      footer={
        <p className="text-center text-sm text-slate-500">
          Need tenant, landlord, or officer access?{' '}
          <Link className="font-medium text-[#1e293b] underline" to="/">
            Go to welcome
          </Link>
          .
        </p>
      }
    >
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-left text-sm text-amber-950 ring-1 ring-amber-100">
        <span className="font-semibold">Demo admin account:</span>{' '}
        <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs">
          admin@rentalpro.et
        </code>{' '}
        /{' '}
        <code className="rounded bg-white/80 px-1.5 py-0.5 text-xs">
          ChangeMeAdmin!
        </code>
        {' — seeded on first load in browser storage.'}
      </p>
      <form
        className="mt-6 flex flex-col gap-5"
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
          name="email"
          type="email"
          label="Work email"
          autoComplete="email"
          placeholder="you@agency.gov.et"
          required
          labelClassName="text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          label="Password"
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
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthCard>
  )
}
