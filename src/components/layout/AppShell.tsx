import type { ReactNode } from 'react'

import { AccessFlashBanner } from '../feedback/AccessFlashBanner'

import { Footer } from './Footer'
import { Header } from './Header'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">
        {children}
        {/* Render after routed content so access flashes enqueue/dequeue inside one commit */}
        <div className="order-first shrink-0">
          <AccessFlashBanner />
        </div>
      </main>
      <Footer />
    </div>
  )
}
