import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

export const ADMIN_MESSAGES = {
  'admin.brand': {
    en: 'RentalPro ET',
    am: 'RentalPro ET',
  },
  'admin.suffix': {
    en: ' · Admin',
    am: ' · አስተዳዳር',
  },
  'admin.backToSite': {
    en: 'Back to site',
    am: 'ወደ ጣቢያ ይመለሱ',
  },
  'admin.signOut': {
    en: 'Sign out',
    am: 'ውጣ',
  },
  'admin.navOverview': {
    en: 'Overview',
    am: 'አጠቃላይ',
  },
  'admin.navUsers': {
    en: 'Users',
    am: 'ተጠቃሚዎች',
  },
  'admin.navConfig': {
    en: 'Configuration',
    am: 'ቅንብሮች',
  },
  'admin.navSubcities': {
    en: 'Sub-cities',
    am: 'ክፍለ ከተሞች',
  },
  'admin.navSynthetic': {
    en: 'Synthetic data',
    am: 'ሰዋሰው መረጃ',
  },
  'admin.navAria': {
    en: 'Admin',
    am: 'አስተዳዳር',
  },
} satisfies Record<string, Entry>
