import { useState, type FormEvent } from 'react'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

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

type Mode = 'sign-in' | 'sign-up'

function postAuthPathname(
  role: PublicAuthRole,
  location: ReturnType<typeof useLocation>,
): string {
  const st = location.state as { from?: { pathname: string } } | undefined
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

export function PublicRoleAuthPage({ mode }: { mode: Mode }) {
  const { role: roleParam } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, register } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!roleParam || !isPublicAuthRole(roleParam)) {
    return <Navigate to="/" replace />
  }

  if (user) {
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  const role: PublicAuthRole = roleParam
  const label = ROLE_LABELS[role]

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

    const res = register(
      email,
      password,
      passwordConfirm,
      displayName,
      role,
    )
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
              : `Register as ${label.toLowerCase()}. You can choose other roles separately with another email later if needed.`
          }
          footer={
            <p className="text-center text-sm text-slate-600">
              {mode === 'sign-in' ? (
                <>
                  New here?{' '}
                  <Link
                    className="font-semibold text-[#1e293b] underline"
                    to={`/auth/${role}/sign-up`}
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <Link
                    className="font-semibold text-[#1e293b] underline"
                    to={`/auth/${role}/sign-in`}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>
          }
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {error ? (
              <p
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-100"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {mode === 'sign-up' ? (
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
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              placeholder={`you@example.com (${label})`}
              labelClassName="text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
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
              {busy
                ? 'Please wait…'
                : mode === 'sign-in'
                  ? 'Sign in'
                  : 'Create account'}
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-500">
            Demo auth stores accounts in your browser — use a fake email/password
            to try flows. Hook your API later by replacing{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5">login</code> /{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5">register</code>{' '}
            in <code className="rounded bg-slate-100 px-1 py-0.5">
              AuthContext
            </code>
            .
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
