export type IIngredient = {
  title: string;
  amount?: number;
};

export type IRecipeBase = {
  id?: string;
  title: string;
  preperationTime: number;
  persons: number;
  source: string;
};

export type IRecipe = IRecipeBase & {
  content: string[];
  ingredients: IIngredient[];
};

export type IFormData = IRecipeBase & {
  content: string;
  ingredients: string;
};
