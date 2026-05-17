import type { UiLanguagePreference } from '../../auth/participantProfile'

type Entry = Record<UiLanguagePreference, string>

export const TENANT_MESSAGES = {
  'tenant.dashWelcome': {
    en: 'Welcome',
    am: 'እንኳን ደስ አለዎት',
  },
  'tenant.pendingActions': {
    en: 'Pending actions',
    am: 'በመጠበቅ ላይ ያሉ ተግባራት',
  },
  'tenant.contractBuckets': {
    en: 'Your contracts overview',
    am: 'የኮንትራቶች እይታ',
  },
  'tenant.active': {
    en: 'Active',
    am: 'ንቁ',
  },
  'tenant.pending': {
    en: 'Pending',
    am: 'በመጠበቅ ላይ',
  },
  'tenant.amendment': {
    en: 'Amendment',
    am: 'ማሻሻያ',
  },
  'tenant.notifications': {
    en: 'Recent notifications',
    am: 'በቅርብ ግዜ ማስታወቂያዎች',
  },
  'tenant.myContracts': {
    en: 'My contracts (summary)',
    am: 'የኔ ኮንትራቶች (ማጠቃለያ)',
  },
  'tenant.viewContracts': {
    en: 'View contracts →',
    am: 'ኮንትራቶችን ይመልከቱ →',
  },
  'tenant.contractAwaiting': {
    en: 'Contract awaiting confirmation',
    am: 'ኮንትራት ማረጋገጫ በመጠበቅ ላይ',
  },
  'tenant.propertyLabel': {
    en: 'Property:',
    am: 'ንብረት፦',
  },
  'tenant.reviewNow': {
    en: 'Review now',
    am: 'አሁን ይገምግሙ',
  },
  'tenant.rentIncreaseProposed': {
    en: 'Rent increase proposed',
    am: 'የኪራይ ጭማሪ ተረካቢ',
  },
  'tenant.amountLabel': {
    en: 'Amount:',
    am: 'መጠን፦',
  },
  'tenant.respondNow': {
    en: 'Respond now',
    am: 'አሁን ይመልሱ',
  },
  'tenant.noPending': {
    en: 'No pending items right now.',
    am: 'አሁን በመጠበቅ ላይ ምንም የለም።',
  },
  'tenant.inboxLink': {
    en: 'Inbox',
    am: 'መልዕክት ሳጥን',
  },
  'tenant.viewMore': {
    en: 'View more',
    am: 'ተጨማሪ',
  },
  'tenant.tableInvoice': {
    en: 'Invoice / property',
    am: 'ደረሰኝ / ንብረት',
  },
  'tenant.tableStatus': {
    en: 'Status',
    am: 'ሁኔታ',
  },
  'tenant.tablePayment': {
    en: 'Payment (ETB)',
    am: 'ክፍያ (ብር)',
  },
} satisfies Record<string, Entry>
