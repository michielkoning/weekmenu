import type { getAll } from "@/db/weekmenu";
import type { IRecipe } from "./IRecipe";
import type { Database } from "./ISupabase";

export interface IWeekMenuBase {
  id?: string;
  user_id?: string;
}
export interface IWeekMenuResponse extends IWeekMenuBase {
  recipes: (string | null)[];
}

export interface IWeekMenu extends IWeekMenuBase {
  recipes: (IRecipe | null)[];
}

export type WeekmenuRecipe = {
  id: string;
  title: string;
};

export type WeekmenuRecipes = {
  id: string;
  recipe: WeekmenuRecipe | null;
};

export type Weekmenu = {
  id: string | undefined;
  recipes: WeekmenuRecipes[];
};
