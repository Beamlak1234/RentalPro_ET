import { ArrowLeft, LogOut } from 'lucide-react'
import { NavLink, Link, Outlet } from 'react-router-dom'

import { AccessFlashBanner } from '../feedback/AccessFlashBanner'
import { useAuth } from '../../hooks/useAuth'
import { useSignOutToHome } from '../../hooks/useSignOutToHome'

import { GovPageSurface } from './GovPageSurface'

export function AdminLayout() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const signOutToHome = useSignOutToHome()

  const adminNavLink =
    '[&.active]:bg-white/18 [&.active]:text-white text-slate-200 hover:bg-white/10 hover:text-white'

  return (
    <GovPageSurface variant="admin" topAccent className="min-h-svh">
      <header className="sticky top-0 z-10 border-b border-slate-300/80 bg-[#1e293b] text-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <p className="text-sm font-semibold sm:text-base">
            RentalPro <span className="text-sky-300">ET</span>
            <span className="font-normal text-slate-300"> · Admin</span>
          </p>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
            {isAdmin ? (
              <button
                type="button"
                onClick={signOutToHome}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-white ring-1 ring-white/20 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                <LogOut className="size-4" aria-hidden />
                Sign out
              </button>
            ) : null}
          </div>
        </div>
      </header>
      {isAdmin ?
        <div className="border-b border-slate-700/40 bg-[#1e293b]">
          <nav
            aria-label="Admin"
            className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 sm:px-6"
          >
            <NavLink
              to="/admin/dashboard"
              className={`rounded-md px-3 py-2 text-sm font-semibold ${adminNavLink}`}
            >
              Overview
            </NavLink>
            <NavLink
              to="/admin/users"
              className={`rounded-md px-3 py-2 text-sm font-semibold ${adminNavLink}`}
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={`rounded-md px-3 py-2 text-sm font-semibold ${adminNavLink}`}
            >
              Configuration
            </NavLink>
            <NavLink
              to="/admin/sub-cities"
              className={`rounded-md px-3 py-2 text-sm font-semibold ${adminNavLink}`}
            >
              Sub-cities
            </NavLink>
            <NavLink
              to="/admin/synthetic"
              className={`rounded-md px-3 py-2 text-sm font-semibold ${adminNavLink}`}
            >
              Synthetic data
            </NavLink>
          </nav>
        </div>
      : null}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="order-first shrink-0 w-full">
          <AccessFlashBanner />
        </div>
        <div className="flex flex-1 flex-col items-center px-4 py-10 sm:py-14">
          <Outlet />
        </div>
      </div>
    </GovPageSurface>
  )
}
