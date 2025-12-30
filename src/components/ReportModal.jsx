import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Ban, Flag } from 'lucide-react'
import { Button } from './Button'
import { useBlocks } from '../hooks/useBlocks'
import toast from 'react-hot-toast'

const REPORT_REASONS = [
  { value: 'spam', label: 'Spam or fake profile' },
  { value: 'inappropriate', label: 'Inappropriate content' },
  { value: 'harassment', label: 'Harassment or bullying' },
  { value: 'scam', label: 'Scam or fraud' },
  { value: 'other', label: 'Other' },
]

export function ReportModal({ isOpen, onClose, userId, userName, onAction }) {
  const { blockUser, reportUser, loading } = useBlocks()
  const [step, setStep] = useState('choose') // 'choose', 'report', 'confirm'
  const [selectedReason, setSelectedReason] = useState(null)
  const [details, setDetails] = useState('')
  const [action, setAction] = useState(null) // 'block' or 'report'

  const handleBlock = async () => {
    const result = await blockUser(userId)
    if (result.success) {
      toast.success(`${userName} has been blocked`)
      onAction?.('blocked')
      handleClose()
    } else {
      toast.error('Failed to block user')
    }
  }

  const handleReport = async () => {
    if (!selectedReason) {
      toast.error('Please select a reason')
      return
    }

    const result = await reportUser(userId, selectedReason, details)
    if (result.success) {
      toast.success('Report submitted. Thank you for keeping ShipMates safe!')
      onAction?.('reported')
      handleClose()
    } else {
      toast.error('Failed to submit report')
    }
  }

  const handleClose = () => {
    setStep('choose')
    setSelectedReason(null)
    setDetails('')
    setAction(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-800 rounded-2xl border border-dark-600 p-6 z-50 w-full max-w-md mx-4"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {step === 'choose' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Report or Block</h2>
                    <p className="text-sm text-gray-400">{userName}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAction('block')
                    setStep('confirm')
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-dark-700 rounded-xl border border-dark-600 hover:border-dark-500 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Block</h3>
                    <p className="text-sm text-gray-400">
                      They won't see you or contact you
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setStep('report')}
                  className="w-full flex items-center gap-4 p-4 bg-dark-700 rounded-xl border border-dark-600 hover:border-dark-500 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Report</h3>
                    <p className="text-sm text-gray-400">
                      Report inappropriate behavior
                    </p>
                  </div>
                </button>
              </div>
            )}

            {step === 'report' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Report {userName}</h2>
                    <p className="text-sm text-gray-400">Select a reason</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {REPORT_REASONS.map((reason) => (
                    <button
                      key={reason.value}
                      onClick={() => setSelectedReason(reason.value)}
                      className={`w-full p-3 rounded-xl border text-left transition-colors ${
                        selectedReason === reason.value
                          ? 'border-brand-500 bg-brand-500/10 text-white'
                          : 'border-dark-600 bg-dark-700 text-gray-300 hover:border-dark-500'
                      }`}
                    >
                      {reason.label}
                    </button>
                  ))}
                </div>

                {selectedReason === 'other' && (
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Please describe the issue..."
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    rows={3}
                  />
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setStep('choose')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleReport}
                    disabled={!selectedReason || loading}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAction('block')
                      } else {
                        setAction(null)
                      }
                    }}
                    className="rounded border-dark-600 bg-dark-700 text-brand-500 focus:ring-brand-500"
                  />
                  Also block this user
                </label>
              </div>
            )}

            {step === 'confirm' && action === 'block' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Ban className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Block {userName}?</h2>
                  </div>
                </div>

                <p className="text-gray-400">
                  {userName} will no longer be able to:
                </p>
                <ul className="text-gray-400 text-sm space-y-1 ml-4 list-disc">
                  <li>See your profile</li>
                  <li>Match with you</li>
                  <li>Send you messages</li>
                </ul>
                <p className="text-gray-500 text-sm">
                  They won't be notified that you blocked them.
                </p>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="secondary"
                    onClick={() => setStep('choose')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBlock}
                    disabled={loading}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    {loading ? 'Blocking...' : 'Block'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
