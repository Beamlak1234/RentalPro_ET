import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import {
  dashboardPath,
  signInPathForRole,
  type AuthRole,
} from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { enqueueAccessFlashBanner } from '../../navigation/pendingAccessFlash'

function wrongRoleBannerMessage(
  required: AuthRole,
  viewer: AuthRole,
): string {
  const participantPair =
    (required === 'tenant' || required === 'landlord') &&
    (viewer === 'tenant' || viewer === 'landlord')

  if (participantPair && required !== viewer) {
    return 'That area belongs to your other participant workspace—use Tenant / Landlord workspace switch above, then reopen the link.'
  }

  if (viewer === 'officer' && (required === 'tenant' || required === 'landlord')) {
    return 'Tenant and landlord self-service stays on the participant welcome flow. Sign out of the officer desk first if you intentionally need participant tools.'
  }

  if (
    (viewer === 'tenant' || viewer === 'landlord') &&
    (required === 'officer')
  ) {
    return 'This officer dashboard and review tools are limited to authorised government officer accounts.'
  }

  if (viewer === 'admin') {
    return 'Platform admins should open /admin—for demo tenant, landlord, or officer workspaces use a matching account.'
  }

  return 'You do not have access to this page with your active role.'
}

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
    enqueueAccessFlashBanner(wrongRoleBannerMessage(role, user.role))

    return <Navigate to={dashboardPath(user.role)} replace />
  }

  return <>{children}</>
}
