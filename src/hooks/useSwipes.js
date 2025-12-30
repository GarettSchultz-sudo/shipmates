import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { SUPER_CONNECTS_PER_DAY } from '../lib/constants'

export function useSwipes() {
  const { user } = useAuth()
  const [superConnectsToday, setSuperConnectsToday] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchSuperConnectsToday()
    }
  }, [user])

  async function fetchSuperConnectsToday() {
    if (!user) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from('swipes')
      .select('*', { count: 'exact', head: true })
      .eq('swiper_id', user.id)
      .eq('action', 'super_connect')
      .gte('created_at', today.toISOString())

    setSuperConnectsToday(count || 0)
  }

  async function swipe(swipedId, action) {
    if (!user) return { error: 'Not authenticated' }

    setLoading(true)
    try {
      // Record the swipe
      const { error: swipeError } = await supabase.from('swipes').insert({
        swiper_id: user.id,
        swiped_id: swipedId,
        action,
      })

      if (swipeError) throw swipeError

      // Check for mutual match (if action is connect or super_connect)
      if (action === 'connect' || action === 'super_connect') {
        const { data: mutualSwipe } = await supabase
          .from('swipes')
          .select('*')
          .eq('swiper_id', swipedId)
          .eq('swiped_id', user.id)
          .in('action', ['connect', 'super_connect'])
          .single()

        if (mutualSwipe) {
          // Create a match!
          const [user1, user2] = [user.id, swipedId].sort()
          const { data: match, error: matchError } = await supabase
            .from('matches')
            .insert({
              user1_id: user1,
              user2_id: user2,
            })
            .select()
            .single()

          if (matchError && matchError.code !== '23505') {
            // Ignore duplicate constraint violation
            throw matchError
          }

          return { match: match || true, isNewMatch: true }
        }
      }

      if (action === 'super_connect') {
        setSuperConnectsToday((prev) => prev + 1)
      }

      return { success: true }
    } catch (error) {
      console.error('Error recording swipe:', error)
      return { error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const superConnectsRemaining = Math.max(
    0,
    SUPER_CONNECTS_PER_DAY - superConnectsToday
  )

  return {
    swipe,
    loading,
    superConnectsRemaining,
    canSuperConnect: superConnectsRemaining > 0,
  }
}
