import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useMessages(matchId) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = useCallback(async () => {
    if (!matchId) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', matchId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])

      // Mark messages as read
      if (user) {
        await supabase
          .from('messages')
          .update({ read_at: new Date().toISOString() })
          .eq('match_id', matchId)
          .neq('sender_id', user.id)
          .is('read_at', null)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }, [matchId, user])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  // Subscribe to new messages
  useEffect(() => {
    if (!matchId) return

    const subscription = supabase
      .channel(`messages:${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new])

          // Mark as read if not from current user
          if (user && payload.new.sender_id !== user.id) {
            supabase
              .from('messages')
              .update({ read_at: new Date().toISOString() })
              .eq('id', payload.new.id)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [matchId, user])

  async function sendMessage(content) {
    if (!user || !matchId || !content.trim()) return { error: 'Invalid' }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          match_id: matchId,
          sender_id: user.id,
          content: content.trim(),
        })
        .select()
        .single()

      if (error) throw error
      return { data }
    } catch (error) {
      console.error('Error sending message:', error)
      return { error: error.message }
    }
  }

  return { messages, loading, sendMessage, refetch: fetchMessages }
}
