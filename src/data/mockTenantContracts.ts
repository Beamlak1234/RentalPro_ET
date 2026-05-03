/**
 * Lifecycle bucket for filtering / dashboards (distinct from confirmation status flag).
 */
export type TenantContractListBucket = 'active' | 'pending' | 'amendment'

/** Filter UI: aligns with buckets (Pending = awaiting confirmation etc.) */
export type ContractFilterStatus = 'all' | TenantContractListBucket

/** Row shown on dashboard summary */
export interface TenantContractSummaryRow {
  id: string
  label: string
  statusDisplay: string
  paymentAmount: number
  statusTone: 'active' | 'pending' | 'amendment'
}

/** Full mock record for list + detail */
export interface TenantContractRecord {
  id: string
  title: string
  unit: string
  rentEtb: number
  /** For filtering + badges */
  listBucket: TenantContractListBucket
  /** Stored workflow status */
  status: 'active' | 'pending_confirmation'
  dateLabel: string
  landlordName: string
  propertyDetail: string
  leaseStart: string
  leaseEnd: string
  contractNumber: string
  needsTenantConfirmation: boolean
  /** Shown as pending action on dashboard */
  rentIncreaseProposedEtb?: number
}

export const MOCK_TENANT_CONTRACTS: TenantContractRecord[] = [
  {
    id: 'bole-305',
    title: 'Bole Condominium',
    unit: 'Unit 305',
    rentEtb: 4500,
    listBucket: 'amendment',
    status: 'active',
    dateLabel: '12 Mar 2026',
    landlordName: 'Meron Alemayehu',
    propertyDetail: 'Bole, Woreda 3',
    leaseStart: '01 Jul 2025',
    leaseEnd: '30 Jun 2026',
    contractNumber: 'C-6610',
    needsTenantConfirmation: false,
    rentIncreaseProposedEtb: 9500,
  },
  {
    id: 'arada-shop-pending',
    title: 'Arada Shop',
    unit: 'Unit 305',
    rentEtb: 8500,
    listBucket: 'pending',
    status: 'pending_confirmation',
    dateLabel: '05 Apr 2026',
    landlordName: 'Ahmed Mohammed',
    propertyDetail: 'Arada Kebele 03',
    leaseStart: '01 Jan 2026',
    leaseEnd: '31 Dec 2026',
    contractNumber: 'C-7842',
    needsTenantConfirmation: true,
  },
  {
    id: 'lideta-ha',
    title: 'Lideta Heights',
    unit: 'Unit 12B',
    rentEtb: 12000,
    listBucket: 'active',
    status: 'active',
    dateLabel: '02 Feb 2026',
    landlordName: 'Yared Bekele',
    propertyDetail: 'Lideta Sub-city',
    leaseStart: '01 Mar 2025',
    leaseEnd: '28 Feb 2027',
    contractNumber: 'C-4401',
    needsTenantConfirmation: false,
  },
]

export function getTenantContract(id: string): TenantContractRecord | undefined {
  return MOCK_TENANT_CONTRACTS.find((c) => c.id === id)
}

const DASHBOARD_PAYMENT_ETB: Record<string, number> = {
  'bole-305': 9900,
  'arada-shop-pending': 10300,
  'lideta-ha': 20000,
}

function badgeForBucket(bucket: TenantContractListBucket): {
  label: string
  tone: TenantContractSummaryRow['statusTone']
} {
  switch (bucket) {
    case 'pending':
      return { label: 'Pending', tone: 'pending' }
    case 'amendment':
      return { label: 'Amendment', tone: 'amendment' }
    default:
      return { label: 'Active', tone: 'active' }
  }
}

export function getDashboardContractRows(): TenantContractSummaryRow[] {
  return MOCK_TENANT_CONTRACTS.map((c) => {
    const badge = badgeForBucket(c.listBucket)
    return {
      id: c.id,
      label: c.title.length > 10 ? `${c.title.slice(0, 9)}…` : c.title,
      statusDisplay: badge.label,
      paymentAmount: DASHBOARD_PAYMENT_ETB[c.id] ?? c.rentEtb,
      statusTone: badge.tone,
    }
  })
}

export function filterTenantContracts(
  list: TenantContractRecord[],
  search: string,
  filter: ContractFilterStatus,
): TenantContractRecord[] {
  const q = search.trim().toLowerCase()
  return list.filter((c) => {
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.unit.toLowerCase().includes(q) ||
      c.contractNumber.toLowerCase().includes(q)

    const matchesFilter = filter === 'all' || c.listBucket === filter

    return matchesSearch && matchesFilter
  })
}

/** Count buckets for dashboard summary pills */
export function countTenantBuckets(
  list: TenantContractRecord[],
): Record<TenantContractListBucket, number> {
  const out: Record<TenantContractListBucket, number> = {
    active: 0,
    pending: 0,
    amendment: 0,
  }
  list.forEach((c) => {
    out[c.listBucket]++
  })
  return out
}
