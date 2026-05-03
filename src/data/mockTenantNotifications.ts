export type TenantNotificationKind = 'contract' | 'rent'

export interface TenantNotificationRecord {
  id: string
  title: string
  body: string
  ts: string
  read: boolean
  kind: TenantNotificationKind
  relatedContractId?: string
}

export const MOCK_TENANT_NOTIFICATIONS: TenantNotificationRecord[] = [
  {
    id: 'n-arada',
    title: 'Contract needs your confirmation',
    body: 'Arada Shop — review and confirm before April 2026 cutoff.',
    ts: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    read: false,
    kind: 'contract',
    relatedContractId: 'arada-shop-pending',
  },
  {
    id: 'n-rent',
    title: 'Rent increase proposal',
    body: 'Landlord submitted a revised rent proposal for Bole Condominium.',
    ts: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    read: false,
    kind: 'rent',
    relatedContractId: 'bole-305',
  },
  {
    id: 'n-general',
    title: 'Reminder: quarterly rental declaration',
    body: 'When production goes live, this would link to filings guidance.',
    ts: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
    read: true,
    kind: 'rent',
  },
]

export type TenantNotificationFilter = 'all' | 'unread' | 'contract' | 'rent'

export function filterTenantNotifications(
  list: TenantNotificationRecord[],
  f: TenantNotificationFilter,
): TenantNotificationRecord[] {
  return list.filter((row) => {
    if (f === 'all') return true
    if (f === 'unread') return !row.read
    if (f === 'contract') return row.kind === 'contract'
    if (f === 'rent') return row.kind === 'rent'
    return true
  })
}
