import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'

import type { UiLanguagePreference } from '../auth/participantProfile'
import { readStoredUiLang, writeStoredUiLang } from '../i18n/langStorage'
import { type MessageId, t } from '../i18n/t'

import { useAuth } from '../hooks/useAuth'
import {
  PROFILE_REFRESH_EVENT,
  useParticipantProfileSnapshot,
} from '../hooks/useParticipantUiPrefs'

/**
 * Active UI language resolution:
 *
 * — Tenant + landlord participants: ALWAYS use persisted `participantProfile.preferredLanguage`
 *   (header toggle updates profile + fires PROFILE_REFRESH_EVENT).
 * — Everyone else (signed-out, officer, admin): use localStorage (`rp_et_ui_lang_v1`),
 *   re-read after each explicit toggle (small reducer tick so React re-renders).
 *
 * Participant profile wins whenever it applies — guest storage is ignored for that session
 * until they sign out, then `readStoredUiLang()` applies on the next render.
 */

type LocaleCtx = {
  lang: UiLanguagePreference
  /** Respects precedence above (persisted profile vs rp_et_ui_lang_v1). */
  setLang: (next: UiLanguagePreference) => void
  t: (id: MessageId) => string
  /** Participant profile preference drives tenant/landlord header toggle (stored on account). */
  usesParticipantPreferredLanguage: boolean
}

const LocaleContext = createContext<LocaleCtx | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { user, updateParticipantProfile } = useAuth()
  const profile = useParticipantProfileSnapshot()

  const participantUsesPreferred =
    Boolean(
      user?.participantEntitlements &&
        (user.role === 'tenant' || user.role === 'landlord'),
    )

  const profileLang: UiLanguagePreference =
    profile?.preferredLanguage === 'am' ? 'am' : 'en'

  const [guestTick, bumpGuestTick] = useReducer((x: number) => x + 1, 0)

  const lang: UiLanguagePreference = participantUsesPreferred ?
    profileLang
  : (() => {
      void guestTick
      return readStoredUiLang() ?? 'en'
    })()

  useEffect(() => {
    document.documentElement.lang = lang === 'am' ? 'am' : 'en'
  }, [lang])

  const setLang = useCallback(
    (next: UiLanguagePreference) => {
      if (participantUsesPreferred) {
        const res = updateParticipantProfile({
          preferredLanguage: next,
        })
        if (res.ok) {
          window.dispatchEvent(new Event(PROFILE_REFRESH_EVENT))
        }
        return
      }
      writeStoredUiLang(next)
      bumpGuestTick()
    },
    [participantUsesPreferred, updateParticipantProfile],
  )

  const translate = useCallback((id: MessageId) => t(lang, id), [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translate,
      usesParticipantPreferredLanguage: participantUsesPreferred,
    }),
    [lang, setLang, translate, participantUsesPreferred],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- hook tightly coupled to this provider bundle
export function useLocale(): LocaleCtx {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}
