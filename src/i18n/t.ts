import type { UiLanguagePreference } from '../auth/participantProfile'

import { ADMIN_MESSAGES } from './namespaces/admin'
import { AUTH_MESSAGES } from './namespaces/auth'
import { COMMON_MESSAGES } from './namespaces/common'
import { FOOTER_MESSAGES } from './namespaces/footer'
import { GOVERNMENT_MESSAGES } from './namespaces/government'
import { LANDING_MESSAGES } from './namespaces/landing'
import { OFFICER_MESSAGES } from './namespaces/officer'
import { TENANT_MESSAGES } from './namespaces/tenant'

export const MESSAGES = {
  ...COMMON_MESSAGES,
  ...FOOTER_MESSAGES,
  ...LANDING_MESSAGES,
  ...GOVERNMENT_MESSAGES,
  ...AUTH_MESSAGES,
  ...TENANT_MESSAGES,
  ...OFFICER_MESSAGES,
  ...ADMIN_MESSAGES,
} as const

export type MessageId = keyof typeof MESSAGES

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const v = vars[key]
    return v != null ? String(v) : ''
  })
}

/** Empty/non-whitespace `am`/`en` segments fall back to English for incremental translation. */
export function t(lang: UiLanguagePreference, id: MessageId): string {
  const row = MESSAGES[id]
  const primary = row[lang]?.trim?.() ?? ''
  if (primary.length > 0) return row[lang]
  return row.en
}

export function tInterpolate(
  lang: UiLanguagePreference,
  id: MessageId,
  vars: Record<string, string | number>,
): string {
  return interpolate(t(lang, id), vars)
}
