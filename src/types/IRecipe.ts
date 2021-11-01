import { IIngredient } from "@/types/IIngredient";

export interface IRecipe {
  id: string;
  title: string;
  preparationTime?: number;
  ingredients: IIngredient[];
  directions: string[];
}
