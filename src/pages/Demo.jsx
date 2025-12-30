import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Star, ArrowLeft, Send, Sparkles, MessageCircle, Users } from 'lucide-react'
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
  },
  {
    id: 2,
    display_name: 'Marcus Johnson',
    one_liner: 'Creating a no-code platform for indie hackers to launch faster',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    tech_stack: ['No-Code', 'Design', 'Marketing'],
    looking_for: ['Accountability Partner', 'Feedback'],
    building_pace: 'weekly',
  },
  {
    id: 3,
    display_name: 'Emma Rodriguez',
    one_liner: 'Shipping a community platform for remote workers',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    tech_stack: ['Next.js', 'Node.js', 'Design'],
    looking_for: ['Cofounder', 'Design Help'],
    building_pace: 'daily',
  },
]

const DEMO_MATCHES = [
  {
    id: 1,
    otherUser: {
      display_name: 'Alex Kim',
      one_liner: 'Building tools for remote teams',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    lastMessage: { content: 'Hey! Love your project idea!', created_at: new Date(Date.now() - 1000 * 60 * 5) },
    unreadCount: 2,
  },
  {
    id: 2,
    otherUser: {
      display_name: 'Jordan Lee',
      one_liner: 'Indie hacker shipping SaaS products',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    },
    lastMessage: { content: 'Want to hop on a call this week?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    unreadCount: 0,
  },
  {
    id: 3,
    otherUser: {
      display_name: 'Sam Taylor',
      one_liner: 'Full-stack dev looking for co-founders',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    },
    lastMessage: null,
    unreadCount: 0,
  },
]

const DEMO_MESSAGES = [
  { id: 1, sender_id: 'other', content: 'Hey! I saw your profile and love what you are building!', created_at: new Date(Date.now() - 1000 * 60 * 30) },
  { id: 2, sender_id: 'me', content: 'Thanks! Your project looks awesome too. The remote tools space is so hot right now.', created_at: new Date(Date.now() - 1000 * 60 * 25) },
  { id: 3, sender_id: 'other', content: 'Right? I think there is a huge opportunity. Would love to chat more about potential collab!', created_at: new Date(Date.now() - 1000 * 60 * 20) },
  { id: 4, sender_id: 'me', content: 'Absolutely! I am free tomorrow afternoon if you want to hop on a quick call?', created_at: new Date(Date.now() - 1000 * 60 * 10) },
  { id: 5, sender_id: 'other', content: 'Hey! Love your project idea!', created_at: new Date(Date.now() - 1000 * 60 * 5) },
]

const PACE_LABELS = {
  daily: { label: 'Shipping Daily', emoji: '🚀' },
  weekly: { label: 'Few Times a Week', emoji: '⚡' },
  weekends: { label: 'Weekends Only', emoji: '📅' },
  slow: { label: 'Slow Burn', emoji: '🔥' },
}

function formatTime(date) {
  const now = new Date()
  const diff = now - date
  if (diff < 1000 * 60 * 60) return `${Math.floor(diff / 1000 / 60)}m`
  if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / 1000 / 60 / 60)}h`
  return `${Math.floor(diff / 1000 / 60 / 60 / 24)}d`
}

export function Demo() {
  const [view, setView] = useState('swipe') // 'swipe' | 'matches' | 'chat'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatch, setShowMatch] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(DEMO_MESSAGES)

  const currentProfile = DEMO_PROFILES[currentIndex]
  const hasMore = currentIndex < DEMO_PROFILES.length

  const handleSwipe = (action) => {
    if (action === 'connect' && currentIndex === 0) {
      setShowMatch(true)
    }
    setCurrentIndex((i) => i + 1)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setMessages([...messages, {
      id: messages.length + 1,
      sender_id: 'me',
      content: newMessage,
      created_at: new Date(),
    }])
    setNewMessage('')
  }

  // Chat View
  if (view === 'chat' && selectedMatch) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col">
        {/* Chat Header */}
        <header className="bg-dark-900/90 backdrop-blur-sm border-b border-dark-700">
          <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => { setView('matches'); setSelectedMatch(null); }}
              className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <Avatar src={selectedMatch.otherUser.avatar_url} alt={selectedMatch.otherUser.display_name} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">{selectedMatch.otherUser.display_name}</h3>
              <p className="text-xs text-gray-400 truncate">{selectedMatch.otherUser.one_liner}</p>
            </div>
            <div className="bg-yellow-500/20 px-2 py-1 rounded-full">
              <span className="text-yellow-500 text-xs font-medium">Demo</span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-lg mx-auto w-full">
          {messages.map((msg, index) => {
            const isOwn = msg.sender_id === 'me'
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    isOwn
                      ? 'bg-brand-500 text-white rounded-br-md'
                      : 'bg-dark-700 text-white rounded-bl-md'
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-brand-200' : 'text-gray-500'}`}>
                    {formatTime(msg.created_at)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Input */}
        <div className="border-t border-dark-700 p-4">
          <div className="max-w-lg mx-auto flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-dark-800 border border-dark-600 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="icon" className="rounded-full">
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Matches View
  if (view === 'matches') {
    return (
      <div className="min-h-screen bg-dark-900">
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
              <span className="text-yellow-500 text-xs font-medium">Demo</span>
            </div>
          </div>
        </header>

        <main className="pt-20 pb-24 px-4">
          <div className="max-w-lg mx-auto">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setView('swipe')}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors"
              >
                <Users size={18} />
                <span>Discover</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-500 text-white"
              >
                <MessageCircle size={18} />
                <span>Matches</span>
              </button>
            </div>

            <h1 className="text-2xl font-bold text-white mb-6">Your Matches</h1>

            <div className="space-y-3">
              {DEMO_MATCHES.map((match, index) => (
                <motion.button
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => { setSelectedMatch(match); setView('chat'); }}
                  className="w-full flex items-center gap-4 p-4 bg-dark-800 rounded-xl border border-dark-600 hover:border-dark-500 transition-colors text-left"
                >
                  <div className="relative">
                    <Avatar src={match.otherUser.avatar_url} alt={match.otherUser.display_name} size="lg" />
                    {match.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {match.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white truncate">{match.otherUser.display_name}</h3>
                      {match.lastMessage && (
                        <span className="text-xs text-gray-500">{formatTime(match.lastMessage.created_at)}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {match.lastMessage ? match.lastMessage.content : match.otherUser.one_liner}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Swipe View (default)
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
            <span className="text-yellow-500 text-xs font-medium">Demo</span>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4">
        <div className="max-w-lg mx-auto">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-500 text-white"
            >
              <Users size={18} />
              <span>Discover</span>
            </button>
            <button
              onClick={() => setView('matches')}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-dark-800 text-gray-400 hover:text-white transition-colors relative"
            >
              <MessageCircle size={18} />
              <span>Matches</span>
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </button>
          </div>

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
                  You have seen everyone!
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
                          &quot;{currentProfile.one_liner}&quot;
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

              <h2 className="text-2xl font-bold text-white mb-2">It is a Match!</h2>
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
