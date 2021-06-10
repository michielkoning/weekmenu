import { IRecipe } from "@/interfaces/IRecipe";

export interface IWeekMenuItem {
  id?: string;
  day?: Date | null;
  recipe: IRecipe | null;
}
