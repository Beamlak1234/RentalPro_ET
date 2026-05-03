import { Link } from 'react-router-dom'
import { useState } from 'react'

import { GovPageSurface } from '../../components/layout/GovPageSurface'

export function OfficerMapPage() {
  const [rentHeat, setRentHeat] = useState(true)
  const [anomalyHeat, setAnomalyHeat] = useState(false)

  return (
    <GovPageSurface variant="institutional" topAccent className="min-h-full">
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
              GIS heatmap (placeholder)
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Toggle synthetic layers — no licensed basemap integration in this sprint.
            </p>
          </div>
          <Link to="/officer/dashboard" className="text-sm font-semibold text-[#1e293b] hover:underline">
            ← Dashboard
          </Link>
        </div>

        <div className="mt-8 rounded-xl border border-slate-300/90 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-800">Layer legend</p>
          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              className="size-5 rounded border-slate-400"
              checked={rentHeat}
              onChange={(e) => setRentHeat(e.target.checked)}
            />
            Rent level heat (orange wash)
          </label>
          <label className="mt-3 flex cursor-pointer items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              className="size-5 rounded border-slate-400"
              checked={anomalyHeat}
              onChange={(e) => setAnomalyHeat(e.target.checked)}
            />
            Anomaly density (violet hatch)
          </label>
        </div>

        <div
          className="relative mt-8 h-96 overflow-hidden rounded-xl border border-slate-300 bg-slate-900/5"
          role="presentation"
          aria-label="Demonstration map canvas"
        >
          <iframe
            title="Demo basemap iframe"
            className="absolute inset-0 h-full w-full opacity-85"
            src="https://www.openstreetmap.org/export/embed.html?bbox=38.70%2C8.94%2C38.92%2C9.09&layer=mapnik"
            loading="lazy"
          />
          {rentHeat ?
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-orange-500/35 via-transparent to-transparent" />
          : null}
          {anomalyHeat ?
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg,#7c3aed 0,#7c3aed 4px,transparent 4px,transparent 14px)',
              }}
            />
          : null}
        </div>
      </section>
    </GovPageSurface>
  )
}
