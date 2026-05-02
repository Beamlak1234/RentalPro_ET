import { type InputHTMLAttributes, forwardRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  labelClassName?: string
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, labelClassName = '', className = '', id, name, ...props },
  ref,
) {
  const fieldId = id ?? name ?? label?.replace(/\s+/g, '-').toLowerCase()

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
      <input
        ref={ref}
        id={fieldId}
        name={name}
        className={`min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]/20 ${className}`}
        {...props}
      />
    </div>
  )
})
