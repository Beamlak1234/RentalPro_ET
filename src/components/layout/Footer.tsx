import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer
      id="footer-help"
      className="bg-[#1e293b] text-slate-300"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <p className="text-base font-semibold text-white">RentalPro ET</p>
          <p className="mt-2 text-sm leading-relaxed">
            A digital platform for transparent rental management in Ethiopia —
            public access for tenants and landlords; separate entry for authorised
            officers and staff.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Product</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:text-white" to="/">
                Welcome
              </Link>
            </li>
            <li>
              <a className="hover:text-white" href="/#roles">
                Tenant & landlord signup
              </a>
            </li>
            <li>
              <Link
                className="text-slate-400 underline-offset-2 hover:text-white hover:underline"
                to="/auth/officer/sign-in"
              >
                Officer sign-in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href="#footer-help">
                Privacy (coming soon)
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="#footer-help">
                Terms (coming soon)
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            <Link className="hover:text-white hover:underline" to="/contact">
              Contact
            </Link>
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-medium text-slate-200">Platform operator</span>{' '}
            <span className="text-slate-400">(placeholder):</span>{' '}
            RentalPro ET program office, on behalf of{' '}
            <span className="text-slate-200">
              [Ministry / Regional housing authority — TBD]
            </span>
            .
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <a
                className="text-slate-200 underline-offset-2 hover:text-white hover:underline"
                href="mailto:support@rentalpro.et"
              >
                support@rentalpro.et
              </a>{' '}
              <span className="text-slate-500">(placeholder)</span>
            </li>
            <li>
              <span className="text-slate-200">+251 … — TBD</span>
            </li>
            <li className="text-slate-400">Hours: TBD</li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Government officers should use institution-issued channels, not this
            public mailbox. Officer workspace sign-in:{' '}
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
              More contact details
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
            Officer sign-in
          </Link>
          <Link
            className="text-xs text-slate-500 underline-offset-2 hover:text-slate-400 hover:underline"
            to="/admin/sign-in"
          >
            Staff / admin login
          </Link>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} RentalPro ET. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
