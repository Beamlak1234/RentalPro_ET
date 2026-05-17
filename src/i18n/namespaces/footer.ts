import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

export const FOOTER_MESSAGES = {
  'footer.brand': {
    en: 'RentalPro ET',
    am: 'RentalPro ET',
  },
  'footer.intro': {
    en: 'A digital platform for transparent rental management in Ethiopia — public access for tenants and landlords; separate entry for authorised officers and staff.',
    am: '',
  },
  'footer.product': {
    en: 'Product',
    am: 'ምርት',
  },
  'footer.welcome': {
    en: 'Welcome',
    am: 'እንኳን ደህና መጡ',
  },
  'footer.signupTeaser': {
    en: 'Tenant & landlord signup',
    am: 'የኪራይተኛ እና ቤተኛ ምዝገባ',
  },
  'footer.officerSignInLink': {
    en: 'Officer sign-in',
    am: 'የመንግስት ሠራተኛ መግቢያ',
  },
  'footer.legal': {
    en: 'Legal',
    am: 'ህጋዊ',
  },
  'footer.privacy': {
    en: 'Privacy (coming soon)',
    am: 'የግላዊነት (በመዘጋጀት ላይ)',
  },
  'footer.terms': {
    en: 'Terms (coming soon)',
    am: 'ደንቦች (በመዘጋጀት ላይ)',
  },
  'footer.contact': {
    en: 'Contact',
    am: 'አድራሻ',
  },
  'footer.operatorLead': {
    en: 'Platform operator',
    am: 'የመድረክ ኦፕሬተር',
  },
  'footer.operatorTag': {
    en: '(placeholder):',
    am: '(placeholder):',
  },
  'footer.operatorBody': {
    en: 'RentalPro ET program office, on behalf of [Ministry / Regional housing authority — TBD].',
    am: '',
  },
  'footer.supportPlaceholder': {
    en: '(placeholder)',
    am: '(ፕሌይስሆልደር)',
  },
  'footer.phoneTbd': {
    en: '+251 … — TBD',
    am: '+251 … — እስኪታዘስ',
  },
  'footer.hoursTbd': {
    en: 'Hours: TBD',
    am: 'ሰዓት: እስኪታዘስ',
  },
  'footer.govNote': {
    en: 'Government officers should use institution-issued channels, not this public mailbox. Officer workspace sign-in:',
    am: 'የመንግስት ሠራተኞች የተላከን ሰርጥ ይጠቀሙ። የመስሪያ ሥፍራ:',
  },
  'footer.moreContact': {
    en: 'More contact details',
    am: '',
  },
  'footer.staffAdmin': {
    en: 'Staff / admin login',
    am: 'የባለሙያ / አስተዳዳር መግቢያ',
  },
  'footer.copyright': {
    en: '© {{year}} RentalPro ET. All rights reserved.',
    am: '© {{year}} RentalPro ET። መብት የተጠበቀ ነው።',
  },
} satisfies Record<string, Entry>
