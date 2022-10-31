export interface IIngredient {
  title: string;
  amount?: number;
}

interface IRecipeBase {
  id?: string;
  user_id?: string;
  title: string;
}

export interface IRecipe extends IRecipeBase {
  content?: string[];
  ingredients: IIngredient[];
  preperationTime: number;
}

export interface IFormData extends IRecipeBase {
  content: string;
  ingredients: string;
  preperationTime: number;
}
