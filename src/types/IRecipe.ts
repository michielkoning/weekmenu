export interface IIngredient {
  title: string;
  amount?: number;
}

export interface IRecipe {
  id?: string;
  user_id?: string;
  title: string;
}

export interface IRecipeDetailsBase extends IRecipe {
  preperationTime: number;
  persons: number;
  source: string;
}

export interface IRecipeDetails extends IRecipeDetailsBase {
  content: string[];
  ingredients: IIngredient[];
}

export interface IFormData extends IRecipeDetailsBase {
  content: string;
  ingredients: string;
}
