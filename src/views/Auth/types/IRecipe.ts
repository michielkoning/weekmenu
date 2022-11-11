export interface IIngredient {
  title: string;
  amount?: number;
}

export interface IRecipe {
  id?: string;
  user_id?: string;
  title: string;
}

export interface IRecipeDetails extends IRecipe {
  content: string[];
  ingredients: IIngredient[];
  preperationTime: number;
}

export interface IFormData extends IRecipe {
  content: string;
  ingredients: string;
  preperationTime: number;
}
