import type { IRecipe } from './IRecipe'

export interface IWeekMenuBase {
  id?: string
  user_id?: string
}
export interface IWeekMenuResponse extends IWeekMenuBase {
  recipes: (string | null)[]
}

export interface IWeekMenu extends IWeekMenuBase {
  recipes: (IRecipe | null)[]
}

type Recipe = {
  id: string
  title: string
}

export type WeekmenuDay = {
  id: string
  recipe: Recipe | null
}

export type Weekmenu = {
  id: string | undefined
  days: WeekmenuDay[]
  archived: boolean
}
