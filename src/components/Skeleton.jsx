import { cn } from '../lib/utils'

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-dark-700 rounded',
        className
      )}
    />
  )
}

export function ProfileCardSkeleton() {
  return (
    <div className="bg-dark-800 rounded-2xl border border-dark-600 p-6 w-full max-w-sm">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="w-32 h-32 rounded-full" />
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 flex-wrap justify-center">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  )
}
