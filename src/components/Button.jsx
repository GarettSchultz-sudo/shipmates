import { cn } from '../lib/utils'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white',
    outline: 'border border-dark-500 hover:bg-dark-700 text-white',
    ghost: 'hover:bg-dark-700 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
    icon: 'p-2',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
