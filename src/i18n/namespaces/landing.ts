import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

export const LANDING_MESSAGES = {
  'landing.ethiopiaSubtitle': {
    en: 'Ethiopia rental platform',
    am: 'የኢትዮጵያ ኪራይ ድልድል መርሃ ግብር',
  },
  'landing.heroTitle': {
    en: 'Welcome to RentalPro ET',
    am: 'እንኳን ወደ RentalPro ET በደህና መጡ',
  },
  'landing.heroBody': {
    en: 'For tenants and landlords — clear rental workflows on desktop or mobile.',
    am: 'ለኪራይተኞችናለቤተኞች በኮምፒዩተርናበስልት ስልክ ምቹ የኪራይ ሂደት።',
  },
  'landing.heroGovNote': {
    en: 'Government officers use a separate workspace (bookmark or institution-issued entry). This page is only for tenant and landlord self-service.',
    am: '',
  },
  'landing.ctaPrimary': {
    en: 'Tenant or landlord — get started',
    am: '',
  },
  'landing.ctaSecondary': {
    en: 'Learn more below',
    am: '',
  },
  'landing.rolesHeading': {
    en: 'Tenant or landlord — choose one',
    am: 'ኪራይተኛ ወይም ቤተኛ — አንዱን ይምረጡ',
  },
  'landing.rolesBody': {
    en: 'We route you to the matching sign-up or sign-in flow. Officers use ',
    am: '',
  },
  'landing.rolesBodyOfficerLink': {
    en: 'officer sign-in',
    am: 'የመንግስት ሠራተኛ መግቢያ',
  },
  'landing.rolesBodySuffix': {
    en: ' (not linked from the main navigation for participants).',
    am: '።',
  },
  'landing.cardTenant.title': {
    en: 'Tenant',
    am: 'ኪራይተኛ',
  },
  'landing.cardTenant.description': {
    en: 'Browse listings, submit applications, and manage your tenancy from your phone.',
    am: 'ዝርዝሮች ይመልከቱ፣ እንዲሞሉ ይላኩ፣ ቤትዎን ከስልክ ይመሩ።',
  },
  'landing.cardLandlord.title': {
    en: 'Landlord',
    am: 'ቤተኛ (አከራይ)',
  },
  'landing.cardLandlord.description': {
    en: 'List properties, screen applicants, and keep rental records organized.',
    am: '',
  },
  'landing.signIn': {
    en: 'Sign in',
    am: 'ግባ',
  },
  'landing.createAccount': {
    en: 'Create account',
    am: '',
  },
} satisfies Record<string, Entry>
