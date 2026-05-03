export interface OfficerPropertyReviewRow {
  id: string
  name: string
  subCity: string
  flags: number
  status: 'cleared' | 'review' | 'flagged'
}

export interface OfficerContractReviewRow {
  id: string
  parties: string
  rentEtb: number
  risk: 'low' | 'medium' | 'high'
  status: 'open' | 'approved' | 'flagged'
}

export const MOCK_OFFICER_PROPERTY_REVIEW: OfficerPropertyReviewRow[] = [
  {
    id: 'pr-1',
    name: 'Bole Skyline',
    subCity: 'Bole',
    flags: 0,
    status: 'cleared',
  },
  {
    id: 'pr-2',
    name: 'Merkato Wholesale Row',
    subCity: 'Addis Ketema',
    flags: 2,
    status: 'flagged',
  },
]

export const MOCK_OFFICER_CONTRACT_REVIEW: OfficerContractReviewRow[] = [
  {
    id: 'cr-1',
    parties: 'Meron A. → Demo Tenant',
    rentEtb: 4500,
    risk: 'low',
    status: 'open',
  },
  {
    id: 'cr-2',
    parties: 'Ahmed M. → Demo Tenant',
    rentEtb: 8500,
    risk: 'medium',
    status: 'flagged',
  },
]

export interface OfficerAnomalyRow {
  id: string
  subject: string
  score: number
  severity: 'low' | 'high'
}

export const MOCK_OFFICER_ANOMALIES: OfficerAnomalyRow[] = [
  { id: 'an-1', subject: 'Merkato Wholesale Row', score: 82, severity: 'high' },
  { id: 'an-2', subject: 'Kazanchis short-let cluster', score: 44, severity: 'low' },
]

export interface OfficerAppealRow {
  id: string
  title: string
  opened: string
  status: 'pending' | 'closed'
}

export const MOCK_OFFICER_APPEALS: OfficerAppealRow[] = [
  {
    id: 'ap-1',
    title: 'Rent increase dispute — Bole',
    opened: '2026-04-12',
    status: 'pending',
  },
]
