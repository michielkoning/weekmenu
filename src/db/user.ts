import { supabase } from '@/supabase'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'

export const getSession = async () => {
  try {
    return await new PassageUser().userInfo()
  } catch (error) {
    console.error(error)
  }
}

export const login = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
}

export const register = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) throw error
}

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/update-password'
  })
  if (error) throw error
}

export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}

export const logout = async () => {
  new PassageUser().signOut()
  // if (error) throw error
}
