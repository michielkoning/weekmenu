export enum Categories {
  vegetarian = "vegetarian",
  fish = "fish",
}

export interface IRecipe {
  id: string;
  icon: string;
  title: string;
  user?: string;
}
