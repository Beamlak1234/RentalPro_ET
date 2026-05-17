import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

/**
 * Inline errors from demo auth stay English-only (technical).
 * Prototype disclaimers marked **EN-only**: leave `am` empty so `t()` falls back to EN.
 */
export const AUTH_MESSAGES = {
  'auth.home': {
    en: 'Home',
    am: 'መነሻ',
  },
  'auth.cardTitle.signIn': {
    en: 'Sign in — {{role}}',
    am: 'መግቢያ — {{role}}',
  },
  'auth.cardTitle.signUp': {
    en: 'Create account — {{role}}',
    am: 'መለያ ልስሳ — {{role}}',
  },
  'auth.subtitle.signIn': {
    en: 'Welcome back. Use the email you registered for this role.',
    am: 'እንኳን በደህና መጡ። ለዚህ ሚና የተመዘገቡልዎ የኢሜይል አድራሻ ይጠቀሙ።',
  },
  'auth.subtitle.officerSignup': {
    en: 'Register as an officer. Officer access stays isolated from tenant / landlord—even if someone rents and lets out property, they still need a separate officer credential in this demo.',
    am: '',
  },
  'auth.subtitle.participantSignup': {
    en: 'Register as a participant. Already have the other participant workspace? Use the same email + password and complete the form again—this demo merges tenant + landlord into one account.',
    am: '',
  },
  'auth.footer.officerPortal': {
    en: 'Officer portal briefing',
    am: '',
  },
  'auth.switch.newPrefix': {
    en: 'New here?',
    am: 'አዲስ ነዎት?',
  },
  'auth.switch.createAccount': {
    en: 'Create an account',
    am: '',
  },
  'auth.switch.registeredPrefix': {
    en: 'Already registered?',
    am: '',
  },
  'auth.switch.signIn': {
    en: 'Sign in',
    am: 'ግባ',
  },
  /** EN-only regulated-style copy — fallback keeps English for `am`. */
  'auth.banner.govDesk': {
    en:
      'Government desk context. Tenant and landlord accounts use participant credentials stored and managed separately from your officer workstation. Signing in here is for personal rental enrolment—not for acting on behalf of regulated review inside the officer console.',
    am: '',
  },
  'auth.banner.prototype': {
    en:
      'Prototype only. Data stays in this browser profile (localStorage) and is not legal identity verification. Do not paste real scanned ID or full national ID strings if you wouldn’t paste them elsewhere.',
    am: '',
  },
  'auth.legal.fullName': {
    en: 'Legal / full name',
    am: '',
  },
  'auth.phone': {
    en: 'Phone',
    am: '',
  },
  'auth.cityRegion': {
    en: 'City / region',
    am: '',
  },
  'auth.nationalIdOptional': {
    en: 'National ID reference (optional)',
    am: '',
  },
  'auth.faydaOptional': {
    en: 'Digital ID / Fayda reference (optional)',
    am: '',
  },
  'auth.emergencySection': {
    en: 'Emergency contact (optional)',
    am: '',
  },
  'auth.nameGeneric': {
    en: 'Name',
    am: '',
  },
  /** EN-only legal-style consent paragraph */
  'auth.consent.checkbox': {
    en:
      'I understand this is a prototype: my details are saved only in demo browser storage, are not authenticated by RentalPro ET or government systems, and I will not rely on them as legal proofs.',
    am: '',
  },
  'auth.officer.displayName': {
    en: 'Full name',
    am: '',
  },
  'auth.email': {
    en: 'Email',
    am: '',
  },
  'auth.password': {
    en: 'Password',
    am: '',
  },
  'auth.confirmPassword': {
    en: 'Confirm password',
    am: '',
  },
  'auth.wait': {
    en: 'Please wait…',
    am: '',
  },
  'auth.signIn.cta': {
    en: 'Sign in',
    am: '',
  },
  'auth.signUp.cta': {
    en: 'Create account',
    am: '',
  },
  'auth.forgot.link': {
    en: 'Forgot password?',
    am: '',
  },
  'auth.demo.note': {
    en: 'Demo auth stores accounts in your browser — use fake credentials to try flows.',
    am: '',
  },
  'auth.admin.title': {
    en: 'Admin sign-in',
    am: '',
  },
  'auth.admin.subtitle': {
    en: 'Privileged access. No public registration — accounts are issued by your organization.',
    am: '',
  },
  'auth.admin.demoLabel': {
    en: 'Demo admin account:',
    am: '',
  },
  'auth.admin.demoSeeded': {
    en: '— seeded on first load in browser storage.',
    am: '',
  },
  'auth.admin.footerLead': {
    en: 'Participant / officer access starts on',
    am: '',
  },
  'auth.admin.footerWelcomeLink': {
    en: 'the welcome page',
    am: '',
  },
  'auth.admin.workEmail': {
    en: 'Work email',
    am: '',
  },
  'auth.admin.signingIn': {
    en: 'Signing in…',
    am: '',
  },
  'auth.admin.password': {
    en: 'Password',
    am: '',
  },
  /* forgot public */
  'auth.forgot.resetTitle': {
    en: 'Reset password — {{role}}',
    am: '',
  },
  'auth.forgot.publicSubtitle': {
    en:
      'Demo only: resets the plaintext credentials stored locally in your browser profiles—no SMS or secure email verification.',
    am: '',
  },
  'auth.forgot.backSignIn': {
    en: 'Back to sign in',
    am: '',
  },
  'auth.forgot.registeredEmail': {
    en: 'Registered email',
    am: '',
  },
  'auth.forgot.newPw': {
    en: 'New password',
    am: '',
  },
  'auth.forgot.confirmPw': {
    en: 'Confirm new password',
    am: '',
  },
  'auth.forgot.save': {
    en: 'Update demo password',
    am: '',
  },
  'auth.forgot.saving': {
    en: 'Saving…',
    am: '',
  },
  /** EN-only security notice */
  'auth.forgot.prototypeWarning': {
    en:
      'Prototype only. Anyone with this browser profile could change stored passwords exactly like signing in—do not confuse this with regulated identity recovery pipelines.',
    am: '',
  },
  'auth.placeholder.legal': {
    en: 'Match how you identify on formal documents — demo text',
    am: '',
  },
  'auth.placeholder.nationalId': {
    en: 'Masked or abbreviated reference — demo only',
    am: '',
  },
  'auth.placeholder.emailRole': {
    en: '{{roleEmail}} — {{roleHint}}',
    am: '{{roleHint}} ውስጥ {{roleEmail}}',
  },
  'auth.admin.forgot.title': {
    en: 'Reset admin password (demo)',
    am: '',
  },
  'auth.admin.forgot.subtitle': {
    en: 'Writes directly to seeded browser-local admin accounts — no OTP or audited recovery.',
    am: '',
  },
  'auth.admin.forgot.back': {
    en: 'Back to admin sign in',
    am: '',
  },
  'auth.admin.forgot.updateCred': {
    en: 'Update seeded admin credential',
    am: '',
  },
  'auth.admin.forgot.updating': {
    en: 'Updating…',
    am: '',
  },
  /** EN-only */
  'auth.admin.forgot.productionNote': {
    en:
      'Production note. Replace this path with audited identity federation before granting real operational access.',
    am: '',
  },
} satisfies Record<string, Entry>
