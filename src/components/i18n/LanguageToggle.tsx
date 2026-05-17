import { useId } from 'react'

import { useLocale } from '../../context/LocaleContext'
import type { UiLanguagePreference } from '../../auth/participantProfile'

type Props = {
  className?: string
  /** Dark header surface (navy) vs light. */
  variant?: 'headerDark' | 'light'
}

export function LanguageToggle({ className = '', variant = 'headerDark' }: Props) {
  const uid = useId()
  const { lang, setLang, usesParticipantPreferredLanguage, t } = useLocale()
  const labelId = `${uid}-lang`

  const baseSelect =
    variant === 'headerDark' ?
      'rounded-md border border-white/35 bg-[#0f172a]/90 px-2 py-1.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
    : 'rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm font-semibold text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]'

  return (
    <div className={`flex shrink-0 items-center gap-1.5 ${className}`}>
      <span id={labelId} className="sr-only">
        {t('common.language')}
        {usesParticipantPreferredLanguage ?
          ' (saved to participant profile)'
        : ' (saved to this browser)'}
      </span>
      <label htmlFor={`${labelId}-sel`} className="sr-only">
        {t('common.language')}
      </label>
      <select
        id={`${labelId}-sel`}
        className={`min-h-10 ${baseSelect}`}
        aria-labelledby={labelId}
        value={lang}
        onChange={(e) => setLang(e.target.value as UiLanguagePreference)}
      >
        <option value="en">{t('common.langEnglish')}</option>
        <option value="am">{t('common.langAmharic')}</option>
      </select>
    </div>
  )
}
