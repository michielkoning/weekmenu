import { IRecipe } from "@/interfaces/IRecipe";

export interface IWeekMenuItem {
  id?: string;
  day?: string;
  recipe: IRecipe | null;
}
