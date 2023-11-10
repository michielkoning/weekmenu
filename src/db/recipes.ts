import { supabase } from '@/supabase'
import type { IRecipe } from '@/interfaces/IRecipe'
import { getSession } from '@/db/user'

export const getAll = async () => {
  const session = await getSession()
  if (!session) {
    throw 'No user'
  }

  const { data, error, status } = await supabase
    .from('recipes')
    .select(`title, id, content, ingredients, preperationTime, persons, source`)
    .eq('user_id', session.id)
    .order('title', { ascending: true })

  if (error && status !== 406) throw new Error(error.message)

  return data as IRecipe[]
}

export const upsert = async (formData: IRecipe) => {
  const session = await getSession()
  if (!session) {
    throw 'No user'
  }

  const updates: IRecipe = {
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
      user_id: session.id,
      id: formData.id
    })
    .match({
      user_id: session.id,
      id: formData.id
    })
    .select()
    .single()

  if (error && status !== 406) throw new Error(error.message)

  return data as IRecipe
}

export const remove = async (id: string) => {
  const session = await getSession()
  if (!session) {
    throw 'No user'
  }

  const { error, status } = await supabase.from('recipes').delete().match({
    id: id,
    user_id: session.id
  })
  if (error && status !== 406) throw new Error(error.message)
}
