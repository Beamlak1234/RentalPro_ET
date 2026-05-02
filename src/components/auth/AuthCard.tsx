import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: Props) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-pretty text-base text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-8">{children}</div>
      {footer ? <div className="mt-6 border-t border-slate-100 pt-6">{footer}</div> : null}
    </div>
  )
}
