import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { dashboardPath, signInPathForRole, type AuthRole } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute({
  role,
  children,
}: {
  role: AuthRole
  children: ReactNode
}) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return (
      <Navigate to={signInPathForRole(role)} replace state={{ from: location }} />
    )
  }

  if (user.role !== role) {
    return <Navigate to={dashboardPath(user.role)} replace />
  }

  return <>{children}</>
}
