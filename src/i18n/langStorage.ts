import type { UiLanguagePreference } from '../auth/participantProfile'

/** Guest / officer / admin UI language persisted when profile preference does not apply. */
export const UI_LANG_STORAGE_KEY = 'rp_et_ui_lang_v1'

export function readStoredUiLang(): UiLanguagePreference | null {
  try {
    const raw = localStorage.getItem(UI_LANG_STORAGE_KEY)
    if (raw === 'am' || raw === 'en') return raw
  } catch {
    /* ignore */
  }
  return null
}

export function writeStoredUiLang(lang: UiLanguagePreference): void {
  try {
    localStorage.setItem(UI_LANG_STORAGE_KEY, lang)
  } catch {
    /* ignore */
  }
}
