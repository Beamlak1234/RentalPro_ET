import { type ButtonHTMLAttributes, forwardRef } from 'react'

const base =
  'inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary:
    'bg-[#1e293b] text-white hover:bg-[#334155] focus-visible:outline-[#1e293b]',
  secondary:
    'border-2 border-[#1e293b] bg-white text-[#1e293b] hover:bg-slate-50 focus-visible:outline-[#1e293b]',
  ghost:
    'min-h-12 bg-transparent px-3 text-[#1e293b] hover:bg-slate-100 focus-visible:outline-[#1e293b]',
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className = '', variant = 'primary', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
