import { useEffect, useMemo, useReducer } from 'react'

import type { ParticipantProfile } from '../auth/participantProfile'
import { findAccountById, loadAccounts } from '../auth/storage'
import { useAuth } from './useAuth'

/** Same-tab reload signal after ParticipantProfile saves (preferences only). */
export const PROFILE_REFRESH_EVENT = 'rp-profile-update'

/** Reads persisted profile preferences for participant accounts (tenant/landlord/officer/admin). */
export function useParticipantProfileSnapshot(): ParticipantProfile | null {
  const { user } = useAuth()
  const [tick, bump] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    function onBump() {
      bump()
    }
    window.addEventListener(PROFILE_REFRESH_EVENT, onBump)
    return () => window.removeEventListener(PROFILE_REFRESH_EVENT, onBump)
  }, [])

  return useMemo(() => {
    // Re-run when PROFILE_REFRESH_EVENT bumps tick (same-tab profile saves).
    void tick
    if (!user?.id) return null
    return findAccountById(loadAccounts(), user.id)?.participantProfile ?? null
  }, [user?.id, tick])
}

