import { IRecipe } from "@/interfaces/IRecipe";

export interface IWeekMenuItem {
  id?: string;
  day?: string;
  title?: string;
  user?: string;
  recipe?: IRecipe | null;
}
