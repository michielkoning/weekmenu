import type { Tables } from '@/types/Supabase'
import { supabase } from '@/supabase'
import { getSession } from '@/db/user'

export const getAll = async () => {
  const session = await getSession()
  if (!session) {
    throw 'No user'
  }

  const { data, error, status } = await supabase
    .from('recipes')
    .select(`*`)
    .eq('user_id', session.user.id)
    .order('title', { ascending: true })

  if (error && status !== 406) throw new Error(error.message)

  return data
}

export const upsert = async (formData: Tables<'recipes'>) => {
  const session = await getSession()
  if (!session) {
    throw 'No user'
  }

  const updates = {
    title: formData.title,
    persons: formData.persons,
    preperationTime: formData.preperationTime,
    content: formData.content,
    ingredients: formData.ingredients,
    source: formData.source
  }

  const { data, error, status } = await supabase
    .from('recipes')
    .upsert({
      ...updates,
      user_id: session.user.id,
      id: formData.id
    })
    .match({
      user_id: session.user.id,
      id: formData.id
    })
    .select()
    .single()

  if (error && status !== 406) throw new Error(error.message)

  return data
}

export const remove = async (id: string) => {
  const session = await getSession()
  if (!session) {
    throw 'No user'
  }

  const { error, status } = await supabase.from('recipes').delete().match({
    id: id,
    user_id: session.user.id
  })
  if (error && status !== 406) throw new Error(error.message)
}
