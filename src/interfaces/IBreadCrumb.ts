import type { RouteLocationNamedRaw } from 'vue-router'

export interface IRecipeItem {
  title: string
  link: string | RouteLocationNamedRaw
}
