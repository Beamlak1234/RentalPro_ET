import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from './useAuth'

/**
 * Intentional sign-out: sets `isSigningOut` so ProtectedRoute sends users to `/`
 * instead of `/auth/<role>/sign-in` during the brief window where `user` is null
 * but the router has not finished moving off a protected path.
 */
export function useSignOutToHome() {
  const navigate = useNavigate()
  const { logout, startSigningOut, clearSigningOut } = useAuth()

  return useCallback(() => {
    startSigningOut()
    try {
      navigate('/', { replace: true })
    } catch {
      clearSigningOut()
      return
    }
    window.setTimeout(() => {
      try {
        logout()
      } catch {
        clearSigningOut()
      }
    }, 0)
  }, [clearSigningOut, logout, navigate, startSigningOut])
}
