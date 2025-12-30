import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have valid Supabase credentials
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('https://')
const hasCredentials = isValidUrl && supabaseAnonKey && supabaseAnonKey.length > 20

if (!hasCredentials) {
  console.warn('⚠️ Supabase not configured. Please set valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env')
}

// Use a demo Supabase project URL format if not configured (won't work but won't crash)
export const supabase = createClient(
  isValidUrl ? supabaseUrl : 'https://demo.supabase.co',
  hasCredentials ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
)

export const isSupabaseConfigured = hasCredentials
