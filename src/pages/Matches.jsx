import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useMatches } from '../hooks/useMatches'
import { Layout } from '../components/Layout'
import { Avatar } from '../components/Avatar'
import { ChatWindow } from '../components/ChatWindow'
import { Skeleton } from '../components/Skeleton'
import { formatTimestamp } from '../lib/utils'

export function Matches() {
  const { user, profile, loading: authLoading } = useAuth()
  const { matches, loading } = useMatches()
  const [selectedMatch, setSelectedMatch] = useState(null)

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!profile) {
    return <Navigate to="/onboarding" replace />
  }

  if (selectedMatch) {
    return (
      <Layout>
        <div className="h-[calc(100vh-8rem)]">
          <ChatWindow
            match={selectedMatch}
            onBack={() => setSelectedMatch(null)}
          />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Your Matches</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-dark-800 rounded-xl"
              >
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </div>
        ) : matches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 mb-4">
              <MessageCircle className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No matches yet
            </h2>
            <p className="text-gray-400">
              Keep swiping to find your perfect co-builder!
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {matches.map((match, index) => (
                <motion.button
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMatch(match)}
                  className="w-full flex items-center gap-4 p-4 bg-dark-800 rounded-xl border border-dark-600 hover:border-dark-500 transition-colors text-left"
                >
                  <div className="relative">
                    <Avatar
                      src={match.otherUser?.avatar_url}
                      alt={match.otherUser?.display_name}
                      size="lg"
                    />
                    {match.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {match.unreadCount > 9 ? '9+' : match.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white truncate">
                        {match.otherUser?.display_name}
                      </h3>
                      {match.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(match.lastMessage.created_at)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {match.lastMessage
                        ? match.lastMessage.content
                        : match.otherUser?.one_liner}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  )
}
