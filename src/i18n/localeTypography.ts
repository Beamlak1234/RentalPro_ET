import type { UiLanguagePreference } from '../auth/participantProfile'

/**
 * Geʽez / Amharic reads poorly with Tailwind “micro label” patterns meant for Latin:
 * `uppercase` + `tracking-*`. Use these helpers to switch styles by `UiLanguagePreference`.
 */

/** Replace `uppercase tracking-wide` (and custom tracking) with neutral casing for አማርኛ. */
export function localeCapsTracking(lang: UiLanguagePreference): string {
  return lang === 'am' ? 'normal-case tracking-normal' : 'uppercase tracking-wide'
}

/** Dashboard banner meta line (“Signed in …”): avoid single-line truncation in Amharic. */
export function localeBannerMetaLineClass(lang: UiLanguagePreference): string {
  return lang === 'am' ?
      'line-clamp-2 min-w-0 break-words leading-relaxed [overflow-wrap:anywhere]'
    : 'truncate'
}

/** Name + email: allow wrapping in Amharic; keep compact single line in EN. */
export function localeBannerIdentityLineClass(lang: UiLanguagePreference): string {
  return lang === 'am' ?
      'break-words [overflow-wrap:anywhere] leading-snug'
    : 'truncate'
}

/** Wrapped paragraph / subtitle copy in አማርኛ */
export function localeAmharicBody(lang: UiLanguagePreference): string {
  return lang === 'am' ? 'leading-relaxed break-words [overflow-wrap:anywhere]' : ''
}
