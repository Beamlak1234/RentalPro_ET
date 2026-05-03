/** Minimal EN / አማ demo copy for tenant screens only */

export type TenantLang = 'en' | 'am'

export type TenantUIText = Record<string, ENAM>

type ENAM = { en: string; am: string }

export const TENANT_UI_TEXT: TenantUIText = {
  dashWelcome: {
    en: 'Welcome',
    am: 'እንኳን ደስ አለዎት',
  },
  pendingActions: {
    en: 'Pending actions',
    am: 'በመጠበቅ ላይ ያሉ ተግባራት',
  },
  contractBuckets: {
    en: 'Your contracts overview',
    am: 'የኮንትራቶች እይታ',
  },
  active: {
    en: 'Active',
    am: 'ንቁ',
  },
  pending: {
    en: 'Pending',
    am: 'በመጠበቅ ላይ',
  },
  amendment: {
    en: 'Amendment',
    am: 'ማሻሻያ',
  },
  notifications: {
    en: 'Recent notifications',
    am: 'በቅርብ ግዜ ማስታወቂያዎች',
  },
  myContracts: {
    en: 'My contracts (summary)',
    am: 'የኔ ኮንትራቶች (ማጠቃለያ)',
  },
}

export function tenantT(lang: TenantLang, key: keyof typeof TENANT_UI_TEXT): string {
  return TENANT_UI_TEXT[key][lang]
}
