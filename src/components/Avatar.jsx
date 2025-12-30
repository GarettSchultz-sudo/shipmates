import { cn } from '../lib/utils'

export function Avatar({ src, alt, size = 'md', className }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  }

  const fallback = alt ? alt.charAt(0).toUpperCase() : '?'

  return (
    <div
      className={cn(
        'rounded-full bg-dark-700 flex items-center justify-center overflow-hidden',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
      ) : null}
      <span
        className={cn(
          'font-bold text-gray-400',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-xl',
          size === 'xl' && 'text-2xl',
          size === '2xl' && 'text-4xl',
          src && 'hidden'
        )}
      >
        {fallback}
      </span>
    </div>
  )
}
