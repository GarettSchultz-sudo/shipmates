import { cn } from '../lib/utils'

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-dark-800 rounded-2xl border border-dark-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
