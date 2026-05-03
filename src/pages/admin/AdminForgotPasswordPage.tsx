import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { updatePersistedPasswordForRoleDemo } from '../../auth/storage'
import { AuthCard } from '../../components/auth/AuthCard'
import { Button } from '../../components/ui/Button'
import { dashboardPath } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '../../components/ui/Input'
import { enqueueAccessFlashBanner } from '../../navigation/pendingAccessFlash'

export function AdminForgotPasswordPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (user?.role === 'admin') {
    enqueueAccessFlashBanner(
      'You are already signed in as admin — open Dashboard or sign out before demo password reset.',
    )
    return <Navigate to="/admin/dashboard" replace />
  }

  if (user) {
    enqueueAccessFlashBanner(
      'Use participant or officer workspaces for tenant/landlord/officer resets. This lane is admins only.',
    )
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setBusy(true)
    const res = updatePersistedPasswordForRoleDemo({
      email,
      expectedRole: 'admin',
      newPassword,
      passwordConfirm: confirm,
    })
    setBusy(false)
    if (!res.ok) {
      setError(res.error)
      return
    }

    enqueueAccessFlashBanner(
      'Admin demo password updated in local storage — sign in with the new credential.',
    )
    navigate('/admin/sign-in', { replace: true })
  }

  return (
    <AuthCard
      title="Reset admin password (demo)"
      subtitle="Writes directly to seeded browser-local admin accounts — no OTP or audited recovery."
      footer={
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-sm text-slate-600">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-md px-2 font-semibold text-[#1e293b] underline decoration-slate-400 underline-offset-2 hover:decoration-[#1e293b]"
          >
            Home
          </Link>
          <Link
            className="inline-flex min-h-11 items-center font-semibold text-[#1e293b] underline"
            to="/admin/sign-in"
          >
            Back to admin sign in
          </Link>
        </div>
      }
    >
      <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-xs leading-relaxed text-amber-950 ring-1 ring-amber-100 sm:text-sm">
        <strong className="font-semibold">Production note.</strong> Replace this
        path with audited identity federation before granting real operational
        access.
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
          name="admin-reset-email"
          type="email"
          label="Work email"
          autoComplete="username email"
          required
          labelClassName="text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="admin-new-password"
          type="password"
          label="New password"
          autoComplete="new-password"
          minLength={8}
          required
          labelClassName="text-base"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          name="admin-new-password-confirm"
          type="password"
          label="Confirm new password"
          autoComplete="new-password"
          minLength={8}
          required
          labelClassName="text-base"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full" disabled={busy}>
          {busy ? 'Updating…' : 'Update seeded admin credential'}
        </Button>
      </form>
    </AuthCard>
  )
}
