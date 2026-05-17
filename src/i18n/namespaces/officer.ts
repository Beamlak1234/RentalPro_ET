import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

export const OFFICER_MESSAGES = {
  'officer.dashboardTitle': {
    en: 'Officer dashboard',
    am: 'የሠራተኛ ዳሽቦርድ',
  },
  'officer.dashboardSubtitle': {
    en: 'Prototype KPIs — derived from bundled mock datasets in this browser demo.',
    am: '',
  },
  'officer.kpi.properties': {
    en: 'Properties (mock)',
    am: 'ንብረቶች (ሙከራ)',
  },
  'officer.kpi.contracts': {
    en: 'Contracts on file (mock)',
    am: 'በፋይል ያሉ ኮንትራቶች (ሙከራ)',
  },
  'officer.kpi.anomalies': {
    en: 'Anomalies tracked',
    am: 'የተከታተሉ ልዩነቶች',
  },
  'officer.kpi.directory': {
    en: 'Participant directory',
    am: 'የተሳተፊዎች ማውጫ',
  },
  'officer.kpi.browse': {
    en: 'Browse',
    am: 'ይዘዋወሩ',
  },
  'officer.quickLinks': {
    en: 'Quick links',
    am: 'ፈጣን አገናኞች',
  },
  'officer.link.participants': {
    en: 'Participant directory',
    am: 'የተሳተፊዎች ማውጫ',
  },
  'officer.link.propertiesReview': {
    en: 'Properties review queue',
    am: 'የንብረት ግምገማ ተራ',
  },
  'officer.link.contractsReview': {
    en: 'Contracts review queue',
    am: 'የኮንትራት ግምገማ ተራ',
  },
  'officer.link.map': {
    en: 'GIS heatmap (placeholder)',
    am: 'GIS ሙቀት ካርታ (አረፋ)',
  },
  'officer.link.anomalies': {
    en: 'Anomalies (stub queue)',
    am: 'ልዩነቶች (አረፋ)',
  },
  'officer.link.reports': {
    en: 'Reports (stub)',
    am: 'ሪፖርቶች (አረፋ)',
  },
  'officer.appealsTitle': {
    en: 'Pending appeals (stub)',
    am: 'በመጠበቅ ላይ ጥያቄዎች (አረፋ)',
  },
  'officer.appealsBody': {
    en: '1 rent-increase appeal awaiting assignment — open the appeals work queue to review (demo).',
    am: '',
  },
  'officer.appealsCta': {
    en: 'Go to appeals',
    am: 'ወደ ጥያቄዎች ይሂዱ',
  },
} satisfies Record<string, Entry>
