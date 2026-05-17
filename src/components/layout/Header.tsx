import {
  Bell,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  User,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { LanguageToggle } from '../i18n/LanguageToggle'
import { useLocale } from '../../context/LocaleContext'
import { dashboardPath, participantProfilePath } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { useSignOutToHome } from '../../hooks/useSignOutToHome'

const navLinkClass =
  'rounded-md px-3 py-3 text-[15px] font-medium transition-colors hover:bg-white/10 sm:py-2'

const accent =
  '[&.active]:bg-white/15 [&.active]:text-white text-slate-200 hover:text-white'

const desktopAccent =
  'text-slate-200 hover:text-white [&.active]:text-white [&.active]:underline [&.active]:underline-offset-4'

const helpIconButtonClass =
  'inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'

function ParticipantWorkspaceSelect({
  onAfterNavigate,
}: {
  onAfterNavigate?: () => void
}) {
  const { user, switchParticipantWorkspace } = useAuth()
  const { t } = useLocale()
  const navigate = useNavigate()

  const dual =
    user?.participantEntitlements?.tenant === true &&
    user.participantEntitlements.landlord === true
  if (!dual || !user) return null

  return (
    <label className="flex min-h-11 max-w-[200px] items-center gap-2 md:max-w-none">
      <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:inline">
        {t('common.workspaceLabel')}
      </span>
      <select
        className="w-full rounded-md border border-white/25 bg-[#0f172a] px-2 py-2 text-[14px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 lg:py-2"
        aria-label={t('common.workspaceSwitchAria')}
        value={user.role}
        onChange={(event) => {
          const mode = event.target.value
          if (mode !== 'tenant' && mode !== 'landlord') return
          const outcome = switchParticipantWorkspace(mode)
          if (outcome.ok) navigate(dashboardPath(mode), { replace: true })
          onAfterNavigate?.()
        }}
      >
        <option value="tenant">{t('common.workspaceSwitchTenant')}</option>
        <option value="landlord">{t('common.workspaceSwitchLandlord')}</option>
      </select>
    </label>
  )
}

function HelpFooterLink({ className }: { className?: string }) {
  const { t } = useLocale()
  return (
    <a
      href="#footer-help"
      className={`${helpIconButtonClass}${className ? ` ${className}` : ''}`}
      aria-label={t('common.help')}
      title={t('common.help')}
    >
      <CircleHelp className="size-6" aria-hidden strokeWidth={2} />
    </a>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()
  const { t } = useLocale()
  const signOutToHome = useSignOutToHome()

  function closeMobile() {
    setMobileOpen(false)
  }

  function handleSignOut() {
    closeMobile()
    signOutToHome()
  }

  return (
    <header className="sticky top-0 z-50 bg-[#1e293b] text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 lg:px-6">
        <Link
          to="/"
          className="shrink-0 text-lg font-bold tracking-tight sm:text-xl"
          onClick={closeMobile}
        >
          RentalPro <span className="text-sky-300">ET</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav
            aria-label="Main"
            className="hidden min-w-0 items-center gap-1 md:flex lg:gap-2"
          >
            <NavLink to="/" className={`${navLinkClass} ${desktopAccent} px-2`}>
              {t('common.home')}
            </NavLink>
            <a href="/#roles" className={`${navLinkClass} ${desktopAccent} px-2`}>
              {t('common.chooseRole')}
            </a>
            {user?.role === 'officer' ? (
              <NavLink
                to="/government"
                className={`${navLinkClass} ${desktopAccent} px-2 text-slate-300/95 hover:text-white`}
              >
                {t('common.government')}
              </NavLink>
            ) : null}
            {user && user.role !== 'admin' ? (
              <>
                <NavLink
                  to={dashboardPath(user.role)}
                  className={`${navLinkClass} ${desktopAccent} inline-flex items-center gap-1.5 px-2`}
                >
                  <LayoutDashboard className="size-4 opacity-90" aria-hidden />
                  {t('common.dashboard')}
                </NavLink>
                {(user.role === 'tenant' || user.role === 'landlord') &&
                user.participantEntitlements?.tenant &&
                user.participantEntitlements.landlord ?
                  <ParticipantWorkspaceSelect />
                : null}
                {user.role === 'tenant' || user.role === 'landlord' ? (
                  <NavLink
                    to={participantProfilePath(user.role)}
                    className={`${navLinkClass} ${desktopAccent} inline-flex items-center gap-1.5 px-2`}
                  >
                    <User className="size-4 opacity-90" aria-hidden />
                    {t('common.profile')}
                  </NavLink>
                ) : null}
                {user.role === 'tenant' ? (
                  <NavLink
                    to="/tenant/notifications"
                    className={`${navLinkClass} ${desktopAccent} hidden items-center gap-1.5 px-2 lg:inline-flex`}
                  >
                    <Bell className="size-4 opacity-90" aria-hidden />
                    {t('common.alerts')}
                  </NavLink>
                ) : null}
                {user.role === 'landlord' ?
                  <>
                    <NavLink
                      to="/landlord/properties"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center px-2 lg:inline-flex`}
                    >
                      {t('common.properties')}
                    </NavLink>
                    <NavLink
                      to="/landlord/contracts"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center px-2 lg:inline-flex`}
                    >
                      {t('common.contracts')}
                    </NavLink>
                    <NavLink
                      to="/landlord/reports"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center px-2 xl:inline-flex`}
                    >
                      {t('common.reports')}
                    </NavLink>
                    <NavLink
                      to="/landlord/notifications"
                      className={`${navLinkClass} ${desktopAccent} inline-flex items-center gap-1.5 px-2`}
                    >
                      <Bell className="size-4 opacity-90" aria-hidden />
                      {t('common.inbox')}
                    </NavLink>
                  </>
                : null}
                {user.role === 'officer' ?
                  <>
                    <NavLink
                      to="/officer/participants"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center px-2 lg:inline-flex`}
                    >
                      {t('common.participants')}
                    </NavLink>
                    <NavLink
                      to="/officer/properties-review"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center px-2 xl:inline-flex`}
                    >
                      {t('common.propsReview')}
                    </NavLink>
                    <NavLink
                      to="/officer/contracts-review"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center px-2 xl:inline-flex`}
                    >
                      {t('common.contractsReview')}
                    </NavLink>
                    <NavLink
                      to="/officer/map"
                      className={`${navLinkClass} ${desktopAccent} hidden items-center gap-1 px-2 xl:inline-flex`}
                    >
                      <Map className="size-4 opacity-90" aria-hidden />
                      {t('common.map')}
                    </NavLink>
                  </>
                : null}
                <button
                  type="button"
                  className={`${navLinkClass} ${desktopAccent} inline-flex items-center gap-1.5 px-2 text-left`}
                  onClick={handleSignOut}
                >
                  <LogOut className="size-4 opacity-90" aria-hidden />
                  {t('common.signOut')}
                </button>
              </>
            ) : null}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageToggle variant="headerDark" />
            <HelpFooterLink />
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? t('common.closeMenu') : t('common.openMenu')}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            </button>
          </div>
        </div>
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
            {t('common.home')}
          </NavLink>
          <a
            href="/#roles"
            className={`${navLinkClass} ${accent}`}
            onClick={closeMobile}
          >
            {t('common.chooseRole')}
          </a>
          {user?.role === 'officer' ? (
            <NavLink
              to="/government"
              className={`${navLinkClass} ${accent}`}
              onClick={closeMobile}
            >
              {t('common.government')}
            </NavLink>
          ) : null}
          {user && user.role !== 'admin' ? (
            <>
              <NavLink
                to={dashboardPath(user.role)}
                className={`${navLinkClass} ${accent}`}
                onClick={closeMobile}
              >
                {t('common.dashboard')}
              </NavLink>
              {(user.role === 'tenant' || user.role === 'landlord') &&
              user.participantEntitlements?.tenant &&
              user.participantEntitlements.landlord ?
                <div className="px-1 py-2">
                  <ParticipantWorkspaceSelect onAfterNavigate={closeMobile} />
                  <p className="mt-2 text-xs text-slate-400">
                    {t('common.mobileWorkspaceHint')}
                  </p>
                </div>
              : null}
              {user.role === 'tenant' || user.role === 'landlord' ? (
                <NavLink
                  to={participantProfilePath(user.role)}
                  className={`${navLinkClass} ${accent} inline-flex items-center gap-2`}
                  onClick={closeMobile}
                >
                  <User className="size-4 shrink-0" aria-hidden />
                  {t('common.profile')}
                </NavLink>
              ) : null}
              {user.role === 'tenant' ? (
                <NavLink
                  to="/tenant/notifications"
                  className={`${navLinkClass} ${accent} inline-flex items-center gap-2`}
                  onClick={closeMobile}
                >
                  <Bell className="size-4 shrink-0" aria-hidden />
                  {t('common.alerts')}
                </NavLink>
              ) : null}
              {user.role === 'landlord' ?
                <>
                  <NavLink
                    to="/landlord/properties"
                    className={`${navLinkClass} ${accent}`}
                    onClick={closeMobile}
                  >
                    {t('common.properties')}
                  </NavLink>
                  <NavLink
                    to="/landlord/contracts"
                    className={`${navLinkClass} ${accent}`}
                    onClick={closeMobile}
                  >
                    {t('common.contracts')}
                  </NavLink>
                  <NavLink
                    to="/landlord/reports"
                    className={`${navLinkClass} ${accent}`}
                    onClick={closeMobile}
                  >
                    {t('common.reports')}
                  </NavLink>
                  <NavLink
                    to="/landlord/notifications"
                    className={`${navLinkClass} ${accent} inline-flex items-center gap-2`}
                    onClick={closeMobile}
                  >
                    <Bell className="size-4 shrink-0" aria-hidden />
                    {t('common.inbox')}
                  </NavLink>
                </>
              : null}
              {user.role === 'officer' ?
                <>
                  <NavLink
                    to="/officer/participants"
                    className={`${navLinkClass} ${accent}`}
                    onClick={closeMobile}
                  >
                    {t('common.participants')}
                  </NavLink>
                  <NavLink
                    to="/officer/properties-review"
                    className={`${navLinkClass} ${accent}`}
                    onClick={closeMobile}
                  >
                    {t('common.propsReview')}
                  </NavLink>
                  <NavLink
                    to="/officer/contracts-review"
                    className={`${navLinkClass} ${accent}`}
                    onClick={closeMobile}
                  >
                    {t('common.contractsReview')}
                  </NavLink>
                  <NavLink
                    to="/officer/map"
                    className={`${navLinkClass} ${accent} inline-flex items-center gap-2`}
                    onClick={closeMobile}
                  >
                    <Map className="size-4 shrink-0" aria-hidden />
                    {t('common.map')}
                  </NavLink>
                </>
              : null}
              <button
                type="button"
                className={`${navLinkClass} ${accent} inline-flex items-center gap-2 text-left`}
                onClick={handleSignOut}
              >
                <LogOut className="size-4" aria-hidden />
                {t('common.signOut')}
              </button>
            </>
          ) : null}
        </nav>
      </div>
      ) : null}
    </header>
  )
}
