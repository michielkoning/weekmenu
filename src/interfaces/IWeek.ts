import { IRecipe } from "@/interfaces/IRecipe";

export interface IWeek {
  id?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  days: IRecipe[] | null[] | null;
}
