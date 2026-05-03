/** Demo portfolio for landlord UI — not filtered by signed-in user in MVP. */

export type LandlordUnitKind = 'residential' | 'shop' | 'office'

export interface LandlordUnitRecord {
  id: string
  label: string
  kind: LandlordUnitKind
  rentEtb: number
  occupied: boolean
}

export interface LandlordPropertyRecord {
  id: string
  name: string
  subCity: string
  addressLine: string
  units: LandlordUnitRecord[]
}

export const MOCK_LANDLORD_PROPERTIES: LandlordPropertyRecord[] = [
  {
    id: 'prop-bole-meron',
    name: 'Bole Skyline',
    subCity: 'Bole',
    addressLine: 'Woreda 3, near Edna Mall',
    units: [
      {
        id: 'u-305',
        label: 'Unit 305',
        kind: 'residential',
        rentEtb: 4500,
        occupied: true,
      },
      {
        id: 'u-g01',
        label: 'Ground shop G1',
        kind: 'shop',
        rentEtb: 12000,
        occupied: false,
      },
    ],
  },
  {
    id: 'prop-arada-ahmed',
    name: 'Arada Corner Block',
    subCity: 'Arada',
    addressLine: 'Kebele 03',
    units: [
      {
        id: 'u-arada-shop',
        label: 'Unit 305 (shop)',
        kind: 'shop',
        rentEtb: 8500,
        occupied: true,
      },
    ],
  },
]

export type LandlordContractStatus =
  | 'draft'
  | 'awaiting_tenant'
  | 'active'
  | 'amendment'

export interface LandlordContractVersion {
  at: string
  label: string
  rentEtb: number
}

export interface LandlordContractRecord {
  id: string
  propertyId: string
  propertyName: string
  unitLabel: string
  tenantName: string
  status: LandlordContractStatus
  rentEtb: number
  started: string
  versions: LandlordContractVersion[]
}

export const MOCK_LANDLORD_CONTRACTS: LandlordContractRecord[] = [
  {
    id: 'lc-bole-305',
    propertyId: 'prop-bole-meron',
    propertyName: 'Bole Skyline',
    unitLabel: 'Unit 305',
    tenantName: 'Demo Tenant',
    status: 'amendment',
    rentEtb: 4500,
    started: '2025-07-01',
    versions: [
      { at: '2025-07-01', label: 'Original lease', rentEtb: 4200 },
      { at: '2026-03-01', label: 'Rent schedule tick', rentEtb: 4500 },
    ],
  },
  {
    id: 'lc-arada',
    propertyId: 'prop-arada-ahmed',
    propertyName: 'Arada Corner Block',
    unitLabel: 'Unit 305 (shop)',
    tenantName: 'Demo Tenant',
    status: 'awaiting_tenant',
    rentEtb: 8500,
    started: '2026-01-01',
    versions: [{ at: '2026-01-01', label: 'Issued for signature', rentEtb: 8500 }],
  },
]

export type LandlordNotificationKind = 'contract' | 'rent' | 'tax'

export interface LandlordNotificationRecord {
  id: string
  title: string
  body: string
  ts: string
  read: boolean
  kind: LandlordNotificationKind
}

export const MOCK_LANDLORD_NOTIFICATIONS: LandlordNotificationRecord[] = [
  {
    id: 'ln-1',
    title: 'Tenant opened contract',
    body: 'Arada shop contract is awaiting tenant confirmation.',
    ts: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    kind: 'contract',
  },
  {
    id: 'ln-2',
    title: 'Rent deposit reminder',
    body: 'Unit 305 payment window closes in 5 days (demo).',
    ts: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    read: true,
    kind: 'rent',
  },
]

export function getLandlordProperty(id: string): LandlordPropertyRecord | undefined {
  return MOCK_LANDLORD_PROPERTIES.find((p) => p.id === id)
}

export function getLandlordContract(id: string): LandlordContractRecord | undefined {
  return MOCK_LANDLORD_CONTRACTS.find((c) => c.id === id)
}

export function propertyAndUnitCount(): {
  properties: number
  units: number
} {
  const properties = MOCK_LANDLORD_PROPERTIES.length
  const units = MOCK_LANDLORD_PROPERTIES.reduce(
    (n, p) => n + p.units.length,
    0,
  )
  return { properties, units }
}
