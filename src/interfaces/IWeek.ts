import { IRecipe } from "@/interfaces/IRecipe";

export interface IWeek {
  id?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  day1: IRecipe | null;
  day2: IRecipe | null;
  day3: IRecipe | null;
  day4: IRecipe | null;
  day5: IRecipe | null;
  day6: IRecipe | null;
  day7: IRecipe | null;
}
