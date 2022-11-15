export interface IIngredient {
  title: string;
  amount?: number;
}

export interface IRecipeBase {
  id?: number;
  user_id?: string;
  title: string;
  preperationTime: number;
  persons: number;
  source: string;
}

export interface IRecipeDetails extends IRecipeBase {
  content: string[];
  ingredients: IIngredient[];
}

export interface IFormData extends IRecipeBase {
  content: string;
  ingredients: string;
}
