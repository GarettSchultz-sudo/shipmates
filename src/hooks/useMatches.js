import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useMatches() {
  const { user } = useAuth()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMatches = useCallback(async () => {
    if (!user) return

    setLoading(true)
    try {
      // Get matches where user is either user1 or user2
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          user1:profiles!matches_user1_id_fkey(*),
          user2:profiles!matches_user2_id_fkey(*)
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Get unread counts for each match
      const matchesWithData = await Promise.all(
        (data || []).map(async (match) => {
          const otherUser =
            match.user1_id === user.id ? match.user2 : match.user1

          // Get last message
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('*')
            .eq('match_id', match.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          // Get unread count
          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('match_id', match.id)
            .neq('sender_id', user.id)
            .is('read_at', null)

          return {
            ...match,
            otherUser,
            lastMessage,
            unreadCount: unreadCount || 0,
          }
        })
      )

      setMatches(matchesWithData)
    } catch (error) {
      console.error('Error fetching matches:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  // Subscribe to new matches
  useEffect(() => {
    if (!user) return

    const subscription = supabase
      .channel('matches')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'matches',
          filter: `user1_id=eq.${user.id}`,
        },
        () => fetchMatches()
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'matches',
          filter: `user2_id=eq.${user.id}`,
        },
        () => fetchMatches()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, fetchMatches])

  return { matches, loading, refetch: fetchMatches }
}
