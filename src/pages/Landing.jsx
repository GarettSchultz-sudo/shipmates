import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Mail, Users, Rocket, MessageCircle, X, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Navigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export function Landing() {
  const { user, profile, loading, signInWithGitHub, signUp, signIn } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (user && profile) {
    return <Navigate to="/swipe" replace />
  }

  if (user && !profile) {
    return <Navigate to="/onboarding" replace />
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setAuthLoading(true)

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Check your email to confirm your account!')
          setShowAuthModal(false)
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          toast.error(error.message)
        }
      }
    } finally {
      setAuthLoading(false)
    }
  }

  const features = [
    {
      icon: Users,
      title: 'Find Your Match',
      description: 'Connect with VibeCoders and PublicBuilders who complement your skills and share a vision',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      number: '01',
    },
    {
      icon: Rocket,
      title: 'Ship Together',
      description: 'Find cofounders, accountability partners, or collaborators',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
      number: '02',
    },
    {
      icon: MessageCircle,
      title: 'Start Building',
      description: 'Match, chat, and start shipping together',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      number: '03',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full"
        >
          <img
            src="/shipmates-logo.png"
            alt="ShipMates - Don't Ship Alone"
            className="w-64 h-auto mb-10 mx-auto drop-shadow-2xl"
          />

          <div className="space-y-4 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className={`relative overflow-hidden flex items-center gap-4 text-left rounded-2xl p-5 border border-white/10 bg-gradient-to-r ${feature.gradient} backdrop-blur-sm cursor-default`}
              >
                <div className={`shrink-0 w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
                <span className="absolute top-2 right-3 text-xs font-mono text-white/20">{feature.number}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={signInWithGitHub}
              size="lg"
              className="w-full gap-2"
            >
              <Github size={20} />
              Continue with GitHub
            </Button>
            <Button
              onClick={() => {
                setIsSignUp(true)
                setShowAuthModal(true)
              }}
              variant="secondary"
              size="lg"
              className="w-full gap-2"
            >
              <Mail size={20} />
              Sign up with Email
            </Button>
          </motion.div>

          <p className="mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => {
                setIsSignUp(false)
                setShowAuthModal(true)
              }}
              className="text-brand-400 hover:text-brand-300 underline underline-offset-4"
            >
              Sign in
            </button>
          </p>

          <Link
            to="/demo"
            className="mt-4 inline-block text-sm text-brand-400 hover:text-brand-300 underline underline-offset-4"
          >
            Try the demo first
          </Link>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-black/70 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-800 rounded-2xl border border-dark-600 p-6 z-50 w-full max-w-md mx-4"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={authLoading}
                >
                  {authLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-400">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsSignUp(false)}
                      className="text-brand-400 hover:text-brand-300"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Need an account?{' '}
                    <button
                      onClick={() => setIsSignUp(true)}
                      className="text-brand-400 hover:text-brand-300"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-dark-600">
                <Button
                  onClick={() => {
                    setShowAuthModal(false)
                    signInWithGitHub()
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full gap-2"
                >
                  <Github size={20} />
                  Continue with GitHub
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
