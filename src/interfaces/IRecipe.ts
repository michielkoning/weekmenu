export enum Categories {
  vegetarian = "vegetarian",
  fish = "fish",
  meat = "meat",
}

export interface IRecipe {
  id: string;
  category: Categories;
  title: string;
}
