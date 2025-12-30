import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Star, ArrowLeft, Send, Sparkles } from 'lucide-react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Tag } from '../components/Tag'

const DEMO_PROFILES = [
  {
    id: 1,
    display_name: 'Sarah Chen',
    one_liner: 'Building an AI-powered writing assistant for developers',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    tech_stack: ['React', 'Python', 'AI/ML'],
    looking_for: ['Cofounder', 'Technical Help'],
    building_pace: 'daily',
    timezone: 'America/Los_Angeles',
    project_url: 'https://devwriter.ai',
  },
  {
    id: 2,
    display_name: 'Marcus Johnson',
    one_liner: 'Creating a no-code platform for indie hackers to launch faster',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    tech_stack: ['No-Code', 'Design', 'Marketing'],
    looking_for: ['Accountability Partner', 'Feedback'],
    building_pace: 'weekly',
    timezone: 'America/New_York',
  },
  {
    id: 3,
    display_name: 'Emma Rodriguez',
    one_liner: 'Shipping a community platform for remote workers',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    tech_stack: ['Next.js', 'Node.js', 'Design'],
    looking_for: ['Cofounder', 'Design Help'],
    building_pace: 'daily',
    timezone: 'Europe/London',
    project_url: 'https://remotehub.io',
  },
]

const PACE_LABELS = {
  daily: { label: 'Shipping Daily', emoji: '🚀' },
  weekly: { label: 'Few Times a Week', emoji: '⚡' },
  weekends: { label: 'Weekends Only', emoji: '📅' },
  slow: { label: 'Slow Burn', emoji: '🔥' },
}

export function Demo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatch, setShowMatch] = useState(false)

  const currentProfile = DEMO_PROFILES[currentIndex]
  const hasMore = currentIndex < DEMO_PROFILES.length

  const handleSwipe = (action) => {
    if (action === 'connect' && currentIndex === 0) {
      setShowMatch(true)
    }
    setCurrentIndex((i) => i + 1)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-dark-900/90 backdrop-blur-sm border-b border-dark-700 z-30">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </a>
          <div className="flex items-center gap-2">
            <img src="/shipmates-logo.png" alt="ShipMates" className="h-8" />
          </div>
          <div className="bg-yellow-500/20 px-3 py-1 rounded-full">
            <span className="text-yellow-500 text-xs font-medium">Demo Mode</span>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Super Connects Counter */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 bg-dark-800 px-4 py-2 rounded-full text-sm">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-400">3 Super Connects left today</span>
            </div>
          </div>

          {/* Card Stack */}
          <div className="relative h-[480px] flex items-center justify-center">
            {!hasMore ? (
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
                  Check back soon for new builders.
                </p>
                <Button onClick={() => setCurrentIndex(0)} variant="secondary">
                  Start Over (Demo)
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence>
                {currentProfile && (
                  <motion.div
                    key={currentProfile.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ x: 300, opacity: 0, rotate: 20 }}
                    className="absolute w-full"
                  >
                    <div className="bg-dark-800 rounded-2xl border border-dark-600 overflow-hidden">
                      {/* Avatar Section */}
                      <div className="bg-gradient-to-br from-brand-600/20 to-purple-600/20 p-8 flex flex-col items-center">
                        <Avatar
                          src={currentProfile.avatar_url}
                          alt={currentProfile.display_name}
                          size="2xl"
                          className="ring-4 ring-dark-800"
                        />
                        <h2 className="mt-4 text-2xl font-bold text-white">
                          {currentProfile.display_name}
                        </h2>
                        {currentProfile.building_pace && (
                          <p className="text-gray-400 text-sm mt-1">
                            {PACE_LABELS[currentProfile.building_pace]?.emoji}{' '}
                            {PACE_LABELS[currentProfile.building_pace]?.label}
                          </p>
                        )}
                      </div>

                      {/* Info Section */}
                      <div className="p-6 space-y-4">
                        <p className="text-white text-lg text-center leading-relaxed">
                          "{currentProfile.one_liner}"
                        </p>

                        {currentProfile.tech_stack?.length > 0 && (
                          <div className="flex flex-wrap gap-2 justify-center">
                            {currentProfile.tech_stack.map((tech) => (
                              <Tag key={tech} selected className="text-xs">
                                {tech}
                              </Tag>
                            ))}
                          </div>
                        )}

                        {currentProfile.looking_for?.length > 0 && (
                          <div className="pt-2 border-t border-dark-600">
                            <p className="text-gray-500 text-xs text-center mb-2">Looking for:</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {currentProfile.looking_for.map((item) => (
                                <span
                                  key={item}
                                  className="text-xs text-gray-300 bg-dark-700 px-2 py-1 rounded-full"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Action Buttons */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-4 mt-6"
            >
              <Button
                variant="outline"
                size="xl"
                onClick={() => handleSwipe('pass')}
                className="w-16 h-16 rounded-full !p-0 border-red-500/50 hover:bg-red-500/20"
              >
                <X className="w-8 h-8 text-red-500" />
              </Button>

              <Button
                variant="outline"
                size="xl"
                onClick={() => handleSwipe('super_connect')}
                className="w-14 h-14 rounded-full !p-0 border-yellow-500/50 hover:bg-yellow-500/20"
              >
                <Star className="w-6 h-6 text-yellow-500" />
              </Button>

              <Button
                variant="outline"
                size="xl"
                onClick={() => handleSwipe('connect')}
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
      </main>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMatch(false)}
              className="fixed inset-0 bg-black/70 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-800 rounded-2xl border border-dark-600 p-6 z-50 w-full max-w-md mx-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2">It's a Match!</h2>
              <p className="text-gray-400 mb-6">
                You and Sarah both want to connect!
              </p>

              <div className="flex justify-center items-center gap-4 mb-6">
                <Avatar
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                  alt="You"
                  size="xl"
                  className="ring-4 ring-brand-500"
                />
                <div className="text-4xl">🤝</div>
                <Avatar
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Sarah"
                  size="xl"
                  className="ring-4 ring-purple-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Say hi to Sarah..."
                    className="flex-1 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500"
                  />
                  <Button size="icon" className="shrink-0">
                    <Send size={20} />
                  </Button>
                </div>
                <Button variant="ghost" onClick={() => setShowMatch(false)} className="w-full">
                  Keep Swiping
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
