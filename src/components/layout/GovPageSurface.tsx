import type { ReactNode } from 'react'

export type GovSurfaceVariant = 'institutional' | 'civic' | 'admin'

const variantClassName: Record<GovSurfaceVariant, string> = {
  institutional: 'gov-surface-institutional',
  civic: 'gov-surface-civic',
  admin: 'gov-surface-admin',
}

type Props = {
  variant: GovSurfaceVariant
  /** Thin navy accent strip at the top of the scrollable shell */
  topAccent?: boolean
  children: ReactNode
  className?: string
}

/**
 * Shared page backdrop for officer/government surfaces, civic welcome, or admin chrome.
 */
export function GovPageSurface({
  variant,
  topAccent = false,
  children,
  className = '',
}: Props) {
  return (
    <div
      className={`flex w-full flex-1 flex-col text-slate-900 ${variantClassName[variant]} ${className}`}
    >
      {topAccent ? <div className="gov-top-accent" aria-hidden /> : null}
      {children}
    </div>
  )
}
