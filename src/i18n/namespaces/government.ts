import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

/** Government welcome — full-sentence keys to avoid brittle inline composition. */
export const GOVERNMENT_MESSAGES = {
  'gov.officialChannel': {
    en: 'Official access channel',
    am: 'የኦፊሴል መግቢያ',
  },
  'gov.portalTitle': {
    en: 'Government officer portal',
    am: 'የመንግስት ሠራተኛ መግቢያ',
  },
  'gov.portalLeadBefore': {
    en: 'This entry is reserved for authorised public-sector users who supervise rental transparency, verify compliance, and coordinate regulatory workflows. Tenant and landlord self-service remains on the ',
    am: '',
  },
  'gov.portalLeadLink': {
    en: 'public welcome page',
    am: 'የህዝብ መነሻ መንገድ',
  },
  'gov.portalLeadAfter': {
    en: '.',
    am: '.',
  },
  'gov.signInHeading': {
    en: 'Sign in or register as an officer',
    am: 'ምዝገባ ወይም መግቢያ እንደ ሠራተኛ',
  },
  'gov.signInBody': {
    en: 'Use your issued credentials where applicable. In this demo, officers self-register like other roles; production systems often restrict onboarding to invitation or federation—swap the auth backend when you integrate.',
    am: '',
  },
  'gov.signedInBadge': {
    en: 'Signed in',
    am: '',
  },
  'gov.signedInOfficerMid': {
    en: ' as officer — open the prototype ',
    am: '',
  },
  'gov.signedInOfficerTail': {
    en: ' for read-only browse of demo registrations in this browser.',
    am: '',
  },
  'gov.directoryLink': {
    en: 'tenant & landlord participant directory',
    am: 'የኪራይተኛናቤተኛ ማውጫ',
  },
  'gov.restrictedBold': {
    en: 'Restricted while signed in.',
    am: '',
  },
  'gov.restrictedBody': {
    en: 'As a participant you can read this briefing, but officer sign-on is limited to authorised government officer accounts.',
    am: '',
  },
  'gov.returnWorkspace': {
    en: 'Return to your workspace',
    am: 'ወደ ስራ አካባቢዎ ይመለሱ',
  },
  'gov.signOutHint': {
    en: 'or sign out completely before creating an officer demo account.',
    am: '',
  },
  'gov.staffFootnote.before': {
    en: 'Administrative platform staff use ',
    am: '',
  },
  'gov.staffFootnote.after': {
    en: ' — separate from officer access.',
    am: '',
  },
  'gov.officerSignIn': {
    en: 'Officer sign in',
    am: 'የሠራተኛ መግቢያ',
  },
  'gov.createOfficer': {
    en: 'Create officer account',
    am: 'የሠራተኛ መለያ ፍጠር',
  },
  'gov.staffAdminLink': {
    en: 'Staff / admin login',
    am: 'የባለሙያ / አስተዳዳር መግቢያ',
  },
} satisfies Record<string, Entry>
