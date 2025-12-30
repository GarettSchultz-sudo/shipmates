import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Flag } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useMessages } from '../hooks/useMessages'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { ReportModal } from './ReportModal'
import { formatTimestamp } from '../lib/utils'

export function ChatWindow({ match, onBack }) {
  const { user } = useAuth()
  const { messages, loading, sendMessage } = useMessages(match?.id)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const messagesEndRef = useRef(null)

  const otherUser = match?.otherUser

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return

    setSending(true)
    await sendMessage(newMessage)
    setNewMessage('')
    setSending(false)
  }

  const handleReportAction = (action) => {
    if (action === 'blocked') {
      onBack()
    }
  }

  if (!match || !otherUser) return null

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-dark-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <Avatar src={otherUser.avatar_url} alt={otherUser.display_name} size="md" />
        <div className="flex-1">
          <h3 className="font-semibold text-white">{otherUser.display_name}</h3>
          <p className="text-sm text-gray-400 truncate">{otherUser.one_liner}</p>
        </div>
        <button
          onClick={() => setShowReport(true)}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
          title="Report or block"
        >
          <Flag size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No messages yet.</p>
            <p className="text-sm">Say hi to start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.sender_id === user?.id
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
                  <p
                    className={`text-xs mt-1 ${
                      isOwn ? 'text-brand-200' : 'text-gray-500'
                    }`}
                  >
                    {formatTimestamp(msg.created_at)}
                  </p>
                </div>
              </motion.div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-dark-800 border border-dark-600 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            size="icon"
            className="rounded-full"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        userId={otherUser?.id}
        userName={otherUser?.display_name}
        onAction={handleReportAction}
      />
    </div>
  )
}
