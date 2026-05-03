import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { dequeueAccessFlashBanner } from '../../navigation/pendingAccessFlash'

export function AccessFlashBanner() {
  const location = useLocation()
  const slot = useRef<Map<string, string>>(new Map())
  const [bannerText, setBannerText] = useState<string | null>(null)
  const [hiddenForKey, setHiddenForKey] = useState<string | null>(null)

  useLayoutEffect(() => {
    const routeKey = location.key
    const cached = slot.current.get(routeKey)
    if (cached !== undefined) {
      setBannerText(cached)
      return
    }
    const m = dequeueAccessFlashBanner()
    if (!m) {
      setBannerText(null)
      return
    }
    slot.current.set(routeKey, m)
    setBannerText(m)
  }, [location.key, location.pathname, location.search])

  const visible = bannerText !== null && hiddenForKey !== location.key

  if (!visible) return null

  return (
    <div
      className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 shadow-sm sm:py-4"
      role="status"
    >
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-3 lg:px-6">
        <p className="min-w-0 leading-relaxed">{bannerText}</p>
        <button
          type="button"
          className="shrink-0 rounded-md border border-amber-300/90 bg-white px-3 py-2 text-xs font-semibold text-amber-950 hover:bg-amber-100/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          onClick={() => setHiddenForKey(location.key)}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
