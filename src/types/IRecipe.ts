import { IIngredient } from "@/types/IIngredient";

export interface IRecipe {
  id: string;
  title: string;
  preperationTime?: number;
  ingredients: IIngredient[];
  directions: string[];
}
