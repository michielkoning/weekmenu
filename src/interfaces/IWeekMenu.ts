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

type Recipe = {
  id: string;
  title: string;
};

export type WeekmenuRecipe = {
  id: string;
  recipe: Recipe | null;
};

export type Weekmenu = {
  id: string | undefined;
  recipes: WeekmenuRecipe[];
};
