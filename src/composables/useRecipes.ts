import type { Tables } from '@/types/Supabase'
import { computed, ref, type Ref } from 'vue'
import { getAll, remove, upsert } from '@/db/recipes'

const list: Ref<Tables<'recipes'>[]> = ref([])
const hasFetched = ref(false)
const loading = ref(false)

export default () => {
  const error: Ref<null | string> = ref(null)

  const recipe: Ref<Tables<'recipes'> | null> = ref(null)

  const recipes = computed(() => {
    return list.value.sort((a, b) => a.title.localeCompare(b.title))
  })

  const reset = () => {
    list.value = []
    hasFetched.value = false
  }

  const getList = async () => {
    if (hasFetched.value) {
      return
    }

    loading.value = true
    error.value = null
    try {
      const result = await getAll()
      if (result !== null) {
        list.value = result
      }
      hasFetched.value = true
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
      return []
    } finally {
      loading.value = false
    }
  }

  const getRecipe = async (id: string) => {
    if (!hasFetched.value) {
      await getList()
    }

    try {
      const response = list.value.find((r) => {
        return r.id === id
      })
      if (!response) {
        throw new Error('')
      }
      recipe.value = response
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
    }
  }

  const upsertRecipe = async (formData: Tables<'recipes'>) => {
    loading.value = true
    try {
      const response = await upsert(formData)
      recipe.value = response
      const index = list.value.findIndex((r) => response?.id === r.id)
      if (index > -1) {
        list.value[index] = response
      } else {
        list.value.push(response)
      }
      return response.id
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      }
    } finally {
      loading.value = false
    }
  }

  const deleteRecipe = async (id: string) => {
    loading.value = true
    try {
      await remove(id)
      list.value = list.value.filter((r) => r.id !== id)
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      }
    } finally {
      loading.value = false
    }
  }

  return {
    recipes,
    loading,
    error,
    reset,
    getList,
    getRecipe,
    deleteRecipe,
    upsertRecipe,
    recipe
  }
}
