import type { Database } from "./ISupabase";

export interface IIngredient {
  title: string;
  amount?: number;
}

export type IRecipe = Database["public"]["Tables"]["recipes"]["Row"];

export type IFormData = IRecipe & {
  content: string;
  ingredients: string;
};
