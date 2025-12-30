import { cn } from '../lib/utils'

export function Input({ label, error, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg',
          'text-white placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
          'transition-all duration-200',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg',
          'text-white placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
          'transition-all duration-200 resize-none',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
