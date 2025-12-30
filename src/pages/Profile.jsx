import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Save, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Layout } from '../components/Layout'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/Input'
import { TagGroup } from '../components/Tag'
import {
  TECH_STACK_OPTIONS,
  LOOKING_FOR_OPTIONS,
  BUILDING_PACE_OPTIONS,
} from '../lib/constants'
import toast from 'react-hot-toast'

export function Profile() {
  const { user, profile, loading: authLoading, updateProfile, signOut } = useAuth()
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    display_name: profile?.display_name || '',
    one_liner: profile?.one_liner || '',
    project_url: profile?.project_url || '',
    tech_stack: profile?.tech_stack || [],
    looking_for: profile?.looking_for || [],
    building_pace: profile?.building_pace || '',
    timezone: profile?.timezone || '',
  })

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

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!form.display_name || !form.one_liner) {
      toast.error('Please fill in required fields')
      return
    }

    setSaving(true)
    const { error } = await updateProfile(form)

    if (error) {
      toast.error('Failed to update profile')
    } else {
      toast.success('Profile updated!')
    }
    setSaving(false)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <Avatar
              src={profile.avatar_url}
              alt={profile.display_name}
              size="2xl"
              className="ring-4 ring-brand-500 mb-4"
            />
            <p className="text-sm text-gray-400">
              Avatar synced from{' '}
              {user.app_metadata?.provider === 'twitter'
                ? 'Twitter'
                : 'GitHub'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input
              label="Display Name"
              value={form.display_name}
              onChange={(e) => updateForm('display_name', e.target.value)}
            />

            <div>
              <Textarea
                label="What are you building?"
                value={form.one_liner}
                onChange={(e) =>
                  updateForm('one_liner', e.target.value.slice(0, 140))
                }
                rows={3}
              />
              <p className="text-right text-sm text-gray-500 mt-1">
                {form.one_liner.length}/140
              </p>
            </div>

            <Input
              label="Project URL"
              value={form.project_url}
              onChange={(e) => updateForm('project_url', e.target.value)}
              placeholder="https://yourproject.com"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tech Stack
              </label>
              <TagGroup
                options={TECH_STACK_OPTIONS}
                selected={form.tech_stack}
                onChange={(val) => updateForm('tech_stack', val)}
                multi
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Looking For
              </label>
              <TagGroup
                options={LOOKING_FOR_OPTIONS}
                selected={form.looking_for}
                onChange={(val) => updateForm('looking_for', val)}
                multi
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Building Pace
              </label>
              <TagGroup
                options={BUILDING_PACE_OPTIONS}
                selected={form.building_pace}
                onChange={(val) => updateForm('building_pace', val)}
              />
            </div>

            <Input
              label="Timezone"
              value={form.timezone}
              onChange={(e) => updateForm('timezone', e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full gap-2"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>

            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full gap-2 text-red-500 border-red-500/50 hover:bg-red-500/20"
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
