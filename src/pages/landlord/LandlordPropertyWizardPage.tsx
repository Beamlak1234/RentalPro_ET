import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { getLandlordProperty } from '../../data/mockLandlordPortfolio'
import { DashboardBanner } from '../dashboards/DashboardBanner'

const STEPS = ['Basics', 'Units / shops', 'Rent', 'Location']

export function LandlordPropertyWizardPage({
  variant,
}: {
  variant: 'create' | 'edit'
}) {
  const { propertyId } = useParams()
  const existing =
    variant === 'edit' && propertyId ?
      getLandlordProperty(propertyId)
    : undefined

  const [step, setStep] = useState(0)
  const [name, setName] = useState(existing?.name ?? '')
  const [address, setAddress] = useState(existing?.addressLine ?? '')
  const [subCity, setSubCity] = useState(existing?.subCity ?? 'Bole')
  const [unitLabel, setUnitLabel] = useState('')
  const [unitRent, setUnitRent] = useState('5000')
  const [lat] = useState('9.0320')
  const [lng] = useState('38.7469')

  if (variant === 'edit') {
    if (!propertyId) {
      return <Navigate to="/landlord/properties" replace />
    }
    if (!existing) {
      return <Navigate to="/landlord/properties" replace />
    }
  }

  function finish() {
    window.alert('Demo: property saved locally in a future build with persistence.')
  }

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${Number(lng) - 0.02}%2C${Number(lat) - 0.02}%2C${Number(lng) + 0.02}%2C${Number(lat) + 0.02}&layer=mapnik&marker=${lat}%2C${lng}`

  return (
    <>
      <DashboardBanner role="landlord" />
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-10">
        <div className="flex items-center gap-3">
          <Link
            to="/landlord/properties"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 text-sm font-semibold text-[#1e293b] hover:bg-slate-50"
          >
            ←
          </Link>
          <h1 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
            {variant === 'create' ? 'Register property' : 'Edit property'}
          </h1>
        </div>

        <ol className="mt-8 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 sm:text-sm">
          {STEPS.map((label, i) => (
            <li
              key={label}
              className={`rounded-full px-3 py-1 ${
                i === step ?
                  'bg-[#1e293b] text-white'
                : 'bg-slate-100 text-slate-600'
              }`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {step === 0 ?
            <div className="space-y-4">
              <Input
                label="Property name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                labelClassName="text-base"
              />
              <Input
                label="Address line"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                labelClassName="text-base"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-base font-medium text-slate-700" htmlFor="wiz-sub">
                  Sub-city
                </label>
                <select
                  id="wiz-sub"
                  className="min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base"
                  value={subCity}
                  onChange={(e) => setSubCity(e.target.value)}
                >
                  <option value="Arada">Arada</option>
                  <option value="Bole">Bole</option>
                  <option value="Kirkos">Kirkos</option>
                  <option value="Lideta">Lideta</option>
                  <option value="Yeka">Yeka</option>
                </select>
              </div>
            </div>
          : null}

          {step === 1 ?
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Add a representative unit or shop (demo — not persisted).
              </p>
              <Input
                label="Unit / shop label"
                value={unitLabel}
                onChange={(e) => setUnitLabel(e.target.value)}
                placeholder="e.g. Unit 404"
                labelClassName="text-base"
              />
              <Input
                label="Asking rent (ETB)"
                type="number"
                value={unitRent}
                onChange={(e) => setUnitRent(e.target.value)}
                labelClassName="text-base"
              />
            </div>
          : null}

          {step === 2 ?
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                <strong>AI benchmark (placeholder):</strong> comparable median rent
                in {subCity} ≈ 8,200 ETB for similar floor plate.
              </p>
              <p>
                <strong>Tax preview (stub):</strong> estimated 10% withholding on
                declared rent ≈{' '}
                {Math.round((Number(unitRent) || 0) * 0.1).toLocaleString()}{' '}
                ETB / month.
              </p>
            </div>
          : null}

          {step === 3 ?
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Map embed uses public OpenStreetMap (no API key). Coordinates are demo
                values.
              </p>
              <iframe
                title="Property location (demo)"
                src={mapSrc}
                className="h-56 w-full rounded-lg border border-slate-200 sm:h-72"
                loading="lazy"
              />
              <p className="text-xs text-slate-500">
                Lat {lat}, Lng {lng} (static for prototype)
              </p>
            </div>
          : null}

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            {step < STEPS.length - 1 ?
              <Button type="button" variant="primary" onClick={() => setStep((s) => s + 1)}>
                Next
              </Button>
            : <Button type="button" variant="primary" onClick={finish}>
                Save (demo)
              </Button>
            }
          </div>
        </div>
      </div>
    </>
  )
}
