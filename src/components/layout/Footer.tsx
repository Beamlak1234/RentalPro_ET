import { Link } from 'react-router-dom'

import { useLocale } from '../../context/LocaleContext'
import { tInterpolate } from '../../i18n/t'

export function Footer() {
  const { t, lang } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer
      id="footer-help"
      className="bg-[#1e293b] text-slate-300"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <p className="text-base font-semibold text-white">{t('footer.brand')}</p>
          <p className="mt-2 text-sm leading-relaxed">{t('footer.intro')}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t('footer.product')}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" to="/">
                {t('footer.welcome')}
              </Link>
            </li>
            <li>
              <a className="hover:text-white" href="/#roles">
                {t('footer.signupTeaser')}
              </a>
            </li>
            <li>
              <Link
                className="text-slate-400 underline-offset-2 hover:text-white hover:underline"
                to="/auth/officer/sign-in"
              >
                {t('footer.officerSignInLink')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t('footer.legal')}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href="#footer-help">
                {t('footer.privacy')}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#footer-help">
                {t('footer.terms')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            <Link className="hover:text-white hover:underline" to="/contact">
              {t('footer.contact')}
            </Link>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-medium text-slate-200">{t('footer.operatorLead')}</span>{' '}
            <span className="text-slate-400">{t('footer.operatorTag')}</span>{' '}
            <span className="text-slate-200">{t('footer.operatorBody')}</span>
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <a
                className="text-slate-200 underline-offset-2 hover:text-white hover:underline"
                href="mailto:support@rentalpro.et"
              >
                support@rentalpro.et
              </a>{' '}
              <span className="text-slate-500">{t('footer.supportPlaceholder')}</span>
            </li>
            <li>
              <span className="text-slate-200">{t('footer.phoneTbd')}</span>
            </li>
            <li className="text-slate-400">{t('footer.hoursTbd')}</li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            {t('footer.govNote')}{' '}
            <Link
              className="font-medium text-slate-300 underline-offset-2 hover:text-white hover:underline"
              to="/auth/officer/sign-in"
            >
              /auth/officer/sign-in
            </Link>
            .
          </p>
          <p className="mt-3">
            <Link
              className="text-xs font-semibold uppercase tracking-wide text-slate-400 underline-offset-2 hover:text-white hover:underline"
              to="/contact"
            >
              {t('footer.moreContact')}
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-4 text-center lg:px-6">
          <Link
            className="text-xs text-slate-500 underline-offset-2 hover:text-slate-400 hover:underline"
            to="/auth/officer/sign-in"
          >
            {t('footer.officerSignInLink')}
          </Link>
          <Link
            className="text-xs text-slate-500 underline-offset-2 hover:text-slate-400 hover:underline"
            to="/admin/sign-in"
          >
            {t('footer.staffAdmin')}
          </Link>
          <p className="text-xs text-slate-400">
            {tInterpolate(lang, 'footer.copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  )
}