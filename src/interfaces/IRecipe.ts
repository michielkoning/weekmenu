export interface IIngredient {
  title: string;
  amount?: number;
}

export interface IRecipeBase {
  id?: string;
  user_id?: string;
  title: string;
  preperationTime: number;
  persons: number;
  source: string;
}

export interface IRecipe extends IRecipeBase {
  content: string[];
  ingredients: IIngredient[];
}

export interface IFormData extends IRecipeBase {
  content: string;
  ingredients: string;
}
