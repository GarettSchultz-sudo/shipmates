import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useProfiles() {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fetchProfiles = useCallback(async () => {
    if (!user) return

    setLoading(true)
    try {
      // Get all profile IDs the user has already swiped on
      const { data: swipes } = await supabase
        .from('swipes')
        .select('swiped_id')
        .eq('swiper_id', user.id)

      const swipedIds = swipes?.map((s) => s.swiped_id) || []

      // Get profiles excluding self and already swiped
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .not('id', 'in', `(${swipedIds.length > 0 ? swipedIds.join(',') : 'null'})`)
        .not('display_name', 'is', null)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProfiles(data || [])
      setCurrentIndex(0)
    } catch (error) {
      console.error('Error fetching profiles:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  const currentProfile = profiles[currentIndex]
  const hasMoreProfiles = currentIndex < profiles.length

  const nextProfile = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  return {
    profiles,
    currentProfile,
    hasMoreProfiles,
    loading,
    nextProfile,
    refetch: fetchProfiles,
  }
}
