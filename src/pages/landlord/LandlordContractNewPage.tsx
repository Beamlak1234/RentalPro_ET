import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'

import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { MOCK_LANDLORD_PROPERTIES } from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

export function LandlordContractNewPage() {
  const [propertyId, setPropertyId] = useState(MOCK_LANDLORD_PROPERTIES[0]?.id ?? '')
  const [tenant, setTenant] = useState('Demo Tenant')
  const [rent, setRent] = useState('7500')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    window.alert('Demo: contract draft would be created and routed to tenant.')
  }

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-lg px-4 py-8 sm:py-10">
        <Link
          to="/landlord/contracts"
          className="inline-flex min-h-10 items-center text-sm font-semibold text-[#1e293b] hover:underline"
        >
          ← Back to contracts
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[#1e293b]">
          Create contract (demo)
        </h1>
        <form
          className="mt-8 space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-base font-medium text-slate-700" htmlFor="prop-pick">
              Property
            </label>
            <select
              id="prop-pick"
              className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
            >
              {MOCK_LANDLORD_PROPERTIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Tenant display name"
            value={tenant}
            onChange={(e) => setTenant(e.target.value)}
            labelClassName="text-base"
          />
          <Input
            label="Proposed rent (ETB / month)"
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            labelClassName="text-base"
          />
          <p className="text-xs text-slate-600">
            AI benchmark (placeholder): suggested band 6,500 – 9,000 ETB for this
            sub-market.
          </p>
          <Button type="submit" variant="primary" className="w-full min-h-12">
            Save draft & notify tenant (demo)
          </Button>
        </form>
      </div>
    </>
  )
}
