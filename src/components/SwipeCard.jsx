import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Avatar } from './Avatar'
import { Tag } from './Tag'
import { BUILDING_PACE_OPTIONS, LOOKING_FOR_OPTIONS } from '../lib/constants'
import { ExternalLink, Flag } from 'lucide-react'

export function SwipeCard({ profile, onSwipe, onReport, style }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  const leftIndicatorOpacity = useTransform(x, [-100, 0], [1, 0])
  const rightIndicatorOpacity = useTransform(x, [0, 100], [0, 1])

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      onSwipe('connect')
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('pass')
    }
  }

  const pace = BUILDING_PACE_OPTIONS.find((p) => p.value === profile.building_pace)
  const lookingFor = (profile.looking_for || []).map(
    (val) => LOOKING_FOR_OPTIONS.find((o) => o.value === val)?.label || val
  )

  return (
    <motion.div
      className="absolute w-full max-w-sm cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity, ...style }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.02 }}
    >
      {/* Swipe Indicators */}
      <motion.div
        className="absolute -left-4 top-1/2 -translate-y-1/2 text-red-500 text-4xl font-bold z-10"
        style={{ opacity: leftIndicatorOpacity }}
      >
        PASS
      </motion.div>
      <motion.div
        className="absolute -right-4 top-1/2 -translate-y-1/2 text-green-500 text-4xl font-bold z-10"
        style={{ opacity: rightIndicatorOpacity }}
      >
        CONNECT
      </motion.div>

      {/* Card Content */}
      <div className="bg-dark-800 rounded-2xl border border-dark-600 overflow-hidden relative">
        {/* Report Button */}
        {onReport && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onReport(profile)
            }}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-dark-700/80 text-gray-400 hover:text-red-400 hover:bg-dark-600 transition-colors"
            title="Report or block"
          >
            <Flag size={16} />
          </button>
        )}

        {/* Avatar Section */}
        <div className="bg-gradient-to-br from-brand-600/20 to-purple-600/20 p-8 flex flex-col items-center">
          <Avatar
            src={profile.avatar_url}
            alt={profile.display_name}
            size="2xl"
            className="ring-4 ring-dark-800"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">
            {profile.display_name}
          </h2>
          {pace && (
            <p className="text-gray-400 text-sm mt-1">
              {pace.emoji} {pace.label}
            </p>
          )}
        </div>

        {/* Info Section */}
        <div className="p-6 space-y-4">
          {/* One-liner */}
          <p className="text-white text-lg text-center leading-relaxed">
            "{profile.one_liner}"
          </p>

          {/* Project URL */}
          {profile.project_url && (
            <a
              href={profile.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-brand-400 hover:text-brand-300 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
              {new URL(profile.project_url).hostname}
            </a>
          )}

          {/* Tech Stack */}
          {profile.tech_stack?.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {profile.tech_stack.map((tech) => (
                <Tag key={tech} selected className="text-xs">
                  {tech}
                </Tag>
              ))}
            </div>
          )}

          {/* Looking For */}
          {lookingFor.length > 0 && (
            <div className="pt-2 border-t border-dark-600">
              <p className="text-gray-500 text-xs text-center mb-2">Looking for:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {lookingFor.map((item) => (
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

          {/* Timezone */}
          {profile.timezone && (
            <p className="text-gray-500 text-xs text-center">
              {profile.timezone}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
