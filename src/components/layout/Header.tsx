import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { dashboardPath } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'

const navLinkClass =
  'rounded-md px-3 py-3 text-[15px] font-medium transition-colors hover:bg-white/10 sm:py-2'

const accent =
  '[&.active]:bg-white/15 [&.active]:text-white text-slate-200 hover:text-white'

const desktopAccent =
  'text-slate-200 hover:text-white [&.active]:text-white [&.active]:underline [&.active]:underline-offset-4'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function closeMobile() {
    setMobileOpen(false)
  }

  function handleSignOut() {
    logout()
    navigate('/', { replace: true })
    closeMobile()
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight sm:text-xl"
          onClick={closeMobile}
        >
          RentalPro <span className="text-sky-300">ET</span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 md:flex lg:gap-2"
        >
          <NavLink to="/" className={`${navLinkClass} ${desktopAccent} px-2`}>
            Home
          </NavLink>
          <a href="/#roles" className={`${navLinkClass} ${desktopAccent} px-2`}>
            Choose role
          </a>
          <a href="#footer-help" className={`${navLinkClass} ${desktopAccent} px-2`}>
            Help
          </a>
          <NavLink
            to="/government"
            className={`${navLinkClass} ${desktopAccent} px-2 text-slate-300/95 hover:text-white`}
          >
            Government
          </NavLink>
          {user && user.role !== 'admin' ? (
            <>
              <NavLink
                to={dashboardPath(user.role)}
                className={`${navLinkClass} ${desktopAccent} px-2 inline-flex items-center gap-1.5`}
              >
                <LayoutDashboard className="size-4 opacity-90" aria-hidden />
                Dashboard
              </NavLink>
              <button
                type="button"
                className={`${navLinkClass} ${desktopAccent} px-2 inline-flex items-center gap-1.5 text-left`}
                onClick={handleSignOut}
              >
                <LogOut className="size-4 opacity-90" aria-hidden />
                Sign out
              </button>
            </>
          ) : null}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>

      {mobileOpen ? (
      <div
        id="mobile-menu"
        className="border-t border-white/10 bg-[#1e293b] md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-2 py-2">
          <NavLink
            to="/"
            className={`${navLinkClass} ${accent}`}
            onClick={closeMobile}
          >
            Home
          </NavLink>
          <a
            href="/#roles"
            className={`${navLinkClass} ${accent}`}
            onClick={closeMobile}
          >
            Choose role
          </a>
          <a
            href="#footer-help"
            className={`${navLinkClass} ${accent}`}
            onClick={closeMobile}
          >
            Help
          </a>
          <NavLink
            to="/government"
            className={`${navLinkClass} ${accent}`}
            onClick={closeMobile}
          >
            Government
          </NavLink>
          {user && user.role !== 'admin' ? (
            <>
              <NavLink
                to={dashboardPath(user.role)}
                className={`${navLinkClass} ${accent}`}
                onClick={closeMobile}
              >
                Dashboard
              </NavLink>
              <button
                type="button"
                className={`${navLinkClass} ${accent} inline-flex items-center gap-2 text-left`}
                onClick={handleSignOut}
              >
                <LogOut className="size-4" aria-hidden />
                Sign out
              </button>
            </>
          ) : null}
        </nav>
      </div>
      ) : null}
    </header>
  )
}
