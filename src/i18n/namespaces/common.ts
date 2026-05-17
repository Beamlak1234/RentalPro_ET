import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

export const COMMON_MESSAGES = {
  'common.home': {
    en: 'Home',
    am: 'መነሻ',
  },
  'common.chooseRole': {
    en: 'Choose role',
    am: 'የሚፈልጉትን ሚና ይምረጡ',
  },
  'common.government': {
    en: 'Government',
    am: 'መንግስት',
  },
  'common.dashboard': {
    en: 'Dashboard',
    am: 'ዳሽቦርድ',
  },
  'common.profile': {
    en: 'Profile',
    am: 'መገለጫ',
  },
  'common.alerts': {
    en: 'Alerts',
    am: 'ማስጠንቀቂያዎች',
  },
  'common.properties': {
    en: 'Properties',
    am: 'ንብረቶች',
  },
  'common.contracts': {
    en: 'Contracts',
    am: 'ኮንትራቶች',
  },
  'common.reports': {
    en: 'Reports',
    am: 'ሪፖርቶች',
  },
  'common.inbox': {
    en: 'Inbox',
    am: 'መልዕክት ሳጥን',
  },
  'common.signOut': {
    en: 'Sign out',
    am: 'ውጣ',
  },
  'common.help': {
    en: 'Help',
    am: 'እርዳታ',
  },
  'common.openMenu': {
    en: 'Open menu',
    am: 'መነጽር ክፈት',
  },
  'common.closeMenu': {
    en: 'Close menu',
    am: 'መነጽር ዝጋ',
  },
  'common.workspaceLabel': {
    en: 'Workspace',
    am: 'የስራ ቦታ',
  },
  'common.workspaceSwitchTenant': {
    en: 'Tenant',
    am: 'ኪራይተኛ',
  },
  'common.workspaceSwitchLandlord': {
    en: 'Landlord',
    am: 'ቤተኛ (አከራይ)',
  },
  'common.workspaceSwitchAria': {
    en: 'Switch between tenant and landlord workspace',
    am: 'በኪራይተኛ እና በቤተኛ መስሪያ በኩል ቀይር',
  },
  'common.mobileWorkspaceHint': {
    en: 'Switch workspace before opening the other menus.',
    am: 'ሌሎቹን ምናሌዎች ከመክፈትዎ በፊት የስራ ቦታውን ቀያይሩ።',
  },
  'common.participants': {
    en: 'Participants',
    am: 'ተሳተፊዎች',
  },
  'common.propsReview': {
    en: 'Props review',
    am: 'ንብረት ግምገማ',
  },
  'common.contractsReview': {
    en: 'Contracts review',
    am: 'ኮንትራት ግምገማ',
  },
  'common.map': {
    en: 'Map',
    am: 'ካርታ',
  },
  'common.language': {
    en: 'Language',
    am: 'ቋንቋ',
  },
  'common.langEnglish': {
    en: 'English',
    am: 'English',
  },
  'common.langAmharic': {
    en: 'አማርኛ',
    am: 'አማርኛ',
  },
  'common.roleTenant': {
    en: 'Tenant',
    am: 'ኪራይተኛ',
  },
  'common.roleLandlord': {
    en: 'Landlord',
    am: 'ቤተኛ (አከራይ)',
  },
  'common.roleOfficer': {
    en: 'Government officer',
    am: 'የመንግስት ሰራተኛ',
  },
  'common.roleAdmin': {
    en: 'Admin',
    am: 'አስተዳዳር',
  },
  'common.signedInAs': {
    en: 'Signed in • {{role}}',
    am: 'የገቡ • {{role}}',
  },
  'common.dualWorkspaceHint': {
    en: 'Tenant + landlord share this demo login. Routes follow the workspace you pick from the {{workspace}} control in the site header — swap there before hopping between tenant and landlord tools.',
    am: 'ኪራይተኛና ቤተኛ በዚህ ሙከራ አንድ መግቢያ ይጋራሉ። በራስዎ የሚመሩት የስራ ቦታ ከመሪው {{workspace}} ቁጥጥር እንደተመረጠ ይሰራል — በመሳሪያዎቹ መካከል ከመዝዋዋርዎ በፊት እዚያ ቀያይሩ።',
  },
  'common.landlord.title': {
    en: 'Landlord workspace',
    am: 'የቤተኛ መስሪያ ቦታ',
  },
  'common.landlord.subtitle': {
    en: 'Demo portfolio metrics — data is static until you wire an API.',
    am: 'የሙከራ መጠን — መረጃ እስኪገናኝ ድረስ ተወራጅ ነው።',
  },
  'common.landlord.myProperties': {
    en: 'My properties',
    am: 'የእኔ ንብረቶች',
  },
  'common.landlord.unitsTotal': {
    en: '{{count}} units total',
    am: 'ጠቅላላ {{count}} ክፍሎች',
  },
  'common.landlord.manage': {
    en: 'Manage',
    am: 'አስተዳድር',
  },
  'common.landlord.contracts': {
    en: 'Contracts',
    am: 'ኮንትራቶች',
  },
  'common.landlord.pendingSignature': {
    en: 'Pending / amendment',
    am: 'በመጠበቅ ላይ / ማሻሻያ',
  },
  'common.landlord.openQueue': {
    en: 'Open queue',
    am: 'ሰርስሮ ይመልከቱ',
  },
  'common.landlord.notifications': {
    en: 'Notifications',
    am: 'ማስታወቂያዎች',
  },
  'common.landlord.recentUpdates': {
    en: 'Recent updates',
    am: 'በቅርብ የተዘመኑ',
  },
  'common.landlord.viewInbox': {
    en: 'View inbox →',
    am: 'መልዕክት ሳጥን →',
  },
  'common.landlord.pendingContractsHeading': {
    en: 'Pending contracts',
    am: 'በመጠበቅ ላይ ኮንትራቶች',
  },
  'common.landlord.awaitingTenantAmendment': {
    en: 'Awaiting tenant / amendment',
    am: '',
  },
  'common.landlord.openContractsLink': {
    en: 'Open contracts',
    am: 'ኮንትራቶችን ይክፈቱ',
  },
  'common.landlord.rentTaxStubTitle': {
    en: 'Rent & tax preview (stub)',
    am: '',
  },
  'common.landlord.rentTaxStubBody': {
    en:
      'Estimated withholding on collected rent this quarter: {{amount}} ETB (illustrative).',
    am: '',
  },
  'common.landlord.openReportsLink': {
    en: 'Open reports',
    am: 'ሪፖርቶችን ይክፈቱ',
  },
  'common.landlord.rentDueAlertsHeading': {
    en: 'Rent due alerts',
    am: '',
  },
  'common.landlord.demoRentWindow': {
    en: 'Demo: 1 unit approaching its rent window within 7 days (Bole Unit 305).',
    am: '',
  },
} satisfies Record<string, Entry>
