import { Link, useLocation } from 'react-router-dom'
import { Users, MessageCircle, User, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useMatches } from '../hooks/useMatches'
import { cn } from '../lib/utils'

export function Layout({ children }) {
  const location = useLocation()
  const { profile } = useAuth()
  const { matches } = useMatches()

  const totalUnread = matches.reduce((sum, m) => sum + m.unreadCount, 0)

  const navItems = [
    { path: '/swipe', icon: Users, label: 'Discover' },
    { path: '/matches', icon: MessageCircle, label: 'Matches', badge: totalUnread },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-dark-900/90 backdrop-blur-sm border-b border-dark-700 z-30">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center">
          <Link to="/swipe" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-500" />
            <span className="text-xl font-bold">ShipMates</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-14 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      {profile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-dark-900/90 backdrop-blur-sm border-t border-dark-700 z-30">
          <div className="max-w-lg mx-auto px-4">
            <div className="flex justify-around py-2">
              {navItems.map(({ path, icon: Icon, label, badge }) => {
                const isActive = location.pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      'flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative',
                      isActive
                        ? 'text-brand-500'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    <Icon size={24} />
                    <span className="text-xs">{label}</span>
                    {badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {badge > 9 ? '9+' : badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  )
}
