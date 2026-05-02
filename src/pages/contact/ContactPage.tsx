import { Link } from 'react-router-dom'

export function ContactPage() {
  return (
    <div className="bg-white px-4 py-12 text-slate-900 sm:py-16">
      <article className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e293b] sm:text-4xl">
          Contact &amp; support
        </h1>
        <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-500">
          Public information — placeholders for product owners to replace.
        </p>

        <section className="mt-10 space-y-6 text-base leading-relaxed text-slate-700">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1e293b]">
              Platform operator
            </h2>
            <p className="mt-2">
              <span className="font-semibold text-slate-900">
                RentalPro ET program office
              </span>{' '}
              <span className="text-slate-500">(placeholder)</span>
              <br />
              Operating on behalf of{' '}
              <span className="font-medium text-slate-900">
                [Ministry / Regional housing authority — TBD]
              </span>
              . Replace this block with the official programme name and legal
              entity once confirmed.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#1e293b]">
              Public helpdesk
            </h2>
            <ul className="mt-2 list-inside list-disc space-y-2 text-slate-700">
              <li>
                Email:{' '}
                <a
                  className="font-medium text-[#1e293b] underline underline-offset-2 hover:no-underline"
                  href="mailto:support@rentalpro.et"
                >
                  support@rentalpro.et
                </a>{' '}
                <span className="text-slate-500">(placeholder)</span>
              </li>
              <li>
                Phone:{' '}
                <span className="font-medium text-slate-900">+251 … — TBD</span>
              </li>
              <li>
                Hours: <span className="font-medium text-slate-900">TBD</span>{' '}
                (e.g. weekdays, time zone East Africa Time)
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
            <h2 className="text-sm font-semibold text-[#1e293b]">
              Government officers
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Do not use the public helpdesk for sensitive casework. Use the
              channels and escalation paths issued by your institution. Access
              the{' '}
              <Link
                className="font-semibold text-[#1e293b] underline underline-offset-2 hover:no-underline"
                to="/government"
              >
                Officer portal
              </Link>{' '}
              for sign-in and onboarding guidance.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Staff and platform administration use the separate staff sign-in
            linked in the site footer — not listed here.
          </p>
        </section>

        <p className="mt-10">
          <Link
            className="text-sm font-semibold text-[#1e293b] underline underline-offset-2 hover:no-underline"
            to="/"
          >
            ← Back to welcome
          </Link>
        </p>
      </article>
    </div>
  )
}
