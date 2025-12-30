import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useBlocks() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  async function blockUser(blockedId, reason = null) {
    if (!user) return { error: 'Not authenticated' }

    setLoading(true)
    try {
      const { error } = await supabase.from('blocks').insert({
        blocker_id: user.id,
        blocked_id: blockedId,
        reason,
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error blocking user:', error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  async function reportUser(reportedId, reason, details = null) {
    if (!user) return { error: 'Not authenticated' }

    setLoading(true)
    try {
      const { error } = await supabase.from('reports').insert({
        reporter_id: user.id,
        reported_id: reportedId,
        reason,
        details,
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error reporting user:', error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  async function unblockUser(blockedId) {
    if (!user) return { error: 'Not authenticated' }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('blocks')
        .delete()
        .eq('blocker_id', user.id)
        .eq('blocked_id', blockedId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error unblocking user:', error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  async function getBlockedUsers() {
    if (!user) return []

    const { data } = await supabase
      .from('blocks')
      .select('blocked_id')
      .eq('blocker_id', user.id)

    return data?.map((b) => b.blocked_id) || []
  }

  return {
    blockUser,
    reportUser,
    unblockUser,
    getBlockedUsers,
    loading,
  }
}
