import type { IRecipe } from "./IRecipe";

export interface IWeekMenuBase {
  id?: string;
  user_id?: string;
}
export interface IWeekMenuResponse extends IWeekMenuBase {
  recipes: (number | null)[];
}

export interface IWeekMenu extends IWeekMenuBase {
  recipes: (IRecipe | null)[];
}
