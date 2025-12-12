import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sb_publishable_CPV85eNI-cePBuhqR5xaKg_u3nvBXUE.supabase.co'
const supabaseAnonKey = 'sb_publishable_CPV85eNI-cePBuhqR5xaKg_u3nvBXUE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  username: string
  avatar_url?: string
  created_at: string
}

export interface Channel {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  content: string
  channel_id: string
  user_id: string
  created_at: string
  user?: User
}

// Auth helpers
export const signUp = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}