import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/Input'
import { TagGroup } from '../components/Tag'
import { Avatar } from '../components/Avatar'
import {
  TECH_STACK_OPTIONS,
  LOOKING_FOR_OPTIONS,
  BUILDING_PACE_OPTIONS,
} from '../lib/constants'
import { getTimezone } from '../lib/utils'
import toast from 'react-hot-toast'

const STEPS = [
  { id: 'basics', title: 'The Basics' },
  { id: 'stack', title: 'Your Stack' },
  { id: 'goals', title: 'Your Goals' },
  { id: 'pace', title: 'Your Pace' },
]

export function Onboarding() {
  const { user, profile, loading, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    display_name: '',
    one_liner: '',
    project_url: '',
    tech_stack: [],
    looking_for: [],
    building_pace: '',
    timezone: getTimezone(),
    avatar_url: '',
  })

  // Pre-fill from user metadata
  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {}
      setForm((prev) => ({
        ...prev,
        display_name: meta.full_name || meta.user_name || meta.name || '',
        avatar_url: meta.avatar_url || meta.picture || '',
      }))
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (profile) {
    return <Navigate to="/swipe" replace />
  }

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep((s) => s - 1)
    }
  }

  const handleSubmit = async () => {
    if (!form.display_name || !form.one_liner) {
      toast.error('Please fill in all required fields')
      return
    }

    setSaving(true)
    const { error } = await updateProfile({
      ...form,
      created_at: new Date().toISOString(),
    })

    if (error) {
      toast.error('Failed to save profile')
      setSaving(false)
      return
    }

    toast.success('Profile created!')
    navigate('/swipe')
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return form.display_name.length > 0 && form.one_liner.length > 0
      case 1:
        return form.tech_stack.length > 0
      case 2:
        return form.looking_for.length > 0
      case 3:
        return form.building_pace.length > 0
      default:
        return true
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="basics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <Avatar
                src={form.avatar_url}
                alt={form.display_name}
                size="2xl"
                className="ring-4 ring-brand-500"
              />
            </div>

            <Input
              label="Display Name"
              placeholder="Your name or alias"
              value={form.display_name}
              onChange={(e) => updateForm('display_name', e.target.value)}
            />

            <Textarea
              label="What are you building?"
              placeholder="e.g., An AI-powered note-taking app for developers"
              value={form.one_liner}
              onChange={(e) =>
                updateForm('one_liner', e.target.value.slice(0, 140))
              }
              rows={3}
            />
            <p className="text-right text-sm text-gray-500">
              {form.one_liner.length}/140
            </p>

            <Input
              label="Project URL (optional)"
              placeholder="https://yourproject.com"
              value={form.project_url}
              onChange={(e) => updateForm('project_url', e.target.value)}
            />
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            key="stack"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-gray-400 text-sm">
              Select your tech stack and skills (select all that apply)
            </p>
            <TagGroup
              options={TECH_STACK_OPTIONS}
              selected={form.tech_stack}
              onChange={(val) => updateForm('tech_stack', val)}
              multi
            />
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="goals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-gray-400 text-sm">
              What are you looking for? (select all that apply)
            </p>
            <TagGroup
              options={LOOKING_FOR_OPTIONS}
              selected={form.looking_for}
              onChange={(val) => updateForm('looking_for', val)}
              multi
            />
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="pace"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <p className="text-gray-400 text-sm">
              How often do you ship?
            </p>
            <TagGroup
              options={BUILDING_PACE_OPTIONS}
              selected={form.building_pace}
              onChange={(val) => updateForm('building_pace', val)}
            />

            <div className="pt-4">
              <Input
                label="Timezone"
                value={form.timezone}
                onChange={(e) => updateForm('timezone', e.target.value)}
              />
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-center gap-2">
        <Sparkles className="w-6 h-6 text-brand-500" />
        <span className="text-xl font-bold">ShipMates</span>
      </div>

      {/* Progress */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-brand-500' : 'bg-dark-700'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">
          {STEPS[step].title}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-24">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-dark-900/90 backdrop-blur-sm border-t border-dark-700">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 0 && (
            <Button variant="secondary" onClick={prevStep} className="gap-2">
              <ArrowLeft size={18} />
              Back
            </Button>
          )}
          <Button
            onClick={step === STEPS.length - 1 ? handleSubmit : nextStep}
            disabled={!canProceed() || saving}
            className="flex-1 gap-2"
          >
            {step === STEPS.length - 1 ? (
              <>
                {saving ? 'Creating...' : 'Complete Profile'}
                <Check size={18} />
              </>
            ) : (
              <>
                Next
                <ArrowRight size={18} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
