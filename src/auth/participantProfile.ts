export type DigitalIdVerificationStatus =
  | 'unverified'
  | 'pending_review'
  | 'verified_demo'

export const DIGITAL_ID_VERIFICATION_LABELS: Record<
  DigitalIdVerificationStatus,
  string
> = {
  unverified: 'Unverified',
  pending_review: 'Pending review (demo)',
  verified_demo: 'Verified (demo stub)',
}

export type UiLanguagePreference = 'en' | 'am'

export type ParticipantProfile = {
  legalFullName: string
  phone: string
  cityRegion: string
  /** Optional national ID reference — demo text only, not legal verification. */
  nationalIdRef: string
  /** Optional Fayda / digital ID external reference — demo only. */
  digitalIdFaydaRef: string
  digitalIdVerificationStatus: DigitalIdVerificationStatus
  emergencyContactName: string
  emergencyContactPhone: string
  /** UI language preference (tenant/landlord). */
  preferredLanguage: UiLanguagePreference
  /** Landlord-focused sub-city (Addis convention); optional demo field. */
  landlordSubCity: string
  /** ISO timestamp when profile fields were last saved. */
  profileUpdatedAt: string
  /** Set on sign-up when user accepts prototype consent (ISO). */
  demoConsentAcceptedAt: string | null
}

export type ParticipantRegistrationDraft = {
  legalFullName: string
  phone: string
  cityRegion: string
  nationalIdRef: string
  digitalIdFaydaRef: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export function createDefaultParticipantProfile(
  displayName: string,
): ParticipantProfile {
  const now = new Date().toISOString()
  const name = displayName.trim() || 'User'
  return {
    legalFullName: name,
    phone: '',
    cityRegion: '',
    nationalIdRef: '',
    digitalIdFaydaRef: '',
    digitalIdVerificationStatus: 'unverified',
    emergencyContactName: '',
    emergencyContactPhone: '',
    preferredLanguage: 'en',
    landlordSubCity: '',
    profileUpdatedAt: now,
    demoConsentAcceptedAt: null,
  }
}

export function profileFromRegistration(
  displayName: string,
  draft: ParticipantRegistrationDraft,
  consentIso: string,
): ParticipantProfile {
  const now = new Date().toISOString()
  const legal = draft.legalFullName.trim() || displayName.trim() || 'User'
  return {
    legalFullName: legal,
    phone: draft.phone.trim(),
    cityRegion: draft.cityRegion.trim(),
    nationalIdRef: draft.nationalIdRef.trim(),
    digitalIdFaydaRef: draft.digitalIdFaydaRef.trim(),
    digitalIdVerificationStatus: 'unverified',
    emergencyContactName: draft.emergencyContactName.trim(),
    emergencyContactPhone: draft.emergencyContactPhone.trim(),
    preferredLanguage: 'en',
    landlordSubCity: '',
    profileUpdatedAt: now,
    demoConsentAcceptedAt: consentIso,
  }
}

function isUiLanguagePreference(value: unknown): value is UiLanguagePreference {
  return value === 'en' || value === 'am'
}

function isDigitalIdVerificationStatus(
  value: unknown,
): value is DigitalIdVerificationStatus {
  return (
    value === 'unverified' ||
    value === 'pending_review' ||
    value === 'verified_demo'
  )
}

export function normalizeParticipantProfile(
  raw: unknown,
  displayName: string,
): ParticipantProfile {
  const base = createDefaultParticipantProfile(displayName)
  if (!raw || typeof raw !== 'object') return base
  const o = raw as Record<string, unknown>
  return {
    legalFullName:
      typeof o.legalFullName === 'string' && o.legalFullName.trim()
        ? o.legalFullName.trim()
        : base.legalFullName,
    phone: typeof o.phone === 'string' ? o.phone.trim() : base.phone,
    cityRegion:
      typeof o.cityRegion === 'string' ? o.cityRegion.trim() : base.cityRegion,
    nationalIdRef:
      typeof o.nationalIdRef === 'string'
        ? o.nationalIdRef.trim()
        : base.nationalIdRef,
    digitalIdFaydaRef:
      typeof o.digitalIdFaydaRef === 'string'
        ? o.digitalIdFaydaRef.trim()
        : base.digitalIdFaydaRef,
    digitalIdVerificationStatus: isDigitalIdVerificationStatus(
      o.digitalIdVerificationStatus,
    )
      ? o.digitalIdVerificationStatus
      : base.digitalIdVerificationStatus,
    emergencyContactName:
      typeof o.emergencyContactName === 'string'
        ? o.emergencyContactName.trim()
        : base.emergencyContactName,
    emergencyContactPhone:
      typeof o.emergencyContactPhone === 'string'
        ? o.emergencyContactPhone.trim()
        : base.emergencyContactPhone,
    profileUpdatedAt:
      typeof o.profileUpdatedAt === 'string' ? o.profileUpdatedAt : base.profileUpdatedAt,
    demoConsentAcceptedAt:
      o.demoConsentAcceptedAt === null
        ? null
        : typeof o.demoConsentAcceptedAt === 'string'
          ? o.demoConsentAcceptedAt
          : base.demoConsentAcceptedAt,
    preferredLanguage: isUiLanguagePreference(o.preferredLanguage)
      ? o.preferredLanguage
      : base.preferredLanguage,
    landlordSubCity:
      typeof o.landlordSubCity === 'string'
        ? o.landlordSubCity.trim()
        : base.landlordSubCity,
  }
}
