import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send } from 'lucide-react'
import { Modal } from './Modal'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { Input } from './Input'
import { useMessages } from '../hooks/useMessages'

export function MatchModal({ isOpen, onClose, match, otherUser, currentUser }) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const { sendMessage } = useMessages(match?.id)

  const handleSend = async () => {
    if (!message.trim()) return

    setSending(true)
    await sendMessage(message)
    setSending(false)
    setMessage('')
    onClose()
  }

  if (!otherUser) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="text-center">
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
        You and {otherUser.display_name} both want to connect!
      </p>

      <div className="flex justify-center items-center gap-4 mb-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Avatar
            src={currentUser?.avatar_url}
            alt={currentUser?.display_name}
            size="xl"
            className="ring-4 ring-brand-500"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl"
        >
          🤝
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Avatar
            src={otherUser.avatar_url}
            alt={otherUser.display_name}
            size="xl"
            className="ring-4 ring-purple-500"
          />
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder={`Say hi to ${otherUser.display_name}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            size="icon"
            className="shrink-0"
          >
            <Send size={20} />
          </Button>
        </div>
        <Button variant="ghost" onClick={onClose} className="w-full">
          Keep Swiping
        </Button>
      </div>
    </Modal>
  )
}
