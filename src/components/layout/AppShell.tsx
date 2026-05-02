import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  )
}
