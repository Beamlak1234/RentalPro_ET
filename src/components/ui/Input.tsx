import { Eye, EyeOff } from 'lucide-react'
import {
  type InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  labelClassName?: string
  /** Renders a show/hide control; input stays `password` by default. */
  passwordVisibilityToggle?: boolean
}

const inputFieldClass =
  'min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20'

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    label,
    labelClassName = '',
    className = '',
    id,
    name,
    passwordVisibilityToggle = false,
    type,
    ...props
  },
  ref,
) {
  const fieldId = id ?? name ?? label?.replace(/\s+/g, '-').toLowerCase()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const resolvedType =
    passwordVisibilityToggle ?
      passwordVisible ? 'text'
      : 'password'
    : type

  const control = (
    <input
      ref={ref}
      id={fieldId}
      name={name}
      type={resolvedType}
      className={`${inputFieldClass} ${passwordVisibilityToggle ? 'pr-12' : ''} ${className}`}
      {...props}
    />
  )

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={fieldId}
          className={`text-sm font-medium text-slate-700 ${labelClassName}`}
        >
          {label}
        </label>
      ) : null}
      {passwordVisibilityToggle ?
        <div className="relative w-full">
          {control}
          <button
            type="button"
            className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e293b]"
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passwordVisible}
            onClick={() => setPasswordVisible((v) => !v)}
          >
            {passwordVisible ?
              <EyeOff className="size-5" aria-hidden />
            : <Eye className="size-5" aria-hidden />}
          </button>
        </div>
      : control}
    </div>
  )
})
