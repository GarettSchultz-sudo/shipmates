import { useState, useEffect, useCallback } from 'react'
import { Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Star, RefreshCw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useProfiles } from '../hooks/useProfiles'
import { useSwipes } from '../hooks/useSwipes'
import { Layout } from '../components/Layout'
import { SwipeCard } from '../components/SwipeCard'
import { MatchModal } from '../components/MatchModal'
import { ProfileCardSkeleton } from '../components/Skeleton'
import { Button } from '../components/Button'
import toast from 'react-hot-toast'

export function Swipe() {
  const { user, profile, loading: authLoading } = useAuth()
  const { currentProfile, hasMoreProfiles, loading, nextProfile, refetch } = useProfiles()
  const { swipe, superConnectsRemaining, canSuperConnect } = useSwipes()
  const [showMatch, setShowMatch] = useState(false)
  const [matchedUser, setMatchedUser] = useState(null)
  const [matchData, setMatchData] = useState(null)
  const [swiping, setSwiping] = useState(false)

  const handleSwipe = useCallback(async (action) => {
    if (!currentProfile || swiping) return

    setSwiping(true)
    const result = await swipe(currentProfile.id, action)

    if (result.isNewMatch) {
      setMatchedUser(currentProfile)
      setMatchData(result.match)
      setShowMatch(true)
    } else if (action === 'super_connect') {
      toast.success('Super Connect sent!')
    }

    nextProfile()
    setSwiping(false)
  }, [currentProfile, swipe, nextProfile, swiping])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showMatch) return
      if (e.key === 'ArrowLeft') handleSwipe('pass')
      if (e.key === 'ArrowRight') handleSwipe('connect')
      if (e.key === 's' || e.key === 'S') {
        if (canSuperConnect) handleSwipe('super_connect')
        else toast.error('No Super Connects left today!')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSwipe, showMatch, canSuperConnect])

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

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Super Connects Counter */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-dark-800 px-4 py-2 rounded-full text-sm">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-400">
              {superConnectsRemaining} Super Connects left today
            </span>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[500px] flex items-center justify-center">
          {loading ? (
            <ProfileCardSkeleton />
          ) : !hasMoreProfiles ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 bg-dark-800 rounded-2xl border border-dark-600"
            >
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-xl font-bold text-white mb-2">
                You've seen everyone!
              </h2>
              <p className="text-gray-400 mb-6">
                Check back soon for new builders to connect with.
              </p>
              <Button onClick={refetch} variant="secondary" className="gap-2">
                <RefreshCw size={18} />
                Refresh
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence>
              {currentProfile && (
                <SwipeCard
                  key={currentProfile.id}
                  profile={currentProfile}
                  onSwipe={handleSwipe}
                />
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Action Buttons */}
        {hasMoreProfiles && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mt-6"
          >
            <Button
              variant="outline"
              size="xl"
              onClick={() => handleSwipe('pass')}
              disabled={swiping}
              className="w-16 h-16 rounded-full !p-0 border-red-500/50 hover:bg-red-500/20"
            >
              <X className="w-8 h-8 text-red-500" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              onClick={() => handleSwipe('super_connect')}
              disabled={swiping || !canSuperConnect}
              className="w-14 h-14 rounded-full !p-0 border-yellow-500/50 hover:bg-yellow-500/20"
            >
              <Star className="w-6 h-6 text-yellow-500" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              onClick={() => handleSwipe('connect')}
              disabled={swiping}
              className="w-16 h-16 rounded-full !p-0 border-green-500/50 hover:bg-green-500/20"
            >
              <Heart className="w-8 h-8 text-green-500" />
            </Button>
          </motion.div>
        )}

        {/* Keyboard Hints */}
        <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
          <span>← Pass</span>
          <span>S Super</span>
          <span>Connect →</span>
        </div>
      </div>

      {/* Match Modal */}
      <MatchModal
        isOpen={showMatch}
        onClose={() => setShowMatch(false)}
        match={matchData}
        otherUser={matchedUser}
        currentUser={profile}
      />
    </Layout>
  )
}
